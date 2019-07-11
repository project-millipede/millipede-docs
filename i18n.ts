import NextI18Next from 'next-i18next';

// import getConfig from 'next-server/config';

// const { publicRuntimeConfig } = getConfig();
// const { localeSubpaths } = publicRuntimeConfig;

// const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
// const NextI18Next = require('next-i18next/dist/commonjs').default

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['de'],
  // localeSubpaths // locale subpaths for url could be none, foreign or all
  localeSubpaths: 'all'
});

export default NextI18NextInstance;

/* Optionally, export class methods as named exports */
export const { appWithTranslation, withTranslation } = NextI18NextInstance;

// const base = [
//   'navbar',
//   'provider_selection',
//   'auth',
//   'local_wallet_creation',
//   'lwmodals',
//   'address',
//   'messages'
// ];

// export const namespaces = {
//   '/': base,
//   '/marketplace': base.concat(['marketplace']),
//   '/account': base.concat(['account', 'tickets']),
//   '/_error': base,
//   '/events': base.concat(['event_creation', 'minters', 'marketers', 'approvers', 'events']),
//   '/event': base.concat(['event_creation', 'minters', 'marketers', 'approvers', 'events']),
//   '/ticket': base.concat(['events'])
// };
