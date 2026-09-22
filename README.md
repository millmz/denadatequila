# De Nada Tequila — Website

Source code for [denadatequila.com](https://denadatequila.com), a static site hosted on Netlify.

## Pages

- `index.html` — Home
- `our-story.html` — Our Story
- `cocktails.html` — Cocktails
- `shop.html` — Shop
- `faq.html` — FAQ
- `shipping.html` — Shipping and returns
- `product-*.html` — one page per bottle
- `404.html` — served by Netlify for any missing path
- `welcome.html` — Welcome
- `privacy.html` / `terms.html` — Legal

## Deployment

The site deploys as-is (no build step). `_redirects` contains the Netlify redirect rules and `_headers` the cache and security headers. Fonts are self-hosted in `fonts/`; images live in `img/` (`img/site/` for the bottle cutouts and wordmarks, `img/cocktails/` for the recipe renders, `img/photos/` for photography).
