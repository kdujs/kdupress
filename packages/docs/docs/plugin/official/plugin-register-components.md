---
title: register-components
metaTitle: Register Components Plugin | KduPress
---

# [@kdupress/plugin-register-components](https://github.com/kdujs/kdupress/tree/main/packages/%40kdupress/plugin-register-components)

> register-components plugin for KduPress

## Install

```bash
yarn add -D @kdupress/plugin-register-components
# OR npm install -D @kdupress/plugin-register-components
```

## Usage

```javascript
module.exports = {
  plugins: ['@kdupress/register-components']
}
```

## Options

### componentsDir

- Type: `Array | String`
- Default: `[]`

All components in this directory will be registered as global components, naming of components will follow the components found in [.kdupress/components](https://kdupress.web.app/guide/using-kdu.html#using-components).

``` js
module.exports = {
  plugins: [
    [
      'register-components',
      {
        componentsDir: somepath
      }
    ]
  ]
}
```

### components

- Type: `{ name: string, path: string }`
- Default: `[]`

Register global components by explicit name and path.

``` js
module.exports = {
  plugins: [
    [
      'register-components',
      {
        components: [
          {
            name: 'K-Card',
            path: 'path/to/card.kdu'
          }
        ]
      }
    ]
  ]
}
```

### getComponentName

- Type: `(file: string) => string`
- Default: `file => file.replace(/\/|\\/g, '-')`

Customize component names for files under `componentsDir`.
