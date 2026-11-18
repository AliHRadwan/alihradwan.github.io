# Custom domain & meta URL checklist

When moving from GitHub Pages to your own domain, update **7 URL references** across **3 files**. Use one canonical base URL everywhere (including the trailing slash).

**Target base URL**

- Prefer `https://alihradwan.com/` if the apex is your custom domain in GitHub Pages.
- Use the `www` variant instead if that is what you configured.

---

## Files to update

### `index.html` (5 items)

| # | Location | What to set |
|---|----------|-------------|
| 1 | `<link rel="canonical" href="…">` | `href="https://alihradwan.com/"` |
| 2 | `<meta property="og:url" content="…">` | `content="https://alihradwan.com/"` |
| 3 | `<meta property="og:image" content="…">` | `content="https://alihradwan.com/assets/images/ali.webp"` |
| 4 | `<meta name="twitter:image" content="…">` | `content="https://alihradwan.com/assets/images/ali.webp"` |
| 5 | JSON-LD block | `"url": "https://alihradwan.com/"` |

### `sitemap.xml` (1 item)

| # | Location | Notes |
|---|----------|--------|
| 6 | `<loc>…</loc>` | Page URL(s); optionally refresh `<lastmod>` to the deploy date |

### `robots.txt` (1 item)

| # | Location | What to set |
|---|----------|-------------|
| 7 | `Sitemap:` line | `…/sitemap.xml` |

---

## Leave unchanged (for now)

1. **Google site verification** — Keep the existing `google-site-verification` meta tag. The old `github.io` Search Console property still relies on it; the Domain property is verified via DNS.