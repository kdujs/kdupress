'use strict'

const { path, chalk, fs, logger } = require('@kdupress/shared-utils')

const EXCLUDED_FILES = [
  '__tests__',
  '.npmignore',
  'package.json',
  'node_modules',
  'README.md'
]

module.exports = async (dir) => {
  try {
    require.resolve('@kdupress/theme-default')
  } catch (err) {
    console.log(chalk.red(`\n[kdupress] cannot find '@kdupress/theme-default'\n`))
    process.exit(1)
  }
  const source = require.resolve('@kdupress/theme-default')
  logger.debug('entry', chalk.cyan(source))

  const sourceDir = path.parse(source).dir
  const targetDir = path.resolve(dir, '.kdupress/theme')
  logger.debug('sourceDir', chalk.cyan(sourceDir))
  logger.debug('targetDir', chalk.cyan(targetDir))

  await fs.copy(sourceDir, targetDir, {
    filter: src => {
      const relative = path.relative(sourceDir, src)
      if (EXCLUDED_FILES.includes(relative)) {
        return false
      }
      if (relative) {
        logger.debug('Copied', chalk.cyan(relative))
      }
      return true
    }
  })
  logger.success(`Copied default theme into ${chalk.cyan(targetDir)}.\n`)
}
