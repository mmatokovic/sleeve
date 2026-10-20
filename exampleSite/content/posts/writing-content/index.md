+++
title = 'Writing Content'
date = 2026-01-12T09:00:00Z
tags = ['guide', 'markdown']
series = 'Sleeve Guide'
thumbnail = 'cover.png'
+++

This post shows the Markdown features Sleeve styles.

## Alerts

> [!NOTE]
> Alerts use GitHub's syntax and work in every language.

> [!WARNING]
> Each of the five types has its own colour, in light and dark mode.

## Tables

| Feature | Supported | Notes |
| :--- | :---: | ---: |
| Dark mode | Yes | Follows the system, with a toggle |
| Math | Yes | Rendered to MathML at build time |
| Alerts | Yes | Note, tip, important, warning, caution |

## Math

Inline math like \( e^{i\pi} + 1 = 0 \) and display math:

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$

## Code

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, Sleeve!")
}
```

## Images

Images in the page bundle are resized to responsive WebP automatically:

![A colourful gradient](cover.png "Captions come from the image title")

## Footnotes and details

Footnotes work as expected.[^1]

{{< details title="Click to expand" closed="true" >}}
Hidden content, rendered as **Markdown**.
{{< /details >}}

[^1]: This is a footnote.
