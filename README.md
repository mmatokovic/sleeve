# Sleeve - Hugo Theme

`Sleeve` is a minimalist and responsive theme for [Hugo](https://gohugo.io/), designed to create fast, clean, and aesthetically pleasing websites. Whether you're building a personal blog, a portfolio, or a simple project site, Sleeve offers the flexibility and features you need.

## Features

- **Minimal Design**: Focus on content with a clean layout.
- **Responsive**: Fully responsive and works seamlessly across devices.
- **Customizable**: Easy to adjust styles and settings for your project.
- **Fast Performance**: Optimized for speed and SEO.
- **Simple Setup**: Just add the theme and start writing!

## Installation

To install Sleeve as your default theme, first install this repository in the themes/ directory:

```bash
git clone https://github.com/mmatokovic/sleeve.git themes/sleeve
```

Include the dependencies defined in package.hugo.json from modules and themes

```bash
hugo mod npm pack
```

Then install or update the all required dependencies.

```bash
npm install
npm update
```

Add the theme directly to your site configuration file `hugo.toml`:

```toml
theme: sleeve
```

## Updating

From the root of your site:

```bash
git submodule update --remote --merge
```

## Uses

When you wanna create a new content, Hugo evaluates the template actions within the archetype. For example:

```bash
hugo new content posts/my-first-post.md
```

Use the --kind command line flag to specify an alternate archetype when creating content: `hugo new content --kind tutorials articles/something.md`

## License

[MIT license](LICENSE) © Mislav Matoković

## Author Information

[Mislav Matoković](https://github.com/mmatokovic)
