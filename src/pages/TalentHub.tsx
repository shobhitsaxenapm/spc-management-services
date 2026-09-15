import { SubmissionForm } from '../components/SubmissionForm';
import React, { useState, useRef } from 'react';
import { Page, ContactSource } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { UploadCloud, Briefcase, MapPin, Clock, Search, X, CheckCircle2, ChevronRight, User, Loader2, Send, FileText } from 'lucide-react';
import { parseResume, matchResumeToJobs, type ParsedResume, type JobMatch } from '../utils/resumeParser';

type Job = {
  id: string;
  title: string;
  sector: string;
  company: string;
  location: string;
  type: string;
  iconBg: string;
  iconColor: string;
  tldr: string[];
  mission: string;
  requirements: string[];
  recruiter: {
    name: string;
    role: string;
    image: string;
  };
  salary?: string;
};

const JOBS: Job[] = [
  {
    id: '1',
    title: 'State Program Coordinator',
    sector: 'Government',
    company: 'National Health Mission',
    location: 'New Delhi, India',
    type: 'Contract (12 months)',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-700',
    tldr: [
      'Coordinate state-level health program implementation.',
      'Manage a team of 20+ district coordinators.',
      'Report to the State Program Director.'
    ],
    mission: 'You will oversee the implementation of public health initiatives across multiple districts, ensuring timely deployment of resources, compliance with program guidelines, and measurable health outcomes.',
    requirements: [
      '5+ years in public health or government program management.',
      'Experience with National Health Mission or similar programs.',
      'Strong coordination and reporting skills.'
    ],
    recruiter: {
      name: 'Priya Sharma',
      role: 'Government Practice Lead',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
    },
    salary: '₹8L - ₹12L per annum'
  },
  {
    id: '2',
    title: 'HR Operations Manager',
    sector: 'Corporate',
    company: 'Leading FMCG Company',
    location: 'Mumbai, India',
    type: 'Full-time',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    tldr: [
      'Manage HR operations for 1000+ employees.',
      'Oversee payroll, compliance, and employee lifecycle.',
      'Drive HR process automation and efficiency.'
    ],
    mission: 'You will lead the HR operations function, ensuring smooth workforce administration, payroll management, statutory compliance, and employee engagement across multiple locations.',
    requirements: [
      '8+ years in HR Operations, preferably in FMCG or manufacturing.',
      'Strong knowledge of Indian labour laws and statutory compliance.',
      'Experience managing HR for 500+ employees.'
    ],
    recruiter: {
      name: 'Rajesh Mehta',
      role: 'Corporate Search Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop'
    },
    salary: '₹18L - ₹24L per annum'
  },
  {
    id: '3',
    title: 'District Project Manager',
    sector: 'Development Sector',
    company: 'International NGO',
    location: 'Lucknow, India',
    type: 'Contract (24 months)',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    tldr: [
      'Manage district-level program implementation.',
      'Coordinate with government stakeholders and community partners.',
      'Ensure program deliverables and reporting timelines.'
    ],
    mission: 'You will lead the on-ground execution of a maternal and child health program, working closely with district health authorities, community health workers, and the central program team.',
    requirements: [
      '5+ years in NGO or development sector project management.',
      'Experience working with government health programs at district level.',
      'Fluency in Hindi and English required.'
    ],
    recruiter: {
      name: 'Anita Desai',
      role: 'Development Sector Specialist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
    },
    salary: '₹10L - ₹15L per annum'
  }
];

export function TalentHub({ setPage, navigateToContact }: { setPage: (page: Page) => void; navigateToContact: (source: ContactSource) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyStep, setApplyStep] = useState<'details' | 'resume' | 'form' | 'success'>('details');
  const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resume matching state
  const [matchResults, setMatchResults] = useState<JobMatch[] | null>(null);
  const [isMatching, setIsMatching] = useState(false);
  const [matchResumeData, setMatchResumeData] = useState<ParsedResume | null>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const [heroDragging, setHeroDragging] = useState(false);

  // Send CV modal state
  const [showCvModal, setShowCvModal] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvSubmitted, setCvSubmitted] = useState(false);
  const cvFileInputRef = useRef<HTMLInputElement>(null);

  const handleApplyClick = () => setApplyStep('resume');

  // Application resume handler (inside drawer)
  const handleFile = async (file: File) => {
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setParseError('File is too large. Max 5MB.');
      return;
    }
    const ext = file.name.toLowerCase();
    if (!ext.endsWith('.pdf') && !ext.endsWith('.docx') && !ext.endsWith('.doc')) {
      setParseError('Unsupported format. Please upload a PDF or DOCX file.');
      return;
    }
    setIsParsing(true);
    setParseError(null);
    try {
      const data = await parseResume(file);
      setParsedData(data);
      setApplyStep('form');
    } catch (err: any) {
      setParseError(err.message || 'Failed to parse resume. Please try again.');
    } finally {
      setIsParsing(false);
    }
  };

  // Hero resume match handler
  const handleMatchFile = async (file: File) => {
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) return;
    const ext = file.name.toLowerCase();
    if (!ext.endsWith('.pdf') && !ext.endsWith('.docx') && !ext.endsWith('.doc')) return;

    setIsMatching(true);
    try {
      const data = await parseResume(file);
      setMatchResumeData(data);
      const matches = await matchResumeToJobs(
        data.rawText,
        JOBS.map(j => ({ id: j.id, title: j.title, sector: j.sector, company: j.company, requirements: j.requirements, mission: j.mission }))
      );
      setMatchResults(matches);
    } catch {
      // If matching fails, just show all jobs
      setMatchResults(null);
    } finally {
      setIsMatching(false);
    }
  };

  const handleResumeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const handleHeroFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setHeroDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleMatchFile(file);
  };

  const handleHeroFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleMatchFile(file);
    e.target.value = '';
  };

  const closeDrawer = () => {
    setSelectedJob(null);
    setParsedData(null);
    setParseError(null);
    setIsParsing(false);
    setTimeout(() => setApplyStep('details'), 300);
  };

  const getExperienceBucket = (years: string): string => {
    if (!years) return '';
    const num = parseInt(years.replace(/\+/, ''), 10);
    if (isNaN(num)) return '';
    if (num < 3) return 'Less than 3 years';
    if (num <= 5) return '3-5 years';
    if (num <= 10) return '5-10 years';
    return '10+ years';
  };

  const clearMatchResults = () => {
    setMatchResults(null);
    setMatchResumeData(null);
  };

  // Compute displayed jobs based on match results
  const getDisplayedJobs = (): { job: Job; match?: JobMatch }[] => {
    if (!matchResults) {
      return JOBS.map(job => ({ job }));
    }
    const matched = JOBS.map(job => {
      const match = matchResults.find(m => m.jobId === job.id);
      return { job, match };
    })
      .filter(item => item.match && item.match.score >= 30)
      .sort((a, b) => (b.match?.score || 0) - (a.match?.score || 0));
    return matched;
  };

  const displayedJobs = getDisplayedJobs();
  const hasMatchFilter = matchResults !== null;
  const noMatches = hasMatchFilter && displayedJobs.length === 0;

  // Keep the prototype available for ATS integration, but never expose demo vacancies publicly.
  const careersPortalEnabled = false;
  if (!careersPortalEnabled) {
    return (
      <section className="flex-grow bg-slate-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <Briefcase className="w-12 h-12 text-[#006b83] mb-8" aria-hidden="true" />
            <p className="text-sm font-semibold uppercase tracking-widest text-[#006b83] mb-4">Careers at SPC</p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Your next opportunity starts with a conversation.</h1>
            <p className="text-lg leading-relaxed text-slate-600 mb-8">Share your CV and tell us where you’d like to work. Our recruitment team can consider your profile for future opportunities.</p>
            <div className="rounded-xl border border-cyan-100 bg-cyan-50 p-6">
              <h2 className="font-semibold text-[#073f51] mb-2">Job listings coming soon</h2>
              <p className="text-sm leading-relaxed text-slate-600">We’re preparing our new careers portal. You can submit your CV here while online job applications are being introduced.</p>
            </div>
          </div>
          <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us Your CV</h2>
            <SubmissionForm kind="candidate-enquiries" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col bg-slate-50 min-h-screen"
    >
      {/* Hero */}
      <section className="pt-20 pb-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Explore opportunities across Government, NGOs, and Corporate sectors.
              </h1>
              <p className="text-xl text-slate-300">
                Upload your resume to find relevant openings, or browse all positions below.
              </p>
            </div>

            {/* Resume Upload for Job Matching */}
            <div>
              <input
                ref={heroFileInputRef}
                type="file"
                accept=".pdf,.docx,.doc"
                className="hidden"
                onChange={handleHeroFileChange}
              />
              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  isMatching ? 'border-emerald-400 bg-emerald-400/10' :
                  heroDragging ? 'border-emerald-400 bg-emerald-400/10' : 'border-slate-600 bg-slate-800/50 hover:bg-slate-800'
                }`}
                onDragOver={(e) => { e.preventDefault(); setHeroDragging(true); }}
                onDragLeave={() => setHeroDragging(false)}
                onDrop={handleHeroFileDrop}
              >
                {isMatching ? (
                  <>
                    <Loader2 className="w-10 h-10 mx-auto mb-3 text-emerald-400 animate-spin" />
                    <h3 className="text-lg font-semibold mb-1">Matching your profile...</h3>
                    <p className="text-slate-400 text-sm">Finding relevant openings for you</p>
                  </>
                ) : matchResults ? (
                  <>
                    <CheckCircle2 className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
                    <h3 className="text-lg font-semibold mb-1">
                      {matchResumeData?.firstName ? `Hi ${matchResumeData.firstName}!` : 'Resume analyzed!'}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">
                      {displayedJobs.length > 0
                        ? `We found ${displayedJobs.length} relevant position${displayedJobs.length > 1 ? 's' : ''} for you.`
                        : 'No matching positions found right now.'
                      }
                    </p>
                    <button
                      onClick={clearMatchResults}
                      className="text-sm text-slate-400 underline hover:text-white transition-colors"
                    >
                      Clear filter &middot; Show all jobs
                    </button>
                  </>
                ) : (
                  <>
                    <UploadCloud className={`w-10 h-10 mx-auto mb-3 ${heroDragging ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <h3 className="text-lg font-semibold mb-1">Find roles that match your profile</h3>
                    <p className="text-slate-400 text-sm mb-4">Drop your resume here or click below</p>
                    <button
                      onClick={() => heroFileInputRef.current?.click()}
                      className="px-5 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-lg font-medium transition-colors text-sm"
                    >
                      Upload Resume
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900">
                {hasMatchFilter ? 'Matching Positions' : 'Open Positions'}
              </h2>
              {hasMatchFilter && (
                <button
                  onClick={clearMatchResults}
                  className="text-sm text-slate-500 hover:text-slate-900 underline"
                >
                  Show all
                </button>
              )}
            </div>

            {!hasMatchFilter && (
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-grow md:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search roles..."
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <select className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>All Sectors</option>
                  <option>Corporate</option>
                  <option>Government</option>
                  <option>Development Sector</option>
                  <option>Public Health</option>
                </select>
              </div>
            )}
          </div>

          {/* No matches state */}
          {noMatches && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center mb-8">
              <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">No matching positions found</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                We don't have openings that closely match your profile right now, but we'd love to keep your CV on file.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={clearMatchResults}
                  className="px-5 py-2.5 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Browse All Positions
                </button>
                <button
                  onClick={() => setShowCvModal(true)}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  Send Us Your CV
                </button>
              </div>
            </div>
          )}

          {/* Job listings */}
          <div className="space-y-4">
            {displayedJobs.map(({ job, match }) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="flex gap-6 items-start flex-grow">
                  <div className={`w-12 h-12 rounded-lg ${job.iconBg} ${job.iconColor} flex items-center justify-center shrink-0`}>
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{job.title}</h3>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded">{job.sector}</span>
                      {match && match.score >= 50 && (
                        <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                          match.score >= 80 ? 'bg-emerald-50 text-emerald-600' :
                          match.score >= 60 ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {match.score}% Match
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm mb-3">{job.company} &middot; {job.tldr[0]}</p>
                    {match && match.reason && match.score >= 50 && (
                      <p className="text-emerald-600 text-xs mb-2">{match.reason}</p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                    </div>
                  </div>
                </div>
                <button className="px-5 py-2 border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap">
                  View Details
                </button>
              </div>
            ))}
          </div>

          {!hasMatchFilter && (
            <div className="mt-10 text-center">
              <button className="text-emerald-600 font-medium hover:text-emerald-700">View all open positions &rarr;</button>
            </div>
          )}

          {/* General Application CTA */}
          <div className="mt-12 bg-slate-100 rounded-2xl p-8 text-center border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Can't find your role?</h3>
            <p className="text-slate-600 text-sm mb-4">Send us your CV and we'll reach out when a matching opportunity opens up.</p>
            <button
              onClick={() => setShowCvModal(true)}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Send Us Your CV
            </button>
          </div>
        </div>
      </section>

      {/* Send CV Modal */}
      <AnimatePresence>
        {showCvModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowCvModal(false); setCvSubmitted(false); setCvFile(null); }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {cvSubmitted ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">CV Received!</h3>
                  <p className="text-slate-600 mb-8">
                    Thank you for your interest. Our team will review your profile and reach out when a relevant opportunity matches your experience.
                  </p>
                  <button
                    onClick={() => { setShowCvModal(false); setCvSubmitted(false); setCvFile(null); }}
                    className="w-full py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Send Us Your CV</h3>
                      <p className="text-slate-600 text-sm">We'll keep your profile on file and reach out when a matching opportunity opens up.</p>
                    </div>
                    <button onClick={() => { setShowCvModal(false); setCvFile(null); }} className="text-slate-400 hover:text-slate-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => { e.preventDefault(); setCvSubmitted(true); }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                        <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                        <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                      <input required type="email" placeholder="you@email.com" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                      <input required type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Upload CV</label>
                      <input
                        ref={cvFileInputRef}
                        type="file"
                        accept=".pdf,.docx,.doc"
                        className="hidden"
                        onChange={(e) => { if (e.target.files?.[0]) setCvFile(e.target.files[0]); }}
                      />
                      <div
                        onClick={() => cvFileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors"
                      >
                        {cvFile ? (
                          <div className="flex items-center justify-center gap-2 text-emerald-600">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm font-medium">{cvFile.name}</span>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setCvFile(null); }}
                              className="text-slate-400 hover:text-slate-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <UploadCloud className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                            <p className="text-sm text-slate-500">Click to upload PDF or DOCX</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Sector (optional)</label>
                      <select className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                        <option value="">Any sector</option>
                        <option>Government</option>
                        <option>Development Sector / NGO</option>
                        <option>Public Health</option>
                        <option>Corporate</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors mt-2 flex items-center justify-center gap-2"
                    >
                      Submit CV <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Slide-over Drawer */}
      <AnimatePresence>
        {selectedJob && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <button onClick={closeDrawer} className="hover:text-slate-900 transition-colors">Jobs</button>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-slate-900">{selectedJob.title}</span>
                </div>
                <button onClick={closeDrawer} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-grow overflow-y-auto">

                {/* STATE: Job Details */}
                {applyStep === 'details' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8"
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedJob.title}</h2>
                      <p className="text-lg text-slate-600 mb-6">{selectedJob.company}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {selectedJob.location}</span>
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /> {selectedJob.type}</span>
                        {selectedJob.salary && <span className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-slate-400" /> {selectedJob.salary}</span>}
                      </div>
                    </div>

                    <div className="space-y-8">
                      <section>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Overview</h3>
                        <ul className="space-y-2">
                          {selectedJob.tldr.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-600">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">The Role</h3>
                        <p className="text-slate-600 leading-relaxed">{selectedJob.mission}</p>
                      </section>

                      <section>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Requirements</h3>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                          {selectedJob.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </section>

                      <section className="bg-slate-900 text-white p-6 rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
                        <h3 className="text-lg font-bold mb-2 relative z-10">The SPC Advantage</h3>
                        <p className="text-slate-300 text-sm relative z-10">Direct access to the hiring team with complete transparency at every stage. Your application goes straight to the decision-makers, and you will receive a response within 72 hours.</p>

                        <div className="mt-6 flex items-center gap-4 relative z-10 border-t border-slate-700 pt-4">
                          <img src={selectedJob.recruiter.image} alt={selectedJob.recruiter.name} className="w-10 h-10 rounded-full object-cover border-2 border-slate-700" />
                          <div>
                            <p className="text-sm font-medium">{selectedJob.recruiter.name}</p>
                            <p className="text-xs text-slate-400">Managed by {selectedJob.recruiter.role}</p>
                          </div>
                        </div>
                      </section>
                    </div>
                  </motion.div>
                )}

                {/* STATE: Resume Upload */}
                {applyStep === 'resume' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8 h-full flex flex-col justify-center"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload your resume</h2>
                      <p className="text-slate-600">Upload your resume and we'll pre-fill your application details.</p>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.docx,.doc"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />

                    <div
                      className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-all ${
                        isParsing ? 'border-emerald-500 bg-emerald-50' :
                        isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
                      }`}
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleResumeDrop}
                    >
                      {isParsing ? (
                        <>
                          <Loader2 className="w-16 h-16 mx-auto mb-4 text-emerald-500 animate-spin" />
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">Parsing your resume...</h3>
                          <p className="text-slate-500 text-sm">Extracting your details</p>
                        </>
                      ) : (
                        <>
                          <UploadCloud className={`w-16 h-16 mx-auto mb-4 ${isDragging ? 'text-emerald-500' : 'text-slate-400'}`} />
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">Drag & drop your CV here</h3>
                          <p className="text-slate-500 text-sm mb-6">Supports PDF, DOCX (Max 5MB)</p>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 rounded-lg font-medium transition-colors shadow-sm"
                          >
                            Browse Files
                          </button>
                        </>
                      )}
                    </div>

                    {parseError && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
                        {parseError}
                      </div>
                    )}

                    <div className="mt-8 text-center">
                      <button onClick={() => { setParsedData(null); setApplyStep('form'); }} className="text-sm text-slate-500 hover:text-slate-900 underline">
                        Or fill out manually
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STATE: Form */}
                {applyStep === 'form' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8"
                  >
                    <div className="mb-8">
                      {parsedData ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold mb-4">
                          <CheckCircle2 className="w-3 h-3" /> Resume parsed successfully
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold mb-4">
                          <User className="w-3 h-3" /> Manual Entry
                        </div>
                      )}
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify your details</h2>
                      <p className="text-slate-600">
                        {parsedData ? 'We extracted this from your resume. Please verify and answer the screening question below.' : 'Please fill in your details and answer the screening question below.'}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                          <input type="text" defaultValue={parsedData?.firstName || ''} key={`fn-${parsedData?.firstName}`} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                          <input type="text" defaultValue={parsedData?.lastName || ''} key={`ln-${parsedData?.lastName}`} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input type="email" defaultValue={parsedData?.email || ''} key={`em-${parsedData?.email}`} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                        <input type="tel" defaultValue={parsedData?.phone || ''} key={`ph-${parsedData?.phone}`} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" />
                      </div>

                      <div className="pt-6 border-t border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Screening Question</h3>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">How many years of relevant experience do you have?</label>
                          <select
                            key={`exp-${parsedData?.yearsOfExperience}`}
                            defaultValue={getExperienceBucket(parsedData?.yearsOfExperience || '')}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
                          >
                            <option value="">Select an option...</option>
                            <option value="Less than 3 years">Less than 3 years</option>
                            <option value="3-5 years">3-5 years</option>
                            <option value="5-10 years">5-10 years</option>
                            <option value="10+ years">10+ years</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STATE: Success */}
                {applyStep === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 h-full flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Received!</h2>
                    <p className="text-lg text-slate-600 mb-8 max-w-md">
                      {selectedJob.recruiter.name}'s team is reviewing your profile. You will receive an update within 72 hours.
                    </p>
                    <button
                      onClick={closeDrawer}
                      className="text-slate-500 hover:text-slate-900 font-medium"
                    >
                      Return to Job Board
                    </button>
                  </motion.div>
                )}

              </div>

              {/* Drawer Footer */}
              {applyStep !== 'success' && (
                <div className="p-6 border-t border-slate-100 bg-white flex gap-4 z-10">
                  {applyStep === 'details' && (
                    <>
                      <button className="px-6 py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
                        Save for Later
                      </button>
                      <button
                        onClick={handleApplyClick}
                        className="flex-grow px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/20"
                      >
                        Apply Now
                      </button>
                    </>
                  )}
                  {applyStep === 'resume' && (
                    <button
                      onClick={() => setApplyStep('details')}
                      className="w-full px-6 py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Back to Job Details
                    </button>
                  )}
                  {applyStep === 'form' && (
                    <>
                      <button
                        onClick={() => setApplyStep('resume')}
                        className="px-6 py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setApplyStep('success')}
                        className="flex-grow px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
                      >
                        Submit Application
                      </button>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
