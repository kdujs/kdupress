# Introduction

KduPress is composed of two parts: a [minimalistic static site generator](https://github.com/kdujs/kdupress/tree/main/packages/%40kdupress/core) with a Kdu-powered [theming system](../theme/README.md) and [Plugin API](../plugin/README.md), and a [default theme](../theme/default-theme-config.md) optimized for writing technical documentation. It was created to support the documentation needs of Kdu’s own sub projects.

Each page generated by KduPress has its own pre-rendered static HTML, providing great loading performance and is SEO-friendly. Yet, once the page is loaded, Kdu takes over the static content and turns it into a full Single-Page Application (SPA). Extra pages are fetched on demand as the user navigates around the site.

## How It Works

A KduPress site is in fact a SPA powered by [Kdu](http://kdu-js.web.app/), [Kdu Router](https://kdujs-router.web.app/) and [webpack](http://webpack.js.org/). If you’ve used Kdu before, you will notice the familiar development experience when you are writing or developing custom themes (you can even use Kdu DevTools to debug your custom theme!).

During the build, we create a server-rendered version of the app and render the corresponding HTML by virtually visiting each route. This approach is inspired by [Dorayaki](https://dorayakijs.web.app/)'s `dorayaki generate` command and other projects like [Gatsby](https://www.gatsbyjs.org/).

Each Markdown file is compiled into HTML with [markdown-it](https://github.com/markdown-it/markdown-it) and then processed as the template of a Kdu component. This allows you to directly use Kdu inside your Markdown files and is great when you need to embed dynamic content.

## Features

**Built-in Markdown extensions**

* [Table of Contents](../guide/markdown.md#table-of-contents)
* [Custom Containers](../guide/markdown.md#custom-containers)
* [Line Highlighting](../guide/markdown.md#line-highlighting-in-code-blocks)
* [Line Numbers](../guide/markdown.md#line-numbers)
* [Import Code Snippets](../guide/markdown.md#import-code-snippets)

**Using Kdu in Markdown**

* [Templating](../guide/using-kdu.md#templating)
* [Using Components](../guide/using-kdu.md#using-components)

**Kdu-powered custom theme system**

* [Metadata](../theme/writing-a-theme.md#site-and-page-metadata)
* [Content Excerpt](../theme/writing-a-theme.md#content-excerpt)

**Default theme**

* Responsive layout
* [Optional Homepage](../theme/default-theme-config.md#homepage)
* [Simple out-of-the-box header-based search](../theme/default-theme-config.md#built-in-search)
* [Algolia Search](../theme/default-theme-config.md#algolia-search)
* Customizable [navbar](../theme/default-theme-config.md#navbar) and [sidebar](../theme/default-theme-config.md#sidebar)
* [Auto-generated GitHub link and page edit links](../theme/default-theme-config.md#git-repo-and-edit-links)
* [PWA: Popup UI to refresh contents](../theme/default-theme-config.md#popup-ui-to-refresh-contents)
* [Last Updated](../theme/default-theme-config.md#last-updated)
* [Multi-Language Support](../guide/i18n.md)


**Plugin**

* [Powerful Plugin API](../plugin/README.md)
* [Search Plugin](../plugin/official/plugin-search.md)
* [PWA Plugin](../plugin/official/plugin-pwa.md)
* [Google Analytics Plugin](../plugin/official/plugin-google-analytics.md)
* ...

## Why Not ...?

### Dorayaki

Dorayaki is capable of doing what KduPress does, but it’s designed for building applications. KduPress is focused on content-centric static sites and provides features tailored for technical documentation out of the box.

### Docsify / Docute

Both are great projects and also Kdu-powered. Except they are both fully runtime-driven and therefore not SEO-friendly. If you don’t care for SEO and don’t want to mess with installing dependencies, these are still great choices.

### Hexo

Hexo has been serving the Kdu docs well - in fact, we are probably still a long way to go from migrating away from it for our main site. The biggest problem is that its theming system is static and string-based - we want to take advantage of Kdu for both the layout and the interactivity. Also, Hexo’s Markdown rendering isn’t the most flexible to configure.

### GitBook

We’ve been using GitBook for most of our sub project docs. The primary problem with GitBook is that its development reload performance is intolerable with a large amount of files. The default theme also has a pretty limiting navigation structure, and the theming system is, again, not Kdu based. The team behind GitBook is also more focused on turning it into a commercial product rather than an open-source tool.