import fs from 'fs';
import NextI18Next from 'next-i18next-serverless';
import getConfig from 'next/config';
import path from 'path';

const isBrowser = typeof window !== 'undefined';

const { publicRuntimeConfig } = getConfig();

const { PROJECT_ROOT } = publicRuntimeConfig;

console.log('PROJECT_ROOT: ', PROJECT_ROOT);

const locales = !isBrowser
  ? fs.existsSync(
      path.join(publicRuntimeConfig.PROJECT_ROOT, './locales/en/common.json')
    )
  : false;

const publicLocales = !isBrowser
  ? fs.readFileSync(
      path.join(
        publicRuntimeConfig.PROJECT_ROOT,
        './public/locales/en/common.json'
      )
    )
  : false;

console.log('isBrowser: ', isBrowser);
console.log('locales exists: ', locales);
console.log('publicLocales exists: ', publicLocales);

export const NextI18NextInstance = new NextI18Next({
  projectRoot: publicRuntimeConfig.PROJECT_ROOT,
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
