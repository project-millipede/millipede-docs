import NextI18Next, { NextRuntimeConfig } from 'next-i18next-serverless';
import getConfig from 'next/config';

const getNextI18NextInstance = (nextConfig: NextRuntimeConfig) => {
  return new NextI18Next(nextConfig, {
    browserLanguageDetection: false,
    serverLanguageDetection: false,
    partialBundledLanguages: false,
    defaultLanguage: 'en',
    otherLanguages: ['de'],
    lng: 'en',
    allLanguages: ['en', 'de']
  });
};

export const {
  appWithTranslation,
  useTranslation,
  withTranslation,
  i18n
} = getNextI18NextInstance(getConfig());

export const NextI18NextInstance = getNextI18NextInstance(getConfig());
