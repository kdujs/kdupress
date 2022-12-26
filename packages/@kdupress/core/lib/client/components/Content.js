import Kdu from 'kdu'
import { setGlobalInfo, getPageAsyncComponent } from '@app/util'

export default {
  props: {
    pageKey: String,
    slotKey: {
      type: String,
      default: 'default'
    }
  },
  render (h) {
    const pageKey = this.pageKey || this.$parent.$page.key
    setGlobalInfo('pageKey', pageKey)

    /**
     * This is for use cases that render `<Content />`
     * with dynamic pageKey from current $page.
     */
    if (!Kdu.component(pageKey)) {
      Kdu.component(pageKey, getPageAsyncComponent(pageKey))
    }

    if (Kdu.component(pageKey)) {
      return h(pageKey)
    }
    return h('')
  }
}
