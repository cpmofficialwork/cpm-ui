import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedData } from '../data/useLocalizedData';
import { Target, ArrowRight, HeartHandshake } from 'lucide-react';

interface CampaignsProps {
  onJoinCampaign?: (campaignTitle: string) => void;
}

export const Campaigns: React.FC<CampaignsProps> = ({ onJoinCampaign }) => {
  const { t } = useTranslation('campaigns');
  const { CAMPAIGNS } = useLocalizedData();
  return (
    <section id="campaigns" className="py-20 bg-[#F8F6F0] text-[#0A1F44] border-b border-[#0A1F44]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#0A1F44]/20 text-[10px] font-sans-body font-semibold text-[#0A1F44] uppercase tracking-[0.25em]">
            <Target className="w-3.5 h-3.5" />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-light text-[#0A1F44] tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-sm sm:text-base font-sans-body text-[#0A1F44]/80 leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* Campaigns Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CAMPAIGNS.map((camp) => (
            <div
              key={camp.id}
              className="bg-white p-6 sm:p-8 border border-[#0A1F44]/15 hover:border-[#0A1F44] transition-all shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-[#0A1F44]/10 pb-3">
                  <span className="px-3 py-1 bg-[#F8F6F0] border border-[#0A1F44]/15 text-xs font-mono font-bold text-[#0A1F44]">
                    {camp.location}
                  </span>
                  <span className="px-3 py-1 bg-[#F8F6F0] border border-[#138808]/40 text-[11px] font-mono text-[#138808] font-bold uppercase">
                    ● {t('missionStatus')}: {t(`status.${camp.status}`)}
                  </span>
                </div>

                <h3 className="text-2xl font-serif-display font-bold text-[#0A1F44]">
                  {camp.title}
                </h3>
                <p className="text-xs font-serif-display italic text-[#0A1F44]/70">
                  {camp.subtitle}
                </p>

                <p className="text-xs sm:text-sm font-sans-body text-[#0A1F44]/90 leading-relaxed">
                  <strong>{t('missionObjective')}</strong> {camp.objective}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#0A1F44]/70">{t('target')} {camp.targetMetric}</span>
                    <span className="text-[#138808] font-bold">{camp.currentProgress}% {t('completed')}</span>
                  </div>
                  <div className="w-full bg-[#F8F6F0] h-2 border border-[#0A1F44]/15 overflow-hidden">
                    <div
                      className="bg-[#0A1F44] h-full transition-all duration-500"
                      style={{ width: `${camp.currentProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Impact Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center font-sans-body text-xs">
                  {camp.impactMetrics.map((m) => (
                    <div key={m.label} className="p-2 bg-[#F8F6F0] border border-[#0A1F44]/10">
                      <div className="font-serif-display font-bold text-[#0A1F44]">{m.value}</div>
                      <div className="text-[10px] text-[#0A1F44]/60 line-clamp-1">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Role for Citizen */}
                <div className="p-3 bg-[#F8F6F0] border border-[#0A1F44]/15 text-xs font-sans-body text-[#0A1F44]">
                  <strong className="text-[#0A1F44]">{t('citizenParticipationRole')}</strong> {camp.citizenParticipationRole}
                </div>

              </div>

              {/* Action */}
              <div className="pt-4 border-t border-[#0A1F44]/10 flex justify-end">
                <button
                  onClick={() => {
                    if (onJoinCampaign) onJoinCampaign(camp.title);
                  }}
                  className="px-6 py-3 bg-[#0A1F44] text-[#F8F6F0] font-semibold text-xs tracking-wider uppercase hover:bg-[#000080] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <HeartHandshake className="w-4 h-4" />
                  {t('participateInMission')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

