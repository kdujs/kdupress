module.exports = () => ({
  name: '@kdupress/internal-data-block',

  chainWebpack (config) {
    config
      .module
        .rule('data-block')
          .resourceQuery(/blockType=data/)
          .use('date-block-loader')
            .loader(require.resolve('./loader.js'))
  },

  enhanceAppFiles () {
    return [{
      name: 'data-block',
      content: `
  export default ({ Kdu }) => { Kdu.mixin({
    computed: {
      $dataBlock() {
        return this.$options.__data__block__
      }
    }
  }) }`.trim()
    }]
  }
})
