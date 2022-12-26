# @kdupress/markdown-loader

> markdown-loader for KduPress

## Usage

```js
const rule = config.module
    .rule('markdown')
      .test(/\.md$/)

rule
  .use('kdu-loader')
    .loader('kdu-loader')
    .options({ /* ... */ })

rule
  .use('markdown-loader')
    .loader(require.resolve('@kdupress/markdown-loader'))
    .options({
       markdown: /* instance created by @kdupress/markdown */,
       sourceDir: /* root source directory of your docs */,
    })
```
