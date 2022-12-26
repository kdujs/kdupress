/* global KDUPRESS_VERSION, LAST_COMMIT_HASH*/

import { createApp } from './app'

window.__KDUPRESS__ = {
  version: KDUPRESS_VERSION,
  hash: LAST_COMMIT_HASH
}

createApp(false /* isServer */).then(({ app, router }) => {
  router.onReady(() => {
    app.$mount('#app')
  })
})
