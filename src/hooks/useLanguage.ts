import { useTranslation } from 'react-i18next';
import { LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGES, type SupportedLanguage } from '../i18n/config';

export function useLanguage() {
  const { i18n } = useTranslation();
  const language = (SUPPORTED_LANGUAGES as readonly string[]).includes(i18n.language)
    ? (i18n.language as SupportedLanguage)
    : 'ta';

  const setLanguage = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  };

  return {
    language,
    setLanguage,
    isTamil: language === 'ta',
  };
}
