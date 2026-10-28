# Sleeve

A minimal, fast and accessible blog theme for [Hugo](https://gohugo.io/), built with Tailwind CSS v4.

Live site: [misli.mmatokovic.dev](https://misli.mmatokovic.dev)

## Features

- Light and dark mode that follows the system setting, with a toggle that remembers the visitor's choice
- Multilingual: every theme string is translated (English and Croatian included)
- Responsive WebP images with `srcset`, generated from page bundle images
- Standalone images get a tiny blurred placeholder and open in a lightbox with keyboard, swipe and previous/next navigation
- Post cards with thumbnails, tags, series and reading time
- Post search on list pages that covers every page of the list and ignores case and diacritics
- Series navigation, previous/next links and related posts
- Table of contents with the current section highlighted
- GitHub-style alerts (`> [!NOTE]`), responsive tables and math rendered to MathML at build time
- JSON-LD, Open Graph and Twitter cards, with the post thumbnail as the share image
- Contact form for Netlify Forms or any form backend
- Optional Turbo for instant page loads
- Accessible: skip link, landmarks, labelled icons and keyboard-friendly navigation

## Requirements

- Hugo **0.161.0** or later
- Node.js and npm (or pnpm), for the Tailwind CSS CLI
- Go, if you install the theme as a Hugo Module

## Installation

### As a Hugo Module (recommended)

```sh
hugo mod init github.com/<you>/<your-site>
```

In `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = 'github.com/mmatokovic/sleeve'
```

Then fetch the theme and its npm packages:

```sh
hugo mod get github.com/mmatokovic/sleeve@latest
hugo mod npm pack
npm install
```

`hugo mod npm pack` copies the theme's npm packages from its `package.json` into `packages/hugoautogen/package.json` and adds that folder to your `package.json` as an npm workspace. Run it again after updating the theme.

Update later with `hugo mod get -u github.com/mmatokovic/sleeve`.

### As a Git submodule

```sh
git submodule add https://github.com/mmatokovic/sleeve.git themes/sleeve
```

Set `theme = 'sleeve'` in `hugo.toml`, then run `hugo mod npm pack` and `npm install`.

## Required site configuration

Hugo does not read `build` or `security` settings from a theme, so your site has to set them for the Tailwind CSS build:

```toml
[module]
  [[module.mounts]]
    source = 'assets'
    target = 'assets'
  [[module.mounts]]
    disableWatch = true
    source = 'hugo_stats.json'
    target = 'assets/notwatching/hugo_stats.json'

[build]
  [build.buildStats]
    enable = true
  [[build.cachebusters]]
    source = 'assets/notwatching/hugo_stats\.json'
    target = 'css'
  [[build.cachebusters]]
    source = 'layouts/.*'
    target = 'css'

[security]
  [security.exec]
    allow = ['^(dart-)?sass$', '^go$', '^git$', '^node$', '^postcss$', '^tailwindcss$']
  [security.node.permissions]
    allowAddons = ['tailwindcss']
    allowWorker = ['tailwindcss']
```

Add `hugo_stats.json`, `node_modules/` and `resources/` to `.gitignore`.

If you use pnpm, add `nodeLinker: hoisted` to `pnpm-workspace.yaml` so Hugo can find the Tailwind CLI.

## Parameters

All parameters are optional.

```toml
titleCaseStyle = 'firstupper'      # recommended for non-English sites

[params]
  description = 'Shown in search results and link previews'
  intro = 'One line under the home page heading. Markdown allowed.'
  turbo = true                     # instant page navigation
  darkMode = true                  # set to false to remove the toggle
  favicon = 'favicon.ico'          # paths relative to static/
  appleTouchIcon = 'apple-touch-icon.png'
  manifest = 'site.webmanifest'
  logo = 'images/logo.png'         # used in JSON-LD
  [params.author]
    name = 'Jane Doe'
    email = 'jane@example.org'
  [params.copyright]               # optional footer link, defaults to the author name
    name = 'janedoe'
    url = 'https://github.com/janedoe'
  [params.license]
    name = 'CC BY 4.0'
    url = 'https://creativecommons.org/licenses/by/4.0/'
  [params.contact]
    provider = 'netlify'           # adds Netlify Forms attributes
    action = ''                    # or a form backend URL, e.g. Formspree
```

On a multilingual site, put `description` and `intro` under `[languages.<code>.params]`.

### Taxonomies

The theme uses `tags` and `series`, and `genres` for book reviews:

```toml
[taxonomies]
  tag = 'tags'
  series = 'series'
  genre = 'genres'
```

### Math

Fenced ` ```math ` blocks work out of the box. For `\( … \)` and `$$ … $$` in text, enable the passthrough extension:

```toml
[markup.goldmark.extensions.passthrough]
  enable = true
  [markup.goldmark.extensions.passthrough.delimiters]
    block = [['\[', '\]'], ['$$', '$$']]
    inline = [['\(', '\)']]
```

## Front matter

```toml
+++
title = 'My post'
date = 2026-01-10T09:00:00Z
tags = ['guide']
series = 'Getting started'
thumbnail = 'cover.jpg'            # an image in the page bundle
description = 'Optional summary for search results'
+++
```

Pages with `type = 'miscellaneous'` (for example About and Contact) use a simple full-width layout.

## Shortcodes

| Shortcode | Example |
| --- | --- |
| `contact` | `{{< contact >}}` |
| `details` | `{{< details title="More" closed="true" >}}…{{< /details >}}` |
| `img` | `{{< img "photo.jpg" "resize 800x webp" >}}Caption{{< /img >}}` |
| `audio` | `{{< audio src="talk.mp3" caption="A talk" >}}` |
| `file` | `{{< file "document.pdf" "Document title" >}}` |
| `icon` | `{{< icon "github" >}}` |

## Customising

- **Strings:** add `i18n/<lang>.toml` to your site with the keys you want to change.
- **Hooks:** override `layouts/_partials/hooks/head-end.html` or `layouts/_partials/hooks/body-end.html` in your site to add scripts or tags.
- **Any template:** copy it from the theme into the same path in your site's `layouts/`.

## Example site

```sh
cd exampleSite
hugo mod npm pack
npm install
hugo server
```

## License

[MIT](LICENSE) © Mislav Matoković
