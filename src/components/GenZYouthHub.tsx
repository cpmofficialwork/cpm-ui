import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Zap, Share2, Check, RefreshCw, HelpCircle, AlertCircle, CheckCircle, Shield, MessageCircle, Heart } from 'lucide-react';

interface Myth {
  myth: string;
  fact: string;
  badge: string;
}

interface StoryQuote {
  id: number;
  tag: string;
  quote: string;
  hashtag: string;
}

export const GenZYouthHub: React.FC = () => {
  const { t } = useTranslation('genZYouthHub');
  const [selectedMythIndex, setSelectedMythIndex] = useState<number>(0);
  const [copiedQuoteIndex, setCopiedQuoteIndex] = useState<number | null>(null);
  const myths = t('myths', { returnObjects: true }) as Myth[];
  const storyQuotes = t('storyQuotes', { returnObjects: true }) as StoryQuote[];

  const handleCopyQuote = (index: number, quote: string, hashtag: string) => {
    const textToCopy = t('shareTemplate', { quote, hashtag });
    navigator.clipboard.writeText(textToCopy);
    setCopiedQuoteIndex(index);
    setTimeout(() => setCopiedQuoteIndex(null), 2500);
  };

  return (
    <section id="genz-hub" className="py-16 sm:py-24 bg-[#FFF9E6] text-[#0A1F44] border-t-4 border-b-4 border-[#0A1F44] relative overflow-hidden">
      {/* Cartoon Pop Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0A1F44 2.5px, transparent 2.5px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0A1F44] text-[#FFD700] font-mono text-xs font-black uppercase tracking-widest border-[3px] border-[#0A1F44] shadow-[4px_4px_0px_0px_#FF9933] -rotate-1">
            <Zap className="w-4 h-4 fill-current text-[#FFD700]" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-display font-black text-[#0A1F44] uppercase tracking-tight">
            {t('heading')}
          </h2>

          <p className="text-sm sm:text-base font-sans-body font-bold text-[#0A1F44]/90 max-w-2xl mx-auto">
            {t('subheading')}
          </p>
        </div>

        {/* Myth Busters Interactive Comic Card */}
        <div className="bg-white border-[3px] border-[#0A1F44] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#0A1F44] space-y-6 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-[#0A1F44] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#FF9933] border-2 border-[#0A1F44] text-[#0A1F44] shadow-[2px_2px_0px_0px_#0A1F44] font-black shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-black text-[#D97706] uppercase tracking-wider">
                  {t('mythBuster.interactiveLabel')}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-display font-black text-[#0A1F44]">
                  {t('mythBuster.title')}
                </h3>
              </div>
            </div>

            {/* Myth Selector Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {myths.map((m, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedMythIndex(idx)}
                  className={`px-3 py-1.5 font-mono text-xs font-black uppercase tracking-wider border-2 border-[#0A1F44] transition-all cursor-pointer ${
                    selectedMythIndex === idx
                      ? 'bg-[#0A1F44] text-[#FFD700] shadow-[2px_2px_0px_0px_#FF9933]'
                      : 'bg-[#F8F6F0] text-[#0A1F44] hover:bg-[#FFD700]'
                  }`}
                >
                  {t('mythBuster.mythTab', { num: idx + 1 })}
                </button>
              ))}
            </div>
          </div>

          {/* Active Myth Card Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMythIndex}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
            >
              {/* Myth Side */}
              <div className="bg-[#FFF0F0] border-2 border-[#0A1F44] p-5 sm:p-6 shadow-[4px_4px_0px_0px_#E63946] flex flex-col justify-between space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#E63946] text-white font-mono text-[11px] font-black uppercase tracking-wider border border-[#0A1F44] mb-3">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{t('mythBuster.commonMyth')}</span>
                  </div>
                  <p className="text-base sm:text-lg font-sans-body font-black text-[#0A1F44] leading-snug">
                    {myths[selectedMythIndex].myth}
                  </p>
                </div>
                <div className="text-[11px] font-mono text-[#E63946] font-bold">
                  {t('mythBuster.dontFall')}
                </div>
              </div>

              {/* Fact Side */}
              <div className="bg-[#E8F8F5] border-2 border-[#0A1F44] p-5 sm:p-6 shadow-[4px_4px_0px_0px_#00A86B] flex flex-col justify-between space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#00A86B] text-white font-mono text-[11px] font-black uppercase tracking-wider border border-[#0A1F44] mb-3">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{t('mythBuster.constitutionalFact')}</span>
                  </div>
                  <p className="text-sm sm:text-base font-sans-body font-bold text-[#0A1F44] leading-relaxed">
                    {myths[selectedMythIndex].fact}
                  </p>
                </div>
                <div className="text-[11px] font-mono text-[#00A86B] font-extrabold flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>{t('mythBuster.guaranteed')}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Shareable Social Story Quotes for Gen-Z */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD700] text-[#0A1F44] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#0A1F44] shadow-[3px_3px_0px_0px_#0A1F44]">
              <Share2 className="w-3.5 h-3.5" />
              <span>{t('shareSection.badge')}</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-display font-black text-[#0A1F44]">
              {t('shareSection.title')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {storyQuotes.map((q, idx) => {
              const isCopied = copiedQuoteIndex === idx;

              return (
                <div
                  key={q.id}
                  className="bg-white border-[3px] border-[#0A1F44] p-6 shadow-[6px_6px_0px_0px_#0A1F44] hover:shadow-[8px_8px_0px_0px_#FF9933] transition-all flex flex-col justify-between space-y-5 group relative"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b-2 border-[#0A1F44]/15 pb-2">
                      <span className="font-mono text-[10px] font-black text-[#D97706] uppercase tracking-wider">
                        {q.tag}
                      </span>
                      <Heart className="w-4 h-4 text-[#E63946] fill-[#E63946]" />
                    </div>

                    <p className="text-base font-serif-display font-black text-[#0A1F44] leading-snug italic">
                      "{q.quote}"
                    </p>

                    <div className="font-mono text-[11px] text-[#0A1F44]/70 font-bold">
                      {q.hashtag}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyQuote(idx, q.quote, q.hashtag)}
                    className="w-full py-2.5 bg-[#0A1F44] hover:bg-[#FF9933] text-[#FFD700] hover:text-[#0A1F44] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#0A1F44] shadow-[3px_3px_0px_0px_#FFD700] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-[#FFD700]" />
                        <span>{t('shareSection.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        <span>{t('shareSection.copyForStory')}</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
