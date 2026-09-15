package in.spc.website;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Map;

@Component
@ConditionalOnProperty(name="spc.worker.enabled",havingValue="true",matchIfMissing=true)
public class MailWorker {
 private static final Logger log=LoggerFactory.getLogger(MailWorker.class);
 private final JdbcTemplate db; private final JavaMailSender mail; private final ObjectMapper json; private final String from; private final boolean enabled;
 public MailWorker(JdbcTemplate db,JavaMailSender mail,ObjectMapper json,@Value("${spc.mail.from}") String from,@Value("${spc.mail.enabled}") boolean enabled) {this.db=db;this.mail=mail;this.json=json;this.from=from;this.enabled=enabled;}
 @Scheduled(fixedDelayString="${spc.worker.interval:5000}")
 public void deliver() {
  if (!enabled) return;
  // Recover claims after a process crash. SMTP timeouts are shorter than this lease.
  db.update("UPDATE submissions SET state='PENDING' WHERE state='SENDING' AND next_attempt<?",System.currentTimeMillis());
  var rows=db.queryForList("SELECT id FROM submissions WHERE state='PENDING' AND next_attempt<=? ORDER BY received_at LIMIT 10",System.currentTimeMillis());
  for(var record:rows) {
   String id=record.get("ID").toString();
   if(db.update("UPDATE submissions SET state='SENDING',next_attempt=? WHERE id=? AND state='PENDING'",System.currentTimeMillis()+120000,id)!=1) continue;
   try {
    var row=db.queryForMap("SELECT * FROM submissions WHERE id=?",id);
    Map<String,String> fields=json.readValue(db.queryForObject("SELECT fields_json FROM submissions WHERE id=?",String.class,id),new TypeReference<Map<String,String>>(){});
    var message=mail.createMimeMessage(); var helper=new MimeMessageHelper(message,true,"UTF-8");
    helper.setFrom(from); helper.setTo(row.get("RECIPIENT").toString()); helper.setReplyTo(fields.get("email"));
    helper.setSubject("[SPC Website] " + row.get("KIND") + " | " + id);
    var text=new StringBuilder("SPC website submission\n\nReference: ").append(id).append("\nReceived (UTC): ").append(row.get("RECEIVED_AT")).append("\nType: ").append(row.get("KIND")).append("\n\n");
    fields.forEach((key,value)->text.append(key).append(": ").append(value).append("\n\n"));
    if(row.get("KIND").equals("subscriptions")) text.append("This is a newsletter signup request. It has not been enrolled into a campaign platform.\n");
    byte[] attachment=db.queryForObject("SELECT file_bytes FROM submissions WHERE id=?",byte[].class,id);
    if(attachment!=null) { helper.addAttachment(row.get("FILE_NAME").toString(),new ByteArrayResource(attachment),row.get("FILE_TYPE").toString()); text.append("Resume attached. Treat uploaded files as untrusted.\n"); }
    helper.setText(text.toString(),false);
    message.setHeader("X-SPC-Submission-ID",id);
    mail.send(message);
    db.update("UPDATE submissions SET state='SENT',attempts=attempts+1 WHERE id=?",id);
    log.info("Submission {} accepted by SMTP server",id);
   } catch(Exception e) {
    Integer attempts=db.queryForObject("SELECT attempts FROM submissions WHERE id=?",Integer.class,id); int n=attempts+1;
    long delay=Math.min(3600000L,30000L*(1L<<Math.min(n,10)));
    db.update("UPDATE submissions SET state=?,attempts=?,next_attempt=? WHERE id=?",n>=6?"FAILED":"PENDING",n,System.currentTimeMillis()+delay,id);
    log.warn("Submission {} notification attempt {} failed ({})",id,n,e.getClass().getSimpleName());
   }
  }
 }
}
