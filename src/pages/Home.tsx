import React, { useState } from 'react';
import { Page, ContactSource } from '../types';
import { ArticleReader } from '../components/ArticleReader';
import { ArrowRight, Building2, Globe, Users, ShieldCheck, BrainCircuit, Landmark, Award, Heart, MapPin, Calendar, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Home({ setPage, navigateToContact }: { setPage: (page: Page) => void; navigateToContact: (source: ContactSource) => void }) {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [articleIndex, setArticleIndex] = useState<number | null>(null);

  const services = [
    {
      icon: Users, color: 'blue', title: 'Recruitment & Staffing', desc: 'Large-scale recruitment for government programs, public health missions, NGOs, and corporate organizations.',
      features: ['Large-scale program recruitment', 'Specialist talent sourcing', 'Pan-India hiring capability', 'Public recruitment management'],
      bestSuitedFor: [{ icon: Landmark, text: 'Government health programs' }, { icon: Globe, text: 'NGO and INGO programs' }, { icon: Building2, text: 'Corporate hiring at scale' }]
    },
    {
      icon: ShieldCheck, color: 'emerald', title: 'HR Outsourcing', desc: 'Compliant workforce deployment, payroll management, and end-to-end HR operations support.',
      features: ['Recruitment Process Outsourcing', 'Payroll & compliance management', 'Workforce administration', 'Contract staffing'],
      bestSuitedFor: [{ icon: Building2, text: 'Mid-size and large enterprises' }, { icon: Landmark, text: 'Government contract staffing' }, { icon: Globe, text: 'Multi-location organizations' }]
    },
    {
      icon: BrainCircuit, color: 'purple', title: 'Management Consulting', desc: 'Strategic advisory in human resources, organizational development, and operational planning.',
      features: ['HR strategy and design', 'Organizational restructuring', 'Operational planning for scale', 'Change management'],
      bestSuitedFor: [{ icon: Building2, text: 'Scaling corporate enterprises' }, { icon: Globe, text: 'Expanding INGOs' }]
    },
    {
      icon: Globe, color: 'amber', title: 'Technical Assistance', desc: 'Management support for UN, INGO, and government programs across HR, finance, and logistics.',
      features: ['UN and INGO program support', 'Finance and logistics management', 'Program coordination', 'Capacity building'],
      bestSuitedFor: [{ icon: Globe, text: 'UN and INGO programs' }, { icon: Landmark, text: 'Government health missions' }, { icon: Users, text: 'Development sector initiatives' }]
    },
    {
      icon: Landmark, color: 'slate', title: 'Project Management Support', desc: 'Implementation and management support for large-scale government and development sector projects.',
      features: ['Large-scale project implementation', 'Monitoring and evaluation', 'Operations management', 'Stakeholder coordination'],
      bestSuitedFor: [{ icon: Landmark, text: 'Government initiatives' }, { icon: Globe, text: 'Development sector projects' }]
    },
    {
      icon: Heart, color: 'rose', title: 'CSR Advisory', desc: 'Consulting and advisory for corporate and PSU clients on CSR strategy, compliance, and program design.',
      features: ['CSR strategy development', 'Compliance and reporting', 'Impact assessment', 'Program design'],
      bestSuitedFor: [{ icon: Building2, text: 'Corporate enterprises' }, { icon: Landmark, text: 'Public Sector Undertakings (PSUs)' }]
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col"
    >
      {/* 1. Hero */}
      <section className="relative pt-20 md:pt-24 pb-20 md:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00b1d9]/10 border border-[#00b1d9]/30 text-[#00b1d9] text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00b1d9] animate-pulse" />
              Established 2004 &middot; ISO 9001:2015 Certified
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              Execution demands the right people. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">We deliver them.</span>
            </h1>
            <p className="text-xl text-slate-100 leading-relaxed mb-10 max-w-2xl font-medium">
              Recruitment, HR outsourcing, and management consulting for Government programs, Development Sector organizations, Public Health initiatives, and Corporate enterprises across India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigateToContact({ sourcePage: 'home', sourceSection: 'Hero', ctaName: 'Get in Touch' })}
                className="px-8 py-4 bg-[#006b83] hover:bg-[#00849f] text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#006b83]/20"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage('talent')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
              >
                Explore Careers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Credibility Bar */}
      <section className="py-6 md:py-8 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <Calendar className="w-5 h-5 text-emerald-600" /> 20+ Years
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> ISO 9001:2015
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <MapPin className="w-5 h-5 text-emerald-600" /> Pan-India Presence
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <Award className="w-5 h-5 text-emerald-600" /> Govt Empaneled
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trusted By - Client Strip */}
      <section className="py-10 md:py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] mb-8 text-center">Trusted by organizations across sectors</p>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6">
            {[
              { name: 'UNICEF', initials: 'U', bg: 'bg-sky-500' },
              { name: 'ArcelorMittal', initials: 'AM', bg: 'bg-slate-700' },
              { name: 'DFID', initials: 'D', bg: 'bg-blue-600' },
              { name: 'Welspun', initials: 'W', bg: 'bg-slate-700' },
              { name: 'UNFPA', initials: 'UN', bg: 'bg-blue-500' },
              { name: 'Kawasaki', initials: 'K', bg: 'bg-slate-700' },
              { name: 'Save the Children', initials: 'SC', bg: 'bg-red-500' },
              { name: 'SIDBI', initials: 'S', bg: 'bg-emerald-600' },
              { name: 'Voltas', initials: 'V', bg: 'bg-slate-700' },
              { name: 'World Vision', initials: 'WV', bg: 'bg-amber-500' },
            ].map((client) => (
              <div key={client.name} className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 hover:border-slate-300 transition-colors">
                <div className={`w-6 h-6 ${client.bg} text-white rounded flex items-center justify-center font-bold text-[10px] shrink-0`}>
                  {client.initials}
                </div>
                <span className="text-slate-600 font-medium text-xs whitespace-nowrap">{client.name}</span>
              </div>
            ))}
          </div>

          <p className="text-center">
            <button onClick={() => setPage('company')} className="text-xs text-slate-400 hover:text-emerald-600 transition-colors font-medium">
              View all 20+ clients &rarr;
            </button>
          </p>
        </div>
      </section>

      {/* 4. Services Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">End-to-end workforce solutions</h2>
            <p className="text-lg text-slate-600">From recruitment to consulting, we handle the operational complexity so you can focus on outcomes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              const colorMap: Record<string, { bg: string; text: string; link: string }> = {
                blue: { bg: 'bg-blue-50', text: 'text-blue-600', link: 'text-blue-600' },
                emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', link: 'text-emerald-600' },
                purple: { bg: 'bg-purple-50', text: 'text-purple-600', link: 'text-purple-600' },
                amber: { bg: 'bg-amber-50', text: 'text-amber-600', link: 'text-amber-600' },
                slate: { bg: 'bg-slate-100', text: 'text-slate-700', link: 'text-slate-700' },
                rose: { bg: 'bg-rose-50', text: 'text-rose-600', link: 'text-rose-600' },
              };
              const c = colorMap[service.color];
              return (
                <div key={service.title} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                  <div className={`w-12 h-12 ${c.bg} ${c.text} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-6">{service.desc}</p>
                  <button onClick={() => setSelectedService(service)} className={`${c.link} font-medium flex items-center gap-1 hover:gap-2 transition-all`}>
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Sectors We Serve */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Deep expertise across India's key sectors</h2>
            <p className="text-lg text-slate-600">We understand the regulatory, operational, and cultural demands of each sector we serve.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer" onClick={() => setPage('solutions')}>
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" alt="Corporate" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <Building2 className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Corporate Enterprise</h3>
                <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">Talent acquisition, HR outsourcing, and consulting for scaling enterprises across India.</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer" onClick={() => setPage('solutions')}>
              <img src="/government-programs.svg" alt="Illustration of an Indian government building" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <Landmark className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Government Programs</h3>
                <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">Compliant, large-scale workforce deployment for state and central government initiatives.</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer" onClick={() => setPage('solutions')}>
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" alt="Development Sector" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <Globe className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Development Sector</h3>
                <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">Recruitment and capacity building for NGOs, UN agencies, and public health programs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why SPC Stats */}
      <section className="py-16 md:py-20 bg-[#073f51] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why institutions trust SPC for mission-critical hiring.</h2>
              <p className="text-[#d9f5fc] text-lg mb-8">Two decades of execution across India's most complex sectors.</p>
              <button onClick={() => navigateToContact({ sourcePage: 'home', sourceSection: 'Why SPC', ctaName: 'Learn About Our Approach' })} className="px-6 py-3 bg-[#006b83] text-white hover:bg-[#00849f] rounded-lg font-medium transition-colors">
                Discuss Your Requirements
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#0b5268]/60 p-6 rounded-xl border border-[#00b1d9]/20">
                <div className="text-4xl font-bold text-[#00b1d9] mb-2">20<span className="text-2xl">+</span></div>
                <div className="text-sm text-[#d9f5fc]">Years of sector expertise</div>
              </div>
              <div className="bg-[#0b5268]/60 p-6 rounded-xl border border-[#00b1d9]/20">
                <div className="text-4xl font-bold text-[#00b1d9] mb-2">10k<span className="text-2xl">+</span></div>
                <div className="text-sm text-[#d9f5fc]">Professionals deployed across India</div>
              </div>
              <div className="bg-[#0b5268]/60 p-6 rounded-xl border border-[#00b1d9]/20">
                <div className="text-4xl font-bold text-[#00b1d9] mb-2">50<span className="text-2xl">+</span></div>
                <div className="text-sm text-[#d9f5fc]">Government & development programs supported</div>
              </div>
              <div className="bg-[#0b5268]/60 p-6 rounded-xl border border-[#00b1d9]/20">
                <div className="text-4xl font-bold text-[#00b1d9] mb-2">Pan-India</div>
                <div className="text-sm text-[#d9f5fc]">Recruitment reach across all states</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Case Studies */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Execution in action.</h2>
            <p className="text-lg text-slate-600">Selected project highlights from our work across sectors.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-1.5 bg-emerald-500" />
              <div className="p-8">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded">GOVERNMENT</span>
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-3">Deployed 500+ field staff across 12 states in 30 days</h3>
                <p className="text-slate-600 text-sm mb-6">End-to-end recruitment and onboarding for a national public health surveillance program under tight government timelines.</p>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-2xl">
                  500+ <span className="text-sm font-normal text-slate-500">staff deployed</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-1.5 bg-blue-500" />
              <div className="p-8">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded">PUBLIC HEALTH</span>
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-3">Staffed district health teams across 24 states for NHM</h3>
                <p className="text-slate-600 text-sm mb-6">Recruited and placed program managers, data analysts, and field coordinators for National Health Mission operations.</p>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-2xl">
                  98% <span className="text-sm font-normal text-slate-500">positions filled</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-1.5 bg-purple-500" />
              <div className="p-8">
                <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-bold rounded">DEVELOPMENT SECTOR</span>
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-3">Technical assistance for UN-supported maternal health program</h3>
                <p className="text-slate-600 text-sm mb-6">Provided HR, finance, and logistics management support across multiple states for a multi-year development program.</p>
                <div className="flex items-center gap-2 text-purple-600 font-bold text-2xl">
                  24 <span className="text-sm font-normal text-slate-500">states covered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Insights Preview */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Insights from the field.</h2>
              <p className="text-lg text-slate-600">Research and analysis drawn from our work across Government, Development Sector, and Corporate organizations in India.</p>
            </div>
            <button onClick={() => setPage('insights')} className="px-6 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-medium transition-colors whitespace-nowrap">
              View All Insights
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-shadow group cursor-pointer" onClick={() => setArticleIndex(3)}>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded">REPORT</span>
                <span className="text-sm text-slate-500">Q2 2026</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">Public Health Workforce Trends in India: 2026 Outlook</h3>
              <p className="text-slate-600 mb-6">An analysis of hiring patterns, workforce gaps, and talent availability across National Health Mission and state health programs.</p>
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                Read Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-shadow group cursor-pointer" onClick={() => setArticleIndex(4)}>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded">DATA BRIEF</span>
                <span className="text-sm text-slate-500">Updated Quarterly</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">NGO & Development Sector Salary Benchmarks: India</h3>
              <p className="text-slate-600 mb-6">Compensation data and benchmarks across key roles in Indian NGOs, INGOs, and UN-supported programs.</p>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                View Data <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="py-16 md:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to discuss your workforce needs?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">Our team is ready to help you find, deploy, and manage the right talent for your programs and projects.</p>
          <button
            onClick={() => navigateToContact({ sourcePage: 'home', sourceSection: 'Bottom CTA', ctaName: 'Get in Touch' })}
            className="px-8 py-4 bg-[#006b83] hover:bg-[#00849f] text-white rounded-lg font-medium transition-all shadow-lg shadow-[#006b83]/20 inline-flex items-center gap-2"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Service Details Slide-Over Drawer */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    selectedService.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                    selectedService.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                    selectedService.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                    selectedService.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                    selectedService.color === 'slate' ? 'bg-slate-100 text-slate-700' :
                    'bg-rose-50 text-rose-600'
                  }`}>
                    <selectedService.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedService.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                <p className="text-slate-600 leading-relaxed mb-8">{selectedService.desc}</p>
                
                <h4 className="font-bold text-slate-900 mb-4">Core Capabilities</h4>
                <ul className="space-y-3 mb-8">
                  {selectedService.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                        selectedService.color === 'blue' ? 'text-blue-500' :
                        selectedService.color === 'emerald' ? 'text-emerald-500' :
                        selectedService.color === 'purple' ? 'text-purple-500' :
                        selectedService.color === 'amber' ? 'text-amber-500' :
                        selectedService.color === 'slate' ? 'text-slate-500' :
                        'text-rose-500'
                      }`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <h4 className="font-bold text-slate-900 mb-4">Best Suited For</h4>
                <div className="bg-white rounded-xl p-5 border border-slate-100 mb-8">
                  <ul className="space-y-4 text-sm text-slate-600">
                    {selectedService.bestSuitedFor.map((item: any, idx: number) => (
                      <li key={idx} className="flex items-center gap-3">
                        <item.icon className="w-4 h-4 text-slate-400" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="p-6 bg-white border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    navigateToContact({ sourcePage: 'home', sourceSection: selectedService.title, ctaName: 'Discuss your requirement' });
                  }}
                  className={`w-full py-4 text-white font-medium rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 ${
                    selectedService.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20' :
                    selectedService.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' :
                    selectedService.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/20' :
                    selectedService.color === 'amber' ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20' :
                    selectedService.color === 'slate' ? 'bg-slate-800 hover:bg-slate-900 shadow-slate-800/20' :
                    'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                  }`}
                >
                  Discuss your requirement <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {articleIndex !== null && <ArticleReader index={articleIndex} onClose={() => setArticleIndex(null)} onArticle={setArticleIndex} />}
    </motion.div>
  );
}
