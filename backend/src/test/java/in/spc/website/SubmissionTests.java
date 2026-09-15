package in.spc.website;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.Session;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.MailSendException;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import java.nio.charset.StandardCharsets;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@SpringBootTest(properties={"spring.datasource.url=jdbc:h2:mem:forms;DB_CLOSE_DELAY=-1","spc.mail.enabled=true","spc.mail.from=sender@example.com","spring.mail.username=test","spring.mail.password=test","spc.worker.enabled=false"})
@AutoConfigureMockMvc
class SubmissionTests {
 @Autowired MockMvc mvc; @Autowired JdbcTemplate db; @Autowired ObjectMapper json;
 @MockitoBean JavaMailSender mail;
 @BeforeEach void clean(){db.update("DELETE FROM submissions");reset(mail);when(mail.createMimeMessage()).thenAnswer(i->new MimeMessage((Session)null));}
 Map<String,String> inquiry(){return new HashMap<>(Map.of("firstName","Test","lastName","Person","email","test@example.com","inquiryType","General Inquiry","message","Synthetic test only","sourcePage","company"));}
 String submit(String kind,Map<String,String> fields)throws Exception{
  String response=mvc.perform(multipart("/api/v1/"+kind).param("metadata",json.writeValueAsString(fields)).header("Idempotency-Key",UUID.randomUUID().toString())).andExpect(status().isAccepted()).andReturn().getResponse().getContentAsString();return json.readTree(response).get("submissionId").asText();
 }
 @Test void allFormsMailEveryFieldToTestInbox()throws Exception{
  var forms=new LinkedHashMap<String,Map<String,String>>();forms.put("inquiries",inquiry());
  forms.put("assessment-requests",Map.of("targetRole","Coordinator","sector","Public Health","location","Delhi","approximatePositions","50+","email","test@example.com"));
  forms.put("subscriptions",Map.of("email","test@example.com","consent","true"));
  for(var entry:forms.entrySet())submit(entry.getKey(),entry.getValue());
  List<MimeMessage> sent=new ArrayList<>();doAnswer(i->{sent.add(i.getArgument(0));return null;}).when(mail).send(any(MimeMessage.class));
  new MailWorker(db,mail,json,"sender@example.com",true).deliver();assertEquals(3,sent.size());
  assertEquals(3,db.queryForObject("SELECT COUNT(*) FROM submissions WHERE state='SENT'",Integer.class));
  for(var message:sent){assertEquals("liamparkerstealth@gmail.com",message.getAllRecipients()[0].toString());for(var entry:forms.entrySet())if(message.getSubject().contains(entry.getKey())){String text=mimeText(message);for(var field:entry.getValue().entrySet())assertTrue(text.contains(field.getKey()+": "+field.getValue()),field.toString());}}
 }
 String mimeText(jakarta.mail.Part part)throws Exception{Object content=part.getContent();if(content instanceof String s)return s;if(content instanceof jakarta.mail.Multipart m){var text=new StringBuilder();for(int i=0;i<m.getCount();i++)text.append(mimeText(m.getBodyPart(i)));return text.toString();}return "";}
 @Test void duplicatesAreSafe()throws Exception{
  String key=UUID.randomUUID().toString(),body=json.writeValueAsString(inquiry());
  for(int i=0;i<2;i++)mvc.perform(multipart("/api/v1/inquiries").param("metadata",body).header("Idempotency-Key",key)).andExpect(status().isAccepted());
  assertEquals(1,db.queryForObject("SELECT COUNT(*) FROM submissions",Integer.class));var changed=inquiry();changed.put("message","Changed");
  mvc.perform(multipart("/api/v1/inquiries").param("metadata",json.writeValueAsString(changed)).header("Idempotency-Key",key)).andExpect(status().isConflict());
 }
 @Test void rejectsInvalidInputAndRecipientInjection()throws Exception{
  var invalid=inquiry();invalid.put("email","bad\r\nBcc: attacker@example.com");
  mvc.perform(multipart("/api/v1/inquiries").param("metadata",json.writeValueAsString(invalid)).header("Idempotency-Key",UUID.randomUUID().toString())).andExpect(status().isBadRequest());
  var injected=inquiry();injected.put("recipient","other@example.com");mvc.perform(multipart("/api/v1/inquiries").param("metadata",json.writeValueAsString(injected)).header("Idempotency-Key",UUID.randomUUID().toString())).andExpect(status().isBadRequest());
  assertEquals(0,db.queryForObject("SELECT COUNT(*) FROM submissions",Integer.class));
 }
 @Test void cvAttachmentPreservedAndBadFileRejected()throws Exception{
  var fields=Map.of("firstName","Test","lastName","Person","email","test@example.com","phone","+91 9999999999","consent","true","preferredSector","Corporate");byte[] pdf="%PDF-1.4\nSynthetic attachment test\n%%EOF".getBytes(StandardCharsets.US_ASCII);
  mvc.perform(multipart("/api/v1/candidate-enquiries").file(new MockMultipartFile("resume","cv.pdf","application/pdf",pdf)).param("metadata",json.writeValueAsString(fields)).header("Idempotency-Key",UUID.randomUUID().toString())).andExpect(status().isAccepted());
  assertArrayEquals(pdf,db.queryForObject("SELECT file_bytes FROM submissions",byte[].class));
  doAnswer(i->{MimeMessage m=i.getArgument(0);assertTrue(hasAttachment(m,pdf));return null;}).when(mail).send(any(MimeMessage.class));new MailWorker(db,mail,json,"sender@example.com",true).deliver();verify(mail).send(any(MimeMessage.class));
  mvc.perform(multipart("/api/v1/candidate-enquiries").file(new MockMultipartFile("resume","cv.pdf","application/pdf","executable".getBytes())).param("metadata",json.writeValueAsString(fields)).header("Idempotency-Key",UUID.randomUUID().toString())).andExpect(status().isBadRequest());
 }
 boolean hasAttachment(jakarta.mail.Part p,byte[] expected)throws Exception{if("resume.pdf".equals(p.getFileName())){assertArrayEquals(expected,p.getInputStream().readAllBytes());return true;}if(p.getContent() instanceof jakarta.mail.Multipart m)for(int i=0;i<m.getCount();i++)if(hasAttachment(m.getBodyPart(i),expected))return true;return false;}
 @Test void failedDeliveryRetriesWithoutLosingSubmission()throws Exception{
  String id=submit("inquiries",inquiry());doThrow(new MailSendException("test failure")).when(mail).send(any(MimeMessage.class));var worker=new MailWorker(db,mail,json,"sender@example.com",true);worker.deliver();
  assertEquals("PENDING",db.queryForObject("SELECT state FROM submissions WHERE id=?",String.class,id));assertEquals(1,db.queryForObject("SELECT attempts FROM submissions WHERE id=?",Integer.class,id));
  db.update("UPDATE submissions SET next_attempt=0 WHERE id=?",id);doNothing().when(mail).send(any(MimeMessage.class));worker.deliver();assertEquals("SENT",db.queryForObject("SELECT state FROM submissions WHERE id=?",String.class,id));
 }
 @Test void missingCredentialsCannotReportSuccess()throws Exception{
  var controller=new SubmissionController(db,json,false,"","","","liamparkerstealth@gmail.com");var ex=assertThrows(org.springframework.web.server.ResponseStatusException.class,()->controller.submit("inquiries",UUID.randomUUID().toString(),json.writeValueAsString(inquiry()),null,new org.springframework.mock.web.MockHttpServletRequest()));assertEquals(503,ex.getStatusCode().value());assertEquals(0,db.queryForObject("SELECT COUNT(*) FROM submissions",Integer.class));
 }
}
