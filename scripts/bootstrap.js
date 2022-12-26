// create package.json and README for packages that don't have one yet

const fs = require('fs')
const { path } = require('@kdupress/shared-utils')
const baseVersion = require('../packages/@kdupress/core/package.json').version

const packagesDir = path.resolve(__dirname, '../packages/@kdupress')
const files = fs.readdirSync(packagesDir)

files.forEach(pkg => {
  if (pkg.charAt(0) === '.') return

  const isPlugin = /^plugin-/.test(pkg)
  const desc = isPlugin
    ? `${pkg.replace('plugin-', '')} plugin for kdupress`
    : `${pkg} for kdupress`

  const pkgPath = path.join(packagesDir, pkg, `package.json`)
  if (!fs.existsSync(pkgPath)) {
    const json = {
      'name': `@kdupress/${pkg}`,
      'version': baseVersion,
      'description': desc,
      'main': 'index.js',
      'publishConfig': {
        'access': 'public'
      },
      'repository': {
        'type': 'git',
        'url': 'git+https://github.com/kdujs/kdupress.git'
      },
      'keywords': [
        'documentation',
        'kdu',
        'kdupress',
        'generator'
      ],
      'author': 'NKDuy',
      'license': 'MIT',
      'bugs': {
        'url': 'https://github.com/kdujs/kdupress/issues'
      },
      'homepage': `https://github.com/kdujs/kdupress/blob/main/packages/@kdupress/${pkg}#readme`
    }
    fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2))
  }

  const readmePath = path.join(packagesDir, pkg, `README.md`)
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, `# @kdupress/${pkg}\n\n> ${desc}`)
  }

  const npmIgnorePath = path.join(packagesDir, pkg, `.npmignore`)
  if (!fs.existsSync(npmIgnorePath)) {
    fs.writeFileSync(npmIgnorePath, `__tests__\n__mocks__`)
  }
})
