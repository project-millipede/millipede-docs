const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1'
      },
      corejs: '3',
      useBuiltIns: 'usage'
    }
  ],
  ['@babel/preset-react']
];
const plugins = [
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-object-rest-spread'
];

module.exports = { sourceType: 'unambiguous', presets, plugins };
