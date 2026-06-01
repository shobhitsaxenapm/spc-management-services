import React, { useState } from 'react';
import { Page, ContactSource } from '../types';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, ShieldCheck, Users, Globe, Landmark, Heart, BrainCircuit, Building2, Award, Calendar, CheckCircle2, ArrowRight, Clock, FileText } from 'lucide-react';

const INQUIRY_RESPONSES: Record<string, { title: string; detail: string; team: string }> = {
  'Recruitment & Staffing': {
    title: 'Your recruitment inquiry has been received.',
    detail: 'A member of our recruitment practice will review your requirements and connect with you to discuss scope, timelines, and candidate profiles.',
    team: 'Recruitment Practice',
  },
  'HR Outsourcing': {
    title: 'Your HR outsourcing inquiry has been received.',
    detail: 'Our HR operations team will assess your requirements and prepare a preliminary engagement overview for your review.',
    team: 'HR Outsourcing Team',
  },
  'Government / Development Sector Project': {
    title: 'Your project inquiry has been received.',
    detail: 'Our Government and Development Sector practice will review your program requirements and reach out to discuss how we can support your initiative.',
    team: 'Government & Development Practice',
  },
  'Management Consulting': {
    title: 'Your consulting inquiry has been received.',
    detail: 'A senior consultant will review your requirements and schedule a discussion to understand your organizational needs in detail.',
    team: 'Consulting Practice',
  },
  'CSR Advisory': {
    title: 'Your CSR advisory inquiry has been received.',
    detail: 'Our CSR advisory team will review your requirements and connect with you to discuss strategy, compliance, and program design.',
    team: 'CSR Advisory Team',
  },
  'General Inquiry': {
    title: 'Your inquiry has been received.',
    detail: 'Our team will review your message and route it to the appropriate practice. Someone will be in touch shortly.',
    team: 'Client Relations',
  },
};

export function Company({ setPage, contactSource, navigateToContact }: { setPage: (page: Page) => void; contactSource: ContactSource | null; navigateToContact: (source: ContactSource) => void }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState('General Inquiry');
  const [submittedName, setSubmittedName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [inquiryType, setInquiryType] = useState('Recruitment & Staffing');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedName(firstName);
    setSubmittedInquiry(inquiryType);
    setFormSubmitted(true);
  };

  const inquiryResponse = INQUIRY_RESPONSES[submittedInquiry] || INQUIRY_RESPONSES['General Inquiry'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col bg-white min-h-screen"
    >
      {/* Hero */}
      <section className="pt-20 pb-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
              Two decades of trust, execution, and impact.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              SPC Management Services was founded in 2004 on the belief that great strategy fails without the right people to execute it. We bridge that gap across Government, Development Sector, Public Health, and Corporate organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Story</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Established in 2004, SPC Management Services is an ISO 9001:2015 certified management consulting company registered under the Companies Act, 1956. Over two decades, we have grown from a specialist recruitment firm into a comprehensive workforce solutions partner serving India's most demanding sectors.
                </p>
                <p>
                  Today, SPC operates as a recruitment partner, HR outsourcing provider, management consultant, and project implementation support organization. We serve Government ministries, UN-supported programs, international NGOs, public health initiatives, and corporate enterprises across India.
                </p>
                <p>
                  Our approach is rooted in deep domain expertise, operational discipline, and an unwavering commitment to compliance and ethical practice. We go beyond filling positions. We ensure that the right people are in the right roles, enabling our clients to execute their most critical programs.
                </p>
              </div>
            </div>

            {/* Key Facts */}
            <div>
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 sticky top-28">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Key Facts</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
                    <Calendar className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Est. 2004</div>
                      <div className="text-sm text-slate-500">Founded</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">ISO 9001:2015</div>
                      <div className="text-sm text-slate-500">Certified</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
                    <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Pan-India</div>
                      <div className="text-sm text-slate-500">Operational Presence</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Award className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Govt Empaneled</div>
                      <div className="text-sm text-slate-500">Recognized Partner</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-emerald-300 uppercase tracking-wider mb-6">Our Vision</p>
          <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed text-emerald-50">
            "To be a socially sensitive, ethical consulting company trusted for its integrity, capability, and execution."
          </blockquote>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">What we do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, color: 'blue', title: 'Recruitment & Staffing', desc: 'Large-scale recruitment for government, public health, NGO, and corporate sectors.' },
              { icon: ShieldCheck, color: 'emerald', title: 'HR Outsourcing', desc: 'Payroll, compliance, workforce management, and end-to-end HR operations.' },
              { icon: BrainCircuit, color: 'purple', title: 'Management Consulting', desc: 'HR strategy, organizational development, and operational planning.' },
              { icon: Globe, color: 'amber', title: 'Technical Assistance', desc: 'Management support for UN, INGO, and government programs.' },
              { icon: Landmark, color: 'slate', title: 'Project Management Support', desc: 'Implementation support for government and development sector projects.' },
              { icon: Heart, color: 'rose', title: 'CSR Advisory', desc: 'CSR strategy, compliance, reporting, and program design.' },
            ].map((service) => {
              const Icon = service.icon;
              const colors: Record<string, { bg: string; text: string }> = {
                blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
                emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
                purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
                amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
                slate: { bg: 'bg-slate-100', text: 'text-slate-700' },
                rose: { bg: 'bg-rose-50', text: 'text-rose-600' },
              };
              const c = colors[service.color];
              return (
                <div key={service.title} className="group cursor-pointer" onClick={() => setPage('solutions')}>
                  <div className={`w-12 h-12 ${c.bg} ${c.text} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-600 text-sm">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Sectors we serve</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Landmark, title: 'Government', desc: 'Ministry programs, public sector initiatives, and state/central government projects.' },
              { icon: Globe, title: 'Development Sector', desc: 'NGOs, INGOs, UN agencies, and international development organizations.' },
              { icon: Building2, title: 'Public Health', desc: 'Healthcare workforce recruitment and public health program support.' },
              { icon: Users, title: 'Corporate', desc: 'Recruitment, HR outsourcing, and consulting for enterprises.' },
            ].map((sector) => {
              const Icon = sector.icon;
              return (
                <div key={sector.title} className="bg-white p-6 rounded-xl border border-slate-200">
                  <Icon className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{sector.title}</h3>
                  <p className="text-slate-600 text-sm">{sector.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Clients */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Organizations that trust SPC</h2>
            <p className="text-lg text-slate-600">From Fortune 500 companies to UN agencies, we've partnered with organizations across sectors with the same commitment to every engagement.</p>
          </div>

          {/* Featured / Marquee Clients */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
            {[
              { name: 'UNICEF', initials: 'U', bg: 'bg-sky-500', sector: 'Development' },
              { name: 'ArcelorMittal', initials: 'AM', bg: 'bg-slate-700', sector: 'Corporate' },
              { name: 'DFID', initials: 'D', bg: 'bg-blue-600', sector: 'Development' },
              { name: 'Welspun', initials: 'W', bg: 'bg-slate-700', sector: 'Corporate' },
            ].map((client) => (
              <div key={client.name} className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center gap-4 hover:shadow-md hover:border-slate-300 transition-all">
                <div className={`w-12 h-12 ${client.bg} text-white rounded-xl flex items-center justify-center font-bold text-lg shrink-0`}>
                  {client.initials}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-base">{client.name}</p>
                  <p className="text-xs text-slate-400">{client.sector}</p>
                </div>
              </div>
            ))}
          </div>

          {/* All Clients Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { name: 'UNFPA', initials: 'UN', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
              { name: 'Jubilant', initials: 'J', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
              { name: 'Save the Children', initials: 'SC', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
              { name: 'Voltas Limited', initials: 'V', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
              { name: 'World Vision', initials: 'WV', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
              { name: 'ORIX', initials: 'O', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
              { name: 'SIDBI', initials: 'S', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
              { name: 'Visteon', initials: 'Vi', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
              { name: 'CRY', initials: 'C', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
              { name: 'Kawasaki', initials: 'K', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
              { name: 'FISME', initials: 'F', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
              { name: 'Bajaj Industries', initials: 'BI', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
              { name: 'IDEI', initials: 'ID', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100' },
              { name: 'GVK Pharma', initials: 'GVK', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
              { name: 'PHFI', initials: 'PH', color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100' },
              { name: 'Bakson\'s', initials: 'B', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
            ].map((client) => (
              <div key={client.name} className={`${client.bg} border ${client.border} rounded-xl px-4 py-4 flex items-center gap-3 hover:shadow-sm transition-all`}>
                <div className={`w-9 h-9 rounded-lg ${client.bg} ${client.color} flex items-center justify-center font-bold text-xs shrink-0`}>
                  {client.initials}
                </div>
                <span className="text-slate-700 font-medium text-sm leading-tight">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {contactSource && (
            <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className="text-emerald-800 text-sm font-medium">
                You clicked "{contactSource.ctaName}" from the {contactSource.sourceSection} section. Fill out the form below and our team will get back to you.
              </p>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Get in Touch</h2>
              <p className="text-slate-600 mb-10">
                Whether you need to scale a public health initiative, build a corporate leadership team, or outsource your HR operations, our experts are ready to help.
              </p>

              <div className="space-y-8">
                {/* Corporate Office */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Corporate Office</h4>
                    <p className="text-slate-600">17, US Complex, 120, Mathura Road,<br />Opp. Indraprastha Apollo Hospital,<br />New Delhi-110076</p>
                  </div>
                </div>

                {/* Mumbai Office */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Mumbai Office</h4>
                    <p className="text-slate-600">220, 2nd Floor, Dimple Arcade,<br />Behind Saidham Temple, Kandivali (East),<br />Mumbai-400101</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Call Us</h4>
                    <p className="text-slate-600">+91-11-26397200 (Delhi)</p>
                    <p className="text-slate-600">+91 (22) 65084810 (Mumbai)</p>
                    <p className="text-slate-600">+91 (22) 40024800 (Mumbai)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Email Us</h4>
                    <p className="text-slate-600">contact@spc.co.in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form / Success State */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              {formSubmitted ? (
                <div>
                  {/* Success State */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {submittedName ? `Thank you, ${submittedName}.` : 'Thank you.'}
                    </h3>
                    <p className="text-slate-600 text-sm">{inquiryResponse.title}</p>
                  </div>

                  {/* What Happens Next */}
                  <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
                    <h4 className="font-bold text-slate-900 text-sm mb-4">What happens next</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Inquiry routed to {inquiryResponse.team}</p>
                          <p className="text-xs text-slate-500">Your message has been assigned to the relevant practice.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Review and assessment</p>
                          <p className="text-xs text-slate-500">{inquiryResponse.detail}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold">3</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Response within 24-48 hours</p>
                          <p className="text-xs text-slate-500">A team member will contact you via email or phone to take the conversation forward.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Direct Contact Fallback */}
                  <div className="bg-slate-100 rounded-lg p-4 mb-6">
                    <p className="text-xs text-slate-500 mb-1">Need an immediate response?</p>
                    <p className="text-sm text-slate-700 font-medium">Call us at +91-11-26397200 or email contact@spc.co.in</p>
                  </div>

                  {/* Secondary Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPage('solutions')}
                      className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" /> Explore Services
                    </button>
                    <button
                      onClick={() => setPage('insights')}
                      className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ArrowRight className="w-3.5 h-3.5" /> View Insights
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Send an Inquiry</h3>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="hidden" name="source_page" value={contactSource?.sourcePage || 'direct'} />
                    <input type="hidden" name="source_section" value={contactSource?.sourceSection || 'direct'} />
                    <input type="hidden" name="cta_name" value={contactSource?.ctaName || 'direct'} />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                        <input
                          required
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                        <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
                      <input required type="email" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Inquiry Type</label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
                      >
                        <option>Recruitment & Staffing</option>
                        <option>HR Outsourcing</option>
                        <option>Government / Development Sector Project</option>
                        <option>Management Consulting</option>
                        <option>CSR Advisory</option>
                        <option>General Inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                      <textarea required rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"></textarea>
                    </div>
                    <button type="submit" className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      Send Message <Send className="w-4 h-4" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
