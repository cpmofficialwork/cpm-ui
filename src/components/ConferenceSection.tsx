import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Calendar, Clock, MapPin, ExternalLink, Navigation, Award, Users, Share2, CheckCircle2, Shield, Ticket, X, UserPlus, Crown, UserCheck, BookOpen, ChevronRight, TrainFront, Download, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import leaderImg from '../assets/images/leader_portrait_1785579952921.jpg';
import cpmLogoImage from '../assets/images/cpm_official_logo_1785581949419.jpg';
import pamphletCoverImg from '../assets/images/pamphlet_cover_page1.png';
import pamphletCoverImgTa from '../assets/images/pamphlet_cover_page1_ta.png';
import { ConferencePamphlet } from './ConferencePamphlet';
import { createUser, ApiError } from '../lib/api';
import { useScrollLock } from '../hooks/useScrollLock';
import { useLanguage } from '../hooks/useLanguage';

interface ConferenceSectionProps {
  isPassModalOpen?: boolean;
  onClosePassModal?: () => void;
  onOpenPassModal?: () => void;
  isPamphletModalOpen?: boolean;
  onOpenPamphletModal?: () => void;
  onClosePamphletModal?: () => void;
}

export const ConferenceSection: React.FC<ConferenceSectionProps> = ({
  isPassModalOpen: externalPassModalOpen,
  onClosePassModal,
  onOpenPassModal,
  isPamphletModalOpen: externalPamphletModalOpen,
  onOpenPamphletModal,
  onClosePamphletModal,
}) => {
  const { t } = useTranslation('conferenceSection');
  const { isTamil } = useLanguage();
  const mapUrl = "https://maps.app.goo.gl/fAhXKpBMDZ7FF6KL7";
  const eventDate = new Date("2026-08-21T16:00:00+05:30");

  const tnDistricts = t('tnDistricts', { returnObjects: true }) as string[];
  const indianStates = t('indianStates', { returnObjects: true }) as string[];

  const [copied, setCopied] = useState(false);
  const [internalPassModal, setInternalPassModal] = useState(false);
  const [internalPamphletModal, setInternalPamphletModal] = useState(false);
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

  const isModalOpen = externalPassModalOpen !== undefined ? externalPassModalOpen : internalPassModal;
  const isPamphletOpen = externalPamphletModalOpen !== undefined ? externalPamphletModalOpen : internalPamphletModal;

  const handleOpenPamphlet = () => {
    if (onOpenPamphletModal) {
      onOpenPamphletModal();
    } else {
      setInternalPamphletModal(true);
    }
  };

  const handleClosePamphlet = () => {
    if (onClosePamphletModal) {
      onClosePamphletModal();
    } else {
      setInternalPamphletModal(false);
    }
  };

  useScrollLock(isModalOpen || isPamphletOpen);

  const openModal = () => {
    if (onOpenPassModal) {
      onOpenPassModal();
    } else {
      setInternalPassModal(true);
    }
  };

  const closeModal = () => {
    if (onClosePassModal) {
      onClosePassModal();
    } else {
      setInternalPassModal(false);
    }
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleShare = () => {
    const shareText = t('shareText', { mapUrl });
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

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

  return (
    <section id="conference" className="bg-gradient-to-b from-[#020A16] via-[#081836] to-[#041026] text-[#F8F6F0] py-16 lg:py-24 border-b-4 border-[#FFB800] relative overflow-hidden shadow-2xl">
      
      {/* Luxury Gold & Emerald Ambient Rays */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#FFB800]/20 rounded-full blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#138808]/20 rounded-full blur-[140px] pointer-events-none" 
      />

      {/* Golden Metallic Top Accent Line */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#FFB800] via-[#FFF5C0] to-[#138808] shadow-[0_0_15px_#FFB800]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Header Badge & Live Alert */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-white/15 pb-8"
        >
          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              onClick={openModal}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[#FFB800] via-[#FFA000] to-[#FF8F00] text-[#0A1F44] font-mono text-xs font-black uppercase tracking-[0.25em] rounded-full shadow-[0_0_20px_rgba(255,184,0,0.4)] border border-[#FFE082] cursor-pointer hover:shadow-[0_0_28px_rgba(255,184,0,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>{t('badge')}</span>
            </motion.button>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold uppercase tracking-wider">{t('registrationOpen')}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 text-[#FFB800] rounded-full">
              <Shield className="w-3.5 h-3.5" />
              <span className="font-semibold uppercase tracking-wider">{t('chennaiAssembly')}</span>
            </div>
          </div>
        </motion.div>

        {/* Main Banner Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Headline, Dual Language Title, Pillars, Countdown & Date/Time Details */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-5">
              
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FFB800] font-extrabold uppercase tracking-[0.3em]">
                  <Award className="w-4 h-4 text-[#FFB800]" />
                  <span>{t('statewideRally')}</span>
                </div>

                {/* Highlighted Event Date Badge */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFB800] via-[#FFA000] to-[#FF8F00] text-[#0A1F44] rounded-full shadow-[0_0_20px_rgba(255,184,0,0.5)] border border-[#FFE082]"
                >
                  <Calendar className="w-4 h-4" strokeWidth={2.5} />
                  <span className="font-mono font-black text-sm tracking-wider">{t('dateHighlight')}</span>
                </motion.div>
              </div>

              {/* Title & Bilingual Sub-Heading */}
              <div className="space-y-3">
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif-display font-black text-white tracking-tight leading-[1.05] drop-shadow-2xl">
                  {t('title')}
                </h2>
                <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#FFB800]/20 to-transparent border-l-4 border-[#FFB800] text-xl sm:text-2xl font-sans-body font-semibold text-[#FFE082] italic font-serif-quote">
                  {t('titleTamil')}
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#F8F6F0]/90 font-sans-body leading-relaxed max-w-2xl pt-2">
                {t('description')}
              </p>
            </div>

            {/* 3 Key Pillars of Conference */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-4 bg-gradient-to-b from-white/10 to-white/5 border border-white/15 rounded-2xl space-y-2 backdrop-blur-md shadow-lg"
              >
                <div className="p-2 bg-[#FFB800]/20 text-[#FFB800] rounded-lg w-fit">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-white uppercase font-mono tracking-wider">{t('pillars.judicialTitle')}</div>
                <div className="text-[11px] text-[#F8F6F0]/70 leading-snug">{t('pillars.judicialDesc')}</div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-4 bg-gradient-to-b from-white/10 to-white/5 border border-white/15 rounded-2xl space-y-2 backdrop-blur-md shadow-lg"
              >
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg w-fit">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-white uppercase font-mono tracking-wider">{t('pillars.assemblyTitle')}</div>
                <div className="text-[11px] text-[#F8F6F0]/70 leading-snug">{t('pillars.assemblyDesc')}</div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-4 bg-gradient-to-b from-white/10 to-white/5 border border-white/15 rounded-2xl space-y-2 backdrop-blur-md shadow-lg"
              >
                <div className="p-2 bg-sky-400/20 text-sky-300 rounded-lg w-fit">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-white uppercase font-mono tracking-wider">{t('pillars.oathTitle')}</div>
                <div className="text-[11px] text-[#F8F6F0]/70 leading-snug">{t('pillars.oathDesc')}</div>
              </motion.div>
            </div>

            {/* Countdown Clock */}
            <div className="p-6 bg-gradient-to-r from-black/60 via-[#0A1F44] to-black/60 border-2 border-[#FFB800]/40 rounded-2xl space-y-4 shadow-2xl">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#FFB800] font-black uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FFB800] animate-pulse" />
                  {t('countdown.label')}
                </span>
                <span className="text-white/80 font-bold">{t('countdown.dateLabel')}</span>
              </div>

              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-[#040D1B] p-3 rounded-xl border border-white/15 shadow-inner">
                  <div className="text-2xl sm:text-4xl font-bold font-serif-display text-white">{timeLeft.days}</div>
                  <div className="text-[10px] text-white/60 font-mono uppercase tracking-wider mt-1">{t('countdown.days')}</div>
                </div>
                <div className="bg-[#040D1B] p-3 rounded-xl border border-white/15 shadow-inner">
                  <div className="text-2xl sm:text-4xl font-bold font-serif-display text-white">{timeLeft.hours}</div>
                  <div className="text-[10px] text-white/60 font-mono uppercase tracking-wider mt-1">{t('countdown.hours')}</div>
                </div>
                <div className="bg-[#040D1B] p-3 rounded-xl border border-[#FFB800]/40 shadow-inner">
                  <div className="text-2xl sm:text-4xl font-bold font-serif-display text-[#FFB800]">{timeLeft.minutes}</div>
                  <div className="text-[10px] text-[#FFB800]/80 font-mono uppercase tracking-wider mt-1">{t('countdown.minutes')}</div>
                </div>
                <div className="bg-[#040D1B] p-3 rounded-xl border border-emerald-500/40 shadow-inner">
                  <div className="text-2xl sm:text-4xl font-bold font-serif-display text-emerald-400">{timeLeft.seconds}</div>
                  <div className="text-[10px] text-emerald-400/80 font-mono uppercase tracking-wider mt-1">{t('countdown.seconds')}</div>
                </div>
              </div>
            </div>

            {/* Conference Date, Assembly Time & Venue - Located Directly BOTTOM of Live Event Countdown */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FFB800] uppercase font-extrabold tracking-widest">
                <Calendar className="w-4 h-4 text-[#FFB800]" />
                <span>{t('schedule.label')}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Date Card */}
                <div className="p-4 bg-gradient-to-br from-black/40 to-[#0A1F44] rounded-2xl border border-white/15 hover:border-[#FFB800]/60 transition-all shadow-md space-y-2">
                  <div className="flex items-center gap-2 text-[#FFB800]">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{t('schedule.dateCardLabel')}</span>
                  </div>
                  <div className="text-lg font-bold text-white font-serif-display">
                    {t('schedule.date')}
                  </div>
                  <div className="text-[11px] text-white/70 font-mono">
                    {t('schedule.dateSub')}
                  </div>
                </div>

                {/* Assembly Time Card */}
                <div className="p-4 bg-gradient-to-br from-black/40 to-[#0A1F44] rounded-2xl border border-white/15 hover:border-emerald-500/60 transition-all shadow-md space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{t('schedule.timeCardLabel')}</span>
                  </div>
                  <div className="text-lg font-bold text-white font-serif-display">
                    {t('schedule.time')}
                  </div>
                  <div className="text-[11px] text-white/70 font-mono">
                    {t('schedule.timeSub')}
                  </div>
                </div>

                {/* Venue Address Card */}
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/venue p-4 bg-gradient-to-br from-black/40 to-[#0A1F44] rounded-2xl border border-white/15 hover:border-sky-400/60 transition-all shadow-md space-y-2 block cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 text-sky-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{t('schedule.venueCardLabel')}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-sky-300/70 group-hover/venue:text-sky-300 transition-colors shrink-0" />
                  </div>
                  <div className="text-base font-bold text-white leading-snug font-serif-display group-hover/venue:underline">
                    {t('schedule.venueName')}
                  </div>
                  <div className="text-[11px] text-white/80 font-sans-body">
                    {t('schedule.venueAddress')}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 -ml-0.5 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-full text-[10px] text-[#FFB800] font-mono font-semibold w-fit">
                    <TrainFront className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
                    <span>{t('schedule.venueMetro')}</span>
                  </div>
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Pamphlet Sheet 1 Display in Big Image Position with Top Right "View Pamphlet" Button */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-between relative h-full"
          >
            {/* Interactive Pamphlet Cover Sheet 1 Stack Container */}
            <div 
              onClick={handleOpenPamphlet}
              className="relative group cursor-pointer w-full h-full flex flex-col justify-between"
              title={t('pamphletCard.clickToView')}
            >
              {/* 3D Paper Layer Stack Effects */}
              <div className="absolute inset-0 bg-[#C41E3A] translate-x-3 translate-y-3 border-2 border-[#0A1F44] rounded-none opacity-80 transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
              <div className="absolute inset-0 bg-[#0A1F44] translate-x-1.5 translate-y-1.5 border-2 border-[#0A1F44] rounded-none opacity-90 transition-transform group-hover:translate-x-2.5 group-hover:translate-y-2.5" />

              {/* Main Pamphlet Sheet 1 Card - Official Page 1 Cover Image Design */}
              <div className="relative bg-[#C41E3A] text-white border-4 border-[#0A1F44] rounded-none shadow-2xl flex flex-col justify-between h-full overflow-hidden group-hover:-translate-y-1 transition-transform">
                
                {/* Floating Top Right "View Pamphlet" Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenPamphlet();
                  }}
                  className="absolute top-3 right-3 z-30 px-3.5 py-2 bg-[#FFD700] hover:bg-white text-[#8B0000] font-mono text-xs font-black uppercase tracking-wider rounded-none border-2 border-[#8B0000] shadow-[3px_3px_0px_0px_rgba(10,31,68,1)] hover:shadow-none transition-all flex items-center gap-1.5 cursor-pointer group/btn"
                >
                  <BookOpen className="w-4 h-4 text-[#8B0000]" />
                  <span>{t('pamphletCard.openReader')}</span>
                  <ChevronRight className="w-4 h-4 text-[#8B0000] group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                {/* Cover Image Container */}
                <div className="relative bg-[#8B0000] p-2 sm:p-3 lg:p-1 flex-1 flex items-center justify-center overflow-hidden">
                  <img
                    src={isTamil ? pamphletCoverImgTa : pamphletCoverImg}
                    alt={t('pamphletCard.coverAlt')}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[580px] lg:h-full lg:max-h-none lg:scale-110 object-contain border-2 border-[#0A1F44] shadow-lg group-hover:scale-[1.14] transition-transform duration-300 block"
                  />
                </div>

                {/* Card Bottom Footer Callout */}
                <div className="p-3 bg-[#0A1F44] text-white border-t-2 border-[#0A1F44] flex items-center justify-between text-[11px] font-mono font-bold">
                  <span className="flex items-center gap-1 text-[#FFD700]">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{t('pamphletCard.officialPamphlet')}</span>
                  </span>
                  <span className="underline group-hover:text-[#FFD700] transition-colors flex items-center gap-1 text-white">
                    <span>{t('pamphletCard.clickToOpen')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            </div>

          </motion.div>

        </div>

        {/* 4-Page Pamphlet Interactive Reader Modal Overlay */}
        <ConferencePamphlet 
          isOpen={isPamphletOpen} 
          onClose={handleClosePamphlet} 
          hideBanner={true} 
        />

      </div>

      {/* Join the Movement Modal */}
      <AnimatePresence>
        {isModalOpen && (
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
                onClick={closeModal}
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
                      onClick={() => {
                        setPassClaimed(false);
                        setVisitorName('');
                        setVisitorPhone('');
                        setVisitorSubDistrict('');
                        setVisitorVillageOrTown('');
                        setWantsToVolunteer(false);
                      }}
                      className="flex-1 py-3 bg-white hover:bg-[#F8F6F0] text-[#0A1F44] font-mono text-xs font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer border border-[#0A1F44]/30 shadow-sm"
                    >
                      {t('joinModal.addAnother')}
                    </button>

                    <button
                      onClick={() => {
                        closeModal();
                        setPassClaimed(false);
                        setVisitorName('');
                        setVisitorPhone('');
                        setVisitorSubDistrict('');
                        setVisitorVillageOrTown('');
                        setWantsToVolunteer(false);
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
      </AnimatePresence>

    </section>
  );
};
