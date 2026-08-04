import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, ExternalLink, Navigation } from 'lucide-react';
import cpmLogoImage from '../assets/images/cpm_official_logo_1785581949419.jpg';

export const Footer: React.FC = () => {
  const { t } = useTranslation('footer');
  const valuesList = t('valuesList', { returnObjects: true }) as string[];
  const whyProtectList = t('whyProtectList', { returnObjects: true }) as string[];
  return (
    <footer className="bg-[#0A1F44] text-[#F8F6F0] border-t border-[#0A1F44] font-sans-body pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Institutional Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-[#F8F6F0]/15 pb-10">
          
          <div className="md:col-span-7 flex items-start gap-4">
            <img
              src={cpmLogoImage}
              alt={t('logoAlt')}
              className="w-16 h-16 rounded-full border-2 border-[#FF9933] p-0.5 bg-white shrink-0 shadow-lg object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <h3 className="font-serif-display font-bold text-xl text-[#F8F6F0] tracking-wide">
                {t('orgName')}
              </h3>
              <p className="text-xs font-serif text-[#FF9933] tracking-wide font-medium">
                {t('orgSubtitle')}
              </p>
              <p className="text-xs text-[#F8F6F0]/80 max-w-xl pt-1 leading-relaxed">
                {t('orgDescription')}
              </p>
            </div>
          </div>

          <div className="md:col-span-5 bg-white/5 p-5 border border-white/10 text-xs space-y-2">
            <div className="font-mono text-[#FF9933] font-bold uppercase flex items-center gap-1.5 tracking-wider">
              <Phone className="w-3.5 h-3.5" />
              {t('helplineLabel')}
            </div>
            <div className="text-lg font-mono font-bold text-white">{t('helplineNumber')}</div>
            <div className="text-[11px] text-[#F8F6F0]/70">
              {t('helplineDescription')}
            </div>
          </div>

        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          
          <div className="space-y-3">
            <div className="font-serif-display font-semibold text-[#FF9933] uppercase tracking-wider text-xs">
              {t('columns.constitutionalValues')}
            </div>
            <ul className="space-y-2 text-[#F8F6F0]/80">
              {valuesList.map((v) => (
                <li key={v}><a href="#constitutional-values" className="hover:text-white transition-colors">{v}</a></li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-serif-display font-semibold text-[#FF9933] uppercase tracking-wider text-xs">
              {t('columns.whyProtect')}
            </div>
            <ul className="space-y-2 text-[#F8F6F0]/80">
              {whyProtectList.map((v, i) => (
                <li key={v}>
                  <a href={['#why-it-matters', '#why-it-matters', '#who-conducts', '#responsibilities', '#constitutional-values'][i]} className="hover:text-white transition-colors">{v}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-serif-display font-semibold text-[#FF9933] uppercase tracking-wider text-xs">
              {t('columns.nationalSecretariat')}
            </div>
            <div className="space-y-2.5 text-[#F8F6F0]/80 text-[11px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
                <div>
                  <span>{t('secretariatAddress')}</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Mandi+House+New+Delhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] font-mono text-sky-300 hover:text-[#FF9933] underline mt-1"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>{t('viewSecretariatMap')}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              <div className="pt-1 border-t border-white/10">
                <div className="text-[10px] font-mono text-[#FF9933] font-bold uppercase">{t('assemblyVenue2026')}</div>
                <a
                  href="https://maps.app.goo.gl/fAhXKpBMDZ7FF6KL7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] font-mono text-sky-300 hover:text-[#FF9933] underline mt-0.5"
                >
                  <MapPin className="w-3 h-3 text-[#FF9933]" />
                  <span>{t('assemblyVenueMapLabel')}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                <Mail className="w-4 h-4 text-[#FF9933] shrink-0" />
                <span>secretariat@constitutionprotection.in</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-serif-display font-semibold text-[#FF9933] uppercase tracking-wider text-xs">
              {t('columns.socialHandles')}
            </div>
            <p className="text-[11px] text-[#F8F6F0]/70">
              {t('followUs')}
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href="https://x.com/cpm_Tamilnadu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 bg-white/10 hover:bg-[#1DA1F2]/20 border border-white/15 hover:border-[#1DA1F2] rounded-xl transition-all group text-white text-[11px]"
              >
                <span className="p-1 bg-[#1DA1F2] text-white rounded-md group-hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="font-mono font-bold group-hover:text-[#1DA1F2] transition-colors">X</span>
                  <span className="text-[10px] text-white/60">@cpm_Tamilnadu</span>
                </div>
              </a>

              <a
                href="https://www.facebook.com/people/Cpm-Tamilnadu/61592546047506/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 bg-white/10 hover:bg-[#1877F2]/20 border border-white/15 hover:border-[#1877F2] rounded-xl transition-all group text-white text-[11px]"
              >
                <span className="p-1 bg-[#1877F2] text-white rounded-md group-hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="font-mono font-bold group-hover:text-[#1877F2] transition-colors">Facebook</span>
                  <span className="text-[10px] text-white/60">@Cpm Tamilnadu </span>
                </div>
              </a>

              <a
                href="https://www.instagram.com/cpm_tamilnadu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 bg-white/10 hover:bg-pink-500/20 border border-white/15 hover:border-pink-500 rounded-xl transition-all group text-white text-[11px]"
              >
                <span className="p-1 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white rounded-md group-hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="font-mono font-bold group-hover:text-pink-400 transition-colors">Instagram</span>
                  <span className="text-[10px] text-white/60">@cpm_tamilnadu</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Preamble Excerpt Banner */}
        <div className="p-6 bg-white/5 border border-white/10 text-center space-y-2">
          <blockquote className="font-serif-display italic text-sm text-[#F8F6F0]/90 leading-relaxed">
            {t('preambleQuote')}
          </blockquote>
          <div className="text-[11px] font-mono text-[#FF9933]">
            {t('preambleCitation')}
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#F8F6F0]/60 gap-4">
          <div>
            {t('copyright')}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#138808]">{t('nonPartisan')}</span>
            <span>•</span>
            <span>{t('madeWithVigilance')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

