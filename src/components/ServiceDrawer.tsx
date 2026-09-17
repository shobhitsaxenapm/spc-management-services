import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { ContactSource } from '../types';

export function ServiceDrawer({ 
  selectedService, 
  onClose, 
  navigateToContact,
  sourcePage 
}: { 
  selectedService: any; 
  onClose: () => void; 
  navigateToContact: (source: ContactSource) => void;
  sourcePage: 'home' | 'solutions';
}) {
  return (
    <AnimatePresence>
      {selectedService && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
                onClick={onClose}
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
                  onClose();
                  navigateToContact({ sourcePage, sourceSection: selectedService.title, ctaName: 'Discuss your requirement' });
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
  );
}
