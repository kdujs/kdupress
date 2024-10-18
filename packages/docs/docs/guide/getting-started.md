# Getting Started

## Prerequisites

- [Node.js 10+](https://nodejs.org/en/)
- [Yarn Classic](https://classic.yarnpkg.com/en/) (Optional)\*

\* _If your project is using webpack 3.x, you may notice some installation issues with `npm`. In this case, we recommend using Yarn._

## Quick Start

The fastest way to get your KduPress project set up is to use our [create-kdupress-site generator](https://github.com/kdupressjs/create-kdupress-site/), which will help scaffold the basic KduPress site structure for you.

To use it, open up your terminal in the desired directory and run the following command:

<code-group>
<code-block title="YARN" active>
```bash
yarn create kdupress-site [optionalDirectoryName]
```
</code-block>

<code-block title="NPM">
```bash
npx create-kdupress-site [optionalDirectoryName]
```
</code-block>
</code-group>

The command will interactively ask for details to configure your KduPress site’s metadata such as:

- Project Name
- Description
- Maintainer Email
- Maintainer Name
- Repository URL

Once this done, a scaffolded documentation site will be created in the `docs` directory (or custom directory name, if passed) under the current directory.

To see it in action, navigate into newly scaffolded directory, install the dependencies and start the local server:

<code-group>
<code-block title="YARN" active>
```bash
cd docs
yarn install
yarn dev
```
</code-block>

<code-block title="NPM">
```bash
cd docs
npm install
npm run dev
```
</code-block>
</code-group>

## Manual Installation

If you prefer, you can build a basic KduPress documentation site from ground up instead of using the generator mentioned above.

Note: If you already have an existing project and would like to keep documentation inside the project, start from Step 3.

1. Create and change into a new directory

   ```bash
   mkdir kdupress-starter && cd kdupress-starter
   ```

2. Initialize with your preferred package manager

   <code-group>
   <code-block title="YARN" active>
    ```bash
    yarn init
    ```
   </code-block>

   <code-block title="NPM">
   ```bash
   npm init
   ```
   </code-block>
   </code-group>

3. Install KduPress locally

   <code-group>
   <code-block title="YARN" active>
   ```bash
   yarn add -D kdupress
   ```
   </code-block>

   <code-block title="NPM">
   ```bash
   npm install -D kdupress
   ```
   </code-block>
   </code-group>

4. Create your first document

   ```bash
   mkdir docs && echo '# Hello KduPress' > docs/README.md
   ```

5. Add helper [scripts](https://classic.yarnpkg.com/en/docs/package-json#toc-scripts) to `package.json`

   This step is optional but highly recommended, as the rest of the documentation will assume those scripts being present.

   ```json
   {
     "scripts": {
       "docs:dev": "kdupress dev docs",
       "docs:build": "kdupress build docs"
     }
   }
   ```

6. Serve the documentation site in the local server

   <code-group>
   <code-block title="YARN" active>
   ```bash
   yarn docs:dev
   ```
   </code-block>

   <code-block title="NPM">
   ```bash
   npm run docs:dev
   ```
   </code-block>
   </code-group>

   KduPress will start a hot-reloading development server at [http://localhost:8080](http://localhost:8080).

By now, you should have a basic but functional KduPress documentation site. Next, learn about KduPress’ recommended [directory structure](directory-structure.html) and the basics of [configuration](basic-config.html) in KduPress.

Once you’re familiar with those concepts mentioned above, learn how to enrich your content with [static assets](assets.html), [Markdown extensions](markdown.html) and [kdu components](using-kdu.html).

And when your documentation site starts to take shape, be sure to read about [multi-language support](i18n.html) and the [deployment guide](deploy.html).
