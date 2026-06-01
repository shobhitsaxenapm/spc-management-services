import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { GoogleGenAI } from '@google/genai';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export type ParsedResume = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  yearsOfExperience: string;
  rawText: string;
};

async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const textParts: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    // Preserve line breaks by checking Y positions
    let lastY: number | null = null;
    const lineChunks: string[] = [];
    for (const item of content.items as any[]) {
      if (lastY !== null && Math.abs(item.transform[5] - lastY) > 2) {
        lineChunks.push('\n');
      }
      lineChunks.push(item.str);
      lastY = item.transform[5];
    }
    textParts.push(lineChunks.join(''));
  }

  return textParts.join('\n');
}

async function extractTextFromDOCX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function parseWithGemini(text: string): Promise<ParsedResume> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error('No Gemini API key');
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are an expert resume/CV parser. Your job is to extract personal details from the resume text below.

IMPORTANT: You MUST return ONLY a raw JSON object — no markdown, no backticks, no explanation text before or after.

Extract these fields:
1. "firstName" — The candidate's first name / given name. This is almost always the very first word or prominent name at the top of the resume. For Indian names like "Vivek Kalola", firstName is "Vivek". For "Rahul Kumar Sharma", firstName is "Rahul". The name is typically the largest/first text in the resume, often on the very first line. NEVER return empty for this — every resume has a name.
2. "lastName" — The candidate's last name / family name / surname. For "Vivek Kalola", lastName is "Kalola". For "Rahul Kumar Sharma", lastName is "Kumar Sharma".
3. "email" — The candidate's email address.
4. "phone" — The candidate's phone number including country code if available.
5. "yearsOfExperience" — Total years of professional work experience. If not explicitly stated, calculate from work history start dates to now. Return just the number as a string, e.g. "5" or "10+".

If a field truly cannot be determined, use "".

Return format (raw JSON only):
{"firstName":"","lastName":"","email":"","phone":"","yearsOfExperience":""}

Resume text:
${text.slice(0, 8000)}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
  });

  const responseText = response.text?.trim() || '';
  console.log('[Resume Parser] Raw Gemini response:', responseText);
  console.log('[Resume Parser] First 500 chars of resume text:', text.slice(0, 500));
  // Strip markdown code fences if present
  const jsonStr = responseText.replace(/^```(?:json)?\s*/g, '').replace(/\s*```$/g, '').trim();
  // Find JSON object in the response in case there's extra text
  const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in Gemini response');
  const parsed = JSON.parse(jsonMatch[0]);

  return {
    firstName: parsed.firstName || '',
    lastName: parsed.lastName || '',
    email: parsed.email || '',
    phone: parsed.phone || '',
    yearsOfExperience: parsed.yearsOfExperience || '',
    rawText: text,
  };
}

function parseWithRegex(text: string): ParsedResume {
  const result: ParsedResume = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    yearsOfExperience: '',
    rawText: text,
  };

  // Extract email
  const emailMatch = text.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    result.email = emailMatch[0];
  }

  // Extract phone number (Indian & international formats)
  const phonePatterns = [
    /(?:\+91[\s\-.]?)?[6-9]\d{4}[\s\-.]?\d{5}/,             // Indian mobile
    /(?:\+91[\s\-.]?)?\d{2,4}[\s\-.]?\d{6,8}/,               // Indian landline
    /(?:\+?\d{1,3}[\s\-.]?)?\(?\d{2,4}\)?[\s\-.]?\d{3,4}[\s\-.]?\d{3,4}/, // International
  ];
  for (const pattern of phonePatterns) {
    const match = text.match(pattern);
    if (match) {
      result.phone = match[0].trim();
      break;
    }
  }

  // Extract name from first few lines
  const lines = text.split(/\n/).map(l => l.trim()).filter(l => l.length > 0);

  for (const line of lines.slice(0, 8)) {
    if (
      line.includes('@') ||
      line.match(/\d{5,}/) ||
      line.match(/^http/i) ||
      line.match(/^[\d\s\-\(\)\+]+$/) ||
      line.toLowerCase().includes('resume') ||
      line.toLowerCase().includes('curriculum') ||
      line.toLowerCase().includes('address') ||
      line.length > 60
    ) {
      continue;
    }

    const cleaned = line.replace(/[,.|:;]+$/, '').trim();
    const words = cleaned.split(/\s+/).filter(w => /^[A-Za-z\-']+$/.test(w));

    if (words.length >= 2 && words.length <= 4) {
      result.firstName = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
      result.lastName = words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      break;
    }
  }

  // Extract years of experience
  const expPatterns = [
    /(\d+)\+?\s*(?:years?|yrs?)\s*(?:of\s*)?(?:experience|exp)/i,
    /(?:experience|exp)\s*(?:of\s*)?(\d+)\+?\s*(?:years?|yrs?)/i,
    /over\s*(\d+)\s*(?:years?|yrs?)/i,
  ];
  for (const pattern of expPatterns) {
    const match = text.match(pattern);
    if (match) {
      result.yearsOfExperience = match[1];
      break;
    }
  }

  return result;
}

export async function parseResume(file: File): Promise<ParsedResume> {
  const fileName = file.name.toLowerCase();
  let text: string;

  if (fileName.endsWith('.pdf')) {
    text = await extractTextFromPDF(file);
  } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
    text = await extractTextFromDOCX(file);
  } else {
    throw new Error('Unsupported file format. Please upload a PDF or DOCX file.');
  }

  // Try Gemini AI first, fall back to regex
  try {
    return await parseWithGemini(text);
  } catch {
    return parseWithRegex(text);
  }
}

export type JobMatch = {
  jobId: string;
  score: number; // 0-100
  reason: string;
};

export async function matchResumeToJobs(
  resumeText: string,
  jobs: { id: string; title: string; sector: string; company: string; requirements: string[]; mission: string }[]
): Promise<JobMatch[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    // Fallback: simple keyword matching
    return matchWithKeywords(resumeText, jobs);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const jobDescriptions = jobs.map(j =>
      `Job ID: ${j.id} | Title: ${j.title} | Sector: ${j.sector} | Company: ${j.company} | Requirements: ${j.requirements.join('; ')} | Mission: ${j.mission}`
    ).join('\n\n');

    const prompt = `You are a job matching expert. Given a candidate's resume and a list of job openings, rate how well the candidate matches each job.

Return ONLY a raw JSON array (no markdown, no backticks). Each element should have:
- "jobId": the job ID
- "score": a number from 0 to 100 (100 = perfect match, 0 = no relevance)
- "reason": a brief 1-sentence explanation of why they match or don't

Be realistic. Only give scores above 50 if the candidate genuinely has relevant experience. Consider skills, sector experience, years of experience, and role level.

Jobs:
${jobDescriptions}

Resume:
${resumeText.slice(0, 6000)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const responseText = response.text?.trim() || '';
    const jsonStr = responseText.replace(/^```(?:json)?\s*/g, '').replace(/\s*```$/g, '').trim();
    const jsonMatch = jsonStr.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array found');
    const parsed: JobMatch[] = JSON.parse(jsonMatch[0]);
    return parsed;
  } catch {
    return matchWithKeywords(resumeText, jobs);
  }
}

function matchWithKeywords(
  resumeText: string,
  jobs: { id: string; title: string; sector: string; requirements: string[]; mission: string }[]
): JobMatch[] {
  const text = resumeText.toLowerCase();
  return jobs.map(job => {
    let score = 0;
    const keywords = [
      ...job.title.toLowerCase().split(/\s+/),
      ...job.sector.toLowerCase().split(/\s+/),
      ...job.requirements.join(' ').toLowerCase().split(/\s+/),
    ].filter(w => w.length > 3);

    const uniqueKeywords = [...new Set(keywords)];
    const matches = uniqueKeywords.filter(kw => text.includes(kw));
    score = Math.min(95, Math.round((matches.length / Math.max(uniqueKeywords.length, 1)) * 100));

    return {
      jobId: job.id,
      score,
      reason: score > 50 ? `Profile matches key requirements for ${job.title}.` : `Limited overlap with ${job.title} requirements.`,
    };
  });
}
