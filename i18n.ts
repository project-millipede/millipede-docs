import NextI18Next from 'next-i18next-serverless';

export const NextI18NextInstance = new NextI18Next({
  projectRoot: process.env.PROJECT_ROOT,
  browserLanguageDetection: false,
  serverLanguageDetection: false,
  partialBundledLanguages: false,
  ns: ['common'],
  defaultNS: 'common',
  defaultLanguage: 'en',
  otherLanguages: ['de'],
  lng: 'en'
});

/* Optionally, export class methods as named exports */
export const {
  appWithTranslation,
  useTranslation,
  withTranslation,
  i18n
} = NextI18NextInstance;
