const { join } = require('path')
const { readdirSync } = require('fs')
const chalk = require('chalk')
const execa = require('execa')

const PRIVATE_PACKAGES = ['theme-kdu', '.DS_Store']

const scopePackages = readdirSync(
  join(__dirname, '../packages/@kdupress')
)
  .filter(n => !PRIVATE_PACKAGES.includes(n))
  .map(n => `@kdupress/${n}`)

async function log () {
  await Promise.all(['kdupress', ...scopePackages].map(async pkg => {
    const version = (await execa('npm', ['view', `${pkg}@next`, 'version'])).stdout.toString()
    console.log(`${pkg}: ${chalk.cyan(version)}`)
  }))
}

log()
