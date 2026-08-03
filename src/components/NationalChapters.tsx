import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedData } from '../data/useLocalizedData';
import { useLanguage } from '../hooks/useLanguage';
import { MapPin, Mail, Building2, Search, ArrowRight, ShieldCheck, ExternalLink, Navigation } from 'lucide-react';

interface NationalChaptersProps {
  onJoinChapterClick?: (chapterName: string) => void;
}

export const NationalChapters: React.FC<NationalChaptersProps> = ({ onJoinChapterClick }) => {
  const { t } = useTranslation('nationalChapters');
  const { STATE_CHAPTERS } = useLocalizedData();
  const { isTamil } = useLanguage();
  const numberLocale = isTamil ? 'ta-IN' : 'en-IN';
  const [selectedStateId, setSelectedStateId] = useState<string>(STATE_CHAPTERS[0].id);
  const selectedState = STATE_CHAPTERS.find((ch) => ch.id === selectedStateId) ?? STATE_CHAPTERS[0];
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredChapters = STATE_CHAPTERS.filter(
    (ch) =>
      ch.stateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.headquarters.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.coordinatorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="chapters" className="py-20 bg-[#F8F6F0] text-[#0A1F44] border-b border-[#0A1F44]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#0A1F44]/20 text-[10px] font-sans-body font-semibold text-[#0A1F44] uppercase tracking-[0.25em]">
            <MapPin className="w-3.5 h-3.5" />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-light text-[#0A1F44] tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-sm sm:text-base font-sans-body text-[#0A1F44]/80 leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-[#0A1F44]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#0A1F44]/20 focus:border-[#0A1F44] text-xs text-[#0A1F44] pl-10 pr-4 py-3 outline-none"
          />
        </div>

        {/* Interactive Grid Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Chapter Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-3 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredChapters.map((ch) => {
              const isSelected = selectedState.id === ch.id;
              return (
                <div
                  key={ch.id}
                  onClick={() => setSelectedStateId(ch.id)}
                  className={`p-4 border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#0A1F44] text-[#F8F6F0] border-[#0A1F44] shadow-md'
                      : 'bg-white text-[#0A1F44] border-[#0A1F44]/15 hover:border-[#0A1F44]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[10px] font-mono font-bold ${isSelected ? 'bg-white/10 text-[#FF9933]' : 'bg-[#F8F6F0] text-[#0A1F44] border border-[#0A1F44]/15'}`}>
                        {ch.code}
                      </span>
                      <span className="font-serif-display font-bold text-sm">
                        {ch.stateName}
                      </span>
                    </div>
                    <div className={`text-xs font-sans-body flex items-center gap-3 ${isSelected ? 'opacity-80' : 'text-[#0A1F44]/60'}`}>
                      <span>{ch.districtCount} {t('districts')}</span>
                      <span>•</span>
                      <span className="font-bold text-[#138808]">{ch.activeVolunteers.toLocaleString(numberLocale)} {t('volunteers')}</span>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-[#FF9933] translate-x-1' : 'text-[#0A1F44]/30'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Chapter Details Showcase (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#0A1F44]/15 shadow-lg space-y-6 relative">
            
            {/* Header Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#0A1F44]/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#0A1F44]/60 uppercase tracking-wider font-semibold">
                  {t('chapterBrief')} • {selectedState.code}
                </span>
                <h3 className="text-2xl font-serif-display font-bold text-[#0A1F44] mt-1">
                  {selectedState.stateName} {t('chapterSuffix')}
                </h3>
              </div>
              <span className="px-3 py-1 bg-[#F8F6F0] border border-[#138808]/40 text-xs font-mono text-[#138808] font-bold">
                ● {t('activeChapter')}
              </span>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-sans-body text-xs">
              <div className="p-3 bg-[#F8F6F0] border border-[#0A1F44]/10">
                <div className="text-[10px] font-mono text-[#0A1F44]/60 uppercase">{t('activeVolunteers')}</div>
                <div className="text-lg font-serif-display font-bold text-[#0A1F44]">
                  {selectedState.activeVolunteers.toLocaleString(numberLocale)}
                </div>
              </div>

              <div className="p-3 bg-[#F8F6F0] border border-[#0A1F44]/10">
                <div className="text-[10px] font-mono text-[#0A1F44]/60 uppercase">{t('districtsCovered')}</div>
                <div className="text-lg font-serif-display font-bold text-[#0A1F44]">
                  {selectedState.districtCount} {t('districts')}
                </div>
              </div>

              <div className="p-3 bg-[#F8F6F0] border border-[#0A1F44]/10 col-span-2 sm:col-span-1">
                <div className="text-[10px] font-mono text-[#0A1F44]/60 uppercase">{t('chapterCoordinator')}</div>
                <div className="text-sm font-serif-display font-bold text-[#138808]">
                  {selectedState.coordinatorName}
                </div>
              </div>
            </div>

            {/* Headquarters & Contact */}
            <div className="space-y-3 font-sans-body text-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-[#F8F6F0] border border-[#0A1F44]/10">
                <div className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-[#0A1F44] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#0A1F44]">{t('regionalHeadquarters')}</div>
                    <div className="text-[#0A1F44]/80">{selectedState.headquarters}</div>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedState.headquarters)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#0A1F44] hover:bg-[#FF9933] text-white hover:text-[#0A1F44] font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <Navigation className="w-3 h-3" />
                  <span>{t('hqMapLink')}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <div className="flex items-center gap-2.5 p-3 bg-[#F8F6F0] border border-[#0A1F44]/10">
                <Mail className="w-4 h-4 text-[#0A1F44] shrink-0" />
                <div className="font-mono text-[#0A1F44] font-semibold">{selectedState.contactEmail}</div>
              </div>
            </div>

            {/* Active Local Campaigns */}
            <div className="space-y-2 font-sans-body">
              <div className="text-xs font-bold font-serif-display text-[#0A1F44] uppercase tracking-wider">
                {t('activeChapterInitiatives')}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedState.activeCampaigns.map((camp) => (
                  <span
                    key={camp}
                    className="px-3 py-1 bg-[#F8F6F0] border border-[#0A1F44]/15 text-xs text-[#0A1F44] flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#138808]" />
                    {camp}
                  </span>
                ))}
              </div>
            </div>

            {/* Join Chapter CTA */}
            <div className="pt-4 border-t border-[#0A1F44]/10 flex justify-end">
              <button
                onClick={() => {
                  if (onJoinChapterClick) onJoinChapterClick(selectedState.stateName);
                }}
                className="px-6 py-3 bg-[#0A1F44] text-[#F8F6F0] font-semibold text-xs tracking-wider uppercase hover:bg-[#000080] transition-colors cursor-pointer flex items-center gap-2"
              >
                {t('joinChapter', { state: selectedState.stateName })} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

