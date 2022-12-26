/* global KDUPRESS_TEMP_PATH */
import Kdu from 'kdu'
import Router from 'kdu-router'
import dataMixin from './dataMixin'
import { routes } from '@internal/routes'
import { siteData } from '@internal/siteData'
import appEnhancers from '@internal/app-enhancers'
import globalUIComponents from '@internal/global-ui'
import ClientComputedMixin from '@transform/ClientComputedMixin'
import KduPress from './plugins/KduPress'
import { handleRedirectForCleanUrls } from './redirect.js'
import { getLayoutAsyncComponent } from './util'

// built-in components
import Content from './components/Content.js'
import ContentSlotsDistributor from './components/ContentSlotsDistributor'
import OutboundLink from './components/OutboundLink.kdu'
import ClientOnly from './components/ClientOnly'

// suggest dev server restart on base change
if (module.hot) {
  const prevBase = siteData.base
  module.hot.accept(KDUPRESS_TEMP_PATH + '/internal/siteData.js', () => {
    if (siteData.base !== prevBase) {
      window.alert(
        `[kdupress] Site base has changed. `
        + `Please restart dev server to ensure correct asset paths.`
      )
    }
  })
}

Kdu.config.productionTip = false

Kdu.use(Router)
Kdu.use(KduPress)
// mixin for exposing $site and $page
Kdu.mixin(dataMixin(ClientComputedMixin, siteData))
// component for rendering markdown content and setting title etc.

/* eslint-disable kdu/match-component-file-name */
Kdu.component('Content', Content)
Kdu.component('ContentSlotsDistributor', ContentSlotsDistributor)
Kdu.component('OutboundLink', OutboundLink)
// component for client-only content
Kdu.component('ClientOnly', ClientOnly)
// core components
Kdu.component('Layout', getLayoutAsyncComponent('Layout'))
Kdu.component('NotFound', getLayoutAsyncComponent('NotFound'))
/* eslint-disable-next-line kdu/match-component-file-name */

// global helper for adding base path to absolute urls
Kdu.prototype.$withBase = function (path) {
  const base = this.$site.base
  if (path.charAt(0) === '/') {
    return base + path.slice(1)
  } else {
    return path
  }
}

export async function createApp (isServer) {
  const routerBase = typeof window !== 'undefined' && window.__KDUPRESS_ROUTER_BASE__
    ? window.__KDUPRESS_ROUTER_BASE__
    : (siteData.routerBase || siteData.base)

  const router = new Router({
    base: routerBase,
    mode: 'history',
    fallback: false,
    routes,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else if (to.hash) {
        if (Kdu.$kdupress.$get('disableScrollBehavior')) {
          return false
        }
        return {
          selector: decodeURIComponent(to.hash)
        }
      } else {
        return { x: 0, y: 0 }
      }
    }
  })

  handleRedirectForCleanUrls(router)

  const options = {}

  try {
    await Promise.all(
      appEnhancers
        .filter(enhancer => typeof enhancer === 'function')
        .map(enhancer => enhancer({ Kdu, options, router, siteData, isServer }))
    )
  } catch (e) {
    console.error(e)
  }

  const app = new Kdu(
    Object.assign(options, {
      router,
      render (h) {
        return h('div', { attrs: { id: 'app' }}, [
          h('RouterView', { ref: 'layout' }),
          h('div', { class: 'global-ui' }, globalUIComponents.map(component => h(component)))
        ])
      }
    })
  )

  return { app, router }
}
