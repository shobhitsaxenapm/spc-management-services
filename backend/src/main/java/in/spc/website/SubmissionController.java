package in.spc.website;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.mail.internet.InternetAddress;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.server.ResponseStatusException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.*;
import java.util.zip.ZipInputStream;
import java.io.ByteArrayInputStream;

@RestController
@RequestMapping("/api/v1")
public class SubmissionController {
 private final JdbcTemplate db;
 private final ObjectMapper json;
 private final boolean enabled;
 private final String sender, username, password, recipient;
 private final Map<String, long[]> rates = new HashMap<>();
 private static final Set<String> SECTORS = Set.of("Government", "Development Sector / NGO", "Public Health", "Corporate");
 private static final Set<String> INQUIRIES = Set.of("Recruitment & Staffing", "HR Outsourcing", "Government / Development Sector Project", "Management Consulting", "CSR Advisory", "General Inquiry");
 private static final Map<String, List<String>> FIELDS = Map.of(
  "inquiries", List.of("firstName", "lastName", "email", "inquiryType", "message"),
  "assessment-requests", List.of("targetRole", "sector", "location", "approximatePositions", "email"),
  "candidate-enquiries", List.of("firstName", "lastName", "email", "phone", "preferredSector", "consent"),
  "subscriptions", List.of("email", "consent")
 );
 public SubmissionController(JdbcTemplate db, ObjectMapper json,
   @Value("${spc.mail.enabled}") boolean enabled, @Value("${spc.mail.from}") String sender,
   @Value("${spring.mail.username}") String username, @Value("${spring.mail.password}") String password,
   @Value("${spc.mail.recipient}") String recipient) {
  this.db=db; this.json=json; this.enabled=enabled; this.sender=sender; this.username=username; this.password=password; this.recipient=recipient;
 }
 @GetMapping("/forms/status")
 public Map<String, Boolean> status() { return Map.of("available", configured()); }
 private boolean configured() { return enabled && !sender.isBlank() && !username.isBlank() && !password.isBlank(); }

 @PostMapping(value="/{kind:inquiries|assessment-requests|candidate-enquiries|subscriptions}", consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
 public synchronized ResponseEntity<?> submit(@PathVariable String kind,
   @RequestHeader("Idempotency-Key") String key, @RequestParam String metadata,
   @RequestParam(required=false) MultipartFile resume, HttpServletRequest request) throws Exception {
  if (!configured()) throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Online submissions are not available yet. Please try again later.");
  validateEmail(recipient); validateEmail(sender);
  try { if (!UUID.fromString(key).toString().equals(key)) throw new IllegalArgumentException(); }
  catch (IllegalArgumentException e) { throw bad("Invalid submission key."); }
  if (metadata.length()>12000) throw bad("Submission is too long.");
  Map<String,String> fields;
  try { fields=json.readValue(metadata,new TypeReference<Map<String,String>>(){}); }
  catch (Exception e) { throw bad("Invalid form details."); }
  if (fields==null) throw bad("Missing form details.");
  var allowed=new HashSet<>(FIELDS.get(kind)); allowed.addAll(List.of("sourcePage","sourceSection","sourceCta","website"));
  for (var entry:fields.entrySet()) {
   if (!allowed.contains(entry.getKey()) || entry.getValue()==null) throw bad("Unexpected form field.");
   entry.setValue(entry.getValue().trim());
   int limit=entry.getKey().equals("message")?5000:entry.getKey().equals("email")?254:200;
   if (entry.getValue().length()>limit) throw bad("The " + entry.getKey() + " field is too long.");
  }
  if (!fields.getOrDefault("website", "").isEmpty()) throw bad("Unable to accept this submission.");
  fields.remove("website");
  for (String field:FIELDS.get(kind)) {
   if (Set.of("approximatePositions","preferredSector").contains(field)) continue;
   if (fields.getOrDefault(field, "").isBlank()) throw bad("Please complete " + field + ".");
  }
  validateEmail(fields.get("email"));
  if (kind.equals("inquiries") && !INQUIRIES.contains(fields.get("inquiryType"))) throw bad("Choose a valid inquiry type.");
  if (kind.equals("assessment-requests") && !SECTORS.contains(fields.get("sector"))) throw bad("Choose a valid sector.");
  if (kind.equals("candidate-enquiries")) {
   String sector=fields.getOrDefault("preferredSector", "");
   if (!sector.isBlank() && !SECTORS.contains(sector)) throw bad("Choose a valid sector.");
   if (!fields.get("phone").matches("[+()0-9 .-]{7,25}")) throw bad("Enter a valid phone number.");
  }
  if (FIELDS.get(kind).contains("consent") && !"true".equals(fields.get("consent"))) throw bad("Please confirm your consent.");
  byte[] bytes=null; String name=null, type=null;
  if (kind.equals("candidate-enquiries")) {
   if (resume==null || resume.isEmpty()) throw bad("Please select a PDF or DOCX resume.");
   if (resume.getSize()>5*1024*1024) throw new ResponseStatusException(HttpStatus.PAYLOAD_TOO_LARGE,"Resume must be no larger than 5 MiB.");
   bytes=resume.getBytes();
   String original=Optional.ofNullable(resume.getOriginalFilename()).orElse("").toLowerCase(Locale.ROOT);
   if (original.endsWith(".pdf") && new String(bytes,0,Math.min(5,bytes.length),StandardCharsets.US_ASCII).equals("%PDF-")) {
    type="application/pdf"; name="resume.pdf";
   } else if (original.endsWith(".docx") && validDocx(bytes)) {
    type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"; name="resume.docx";
   } else throw bad("Please upload a valid PDF or DOCX file. Legacy DOC files are not supported.");
  } else if (resume!=null && !resume.isEmpty()) throw bad("Attachments are only accepted with CV submissions.");
  String body=json.writeValueAsString(new TreeMap<>(fields));
  MessageDigest digest=MessageDigest.getInstance("SHA-256");
  digest.update((kind+"\n"+body+"\n"+name).getBytes(StandardCharsets.UTF_8));
  if (bytes!=null) digest.update(bytes);
  String hash=HexFormat.of().formatHex(digest.digest());
  var existing=db.queryForList("SELECT id,payload_hash,received_at FROM submissions WHERE request_key=?",key);
  if (!existing.isEmpty()) {
   var row=existing.getFirst();
   if (!hash.equals(row.get("PAYLOAD_HASH"))) throw new ResponseStatusException(HttpStatus.CONFLICT,"Submission changed. Please send it as a new request.");
   return accepted(row.get("ID").toString(),row.get("RECEIVED_AT").toString());
  }
  rateLimit(request.getRemoteAddr());
  String id=UUID.randomUUID().toString(), now=Instant.now().toString();
  // One row is both the durable submission and delivery queue; no transaction gap.
  db.update("INSERT INTO submissions(id,request_key,payload_hash,kind,fields_json,file_name,file_type,file_bytes,received_at,recipient) VALUES(?,?,?,?,?,?,?,?,?,?)",
    id,key,hash,kind,body,name,type,bytes,now,recipient);
  return accepted(id,now);
 }
 private ResponseEntity<?> accepted(String id,String time) {
  return ResponseEntity.accepted().body(Map.of("submissionId",id,"status","RECEIVED","receivedAt",time,"message","Your submission has been saved for the team."));
 }
 private void rateLimit(String address) {
  long now=System.currentTimeMillis(); rates.entrySet().removeIf(e->now-e.getValue()[0]>3600000);
  if (rates.size()>10000) throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS,"Please try again later.");
  long[] bucket=rates.computeIfAbsent(address,k->new long[]{now,0});
  if (++bucket[1]>10) throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS,"Too many submissions. Please try again in an hour.");
 }
 private static void validateEmail(String email) {
  try {
   if (email==null || email.length()>254 || email.contains("\r") || email.contains("\n")) throw new Exception();
   var address=new InternetAddress(email,true); address.validate();
   if (!email.equals(address.getAddress()) || !email.contains("@") || email.contains(" ")) throw new Exception();
  } catch (Exception e) { throw bad("Enter a valid email address."); }
 }
 private static boolean validDocx(byte[] bytes) {
  boolean document=false, contentTypes=false; long total=0; int count=0;
  try(var zip=new ZipInputStream(new ByteArrayInputStream(bytes))) {
   byte[] buffer=new byte[8192];
   for(var entry=zip.getNextEntry();entry!=null;entry=zip.getNextEntry()) {
    if (++count>1000 || entry.getName().contains("..") || entry.getName().endsWith("vbaProject.bin")) return false;
    if (entry.getName().equals("word/document.xml")) document=true;
    if (entry.getName().equals("[Content_Types].xml")) contentTypes=true;
    int n; while((n=zip.read(buffer))!=-1) { total+=n; if(total>25*1024*1024) return false; }
   }
   return document && contentTypes;
  } catch(Exception e) { return false; }
 }
 private static ResponseStatusException bad(String message) { return new ResponseStatusException(HttpStatus.BAD_REQUEST,message); }
}

@RestControllerAdvice
class FormErrors {
 @ExceptionHandler(ResponseStatusException.class)
 ResponseEntity<?> handled(ResponseStatusException e) { return ResponseEntity.status(e.getStatusCode()).body(Map.of("message",Objects.requireNonNullElse(e.getReason(),"Unable to submit."))); }
 @ExceptionHandler(MaxUploadSizeExceededException.class)
 ResponseEntity<?> tooLarge() { return ResponseEntity.status(413).body(Map.of("message","Resume must be no larger than 5 MiB.")); }
 @ExceptionHandler(Exception.class)
 ResponseEntity<?> unexpected(Exception e) { return ResponseEntity.status(503).body(Map.of("message","We could not accept this submission. Your details have been kept on this page; please try again.")); }
}
