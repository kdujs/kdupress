---
title: nprogress
metaTitle: Nprogress Plugin | KduPress
---

# [@kdupress/plugin-nprogress](https://github.com/kdujs/kdupress/tree/main/packages/%40kdupress/plugin-nprogress)

> A progress bar plugin based on [nprogress](https://github.com/rstacruz/nprogress).

## Install

```bash
yarn add -D @kdupress/plugin-nprogress
# OR npm install -D @kdupress/plugin-nprogress
```

## Usage

```javascript
module.exports = {
  plugins: ['@kdupress/nprogress']
}
```

## Custom color

Set `$nprogressColor` in your __site__ or __theme__ `palette.styl` file to change the color of the progress bar (default is `$accentColor`).

```stylus
// .kdupress/styles/palette.styl
// or
// .kdupress/theme/styles/palette.styl

$nprogressColor = red
```

__Also see:__

- [Config Reference > Styling](../../config/README.md#styling)
