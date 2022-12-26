'use strict'

/**
 * Module dependencies.
 */

const { fs, path, logger, env } = require('@kdupress/shared-utils')

/**
 * Expose createBaseConfig method.
 */

module.exports = function createBaseConfig (context, isServer) {
  const {
    siteConfig,
    sourceDir,
    outDir,
    base: publicPath,
    markdown,
    tempPath,
    cacheDirectory,
    cacheIdentifier,
    options: {
      cache
    },
    pluginAPI
  } = context

  const Config = require('webpack-chain')
  const { KduLoaderPlugin } = require('kdu-loader')
  const CSSExtractPlugin = require('mini-css-extract-plugin')

  const isProd = process.env.NODE_ENV === 'production'
  const inlineLimit = 10000

  const config = new Config()
  const extractHeaders = siteConfig.markdown && siteConfig.markdown.extractHeaders

  config
    .mode(isProd && !env.isDebug ? 'production' : 'development')
    .output
      .path(outDir)
      .filename(isProd ? 'assets/js/[name].[chunkhash:8].js' : 'assets/js/[name].js')
      .publicPath(publicPath)

  if (env.isDebug) {
    config.devtool('source-map')
  } else if (!isProd) {
    config.devtool('cheap-module-eval-source-map')
  }

  const modulePaths = getModulePaths()
  const clientDir = context.getLibFilePath('client')

  config.resolve
    .set('symlinks', true)
    .alias
      .set('@source', sourceDir)
      .set('@client', clientDir)
      .set('@app', clientDir)
      .set('@temp', tempPath)
      .set('@dynamic', path.resolve(tempPath, 'dynamic'))
      .set('@internal', path.resolve(tempPath, 'internal'))
      .end()
    .extensions
      .merge(['.js', '.jsx', '.kdu', '.json', '.styl'])
      .end()
    .modules
      .merge(modulePaths)

  config.resolveLoader
    .set('symlinks', true)
    .modules
      .merge(modulePaths)

  config.module
    .noParse(/^(kdu|kdu-router|kdux|kdux-router-sync)$/)

  if (cache === false) {
    logger.tip('Clean cache...\n')
    fs.emptyDirSync(cacheDirectory)
  }

  const finalCacheIdentifier = cacheIdentifier + `isServer:${isServer}`

  function applyKduPipeline (rule) {
    rule
      .use('cache-loader')
        .loader('cache-loader')
        .options({
          cacheDirectory,
          cacheIdentifier: finalCacheIdentifier
        })

    rule
      .use('kdu-loader')
        .loader('kdu-loader')
        .options({
          compilerOptions: {
            preserveWhitespace: true
          },
          cacheDirectory,
          cacheIdentifier: finalCacheIdentifier
        })
  }

  const kduRule = config.module
    .rule('kdu')
      .test(/\.kdu$/)

  applyKduPipeline(kduRule)

  const mdRule = config.module
    .rule('markdown')
      .test(/\.md$/)

  applyKduPipeline(mdRule)

  mdRule
    .use('markdown-loader')
      .loader(require.resolve('@kdupress/markdown-loader'))
      .options({ sourceDir, markdown, extractHeaders })

  config.module
    .rule('pug')
    .test(/\.pug$/)
    .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end()

  const everblue = typeof siteConfig.everblue === 'function'
    ? siteConfig.everblue()
    : siteConfig.everblue
  if (!everblue) {
    const libDir = path.join(__dirname, '..')
    config.module
      .rule('js')
        .test(/\.jsx?$/)
        .exclude.add(filePath => {
          // transpile lib directory
          if (filePath.startsWith(libDir)) {
            return false
          }

          // transpile js in kdu files and md files
          if (/\.(kdu|md)\.js$/.test(filePath)) {
            return false
          }

          // transpile all core packages and kdupress related packages.
          // i.e.
          // @kdupress/*
          // kdupress-*
          if (/(@kdupress[\/\\][^\/\\]*|kdupress-[^\/\\]*)[\/\\](?!node_modules).*\.js$/.test(filePath)) {
            return false
          }

          // transpile @babel/runtime until fix for babel/babel#7597 is released
          if (filePath.includes(path.join('@babel', 'runtime'))) {
            return false
          }

          // don't transpile node_modules
          return /node_modules/.test(filePath)
        }).end()
        .use('cache-loader')
          .loader('cache-loader')
          .options({
            cacheDirectory,
            cacheIdentifier: finalCacheIdentifier
          })
          .end()
        .use('babel-loader')
          .loader('babel-loader')
          .options({
            // do not pick local project babel config (.babelrc)
            babelrc: false,
            // do not pick local project babel config (babel.config.js)
            // ref: http://babeljs.io/docs/en/config-files
            configFile: false,
            presets: [
              [require.resolve('@kdujs/babel-preset-app'), {
                entryFiles: [
                  path.resolve(__dirname, '../../client', isServer ? 'serverEntry.js' : 'clientEntry.js')
                ]
              }]
            ]
          })
  }

  config.module
    .rule('images')
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('url-loader')
        .loader('url-loader')
        .options({
          limit: inlineLimit,
          name: `assets/img/[name].[hash:8].[ext]`
        })

  // do not base64-inline SVGs.
  // https://github.com/facebookincubator/create-react-app/pull/1180
  config.module
    .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options({
          name: `assets/img/[name].[hash:8].[ext]`
        })

  config.module
    .rule('media')
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('url-loader')
        .loader('url-loader')
        .options({
          limit: inlineLimit,
          name: `assets/media/[name].[hash:8].[ext]`
        })

  config.module
    .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url-loader')
        .loader('url-loader')
        .options({
          limit: inlineLimit,
          name: `assets/fonts/[name].[hash:8].[ext]`
        })

  function createCSSRule (lang, test, loader, options) {
    const baseRule = config.module.rule(lang).test(test).sideEffects(true)
    const modulesRule = baseRule.oneOf('modules').resourceQuery(/module/)
    const normalRule = baseRule.oneOf('normal')

    applyLoaders(modulesRule, true)
    applyLoaders(normalRule, false)

    function applyLoaders (rule, modules) {
      if (!isServer) {
        if (isProd) {
          rule.use('extract-css-loader').loader(CSSExtractPlugin.loader)
        } else {
          rule.use('kdu-style-loader').loader('kdu-style-loader')
        }
      }

      rule.use('css-loader')
        .loader('css-loader')
        .options({
          modules,
          localIdentName: `[local]_[hash:base64:8]`,
          importLoaders: 1,
          sourceMap: !isProd,
          exportOnlyLocals: isServer
        })

      rule.use('postcss-loader').loader('postcss-loader').options(Object.assign({
        plugins: [require('autoprefixer')],
        sourceMap: !isProd
      }, siteConfig.postcss))

      if (loader) {
        rule.use(loader).loader(loader).options(options)
      }
    }
  }

  createCSSRule('css', /\.css$/)
  createCSSRule('postcss', /\.p(ost)?css$/)
  createCSSRule('scss', /\.scss$/, 'sass-loader', siteConfig.scss)
  createCSSRule('sass', /\.sass$/, 'sass-loader', Object.assign({ indentedSyntax: true }, siteConfig.sass))
  createCSSRule('less', /\.less$/, 'less-loader', siteConfig.less)
  createCSSRule('stylus', /\.styl(us)?$/, 'stylus-loader', Object.assign({
    preferPathResolver: 'webpack'
  }, siteConfig.stylus))

  config
    .plugin('kdu-loader')
    .use(KduLoaderPlugin)

  if (isProd && !isServer) {
    config
      .plugin('extract-css')
      .use(CSSExtractPlugin, [{
        filename: 'assets/css/styles.[chunkhash:8].css'
      }])

    // ensure all css are extracted together.
    // since most of the CSS will be from the theme and very little
    // CSS will be from async chunks
    config.optimization.splitChunks({
      cacheGroups: {
        styles: {
          name: 'styles',
          // necessary to ensure async chunks are also extracted
          test: m => {
            return /css\/mini-extract/.test(m.type)
          },
          chunks: 'all',
          enforce: true
        }
      }
    })
  }

  // inject constants
  config
    .plugin('injections')
    .use(require('webpack/lib/DefinePlugin'), [{
      KDUPRESS_VERSION: JSON.stringify(require('../../../package.json').version),
      KDUPRESS_TEMP_PATH: JSON.stringify(tempPath),
      LAST_COMMIT_HASH: JSON.stringify(getLastCommitHash())
    }])

  pluginAPI.applySyncOption('define', config)
  pluginAPI.applySyncOption('alias', config)

  return config
}

function getLastCommitHash () {
  const spawn = require('cross-spawn')
  let hash
  try {
    hash = spawn.sync('git', ['log', '-1', '--format=%h']).stdout.toString('utf-8').trim()
  } catch (error) {}
  return hash
}

function getModulePaths () {
  return module.paths.concat([path.resolve(process.cwd(), 'node_modules')])
}
