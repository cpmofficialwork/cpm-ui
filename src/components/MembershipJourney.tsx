import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedData } from '../data/useLocalizedData';
import { MemberData } from '../types';
import { Users, CheckCircle2, Award, Printer, ArrowRight, ArrowLeft } from 'lucide-react';
import emblemImage from '../assets/images/cpm_official_logo_1785581949419.jpg';

interface MembershipJourneyProps {
  onComplete?: (member: MemberData) => void;
}

export const MembershipJourney: React.FC<MembershipJourneyProps> = ({ onComplete }) => {
  const { t } = useTranslation('membershipJourney');
  const { STATE_CHAPTERS } = useLocalizedData();
  const interestOptions = t('interestOptions', { returnObjects: true }) as string[];
  const skillOptions = t('skillOptions', { returnObjects: true }) as string[];
  const occupationOptions = t('occupationOptions', { returnObjects: true }) as string[];

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: STATE_CHAPTERS[0].stateName,
    district: '',
    occupation: t('defaults.occupation'),
    interests: [] as string[],
    skills: [] as string[],
    signatureText: '',
  });

  const [generatedMember, setGeneratedMember] = useState<MemberData | null>(null);

  const handleInterestToggle = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item],
    }));
  };

  const handleSkillToggle = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(item)
        ? prev.skills.filter((s) => s !== item)
        : [...prev.skills, item],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = `CPM-2026-IND-${Math.floor(10000 + Math.random() * 90000)}`;
    const newMember: MemberData = {
      id: randomId,
      fullName: formData.fullName || t('defaultsSubmit.fullName'),
      email: formData.email || t('defaultsSubmit.email'),
      phone: formData.phone || t('defaultsSubmit.phone'),
      state: formData.state,
      district: formData.district || t('defaultsSubmit.district'),
      occupation: formData.occupation,
      interests: formData.interests.length > 0 ? formData.interests : [t('defaultsSubmit.interest')],
      skills: formData.skills.length > 0 ? formData.skills : [t('defaultsSubmit.skill')],
      pledgedAt: new Date().toISOString().split('T')[0],
      membershipId: randomId,
    };

    setGeneratedMember(newMember);
    setStep(5); // Confirmation
    if (onComplete) {
      onComplete(newMember);
    }
  };

  const printCertificate = () => {
    window.print();
  };

  return (
    <section id="become-member" className="py-20 bg-[#F8F6F0] text-[#0A1F44] border-b border-[#0A1F44]/10 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#0A1F44]/20 text-[10px] font-sans-body font-semibold text-[#0A1F44] uppercase tracking-[0.25em]">
            <Users className="w-3.5 h-3.5" />
            {t('badge', { step })}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-light text-[#0A1F44] tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-sm sm:text-base font-sans-body text-[#0A1F44]/80 leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* Multi-Step Journey Steps Bar */}
        <div className="mt-10 mb-8 flex items-center justify-between max-w-2xl mx-auto border-b border-[#0A1F44]/15 pb-4 text-xs font-mono">
          {[
            { num: 1, label: t('steps.identity') },
            { num: 2, label: t('steps.interests') },
            { num: 3, label: t('steps.skills') },
            { num: 4, label: t('steps.pledge') },
            { num: 5, label: t('steps.credential') },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 flex items-center justify-center font-bold text-xs transition-colors ${
                  step === s.num
                    ? 'bg-[#0A1F44] text-[#F8F6F0]'
                    : step > s.num
                    ? 'bg-[#138808] text-white'
                    : 'bg-white text-[#0A1F44]/50 border border-[#0A1F44]/20'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`hidden sm:inline ${step === s.num ? 'text-[#0A1F44] font-bold' : 'text-[#0A1F44]/60'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step Container Card */}
        <div className="bg-white p-6 sm:p-10 border border-[#0A1F44]/15 shadow-lg relative">
          
          {/* STEP 1: ABOUT YOU */}
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
              <div className="border-b border-[#0A1F44]/10 pb-4">
                <h3 className="text-xl font-serif-display font-bold text-[#0A1F44]">
                  {t('step1.title')}
                </h3>
                <p className="text-xs font-sans-body text-[#0A1F44]/70">
                  {t('step1.subtitle')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans-body">
                <div>
                  <label className="block text-[#0A1F44] mb-1 font-semibold">{t('step1.fullName')}</label>
                  <input
                    type="text"
                    required
                    placeholder={t('step1.fullNamePlaceholder')}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#F8F6F0] border border-[#0A1F44]/20 focus:border-[#0A1F44] text-[#0A1F44] p-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#0A1F44] mb-1 font-semibold">{t('step1.email')}</label>
                  <input
                    type="email"
                    required
                    placeholder={t('step1.emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F8F6F0] border border-[#0A1F44]/20 focus:border-[#0A1F44] text-[#0A1F44] p-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#0A1F44] mb-1 font-semibold">{t('step1.phone')}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F8F6F0] border border-[#0A1F44]/20 focus:border-[#0A1F44] text-[#0A1F44] p-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#0A1F44] mb-1 font-semibold">{t('step1.occupation')}</label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full bg-[#F8F6F0] border border-[#0A1F44]/20 focus:border-[#0A1F44] text-[#0A1F44] p-3 outline-none"
                  >
                    {occupationOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#0A1F44] mb-1 font-semibold">{t('step1.homeState')}</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#F8F6F0] border border-[#0A1F44]/20 focus:border-[#0A1F44] text-[#0A1F44] p-3 outline-none"
                  >
                    {STATE_CHAPTERS.map((ch) => (
                      <option key={ch.id} value={ch.stateName}>{ch.stateName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#0A1F44] mb-1 font-semibold">{t('step1.district')}</label>
                  <input
                    type="text"
                    placeholder={t('step1.districtPlaceholder')}
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full bg-[#F8F6F0] border border-[#0A1F44]/20 focus:border-[#0A1F44] text-[#0A1F44] p-3 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#0A1F44]/10">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#0A1F44] text-[#F8F6F0] font-semibold text-xs tracking-wider uppercase hover:bg-[#000080] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {t('step1.next')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: INTERESTS */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="border-b border-[#0A1F44]/10 pb-4">
                <h3 className="text-xl font-serif-display font-bold text-[#0A1F44]">
                  {t('step2.title')}
                </h3>
                <p className="text-xs font-sans-body text-[#0A1F44]/70">
                  {t('step2.subtitle')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {interestOptions.map((opt) => {
                  const isChecked = formData.interests.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleInterestToggle(opt)}
                      className={`p-4 border text-left text-xs font-sans-body transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#0A1F44] text-[#F8F6F0] font-semibold border-[#0A1F44]'
                          : 'bg-[#F8F6F0] text-[#0A1F44] border-[#0A1F44]/15 hover:border-[#0A1F44]'
                      }`}
                    >
                      <span>{opt}</span>
                      <span className={isChecked ? 'text-[#FF9933]' : 'text-[#0A1F44]/40'}>
                        {isChecked ? '✓' : '+'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4 border-t border-[#0A1F44]/10">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 border border-[#0A1F44]/20 text-[#0A1F44] font-semibold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> {t('back')}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-[#0A1F44] text-[#F8F6F0] font-semibold text-xs tracking-wider uppercase hover:bg-[#000080] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {t('step2.next')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SKILLS & PARTICIPATION */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="border-b border-[#0A1F44]/10 pb-4">
                <h3 className="text-xl font-serif-display font-bold text-[#0A1F44]">
                  {t('step3.title')}
                </h3>
                <p className="text-xs font-sans-body text-[#0A1F44]/70">
                  {t('step3.subtitle')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillOptions.map((sk) => {
                  const isChecked = formData.skills.includes(sk);
                  return (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => handleSkillToggle(sk)}
                      className={`p-4 border text-left text-xs font-sans-body transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#0A1F44] text-[#F8F6F0] font-semibold border-[#0A1F44]'
                          : 'bg-[#F8F6F0] text-[#0A1F44] border-[#0A1F44]/15 hover:border-[#0A1F44]'
                      }`}
                    >
                      <span>{sk}</span>
                      <span className={isChecked ? 'text-[#FF9933]' : 'text-[#0A1F44]/40'}>
                        {isChecked ? '✓' : '+'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4 border-t border-[#0A1F44]/10">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 border border-[#0A1F44]/20 text-[#0A1F44] font-semibold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> {t('back')}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-3 bg-[#0A1F44] text-[#F8F6F0] font-semibold text-xs tracking-wider uppercase hover:bg-[#000080] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {t('step3.next')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PLEDGE TO CONSTITUTIONAL VALUES */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-[#0A1F44]/10 pb-4">
                <h3 className="text-xl font-serif-display font-bold text-[#0A1F44]">
                  {t('step4.title')}
                </h3>
                <p className="text-xs font-sans-body text-[#0A1F44]/70">
                  {t('step4.subtitle')}
                </p>
              </div>

              <div className="p-6 bg-[#F8F6F0] border border-[#0A1F44]/20 space-y-4 font-serif-quote italic text-xs sm:text-sm text-[#0A1F44] leading-relaxed">
                <p>
                  "{t('step4.pledgeText1')}"
                </p>
                <p>
                  "{t('step4.pledgeText2')}"
                </p>
              </div>

              <div>
                <label className="block text-xs font-sans-body font-semibold text-[#0A1F44] mb-1">
                  {t('step4.signatureLabel')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('step4.signaturePlaceholder')}
                  value={formData.signatureText}
                  onChange={(e) => setFormData({ ...formData, signatureText: e.target.value })}
                  className="w-full bg-[#F8F6F0] border border-[#0A1F44]/30 focus:border-[#0A1F44] text-[#0A1F44] font-serif-display p-3 text-lg outline-none"
                />
              </div>

              <div className="flex justify-between pt-4 border-t border-[#0A1F44]/10">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 border border-[#0A1F44]/20 text-[#0A1F44] font-semibold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> {t('back')}
                </button>
                <button
                  type="submit"
                  disabled={!formData.signatureText}
                  className="px-8 py-3.5 bg-[#138808] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#107006] transition-colors shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Award className="w-4 h-4" />
                  {t('step4.submit')}
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: CONFIRMATION & DIGITAL CERTIFICATE + ID CARD */}
          {step === 5 && generatedMember && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="text-center space-y-2 border-b border-[#0A1F44]/10 pb-6">
                <div className="w-16 h-16 bg-[#138808]/10 border border-[#138808] mx-auto flex items-center justify-center text-[#138808]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif-display font-light text-[#0A1F44]">
                  {t('step5.welcome')}
                </h3>
                <p className="text-xs font-sans-body text-[#0A1F44]/70">
                  {t('step5.official')} <strong>{generatedMember.membershipId}</strong>
                </p>
              </div>

              {/* Printable/Downloadable Official Digital Membership Card & Certificate */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* ID Card (5 cols) */}
                <div className="md:col-span-5 bg-[#0A1F44] text-[#F8F6F0] border border-[#0A1F44] p-5 shadow-lg space-y-4">
                  <div className="flex items-center justify-between border-b border-white/15 pb-3">
                    <div className="flex items-center gap-2">
                      <img src={emblemImage} alt="Seal" className="w-8 h-8 rounded-full border border-white/20" referrerPolicy="no-referrer" />
                      <div>
                        <div className="text-[10px] font-serif-display font-bold text-[#F8F6F0]">{t('step5.orgName')}</div>
                        <div className="text-[8px] font-mono text-[#FF9933]">{t('step5.nationalGuardianId')}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-sans-body">
                    <div>
                      <div className="text-[9px] font-mono opacity-60 uppercase">{t('step5.memberName')}</div>
                      <div className="text-sm font-serif-display font-bold text-[#F8F6F0]">{generatedMember.fullName}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <div className="text-[8px] font-mono opacity-60 uppercase">{t('step5.chapter')}</div>
                        <div className="font-semibold text-[#F8F6F0]">{generatedMember.state}</div>
                      </div>
                      <div>
                        <div className="text-[8px] font-mono opacity-60 uppercase">{t('step5.calling')}</div>
                        <div className="font-semibold text-[#F8F6F0]">{generatedMember.occupation}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[8px] font-mono opacity-60 uppercase">{t('step5.membershipNumber')}</div>
                      <div className="font-mono text-[#FF9933] font-bold text-xs">{generatedMember.membershipId}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[9px] font-mono opacity-70">
                    <span>{t('step5.issued')} {generatedMember.pledgedAt}</span>
                    <span className="text-[#138808] font-bold">{t('step5.statusActive')}</span>
                  </div>
                </div>

                {/* Official Framed Pledge Certificate (7 cols) */}
                <div className="md:col-span-7 bg-[#F8F6F0] text-[#0A1F44] border-4 border-[#0A1F44] p-8 shadow-lg space-y-4 font-serif-display">
                  <div className="text-center space-y-1 border-b border-[#0A1F44]/20 pb-4">
                    <img src={emblemImage} alt="Emblem" className="w-12 h-12 mx-auto rounded-full" referrerPolicy="no-referrer" />
                    <div className="text-[10px] font-mono tracking-widest text-[#0A1F44]/60 uppercase">{t('step5.orgName')}</div>
                    <h4 className="text-2xl font-serif-display font-bold text-[#0A1F44]">
                      {t('step5.certificateTitle')}
                    </h4>
                  </div>

                  <div className="text-center space-y-2 text-xs sm:text-sm leading-relaxed text-[#0A1F44] font-sans-body">
                    <div>{t('step5.certifyThat')}</div>
                    <div className="text-xl font-serif-display font-bold text-[#0A1F44] uppercase border-b border-[#0A1F44]/30 inline-block px-4">
                      {generatedMember.fullName}
                    </div>
                    <div>
                      {t('step5.oathText', { constitution: t('step5.constitution'), principles: t('step5.principles') })}
                    </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between text-[10px] font-sans-body border-t border-[#0A1F44]/20">
                    <div>
                      <div className="font-bold">{t('step5.orgName')}</div>
                      <div>{t('step5.secretariat')}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-serif-quote italic font-bold text-xs text-[#0A1F44]">{formData.signatureText || generatedMember.fullName}</div>
                      <div>{t('step5.digitalSignature')}</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Certificate Download Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 no-print">
                <button
                  onClick={printCertificate}
                  className="px-6 py-3 bg-[#0A1F44] text-[#F8F6F0] font-semibold text-xs uppercase tracking-wider hover:bg-[#000080] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> {t('step5.printCertificate')}
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-3 border border-[#0A1F44]/20 text-[#0A1F44] font-semibold text-xs cursor-pointer"
                >
                  {t('step5.enrollAnother')}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};

