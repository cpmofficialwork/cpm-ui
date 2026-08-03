import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ExternalLink, Sparkles, Navigation, Award, Users, Share2, CheckCircle2, Shield, Ticket, X, UserPlus, Crown, UserCheck, BookOpen, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import leaderImg from '../assets/images/leader_portrait_1785579952921.jpg';
import cpmLogoImage from '../assets/images/cpm_official_logo_1785581949419.jpg';
import pamphletCoverImg from '../assets/images/pamphlet_cover_page1_1785666053368.jpg';
import { ConferencePamphlet } from './ConferencePamphlet';
import { createUser, ApiError } from '../lib/api';

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
  const [visitorState, setVisitorState] = useState(indianStates[0]);
  const [visitorDistrict, setVisitorDistrict] = useState(tnDistricts[0]);
  const [visitorConstituency, setVisitorConstituency] = useState('');
  const [passNumber, setPassNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

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

  // Lock background body scroll when any modal is open
  useEffect(() => {
    if (isModalOpen || isPamphletOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen, isPamphletOpen]);

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
        constituency: visitorConstituency.trim(),
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
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[#FFB800] via-[#FFA000] to-[#FF8F00] text-[#0A1F44] font-mono text-xs font-black uppercase tracking-[0.25em] rounded-full shadow-[0_0_20px_rgba(255,184,0,0.4)] border border-[#FFE082]">
              <Sparkles className="w-4 h-4 text-[#0A1F44] animate-spin" style={{ animationDuration: '5s' }} />
              <span>{t('badge')}</span>
            </div>
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
              
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FFB800] font-extrabold uppercase tracking-[0.3em]">
                <Award className="w-4 h-4 text-[#FFB800]" />
                <span>{t('statewideRally')}</span>
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
                <div className="p-4 bg-gradient-to-br from-black/40 to-[#0A1F44] rounded-2xl border border-white/15 hover:border-sky-400/60 transition-all shadow-md space-y-2">
                  <div className="flex items-center gap-2 text-sky-300">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{t('schedule.venueCardLabel')}</span>
                  </div>
                  <div className="text-base font-bold text-white leading-snug font-serif-display">
                    {t('schedule.venueName')}
                  </div>
                  <div className="text-[11px] text-white/80 font-sans-body">
                    {t('schedule.venueAddress')}
                  </div>
                  <div className="text-[10px] text-[#FFB800] font-mono font-semibold">
                    {t('schedule.venueMetro')}
                  </div>
                </div>
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
                <div className="relative bg-[#8B0000] p-2 sm:p-3 flex-1 flex items-center justify-center overflow-hidden">
                  <img
                    src={pamphletCoverImg}
                    alt={t('pamphletCard.coverAlt')}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[580px] object-contain border-2 border-[#0A1F44] shadow-lg group-hover:scale-[1.01] transition-transform duration-300 block"
                  />
                </div>

                {/* Card Bottom Footer Callout */}
                <div className="p-3 bg-[#0A1F44] text-white border-t-2 border-[#0A1F44] flex items-center justify-between text-[11px] font-mono font-bold">
                  <span className="flex items-center gap-1 text-[#FFD700]">
                    <Sparkles className="w-3.5 h-3.5" />
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
                          value={visitorState}
                          onChange={(e) => setVisitorState(e.target.value)}
                          className="w-full px-3.5 py-3 bg-white border border-[#0A1F44]/25 rounded-none text-[#0A1F44] font-sans-body text-sm focus:outline-none focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/15 shadow-sm cursor-pointer"
                        >
                          {indianStates.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>

                      {/* District */}
                      <div>
                        <label className="block font-mono text-xs text-[#0A1F44] font-bold uppercase tracking-wider mb-1.5">
                          {t('joinModal.district')}
                        </label>
                        {visitorState === indianStates[0] ? (
                          <select
                            value={visitorDistrict}
                            onChange={(e) => setVisitorDistrict(e.target.value)}
                            className="w-full px-3.5 py-3 bg-white border border-[#0A1F44]/25 rounded-none text-[#0A1F44] font-sans-body text-sm focus:outline-none focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/15 shadow-sm cursor-pointer"
                          >
                            {tnDistricts.map((d) => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            required
                            placeholder={t('joinModal.districtPlaceholder')}
                            value={visitorDistrict}
                            onChange={(e) => setVisitorDistrict(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-[#0A1F44]/25 rounded-none text-[#0A1F44] placeholder-[#0A1F44]/40 font-sans-body text-sm focus:outline-none focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/15 shadow-sm"
                          />
                        )}
                      </div>
                    </div>

                    {/* 4. Constituency */}
                    <div>
                      <label className="block font-mono text-xs text-[#0A1F44] font-bold uppercase tracking-wider mb-1.5">
                        {t('joinModal.constituency')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('joinModal.constituencyPlaceholder')}
                        value={visitorConstituency}
                        onChange={(e) => setVisitorConstituency(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#0A1F44]/25 rounded-none text-[#0A1F44] placeholder-[#0A1F44]/40 font-sans-body text-sm focus:outline-none focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/15 shadow-sm"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="px-4 py-3 bg-red-50 border border-red-300 text-red-700 text-xs font-sans-body rounded-none">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#0A1F44] hover:bg-[#132D5E] text-[#FFD700] font-black text-xs uppercase tracking-[0.2em] rounded-none shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#FFD700]/30 active:scale-[0.99] mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
                    <span>{isSubmitting ? t('joinModal.submitting') : t('joinModal.submit')}</span>
                  </button>
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
                    className="p-6 bg-white border-2 border-[#0A1F44] rounded-none space-y-4 relative overflow-hidden shadow-xl text-[#0A1F44]"
                  >
                    <div className="bg-[#0A1F44] text-[#FFD700] py-2 px-3 rounded-none text-center font-mono text-[11px] font-extrabold uppercase tracking-widest flex items-center justify-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-[#FFD700]" />
                      <span>{t('joinModal.officialMember')}</span>
                    </div>

                    <div className="space-y-1 pt-1">
                      <div className="text-2xl font-serif-display font-black text-[#0A1F44]">
                        {visitorName}
                      </div>
                      <div className="text-xs font-mono text-[#D97706] font-extrabold tracking-wider">
                        {t('joinModal.memberId')} {passNumber}
                      </div>
                    </div>

                    <div className="bg-[#F8F6F0] p-3.5 rounded-none border border-[#0A1F44]/15 grid grid-cols-2 gap-2 text-[11px] font-mono text-[#0A1F44] text-left">
                      <div><span className="font-bold text-[#0A1F44]/60">{t('joinModal.mobileLabel')}</span> {visitorPhone || t('joinModal.notAvailable')}</div>
                      <div><span className="font-bold text-[#0A1F44]/60">{t('joinModal.stateLabel')}</span> {visitorState}</div>
                      <div><span className="font-bold text-[#0A1F44]/60">{t('joinModal.districtLabel')}</span> {visitorDistrict}</div>
                      <div><span className="font-bold text-[#0A1F44]/60">{t('joinModal.constituencyLabel')}</span> {visitorConstituency || t('joinModal.notAvailable')}</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65, duration: 0.4 }}
                    className="flex gap-3"
                  >
                    <button
                      onClick={() => {
                        setPassClaimed(false);
                        setVisitorName('');
                        setVisitorPhone('');
                        setVisitorConstituency('');
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
                        setVisitorConstituency('');
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
