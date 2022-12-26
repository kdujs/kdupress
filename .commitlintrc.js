const fs = require('fs')
const path = require('path')

const KdupressPackages = fs.readdirSync(path.resolve(__dirname, 'packages/@kdupress'))

module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'cli',
        'vi',
        ...KdupressPackages
      ].map(name => `$${name}`)
    ]
  }
}
