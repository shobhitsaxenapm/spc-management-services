# SPC website form delivery

Implemented: four multipart endpoints accept website details, persist them in a local H2 database, and queue an email to one configured recipient. CV submissions include a PDF/DOCX attachment. The Careers page offers general CV submission without exposing dummy vacancies. Newsletter requests are saved and emailed; this is not a newsletter campaign or double-opt-in platform.

## Current local setup

- Frontend: http://127.0.0.1:3000
- Backend: http://127.0.0.1:8080
- Vite proxies /api to the backend.
- Test recipient: liamparkerstealth@gmail.com.
- MAIL_ENABLED defaults to false. No real email is sent until an authenticated sender is configured.
- All requests fail with an honest 503 response while mail configuration is incomplete; fields remain on the page. A 202 means saved and queued, not delivered to the inbox.

## Sender setup — the only required account dependency for local delivery

Edit backend/.env.properties locally. It is ignored by Git and created with owner-only permissions. Do not paste credentials into chat, commit them, place them in Vite variables or send the file with a handoff.

For Gmail SMTP, use a sender account you control, with an App Password if the account allows it. Google requires 2-Step Verification for App Password use, and some managed/protected accounts do not offer App Passwords. Otherwise use an approved SMTP provider's credentials. A recipient Gmail address alone does not authorize sending.

Set:

```properties
MAIL_ENABLED=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-controlled-sender@gmail.com
SMTP_PASSWORD=your-app-password
MAIL_FROM=your-controlled-sender@gmail.com
MAIL_TO=liamparkerstealth@gmail.com
```

Do not use the normal Google account password. MAIL_FROM must be permitted by the sender provider. The credentials must belong to the sender, not necessarily the recipient.

References: https://docs.spring.io/spring-boot/3.5/reference/io/email.html and https://support.google.com/accounts/answer/185833

Start/restart after changing the file:

```sh
cd /Users/shobhitsaxena/Documents/spc-management-services/backend
./run-local.sh
```

Java 21 and Maven are installed through Homebrew on this machine. The launcher sets Java 21 for this process only. No global Java symlink is needed. Rebuild after code changes with `JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home mvn verify`.

## Contract

GET /api/v1/forms/status → {"available":false|true}. Availability means configuration exists, not that SMTP authentication or mailbox delivery has already been proven.

POST endpoints, all multipart/form-data:

- /api/v1/inquiries: firstName, lastName, email, inquiryType, message.
- /api/v1/assessment-requests: targetRole, sector, location, approximatePositions (optional), email.
- /api/v1/candidate-enquiries: firstName, lastName, email, phone, preferredSector (optional), consent="true"; required resume part.
- /api/v1/subscriptions: email, consent="true".

Each request has a metadata part containing JSON with string values, and a required Idempotency-Key UUID header. Optional metadata: sourcePage, sourceSection, sourceCta. A hidden website field is the spam trap. Enum values match the visible labels in SubmissionForm.tsx. The backend never accepts a destination email from the browser.

Response 202: {submissionId,status:"RECEIVED",receivedAt,message}. Errors return {message}; 400 invalid fields/files, 409 conflicting retry payload, 413 oversized upload, 429 rate limit, 503 unavailable. Retry identical payloads with the same key after a network timeout. Deliberately edited submissions use a fresh key. The database retains idempotency keys with submissions.

PDF/DOCX only, 5 MiB maximum. DOCX checks include ZIP contents, expansion limits and rejection of VBA projects. PDF check is a signature check, not full document or malware validation. Files are stored in a non-public database and attached to the configured internal email. Uploaded content is untrusted; do not describe these checks as antivirus scanning.

## Delivery semantics

Submission and outbox are the same durable row. The worker claims pending rows, sends MIME mail through SMTP, and marks SMTP-accepted messages SENT. SMTP acceptance does not guarantee inbox delivery. Failure retries up to six attempts with increasing delays; final failure is FAILED and logged by submission ID without form contents or secrets. Claims expire after a process crash. Rare duplicates are possible if SMTP accepts mail immediately before a process crash; the stable reference identifies them.

Emails contain every submitted non-trap field, source information, reference, receipt timestamp and attached CV if provided. Reply-To is the validated visitor address. Only the internal recipient is emailed; visitor auto-replies are not enabled. Newsletter emails explicitly identify the event as a signup request, not confirmed campaign enrollment.

There is no public endpoint to list submissions or download CVs. The H2 console is not enabled. The launcher uses umask 077 so newly created database files are private to the local account.

## Test results and completion criteria

Automated tests use a mocked mail transport: all field values and the recipient are checked, attachment bytes are verified, duplicate retries do not duplicate rows, recipient/header injection is rejected, delivery failure is retried without data loss, and missing configuration cannot report success. These tests do NOT prove delivery to Gmail.

After sender configuration, use synthetic details to submit all four forms in the browser and confirm all four messages arrive in liamparkerstealth@gmail.com, including the CV attachment. Record the reference IDs. Check spam if absent and review SMTP failure logs. No real applicant CV is required for testing.

## Switching to SPC and deploying

Change only MAIL_TO to contact@spc.co.in and restart after SPC approves receiving live data. Existing queued rows retain the recipient captured at submission time; do not silently reroute old test submissions. The public contact text is unchanged. The sender can remain the same only if its owner authorizes production use; a verified SPC sender is preferable.

The Vite proxy is development-only. Production hosting must proxy /api to the Spring Boot service and serve the React build. Configure HTTPS, server-side credentials, a persistent protected database volume (single instance for this H2 setup), backups, and restrictive network access. Do not deploy this service on ephemeral storage or point multiple instances at this local H2 file.

Before live CV collection, establish a retention/deletion policy, publish an appropriate privacy notice, add a file-scanning service for untrusted uploads and define who monitors failed deliveries. Mailbox attachment retention is separate from database retention. Current app-level throttling uses the direct remote address (10 submissions/hour), and must be paired with edge controls and correct trusted-proxy configuration for a production reverse proxy. Do not trust arbitrary client-supplied forwarding headers.

Operational queries (run locally using an authorized database tool; never expose a public console):

```sql
SELECT id, kind, state, attempts, received_at FROM submissions WHERE state IN ('FAILED','PENDING') ORDER BY received_at;
-- After fixing the sender problem, retry a specific failed request:
UPDATE submissions SET state='PENDING', attempts=0, next_attempt=0 WHERE id='<reviewed-id>' AND state='FAILED';
```

This is an implementation of the user's narrowed four-form email workflow. It supersedes the earlier proposed handoff's routing and transport details: one configurable inbox, multipart metadata for all forms, local durable H2, CV attachments, and signup notifications without campaign enrollment. The earlier full ATS, private staff-download portal, production scanner, confirmation/unsubscribe campaign flow and role routing are not implemented here.
