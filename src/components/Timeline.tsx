import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedData } from '../data/useLocalizedData';
import { Clock, Quote, ChevronRight, Scale, UserCheck } from 'lucide-react';

export const Timeline: React.FC = () => {
  const { t } = useTranslation('timeline');
  const { TIMELINE_MILESTONES } = useLocalizedData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(TIMELINE_MILESTONES[3].id); // Default to 1946
  const activeMilestone = TIMELINE_MILESTONES.find((m) => m.id === activeMilestoneId) ?? TIMELINE_MILESTONES[3];

  const filteredMilestones = TIMELINE_MILESTONES.filter((m) => {
    return selectedCategory === 'all' || m.category === selectedCategory;
  });

  return (
    <section id="timeline" className="py-20 bg-[#F8F6F0] text-[#0A1F44] border-b border-[#0A1F44]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#0A1F44]/20 text-[10px] font-sans-body font-semibold text-[#0A1F44] uppercase tracking-[0.25em]">
            <Clock className="w-3.5 h-3.5" />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-light text-[#0A1F44] tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-sm sm:text-base font-sans-body text-[#0A1F44]/80 leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            { id: 'all', label: t('categories.all') },
            { id: 'struggle', label: t('categories.struggle') },
            { id: 'assembly', label: t('categories.assembly') },
            { id: 'enactment', label: t('categories.enactment') },
            { id: 'judgments', label: t('categories.judgments') },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-sans-body uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0A1F44] text-[#F8F6F0] font-semibold'
                  : 'bg-white text-[#0A1F44] border border-[#0A1F44]/15 hover:bg-[#EAE8E0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Timeline Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Timeline Navigation Sidebar (Left Column) */}
          <div className="lg:col-span-5 space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredMilestones.map((m) => {
              const isActive = activeMilestone.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setActiveMilestoneId(m.id)}
                  className={`p-4 border transition-all cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? 'bg-[#0A1F44] text-[#F8F6F0] border-[#0A1F44] shadow-md'
                      : 'bg-white text-[#0A1F44] border-[#0A1F44]/15 hover:border-[#0A1F44]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-xs font-mono font-bold ${
                        isActive
                          ? 'bg-white/10 text-[#FF9933]'
                          : 'bg-[#F8F6F0] text-[#0A1F44] border border-[#0A1F44]/15'
                      }`}
                    >
                      {m.year}
                    </span>
                    <div>
                      <div className="text-sm font-serif-display font-bold">
                        {m.title}
                      </div>
                      <div className={`text-[11px] font-sans-body ${isActive ? 'opacity-70' : 'text-[#0A1F44]/60'}`}>
                        {m.dateStr || m.year}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-[#FF9933] translate-x-1' : 'text-[#0A1F44]/30'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Detailed Archival Exhibit Showcase (Right Column) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#0A1F44]/15 shadow-lg space-y-6 relative">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-[#0A1F44]/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#138808] uppercase tracking-wider font-semibold">
                  {t('archivalRecord')} • {activeMilestone.year}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#0A1F44] mt-1">
                  {activeMilestone.title}
                </h3>
              </div>
              <span className="px-3 py-1 bg-[#F8F6F0] border border-[#0A1F44]/15 text-xs font-mono font-bold text-[#0A1F44]">
                {activeMilestone.dateStr}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm font-sans-body text-[#0A1F44]/85 leading-relaxed">
              {activeMilestone.description}
            </p>

            {/* Historical Quote Box */}
            {activeMilestone.quote && (
              <div className="p-5 bg-[#EAE8E0] border-l-4 border-[#0A1F44] space-y-2 relative">
                <Quote className="w-8 h-8 text-[#0A1F44]/15 absolute top-2 right-2" />
                <blockquote className="text-sm sm:text-base font-serif-quote italic text-[#0A1F44] leading-relaxed">
                  "{activeMilestone.quote}"
                </blockquote>
                {activeMilestone.quoteAuthor && (
                  <div className="text-xs font-serif-display font-bold text-[#0A1F44] text-right uppercase tracking-wider">
                    — {activeMilestone.quoteAuthor}
                  </div>
                )}
              </div>
            )}

            {/* Historical Significance */}
            <div className="space-y-2">
              <div className="text-xs font-bold font-serif-display text-[#0A1F44] uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#0A1F44]" />
                {t('constitutionalSignificance')}
              </div>
              <p className="text-xs font-sans-body text-[#0A1F44]/80 leading-relaxed bg-[#F8F6F0] p-3 border border-[#0A1F44]/10">
                {activeMilestone.significance}
              </p>
            </div>

            {/* Key Historic Figures */}
            {activeMilestone.keyFigures.length > 0 && (
              <div className="pt-2 border-t border-[#0A1F44]/10">
                <div className="text-[10px] font-mono text-[#0A1F44]/60 uppercase mb-2">
                  {t('keyFigures')}
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeMilestone.keyFigures.map((fig) => (
                    <span
                      key={fig}
                      className="px-2.5 py-1 bg-[#F8F6F0] border border-[#0A1F44]/15 text-xs font-sans-body text-[#0A1F44] flex items-center gap-1"
                    >
                      <UserCheck className="w-3 h-3 text-[#138808]" />
                      {fig}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

