import * as en from './en/constitutionalData';
import * as ta from './ta/constitutionalData';
import { useLanguage } from '../hooks/useLanguage';

const DATA_BY_LANGUAGE = { en, ta };

export function useLocalizedData() {
  const { language } = useLanguage();
  return DATA_BY_LANGUAGE[language];
}
