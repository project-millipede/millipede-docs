module.exports = {
  env: {
    browser: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    './config/eslint/typescript.yml',
    './config/eslint/import.yml',
    './config/eslint/prettier.yml',
    './config/eslint/mdx.yml'
  ],
  rules: {
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['draftState']
      }
    ]
  }
};
