# @kdupress/markdown

> markdown library for KduPress

## Public API

### PLUGINS

A map [constant](./lib/constant.js) containing the names of all built-in markdown-it plugins.

### isRequiredPlugin(pluginName: string)

- **Usage**:

```js
const { isRequiredPlugin } = require('@kdupress/markdown')
console.log(isRequiredPlugin(PLUGINS.COMPONENT)) // true
console.log(isRequiredPlugin(PLUGINS.HIGHLIGHT_LINES)) // false
```

### removePlugin(config: chainMarkdown, pluginName: string)

Remove the specified built-in markdown-it plugin in KduPress.

It's needed to use with KduPress's [Plugin API > chainMarkdown](https://kdupress.web.app/plugin/option-api.html#chainmarkdown).

- **Usage**:

```js
// Your KduPress Plugin or site config.
const { removePlugin } = require('@kdupress/markdown')
module.exports = {
  chainMarkdown (config) {
    removePlugin(config, PLUGINS.HIGHLIGHT_LINES)
  }
}
```

> Note that `PLUGINS.COMPONENT` and `PLUGINS.ANCHOR` are required in KduPress, It is forbidden to delete them!

### removeAllBuiltInPlugins(config: chainMarkdown)

Remove all built-in but not 100% necessary markdown-it plugins in KduPress.

- **Usage**:

```js
// Your KduPress Plugin or site config.
module.exports = {
  chainMarkdown (config) {
    require('@kdupress/markdown').removeAllBuiltInPlugins(config)
  }
}
```
