import React, { useState } from 'react';
import { Page, ContactSource } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Globe, Landmark, ArrowRight, CheckCircle2, X, Users, ShieldCheck, BrainCircuit, Heart, Search, FileText, ClipboardCheck, Handshake } from 'lucide-react';

export function Solutions({ setPage, navigateToContact }: { setPage: (page: Page) => void; navigateToContact: (source: ContactSource) => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<'form' | 'success'>('form');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col bg-white"
    >
      {/* Hero */}
      <section className="pt-20 pb-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
              Services built for scale, compliance, and impact.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Specialized HR, recruitment, and consulting frameworks for India's most demanding sectors.
            </p>
            <button
              onClick={() => navigateToContact({ sourcePage: 'solutions', sourceSection: 'Hero', ctaName: 'Discuss your requirements' })}
              className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
            >
              Discuss your requirements <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Primary Services (the big 3) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core services</h2>
            <p className="text-lg text-slate-600 max-w-2xl">The three areas where SPC delivers the most value for clients across Government, Development Sector, and Corporate organizations.</p>
          </div>

          <div className="space-y-6">
            {/* Recruitment & Staffing */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-8 md:p-10">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                        <Users className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Recruitment & Staffing</h3>
                    </div>
                    <p className="text-slate-600 mb-6">
                      Large-scale recruitment for government programs, public health missions, NGOs, and corporate organizations. We handle everything from sourcing to onboarding, with the capability to deploy hundreds of professionals across states within weeks.
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                      <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Large-scale program recruitment</li>
                      <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Specialist talent sourcing</li>
                      <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Pan-India hiring capability</li>
                      <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Public recruitment management</li>
                    </ul>
                    <button
                      onClick={() => navigateToContact({ sourcePage: 'solutions', sourceSection: 'Recruitment & Staffing', ctaName: 'Discuss recruitment needs' })}
                      className="text-blue-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Discuss recruitment needs <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Best suited for</p>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-center gap-2"><Landmark className="w-4 h-4 text-emerald-500" /> Government health programs</li>
                      <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500" /> NGO and INGO programs</li>
                      <li className="flex items-center gap-2"><Building2 className="w-4 h-4 text-purple-500" /> Corporate hiring at scale</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* HR Outsourcing */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-8 md:p-10">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">HR Outsourcing</h3>
                    </div>
                    <p className="text-slate-600 mb-6">
                      End-to-end HR operations support including payroll management, statutory compliance, workforce administration, and contract staffing. We take on the operational complexity so your team can focus on core objectives.
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                      <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Recruitment Process Outsourcing</li>
                      <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Payroll & compliance management</li>
                      <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Workforce administration</li>
                      <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Contract staffing</li>
                    </ul>
                    <button
                      onClick={() => navigateToContact({ sourcePage: 'solutions', sourceSection: 'HR Outsourcing', ctaName: 'Discuss HR outsourcing' })}
                      className="text-emerald-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Discuss HR outsourcing <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Best suited for</p>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-center gap-2"><Building2 className="w-4 h-4 text-purple-500" /> Mid-size and large enterprises</li>
                      <li className="flex items-center gap-2"><Landmark className="w-4 h-4 text-emerald-500" /> Government contract staffing</li>
                      <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500" /> Multi-location organizations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Assistance */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-8 md:p-10">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                        <Globe className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Technical Assistance</h3>
                    </div>
                    <p className="text-slate-600 mb-6">
                      Management support for UN-supported, INGO-supported, and government programs. We provide experienced professionals in HR, finance, logistics, and program coordination to ensure smooth implementation.
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                      <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> UN and INGO program support</li>
                      <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Finance and logistics management</li>
                      <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Program coordination</li>
                      <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Capacity building</li>
                    </ul>
                    <button
                      onClick={() => navigateToContact({ sourcePage: 'solutions', sourceSection: 'Technical Assistance', ctaName: 'Discuss program support' })}
                      className="text-amber-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Discuss program support <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Best suited for</p>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500" /> UN and INGO programs</li>
                      <li className="flex items-center gap-2"><Landmark className="w-4 h-4 text-emerald-500" /> Government health missions</li>
                      <li className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-500" /> Development sector initiatives</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Services */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Additional capabilities</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-sm transition-shadow">
              <BrainCircuit className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Management Consulting</h3>
              <p className="text-slate-600 text-sm mb-4">HR strategy, organizational restructuring, and operational planning for organizations going through change or scale.</p>
              <button
                onClick={() => navigateToContact({ sourcePage: 'solutions', sourceSection: 'Management Consulting', ctaName: 'Discuss consulting needs' })}
                className="text-purple-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-sm transition-shadow">
              <Landmark className="w-8 h-8 text-slate-500 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Project Management Support</h3>
              <p className="text-slate-600 text-sm mb-4">Implementation and management support for large-scale government and development sector projects, including monitoring and evaluation.</p>
              <button
                onClick={() => navigateToContact({ sourcePage: 'solutions', sourceSection: 'Project Management', ctaName: 'Discuss project support' })}
                className="text-slate-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-sm transition-shadow">
              <Heart className="w-8 h-8 text-rose-500 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">CSR Advisory</h3>
              <p className="text-slate-600 text-sm mb-4">Strategy development, compliance, reporting, and program design for corporate and PSU clients meeting their CSR obligations.</p>
              <button
                onClick={() => navigateToContact({ sourcePage: 'solutions', sourceSection: 'CSR Advisory', ctaName: 'Discuss CSR advisory' })}
                className="text-rose-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How we work</h2>
            <p className="text-lg text-slate-600 max-w-2xl">Every engagement follows a structured approach. We focus on understanding the context before committing to action.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', icon: Search, title: 'Understand', desc: 'We start by understanding your sector, program, organizational context, and specific workforce challenges before proposing anything.' },
              { step: '02', icon: FileText, title: 'Assess', desc: 'We evaluate talent availability, timelines, compliance requirements, and budget constraints to give you a realistic picture.' },
              { step: '03', icon: ClipboardCheck, title: 'Execute', desc: 'We deploy our teams, begin sourcing or operations, and manage the process end-to-end with regular reporting.' },
              { step: '04', icon: Handshake, title: 'Support', desc: 'We stay engaged beyond deployment. Onboarding support, performance tracking, and issue resolution are part of every engagement.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative">
                  <div className="text-5xl font-bold text-slate-100 mb-4">{item.step}</div>
                  <Icon className="w-6 h-6 text-emerald-600 mb-3" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proof - Execution Numbers */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">20+</div>
              <div className="text-sm text-emerald-100">Years of execution</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">10,000+</div>
              <div className="text-sm text-emerald-100">Professionals deployed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">50+</div>
              <div className="text-sm text-emerald-100">Programs supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">Pan-India</div>
              <div className="text-sm text-emerald-100">Recruitment reach</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feasibility Assessment (redesigned) */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Not sure where to start?</h2>
            <p className="text-lg text-slate-600 mb-4">
              If you have a hiring requirement or workforce challenge but need clarity on feasibility, timelines, or costs, we can help.
            </p>
            <p className="text-slate-600 mb-8">
              Share your requirement and our consultants will prepare a feasibility assessment covering talent availability, compensation benchmarks, and realistic hiring timelines for your specific role and geography.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors inline-flex items-center justify-center gap-2"
              >
                Request a feasibility assessment <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateToContact({ sourcePage: 'solutions', sourceSection: 'Feasibility', ctaName: 'Talk to our team' })}
                className="px-6 py-3 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-white transition-colors inline-flex items-center justify-center gap-2"
              >
                Or talk to our team directly
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Have a workforce challenge?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">Whether it's a large-scale recruitment drive, an HR outsourcing decision, or staffing a government program, our team is ready to help.</p>
          <button
            onClick={() => navigateToContact({ sourcePage: 'solutions', sourceSection: 'Bottom CTA', ctaName: 'Get in Touch' })}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-emerald-900/20 inline-flex items-center gap-2"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Feasibility Assessment Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {modalStep === 'form' ? (
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Request a Feasibility Assessment</h3>
                      <p className="text-slate-600 text-sm">Share your requirement and our team will prepare a detailed assessment for you.</p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); setModalStep('success'); }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Target Role</label>
                      <input required type="text" placeholder="e.g., State Program Coordinator" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Sector</label>
                        <select className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                          <option>Government</option>
                          <option>Development Sector / NGO</option>
                          <option>Public Health</option>
                          <option>Corporate</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                        <input required type="text" placeholder="e.g., New Delhi" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Number of Positions (approx.)</label>
                      <input type="text" placeholder="e.g., 10, 50, 500+" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
                      <input required type="email" placeholder="you@organization.com" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <button type="submit" className="w-full py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors mt-4">
                      Submit Request
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Request Received</h3>
                  <p className="text-slate-600 mb-4">
                    Our consultants will prepare your feasibility assessment, including talent availability, compensation benchmarks, and realistic hiring timelines.
                  </p>
                  <p className="text-sm text-slate-500 mb-8">You can expect to receive it within 48 hours.</p>
                  <button onClick={() => { setIsModalOpen(false); setModalStep('form'); }} className="w-full py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
