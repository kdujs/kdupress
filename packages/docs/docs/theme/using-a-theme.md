# Using a theme

Using a theme is almost the same as using a plugin.

## Using a theme from a dependency

Themes can be published on npm in raw Kdu SFC format as `kdupress-theme-xxx`.

``` js
// .kdupress/config.js
module.exports = {
  theme: 'kdupress-theme-xx'
}
```

## Theme Shorthand

If you prefix the theme with `kdupress-theme-`, you can use a shorthand to leave out that prefix:

``` js
// .kdupress/config.js
module.exports = {
  theme: 'xxx'
}
```

Same with:

``` js
// .kdupress/config.js
module.exports = {
  theme: 'kdupress-theme-xxx'
}
```

This also works with [Scoped Packages](https://docs.npmjs.com/misc/scope):

``` js
// .kdupress/config.js
module.exports = {
  theme: '@org/kdupress-theme-xxx', // or an official theme: '@kdupress/theme-xxx'
}
```

Shorthand:

``` js
// .kdupress/config.js
module.exports = {
  theme: '@org/xxx', // or an official theme: '@kdupress/xxx'
}
```

::: warning Note
The theme whose name starts with `@kdupress/theme-` is an officially maintained theme.
:::
