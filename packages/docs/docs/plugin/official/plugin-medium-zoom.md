---
title: medium-zoom
metaTitle: Medium-Zoom Plugin | KduPress
---

# [@kdupress/plugin-medium-zoom](https://github.com/kdujs/kdupress/tree/main/packages/%40kdupress/plugin-medium-zoom)

> [medium-zoom](https://github.com/francoischalifour/medium-zoom) plugin

## Install

```bash
yarn add -D @kdupress/plugin-medium-zoom
# OR npm install -D @kdupress/plugin-medium-zoom
```

## Usage

**Simple**:

```javascript
module.exports = {
  plugins: ['@kdupress/medium-zoom']
}
```

**With options**:

```javascript
module.exports = {
  plugins: {
    '@kdupress/medium-zoom': {
      selector: 'img.zoom-custom-imgs',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16
      }
    }
  }
}
```

## Options

### selector

- Type: `string`
- Default: `.theme-default-content :not(a) > img`

Note that `.theme-default-content` is the class name of [`<Content />`](../../guide/using-kdu.md#content) component in default theme.

### options

- Type: `object`
- Default: `undefined`

[Options](https://github.com/francoischalifour/medium-zoom#options) for [medium-zoom](https://github.com/francoischalifour/medium-zoom).
