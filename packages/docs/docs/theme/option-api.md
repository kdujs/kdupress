---
metaTitle: Configuration | Theme
---

# Theme Configuration

As with plugins, the theme configuration file `themeEntry` should export a `plain JavaScript object`(`#1`). If the plugin needs to take options, it can be a function that exports a plain object(`#2`). The function will be called with the `siteConfig.themeConfig` as the first argument, along with [ctx](../plugin/context-api.md) which provides some compile-time metadata.

``` js
// .kdupress/theme/index.js
// #1
module.exports = {
   // ...
}
```

``` js
// .kdupress/theme/index.js
// #2
module.exports = (themeConfig, ctx) => {
   return {
      // ...
   }
}
```


::: tip
1. You should see the difference between `themeEntry` and `themeConfig`, the former is a configuration for the theme itself, provided by KduPress. The latter is the user’s configuration for the theme, implemented by the used theme, for example [Default Theme Config](./default-theme-config.md).

2. Along with the options listed in this section, `themeEntry` also supports all [Option API](../plugin/option-api.md) and [Lifecycle](../plugin/life-cycle.md) supported by plugins.
:::

## plugins

- Type: `Array|Object`
- Default: undefined

**Also see:**

- [Plugin > Using a Plugin](../plugin/using-a-plugin.md).

---

::: warning
You probably don’t need to use following options tagged with <Badge text="Danger Zone" vertical="middle"/> unless you know what you are doing!
:::

## devTemplate <Badge text="Danger Zone"/>

- Type: `String`
- Default: undefined

HTML template path used in `dev` mode, default template see [here](https://github.com/kdujs/kdupress/blob/main/packages/%40kdupress/core/lib/client/index.dev.html)

## ssrTemplate <Badge text="Danger Zone"/>

- Type: `String`
- Default: undefined

HTML template path used in `build` mode, default template see [here](https://github.com/kdujs/kdupress/blob/main/packages/%40kdupress/core/lib/client/index.ssr.html)

## extend <Badge text="Danger Zone"/>

- Type: `String`
- Default: undefined

```js
// .kdupress/theme/index.js
module.exports = {
  extend: '@kdupress/theme-default'
}
```

KduPress provides the ability to inherit one theme from another. KduPress will follow the concept of `override` and automatically help you prioritize thematic attributes, for example styles and layout components.

**Also see:**

- [Theme Inheritance](./inheritance.md)
- [Design Concepts of KduPress 1.x](../miscellaneous/design-concepts.md)

## globalLayout <Badge text="Danger Zone"/>

- Type: `String`
- Default: undefined

```js
// .kdupress/theme/index.js
module.exports = {
  globalLayout: '/path/to/your/global/kdu/sfc'
}
```

Global layout component is a component responsible for the global layout strategy. The [default global layout](https://github.com/kdujs/kdupress/blob/main/packages/%40kdupress/core/lib/client/components/GlobalLayout.kdu) will help you render different layouts according to [$frontmatter.layout](../guide/frontmatter.md#layout), so in most cases you do not need to configure this option.

For example, when you want to set a global header and footer for your theme, you can do this:

```kdu
<!-- .kdupress/theme/layouts/GlobalLayout.kdu -->
<template>
  <div id="global-layout">
    <header><h1>Header</h1></header>
    <component :is="layout"/>
    <footer><h1>Footer</h1></footer>
  </div>
</template>

<script>
export default {
  computed: {
    layout () {
      if (this.$page.path) {
        if (this.$frontmatter.layout) {
          // You can also check whether layout exists first as the default global layout does.
          return this.$frontmatter.layout
        }
        return 'Layout'
      }
      return 'NotFound'
    }
  }
}
</script>
```
