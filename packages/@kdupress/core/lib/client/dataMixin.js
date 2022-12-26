/* global KDUPRESS_TEMP_PATH */

import GLobalKdu from 'kdu'

export default function dataMixin (I18n, siteData, Kdu = GLobalKdu) {
  prepare(siteData)
  Kdu.$kdupress.$set('siteData', siteData)

  if (module.hot) {
    module.hot.accept(KDUPRESS_TEMP_PATH + '/internal/siteData.js', () => {
      prepare(siteData)
      Kdu.$kdupress.$set('siteData', siteData)
    })
  }

  const I18nConstructor = I18n(Kdu.$kdupress.$get('siteData'))
  const i18n = new I18nConstructor()
  const descriptors = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(i18n))
  const computed = {}
  Object.keys(descriptors).reduce((computed, key) => {
    if (key.startsWith('$')) {
      computed[key] = descriptors[key].get
    }
    return computed
  }, computed)

  return { computed }
}

function prepare (siteData) {
  if (siteData.locales) {
    Object.keys(siteData.locales).forEach(path => {
      siteData.locales[path].path = path
    })
  }
  Object.freeze(siteData)
}
