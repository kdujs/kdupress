# Plugin

Plugins generally add global-level functionality to KduPress. There is no strictly defined scope for a plugin.

## Examples

There are typically several types of plugins:

1. Extend the page’s metadata generated at compile time. For example [@kdupress/plugin-last-updated](./official/plugin-last-updated.md);
2. Generate extra files before or after compilation. For example [@kdupress/plugin-pwa](./official/plugin-pwa.md);
3. Inject global UI. For example [@kdupress/plugin-back-to-top](./official/plugin-back-to-top.md);

## Out of the Box

To keep things at a minimum, not all of the official plugins are shipped with KduPress. Here is the list of plugins that are pre-installed in the KduPress and the default theme, **plugins that are not in the list below need to be installed manually**(for example [@kdupress/plugin-back-to-top](./official/plugin-back-to-top.md)).

### Plugins that come with KduPress

- [@kdupress/plugin-last-updated](./official/plugin-last-updated.md)
- [@kdupress/plugin-register-components](./official/plugin-register-components.md)

### Plugins that come with the default theme

- [@kdupress/plugin-active-header-links](./official/plugin-active-header-links.md)
- [@kdupress/plugin-nprogress](./official/plugin-nprogress.md)
- [@kdupress/plugin-search](./official/plugin-search.md)

## Architecture

The architecture of the whole plugin system is as follows:

![Architecture of KduPress](/architecture.png)
