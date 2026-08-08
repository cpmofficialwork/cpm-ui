import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useLocalizedData } from '../data/useLocalizedData';
import { useScrollLock } from '../hooks/useScrollLock';
import { Shield, Scale, Users, CheckCircle2, ChevronRight, X, BookOpen, Quote } from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = { Scale, Users, Shield };

export const WhoConducts: React.FC = () => {
  const { t } = useTranslation('whoConducts');
  const { ORGANIZERS } = useLocalizedData();
  const [selectedOrganizerId, setSelectedOrganizerId] = useState<string | null>(null);
  const selectedOrganizer = ORGANIZERS.find((o) => o.id === selectedOrganizerId) ?? null;
  const organizers = ORGANIZERS;

  useScrollLock(!!selectedOrganizer);

  return (
    <section id="who-conducts" className="py-20 bg-[#F8F6F0] text-[#0A1F44] border-b border-[#0A1F44]/10 relative overflow-hidden">
      
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0A1F44_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#0A1F44]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#0A1F44]/20 rounded-full text-[#0A1F44] text-xs font-mono font-bold uppercase tracking-[0.2em] shadow-sm"
          >
            <Users className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>{t('badge')}</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif-display font-bold text-[#0A1F44] tracking-tight"
          >
            {t('heading')}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#0A1F44]/80 font-sans-body leading-relaxed"
          >
            {t('subheading')}
          </motion.p>
        </div>        {/* Simple & Sharp Border Testimonial Cards Layout with Circular Profile Images */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {organizers.map((organizer, index) => (
            <motion.div
              key={organizer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className="bg-white border-2 border-[#0A1F44] rounded-none p-6 sm:p-7 shadow-[5px_5px_0px_0px_rgba(10,31,68,0.12)] hover:shadow-[7px_7px_0px_0px_rgba(255,153,51,0.85)] transition-all duration-300 relative flex flex-col md:flex-row items-center md:items-start gap-6 group"
            >
              {/* Top Right Floating View Profile Button */}
              <button
                onClick={() => setSelectedOrganizerId(organizer.id)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3.5 py-1.5 bg-[#0A1F44] hover:bg-[#FF9933] text-white hover:text-[#0A1F44] font-mono text-xs uppercase font-bold tracking-wider rounded-none border-2 border-[#0A1F44] shadow-[2px_2px_0px_0px_rgba(10,31,68,0.2)] hover:shadow-none transition-all duration-300 flex items-center gap-1.5 cursor-pointer z-10"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('viewProfile')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Circular Profile Image */}
              <div className="relative shrink-0 pt-6 md:pt-0">
                <div 
                  onClick={() => setSelectedOrganizerId(organizer.id)}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#0A1F44] shadow-md bg-[#0A1F44] cursor-pointer group/img"
                  title={t('clickToView')}
                >
                  <img
                    src={organizer.image}
                    alt={organizer.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 right-0 p-1.5 bg-[#FF9933] text-[#0A1F44] rounded-full border-2 border-[#0A1F44] shadow-sm">
                  {(() => {
                    const IconComp = ICON_MAP[organizer.iconName] || Scale;
                    return <IconComp className="w-5 h-5" />;
                  })()}
                </div>
              </div>

              {/* Testimonial Main Content */}
              <div className="flex-1 space-y-3 text-center md:text-left w-full">
                {/* md:pr-* clears the absolutely-positioned "View Profile" button
                    (~250px wide for the longer Tamil label) — reserved only on
                    this header row, not the whole content block, so the quote
                    box below can still use the full card width. */}
                <div className="border-b border-[#0A1F44]/15 pb-3 md:pr-64">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#0A1F44]">
                      {organizer.name}
                    </h3>
                    <span className="px-2.5 py-0.5 bg-[#0A1F44] text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-none border border-[#0A1F44]">
                      {organizer.badge}
                    </span>
                  </div>
                  <p className="text-xs font-mono font-extrabold text-[#FF9933] uppercase tracking-wider mt-1">
                    {organizer.designation}
                  </p>
                </div>

                {/* Testimonial Quote */}
                <div className="relative pl-4 border-l-4 border-[#FF9933] bg-[#F8F6F0] p-3.5 rounded-none border-y border-r border-[#0A1F44]/10 text-left">
                  <Quote className="w-4 h-4 text-[#FF9933] absolute top-2 right-2 opacity-30" />
                  <p className="text-sm font-serif italic text-[#0A1F44] leading-relaxed pr-4">
                    "{organizer.roleDescription}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Organizer Detail Biography Modal — portaled straight into <body> so its
          "fixed inset-0" sizes against the real viewport. Left inside this
          section's own DOM subtree, it would size against the AnimatedSection
          wrapper instead (any ancestor with a `transform` — which its scroll-in
          animation applies — becomes the containing block for fixed
          descendants), squashing it down below the sticky header. */}
      {createPortal(
      <AnimatePresence>
        {selectedOrganizer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedOrganizerId(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F8F6F0] text-[#0A1F44] border-2 border-[#0A1F44] max-w-2xl w-full max-h-[88vh] overflow-y-auto p-4 sm:p-8 rounded-none shadow-[10px_10px_0px_0px_rgba(10,31,68,0.3)] relative"
            >
              <button 
                onClick={() => setSelectedOrganizerId(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 bg-[#F8F6F0] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white transition-colors cursor-pointer border border-[#0A1F44] rounded-none"
                aria-label={t('closeProfile')}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start pt-2 sm:pt-0">
                <div className="w-20 h-20 sm:w-32 sm:h-32 shrink-0 rounded-full overflow-hidden border-2 sm:border-4 border-[#0A1F44] shadow-lg bg-[#0A1F44]">
                  <img 
                    src={selectedOrganizer.image} 
                    alt={selectedOrganizer.name} 
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="space-y-4 flex-1 text-center sm:text-left w-full">
                  <div>
                    <span className="px-2.5 py-1 bg-[#0A1F44] text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded-none border border-[#0A1F44] inline-block">
                      {selectedOrganizer.badge}
                    </span>
                    <h3 className="text-xl sm:text-3xl font-serif-display font-bold text-[#0A1F44] mt-2">
                      {selectedOrganizer.name}
                    </h3>
                    <div className="text-xs font-mono text-[#FF9933] font-extrabold uppercase mt-0.5">
                      {selectedOrganizer.designation}
                    </div>
                  </div>

                  <div className="text-xs font-sans-body text-[#0A1F44]/90 leading-relaxed border-t border-b border-[#0A1F44]/20 py-3 text-left">
                    <h4 className="font-mono text-[11px] uppercase font-bold text-[#0A1F44] mb-1">{t('biography')}</h4>
                    <p className="leading-relaxed">{selectedOrganizer.extendedBio}</p>
                  </div>

                  {/* Key Directives */}
                  <div className="space-y-2 text-left">
                    <div className="text-xs font-mono font-bold text-[#0A1F44] uppercase tracking-wider">
                      {t('keyDirectives')}
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#0A1F44]">
                      {selectedOrganizer.keyFocusAreas.map((focus, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#138808] shrink-0" />
                          <span>{focus}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Social Handles in Modal */}
                  {selectedOrganizer.socials.length > 0 && (
                  <div className="pt-2 space-y-1.5 text-left">
                    <div className="text-[10px] font-mono text-[#0A1F44]/80 uppercase font-bold">
                      {t('socialHandles')}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedOrganizer.socials.map((s) => (
                        <a
                          key={s.platform}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 bg-white border border-[#0A1F44] hover:bg-[#0A1F44] hover:text-white rounded-none text-xs font-mono font-bold text-[#0A1F44] flex items-center gap-1.5 shadow-sm transition-all max-w-full truncate"
                        >
                          {s.platform.includes('Twitter') && (
                            <svg className="w-3.5 h-3.5 fill-current shrink-0 text-[#1DA1F2]" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          )}
                          {s.platform.includes('Facebook') && (
                            <svg className="w-3.5 h-3.5 fill-current shrink-0 text-[#1877F2]" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                          )}
                          {s.platform.includes('Instagram') && (
                            <svg className="w-3.5 h-3.5 fill-current shrink-0 text-pink-600" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                          )}
                          <span className="truncate">{s.platform}: {s.handle}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                  )}

                  <div className="pt-3">
                    <button
                      onClick={() => setSelectedOrganizerId(null)}
                      className="w-full py-3 bg-[#0A1F44] text-white font-bold text-xs font-mono uppercase tracking-widest rounded-none border-2 border-[#0A1F44] hover:bg-[#FF9933] hover:text-[#0A1F44] transition-colors cursor-pointer"
                    >
                      {t('closeProfile')}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}

    </section>
  );
};
