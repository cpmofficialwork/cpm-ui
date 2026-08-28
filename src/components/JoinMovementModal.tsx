import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Shield, X, UserPlus, UserCheck, Download, Share2, Phone, MapPin } from 'lucide-react';
import cpmLogoImage from '../assets/images/cpm_official_logo_1785581949419.jpg';
import { createUser, ApiError } from '../lib/api';
import { useScrollLock } from '../hooks/useScrollLock';

interface JoinMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// General "become a member" registration flow — ongoing, not tied to any
// single conference.
export const JoinMovementModal: React.FC<JoinMovementModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('joinMovement');

  const tnDistricts = t('tnDistricts', { returnObjects: true }) as string[];
  const indianStates = t('indianStates', { returnObjects: true }) as string[];

  const [passClaimed, setPassClaimed] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [stateIndex, setStateIndex] = useState(0);
  const [districtIndex, setDistrictIndex] = useState(0);
  const [otherDistrictText, setOtherDistrictText] = useState('');
  const [visitorSubDistrict, setVisitorSubDistrict] = useState('');
  const [visitorVillageOrTown, setVisitorVillageOrTown] = useState('');
  const [wantsToVolunteer, setWantsToVolunteer] = useState(false);
  const [passNumber, setPassNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('');
  const districtFieldRef = useRef<HTMLDivElement>(null);
  const memberCardRef = useRef<HTMLDivElement>(null);
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [cardDownloaded, setCardDownloaded] = useState(false);

  const filteredTnDistricts = useMemo(() => {
    const query = districtSearch.trim().toLowerCase();
    if (!query) return tnDistricts;
    return tnDistricts.filter((d) => d.toLowerCase().includes(query));
  }, [tnDistricts, districtSearch]);

  const isTamilNaduSelected = stateIndex === 0;
  const visitorState = indianStates[stateIndex] ?? indianStates[0];
  const visitorDistrict = isTamilNaduSelected ? (tnDistricts[districtIndex] ?? tnDistricts[0]) : otherDistrictText;

  useEffect(() => {
    if (!isDistrictOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (districtFieldRef.current && !districtFieldRef.current.contains(e.target as Node)) {
        setIsDistrictOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDistrictOpen]);

  useScrollLock(isOpen);

  const handleGeneratePass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || isSubmitting) return;

    const digitsOnly = visitorPhone.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      setSubmitError(t('joinModal.invalidMobile'));
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);
    try {
      const user = await createUser({
        name: visitorName.trim(),
        mobile: digitsOnly,
        state: visitorState,
        district: visitorDistrict,
        subDistrict: visitorSubDistrict.trim(),
        villageOrTown: visitorVillageOrTown.trim(),
        wantsToVolunteer,
      });
      setPassNumber(user.memberID);
      setPassClaimed(true);
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setSubmitError(t('joinModal.duplicateMobile'));
      } else if (err instanceof ApiError && err.fieldErrors.length > 0) {
        setSubmitError(err.fieldErrors[0].message);
      } else if (err instanceof ApiError) {
        setSubmitError(err.message);
      } else {
        setSubmitError(t('joinModal.genericError'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const maskMobile = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    return 'X'.repeat(digits.length - 3) + digits.slice(-3);
  };

  const captureMemberCardBlob = async (): Promise<Blob | null> => {
    if (!memberCardRef.current) return null;
    const { toBlob } = await import('html-to-image');
    return toBlob(memberCardRef.current, {
      backgroundColor: '#ffffff',
      pixelRatio: 2,
      cacheBust: true,
      skipFonts: true,
    });
  };

  const downloadMemberCard = async () => {
    if (isGeneratingCard) return;
    setIsGeneratingCard(true);
    try {
      if (!memberCardRef.current) return;
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(memberCardRef.current, {
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true,
      });
      const { width, height } = memberCardRef.current.getBoundingClientRect();
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({
        orientation: width >= height ? 'landscape' : 'portrait',
        unit: 'pt',
        format: [width, height],
      });
      pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
      pdf.save(`CPM-Member-Card-${passNumber || 'member'}.pdf`);
      setCardDownloaded(true);
    } catch (err) {
      console.error('Failed to generate member card PDF', err);
    } finally {
      setIsGeneratingCard(false);
    }
  };

  const shareMemberCard = async () => {
    if (isGeneratingCard) return;
    setIsGeneratingCard(true);
    try {
      const blob = await captureMemberCardBlob();
      if (!blob) return;
      const file = new File([blob], `CPM-Member-Card-${passNumber || 'member'}.png`, { type: 'image/png' });
      const nav = navigator as Navigator & { canShare?: (data?: ShareData) => boolean };
      if (nav.canShare && nav.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: t('joinModal.shareTitle'),
            text: t('joinModal.shareCardText', { name: visitorName }),
          });
          return;
        } catch (shareErr) {
          if ((shareErr as DOMException)?.name === 'AbortError') return;
          // fall through to download fallback below
        }
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = file.name;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to share member card image', err);
    } finally {
      setIsGeneratingCard(false);
    }
  };

  useEffect(() => {
    if (!passClaimed) {
      setCardDownloaded(false);
      return;
    }
    const timer = setTimeout(() => {
      downloadMemberCard();
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passClaimed]);

  const resetForm = () => {
    setPassClaimed(false);
    setVisitorName('');
    setVisitorPhone('');
    setVisitorSubDistrict('');
    setVisitorVillageOrTown('');
    setWantsToVolunteer(false);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A1F44]/75 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 25 }}
            className="bg-[#F8F6F0] text-[#0A1F44] border-2 border-[#0A1F44]/20 max-w-lg w-full p-6 sm:p-8 rounded-none shadow-[0_25px_70px_rgba(10,31,68,0.4)] relative overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Decorative Header Accent */}
            <div className="bg-gradient-to-r from-[#0A1F44] via-[#8B0000] to-[#D97706] h-2.5 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#0A1F44]/60 hover:text-[#0A1F44] hover:bg-[#0A1F44]/10 rounded-none transition-colors cursor-pointer"
              aria-label={t('joinModal.close')}
            >
              <X className="w-5 h-5" />
            </button>

            {!passClaimed ? (
              <form onSubmit={handleGeneratePass} className="space-y-5">
                <div className="space-y-1.5 border-b border-[#0A1F44]/15 pb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D97706]/10 text-[#D97706] rounded-none text-[11px] font-mono font-extrabold uppercase tracking-wider border border-[#D97706]/20">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>{t('joinModal.badge')}</span>
                  </div>
                  <h3 className="text-2xl font-serif-display font-black text-[#0A1F44]">
                    {t('joinModal.title')}
                  </h3>
                  <p className="text-xs text-[#0A1F44]/75 font-sans-body leading-relaxed">
                    {t('joinModal.description')}
                  </p>
                </div>

                <div className="space-y-4 text-xs font-sans-body">
                  {/* 1. Name */}
                  <div>
                    <label className="block font-mono text-xs text-[#0A1F44] font-bold uppercase tracking-wider mb-1.5">
                      {t('joinModal.fullName')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('joinModal.fullNamePlaceholder')}
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-[#0A1F44]/25 rounded-none text-[#0A1F44] placeholder-[#0A1F44]/40 font-sans-body text-sm focus:outline-none focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/15 shadow-sm"
                    />
                  </div>

                  {/* 2. Mobile Number */}
                  <div>
                    <label className="block font-mono text-xs text-[#0A1F44] font-bold uppercase tracking-wider mb-1.5">
                      {t('joinModal.mobile')}
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      required
                      placeholder={t('joinModal.mobilePlaceholder')}
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full px-4 py-3 bg-white border border-[#0A1F44]/25 rounded-none text-[#0A1F44] placeholder-[#0A1F44]/40 font-sans-body text-sm focus:outline-none focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/15 shadow-sm"
                    />
                  </div>

                  {/* 3. State & District Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* State */}
                    <div>
                      <label className="block font-mono text-xs text-[#0A1F44] font-bold uppercase tracking-wider mb-1.5">
                        {t('joinModal.state')}
                      </label>
                      <select
                        value={stateIndex}
                        onChange={(e) => setStateIndex(Number(e.target.value))}
                        className="w-full px-3.5 py-3 bg-white border border-[#0A1F44]/25 rounded-none text-[#0A1F44] font-sans-body text-sm focus:outline-none focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/15 shadow-sm cursor-pointer"
                      >
                        {indianStates.map((st, idx) => (
                          <option key={st} value={idx}>{st}</option>
                        ))}
                      </select>
                    </div>

                    {/* District */}
                    <div>
                      <label className="block font-mono text-xs text-[#0A1F44] font-bold uppercase tracking-wider mb-1.5">
                        {t('joinModal.district')}
                      </label>
                      {isTamilNaduSelected ? (
                        <div className="relative" ref={districtFieldRef}>
                          <input
                            type="text"
                            required
                            autoComplete="off"
                            placeholder={t('joinModal.districtSearchPlaceholder')}
                            value={isDistrictOpen ? districtSearch : visitorDistrict}
                            onFocus={() => {
                              setDistrictSearch('');
                              setIsDistrictOpen(true);
                            }}
                            onChange={(e) => setDistrictSearch(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-[#0A1F44]/25 rounded-none text-[#0A1F44] placeholder-[#0A1F44]/40 font-sans-body text-sm focus:outline-none focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/15 shadow-sm"
                          />
                          {isDistrictOpen && (
                            <div className="absolute z-30 mt-1 w-full max-h-48 overflow-y-auto bg-white border border-[#0A1F44]/25 shadow-lg">
                              {filteredTnDistricts.length > 0 ? (
                                filteredTnDistricts.map((d) => (
                                  <button
                                    key={d}
                                    type="button"
                                    onClick={() => {
                                      setDistrictIndex(tnDistricts.indexOf(d));
                                      setDistrictSearch('');
                                      setIsDistrictOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-[#0A1F44] font-sans-body hover:bg-[#0A1F44]/10 cursor-pointer"
                                  >
                                    {d}
                                  </button>
                                ))
                              ) : (
                                <div className="px-4 py-2.5 text-sm text-[#0A1F44]/50 font-sans-body">
                                  {t('joinModal.districtNoResults')}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <input
                          type="text"
                          required
                          placeholder={t('joinModal.districtPlaceholder')}
                          value={otherDistrictText}
                          onChange={(e) => setOtherDistrictText(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-[#0A1F44]/25 rounded-none text-[#0A1F44] placeholder-[#0A1F44]/40 font-sans-body text-sm focus:outline-none focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/15 shadow-sm"
                        />
                      )}
                    </div>
                  </div>

                  {/* 4. Sub-District & Village/Town Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Sub-District */}
                    <div>
                      <label className="block font-mono text-xs text-[#0A1F44] font-bold uppercase tracking-wider mb-1.5">
                        {t('joinModal.subDistrict')}
                      </label>
                      <input
                        type="text"
                        placeholder={t('joinModal.subDistrictPlaceholder')}
                        value={visitorSubDistrict}
                        onChange={(e) => setVisitorSubDistrict(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#0A1F44]/25 rounded-none text-[#0A1F44] placeholder-[#0A1F44]/40 font-sans-body text-sm focus:outline-none focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/15 shadow-sm"
                      />
                    </div>

                    {/* Village / Town */}
                    <div>
                      <label className="block font-mono text-xs text-[#0A1F44] font-bold uppercase tracking-wider mb-1.5">
                        {t('joinModal.villageOrTown')}
                      </label>
                      <input
                        type="text"
                        placeholder={t('joinModal.villageOrTownPlaceholder')}
                        value={visitorVillageOrTown}
                        onChange={(e) => setVisitorVillageOrTown(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#0A1F44]/25 rounded-none text-[#0A1F44] placeholder-[#0A1F44]/40 font-sans-body text-sm focus:outline-none focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/15 shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 px-4 py-3 bg-white border border-[#0A1F44]/25 rounded-none cursor-pointer hover:border-[#0A1F44]/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={wantsToVolunteer}
                    onChange={(e) => setWantsToVolunteer(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#0A1F44] shrink-0 cursor-pointer"
                  />
                  <span>
                    <span className="block font-mono text-xs text-[#0A1F44] font-bold uppercase tracking-wider">
                      {t('joinModal.volunteerLabel')}
                    </span>
                    <span className="block mt-1 text-xs text-[#0A1F44]/70 font-sans-body leading-relaxed">
                      {t('joinModal.volunteerDescription')}
                    </span>
                  </span>
                </label>

                {submitError && (
                  <div className="px-4 py-3 bg-red-50 border border-red-300 text-red-700 text-xs font-sans-body rounded-none">
                    {submitError}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#0A1F44] hover:bg-[#132D5E] text-[#FFD700] font-black text-xs uppercase tracking-[0.2em] rounded-none shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#FFD700]/30 active:scale-[0.99] mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
                  <span>{isSubmitting ? t('joinModal.submitting') : t('joinModal.submit')}</span>
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-5 text-center"
              >
                {/* Animated Checkmark & Thank You Header */}
                <div className="space-y-2.5">
                  <div className="relative w-16 h-16 mx-auto">
                    <motion.div
                      initial={{ scale: 0.4, opacity: 0.6 }}
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                      className="absolute inset-0 bg-emerald-500/40 border border-emerald-500"
                    />
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                      className="relative w-16 h-16 bg-emerald-600 border-2 border-[#0A1F44] flex items-center justify-center shadow-lg"
                    >
                      <CheckCircle2 className="w-9 h-9 text-white" />
                    </motion.div>
                  </div>

                  <motion.h3
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-2xl font-serif-display font-black text-[#0A1F44]"
                  >
                    {t('joinModal.successTitle')}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="text-xs text-[#0A1F44]/70 font-sans-body max-w-sm mx-auto"
                  >
                    {t('joinModal.welcomeMessage')}
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  ref={memberCardRef}
                  className="bg-white border-2 border-[#0A1F44] rounded-none relative overflow-hidden shadow-xl text-[#0A1F44]"
                >
                  {/* Watermark Logo Background — centered and fully visible, never cropped */}
                  <img
                    src={cpmLogoImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-contain opacity-[0.07] pointer-events-none select-none p-8"
                  />

                  {/* Volunteer corner ribbon — only shown when the member opted in */}
                  {wantsToVolunteer && (
                    <div className="absolute top-4 -right-11 z-30 w-40 rotate-45 bg-gradient-to-r from-[#FFD700] to-[#D97706] text-[#0A1F44] text-center py-1 shadow-[0_2px_8px_rgba(0,0,0,0.25)] border-y border-[#0A1F44]/20">
                      <span className="inline-flex items-center justify-center gap-1 text-[9px] font-mono font-black uppercase tracking-widest">
                        <UserCheck className="w-2.5 h-2.5" />
                        {t('joinModal.volunteerBadge')}
                      </span>
                    </div>
                  )}

                  {/* Tricolor accent strip */}
                  <div className="relative h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-[#FFF5C0] to-[#138808]" />

                  <div className="relative bg-[#0A1F44] text-[#FFD700] py-2 px-3 text-center font-mono text-[11px] font-extrabold uppercase tracking-widest flex items-center justify-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>{t('joinModal.officialMember')}</span>
                  </div>

                  <div className="relative p-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={cpmLogoImage}
                        alt=""
                        className="w-12 h-12 object-cover rounded-full border-2 border-[#0A1F44]/20 shrink-0"
                      />
                      <div className="text-left min-w-0 flex-1">
                        <div className="text-[9px] font-mono font-bold text-[#0A1F44]/55 uppercase tracking-widest">
                          {t('joinModal.cardOrgName')}
                        </div>
                        <div className="text-xl sm:text-2xl font-serif-display font-black text-[#0A1F44] leading-[1.15] break-words">
                          {visitorName}
                        </div>
                        <div className="text-xs font-mono text-[#D97706] font-extrabold tracking-wider mt-0.5">
                          {t('joinModal.memberId')} {passNumber}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-3 p-3.5 text-left">
                      <div className="flex items-start gap-1.5 min-w-0">
                        <Phone className="w-3 h-3 text-[#0A1F44]/45 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-[8px] font-mono font-bold text-[#0A1F44]/55 uppercase tracking-wider">{t('joinModal.mobileLabel')}</div>
                          <div className="text-[11px] font-mono font-semibold text-[#0A1F44] truncate">{visitorPhone ? maskMobile(visitorPhone) : t('joinModal.notAvailable')}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-1.5 min-w-0">
                        <MapPin className="w-3 h-3 text-[#0A1F44]/45 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-[8px] font-mono font-bold text-[#0A1F44]/55 uppercase tracking-wider">{t('joinModal.stateLabel')}</div>
                          <div className="text-[11px] font-mono font-semibold text-[#0A1F44] truncate">{visitorState}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-1.5 min-w-0">
                        <MapPin className="w-3 h-3 text-[#0A1F44]/45 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-[8px] font-mono font-bold text-[#0A1F44]/55 uppercase tracking-wider">{t('joinModal.districtLabel')}</div>
                          <div className="text-[11px] font-mono font-semibold text-[#0A1F44] truncate">{visitorDistrict}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-1.5 min-w-0">
                        <MapPin className="w-3 h-3 text-[#0A1F44]/45 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-[8px] font-mono font-bold text-[#0A1F44]/55 uppercase tracking-wider">{t('joinModal.subDistrictLabel')}</div>
                          <div className="text-[11px] font-mono font-semibold text-[#0A1F44] truncate">{visitorSubDistrict || t('joinModal.notAvailable')}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-1.5 min-w-0 col-span-2">
                        <MapPin className="w-3 h-3 text-[#0A1F44]/45 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-[8px] font-mono font-bold text-[#0A1F44]/55 uppercase tracking-wider">{t('joinModal.villageOrTownLabel')}</div>
                          <div className="text-[11px] font-mono font-semibold text-[#0A1F44] truncate">{visitorVillageOrTown || t('joinModal.notAvailable')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="space-y-2"
                >
                  {(isGeneratingCard || cardDownloaded) && (
                    <p className="text-[11px] font-mono text-[#0A1F44]/60">
                      {isGeneratingCard ? t('joinModal.cardGenerating') : t('joinModal.cardDownloaded')}
                    </p>
                  )}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={downloadMemberCard}
                      disabled={isGeneratingCard}
                      className="flex-1 py-3 bg-white hover:bg-[#F8F6F0] text-[#0A1F44] font-mono text-xs font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer border border-[#0A1F44]/30 shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{t('joinModal.downloadCard')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={shareMemberCard}
                      disabled={isGeneratingCard}
                      className="flex-1 py-3 bg-[#0A1F44] hover:bg-[#132D5E] text-[#FFD700] font-mono text-xs font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{t('joinModal.shareCard')}</span>
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="flex gap-3"
                >
                  <button
                    onClick={resetForm}
                    className="flex-1 py-3 bg-white hover:bg-[#F8F6F0] text-[#0A1F44] font-mono text-xs font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer border border-[#0A1F44]/30 shadow-sm"
                  >
                    {t('joinModal.addAnother')}
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      resetForm();
                    }}
                    className="flex-1 py-3 bg-[#0A1F44] hover:bg-[#132D5E] text-[#FFD700] font-mono text-xs font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer shadow-md"
                  >
                    {t('joinModal.closeWindow')}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
