import React, { useState } from 'react';
import { Page, ContactSource } from '../types';
import { Building2, ChevronRight, Globe, Users, ArrowRight, FileText, BarChart3, Briefcase, Mail, MapPin, Phone, Linkedin, Twitter, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SPCLogo } from './SPCLogo';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setPage: (page: Page) => void;
  navigateToContact: (source: ContactSource) => void;
}

export function Layout({ children, currentPage, setPage, navigateToContact }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNav = (page: Page) => {
    setPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex items-center gap-3 lg:gap-5 shrink-0">
              <div className="cursor-pointer" onClick={() => setPage('home')}>
                <SPCLogo size="md" />
              </div>
              <img src="/dun-bradstreet.png" alt="Dun & Bradstreet D-U-N-S Registered" className="h-12 w-auto object-contain" width={236} height={150} />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              <NavLink active={currentPage === 'solutions'} onClick={() => setPage('solutions')}>Solutions</NavLink>
              <NavLink active={currentPage === 'talent'} onClick={() => setPage('talent')}>Careers</NavLink>
              <NavLink active={currentPage === 'insights'} onClick={() => setPage('insights')}>Insights</NavLink>
              <NavLink active={currentPage === 'company'} onClick={() => setPage('company')}>About</NavLink>
              
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200">
                <button
                  onClick={() => navigateToContact({ sourcePage: currentPage, sourceSection: 'Navigation', ctaName: 'Get in Touch' })}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow"
                >
                  Get in Touch
                </button>
              </div>
            </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2 text-slate-600 hover:text-slate-900 transition-colors">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden shadow-lg"
            >
              <div className="px-4 py-6 space-y-2 flex flex-col">
                <MobileNavLink active={currentPage === 'solutions'} onClick={() => handleMobileNav('solutions')}>Solutions</MobileNavLink>
                <MobileNavLink active={currentPage === 'talent'} onClick={() => handleMobileNav('talent')}>Careers</MobileNavLink>
                <MobileNavLink active={currentPage === 'insights'} onClick={() => handleMobileNav('insights')}>Insights</MobileNavLink>
                <MobileNavLink active={currentPage === 'company'} onClick={() => handleMobileNav('company')}>About</MobileNavLink>
                <div className="pt-4 mt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      navigateToContact({ sourcePage: currentPage, sourceSection: 'Mobile Navigation', ctaName: 'Get in Touch' });
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-all text-center shadow-sm"
                  >
                    Get in Touch
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Column 1: About & Social */}
            <div className="col-span-1 md:col-span-4 pr-0 md:pr-8">
              <div className="mb-6">
                <SPCLogo size="sm" dark />
              </div>
              <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
                <p>
                  SPC Management is an ISO 9001:2015 certified management consulting company registered under the Companies Act, 1956. SPC works as a Specialist Recruiter to Indian Development Sector and Corporate, Business Process Outsourcer and Consulting Partner to organisations.
                </p>
                <p>
                  SPC provide Technical Assistance in Management Support areas including HR, Finance and Logistics to UN and INGO supported programmes. SPC also provide Project Management Support to Government implemented programmes.
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Column 2: Quick Links */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-white font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><button onClick={() => setPage('home')} className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Home</button></li>
                <li><button onClick={() => setPage('solutions')} className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Solutions</button></li>
                <li><button onClick={() => setPage('talent')} className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Careers</button></li>
                <li><button onClick={() => setPage('insights')} className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Insights</button></li>
                <li><button onClick={() => setPage('company')} className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> About</button></li>
              </ul>
            </div>

            {/* Column 3: Corporate Office */}
            <div className="col-span-1 md:col-span-3">
              <h4 className="text-white font-semibold mb-6">Corporate Office</h4>
              <div className="space-y-5 text-sm text-slate-400">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                  <p className="leading-relaxed">
                    17, US Complex, 120, Mathura<br />
                    Road, Opp. Indraprastha Apollo<br />
                    Hospital, New Delhi-110076
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                  <div>
                    <p>+91-11-26397200</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                  <p>contact@spc.co.in</p>
                </div>
              </div>
            </div>

            {/* Column 4: Mumbai Office */}
            <div className="col-span-1 md:col-span-3">
              <h4 className="text-white font-semibold mb-6">Mumbai Office</h4>
              <div className="space-y-5 text-sm text-slate-400">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                  <p className="leading-relaxed">
                    220, 2nd Floor, Dimple Arcade<br />
                    Behind Saidham<br />
                    Temple, Kandivali (East),<br />
                    Mumbai-400101
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                  <div>
                    <p>+91 (22) 65084810</p>
                    <p>+91 (22) 40024800</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="mt-16 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} SPC Management Services. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-sm font-medium transition-colors ${
        active ? 'text-emerald-600' : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      {children}
    </button>
  );
}

function MobileNavLink({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
        active ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      {children}
    </button>
  );
}
