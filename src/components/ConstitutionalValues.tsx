import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useLocalizedData } from '../data/useLocalizedData';
import { ConstitutionalValue } from '../types';
import { useScrollLock } from '../hooks/useScrollLock';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crown, Scale, Feather, Equal, HeartHandshake, Landmark, 
  ShieldCheck, BookOpenCheck, Compass, Sun, GraduationCap, 
  FileText, Vote, Users, Shield, Search, X, BookOpen 
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Crown, Scale, Feather, Equal, HeartHandshake, Landmark,
  ShieldCheck, BookOpenCheck, Compass, Sun, GraduationCap,
  FileText, Vote, Users, Shield
};

export const ConstitutionalValues: React.FC = () => {
  const { t } = useTranslation('constitutionalValues');
  const { CONSTITUTIONAL_VALUES } = useLocalizedData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const selectedCard: ConstitutionalValue | null =
    CONSTITUTIONAL_VALUES.find((v) => v.id === selectedCardId) ?? null;

  useScrollLock(!!selectedCard);

  const filteredValues = CONSTITUTIONAL_VALUES.filter((val) => {
    const matchesCategory = selectedCategory === 'all' || val.category === selectedCategory;
    const matchesSearch = 
      val.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (val.tamilName && val.tamilName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      val.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      val.articleRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      val.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="constitutional-values" className="py-20 bg-[#F8F6F0] text-[#0A1F44] border-b border-[#0A1F44]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#0A1F44]/20 text-[10px] font-sans-body font-semibold text-[#0A1F44] uppercase tracking-[0.25em]">
            <BookOpen className="w-3.5 h-3.5" />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-light text-[#0A1F44] tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-sm sm:text-base font-sans-body text-[#0A1F44]/80 leading-relaxed">
            {t('subheading')}
          </p>
        </motion.div>

        {/* Filters and Search Bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 border border-[#0A1F44]/15">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: t('categories.all') },
              { id: 'core', label: t('categories.core') },
              { id: 'rights', label: t('categories.rights') },
              { id: 'governance', label: t('categories.governance') },
              { id: 'pluralism', label: t('categories.pluralism') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-sans-body tracking-wider transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#0A1F44] text-[#F8F6F0] font-semibold shadow-sm'
                    : 'bg-[#F8F6F0] text-[#0A1F44] hover:bg-[#EAE8E0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#0A1F44]/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F6F0] border border-[#0A1F44]/20 focus:border-[#0A1F44] text-xs text-[#0A1F44] pl-9 pr-4 py-2 outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#0A1F44]/50 hover:text-[#0A1F44]"
              >
                ×
              </button>
            )}
          </div>

        </div>

        {/* 15 Archive Cards Grid */}
        <motion.div 
          layout
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredValues.map((val, idx) => {
              const IconComponent = ICON_MAP[val.iconName] || Scale;
              return (
                <motion.div
                  key={val.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedCardId(val.id)}
                  className="bg-white p-6 border border-[#0A1F44]/15 hover:border-[#0A1F44] hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                >
                  {/* Top Corner Watermark Article Number */}
                  <div className="absolute -top-3 -right-2 text-6xl font-serif-display font-extrabold text-[#0A1F44]/10 pointer-events-none group-hover:text-[#0A1F44]/20 transition-colors">
                    {val.number < 10 ? `0${val.number}` : val.number}
                  </div>

                  <div>
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-[#F8F6F0] border border-[#0A1F44]/15 text-[#0A1F44] group-hover:bg-[#0A1F44] group-hover:text-[#F8F6F0] transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-1 bg-[#F8F6F0] border border-[#0A1F44]/15 text-[11px] font-mono font-semibold text-[#0A1F44]">
                        {val.articleRef}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-[#138808] uppercase tracking-widest font-semibold">
                        {t('valueOf15', { number: val.number })}
                      </div>
                      <h3 className="text-xl font-serif-display font-bold text-[#0A1F44] group-hover:text-[#000080] transition-colors flex items-center flex-wrap gap-2">
                        <span>{val.number}. {val.name}</span>
                        {val.tamilName && (
                          <span className="text-base font-sans-body font-normal text-[#FF9933]">
                            ({val.tamilName})
                          </span>
                        )}
                      </h3>
                      <p className="text-xs font-serif-quote italic text-[#0A1F44]/70">
                        {val.englishTitle}
                      </p>
                    </div>

                    {/* Short Description */}
                    <p className="mt-4 text-xs font-sans-body text-[#0A1F44]/80 leading-relaxed line-clamp-3">
                      {val.shortDescription}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-[#0A1F44]/10 flex items-center justify-between text-xs font-sans-body">
                    <span className="text-[11px] font-mono text-[#0A1F44]/60">
                      {val.landmarkJudgment ? t('landmarkRulings') : t('coreDoctrine')}
                    </span>
                    <span className="text-[#0A1F44] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {t('inspectArticle')}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredValues.length === 0 && (
          <div className="text-center py-16 bg-white border border-[#0A1F44]/15 mt-8">
            <p className="text-base text-[#0A1F44]/70 font-sans-body">
              {t('noResults', { query: searchQuery })}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-[#0A1F44] text-white text-xs font-bold uppercase tracking-wider"
            >
              {t('resetFilters')}
            </button>
          </div>
        )}

      </div>

      {/* Detailed Modal Drawer for Selected Constitutional Article — portaled
          straight into <body> so its "fixed inset-0" sizes against the real
          viewport. Left inside this section's own DOM subtree, it would size
          against the AnimatedSection wrapper instead (any ancestor with a
          `transform` — which its scroll-in animation applies — becomes the
          containing block for fixed descendants), squashing it down below
          the sticky header. */}
      {createPortal(
      <AnimatePresence>
        {selectedCard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1F44]/75 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#F8F6F0] text-[#0A1F44] border border-[#0A1F44] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative space-y-6"
            >
              
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-[#0A1F44]/15 pb-4">
                <div>
                  <span className="text-xs font-mono text-[#138808] uppercase tracking-wider font-semibold">
                    {t('modal.valueOf15', { number: selectedCard.number })}
                  </span>
                  <h3 className="text-2xl font-serif-display font-bold text-[#0A1F44] mt-1 flex items-center flex-wrap gap-2">
                    <span>{selectedCard.number}. {selectedCard.name}</span>
                    {selectedCard.tamilName && (
                      <span className="text-xl font-sans-body font-normal text-[#FF9933]">
                        ({selectedCard.tamilName})
                      </span>
                    )}
                  </h3>
                  <p className="text-xs font-serif-quote italic text-[#0A1F44]/70">
                    {selectedCard.englishTitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCardId(null)}
                  className="p-2 bg-white border border-[#0A1F44]/20 text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content Sections */}
              <div className="space-y-4 text-xs sm:text-sm font-sans-body text-[#0A1F44]/90">
                
                <div className="p-3 bg-white border border-[#0A1F44]/15 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#0A1F44]/60 uppercase">{t('modal.constitutionalLocation')}</span>
                  <span className="font-bold text-[#0A1F44] font-mono">{selectedCard.articleRef}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold font-serif-display text-[#0A1F44] uppercase tracking-wider">
                    {t('modal.scopeTitle')}
                  </div>
                  <p className="leading-relaxed bg-white p-3 border border-[#0A1F44]/15">
                    {selectedCard.shortDescription}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold font-serif-display text-[#0A1F44] uppercase tracking-wider">
                    {t('modal.relevanceTitle')}
                  </div>
                  <p className="leading-relaxed text-[#0A1F44]/90">
                    {selectedCard.detailedRelevance}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold font-serif-display text-[#0A1F44] uppercase tracking-wider">
                    {t('modal.originsTitle')}
                  </div>
                  <p className="leading-relaxed text-[#0A1F44]/80 font-serif-quote italic bg-[#EAE8E0] p-3 border-l-2 border-[#0A1F44]">
                    "{selectedCard.historicalContext}"
                  </p>
                </div>

                {selectedCard.landmarkJudgment && (
                  <div className="p-4 bg-white border-l-4 border-[#138808] space-y-1 border-t border-r border-b border-[#0A1F44]/10">
                    <div className="text-[11px] font-mono text-[#138808] uppercase font-bold">
                      {t('modal.landmarkTitle')}
                    </div>
                    <div className="font-serif-display font-bold text-[#0A1F44]">
                      {selectedCard.landmarkJudgment}
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-[#0A1F44]/15 flex justify-end">
                <button
                  onClick={() => setSelectedCardId(null)}
                  className="px-5 py-2.5 bg-[#0A1F44] text-[#F8F6F0] font-sans-body text-xs font-semibold uppercase tracking-wider hover:bg-[#000080] transition-colors cursor-pointer"
                >
                  {t('modal.close')}
                </button>
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

