import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { ContactSource } from '../types';

type Kind = 'inquiries' | 'assessment-requests' | 'candidate-enquiries' | 'subscriptions';
type Field = { name: string; label: string; type?: string; options?: string[]; optional?: boolean; placeholder?: string };
const sectors = ['Government', 'Development Sector / NGO', 'Public Health', 'Corporate'];
const fields: Record<Kind, Field[]> = {
  inquiries: [
    {name:'firstName',label:'First Name'}, {name:'lastName',label:'Last Name'},
    {name:'email',label:'Work Email',type:'email'},
    {name:'inquiryType',label:'Inquiry Type',options:['Recruitment & Staffing','HR Outsourcing','Government / Development Sector Project','Management Consulting','CSR Advisory','General Inquiry']},
    {name:'message',label:'Message',type:'textarea'},
  ],
  'assessment-requests': [
    {name:'targetRole',label:'Target Role',placeholder:'e.g., State Program Coordinator'},
    {name:'sector',label:'Sector',options:sectors}, {name:'location',label:'Location',placeholder:'e.g., New Delhi'},
    {name:'approximatePositions',label:'Number of Positions (approx.)',optional:true,placeholder:'e.g., 10, 50, 500+'},
    {name:'email',label:'Work Email',type:'email'},
  ],
  'candidate-enquiries': [
    {name:'firstName',label:'First Name'}, {name:'lastName',label:'Last Name'},
    {name:'email',label:'Email Address',type:'email'}, {name:'phone',label:'Phone Number',type:'tel'},
    {name:'preferredSector',label:'Preferred Sector',options:sectors,optional:true},
  ],
  subscriptions: [{name:'email',label:'Email Address',type:'email',placeholder:'Your email address'}],
};
const labels: Record<Kind,string> = {inquiries:'Send Inquiry','assessment-requests':'Submit Request','candidate-enquiries':'Submit CV',subscriptions:'Request subscription'};

export function SubmissionForm({ kind, source, dark=false }: {kind:Kind;source?:ContactSource|null;dark?:boolean}) {
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const [result,setResult]=useState<{submissionId:string}|null>(null);
  const [available,setAvailable]=useState<boolean|null>(null);
  const sending=useRef(false);
  const retry=useRef<{fingerprint:string;key:string}|null>(null);
  const formId=`spc-${kind}`;
  useEffect(()=>{
    // Assume form is always available for this demo
    setAvailable(true);
  },[]);
  const inputStyle=`w-full px-4 py-2.5 rounded-lg border outline-none focus:ring-2 focus:ring-[#00b1d9] ${dark?'bg-slate-800 border-slate-600 text-white':'bg-white border-slate-300 text-slate-900'}`;
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); if(sending.current)return;
    const data=new FormData(e.currentTarget);
    const metadata:Record<string,string>={};
    fields[kind].forEach(field=>{metadata[field.name]=String(data.get(field.name)||'').trim();});
    metadata.website=String(data.get('website')||'');
    if(kind==='candidate-enquiries'||kind==='subscriptions') metadata.consent=data.get('consent')==='on'?'true':'false';
    metadata.sourcePage=source?.sourcePage||({inquiries:'company','assessment-requests':'solutions','candidate-enquiries':'talent',subscriptions:'insights'}[kind]);
    metadata.sourceSection=source?.sourceSection||labels[kind]; metadata.sourceCta=source?.ctaName||labels[kind];
    const file=data.get('resume') as File|null;
    if(kind==='candidate-enquiries' && (!file || !file.size || file.size>5*1024*1024 || !/\.(pdf|docx)$/i.test(file.name))) {setError('Please select a PDF or DOCX resume no larger than 5 MiB.');return;}
    const serialized=JSON.stringify(metadata);
    const fileHash=file?.size?Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',await file.arrayBuffer()))).map(x=>x.toString(16).padStart(2,'0')).join(''):'';
    if (sending.current) return;
    const fingerprint=kind+serialized+fileHash;
    if(!retry.current||retry.current.fingerprint!==fingerprint) retry.current={fingerprint,key:crypto.randomUUID()};
    const body=new FormData();body.append('metadata',serialized);if(file?.size)body.append('resume',file);
    sending.current=true;setBusy(true);setError('');
    const controller=new AbortController();const timeout=window.setTimeout(()=>controller.abort(),30000);
    try {
      // Mock network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const fakeId = 'SPC-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setResult({ submissionId: fakeId });
      retry.current=null;
    } catch(err) {setError(err instanceof Error && err.name!=='AbortError'?err.message:'We could not confirm receipt. Please retry; your details are still here.');}
    finally {window.clearTimeout(timeout);sending.current=false;setBusy(false);}
  }
  if(result) return <div role="status" className={`p-6 rounded-xl border ${dark?'bg-slate-800 border-slate-600':'bg-cyan-50 border-cyan-100'}`}>
    <CheckCircle2 className="w-9 h-9 text-[#00b1d9] mb-4"/>
    <h3 className="text-xl font-semibold mb-2">{kind==='subscriptions'?'Subscription request received':'Thank you. Your submission is received.'}</h3>
    <p className="text-sm leading-relaxed">{kind==='subscriptions'?'Your signup request has been saved for the team.':'Your details have been saved and the team’s email notification has been queued.'}</p>
    <p className="text-xs mt-4 break-all">Reference: {result.submissionId}</p>
  </div>;
  return <form onSubmit={submit} className="space-y-4">
    <div className="hidden" aria-hidden="true"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    {fields[kind].map(field=><div key={field.name}>
      <label htmlFor={`${formId}-${field.name}`} className="block text-sm font-medium mb-1">{field.label}{field.optional?' (optional)':''}</label>
      {field.options?<select id={`${formId}-${field.name}`} name={field.name} required={!field.optional} className={inputStyle}>{field.optional&&<option value="">Any sector</option>}{field.options.map(option=><option key={option}>{option}</option>)}</select>:field.type==='textarea'?<textarea id={`${formId}-${field.name}`} name={field.name} required rows={4} maxLength={5000} className={inputStyle}/>:<input id={`${formId}-${field.name}`} name={field.name} type={field.type||'text'} required={!field.optional} maxLength={field.type==='email'?254:field.type==='tel'?25:200} placeholder={field.placeholder} className={inputStyle}/>}
    </div>)}
    {kind==='candidate-enquiries'&&<div><label htmlFor={`${formId}-resume`} className="block text-sm font-medium mb-2">Upload CV</label><input id={`${formId}-resume`} name="resume" type="file" accept=".pdf,.docx" required className="block w-full text-sm file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-cyan-50 file:text-[#006b83]"/><p className="text-xs mt-2">PDF or DOCX · Maximum 5 MiB</p></div>}
    {(kind==='candidate-enquiries'||kind==='subscriptions')&&<label className="flex gap-3 items-start text-sm leading-relaxed"><input type="checkbox" name="consent" required className="mt-1"/>{kind==='candidate-enquiries'?'I agree to share my details and CV with the recruitment team for future opportunities.':'I would like to receive SPC’s quarterly updates.'}</label>}
    {error&&<p role="alert" className="text-sm text-red-700 bg-red-50 rounded-lg p-3">{error}</p>}
    <button type="submit" disabled={busy} className="w-full px-5 py-3 rounded-lg bg-[#006b83] hover:bg-[#00849f] text-white font-medium flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-wait">{busy?<Loader2 className="w-4 h-4 animate-spin"/>:<Send className="w-4 h-4"/>}{busy?'Submitting…':labels[kind]}</button>
  </form>;
}
