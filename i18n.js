module.exports = {
  locales: ['en', 'de'],
  defaultLocale: 'en',
  loader: false,
  pages: {
    '*': ['common', 'pages/topics/index'],
    '/': [
      'pages/topics/index',
      'pages/pet/intro/feature/index',
      'pages/pet/intro/target-group/index',
      'pages/pidp/intro/feature/index',
      'pages/pidp/intro/target-group/index',
      'pages/ai/intro/feature/index',
      'pages/ai/intro/target-group/index',
      'intro'
    ],
    '/ai': ['pages/perspective/index'],
    '/perspective/strategy': ['pages/perspective/index'],
    '/guides/disinformation/general': [
      'pages/guides/disinformation/general/index'
    ],
    '/guides/research/paper': ['pages/guides/research/paper/index'],
    '/rethink-security/attack-vectors/comparison': [
      'pages/rethink-security/attack-vectors/comparison/index'
    ],
    '/pidp/use-case/recognition': ['pages/pidp/use-case/recognition/index'],
    '/pidp/approach/by-example': ['pages/pidp/approach/by-example/index'],
    '/pet/dataflow/comparison': ['pages/pet/dataflow/comparison/index'],
    '/ai/general': ['pages/ai/general/index'],
    '/ai/reverse': ['pages/ai/reverse/index'],
    '/ai/reverse/hooks': ['pages/ai/index']
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./locales/${locale}/${namespace}`).then(m => m.default)
};
