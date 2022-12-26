import Kdu from 'kdu'

export default class Store {
  constructor () {
    this.store = new Kdu({
      data: {
        state: {}
      }
    })
  }

  $get (key) {
    return this.store.state[key]
  }

  $set (key, value) {
    Kdu.set(this.store.state, key, value)
  }

  $emit (...args) {
    this.store.$emit(...args)
  }

  $on (...args) {
    this.store.$on(...args)
  }
}
