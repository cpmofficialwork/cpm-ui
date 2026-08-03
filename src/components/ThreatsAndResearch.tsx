import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedData } from '../data/useLocalizedData';
import { ShieldAlert, BarChart3, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export const ThreatsAndResearch: React.FC = () => {
  const { t } = useTranslation('threatsAndResearch');
  const { THREATS_RESEARCH } = useLocalizedData();
  const [activeThreatId, setActiveThreatId] = useState<string>(THREATS_RESEARCH[0].id);
  const activeThreat = THREATS_RESEARCH.find((th) => th.id === activeThreatId) ?? THREATS_RESEARCH[0];

  return (
    <section id="threats" className="py-20 bg-[#F8F6F0] text-[#0A1F44] border-b border-[#0A1F44]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#0A1F44]/20 text-[10px] font-sans-body font-semibold text-[#0A1F44] uppercase tracking-[0.25em]">
            <BarChart3 className="w-3.5 h-3.5" />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-light text-[#0A1F44] tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-sm sm:text-base font-sans-body text-[#0A1F44]/80 leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* 4 Academic Research Modules */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {THREATS_RESEARCH.map((threat) => {
            const isSelected = activeThreat.id === threat.id;
            return (
              <button
                key={threat.id}
                onClick={() => setActiveThreatId(threat.id)}
                className={`p-5 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0A1F44] text-[#F8F6F0] border border-[#0A1F44] shadow-lg'
                    : 'bg-white text-[#0A1F44] border border-[#0A1F44]/15 hover:border-[#0A1F44]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 border ${isSelected ? 'border-white/20 bg-white/10 text-[#FF9933]' : 'border-[#0A1F44]/15 bg-[#F8F6F0] text-[#0A1F44]'}`}>
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-mono ${isSelected ? 'opacity-60' : 'text-[#0A1F44]/50'}`}>{t('auditFile')}</span>
                  </div>
                  <h3 className="text-base font-serif-display font-bold leading-snug">
                    {threat.title}
                  </h3>
                  <p className={`text-xs font-sans-body mt-2 line-clamp-2 ${isSelected ? 'opacity-80' : 'text-[#0A1F44]/70'}`}>
                    {threat.subtitle}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t text-xs font-mono flex items-center justify-between ${isSelected ? 'border-white/15 text-[#FF9933]' : 'border-[#0A1F44]/10 text-[#0A1F44] font-semibold'}`}>
                  <span>{t('viewResearch')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Research Deep Dive Card */}
        <div className="mt-8 bg-white p-6 sm:p-8 border border-[#0A1F44]/15 shadow-lg space-y-6">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#0A1F44]/10 pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#0A1F44]/60 uppercase tracking-wider font-semibold">
                {t('researchBrief')}
              </span>
              <h3 className="text-2xl font-serif-display font-bold text-[#0A1F44] mt-1">
                {activeThreat.title}
              </h3>
              <p className="text-xs font-serif-quote italic text-[#0A1F44]/70">
                {activeThreat.subtitle}
              </p>
            </div>
            <span className="px-3 py-1 bg-[#F8F6F0] border border-[#0A1F44]/15 text-xs font-mono text-[#138808] font-bold">
              {t('statusActionRequired')}
            </span>
          </div>

          <p className="text-sm font-sans-body text-[#0A1F44]/85 leading-relaxed">
            {activeThreat.description}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {activeThreat.metrics.map((m) => (
              <div key={m.label} className="p-4 bg-[#F8F6F0] border border-[#0A1F44]/10 text-center space-y-1">
                <div className="text-2xl font-serif-display font-bold text-[#0A1F44]">{m.value}</div>
                <div className="text-xs font-sans-body font-semibold text-[#0A1F44]">{m.label}</div>
                <div className="text-[11px] font-sans-body text-[#0A1F44]/60">{m.subtext}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#0A1F44]/10 font-sans-body text-xs sm:text-sm">
            <div className="p-4 bg-[#F8F6F0] border border-[#0A1F44]/10 space-y-2">
              <div className="font-bold text-[#0A1F44] uppercase font-serif-display flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-[#0A1F44]" />
                {t('institutionalRiskAnalysis')}
              </div>
              <p className="text-[#0A1F44]/80 leading-relaxed text-xs">
                {activeThreat.institutionalImpact}
              </p>
            </div>

            <div className="p-4 bg-[#F8F6F0] border border-[#138808]/40 space-y-2">
              <div className="font-bold text-[#138808] uppercase font-serif-display flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#138808]" />
                {t('movementActionStrategy')}
              </div>
              <p className="text-[#0A1F44]/80 leading-relaxed text-xs">
                {activeThreat.movementResponse}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

