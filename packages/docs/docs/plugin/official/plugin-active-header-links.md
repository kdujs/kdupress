---
title: active-header-links
metaTitle: A plugin of automatically activating sidebar links when page scrolls | KduPress
---

# [@kdupress/plugin-active-header-links](https://github.com/kdujs/kdupress/tree/main/packages/%40kdupress/plugin-active-header-links)

> A plugin of automatically activating sidebar links when page scrolls

## Install

```bash
yarn add -D @kdupress/plugin-active-header-links
# OR npm install -D @kdupress/plugin-active-header-links
```

## Usage

```javascript
module.exports = {
  plugins: ['@kdupress/active-header-links']
}
```

### Passing Options

```javascript
module.exports = {
  plugins: ['@kdupress/active-header-links', {
    sidebarLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor'
  }]
}
```

## Options

### sidebarLinkSelector

- Type: `string`
- Default: `.sidebar-link`

### headerAnchorSelector

- Type: `string`
- Default: `.header-anchor`
