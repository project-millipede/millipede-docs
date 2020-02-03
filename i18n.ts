import fs from 'fs';
import getConfig from 'next/config';
import path from 'path';

// import NextI18Next from 'next-i18next-serverless';
const isBrowser = typeof window !== 'undefined';

export const testDirectory = () => {
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
};

export const useTranslation = (_ns = ''): Record<string, any> => {
  const t = translationKey => {
    return `translationKey ${translationKey}`;
  };

  return {
    t
  };
};

// export const NextI18NextInstance = new NextI18Next({
//   projectRoot: publicRuntimeConfig.PROJECT_ROOT,
//   browserLanguageDetection: false,
//   serverLanguageDetection: false,
//   partialBundledLanguages: false,
//   ns: ['common'],
//   defaultNS: 'common',
//   defaultLanguage: 'en',
//   otherLanguages: ['de'],
//   lng: 'en'
// });

// /* Optionally, export class methods as named exports */
// export const {
//   appWithTranslation,
//   useTranslation,
//   withTranslation,
//   i18n
// } = NextI18NextInstance;
