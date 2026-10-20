+++
title = 'Getting Started with Sleeve'
date = 2026-01-10T09:00:00Z
tags = ['guide']
series = 'Sleeve Guide'
thumbnail = 'cover.png'
+++

Sleeve needs Hugo 0.161 or later and Node.js, because it builds its CSS with the Tailwind CSS CLI.

## Install

Add the theme as a Hugo Module, then install the npm packages it needs:

```sh
hugo mod init github.com/you/your-site
hugo mod get github.com/mmatokovic/sleeve
hugo mod npm pack
npm install
```

> [!TIP]
> Run `hugo server` and open the printed address to see your site with live reload.

## Configure

Copy the `[build]`, `[module]` and `[security]` sections from this demo's `hugo.toml`. Hugo does not read those settings from a theme, so every site has to set them itself.
