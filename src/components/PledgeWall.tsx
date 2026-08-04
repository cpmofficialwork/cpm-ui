import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedData } from '../data/useLocalizedData';
import { PledgeSignature } from '../types';
import { Award, ShieldCheck, Search, PlusCircle, CheckCircle } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';

interface PledgeWallProps {
  onOpenPledgeModal?: () => void;
}

export const PledgeWall: React.FC<PledgeWallProps> = () => {
  const { t } = useTranslation('pledgeWall');
  const { INITIAL_PLEDGES } = useLocalizedData();
  const [pledges, setPledges] = useState<PledgeSignature[]>(() => {
    const saved = localStorage.getItem('cpm_pledges');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_PLEDGES; }
    }
    return INITIAL_PLEDGES;
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newPledgeName, setNewPledgeName] = useState<string>('');
  const [newPledgeCity, setNewPledgeCity] = useState<string>('');
  const [newPledgeState, setNewPledgeState] = useState<string>(t('defaults.state'));
  const [newPledgeMsg, setNewPledgeMsg] = useState<string>('');
  const [showSignModal, setShowSignModal] = useState<boolean>(false);
  const [pledgeSubmitted, setPledgeSubmitted] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('cpm_pledges', JSON.stringify(pledges));
  }, [pledges]);

  useScrollLock(showSignModal);

  const handleAddPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPledgeName) return;

    const newSig: PledgeSignature = {
      id: `p-${Date.now()}`,
      name: newPledgeName,
      city: newPledgeCity || t('defaults.city'),
      state: newPledgeState,
      occupation: t('defaults.occupation'),
      pledgeDate: new Date().toISOString().split('T')[0],
      message: newPledgeMsg || t('defaults.message'),
      isVerified: true,
    };

    setPledges([newSig, ...pledges]);
    setPledgeSubmitted(true);
    setTimeout(() => {
      setShowSignModal(false);
      setPledgeSubmitted(false);
      setNewPledgeName('');
      setNewPledgeCity('');
      setNewPledgeMsg('');
    }, 2000);
  };

  const filteredPledges = pledges.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.message && p.message.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="pledge-wall" className="py-20 bg-[#F8F6F0] text-[#0A1F44] border-b border-[#0A1F44]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#0A1F44]/20 text-[10px] font-sans-body font-semibold text-[#0A1F44] uppercase tracking-[0.25em]">
            <Award className="w-3.5 h-3.5" />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-light text-[#0A1F44] tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-sm sm:text-base font-sans-body text-[#0A1F44]/80 leading-relaxed">
            {t('subheading')}
          </p>

          <div className="pt-2">
            <button
              onClick={() => setShowSignModal(true)}
              className="px-8 py-3.5 bg-[#0A1F44] text-[#F8F6F0] font-semibold text-xs tracking-wider uppercase hover:bg-[#000080] transition-colors cursor-pointer flex items-center gap-2 mx-auto"
            >
              <PlusCircle className="w-4 h-4" /> {t('addYourName')}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-10 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-[#0A1F44]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#0A1F44]/20 focus:border-[#0A1F44] text-xs text-[#0A1F44] pl-10 pr-4 py-2.5 outline-none"
          />
        </div>

        {/* Memorial Wall Signatures Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPledges.map((sig) => (
            <div
              key={sig.id}
              className="bg-white p-6 border border-[#0A1F44]/15 shadow-sm space-y-3 relative hover:border-[#0A1F44] transition-colors"
            >
              <div className="flex items-center justify-between border-b border-[#0A1F44]/10 pb-3">
                <div>
                  <div className="font-serif-display font-bold text-[#0A1F44] text-base">
                    {sig.name}
                  </div>
                  <div className="text-[11px] font-sans-body text-[#0A1F44]/70">
                    {sig.city}, {sig.state}
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-[#F8F6F0] border border-[#138808]/40 text-[10px] font-mono font-bold text-[#138808] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#138808]" /> {t('verified')}
                </span>
              </div>

              {sig.message && (
                <div className="text-xs font-serif-display italic text-[#0A1F44]/90 leading-relaxed relative pt-1">
                  "{sig.message}"
                </div>
              )}

              <div className="pt-2 border-t border-[#0A1F44]/10 flex items-center justify-between text-[10px] font-mono text-[#0A1F44]/60">
                <span>{sig.occupation}</span>
                <span>{t('pledged')}: {sig.pledgeDate}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Public Pledge Sign Modal */}
      {showSignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1F44]/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-[#0A1F44] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
            
            <div className="flex items-start justify-between border-b border-[#0A1F44]/10 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#0A1F44]">{t('modal.nationalPublicPledge')}</span>
                <h3 className="text-xl font-serif-display font-bold text-[#0A1F44] mt-1">
                  {t('modal.title')}
                </h3>
              </div>
              <button
                onClick={() => setShowSignModal(false)}
                className="text-xs text-[#0A1F44]/60 hover:text-[#0A1F44] font-bold"
              >
                ✕
              </button>
            </div>

            {!pledgeSubmitted ? (
              <form onSubmit={handleAddPledge} className="space-y-4 text-xs font-sans-body">
                <div>
                  <label className="block text-[#0A1F44] mb-1 font-semibold">{t('modal.fullName')}</label>
                  <input
                    type="text"
                    required
                    placeholder={t('modal.fullNamePlaceholder')}
                    value={newPledgeName}
                    onChange={(e) => setNewPledgeName(e.target.value)}
                    className="w-full bg-[#F8F6F0] border border-[#0A1F44]/20 text-[#0A1F44] p-2.5 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#0A1F44] mb-1 font-semibold">{t('modal.city')}</label>
                    <input
                      type="text"
                      required
                      placeholder={t('modal.cityPlaceholder')}
                      value={newPledgeCity}
                      onChange={(e) => setNewPledgeCity(e.target.value)}
                      className="w-full bg-[#F8F6F0] border border-[#0A1F44]/20 text-[#0A1F44] p-2.5 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#0A1F44] mb-1 font-semibold">{t('modal.state')}</label>
                    <input
                      type="text"
                      required
                      placeholder={t('modal.statePlaceholder')}
                      value={newPledgeState}
                      onChange={(e) => setNewPledgeState(e.target.value)}
                      className="w-full bg-[#F8F6F0] border border-[#0A1F44]/20 text-[#0A1F44] p-2.5 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#0A1F44] mb-1 font-semibold">{t('modal.statement')}</label>
                  <textarea
                    rows={3}
                    placeholder={t('modal.statementPlaceholder')}
                    value={newPledgeMsg}
                    onChange={(e) => setNewPledgeMsg(e.target.value)}
                    className="w-full bg-[#F8F6F0] border border-[#0A1F44]/20 text-[#0A1F44] p-2.5 outline-none"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#0A1F44]/10">
                  <button
                    type="button"
                    onClick={() => setShowSignModal(false)}
                    className="px-4 py-2 border border-[#0A1F44]/20 text-[#0A1F44] text-xs cursor-pointer hover:bg-[#F8F6F0]"
                  >
                    {t('modal.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0A1F44] text-[#F8F6F0] font-semibold text-xs tracking-wider uppercase hover:bg-[#000080] transition-colors cursor-pointer"
                  >
                    {t('modal.signPledge')}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle className="w-12 h-12 text-[#138808] mx-auto" />
                <h4 className="text-lg font-serif-display font-bold text-[#0A1F44]">{t('modal.recorded')}</h4>
                <p className="text-xs text-[#0A1F44]/80">
                  {t('modal.recordedMessage')}
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};

