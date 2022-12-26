/* global SW_BASE_URL, SW_ENABLED, GA_ID, ga, SW_UPDATE_POPUP, SW_POPUP_COMPONENT */

import Kdu from 'kdu'
import SWUpdateEvent from './SWUpdateEvent'
import event from './event'

if (SW_UPDATE_POPUP && SW_POPUP_COMPONENT === 'SWUpdatePopup') {
  // eslint-disable-next-line kdu/match-component-file-name
  Kdu.component('SWUpdatePopup', () => import('./SWUpdatePopup.kdu'))
}

export default async ({ router, isServer }) => {
  if (process.env.NODE_ENV === 'production' && !isServer && SW_ENABLED) {
    // register-service-worker@1.7.0 references `window` in outer scope, so we have to import it dynamically in client
    const { register } = await import('register-service-worker')

    // Register service worker
    router.onReady(() => {
      register(`${SW_BASE_URL}service-worker.js`, {
        registrationOptions: {},
        ready () {
          console.log('[kdupress:sw] Service worker is active.')
          event.$emit('sw-ready')
        },

        cached (registration) {
          console.log('[kdupress:sw] Content has been cached for offline use.')
          event.$emit('sw-cached', new SWUpdateEvent(registration))
        },

        updated (registration) {
          console.log('[kdupress:sw] Content updated.')
          event.$emit('sw-updated', new SWUpdateEvent(registration))
        },

        offline () {
          console.log('[kdupress:sw] No internet connection found. App is running in offline mode.')
          event.$emit('sw-offline')
        },

        error (err) {
          console.error('[kdupress:sw] Error during service worker registration:', err)
          event.$emit('sw-error', err)
          if (GA_ID) {
            ga('send', 'exception', {
              exDescription: err.message,
              exFatal: false
            })
          }
        }
      })
    })
  }
}
