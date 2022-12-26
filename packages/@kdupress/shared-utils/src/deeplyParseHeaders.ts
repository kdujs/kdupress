import compose from './compose'
import parseHeaders from './parseHeaders'
import removeNonCodeWrappedHTML from './removeNonCodeWrappedHTML'

// Also clean the html that isn't wrapped by code.
// Because we want to support using KDU components in headers.
// e.g. https://kdupress.web.app/guide/using-kdu.html#badge
export = compose(
  removeNonCodeWrappedHTML,
  parseHeaders
)

