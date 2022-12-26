module.exports = {
  root: true,

  extends: [
    'plugin:kdu-libs/recommended',
    'plugin:kdu/recommended'
  ],

  rules: {
    indent: ['error', 2, { MemberExpression: 'off' }],

    'no-undef': ['error'],

    'operator-linebreak': ['error', 'before'],

    'kdu/match-component-file-name': [
      'error',
      {
        extensions: ['js', 'kdu'],
        shouldMatchCase: false
      }
    ]
  },

  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended'
      ],
      parser: 'kdu-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        'no-useless-constructor': 'off'
      }
    },
    {
      files: [
        '**/__tests__/**/*.spec.js',
        '**/__tests__/**/*.spec.ts'
      ],
      extends: ['plugin:jest/recommended']
    }
  ]
}
