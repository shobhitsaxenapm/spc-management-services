import React, { useState } from 'react';
import { Page, ContactSource } from '../types';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, CheckCircle2, Mail, TrendingUp, Users, Clock, Building2, Globe, Landmark } from 'lucide-react';

export function Insights({ setPage, navigateToContact }: { setPage: (page: Page) => void; navigateToContact: (source: ContactSource) => void }) {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col bg-white min-h-screen"
    >
      {/* Header */}
      <section className="pt-20 pb-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
              What we're seeing across the sectors we serve.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Perspectives, project highlights, and workforce observations drawn from SPC's work with Government, Development Sector, Public Health, and Corporate organizations in India.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Featured Quarterly Perspective */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.15em] mb-8">Quarterly Perspective / Q2 2026</p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
                Public health programs are shifting from expatriate-led models to localized talent. Here's what that means for hiring.
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Over the past two years, we've observed a significant shift in how public health programs staff their operations in India. International organizations and government agencies are increasingly prioritizing regional candidates over centrally deployed staff.
                </p>
                <p>
                  This has created new challenges: the demand for experienced district-level program managers has outpaced supply in several states, particularly in the Northeast and Central regions. Organizations that plan their talent pipeline in advance are filling positions 40% faster than those that begin recruitment after program approval.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={() => navigateToContact({ sourcePage: 'insights', sourceSection: 'Quarterly Perspective', ctaName: 'Discuss workforce planning' })}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors text-sm"
                >
                  Discuss workforce planning
                </button>
              </div>
            </div>

            {/* Key Data Points */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Key observations</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">40%</p>
                    <p className="text-sm text-slate-600">Faster hiring when talent pipeline planning begins before program approval</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">3x</p>
                    <p className="text-sm text-slate-600">Increase in demand for regional program managers in the last 18 months</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">45-60 days</p>
                    <p className="text-sm text-slate-600">Average time-to-hire for senior public health roles in Tier 2 cities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Project Highlights (Case Studies) */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Project highlights</h2>
              <p className="text-slate-600">Selected examples of SPC's execution across sectors.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Case Study 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="h-1.5 bg-emerald-500" />
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3">Government / Public Health</span>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Deployed 500+ field staff across 12 states in 30 days</h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow">End-to-end recruitment and onboarding for a national public health surveillance program under tight government timelines.</p>
                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">Scale</p>
                    <p className="font-bold text-slate-900">500+ staff</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Timeline</p>
                    <p className="font-bold text-slate-900">30 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="h-1.5 bg-blue-500" />
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Development Sector</span>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Technical assistance for UN-supported maternal health program</h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow">Provided HR, finance, and logistics management support across multiple states for a multi-year development program.</p>
                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">Coverage</p>
                    <p className="font-bold text-slate-900">24 states</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Duration</p>
                    <p className="font-bold text-slate-900">Multi-year</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="h-1.5 bg-purple-500" />
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-3">Corporate</span>
                <h3 className="text-lg font-bold text-slate-900 mb-3">HR outsourcing for a leading FMCG company across 8 locations</h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow">Managed payroll, compliance, and workforce administration for 1,000+ employees across manufacturing and distribution facilities.</p>
                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">Employees</p>
                    <p className="font-bold text-slate-900">1,000+</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Locations</p>
                    <p className="font-bold text-slate-900">8 sites</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sector Expertise - What SPC Observes */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Hiring landscape by sector</h2>
            <p className="text-slate-600">What we're seeing across the sectors we serve, based on our recent engagements.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Landmark,
                color: 'emerald',
                sector: 'Government',
                observation: 'State governments are increasingly outsourcing recruitment for health and infrastructure programs. Demand for program coordinators and M&E specialists has grown significantly in the last year.',
                hiring: 'High demand',
                challenge: 'Compliance-heavy, tight timelines',
              },
              {
                icon: Globe,
                color: 'blue',
                sector: 'Development Sector',
                observation: 'International organizations are localizing operations, creating strong demand for regional project managers with both technical and government liaison skills.',
                hiring: 'Growing demand',
                challenge: 'Shortage of bilingual senior managers',
              },
              {
                icon: Building2,
                color: 'slate',
                sector: 'Public Health',
                observation: 'National Health Mission and related programs continue to drive large-scale recruitment across states. District-level roles remain the hardest to fill in Tier 2 and Tier 3 cities.',
                hiring: 'Consistent demand',
                challenge: 'Geographic reach, candidate availability',
              },
              {
                icon: Users,
                color: 'purple',
                sector: 'Corporate',
                observation: 'Mid-size enterprises are moving toward outsourced HR models as they scale operations. Demand for compliance-aware HR operations managers is rising in manufacturing and FMCG.',
                hiring: 'Moderate demand',
                challenge: 'Retention in competitive markets',
              },
            ].map((item) => {
              const Icon = item.icon;
              const colorMap: Record<string, { iconBg: string; iconText: string; badge: string }> = {
                emerald: { iconBg: 'bg-emerald-100', iconText: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700' },
                blue: { iconBg: 'bg-blue-100', iconText: 'text-blue-600', badge: 'bg-blue-50 text-blue-700' },
                slate: { iconBg: 'bg-slate-100', iconText: 'text-slate-600', badge: 'bg-slate-100 text-slate-700' },
                purple: { iconBg: 'bg-purple-100', iconText: 'text-purple-600', badge: 'bg-purple-50 text-purple-700' },
              };
              const c = colorMap[item.color];
              return (
                <div key={item.sector} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-10 h-10 ${c.iconBg} ${c.iconText} rounded-lg flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{item.sector}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${c.badge}`}>{item.hiring}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{item.observation}</p>
                  <div className="text-xs text-slate-400">
                    <span className="font-medium text-slate-500">Key challenge:</span> {item.challenge}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigateToContact({ sourcePage: 'insights', sourceSection: 'Sector Expertise', ctaName: 'Discuss hiring in your sector' })}
              className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors inline-flex items-center gap-2 text-sm"
            >
              Discuss hiring in your sector <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Perspectives (Articles) */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Perspectives</h2>
            <p className="text-slate-600">Short reads on topics our clients ask about most.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                sector: 'Corporate',
                sectorColor: 'text-purple-600',
                title: 'The case for HR outsourcing in mid-size Indian enterprises',
                desc: 'Why growing companies are moving from in-house HR to outsourced models, and what to look for in a partner.',
                read: '6 min read',
              },
              {
                sector: 'Government',
                sectorColor: 'text-emerald-600',
                title: 'Balancing speed and compliance in government recruitment',
                desc: 'How state programs can staff at scale without compromising on compliance or candidate quality.',
                read: '5 min read',
              },
              {
                sector: 'CSR',
                sectorColor: 'text-rose-600',
                title: 'CSR compliance and reporting: common pitfalls',
                desc: 'What companies frequently get wrong in CSR program design, and how advisory support prevents costly mistakes.',
                read: '4 min read',
              },
            ].map((article) => (
              <div key={article.title} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-sm transition-shadow cursor-pointer group flex flex-col">
                <span className={`text-xs font-medium ${article.sectorColor} mb-3`}>{article.sector}</span>
                <h3 className="text-base font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors leading-snug">{article.title}</h3>
                <p className="text-slate-600 text-sm mb-4 flex-grow">{article.desc}</p>
                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3">
                  <span>{article.read}</span>
                  <span className="flex items-center gap-1 font-medium text-slate-600 group-hover:text-emerald-600">Read <ArrowUpRight className="w-3 h-3" /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Subscribe + CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Subscribe */}
            <div>
              <h2 className="text-2xl font-bold mb-3">Quarterly updates from SPC</h2>
              <p className="text-slate-300 mb-6">
                We share one update per quarter with workforce observations, project highlights, and sector analysis. No spam, no weekly newsletters.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-emerald-300 text-sm font-medium">You're subscribed. You'll hear from us next quarter.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} className="flex gap-3">
                  <div className="flex-grow relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="email"
                      placeholder="Your work email"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <button type="submit" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* CTA */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-3">Have a workforce challenge?</h3>
              <p className="text-slate-300 text-sm mb-6">
                Whether it's a large-scale recruitment drive, an HR outsourcing decision, or staffing a government program, our team can help you plan.
              </p>
              <button
                onClick={() => navigateToContact({ sourcePage: 'insights', sourceSection: 'Bottom CTA', ctaName: 'Talk to our team' })}
                className="px-6 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors inline-flex items-center gap-2 text-sm"
              >
                Talk to our team <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
