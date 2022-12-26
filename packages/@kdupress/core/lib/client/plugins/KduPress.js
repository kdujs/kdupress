import Store from './Store'
import {
  getPageAsyncComponent,
  getLayoutAsyncComponent,
  getAsyncComponent,
  getKduComponent
} from '../util'

class KduPress extends Store {}

Object.assign(KduPress.prototype, {
  getPageAsyncComponent,
  getLayoutAsyncComponent,
  getAsyncComponent,
  getKduComponent
})

export default {
  install (Kdu) {
    const ins = new KduPress()
    Kdu.$kdupress = ins
    Kdu.prototype.$kdupress = ins
  }
}
