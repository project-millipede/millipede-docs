import NextI18Next from 'next-i18next';
import getConfig from 'next/config';
import path from 'path';

const getNextI18NextInstance = (_nextConfig: any) => {
  // const {
  //   publicRuntimeConfig: { localeSubpaths }
  // } = nextConfig;

  return new NextI18Next({
    // localeSubpaths,
    otherLanguages: ['de'],
    localePath: path.resolve('./public/static/locales'),
    defaultLanguage: 'en',
    defaultNS: 'common'
  });
};

export const {
  appWithTranslation,
  useTranslation,
  withTranslation,
  i18n
} = getNextI18NextInstance(getConfig());

export const NextI18NextInstance = getNextI18NextInstance(getConfig());
