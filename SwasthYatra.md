read the FRONTEND.md thoroughly analyze what to implement design and build as stated . I have provided you the Visual Raycast designs about 41 of them use them as the core UI and UX design inspos turn Raycast frontend into Swasthyatra entire UI/UX components animations motion system Compnents (cards icons etc other) Animation cards video cards storytelling every single bit . ## Overview

Raycast's marketing site reads like an extended product screenshot. The chrome IS the in-product command palette at marketing scale: pure near-black canvas (`{colors.canvas}` — `#07080a`), hairline 1px borders (`{colors.hairline}` — `#242728`), command-palette-style cards with rounded corners between 6 and 16px, Inter typography with the **ss03 stylistic set enabled site-wide** (a single character — the alternate `g` — that gives Raycast's typography its signature subtle distinction), a single white CTA pill that anchors every primary action, and small splashes of saturated accent reserved for category illustrations.

The system has effectively one surface mode — dark — with a faint three-step surface ladder (`{colors.canvas}` → `{colors.surface}` → `{colors.surface-elevated}` → `{colors.surface-card}`) carrying cards, in-card panels, and key-cap glyph backgrounds. The signature decorative moment is a **red diagonal-stripe gradient band** across the very top of the home page hero, used as a launch-banner motif behind the headline (the only time saturated red appears on chrome). Beyond that single moment, color in the chrome is reserved for category accents inside extension and feature illustrations: Hacker News yellow, Slack red, Linear green, info blue.

The design philosophy is "the marketing page is the product." Section rhythm is generous (`{spacing.section}` 96px) but the page never breaks tonal continuity — the whole site sits in one continuous dark mode, full-bleed product UI screenshots show Raycast's actual command palette / store / AI chat surfaces, and the typography ligature settings (`ss03`) are inherited from the in-product app's text rendering.

**Key Characteristics:**
- Single dark surface mode with a 4-step surface ladder: `{colors.canvas}` (#07080a) → `{colors.surface}` (#0d0d0d) → `{colors.surface-elevated}` (#101111) → `{colors.surface-card}` (#121212)
- White CTA pill (`{colors.primary}` — #ffffff) is the universal primary action; everything else is monochrome dark
- Inter typography with `font-feature-settings: "calt", "kern", "liga", "ss03"` enabled site-wide — the ss03 alternate `g` is part of the brand voice
- Hairline 1px borders (`{colors.hairline}` — #242728) carry every card edge; there are no drop shadows in the system
- Multi-radius card vocabulary: `{rounded.sm}` (6px) for keycaps, `{rounded.md}` (8px) for buttons and small cards, `{rounded.lg}` (10px) for feature cards, `{rounded.xl}` (16px) for hero command-palette mockup containers
- Saturated category accents (`{colors.accent-yellow}` for Hacker News, `{colors.accent-red}` for Slack/Apple, `{colors.accent-green}` for productivity tools, `{colors.accent-blue}` for info) appear only inside extension tile imagery — never on chrome
- Signature red diagonal-stripe gradient band at the very top of the hero — three angled stripes in `{colors.hero-stripe-start}` → `{colors.hero-stripe-end}`, used once per page maximum

## Colors

> **Source pages:** `/` (home), `/store` (extension marketplace), `/core-features/ai` (feature page), `/pricing` (plan tiers), `/thomas/hacker-news` (single extension detail). The chrome palette is identical across all five pages — the dark surface ladder, hairline borders, white CTA, and ss03-enabled typography are the same on every page.

### Brand & Accent
- **White** (`{colors.primary}` — `#ffffff`): the universal primary CTA pill background. "Download" / "Install Extension" / "Get Pro" — every primary action carries it.
- **White Pressed** (`{colors.primary-pressed}` — `#e8e8e8`): pressed-state for the primary pill — a single notch dimmer.
- **On Primary** (`{colors.on-primary}` — `#000000`): pure black text on the white CTA — the only place black appears as text in the system.

### Surface
- **Canvas** (`{colors.canvas}` — `#07080a`): pure-near-black page background. The dominant surface across every page.
- **Surface** (`{colors.surface}` — `#0d0d0d`): card and elevated panel background — one notch lighter than canvas.
- **Surface Elevated** (`{colors.surface-elevated}` — `#101111`): button-tertiary fill, text-input fill, store-search-bar fill, pill-tab-active fill.
- **Surface Card** (`{colors.surface-card}` — `#121212`): app-icon-tile background, keycap fill, command-palette row hover.
- **Button FG (in-card)** (`{colors.button-fg}` — `#18191a`): rare deep-card variant used inside featured pricing tier card backgrounds.
- **Hairline** (`{colors.hairline}` — `#242728`): the universal 1px card border. Carries every card edge across every page.
- **Hairline Soft** (`{colors.hairline-soft}` — `rgba(255,255,255,0.08)`): even fainter border on translucent over-image overlays.
- **Hairline Strong** (`{colors.hairline-strong}` — `rgba(255,255,255,0.16)`): stronger 1px divider where a regular hairline reads as too soft.

### Text
- **Ink** (`{colors.ink}` — `#f4f4f6`): primary headlines on dark canvas. Slightly off-white for tonal coherence with the near-black background.
- **Body** (`{colors.body}` — `#cdcdcd`): default paragraph text and inline-link color.
- **Charcoal** (`{colors.charcoal}` — `#d3d3d4`): subtly brighter body where ink reads too soft.
- **Mute** (`{colors.mute}` — `#9c9c9d`): metadata, footer link text, secondary captions.
- **Ash** (`{colors.ash}` — `#6a6b6c`): disabled-state text, lowest-emphasis utility.
- **Stone** (`{colors.stone}` — `#434345`): least-emphasis caption text and disabled icon color.
- **On Dark** (`{colors.on-dark}` — `#ffffff`): interactive-state primary text (button label, focused tab).
- **On Dark Mute** (`{colors.on-dark-mute}` — `rgba(255,255,255,0.72)`): translucent secondary text on dark surfaces.

### Semantic
- **Accent Blue** (`{colors.accent-blue}` — `#57c1ff`) + **Soft** (`{colors.accent-blue-soft}` — `rgba(87,193,255,0.15)`): info and informational badge — used inside feature illustrations and the rare "New" pill.
- **Accent Red** (`{colors.accent-red}` — `#ff6161`) + **Soft** (`{colors.accent-red-soft}` — `rgba(255,97,97,0.15)`): destructive/error indicator + Slack/Apple category accent in extension illustrations.
- **Accent Green** (`{colors.accent-green}` — `#59d499`) + **Soft** (`{colors.accent-green-soft}` — `rgba(89,212,153,0.15)`): success state + productivity category accent in extension illustrations.
- **Accent Yellow** (`{colors.accent-yellow}` — `#ffc533`) + **Soft** (`{colors.accent-yellow-soft}` — `rgba(255,197,51,0.15)`): "warning" semantic + the Hacker News orange-yellow that appears as the most prominent accent illustration on the home page hero.

### Brand Gradient
- **Hero Stripe Gradient** — three diagonal red stripes layered across the very top of the home page hero, fading from `{colors.hero-stripe-start}` (`#ff5757`) to `{colors.hero-stripe-end}` (`#a1131a`). The system's only chromatic gradient on chrome — used once per page maximum and reserved for hero launch-banner moments.
- **Keycap Gradient** — the small key-glyph background uses a subtle linear-gradient from `{colors.key-bg-start}` (`#121212`) to `{colors.key-bg-end}` (`#0d0d0d`) that gives Raycast's keycap UI its slight 3D-key feel.

## Typography

### Font Family
**Inter** is the system's primary face, loaded with the `Inter Fallback` system fallback variant. Critically, Raycast enables `font-feature-settings: "calt", "kern", "liga", "ss03"` site-wide — the **ss03 stylistic set** swaps in Inter's alternate `g` glyph (single-story open `g`), which is the brand's signature typographic detail. Standard ligatures (`liga`), kerning (`kern`), and contextual alternates (`calt`) are also active. The display tier additionally enables `ss02` and `ss08` and disables standard `liga` to render the hero "Raycast Pro" wordmark with its distinctive geometric construction.

There is no monospace face used outside of inline `<code>` chips in documentation; the marketing pages use Inter for everything.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 64px | 600 | 1.1 | 0 | Hero "Built for the perfect tools" / "The new way to..." headline (with `liga: 0`, `ss02`, `ss08`) |
| `{typography.display-lg}` | 56px | 500 | 1.17 | 0.2px | Section headline ("Explore", "Pricing", store hero "Store") |
| `{typography.heading-xl}` | 24px | 500 | 1.6 | 0.2px | Sub-section heading, pricing-tier name |
| `{typography.heading-lg}` | 22px | 500 | 1.15 | 0 | Mid-section feature heading |
| `{typography.heading-md}` | 20px | 500 | 1.4 | 0.2px | Card group title, in-card heading |
| `{typography.heading-sm}` | 18px | 500 | 1.4 | 0.2px | Small heading, extension card title |
| `{typography.body-lg}` | 18px | 400 | 1.6 | 0 | Pricing tier description, hero subtitle |
| `{typography.body-md}` | 16px | 400 | 1.6 | 0 | Default body, paragraph text |
| `{typography.body-strong}` | 16px | 500 | 1.4 | 0.2px | Inline emphasis, primary nav link |
| `{typography.body-sm}` | 14px | 400 | 1.6 | 0 | Card description, secondary copy |
| `{typography.body-sm-strong}` | 14px | 500 | 1.6 | 0.2px | In-card label, table-header text |
| `{typography.caption-md}` | 13px | 400 | 1.4 | 0.1px | Caption, metadata |
| `{typography.caption-sm}` | 12px | 400 | 1.5 | 0.4px | Smallest utility text, badge label |
| `{typography.link-md}` | 16px | 500 | 1.4 | 0.3px | Inline body anchor link |
| `{typography.button-md}` | 14px | 500 | 1.6 | 0.2px | Standard button label |

### Principles
The hierarchy works on a 1.6-line-height ladder for body and a 1.1–1.4 ladder for display/heading. Letter-spacing is consistently positive (0.1–0.4px) — slightly opening the type — which gives Raycast's chrome an airy quality at body sizes despite the dark canvas. The `ss03` stylistic set is the brand's most distinctive typographic detail; without it, the body face renders identically to plain Inter and loses Raycast's signature rendering.

### Note on Font Substitutes
Inter is open-source and Google-Fonts-hosted; load it directly. To preserve the brand's signature look, you must enable `font-feature-settings: "calt", "kern", "liga", "ss03"` on the body element. Without `ss03`, the typography is recognizably "Inter default" rather than "Raycast." On systems where Inter cannot be loaded, the documented fallback is `Inter Fallback` (a self-hosted variant) → `system-ui`. **JetBrains Mono** or **Geist Mono** are acceptable substitutes for inline code chips when needed, though Raycast's marketing chrome rarely uses code-styled text.

## Layout

### Spacing System
- **Base unit:** 8px (with 2/4/12px steps for tight inline gaps).
- **Tokens (front matter):** `{spacing.xxs}` (2px) · `{spacing.xs}` (4px) · `{spacing.sm}` (8px) · `{spacing.md}` (12px) · `{spacing.lg}` (16px) · `{spacing.xl}` (24px) · `{spacing.xxl}` (32px) · `{spacing.section}` (96px).
- **Universal section rhythm:** every page in the set uses `{spacing.section}` (96px) as the vertical gap between major content blocks. Card grids use `{spacing.lg}` (16px) gutters; in-card padding sits at `{spacing.xl}` (24px) for feature cards and `{spacing.lg}` (16px) for store extension cards.

### Grid & Container
- **Max width:** ~1240px content area at desktop with 24px gutters (~48px at ultrawide). Hero command-palette mockups run wider (~1080px) with the page background extending to full bleed.
- **Store extension grid:** 2-up at desktop with rows of 2 cards stacked, collapsing to 1-up at mobile. Each card is a horizontal layout with a large square app icon at the left and copy + Install button at the right.
- **Pricing tier grid:** 3-up at desktop (Free / Pro / Pro+Advanced AI), collapsing to 1-up stacked at mobile.
- **Featured extension card grid:** 3-up at desktop in the "Featured" row at the top of the store page.
- **Comparison table:** full-width on the pricing page below the tier cards — 5-column table (Free / Pro / Advanced AI / Custom for Teams / Enterprise) with feature rows.
- **Footer:** 6-column horizontal link grid at desktop, collapsing to 2-up at tablet and 1-up at mobile.

### Whitespace Philosophy
Whitespace is generous and the canvas is uninterrupted. Sections sit 96px apart with no decorative dividers between them — the dark canvas continues edge-to-edge from hero to footer. Inside a section, content is left-aligned in a tight column, with command-palette mockup imagery occupying the right 50–60% of the band on home-page feature rows. The signature decorative element — the red diagonal-stripe gradient band — only appears in the very first hero band; from the second section down, the page is monochrome dark.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | No border, no shadow | Default for canvas-on-canvas blocks, hero text, footer body |
| 1 — Hairline border | 1px solid `{colors.hairline}` (#242728) | Every card on `{colors.surface}`, store extension card, pricing tier card |
| 2 — Hairline strong | 1px solid `{colors.hairline-strong}` | Stronger inline divider, table-row separator on the comparison table |
| 3 — Surface ladder elevation | `{colors.canvas}` → `{colors.surface}` → `{colors.surface-elevated}` → `{colors.surface-card}` | Multi-step background-color ladder used to create elevation without shadows |

The system has no drop-shadow elevation at all. Depth is built entirely from the surface-color ladder: each notch lighter on the dark scale reads as one step closer to the viewer.

### Decorative Depth
Depth comes from product imagery and a single stripe-gradient band:
- **Hero stripe gradient** — three diagonal red stripes (`{colors.hero-stripe-start}` → `{colors.hero-stripe-end}`) layered across the home-page hero band, evoking a launch-banner / motion-blur effect. The system's signature decorative moment.
- **Command-palette mockups** — full-fidelity Raycast in-product UI screenshots (the actual Spotlight-style overlay with rounded keycaps, command rows, and accent-color glyphs) sitting inside the home-page hero and feature rows. These ARE the brand decoration.
- **App icon tiles** — small 48–64px rounded-corner tiles displaying real app icons (Slack, Spotify, Figma, Notion, Linear, Hacker News) inside store and feature illustrations.
- **Keycap glyphs** — subtle gradient-filled rounded keycap glyphs used inline to indicate keyboard shortcuts (e.g., `⌘ K`), with a faint `{colors.key-bg-start}` → `{colors.key-bg-end}` linear gradient suggesting a physical key surface.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Hero band, primary nav, footer, full-bleed structural surfaces |
| `{rounded.xs}` | 4px | Keycap glyphs, badge-pro chips, small inline tags |
| `{rounded.sm}` | 6px | Command-palette row, inline buttons, micro chips |
| `{rounded.md}` | 8px | Standard buttons, text inputs, store search bar, app-icon tiles, store extension card |
| `{rounded.lg}` | 10px | Feature card, command-palette mockup card, pricing tier card |
| `{rounded.xl}` | 16px | Large hero command-palette mockup container, oversized feature panel |
| `{rounded.full}` | 9999px | Pill-tab chips, avatar circles |

The radius vocabulary clusters tightly between 4 and 16px, with most chrome at 6–10px. The system never goes flat (0px) on cards and never above 16px except for fully-rounded pills.

### Photography Geometry
There is no traditional photography. Visual elements are limited to:
- **Command-palette mockups** — full-fidelity Raycast UI screenshots at 16:9 or 4:3 aspect inside `{rounded.xl}` (16px) containers.
- **App icon tiles** — 48–64px square at `{rounded.md}` (8px), displaying real app icons.
- **Avatar circles** — 32–40px at `{rounded.full}` for in-extension author attribution.
- **Hero stripe gradient** — full-bleed wash with no aspect ratio.

## Components

> **No hover states documented** per system policy. Each spec covers Default and Active/Pressed only.

### Buttons

**`button-primary`** — the universal Raycast CTA
- Background `{colors.primary}` (white), text `{colors.on-primary}` (black), type `{typography.button-md}`, padding `8px 16px`, height ~36px, rounded `{rounded.md}`.
- Used for "Download" (sticky top-nav CTA), "Get Pro", "Install" — every primary action across every surface.
- Pressed state lives in `button-primary-pressed` — background dims to `{colors.primary-pressed}`.

**`button-secondary`** — transparent text button
- Background transparent, text `{colors.on-dark}`, type `{typography.button-md}`, padding `8px 16px`, height ~36px, rounded `{rounded.md}`.
- Lower-emphasis action: "Sign in" (top nav), "Learn more →", "View on GitHub".

**`button-tertiary`** — soft surface button
- Background `{colors.surface-elevated}`, text `{colors.on-dark}`, type `{typography.button-md}`, padding `8px 16px`, height ~36px, rounded `{rounded.md}`.
- Mid-emphasis: "Watch demo", "View extension", "Manage" buttons inside cards.

**`button-disabled`**
- Background `{colors.surface-elevated}`, text `{colors.ash}` — dim utility state.

**`install-button`** — the store-page install pill
- Background transparent with 1px solid `{colors.hairline-strong}` border, text `{colors.on-dark}`, type `{typography.button-md}`, padding `6px 14px`, rounded `{rounded.md}`.
- Sits at the right edge of every store extension card with the label "Install Extension".

### Filter & Tab Chips

**`pill-tab`** + **`pill-tab-active`** — small filter chip strip
- Default: transparent background, text `{colors.body}`, type `{typography.body-sm}`, padding `4px 10px`, rounded `{rounded.full}`.
- Active: background flips to `{colors.surface-elevated}`, text `{colors.on-dark}` — the chip "lifts" by one surface notch.
- Used in the store filter row ("All Extensions", "Recently Added", "Most Popular") and similar segmented controls.

**`badge-pro`** — small Pro/Plan label
- Background `{colors.surface-elevated}`, text `{colors.on-dark-mute}`, type `{typography.caption-sm}`, padding `2px 6px`, rounded `{rounded.xs}`.
- Inline "Pro" / "Pro+" / "Free" tier indicators on pricing tier cards.

**`badge-info-soft`** — translucent info chip
- Background `{colors.accent-blue-soft}`, text `{colors.accent-blue}`, type `{typography.caption-sm}`, padding `2px 8px`, rounded `{rounded.xs}`.
- Rare "New" / "Beta" inline tag.

### Inputs & Forms

**`text-input`** + **`text-input-focused`**
- Default: background `{colors.surface-elevated}`, text `{colors.on-dark}`, 1px solid `{colors.hairline}`, type `{typography.body-md}`, padding `8px 12px`, height ~36px, rounded `{rounded.md}`.
- Focused: same surface; 1px border becomes `{colors.hairline-strong}` — a subtle brightening rather than a colored ring.

**`store-search-bar`** — the store-page search field
- Background `{colors.surface-elevated}`, text `{colors.on-dark}`, type `{typography.body-md}`, padding `10px 16px`, height ~44px, rounded `{rounded.md}`.
- Sits at the top of the store page hero with a magnifier icon at the left and "Search the store..." placeholder. Slightly taller than the standard `text-input`.

### Cards & Containers

**`command-palette-card`** — the home-page hero command-palette mockup
- Container: background `{colors.surface}`, 1px solid `{colors.hairline}`, padding 0 (the mockup contents fill the card), rounded `{rounded.lg}` or `{rounded.xl}` depending on hero size.
- Layout: top header strip with macOS traffic-light dots + a search input row, body with a vertical stack of `{component.command-palette-row}` items, bottom-right keycap hint cluster.

**`command-palette-row`** + **`command-palette-row-active`** — single row inside the command palette
- Default: transparent background, text `{colors.on-dark}` in `{typography.body-md}`, padding `6px 10px`, rounded `{rounded.sm}`.
- Active: background `{colors.surface-card}` (one notch lighter than the surrounding palette card) — the selection state.
- Each row contains a small app-icon tile + label + optional keycap shortcut at the right edge.

**`feature-card-dark`** — standard product feature card
- Container: background `{colors.surface}`, 1px solid `{colors.hairline}`, padding `{spacing.xl}` (24px), rounded `{rounded.lg}`.
- Used in 2- or 3-up grids on home and feature pages — pairs a small product mockup or app-icon row with body copy and a "Learn more →" `{component.button-secondary}`.

**`feature-card-elevated`** — slightly-elevated variant
- Same chrome as `feature-card-dark` but background flips to `{colors.surface-elevated}` — used to break visual rhythm in alternating feature rows.

**`store-extension-card`** — store-page extension card
- Container: background `{colors.surface}`, 1px solid `{colors.hairline}`, padding `{spacing.lg}` (16px), rounded `{rounded.md}`.
- Layout: 48px `{component.app-icon-tile}` at left, vertical stack of name + by-author metadata + 1-line description in the center, `{component.install-button}` at the right edge.

**`pricing-tier-card`** — pricing plan card (default tier)
- Container: background `{colors.surface}`, 1px solid `{colors.hairline}`, padding `{spacing.xl}` (24px), rounded `{rounded.lg}`.
- Layout: tier name in `{typography.heading-xl}` (24px), price in larger numeric in `{typography.display-lg}`, body description in `{typography.body-lg}`, CTA `{component.button-primary}` (or `{component.button-secondary}` for free tier), feature checklist with `✓` glyphs.

**`pricing-tier-card-featured`** — middle "Pro" featured tier
- Same chrome but background flips to `{colors.surface-elevated}` (one notch lighter) — the only visual cue distinguishing the featured tier from the surrounding cards.

**`hero-stripe-band`** — home-page hero with red stripe gradient
- Background `{colors.canvas}` with three diagonal red stripes layered across the top half (`{colors.hero-stripe-start}` → `{colors.hero-stripe-end}`).
- Padding `{spacing.section}` 96px vertical / 48px horizontal, rounded `{rounded.none}`.
- Carries the hero headline in `{typography.display-xl}` and a single `{component.button-primary}` "Download" CTA.

### Decorative

**`app-icon-tile`** — small 48px square app icon
- Background `{colors.surface-card}`, padding 0 (icon fills the tile), rounded `{rounded.md}`, size 48×48.
- Used in command-palette rows and store extension cards.

**`app-icon-tile-large`** — 64px feature variant
- Same but at 64×64. Used in featured store cards and home-page hero illustration rows.

**`keycap`** — keyboard shortcut glyph
- Background `{colors.surface-card}` with a subtle linear gradient `{colors.key-bg-start}` → `{colors.key-bg-end}`, text `{colors.body}` in `{typography.caption-md}`, padding `1px 6px`, height ~20px, rounded `{rounded.xs}`.
- Renders inline command-palette shortcut hints like `⌘ K`, `⏎`, `Esc`. The signature "physical-key" feel on a flat dark canvas.

### Navigation

**`primary-nav`**
- Background `{colors.canvas}`, text `{colors.on-dark}`, height ~56px, type `{typography.body-sm-strong}`, rounded `{rounded.none}`, with a 1px `{colors.hairline}` bottom rule.
- Layout (desktop): Raycast wordmark at left, centered nav cluster ("Pro · AI · Store · Manual · Changelog · Blog · Pricing"), right cluster (Sign in link + the always-white `{component.button-primary}` "Download" CTA pill).

**Top Nav (Mobile)**
- Hamburger menu icon at left, Raycast wordmark at center, "Download" white CTA pill at right. Primary nav collapses into a full-screen drawer that slides from the left.

### Footer

**`footer-section`**
- Background `{colors.canvas}`, text `{colors.body}` in `{typography.body-sm}`, padding `64px 48px`, with a 1px `{colors.hairline}` top rule.
- Layout: 6-column horizontal link grid (Product · Core Features · Top Extensions · Company · Community · By Raycast) with column headers in `{typography.body-sm-strong}` `{colors.on-dark}` and link lists in `{typography.body-sm}` `{colors.body}`.
- Bottom row: small Raycast wordmark + a subscribe newsletter input field with `{component.button-primary}` "Subscribe" at the right.
- The very top of the footer band has a faint red stripe-gradient repeat — a smaller echo of the hero's diagonal stripe motif.

### Inline

**`link-inline`** — body-prose anchor link
- `{colors.on-dark}` text with no underline by default; underlines on focus. Inline body links are full-white rather than a tinted accent color, which keeps the dark canvas tonally pure.

## Do's and Don'ts

### Do
- Render the entire site in one continuous dark mode. There is no light variant in the system.
- Use `{colors.primary}` (white pill) for every primary CTA. There is no second primary color — white IS the brand action.
- Build elevation from the surface-color ladder (`{colors.canvas}` → `{colors.surface}` → `{colors.surface-elevated}` → `{colors.surface-card}`), never from drop shadows.
- Enable `font-feature-settings: "calt", "kern", "liga", "ss03"` on the body element. The ss03 alternate `g` is part of the brand identity.
- Anchor a `{component.command-palette-card}` mockup as the hero's load-bearing visual. Real Raycast UI is the brand.
- Use `{component.keycap}` glyphs inline to indicate keyboard shortcuts. Subtle key-bg gradient (`{colors.key-bg-start}` → `{colors.key-bg-end}`) is the brand's only "depth" decoration.
- Reserve `{colors.hero-stripe-start}` → `{colors.hero-stripe-end}` red gradient for the hero band exactly once per page. Never repeat the stripe gradient deeper in the page.
- Use saturated category accents (`{colors.accent-yellow}`, `{colors.accent-red}`, `{colors.accent-green}`, `{colors.accent-blue}`) only inside extension and feature illustrations — never on chrome buttons or text.

### Don't
- Don't introduce a light mode. The system is dark-only by design.
- Don't add drop shadows on cards. Elevation is built from the surface ladder, not from shadows.
- Don't replace `{colors.primary}` (white) with a tinted accent for the primary CTA. Pure white is the brand action color.
- Don't use the saturated accent colors (`{colors.accent-yellow}`, `{colors.accent-red}`, `{colors.accent-green}`, `{colors.accent-blue}`) on text, buttons, or chrome surfaces. They belong inside extension illustrations.
- Don't repeat the hero stripe gradient outside the top hero band. The one-band rule is the system's restraint.
- Don't use Inter without the `ss03` feature flag enabled. The chrome will lose its signature voice.
- Don't pad cards with 32px+ on all sides. The system runs tight at 16–24px in-card padding.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| ultrawide | 1920px+ | Content max-width holds at 1240px; outer gutters grow to ~80px |
| desktop-large | 1440px | Default — 3-up pricing grid, 2-up store extension grid |
| desktop | 1280px | Same with narrower outer gutters |
| desktop-small | 1024px | 3-up pricing collapses to 2+1; primary nav remains horizontal |
| tablet | 768px | Pricing → 1-up stacked; primary nav becomes hamburger drawer |
| mobile | 480px | Single-column everything; hero `{typography.display-xl}` scales 64px → ~36px |
| mobile-narrow | 320px | Section padding tightens to 48px |

### Touch Targets
All interactive elements meet WCAG AA at 36px+. `{component.button-primary}` and `{component.button-tertiary}` sit at 36px height with 16px padding. `{component.text-input}` sits at 36px. `{component.store-search-bar}` sits at 44px (above AAA). `{component.pill-tab}` is ~24–28px height with 10px padding extending to 36–40px tappable via inline padding (above AA but below AAA — intentional, the chips are compact). `{component.install-button}` sits at ~32px height with 14px padding.

### Collapsing Strategy
- **Primary nav:** desktop horizontal cluster → tablet hamburger drawer at 768px. The white "Download" CTA stays visible at every breakpoint.
- **Hero command-palette mockup:** desktop full-fidelity 2-column with copy at left + mockup at right → tablet stacks vertical with mockup below copy → mobile mockup scales down to ~80% width.
- **Store extension grid:** 2-up → 1-up at tablet.
- **Pricing tier grid:** 3-up → 2+1 at desktop-small → 1-up stacked at tablet.
- **Comparison table:** desktop full 5-column → tablet horizontal scroll → mobile vertical card stack with one tier per card.
- **Footer:** 6-up link columns → 3-up at tablet → 2-up at mobile-landscape → 1-up at mobile.
- **Section padding:** `{spacing.section}` (96px) desktop → 64px tablet → 48px mobile.
- **Hero headline:** `{typography.display-xl}` (64px) at desktop, scaling 56px / 44px / 36px down the breakpoint stack.

### Image Behavior
The only "imagery" in the system is in-product Raycast UI screenshots and small app-icon assets:
- **Command-palette mockups** scale fluidly with the container; the in-product UI itself is responsive and re-renders for each breakpoint.
- **App-icon tiles** stay at 48–64px fixed size at every breakpoint; they tile in flexible rows that wrap at narrower widths.
- **Hero stripe gradient** stays at the top of the hero band at every breakpoint with the stripe angle preserved.

## Iteration Guide

1. Focus on ONE component at a time. Pull its YAML entry and verify every property resolves.
2. Reference component names and tokens directly (`{colors.primary}`, `{component.button-primary-pressed}`, `{rounded.md}`) — do not paraphrase.
3. Run `npx @google/design.md lint DESIGN.md` after edits — `broken-ref`, `contrast-ratio`, and `orphaned-tokens` warnings flag issues automatically.
4. Add new variants as separate component entries (`-pressed`, `-disabled`, `-active`) — do not bury them inside prose.
5. Default body to `{typography.body-md}` (16px / 400 / 1.6); reach for `{typography.body-strong}` for emphasis; reserve `{typography.display-xl}` strictly for the hero band.
6. Keep `{colors.primary}` (white CTA pill) scarce per viewport — at most one solid white pill per fold.
7. When introducing a new component, ask whether it can be expressed with the existing surface-ladder + 8px-radius + ss03-Inter vocabulary before adding new tokens. The system's strength is that it almost never needs new ones.

## Known Gaps

- **Mobile screenshots not captured** — responsive behavior synthesizes Raycast's mobile pattern (hamburger drawer, single-column grid, hero downscale) from desktop evidence and the breakpoint stack.
- **Hover states not documented** by system policy. Raycast's in-product app has rich hover behavior on command-palette rows that this document doesn't capture.
- **In-product app chrome** (the actual Raycast launcher running on macOS) is referenced in marketing screenshots but not documented as a separate UI system here. The marketing site is documented; the in-product app surface is its own design system.
- **Dark mode is the only mode** — no light variant exists in the captured surfaces.
- **Form validation states** beyond the focused-input border treatment are not present in the captured surfaces.
- **Authenticated chrome** (account dashboard, billing settings, team management) not in the captured pages.analyze https://www.raycast.com/ fully and turn Raycast frontend UI/UX components Animations , motions its enitre frontend into our app just imagine you have your own dev team full of elite UI/UX engineers with 5+ year of experience you all have built raycast Frontend . how will you turn it into our app SwasthYatra


# PHASE 2

# SYSTEM ARCHITECTURE & ROLE ECOSYSTEM

# UNDERSTAND THE PRODUCT BEFORE DESIGNING IT

Before designing any page, component, interaction, animation, layout or motion system, understand the role ecosystem.

SwasthYatra is not a single-user application.

It is a multi-sided healthcare coordination network.

Every participant experiences the platform differently.

Do not design all dashboards the same.

Do not reuse layouts blindly.

Do not reuse components blindly.

Every operating system exists for a different purpose.

---

# COMPLETE ECOSYSTEM

The platform consists of:

Patient OS

Doctor OS

Pharmacist OS

Hospital OS

Organization OS

Operator OS

Navigation Assistant

Provider Network

Communication Center

Health Passport

Medical Vault

Medication Guide

Care Outcomes

Documentation Hub

Demo Platform

Each system solves a different problem.

---

# PATIENT OPERATING SYSTEM

## Purpose

The Patient OS is the traveler's healthcare command center.

The traveler is not managing healthcare.

The traveler is navigating healthcare.

The interface should reduce anxiety.

Reduce uncertainty.

Provide clarity.

Provide confidence.

---

# Questions Patient OS Must Answer

Where am I in my care journey?

Who is helping me?

What is happening right now?

What happens next?

Am I safe?

Do I need to take action?

---

# Patient OS Core Sections

Current Journey

Journey Timeline

Provider Status

Communication Status

Health Passport

Medical History

Medication Guidance

Recent Updates

Quick Actions

Support Access

---

# Patient Emotional State

The patient is often:

Sick

Traveling

Confused

Stressed

In an unfamiliar healthcare system

The interface should feel:

Calm

Clear

Trustworthy

Guided

Supportive

Never overwhelming.

---

# DOCTOR OPERATING SYSTEM

## Purpose

Doctors are not exploring.

Doctors are working.

The Doctor OS should prioritize efficiency.

Every second matters.

---

# Questions Doctor OS Must Answer

Who needs attention?

What information matters?

What is waiting?

What should I do next?

---

# Doctor OS Core Sections

Assignments

Waiting Patients

Availability

Communication

Interpreter Sessions

Recent Care Requests

Patient Context

Follow-Up Actions

---

# Doctor Emotional State

Busy.

Focused.

Time constrained.

The interface should feel:

Fast

Dense

Professional

Operational

No unnecessary decoration.

---

# PHARMACIST OPERATING SYSTEM

## Purpose

Help travelers access appropriate medications.

Reduce medication confusion.

Bridge local medication differences.

---

# Questions Pharmacist OS Must Answer

What does the traveler need?

What is the local equivalent?

Are there concerns?

What action should happen next?

---

# Pharmacist Core Sections

Medication Requests

Equivalent Medications

Interaction Alerts

Traveler Context

Fulfillment Status

Recent Requests

---

# Emotional Feel

Reliable.

Knowledgeable.

Practical.

---

# HOSPITAL OPERATING SYSTEM

## Purpose

Coordinate incoming care requests.

Monitor capacity.

Manage care delivery.

---

# Questions Hospital OS Must Answer

What cases are incoming?

What resources are available?

What requires attention?

What can be assigned?

---

# Hospital Core Sections

Incoming Cases

Capacity Overview

Provider Availability

Communication Requests

Emergency Queue

Interpreter Requests

---

# Emotional Feel

Coordinated.

Capable.

Operational.

Mission critical.

---

# ORGANIZATION OPERATING SYSTEM

Examples:

Insurance Companies

Universities

Corporate Travel Teams

Embassies

Travel Programs

---

## Purpose

Monitor and support travelers.

Not provide treatment.

---

# Questions Organization OS Must Answer

Who is traveling?

Who needs help?

What is unresolved?

What requires attention?

---

# Core Sections

Active Travelers

Care Journeys

Provider Assignments

Escalations

Outcomes

Travel Support Overview

---

# Emotional Feel

Strategic.

Informative.

Reliable.

---

# OPERATOR OPERATING SYSTEM

## Purpose

Mission Control.

The operator ensures no traveler gets stuck.

The operator is the final safety layer.

---

# Questions Operator OS Must Answer

Which journeys are failing?

What needs intervention?

Who requires assistance?

What is blocked?

---

# Core Sections

Open Cases

Escalations

Failed Assignments

Provider Delays

Communication Issues

Manual Reviews

Activity Feed

---

# Emotional Feel

Mission Control.

High visibility.

High responsibility.

High awareness.

---

# NAVIGATION ASSISTANT

## Purpose

Coordinate care.

Not chat.

Not entertain.

Not answer trivia.

Move journeys forward.

---

# Responsibilities

Assess situations

Find options

Coordinate providers

Track progress

Monitor communication

Escalate when needed

Guide next steps

---

# What Users Should Feel

The system is actively working for me.

The system understands context.

The system is making progress.

---

# PROVIDER NETWORK

## Purpose

Connect travelers to care.

Not list providers.

Not display directories.

Connect people to help.

---

# Core Concepts

Availability

Language Support

Travel Context

Care Suitability

Responsiveness

Outcome History

---

# COMMUNICATION CENTER

## Purpose

Coordinate communication.

Not messaging.

Not chat.

Coordination.

---

# Includes

Provider Responses

Calls

WhatsApp

Translation

Status Updates

Assignments

Care Coordination

---

# HEALTH PASSPORT

## Purpose

Portable healthcare identity.

Provides important information when care is needed.

---

# Includes

Medical Conditions

Allergies

Medications

Emergency Contacts

Insurance

Travel Information

Documents

---

# MEDICAL VAULT

## Purpose

Secure document storage.

Not file management.

Healthcare context.

---

# Includes

Prescriptions

Reports

Insurance Documents

Travel Health Documents

Vaccination Records

---

# MEDICATION GUIDE

## Purpose

Help travelers understand medications across countries.

Not a drug database.

A traveler-focused guide.

---

# Includes

Medication Equivalents

Usage Information

Safety Information

Interaction Information

---

# CARE OUTCOMES

## Purpose

Show what happened.

Build trust.

Improve future journeys.

---

# Includes

Treatment Outcome

Resolution Status

Follow-Up Status

Recovery Confirmation

Traveler Feedback

---

# DOCUMENTATION HUB

## Purpose

Product understanding.

Not technical documentation.

---

# Includes

How SwasthYatra Works

Journey Examples

Role Guides

Platform Overview

Integration Guides

Workflow Examples

---

# DEMO PLATFORM

## Purpose

Tell the story.

Not showcase features.

Demonstrate the healthcare journey.

---

# Demo Narrative

Traveler Gets Sick

↓

Assessment

↓

Care Options

↓

Provider Contact

↓

Provider Response

↓

Communication

↓

Treatment

↓

Outcome

↓

Network Learns

---

# FINAL RULE

Never design a page based on its title.

Design the page based on the role's goals.

A Doctor Dashboard should not resemble a Patient Dashboard.

An Operator Dashboard should not resemble a Hospital Dashboard.

An Organization Dashboard should not resemble a Pharmacist Dashboard.

Every operating system should feel purpose-built for the people using it.

That is how SwasthYatra becomes a true Healthcare Navigation Operating System rather than a collection of dashboards.


# PHASE 3

# FRONTEND DESIGN LANGUAGE & EXPERIENCE DOCTRINE

# TURN RAYCAST INTO SWASTHYATRA

This phase exists to define exactly how the frontend should feel.

Not how it should look.

Feel.

Most AI-generated products focus on appearance.

Elite products focus on experience.

Before designing any page, component, layout, animation, card, dashboard or workflow, understand the design hierarchy.

---

# DESIGN HIERARCHY

This hierarchy is mandatory.

Every design decision must follow this order.

UX Architecture
↓
Linear

Visual System
↓
Raycast

Agent Experience
↓
Cursor

Storytelling
↓
Tsenta

Documentation
↓
Stripe

Operational Workflows
↓
Airtable

Motion System
↓
GSAP + Framer Motion + Lenis

Component Foundation
↓
shadcn + Radix

---

# RAYCAST IS THE PRIMARY REFERENCE

Not because we are copying Raycast.

Because Raycast demonstrates:

Exceptional product craftsmanship.

Exceptional interaction quality.

Exceptional information density.

Exceptional component quality.

Exceptional hierarchy.

Exceptional navigation.

Exceptional keyboard-first experiences.

The question should always be:

If Raycast became a Healthcare Navigation Operating System, what would it feel like?

Not:

How do we copy Raycast?

---

# VISUAL PHILOSOPHY

The platform should feel:

Dense

Premium

Fast

Confident

Intentional

Operational

Alive

Trustworthy

Human

Never:

Template-generated

AI-generated

Hackathon-built

Startup-dashboard-like

Generic

Dribbble-inspired

Over-designed

Trend-chasing

Crypto-like

Web3-like

Glassmorphism-heavy

Gradient-heavy

---

# INFORMATION DENSITY

Density should resemble:

Raycast

Linear

Apple Pro Apps

Not:

Notion dashboards

Generic SaaS products

Bootstrap admin panels

AI-generated dashboards

---

# RULE

More information.

Less clutter.

More context.

Less decoration.

More usefulness.

Less marketing.

---

# SPACING SYSTEM

Spacing should feel engineered.

Not artistic.

Not random.

Use a predictable scale.

Example:

4

8

12

16

20

24

32

40

48

64

No arbitrary spacing.

No random padding.

No giant empty areas.

---

# EMPTY SPACE DOCTRINE

Do NOT fill empty space.

Use empty space intentionally.

The rule is:

No dead space.

Not:

No whitespace.

Every visible region should contain:

Context

Activity

Progress

Status

Actions

Narrative

Guidance

Relevant Information

Never:

Placeholder cards

Fake metrics

Random charts

Meaningless illustrations

Decorative widgets

---

# COLOR PHILOSOPHY

Color communicates state.

Not decoration.

Primary surfaces should feel calm.

Trustworthy.

Operational.

Healthcare infrastructure.

Not healthcare marketing.

Accent colors should communicate:

Success

Warnings

Errors

Progress

Availability

Never use color simply because it looks cool.

---

# TYPOGRAPHY PHILOSOPHY

Typography should feel:

Editorial

Readable

Professional

Trustworthy

Confident

The interface should communicate authority.

Not excitement.

Users should feel:

I trust this platform.

Not:

This platform is trying to impress me.

---

# SIDEBAR SYSTEM

The sidebar is not navigation.

The sidebar is a contextual operating layer.

Inspired by Raycast.

The sidebar should continuously provide value.

Include:

Current Role

Current Journey

Recent Activity

Pinned Actions

Quick Actions

Recent Updates

Current Location

Provider Status

Journey Status

Command Palette Hint

The sidebar should never feel empty.

---

# COMMAND PALETTE

The command palette is a first-class product experience.

Ctrl + K

Must exist globally.

Quality target:

Raycast.

Not a modal.

Not a search box.

An operating system command center.

Examples:

Create Journey

Find Care

Open Interpreter

Search Medication

Open Documentation

View Outcomes

Open Provider Network

Switch Role

Switch Organization

Open Demo

Open Agent Workspace

Everything should be reachable from the command palette.

---

# CARD SYSTEM

Cards should feel engineered.

Not generated.

Not decorative.

Not marketing-driven.

Every card must answer:

Why does this exist?

What value does it provide?

What action does it support?

---

# CARD TYPES

Status Cards

Progress Cards

Context Cards

Journey Cards

Provider Cards

Activity Cards

Action Cards

Narrative Cards

No generic cards.

No "stat cards" for the sake of stat cards.

---

# NARRATIVE CARDS

Inspired by Tsenta.

These are among the most important components in the platform.

Example:

Assessment Complete

Your symptoms were reviewed and the safest next step was identified.

↓

Recommended Care Options

Nearby providers were evaluated based on language support, availability and travel context.

↓

Provider Confirmed

A provider is available and ready to assist.

↓

Communication Ready

Translation support has been prepared automatically.

↓

Treatment Completed

Care has been received and recorded.

These cards tell stories.

Not statistics.

---

# TABLE SYSTEM

Quality target:

Airtable.

Not admin dashboards.

Not enterprise software.

Not generic data grids.

Requirements:

Dense

Fast

Keyboard friendly

Filterable

Sortable

Readable

Operational

The operator should comfortably manage hundreds of journeys.

---

# TIMELINE SYSTEM

Timelines are core product components.

Examples:

Journey Timeline

Provider Timeline

Communication Timeline

Outcome Timeline

Escalation Timeline

Activity Timeline

Every timeline should communicate:

Progress

History

Status

Next Steps

Not just events.

---

# ACTIVITY FEEDS

Every major page should contain activity.

The system should feel alive.

Examples:

Provider Confirmed

2 minutes ago

Translation Prepared

4 minutes ago

Medication Guide Ready

8 minutes ago

Follow-Up Scheduled

12 minutes ago

Activity creates confidence.

---

# AGENT EXPERIENCE

Reference:

Cursor.

Not visually.

Experientially.

The Navigation Assistant should feel:

Proactive

Intelligent

Context-aware

Helpful

Purpose-driven

Never conversational.

Never chatbot-like.

---

# BAD EXAMPLE

User:
Hello

Assistant:
Hi! How can I help?

---

# GOOD EXAMPLE

Reviewing travel context...

Checking nearby providers...

Comparing language compatibility...

Contacting provider...

Waiting for response...

Provider confirmed.

Preparing communication support...

Journey ready.

The user watches progress.

Not conversation.

---

# DOCUMENTATION EXPERIENCE

Reference:

Stripe.

Documentation is part of the product.

Not an afterthought.

Requirements:

Search

Deep Linking

Copy Buttons

SDK Examples

CLI Examples

Workflow Examples

Journey Examples

Role Guides

Excellent Typography

Sticky Navigation

---

# ICONOGRAPHY

Reference:

Raycast.

Rules:

Consistent stroke width.

Consistent visual weight.

Consistent sizing.

Icons support information.

Never decorate information.

No emoji.

No random icon packs.

No visual inconsistency.

---

# MICROINTERACTIONS

Every interaction should feel intentional.

Buttons

Menus

Dropdowns

Selections

Checkboxes

Filters

Tables

Search

Command Palette

Everything should communicate confidence.

---

# FINAL EXPERIENCE TEST

The platform should feel like:

Apple-level craftsmanship

Raycast-level component quality

Linear-level workflow clarity

Stripe-level trust

Cursor-level activity

Tsenta-level storytelling

Airtable-level operational power

while remaining completely original.

The goal is not to build a beautiful dashboard.

The goal is to build the world's most refined Healthcare Navigation Operating System.

# PHASE 4

# GLOBAL LAYOUT ARCHITECTURE & NAVIGATION SYSTEM

# HOW THE ENTIRE PRODUCT SHOULD BE STRUCTURED

This phase defines the operating system layer of SwasthYatra.

Before designing a single dashboard, route, card, workflow, animation, timeline or role experience, understand how the platform is organized.

Most AI-generated products fail because they design pages.

Elite products design systems.

Raycast does not feel premium because of its components.

It feels premium because every screen belongs to a larger navigation system.

SwasthYatra must follow the same principle.

---

# CORE PRINCIPLE

The platform should not feel like:

A website

A dashboard

A portal

A collection of pages

The platform should feel like:

A Healthcare Navigation Operating System

The user should feel:

I am inside a system.

Not:

I am browsing webpages.

---

# GLOBAL APPLICATION SHELL

Every authenticated experience should share a consistent operating shell.

The shell consists of:

Sidebar

↓

Page Header

↓

Primary Workspace

↓

Context Rail

↓

Command Layer

Every route should fit inside this structure.

---

# GLOBAL LAYOUT STRUCTURE

Desktop Layout

```text
┌────────────┬─────────────────────────────┬───────────────┐
│            │                             │               │
│            │                             │               │
│ Sidebar    │ Primary Workspace           │ Context Rail  │
│            │                             │               │
│            │                             │               │
└────────────┴─────────────────────────────┴───────────────┘
```

This becomes the foundation of the entire product.

---

# SIDEBAR

The sidebar is not navigation.

The sidebar is an operational layer.

Inspired by Raycast.

Every section must provide value.

Never leave it empty.

Never use it as a simple route list.

---

# SIDEBAR STRUCTURE

Top Section

Logo

Current Role

Current Organization

Current Location

---

Primary Navigation

Dashboard

Journey

Provider Network

Communication

Medication Guide

Health Passport

Medical Vault

Care Outcomes

Documentation

Demo

---

Role-Specific Navigation

Patient

Doctor

Pharmacist

Hospital

Organization

Operator

---

Pinned Actions

Create Journey

Find Care

Open Interpreter

Search Medication

Contact Support

---

Recent Activity

Provider Confirmed

Communication Ready

Journey Updated

Medication Guide Ready

Recent Events

---

Command Palette Hint

⌘K

or

Ctrl + K

Always visible.

---

# SIDEBAR BEHAVIOR

Inspired by Raycast.

Collapsed Mode

Expanded Mode

Hover Expansion

Keyboard Navigation

Search Integration

Pinned Items

Recent Items

Role Context

The sidebar should feel alive.

Not static.

---

# PAGE HEADER

Every page needs a meaningful header.

Not:

Dashboard

Provider

Communication

Settings

These are weak headers.

---

Headers should establish context.

Examples:

Current Care Journey

Recommended Care Options

Communication Center

Traveler Support Overview

Operations Center

Medication Guidance

Provider Network

The title should immediately explain purpose.

---

# HEADER STRUCTURE

Page Title

↓

Page Description

↓

Context Actions

↓

Status Information

---

Example

Current Care Journey

Track progress, provider updates and communication throughout your care experience.

[ Contact Provider ]
[ Open Interpreter ]
[ Share Passport ]

Status:
Provider Confirmed

---

# PRIMARY WORKSPACE

The center workspace is where work happens.

This is the most important area.

Every page should prioritize:

Current Work

Current Status

Next Action

Recent Progress

Never:

Random charts

Decorative cards

Artificial metrics

---

# CONTEXT RAIL

The right rail is mandatory.

Most AI-generated products leave huge dead space.

We do not.

The context rail provides:

Relevant Information

Recent Activity

Suggestions

Progress

Context

Next Steps

Role-Specific Details

---

# EXAMPLE

Patient Dashboard

Context Rail

Current Location

Emergency Contact

Provider Status

Journey Progress

Recent Updates

Recommended Actions

---

Doctor Dashboard

Context Rail

Today's Availability

Active Assignments

Interpreter Requests

Recent Communications

---

Operator Dashboard

Context Rail

Open Escalations

Priority Cases

Provider Delays

System Activity

---

# COMMAND PALETTE

This is one of the most important features in the product.

Treat it as a first-class operating system layer.

Reference:

Raycast

---

# PURPOSE

The command palette should provide access to everything.

The user should never feel lost.

The user should never hunt through menus.

---

# EXAMPLES

Create Journey

Find Care

Search Medication

Open Interpreter

View Provider Network

View Outcomes

Switch Role

Switch Organization

Open Documentation

Open Demo

Open Agent Workspace

Search Everything

---

# COMMAND PALETTE BEHAVIOR

Instant

Keyboard-first

Searchable

Context-aware

Role-aware

Recent actions

Pinned actions

Suggestions

Navigation

Commands

Everything accessible.

---

# PAGE COMPOSITION RULES

Every page should follow:

Primary Content

↓

Supporting Context

↓

Activity

↓

Actions

↓

Narrative

Never:

Hero

↓

Empty Space

↓

Random Widgets

↓

Charts

---

# PAGE DENSITY RULE

Density should feel:

Raycast

Linear

Apple Pro Apps

Not:

Notion dashboards

Generic SaaS dashboards

Startup templates

---

# NO DEAD SPACE RULE

No region should feel abandoned.

No region should feel unfinished.

Every visible area must contain:

Context

Activity

Status

Progress

Actions

Guidance

Narrative

Suggestions

Relevant Information

Never filler.

Never placeholders.

Never fake analytics.

---

# ACTIVITY SYSTEM

Activity should exist throughout the platform.

The system should feel alive.

Examples:

Provider Confirmed

2 min ago

Translation Prepared

5 min ago

Medication Guidance Updated

8 min ago

Follow-Up Scheduled

15 min ago

Activity creates confidence.

---

# STATUS SYSTEM

Status should always be visible.

Users should never wonder:

What is happening?

Status examples:

Journey Active

Provider Confirmed

Waiting For Response

Communication Ready

Care Completed

Follow-Up Scheduled

Status should be obvious.

---

# ACTION SYSTEM

Every page should expose meaningful actions.

Not hidden actions.

Not buried actions.

Examples:

Contact Provider

Open Interpreter

Share Passport

Find Care

Search Medication

Resolve Escalation

Assign Provider

Actions should feel accessible.

---

# RESPONSIVE BEHAVIOR

Desktop

Full Operating System Layout

Sidebar

Workspace

Context Rail

---

Tablet

Sidebar

Workspace

Context Drawer

---

Mobile

Bottom Navigation

Context Drawer

Floating Command Button

Do not simply stack desktop layouts.

Design intentionally.

---

# ROLE AWARENESS

The layout should adapt to roles.

Patient

Doctor

Pharmacist

Hospital

Organization

Operator

The structure remains consistent.

The content changes.

The user should always feel:

This system was built specifically for me.

---

# FINAL TEST

Before designing any route ask:

What is the primary work?

What context supports that work?

What actions matter?

What activity matters?

What status matters?

What should happen next?

Where does that information live?

If the answer is unclear:

The layout is wrong.

---

# SUCCESS CRITERIA

The platform should feel like:

Raycast-level navigation

Linear-level clarity

Apple-level organization

Airtable-level operations

Cursor-level activity

Tsenta-level storytelling

all inside a Healthcare Navigation Operating System.

The user should never feel like they are navigating pages.

They should feel like they are moving through a coordinated healthcare network.


# PHASE 4

# GLOBAL LAYOUT ARCHITECTURE & NAVIGATION SYSTEM

# HOW THE ENTIRE PRODUCT SHOULD BE STRUCTURED

This phase defines the operating system layer of SwasthYatra.

Before designing a single dashboard, route, card, workflow, animation, timeline or role experience, understand how the platform is organized.

Most AI-generated products fail because they design pages.

Elite products design systems.

Raycast does not feel premium because of its components.

It feels premium because every screen belongs to a larger navigation system.

SwasthYatra must follow the same principle.

---

# CORE PRINCIPLE

The platform should not feel like:

A website

A dashboard

A portal

A collection of pages

The platform should feel like:

A Healthcare Navigation Operating System

The user should feel:

I am inside a system.

Not:

I am browsing webpages.

---

# GLOBAL APPLICATION SHELL

Every authenticated experience should share a consistent operating shell.

The shell consists of:

Sidebar

↓

Page Header

↓

Primary Workspace

↓

Context Rail

↓

Command Layer

Every route should fit inside this structure.

---

# GLOBAL LAYOUT STRUCTURE

Desktop Layout

```text
┌────────────┬─────────────────────────────┬───────────────┐
│            │                             │               │
│            │                             │               │
│ Sidebar    │ Primary Workspace           │ Context Rail  │
│            │                             │               │
│            │                             │               │
└────────────┴─────────────────────────────┴───────────────┘
```

This becomes the foundation of the entire product.

---

# SIDEBAR

The sidebar is not navigation.

The sidebar is an operational layer.

Inspired by Raycast.

Every section must provide value.

Never leave it empty.

Never use it as a simple route list.

---

# SIDEBAR STRUCTURE

Top Section

Logo

Current Role

Current Organization

Current Location

---

Primary Navigation

Dashboard

Journey

Provider Network

Communication

Medication Guide

Health Passport

Medical Vault

Care Outcomes

Documentation

Demo

---

Role-Specific Navigation

Patient

Doctor

Pharmacist

Hospital

Organization

Operator

---

Pinned Actions

Create Journey

Find Care

Open Interpreter

Search Medication

Contact Support

---

Recent Activity

Provider Confirmed

Communication Ready

Journey Updated

Medication Guide Ready

Recent Events

---

Command Palette Hint

⌘K

or

Ctrl + K

Always visible.

---

# SIDEBAR BEHAVIOR

Inspired by Raycast.

Collapsed Mode

Expanded Mode

Hover Expansion

Keyboard Navigation

Search Integration

Pinned Items

Recent Items

Role Context

The sidebar should feel alive.

Not static.

---

# PAGE HEADER

Every page needs a meaningful header.

Not:

Dashboard

Provider

Communication

Settings

These are weak headers.

---

Headers should establish context.

Examples:

Current Care Journey

Recommended Care Options

Communication Center

Traveler Support Overview

Operations Center

Medication Guidance

Provider Network

The title should immediately explain purpose.

---

# HEADER STRUCTURE

Page Title

↓

Page Description

↓

Context Actions

↓

Status Information

---

Example

Current Care Journey

Track progress, provider updates and communication throughout your care experience.

[ Contact Provider ]
[ Open Interpreter ]
[ Share Passport ]

Status:
Provider Confirmed

---

# PRIMARY WORKSPACE

The center workspace is where work happens.

This is the most important area.

Every page should prioritize:

Current Work

Current Status

Next Action

Recent Progress

Never:

Random charts

Decorative cards

Artificial metrics

---

# CONTEXT RAIL

The right rail is mandatory.

Most AI-generated products leave huge dead space.

We do not.

The context rail provides:

Relevant Information

Recent Activity

Suggestions

Progress

Context

Next Steps

Role-Specific Details

---

# EXAMPLE

Patient Dashboard

Context Rail

Current Location

Emergency Contact

Provider Status

Journey Progress

Recent Updates

Recommended Actions

---

Doctor Dashboard

Context Rail

Today's Availability

Active Assignments

Interpreter Requests

Recent Communications

---

Operator Dashboard

Context Rail

Open Escalations

Priority Cases

Provider Delays

System Activity

---

# COMMAND PALETTE

This is one of the most important features in the product.

Treat it as a first-class operating system layer.

Reference:

Raycast

---

# PURPOSE

The command palette should provide access to everything.

The user should never feel lost.

The user should never hunt through menus.

---

# EXAMPLES

Create Journey

Find Care

Search Medication

Open Interpreter

View Provider Network

View Outcomes

Switch Role

Switch Organization

Open Documentation

Open Demo

Open Agent Workspace

Search Everything

---

# COMMAND PALETTE BEHAVIOR

Instant

Keyboard-first

Searchable

Context-aware

Role-aware

Recent actions

Pinned actions

Suggestions

Navigation

Commands

Everything accessible.

---

# PAGE COMPOSITION RULES

Every page should follow:

Primary Content

↓

Supporting Context

↓

Activity

↓

Actions

↓

Narrative

Never:

Hero

↓

Empty Space

↓

Random Widgets

↓

Charts

---

# PAGE DENSITY RULE

Density should feel:

Raycast

Linear

Apple Pro Apps

Not:

Notion dashboards

Generic SaaS dashboards

Startup templates

---

# NO DEAD SPACE RULE

No region should feel abandoned.

No region should feel unfinished.

Every visible area must contain:

Context

Activity

Status

Progress

Actions

Guidance

Narrative

Suggestions

Relevant Information

Never filler.

Never placeholders.

Never fake analytics.

---

# ACTIVITY SYSTEM

Activity should exist throughout the platform.

The system should feel alive.

Examples:

Provider Confirmed

2 min ago

Translation Prepared

5 min ago

Medication Guidance Updated

8 min ago

Follow-Up Scheduled

15 min ago

Activity creates confidence.

---

# STATUS SYSTEM

Status should always be visible.

Users should never wonder:

What is happening?

Status examples:

Journey Active

Provider Confirmed

Waiting For Response

Communication Ready

Care Completed

Follow-Up Scheduled

Status should be obvious.

---

# ACTION SYSTEM

Every page should expose meaningful actions.

Not hidden actions.

Not buried actions.

Examples:

Contact Provider

Open Interpreter

Share Passport

Find Care

Search Medication

Resolve Escalation

Assign Provider

Actions should feel accessible.

---

# RESPONSIVE BEHAVIOR

Desktop

Full Operating System Layout

Sidebar

Workspace

Context Rail

---

Tablet

Sidebar

Workspace

Context Drawer

---

Mobile

Bottom Navigation

Context Drawer

Floating Command Button

Do not simply stack desktop layouts.

Design intentionally.

---

# ROLE AWARENESS

The layout should adapt to roles.

Patient

Doctor

Pharmacist

Hospital

Organization

Operator

The structure remains consistent.

The content changes.

The user should always feel:

This system was built specifically for me.

---

# FINAL TEST

Before designing any route ask:

What is the primary work?

What context supports that work?

What actions matter?

What activity matters?

What status matters?

What should happen next?

Where does that information live?

If the answer is unclear:

The layout is wrong.

---

# SUCCESS CRITERIA

The platform should feel like:

Raycast-level navigation

Linear-level clarity

Apple-level organization

Airtable-level operations

Cursor-level activity

Tsenta-level storytelling

all inside a Healthcare Navigation Operating System.

The user should never feel like they are navigating pages.

They should feel like they are moving through a coordinated healthcare network.


Exactly. Before we even reach Patient OS, Doctor OS, Pharmacist OS, etc., we need a completely separate Identity & Onboarding System.

Otherwise every user lands in a dashboard that doesn't know:

Who they are
Why they signed up
What role they have
What country they're traveling in
Whether they're a traveler or provider
Whether they're an organization admin
Whether they're a doctor or pharmacist

This should become Phase 6: Identity, Authentication & Onboarding Architecture.

User Lifecycle
Landing

↓

Google Authentication

↓

Welcome

↓

Role Selection

↓

Role Specific Onboarding

↓

Profile Completion

↓

Verification (if required)

↓

Workspace Provisioning

↓

Dashboard / OS

Never:

Google Login

↓

Dashboard
Authentication

Use:

Google Auth

Primary login method.

User clicks:

Continue with Google

Inspired by:

Linear
Vercel
Raycast
Welcome Screen

After first login.

Not dashboard.

Headline:

Welcome to SwasthYatra

Supporting text:

Let's set up your workspace so we can personalize your healthcare experience.

Progress:

Step 1 of 6
Role Selection

Most important onboarding step.

Question:

How will you use SwasthYatra?

Cards:

Traveler
Find care and navigate healthcare while traveling.
Doctor
Support travelers and manage care requests.
Pharmacist
Help travelers access safe medications.
Hospital
Coordinate incoming traveler cases.
Organization
Support travelers across your organization.
Medical Assistant
Assist travelers and coordinate care journeys.
Operator
Monitor journeys and resolve escalations.
Traveler Onboarding

Inspired by Linear onboarding.

Step 1

Basic Profile

Name

Country

Preferred Language

Time Zone
Step 2

Travel Context

Current Country

Destination Country

Travel Dates
Step 3

Medical Profile

Allergies

Conditions

Current Medications
Step 4

Insurance

Insurance Provider

Policy Details
Step 5

Emergency Contacts

Primary Contact

Relationship

Phone
Step 6

Health Passport Setup

Ready

Completion Screen:

Your healthcare profile is ready.

We'll use this information to coordinate care more effectively whenever you need assistance.
Doctor Onboarding

Step 1

Professional Profile

Name

Specialization

Languages

Step 2

Licensing

Country

License Number

Verification

Step 3

Availability

Hours

Timezone

Capacity

Step 4

Communication

WhatsApp

Phone

Email

Step 5

Provider Network

Join Provider Network
Pharmacist Onboarding

Step 1

Professional Information

Step 2

License Verification

Step 3

Medication Categories

Step 4

Languages

Step 5

Availability

Hospital Onboarding

Step 1

Hospital Information

Step 2

Services

Step 3

Emergency Capacity

Step 4

Languages

Step 5

Contact Channels

Organization Onboarding

Step 1

Organization Profile

Step 2

Industry

Step 3

Traveler Volume

Step 4

Team Members

Step 5

Support Preferences

Medical Assistant Onboarding

Step 1

Professional Information

Step 2

Languages

Step 3

Availability

Step 4

Care Coordination Experience

Dashboard Architecture

After onboarding:

Patient OS

Purpose:

Healthcare Navigation

Core Areas:

Current Journey

Journey Timeline

Care Options

Provider Status

Communication

Health Passport

Medication Guide

Documents

Care Outcomes
Doctor OS

Purpose:

Manage Traveler Care

Core Areas:

Assignments

Patients

Communication

Availability

Interpreter Sessions

Recent Activity
Pharmacist OS

Purpose:

Medication Coordination

Core Areas:

Medication Requests

Equivalent Medications

Interaction Alerts

Traveler Requests

Recent Consultations
Hospital OS

Purpose:

Healthcare Coordination

Core Areas:

Incoming Cases

Emergency Queue

Capacity Overview

Provider Availability

Communication Requests
Organization OS

Purpose:

Traveler Oversight

Core Areas:

Active Travelers

Care Journeys

Escalations

Care Outcomes

Provider Network

Reports
Medical Assistant OS

Purpose:

Care Coordination

Core Areas:

Assigned Travelers

Open Cases

Provider Coordination

Communication

Follow-Ups

Activity Feed
Operator OS

Purpose:

Mission Control

Core Areas:

Open Escalations

Failed Assignments

Provider Delays

Journey Monitoring

Manual Intervention

System Activity
Universal Layout

Every role dashboard:

Sidebar

↓

Header

↓

Primary Workspace

↓

Context Rail

↓

Activity Stream

But content changes completely depending on role.

Animation During Onboarding

Use:

Progress Bar

Linear-style.

Step Transitions

Framer Motion.

Route Transitions

GSAP.

Smooth Scroll

Lenis.

Success Completion

Subtle motion.

No celebration confetti.

No gamification.

Should feel:

Professional

Trustworthy

Premium

Healthcare Infrastructure

not consumer onboarding.

This onboarding system should exist completely outside all role dashboards and act as the gateway into the SwasthYatra Operating System. After this, the next phase should define each dashboard (Patient OS, Doctor OS, Pharmacist OS, Organization OS, Medical Assistant OS, Operator OS) screen-by-screen with exact components, activity feeds, timelines, context rails, actions, and motion behavior.


# PHASE 7

# PATIENT OPERATING SYSTEM

# THE TRAVELER EXPERIENCE

The Patient Operating System is the heart of SwasthYatra.

Everything else exists to support the traveler.

Doctors.

Pharmacists.

Hospitals.

Organizations.

Operators.

Communication.

Provider Network.

All ultimately serve the traveler.

---

# DESIGN OBJECTIVE

The traveler should feel:

Supported.

Guided.

Safe.

Informed.

Confident.

Never:

Overwhelmed.

Lost.

Confused.

Abandoned.

The platform should answer:

What is happening?

What should I do next?

Who is helping me?

---

# PATIENT OS STRUCTURE

Patient OS consists of:

Overview

Journey

Communication

Health Passport

Medical History

Medication Guide

Medical Vault

Care Outcomes

Settings

Support

---

# GLOBAL LAYOUT

```text
Sidebar

↓

Page Header

↓

Primary Workspace

↓

Context Rail

↓

Activity Stream
```

Every page follows this pattern.

---

# PATIENT HOME

Purpose:

Provide a real-time overview of the traveler's healthcare situation.

Not analytics.

Not reports.

Current healthcare state.

---

# Layout

Header

↓

Current Journey Card

↓

Journey Timeline

↓

Provider Status

↓

Communication Status

↓

Recent Activity

↓

Recommended Actions

---

# Hero Component

Current Care Journey

Status:

Provider Confirmed

Started:

12 minutes ago

Location:

Tokyo, Japan

---

Actions:

Open Journey

Contact Provider

Open Interpreter

View Passport

---

# Journey Timeline

Visual vertical timeline.

Example:

Assessment Complete

↓

Care Options Reviewed

↓

Provider Contacted

↓

Provider Confirmed

↓

Communication Ready

↓

Treatment Scheduled

↓

Outcome Recorded

---

Timeline should animate progressively.

Not appear all at once.

---

# Context Rail

Current Location

Current Provider

Language Support

Insurance Status

Emergency Contact

Next Appointment

---

# Activity Feed

Provider confirmed

2 minutes ago

Translation prepared

5 minutes ago

Care recommendation updated

8 minutes ago

Passport shared

12 minutes ago

The platform should feel alive.

---

# JOURNEY PAGE

Purpose:

Complete visibility into a healthcare journey.

---

Layout

Journey Header

↓

Timeline

↓

Provider Section

↓

Communication

↓

Documents

↓

Recommendations

---

# Journey Header

Food Poisoning Assessment

Tokyo, Japan

Status:

In Progress

Severity:

Moderate

Provider:

Confirmed

---

# Journey Story Cards

Assessment Complete

Symptoms reviewed.

---

Provider Confirmed

A provider is available.

---

Communication Ready

Translation prepared.

---

Treatment Scheduled

Awaiting consultation.

---

These cards use Tsenta-style storytelling.

---

# PROVIDER SECTION

Do NOT show:

Provider Scores

Provider Intelligence

Provider Algorithms

---

Show:

Recommended Care Options

Each provider card:

Name

Availability

Languages

Distance

Specialization

Support Methods

---

Actions:

Contact

Call

Open Directions

Share Passport

---

# COMMUNICATION CENTER

Purpose:

Coordinate care.

Not chat.

---

Layout

Conversation

↓

Provider Updates

↓

Translation Support

↓

Quick Actions

---

# Conversation

WhatsApp-like experience.

Clean.

Professional.

Healthcare-focused.

---

# Translation Layer

Every message can be:

Original

↓

Translated

User should never struggle with language barriers.

---

# HEALTH PASSPORT

Purpose:

Portable healthcare identity.

---

Layout

Personal Information

↓

Medical Information

↓

Current Medications

↓

Allergies

↓

Insurance

↓

Emergency Contacts

↓

Documents

---

# Share Passport

Primary CTA.

Generate secure share link.

QR code.

Temporary access.

---

# MEDICAL HISTORY

Purpose:

Long-term healthcare context.

---

Sections

Conditions

Procedures

Allergies

Previous Care Journeys

Medication History

Documents

---

Timeline-based.

Not table-based.

---

# MEDICATION GUIDE

Purpose:

Help travelers understand local medications.

---

Example

Tylenol

↓

Local Equivalent

Calonal

↓

Usage Information

↓

Interaction Notes

↓

Safety Notes

---

Do not show:

Drug Graph

Ingredient Engine

Internal systems

---

Use human language.

---

# MEDICAL VAULT

Purpose:

Store important healthcare documents.

---

Sections

Prescriptions

Insurance Documents

Lab Reports

Medical Reports

Vaccination Records

Travel Documents

---

Layout

Document Cards

Preview

Download

Share

History

---

# CARE OUTCOMES

Purpose:

Show completed healthcare journeys.

Build confidence.

---

Each outcome:

Problem

Provider

Treatment

Resolution

Follow-Up

Traveler Feedback

---

Example

Food Poisoning

Tokyo

Resolved

Provider Assisted

Recovery Confirmed

---

# EMPTY STATE DESIGN

Never:

No journeys found.

---

Instead:

No active care journeys.

You're all set.

If you need healthcare support while traveling, start a journey and we'll guide you through the process.

[ Start Journey ]

---

# ANIMATION SYSTEM

Micro

Buttons

Badges

Selections

80-120ms

---

Structural

Cards

Panels

Lists

180-250ms

---

Narrative

Timeline

Journey progression

Provider confirmation

Communication readiness

500-700ms

---

# SUCCESS CRITERIA

The Patient OS should feel:

Raycast-quality UI

Linear-quality UX

Tsenta-quality storytelling

Stripe-quality trust

Cursor-quality activity

The traveler should never feel like they are using a dashboard.

They should feel like they are navigating healthcare with a trusted guide beside them.


# PHASE 8

# DOCTOR OPERATING SYSTEM

# CARE DELIVERY WORKSPACE

The Doctor Operating System is fundamentally different from the Patient Operating System.

Patients seek clarity.

Doctors deliver care.

Do not design the Doctor OS as a healthcare dashboard.

Do not design it as an analytics platform.

Do not design it as a CRM.

Do not design it as a patient record viewer.

The Doctor OS is a Care Delivery Workspace.

Every element should help doctors:

Review

Decide

Communicate

Treat

Resolve

with minimal friction.

---

# DESIGN OBJECTIVE

Doctors should feel:

Efficient

Prepared

Focused

Supported

In control

Never:

Distracted

Overwhelmed

Delayed

Buried in analytics

---

# QUESTIONS THE DOCTOR OS MUST ANSWER

Who needs my attention?

What is urgent?

What context do I need?

What should I do next?

What conversations require action?

What patients are waiting?

---

# PRIMARY WORKSPACE

The Doctor OS should feel:

Linear + Raycast

Not:

Epic EMR

Hospital ERP

Enterprise Software

Healthcare CRM

The interface should be modern, fast and operational.

---

# CORE MODULES

Doctor Home

Assignments

Patients

Communication

Interpreter Sessions

Availability

Outcomes

Profile

Settings

---

# DOCTOR HOME

Purpose:

Provide immediate visibility into active responsibilities.

---

# Layout

Today's Assignments

↓

Waiting Patients

↓

Upcoming Consultations

↓

Recent Activity

↓

Availability Status

↓

Quick Actions

---

# Header

Good Morning, Dr. Sharma

Today's Care Requests

7 Active Assignments

2 Waiting Responses

1 Interpreter Session Scheduled

---

# Quick Actions

Update Availability

Open Communication Center

View Assignments

Start Consultation

Search Patient

---

# Assignment Overview

Cards:

Traveler Name

Location

Issue Summary

Priority

Status

Communication Status

Time Waiting

---

Example

Sarah Johnson

Tokyo, Japan

Food Poisoning

Awaiting Review

Translation Available

Waiting 12 Minutes

---

# ASSIGNMENTS PAGE

Purpose:

Manage active care requests.

This is the most important page.

---

# Layout

Assignment Queue

↓

Assignment Details

↓

Patient Context

↓

Actions

---

# Assignment Card

Traveler

Location

Symptoms

Priority

Status

Language

Insurance

Assigned Time

---

Actions

Accept

Review

Contact

Schedule

Transfer

---

# Assignment Detail View

Problem Summary

Medical History Snapshot

Current Medications

Allergies

Travel Context

Recent Communications

Documents

Timeline

---

The doctor should never need to search for context.

Context should already be prepared.

---

# PATIENT DETAIL PAGE

Purpose:

Single source of truth.

---

# Sections

Traveler Overview

Medical History

Current Journey

Documents

Communication

Medications

Allergies

Passport

Care Timeline

---

# Care Timeline

Assessment Completed

↓

Provider Assigned

↓

Consultation Scheduled

↓

Treatment Recommended

↓

Follow-Up Planned

↓

Outcome Recorded

---

Timeline should feel like a journey.

Not a log.

---

# COMMUNICATION CENTER

Purpose:

Coordinate care.

Not messaging.

---

# Layout

Conversation Panel

↓

Patient Context Panel

↓

Translation Panel

↓

Actions Panel

---

# Features

Voice

Messaging

Translation

Document Sharing

Passport Sharing

Appointment Coordination

---

# INTERPRETER SESSIONS

Purpose:

Language support.

---

# Layout

Upcoming Sessions

↓

Live Sessions

↓

Completed Sessions

---

# Session Card

Traveler

Provider

Languages

Time

Status

---

Actions

Join

Reschedule

Review Notes

---

# AVAILABILITY PAGE

Purpose:

Manage capacity.

---

# Sections

Current Status

Weekly Availability

Upcoming Commitments

Capacity Overview

---

# States

Available

Busy

Unavailable

On Call

Vacation

---

# OUTCOMES PAGE

Purpose:

Review completed cases.

Build trust.

Support future improvements.

---

# Each Outcome

Traveler

Condition

Treatment

Resolution

Follow-Up

Feedback

---

# Context Rail

Always visible.

Contains:

Today's Availability

Active Cases

Pending Responses

Upcoming Sessions

Recent Activity

---

# Activity Feed

Patient Responded

3 min ago

Passport Shared

7 min ago

Interpreter Scheduled

12 min ago

Consultation Completed

22 min ago

The doctor should always know what changed.

---

# EMPTY STATES

Never:

No assignments.

---

Instead:

No active assignments.

You're currently available for new traveler requests.

Availability:
Active

[ Update Availability ]

---

# ANIMATION SYSTEM

Micro

Buttons

Selections

Badges

Status Changes

80–120ms

---

Structural

Assignment Cards

Patient Lists

Communication Panels

180–250ms

---

Narrative

Case Progression

Treatment Completion

Outcome Recording

500–700ms

---

# CONTENT LANGUAGE

Never:

AI Analysis

Provider Intelligence

Graph Score

Outcome Engine

Internal Runtime

---

Use:

Traveler Context

Recommended Care Options

Communication Ready

Care Outcome

Follow-Up Status

Treatment Summary

Human language only.

---

# SUCCESS CRITERIA

The Doctor OS should feel like:

A modern care delivery workspace.

Not hospital software.

Not enterprise software.

Not healthcare administration software.

The doctor should feel:

Prepared.

Efficient.

Supported.

In control.

Every click should move care forward.

The Doctor OS should embody:

Raycast-quality UI

Linear-quality workflow design

Stripe-quality trust

Cursor-quality activity awareness

while remaining purpose-built for healthcare delivery.


# PHASE 8

# DOCTOR OPERATING SYSTEM

# CARE DELIVERY WORKSPACE

The Doctor Operating System is fundamentally different from the Patient Operating System.

Patients seek clarity.

Doctors deliver care.

Do not design the Doctor OS as a healthcare dashboard.

Do not design it as an analytics platform.

Do not design it as a CRM.

Do not design it as a patient record viewer.

The Doctor OS is a Care Delivery Workspace.

Every element should help doctors:

Review

Decide

Communicate

Treat

Resolve

with minimal friction.

---

# DESIGN OBJECTIVE

Doctors should feel:

Efficient

Prepared

Focused

Supported

In control

Never:

Distracted

Overwhelmed

Delayed

Buried in analytics

---

# QUESTIONS THE DOCTOR OS MUST ANSWER

Who needs my attention?

What is urgent?

What context do I need?

What should I do next?

What conversations require action?

What patients are waiting?

---

# PRIMARY WORKSPACE

The Doctor OS should feel:

Linear + Raycast

Not:

Epic EMR

Hospital ERP

Enterprise Software

Healthcare CRM

The interface should be modern, fast and operational.

---

# CORE MODULES

Doctor Home

Assignments

Patients

Communication

Interpreter Sessions

Availability

Outcomes

Profile

Settings

---

# DOCTOR HOME

Purpose:

Provide immediate visibility into active responsibilities.

---

# Layout

Today's Assignments

↓

Waiting Patients

↓

Upcoming Consultations

↓

Recent Activity

↓

Availability Status

↓

Quick Actions

---

# Header

Good Morning, Dr. Sharma

Today's Care Requests

7 Active Assignments

2 Waiting Responses

1 Interpreter Session Scheduled

---

# Quick Actions

Update Availability

Open Communication Center

View Assignments

Start Consultation

Search Patient

---

# Assignment Overview

Cards:

Traveler Name

Location

Issue Summary

Priority

Status

Communication Status

Time Waiting

---

Example

Sarah Johnson

Tokyo, Japan

Food Poisoning

Awaiting Review

Translation Available

Waiting 12 Minutes

---

# ASSIGNMENTS PAGE

Purpose:

Manage active care requests.

This is the most important page.

---

# Layout

Assignment Queue

↓

Assignment Details

↓

Patient Context

↓

Actions

---

# Assignment Card

Traveler

Location

Symptoms

Priority

Status

Language

Insurance

Assigned Time

---

Actions

Accept

Review

Contact

Schedule

Transfer

---

# Assignment Detail View

Problem Summary

Medical History Snapshot

Current Medications

Allergies

Travel Context

Recent Communications

Documents

Timeline

---

The doctor should never need to search for context.

Context should already be prepared.

---

# PATIENT DETAIL PAGE

Purpose:

Single source of truth.

---

# Sections

Traveler Overview

Medical History

Current Journey

Documents

Communication

Medications

Allergies

Passport

Care Timeline

---

# Care Timeline

Assessment Completed

↓

Provider Assigned

↓

Consultation Scheduled

↓

Treatment Recommended

↓

Follow-Up Planned

↓

Outcome Recorded

---

Timeline should feel like a journey.

Not a log.

---

# COMMUNICATION CENTER

Purpose:

Coordinate care.

Not messaging.

---

# Layout

Conversation Panel

↓

Patient Context Panel

↓

Translation Panel

↓

Actions Panel

---

# Features

Voice

Messaging

Translation

Document Sharing

Passport Sharing

Appointment Coordination

---

# INTERPRETER SESSIONS

Purpose:

Language support.

---

# Layout

Upcoming Sessions

↓

Live Sessions

↓

Completed Sessions

---

# Session Card

Traveler

Provider

Languages

Time

Status

---

Actions

Join

Reschedule

Review Notes

---

# AVAILABILITY PAGE

Purpose:

Manage capacity.

---

# Sections

Current Status

Weekly Availability

Upcoming Commitments

Capacity Overview

---

# States

Available

Busy

Unavailable

On Call

Vacation

---

# OUTCOMES PAGE

Purpose:

Review completed cases.

Build trust.

Support future improvements.

---

# Each Outcome

Traveler

Condition

Treatment

Resolution

Follow-Up

Feedback

---

# Context Rail

Always visible.

Contains:

Today's Availability

Active Cases

Pending Responses

Upcoming Sessions

Recent Activity

---

# Activity Feed

Patient Responded

3 min ago

Passport Shared

7 min ago

Interpreter Scheduled

12 min ago

Consultation Completed

22 min ago

The doctor should always know what changed.

---

# EMPTY STATES

Never:

No assignments.

---

Instead:

No active assignments.

You're currently available for new traveler requests.

Availability:
Active

[ Update Availability ]

---

# ANIMATION SYSTEM

Micro

Buttons

Selections

Badges

Status Changes

80–120ms

---

Structural

Assignment Cards

Patient Lists

Communication Panels

180–250ms

---

Narrative

Case Progression

Treatment Completion

Outcome Recording

500–700ms

---

# CONTENT LANGUAGE

Never:

AI Analysis

Provider Intelligence

Graph Score

Outcome Engine

Internal Runtime

---

Use:

Traveler Context

Recommended Care Options

Communication Ready

Care Outcome

Follow-Up Status

Treatment Summary

Human language only.

---

# SUCCESS CRITERIA

The Doctor OS should feel like:

A modern care delivery workspace.

Not hospital software.

Not enterprise software.

Not healthcare administration software.

The doctor should feel:

Prepared.

Efficient.

Supported.

In control.

Every click should move care forward.

The Doctor OS should embody:

Raycast-quality UI

Linear-quality workflow design

Stripe-quality trust

Cursor-quality activity awareness

while remaining purpose-built for healthcare delivery.


# PHASE 8

# DOCTOR OPERATING SYSTEM

# CARE DELIVERY WORKSPACE

The Doctor Operating System is fundamentally different from the Patient Operating System.

Patients seek clarity.

Doctors deliver care.

Do not design the Doctor OS as a healthcare dashboard.

Do not design it as an analytics platform.

Do not design it as a CRM.

Do not design it as a patient record viewer.

The Doctor OS is a Care Delivery Workspace.

Every element should help doctors:

Review

Decide

Communicate

Treat

Resolve

with minimal friction.

---

# DESIGN OBJECTIVE

Doctors should feel:

Efficient

Prepared

Focused

Supported

In control

Never:

Distracted

Overwhelmed

Delayed

Buried in analytics

---

# QUESTIONS THE DOCTOR OS MUST ANSWER

Who needs my attention?

What is urgent?

What context do I need?

What should I do next?

What conversations require action?

What patients are waiting?

---

# PRIMARY WORKSPACE

The Doctor OS should feel:

Linear + Raycast

Not:

Epic EMR

Hospital ERP

Enterprise Software

Healthcare CRM

The interface should be modern, fast and operational.

---

# CORE MODULES

Doctor Home

Assignments

Patients

Communication

Interpreter Sessions

Availability

Outcomes

Profile

Settings

---

# DOCTOR HOME

Purpose:

Provide immediate visibility into active responsibilities.

---

# Layout

Today's Assignments

↓

Waiting Patients

↓

Upcoming Consultations

↓

Recent Activity

↓

Availability Status

↓

Quick Actions

---

# Header

Good Morning, Dr. Sharma

Today's Care Requests

7 Active Assignments

2 Waiting Responses

1 Interpreter Session Scheduled

---

# Quick Actions

Update Availability

Open Communication Center

View Assignments

Start Consultation

Search Patient

---

# Assignment Overview

Cards:

Traveler Name

Location

Issue Summary

Priority

Status

Communication Status

Time Waiting

---

Example

Sarah Johnson

Tokyo, Japan

Food Poisoning

Awaiting Review

Translation Available

Waiting 12 Minutes

---

# ASSIGNMENTS PAGE

Purpose:

Manage active care requests.

This is the most important page.

---

# Layout

Assignment Queue

↓

Assignment Details

↓

Patient Context

↓

Actions

---

# Assignment Card

Traveler

Location

Symptoms

Priority

Status

Language

Insurance

Assigned Time

---

Actions

Accept

Review

Contact

Schedule

Transfer

---

# Assignment Detail View

Problem Summary

Medical History Snapshot

Current Medications

Allergies

Travel Context

Recent Communications

Documents

Timeline

---

The doctor should never need to search for context.

Context should already be prepared.

---

# PATIENT DETAIL PAGE

Purpose:

Single source of truth.

---

# Sections

Traveler Overview

Medical History

Current Journey

Documents

Communication

Medications

Allergies

Passport

Care Timeline

---

# Care Timeline

Assessment Completed

↓

Provider Assigned

↓

Consultation Scheduled

↓

Treatment Recommended

↓

Follow-Up Planned

↓

Outcome Recorded

---

Timeline should feel like a journey.

Not a log.

---

# COMMUNICATION CENTER

Purpose:

Coordinate care.

Not messaging.

---

# Layout

Conversation Panel

↓

Patient Context Panel

↓

Translation Panel

↓

Actions Panel

---

# Features

Voice

Messaging

Translation

Document Sharing

Passport Sharing

Appointment Coordination

---

# INTERPRETER SESSIONS

Purpose:

Language support.

---

# Layout

Upcoming Sessions

↓

Live Sessions

↓

Completed Sessions

---

# Session Card

Traveler

Provider

Languages

Time

Status

---

Actions

Join

Reschedule

Review Notes

---

# AVAILABILITY PAGE

Purpose:

Manage capacity.

---

# Sections

Current Status

Weekly Availability

Upcoming Commitments

Capacity Overview

---

# States

Available

Busy

Unavailable

On Call

Vacation

---

# OUTCOMES PAGE

Purpose:

Review completed cases.

Build trust.

Support future improvements.

---

# Each Outcome

Traveler

Condition

Treatment

Resolution

Follow-Up

Feedback

---

# Context Rail

Always visible.

Contains:

Today's Availability

Active Cases

Pending Responses

Upcoming Sessions

Recent Activity

---

# Activity Feed

Patient Responded

3 min ago

Passport Shared

7 min ago

Interpreter Scheduled

12 min ago

Consultation Completed

22 min ago

The doctor should always know what changed.

---

# EMPTY STATES

Never:

No assignments.

---

Instead:

No active assignments.

You're currently available for new traveler requests.

Availability:
Active

[ Update Availability ]

---

# ANIMATION SYSTEM

Micro

Buttons

Selections

Badges

Status Changes

80–120ms

---

Structural

Assignment Cards

Patient Lists

Communication Panels

180–250ms

---

Narrative

Case Progression

Treatment Completion

Outcome Recording

500–700ms

---

# CONTENT LANGUAGE

Never:

AI Analysis

Provider Intelligence

Graph Score

Outcome Engine

Internal Runtime

---

Use:

Traveler Context

Recommended Care Options

Communication Ready

Care Outcome

Follow-Up Status

Treatment Summary

Human language only.

---

# SUCCESS CRITERIA

The Doctor OS should feel like:

A modern care delivery workspace.

Not hospital software.

Not enterprise software.

Not healthcare administration software.

The doctor should feel:

Prepared.

Efficient.

Supported.

In control.

Every click should move care forward.

The Doctor OS should embody:

Raycast-quality UI

Linear-quality workflow design

Stripe-quality trust

Cursor-quality activity awareness

while remaining purpose-built for healthcare delivery.


# PHASE 10

# HOSPITAL OPERATING SYSTEM

# HEALTHCARE COORDINATION & CAPACITY NETWORK

The Hospital Operating System is not a Hospital Management System.

It is not an ERP.

It is not a billing platform.

It is not an administrative tool.

It is not an EMR replacement.

The Hospital OS exists to help hospitals coordinate care for travelers within the SwasthYatra Healthcare Navigation Network.

The hospital acts as a coordination hub between:

Travelers

↓

Doctors

↓

Departments

↓

Interpreters

↓

Pharmacists

↓

Emergency Services

↓

Care Outcomes

The Hospital OS should feel like healthcare infrastructure.

Not healthcare administration software.

---

# DESIGN OBJECTIVE

Hospitals should feel:

Coordinated

Prepared

Responsive

In Control

Efficient

The interface should communicate:

Capacity

Visibility

Coordination

Readiness

Never:

Analytics-heavy

Administrative

Spreadsheet-driven

Overwhelming

---

# QUESTIONS THE HOSPITAL OS MUST ANSWER

What cases are incoming?

What requires immediate attention?

What departments are available?

What providers are available?

What capacity exists right now?

What travelers need assistance?

What communication barriers exist?

What should happen next?

---

# CORE MODULES

Hospital Home

Incoming Cases

Emergency Queue

Departments

Provider Availability

Interpreter Requests

Communication Center

Traveler Monitoring

Care Coordination

Outcomes

Hospital Profile

Settings

---

# HOSPITAL HOME

Purpose:

Provide a live operational overview.

Not reports.

Not analytics.

Current operational readiness.

---

# Layout

Incoming Cases

↓

Emergency Queue

↓

Department Status

↓

Provider Availability

↓

Interpreter Requests

↓

Recent Activity

↓

Quick Actions

---

# Header

Good Morning

Healthcare Coordination Center

Hospital Name

---

Today's Activity

18 Incoming Cases

4 Emergency Requests

7 Interpreter Requests

26 Available Providers

---

# Quick Actions

Review Cases

Assign Provider

Open Interpreter Queue

Manage Capacity

Communication Center

---

# INCOMING CASES

Purpose:

Primary operational queue.

---

# Case Card

Traveler

Location

Issue Summary

Priority

Department

Status

Language

Arrival Time

---

Example

Sarah Johnson

Tokyo

Food Poisoning

Medium Priority

Internal Medicine

Awaiting Assignment

English

12 Minutes Ago

---

# Actions

Assign

Review

Contact

Transfer

Escalate

---

# EMERGENCY QUEUE

Purpose:

Highest priority cases.

---

# Layout

Critical Cases

↓

Active Emergency Cases

↓

Emergency Capacity

↓

Escalation Queue

---

# Emergency Card

Traveler

Issue

Severity

Response Status

Assigned Team

Time Waiting

---

Example

Michael Adams

Severe Allergic Reaction

Critical

Team Assigned

3 Minutes Ago

---

# Visual Language

Emergency should be visible.

Not dramatic.

Not alarming.

Clear.

Immediate.

Operational.

---

# DEPARTMENTS PAGE

Purpose:

Coordinate care routing.

---

# Sections

Emergency

Internal Medicine

Pediatrics

Orthopedics

Dermatology

Cardiology

General Practice

Pharmacy

Specialty Services

---

# Department Card

Department Name

Available Providers

Current Load

Interpreter Availability

Open Requests

---

# PROVIDER AVAILABILITY

Purpose:

Understand care capacity.

---

# Layout

Available Providers

↓

Busy Providers

↓

On-Call Providers

↓

Unavailable Providers

---

# Provider Card

Name

Department

Languages

Availability

Current Cases

Response Time

---

# Example

Dr. Sharma

Internal Medicine

English • Japanese

Available

2 Active Cases

---

# INTERPRETER REQUESTS

Purpose:

Coordinate language support.

---

# Layout

Open Requests

↓

Active Sessions

↓

Scheduled Sessions

↓

Completed Sessions

---

# Request Card

Traveler

Languages

Provider

Status

Time

---

Example

Traveler

English

Provider

Japanese

Status

Waiting

Time

5 Minutes

---

# COMMUNICATION CENTER

Purpose:

Coordinate conversations across departments.

---

# Includes

Traveler Communication

Doctor Communication

Interpreter Communication

Care Updates

Case Coordination

---

# Layout

Conversations

↓

Case Context

↓

Translation Layer

↓

Actions

---

# TRAVELER MONITORING

Purpose:

Visibility across active travelers.

---

# Layout

Active Travelers

↓

Care Status

↓

Department Assignment

↓

Communication Status

↓

Follow-Up Status

---

# Traveler Card

Traveler

Current Department

Provider

Status

Next Step

---

Example

Sarah Johnson

Internal Medicine

Dr. Sharma

Provider Assigned

Consultation Scheduled

---

# CARE COORDINATION CENTER

Purpose:

Mission Control for hospital operations.

---

# Layout

Open Cases

↓

Assignments

↓

Communication

↓

Interpreter Support

↓

Department Routing

↓

Activity Feed

---

This is the operational heart of the Hospital OS.

---

# CARE OUTCOMES

Purpose:

Review completed care journeys.

---

# Sections

Resolved Cases

Follow-Ups

Traveler Feedback

Recovery Status

Care Summaries

---

# Example Outcome

Traveler

Food Poisoning

Department

Internal Medicine

Provider

Dr. Sharma

Status

Resolved

Follow-Up

Completed

---

# CONTEXT RAIL

Always visible.

Contains:

Hospital Capacity

Provider Availability

Interpreter Availability

Emergency Status

Recent Activity

Pending Cases

---

# ACTIVITY FEED

Provider Assigned

2 min ago

Interpreter Scheduled

5 min ago

Traveler Admitted

8 min ago

Case Resolved

12 min ago

Department Updated

17 min ago

The system should feel active.

---

# CASE TIMELINE

Every case follows:

Case Created

↓

Department Assigned

↓

Provider Assigned

↓

Communication Established

↓

Treatment Started

↓

Follow-Up

↓

Outcome Recorded

Timeline should communicate progression.

Not administration.

---

# EMPTY STATES

Never:

No cases found.

---

Instead:

No active cases.

Your hospital is currently available to support incoming traveler requests.

Capacity Status

Available

[ Review Availability ]

---

# ANIMATION SYSTEM

Micro

Status Changes

Buttons

Selections

Badges

80–120ms

---

Structural

Case Lists

Department Views

Provider Panels

180–250ms

---

Narrative

Case Assignment

Department Routing

Emergency Resolution

Outcome Recording

500–700ms

---

# CONTENT LANGUAGE

Never:

Hospital Graph

Routing Engine

Matching Engine

Optimization Engine

Internal Systems

---

Use:

Care Coordination

Department Assignment

Provider Availability

Interpreter Support

Capacity Overview

Traveler Monitoring

Human language only.

---

# VISUAL DIFFERENTIATION

Patient OS

Personal Healthcare Journey

---

Doctor OS

Care Delivery Workspace

---

Pharmacist OS

Medication Coordination Workspace

---

Hospital OS

Healthcare Coordination Network

The Hospital OS should immediately feel larger in scope.

Less focused on individuals.

More focused on coordinating many journeys simultaneously.

It should feel like healthcare infrastructure operating in real time.

---

# SUCCESS CRITERIA

The Hospital OS should feel like:

A modern healthcare coordination center.

Not hospital administration software.

Not enterprise ERP software.

Not analytics software.

Hospital staff should feel:

Prepared

Aware

Responsive

Coordinated

Capable

while maintaining:

Raycast-quality UI

Linear-quality workflow design

Stripe-quality trust

Cursor-quality activity awareness

and healthcare-infrastructure-level operational visibility.


# PHASE 11

# ORGANIZATION OPERATING SYSTEM

# TRAVELER SUPPORT & OVERSIGHT NETWORK

The Organization Operating System is the strategic layer of SwasthYatra.

This system serves:

Travel Insurance Providers

Universities

Corporate Travel Programs

Embassies

Government Programs

International Student Programs

NGOs

Enterprise Mobility Teams

Global Workforce Programs

The Organization OS is not healthcare delivery.

The Organization OS is not care coordination.

The Organization OS is not case management.

The Organization OS exists to provide visibility, oversight and support across large groups of travelers.

The organization is responsible for people.

The platform is responsible for coordination.

---

# DESIGN OBJECTIVE

Organizations should feel:

Informed

Aware

Prepared

Confident

Proactive

Supported

The interface should communicate:

Visibility

Oversight

Traveler Wellbeing

Risk Awareness

Operational Confidence

Never:

Hospital Software

Healthcare Administration

Provider Management

Analytics Dashboards

---

# QUESTIONS THE ORGANIZATION OS MUST ANSWER

How many travelers are active?

Who currently needs support?

Which journeys require attention?

What risks exist?

What outcomes are being achieved?

What should we focus on right now?

---

# ORGANIZATION MINDSET

The organization is not concerned with:

One consultation.

One medication.

One provider.

The organization cares about:

Traveler wellbeing at scale.

This should influence every design decision.

---

# CORE MODULES

Organization Home

Traveler Network

Active Care Journeys

Traveler Support

Provider Network

Escalations

Communication

Care Outcomes

Analytics

Reports

Organization Settings

Team Management

---

# ORGANIZATION HOME

Purpose:

Provide strategic visibility across all travelers.

Not healthcare operations.

Not patient management.

Traveler support oversight.

---

# Layout

Traveler Overview

↓

Active Care Journeys

↓

Attention Required

↓

Escalations

↓

Recent Activity

↓

Quick Actions

---

# Header

Traveler Support Overview

Organization Name

---

Active Travelers

241

Active Care Journeys

12

Resolved Cases

228

Average Resolution Time

18 Minutes

---

# Quick Actions

View Travelers

Open Escalations

Review Outcomes

Contact Support

Generate Report

---

# TRAVELER NETWORK

Purpose:

View all supported travelers.

---

# Layout

Traveler Directory

↓

Traveler Details

↓

Journey Overview

↓

Support History

---

# Traveler Card

Traveler Name

Location

Current Status

Support Level

Active Journey

Last Activity

---

Example

Sarah Johnson

Tokyo, Japan

Provider Confirmed

Active Journey

Last Updated 4 Minutes Ago

---

# Active Indicators

Safe

Needs Attention

Communication Delayed

Escalated

Follow-Up Required

Resolved

---

# ACTIVE CARE JOURNEYS

Purpose:

Monitor ongoing healthcare journeys.

---

# Layout

Journey Queue

↓

Journey Details

↓

Provider Coordination

↓

Communication Status

↓

Outcome Tracking

---

# Journey Card

Traveler

Issue

Status

Provider

Country

Last Update

---

Example

Sarah Johnson

Food Poisoning

Treatment Scheduled

Tokyo Medical Clinic

Japan

Updated 3 Minutes Ago

---

# ATTENTION CENTER

Purpose:

Highlight situations requiring organizational awareness.

---

# Categories

Escalations

Emergency Cases

Communication Delays

Provider Delays

Unresolved Cases

Follow-Up Required

---

# Card Example

Traveler

Issue

Status

Recommended Action

---

Michael Adams

Emergency Case

Escalated

Review Required

---

# PROVIDER NETWORK VIEW

Purpose:

Visibility into provider relationships.

---

# Layout

Active Providers

↓

Provider Performance

↓

Provider Availability

↓

Recent Assignments

---

# Provider Card

Provider Name

Country

Specialization

Response Time

Traveler Support Count

Status

---

Organizations should understand:

Who is helping their travelers.

Not how algorithms work.

---

# COMMUNICATION CENTER

Purpose:

Visibility into traveler support communication.

---

# Sections

Traveler Updates

Provider Updates

Escalation Updates

Organization Notifications

Activity Feed

---

Organizations do not need full conversations.

They need awareness.

---

# ESCALATIONS

Purpose:

Review journeys requiring additional support.

---

# Layout

Open Escalations

↓

In Progress

↓

Resolved

---

# Escalation Card

Traveler

Reason

Priority

Status

Assigned Operator

---

Example

Traveler

Provider Unavailable

Priority

High

Status

In Progress

---

# CARE OUTCOMES

Purpose:

Measure support effectiveness.

Build trust.

Understand impact.

---

# Sections

Resolved Cases

Traveler Recovery

Follow-Up Completion

Support Satisfaction

Journey Completion

---

# Outcome Card

Traveler

Issue

Provider

Status

Recovery Confirmed

---

Example

Food Poisoning

Resolved

Traveler Recovered

Follow-Up Completed

---

# ANALYTICS

Purpose:

Strategic understanding.

Not dashboards.

Not vanity metrics.

---

# Categories

Traveler Support

Care Resolution

Escalation Trends

Regional Activity

Support Quality

Response Times

---

Focus on actionable insight.

Not chart collections.

---

# REPORTS

Purpose:

Generate organizational summaries.

---

# Report Types

Traveler Support Report

Journey Summary

Escalation Summary

Provider Network Summary

Outcome Summary

Monthly Activity

---

# TEAM MANAGEMENT

Purpose:

Manage organizational access.

---

# Sections

Administrators

Managers

Support Staff

Observers

Invitations

Permissions

---

# CONTEXT RAIL

Always visible.

Contains:

Active Travelers

Open Escalations

Support Status

Recent Outcomes

Important Updates

Upcoming Follow-Ups

---

# ACTIVITY FEED

Traveler Supported

3 Minutes Ago

Provider Assigned

5 Minutes Ago

Escalation Resolved

11 Minutes Ago

Outcome Recorded

16 Minutes Ago

Follow-Up Completed

21 Minutes Ago

The organization should always understand what changed.

---

# TRAVELER JOURNEY TIMELINE

Every journey follows:

Issue Reported

↓

Assessment

↓

Provider Assigned

↓

Communication Established

↓

Treatment Delivered

↓

Follow-Up

↓

Outcome Recorded

The organization sees the journey.

Not clinical details.

---

# EMPTY STATES

Never:

No active travelers.

---

Instead:

All travelers are currently supported.

No journeys require immediate attention.

Support Status

Healthy

[ View Traveler Network ]

---

# ANIMATION SYSTEM

Micro

Buttons

Filters

Status Changes

Badges

80–120ms

---

Structural

Traveler Lists

Journey Panels

Reports

Tables

180–250ms

---

Narrative

Journey Resolution

Escalation Resolution

Outcome Recording

500–700ms

---

# CONTENT LANGUAGE

Never:

Outcome Engine

Healthcare Graph

Provider Intelligence

Optimization Engine

Internal Systems

---

Use:

Traveler Support

Care Outcomes

Provider Network

Support Activity

Traveler Wellbeing

Journey Status

Human language only.

---

# VISUAL DIFFERENTIATION

Patient OS

Personal Healthcare Navigation

---

Doctor OS

Care Delivery Workspace

---

Pharmacist OS

Medication Coordination

---

Hospital OS

Healthcare Coordination Center

---

Organization OS

Traveler Support Network

The Organization OS should immediately feel:

Strategic

High-level

Traveler-focused

Oversight-oriented

without feeling like analytics software.

---

# SUCCESS CRITERIA

The Organization OS should feel like:

The world's best traveler support oversight platform.

Not enterprise software.

Not insurance software.

Not healthcare administration software.

Organizations should feel:

Informed

Aware

Confident

Prepared

Supported

while maintaining:

Raycast-quality UI

Linear-quality workflow clarity

Stripe-quality trust

Cursor-quality activity awareness

and strategic visibility across traveler wellbeing at scale.


# PHASE 12

# MEDICAL ASSISTANT OPERATING SYSTEM

# HUMAN CARE COORDINATION WORKSPACE

The Medical Assistant Operating System is one of the most important systems in SwasthYatra.

This role sits at the center of the healthcare navigation network.

Medical Assistants are not doctors.

Medical Assistants are not operators.

Medical Assistants are not hospital administrators.

Medical Assistants are human care coordinators.

Their job is to ensure travelers never feel abandoned.

They connect:

Travelers

↓

Doctors

↓

Pharmacists

↓

Hospitals

↓

Interpreters

↓

Organizations

↓

Operators

The Medical Assistant OS is where human empathy meets operational coordination.

---

# DESIGN OBJECTIVE

Medical Assistants should feel:

Aware

Prepared

Helpful

Empowered

In Control

The interface should communicate:

Human Support

Coordination

Continuity

Responsiveness

Trust

Never:

Clinical

Administrative

Overly Technical

Analytics Heavy

---

# QUESTIONS THE MEDICAL ASSISTANT OS MUST ANSWER

Who needs help?

Who is waiting?

Which journeys require follow-up?

Where is coordination breaking down?

What action should happen next?

Who needs support right now?

---

# ROLE POSITION

The Medical Assistant acts as:

Journey Coordinator

Support Specialist

Communication Facilitator

Traveler Advocate

Healthcare Navigator

The Medical Assistant should feel like:

A trusted guide.

Not a case manager.

---

# CORE MODULES

Medical Assistant Home

Assigned Travelers

Journey Coordination

Communication Hub

Provider Coordination

Interpreter Coordination

Follow-Ups

Escalations

Traveler Support

Care Outcomes

Availability

Settings

---

# MEDICAL ASSISTANT HOME

Purpose:

Provide a live overview of assigned travelers and support responsibilities.

---

# Layout

Travelers Requiring Attention

↓

Active Care Journeys

↓

Pending Follow-Ups

↓

Communication Updates

↓

Recent Activity

↓

Quick Actions

---

# Header

Good Morning

Traveler Support Center

12 Active Travelers

4 Follow-Ups Required

2 Escalations Open

---

# Quick Actions

Find Traveler

Contact Provider

Schedule Follow-Up

Open Communication Hub

View Escalations

---

# ASSIGNED TRAVELERS

Purpose:

Primary work queue.

---

# Traveler Card

Traveler Name

Location

Current Status

Provider Status

Last Activity

Support Level

---

Example

Sarah Johnson

Tokyo, Japan

Treatment Scheduled

Provider Confirmed

Updated 4 Minutes Ago

Support Active

---

# Actions

View Journey

Contact Traveler

Contact Provider

Schedule Follow-Up

Escalate

---

# JOURNEY COORDINATION CENTER

Purpose:

Coordinate traveler care journeys.

---

# Layout

Journey Queue

↓

Journey Details

↓

Communication Status

↓

Provider Status

↓

Support Actions

---

# Journey Card

Traveler

Issue

Current Step

Provider

Communication Status

Next Action

---

Example

Traveler

Food Poisoning

Provider Confirmed

Tokyo Medical Clinic

Communication Ready

Follow-Up Tomorrow

---

# JOURNEY DETAIL VIEW

Contains:

Traveler Overview

Journey Timeline

Provider Information

Communication History

Interpreter Support

Follow-Up Tasks

Documents

Outcome Progress

Everything needed to support the traveler should be visible.

No searching.

No context switching.

---

# COMMUNICATION HUB

Purpose:

Coordinate conversations.

Not messaging.

Coordination.

---

# Includes

Traveler Updates

Provider Updates

Interpreter Updates

Organization Updates

Journey Notifications

---

# Layout

Conversations

↓

Traveler Context

↓

Translation Layer

↓

Actions

---

# Example

Traveler:

I am unable to locate the clinic.

---

Medical Assistant:

I've shared directions and notified the provider that you may arrive late.

---

The platform should showcase coordination.

Not chat.

---

# PROVIDER COORDINATION

Purpose:

Ensure provider engagement.

---

# Sections

Assigned Providers

Waiting Responses

Follow-Up Required

Provider Availability

---

# Provider Card

Provider

Status

Traveler

Last Response

Next Action

---

Example

Tokyo Medical Clinic

Awaiting Confirmation

Sarah Johnson

5 Minutes Ago

Follow-Up Needed

---

# INTERPRETER COORDINATION

Purpose:

Bridge language barriers.

---

# Layout

Open Requests

↓

Scheduled Sessions

↓

Active Sessions

↓

Completed Sessions

---

# Session Card

Traveler

Provider

Languages

Status

Time

---

Example

English

↓

Japanese

Status

Scheduled

---

# FOLLOW-UP CENTER

Purpose:

Ensure continuity of care.

---

# Layout

Upcoming Follow-Ups

↓

Missed Follow-Ups

↓

Recovery Checks

↓

Outcome Confirmation

---

# Follow-Up Card

Traveler

Issue

Provider

Date

Status

---

Example

Food Poisoning

Tokyo Medical Clinic

Tomorrow

Pending

---

# TRAVELER SUPPORT CENTER

Purpose:

Dedicated traveler assistance workspace.

---

# Sections

Support Requests

Urgent Needs

Navigation Help

Provider Guidance

Communication Assistance

---

The Medical Assistant should always know who requires help.

---

# ESCALATIONS

Purpose:

Coordinate unresolved situations.

---

# Categories

Provider Delays

Communication Problems

Unavailable Care

Traveler Concerns

Emergency Escalations

---

# Escalation Card

Traveler

Issue

Priority

Assigned Operator

Status

---

Example

Provider Unavailable

High Priority

Operator Assigned

In Progress

---

# CARE OUTCOMES

Purpose:

Track support effectiveness.

---

# Sections

Resolved Journeys

Recovery Confirmation

Follow-Up Completion

Traveler Feedback

Support Success

---

# Example

Traveler

Food Poisoning

Resolved

Follow-Up Complete

Traveler Recovered

---

# CONTEXT RAIL

Always visible.

Contains:

Assigned Travelers

Follow-Ups Due

Open Escalations

Communication Updates

Provider Responses

Recent Activity

Upcoming Tasks

---

# ACTIVITY FEED

Traveler Contacted

2 Minutes Ago

Provider Confirmed

6 Minutes Ago

Follow-Up Scheduled

11 Minutes Ago

Interpreter Assigned

17 Minutes Ago

Outcome Confirmed

24 Minutes Ago

The workspace should feel alive.

---

# SUPPORT TIMELINE

Every traveler journey should display:

Issue Reported

↓

Assessment

↓

Provider Assigned

↓

Communication Established

↓

Treatment

↓

Follow-Up

↓

Recovery Confirmed

The Medical Assistant should see the entire support journey.

---

# EMPTY STATES

Never:

No travelers assigned.

---

Instead:

No travelers currently require support.

All assigned journeys are progressing normally.

Support Status

Healthy

[ View Active Journeys ]

---

# ANIMATION SYSTEM

Micro

Buttons

Filters

Selections

Badges

80–120ms

---

Structural

Traveler Lists

Journey Panels

Communication Views

180–250ms

---

Narrative

Follow-Up Completion

Provider Confirmation

Recovery Confirmation

Journey Resolution

500–700ms

---

# CONTENT LANGUAGE

Never:

Coordination Engine

Agent Runtime

Support Graph

Workflow Engine

Internal Systems

---

Use:

Traveler Support

Journey Coordination

Follow-Up

Provider Communication

Recovery Status

Support Activity

Human language only.

---

# VISUAL DIFFERENTIATION

Patient OS

Personal Healthcare Navigation

---

Doctor OS

Care Delivery Workspace

---

Pharmacist OS

Medication Coordination Workspace

---

Hospital OS

Healthcare Coordination Center

---

Organization OS

Traveler Support Network

---

Medical Assistant OS

Human Care Coordination Workspace

The Medical Assistant OS should feel:

Human

Helpful

Responsive

Supportive

It is the empathy layer of the platform.

---

# SUCCESS CRITERIA

The Medical Assistant OS should feel like:

The world's best healthcare support coordination workspace.

Not CRM software.

Not helpdesk software.

Not hospital administration software.

Medical Assistants should feel:

Empowered

Aware

Prepared

Helpful

while maintaining:

Raycast-quality UI

Linear-quality workflow design

Stripe-quality trust

Cursor-quality activity awareness

and a deeply human support experience.

# PHASE 13

# OPERATOR OPERATING SYSTEM

# MISSION CONTROL FOR THE HEALTHCARE NAVIGATION NETWORK

The Operator Operating System is the final safety layer of SwasthYatra.

If every other system exists to coordinate care, the Operator OS exists to ensure no traveler falls through the cracks.

Operators are not administrators.

Operators are not support agents.

Operators are not customer success representatives.

Operators are Healthcare Navigation Specialists.

Their responsibility is simple:

No journey reaches a dead end.

No traveler gets abandoned.

No escalation goes unseen.

No communication failure remains unresolved.

No provider issue becomes a traveler problem.

---

# DESIGN OBJECTIVE

Operators should feel:

Aware

Prepared

Empowered

In Control

Proactive

The interface should communicate:

Visibility

Priority

Urgency

Resolution

Network Health

The Operator OS is Mission Control.

Not administration software.

Not analytics software.

Not customer support software.

---

# QUESTIONS THE OPERATOR OS MUST ANSWER

What requires attention right now?

Which journeys are blocked?

Which providers are unresponsive?

Which travelers need intervention?

Where is the network failing?

What should happen next?

---

# OPERATOR MINDSET

The Operator sees:

The entire network.

Not a single traveler.

Not a single provider.

Not a single organization.

The entire healthcare navigation ecosystem.

---

# CORE MODULES

Mission Control

Escalations

Failed Journeys

Provider Operations

Communication Monitoring

Traveler Interventions

Emergency Operations

Network Health

Outcome Recovery

Activity Center

Operator Performance

Settings

---

# MISSION CONTROL HOME

Purpose:

Provide immediate awareness of network-wide health.

---

# Layout

Critical Issues

↓

Open Escalations

↓

Failed Journeys

↓

Provider Delays

↓

Communication Failures

↓

Network Health

↓

Recent Activity

↓

Quick Actions

---

# Header

Mission Control

Healthcare Navigation Network

---

Open Escalations

12

Failed Journeys

3

Provider Delays

7

Communication Issues

4

Travelers Requiring Attention

5

---

# Quick Actions

Open Escalations

Review Failures

Assign Provider

Contact Traveler

Contact Organization

Emergency Response

---

# CRITICAL ISSUES PANEL

Purpose:

Highlight situations requiring immediate intervention.

---

# Categories

Emergency Cases

Unresponsive Providers

Traveler Safety Concerns

Communication Breakdowns

Interpreter Failures

High-Risk Journeys

---

# Card Example

Traveler

Sarah Johnson

Issue

Provider Unresponsive

Priority

High

Waiting Time

42 Minutes

Action

Intervene

---

This panel should always be visible.

---

# ESCALATIONS CENTER

Purpose:

Primary operational queue.

---

# Layout

Open

↓

In Progress

↓

Waiting

↓

Resolved

---

# Escalation Card

Traveler

Issue

Priority

Assigned Operator

Time Waiting

Status

---

Example

Traveler

Michael Adams

Issue

No Provider Available

Priority

Critical

Assigned Operator

John

Status

Open

---

# Actions

Assign

Review

Contact Provider

Escalate Further

Resolve

---

# FAILED JOURNEYS

Purpose:

Recover journeys that are not progressing.

---

# Definition

A failed journey is any journey where progress has stopped.

Examples:

No provider available

No provider response

Communication failure

Interpreter unavailable

Traveler unreachable

Unexpected disruption

---

# Layout

Journey Queue

↓

Failure Analysis

↓

Recovery Actions

↓

Activity

---

# Failure Card

Traveler

Issue

Failure Reason

Duration

Recovery Recommendation

---

Example

Traveler

Provider Search

No Response

1 Hour

Manual Intervention Recommended

---

# PROVIDER OPERATIONS

Purpose:

Monitor provider responsiveness.

---

# Layout

Available Providers

↓

Delayed Providers

↓

Inactive Providers

↓

Provider Issues

---

# Provider Card

Provider

Country

Status

Response Time

Traveler Impact

---

Example

Tokyo Medical Clinic

Japan

Delayed

42 Minutes

2 Travelers Waiting

---

# Actions

Contact

Reassign

Pause

Review

---

# COMMUNICATION MONITORING

Purpose:

Monitor communication health.

---

# Categories

Message Delivery

Provider Responses

Traveler Responses

Interpreter Sessions

Call Status

Translation Issues

---

# Layout

Open Issues

↓

Recent Communication

↓

Recovery Actions

---

# Example

Message Sent

Delivered

Read

Provider Responded

Communication Established

---

or

Message Failed

Retry Required

---

# TRAVELER INTERVENTIONS

Purpose:

Provide direct assistance.

---

# Layout

Travelers Requiring Attention

↓

Current Issues

↓

Intervention History

↓

Next Actions

---

# Traveler Card

Traveler

Issue

Priority

Current Status

Recommended Action

---

Example

Traveler

Unable To Reach Provider

Priority

High

Recommendation

Manual Outreach

---

# EMERGENCY OPERATIONS

Purpose:

Handle critical situations.

---

# Categories

Medical Emergency

Provider Failure

Communication Breakdown

Interpreter Failure

High-Risk Traveler

Safety Concern

---

# Layout

Emergency Queue

↓

Active Responses

↓

Resolved Incidents

---

# Emergency Card

Traveler

Issue

Severity

Assigned Team

Time Waiting

---

# NETWORK HEALTH

Purpose:

Provide system-wide visibility.

---

# Categories

Provider Availability

Communication Success

Interpreter Availability

Journey Progress

Traveler Satisfaction

Resolution Rate

---

Present health.

Not analytics.

Not dashboards.

---

# ACTIVITY CENTER

Purpose:

Show network activity.

---

# Feed

Provider Assigned

2 Minutes Ago

Escalation Resolved

5 Minutes Ago

Traveler Contacted

8 Minutes Ago

Journey Recovered

12 Minutes Ago

Interpreter Scheduled

18 Minutes Ago

The network should feel alive.

---

# OUTCOME RECOVERY

Purpose:

Learn from failures.

---

# Categories

Recovered Journeys

Resolved Escalations

Provider Replacements

Communication Recoveries

Traveler Support Success

---

# Example

Issue

Provider Unavailable

Action

Provider Reassigned

Result

Journey Recovered

---

# OPERATOR PERFORMANCE

Purpose:

Improve support quality.

---

# Categories

Cases Resolved

Recovery Time

Traveler Satisfaction

Escalation Resolution

Support Quality

---

Focus on effectiveness.

Not employee surveillance.

---

# CONTEXT RAIL

Always visible.

Contains:

Open Escalations

Failed Journeys

Emergency Queue

Network Health

Recent Activity

Pending Responses

High-Risk Travelers

---

# ACTIVITY FEED

Escalation Created

2 Minutes Ago

Provider Contacted

4 Minutes Ago

Journey Recovered

7 Minutes Ago

Traveler Assisted

11 Minutes Ago

Emergency Resolved

16 Minutes Ago

The Operator OS should always feel active.

---

# ESCALATION TIMELINE

Every escalation follows:

Issue Detected

↓

Escalation Created

↓

Operator Assigned

↓

Investigation

↓

Intervention

↓

Resolution

↓

Outcome Recorded

This should feel like progress.

Not ticket management.

---

# EMPTY STATES

Never:

No escalations.

---

Instead:

All traveler journeys are progressing normally.

No intervention is currently required.

Network Status

Healthy

[ View Mission Control ]

---

# ANIMATION SYSTEM

Micro

Priority Changes

Status Updates

Buttons

Selections

Badges

80–120ms

---

Structural

Escalation Lists

Mission Control Panels

Activity Streams

180–250ms

---

Narrative

Journey Recovery

Escalation Resolution

Emergency Resolution

Network Recovery

500–700ms

---

# CONTENT LANGUAGE

Never:

Escalation Engine

Failure Engine

Routing Engine

Agent Runtime

Internal Systems

---

Use:

Mission Control

Journey Recovery

Traveler Support

Provider Operations

Emergency Response

Network Health

Human language only.

---

# VISUAL DIFFERENTIATION

Patient OS

Personal Healthcare Navigation

---

Doctor OS

Care Delivery Workspace

---

Pharmacist OS

Medication Coordination Workspace

---

Hospital OS

Healthcare Coordination Center

---

Organization OS

Traveler Support Network

---

Medical Assistant OS

Human Care Coordination Workspace

---

Operator OS

Mission Control

The Operator OS should feel larger than every other dashboard.

This is the only role that sees the entire healthcare navigation network.

It should feel powerful.

Not complicated.

Operational.

Not administrative.

---

# SUCCESS CRITERIA

The Operator OS should feel like:

Mission Control for global healthcare navigation.

Not a support dashboard.

Not an admin panel.

Not a CRM.

Operators should feel:

Aware

Prepared

Responsive

Empowered

In Control

while maintaining:

Raycast-quality UI

Linear-quality operational clarity

Stripe-quality trust

Cursor-quality activity visibility

and healthcare-network-level awareness across the entire SwasthYatra ecosystem.


# PHASE 14

# NAVIGATION ASSISTANT (AGENT OS)

# THE CROWN JEWEL OF SWASTHYATRA

The Navigation Assistant is the most important experience in the entire platform.

It is not a chatbot.

It is not ChatGPT.

It is not a conversational assistant.

It is not a medical AI.

It is not a symptom checker.

It is not a search engine.

The Navigation Assistant is a Healthcare Navigator.

Its purpose is simple:

Move healthcare journeys forward.

The user should never feel:

"I'm talking to AI."

The user should feel:

"The system is actively helping me."

This distinction is critical.

---

# PRODUCT PHILOSOPHY

Most AI products are designed around conversation.

SwasthYatra is designed around progress.

The Navigation Assistant exists to:

Understand Context

↓

Review Situation

↓

Find Options

↓

Coordinate Care

↓

Communicate

↓

Monitor Progress

↓

Resolve Journey

The focus is outcomes.

Not conversation.

---

# PRIMARY EXPERIENCE

Reference:

Cursor

Not visually.

Behaviorally.

The user should see:

Progress.

Activity.

Execution.

Coordination.

Movement.

Never:

Chat bubbles.

Prompt engineering.

Reasoning.

AI jargon.

---

# WHAT JUDGES SHOULD FEEL

When judges open Agent OS they should immediately think:

"This isn't a chatbot."

"This feels like a healthcare operating system."

"This is coordinating real-world actions."

"This is moving things forward."

---

# AGENT OS LAYOUT

Three-column architecture.

Inspired by Cursor.

Adapted for healthcare navigation.

---

```text
┌──────────────┬───────────────────────────┬──────────────┐
│              │                           │              │
│ Context      │ Journey Execution         │ Activity     │
│              │                           │              │
└──────────────┴───────────────────────────┴──────────────┘
```

---

# LEFT PANEL

# CONTEXT

Purpose:

Everything the assistant knows.

Not technical context.

Human context.

---

# Sections

Traveler

Location

Current Journey

Symptoms

Medical History

Current Medications

Allergies

Insurance

Language

Emergency Contacts

Recent Activity

---

# Example

Traveler

Sarah Johnson

Location

Tokyo, Japan

Issue

Food Poisoning

Language

English

Support Required

Provider + Medication

---

The left panel should feel like mission context.

Not profile information.

---

# CENTER PANEL

# JOURNEY EXECUTION

Purpose:

Show progress.

Not reasoning.

Not AI.

Progress.

---

# Workflow Structure

Situation Received

↓

Care Options Reviewed

↓

Providers Evaluated

↓

Provider Contacted

↓

Provider Confirmed

↓

Communication Prepared

↓

Treatment Coordinated

↓

Follow-Up Planned

↓

Outcome Recorded

---

Every step appears progressively.

Not all at once.

---

# STEP CARD DESIGN

Each step contains:

Title

Description

Status

Timestamp

Relevant Details

---

Example

Provider Confirmed

A provider is available and ready to assist.

Status

Completed

2 Minutes Ago

---

# Visual States

Waiting

Active

Completed

Attention Required

Escalated

---

# Activity Progression

Judges should literally watch the journey unfold.

Not read static cards.

---

# NARRATION BAR

Reference:

Cursor status updates.

---

Examples

Reviewing nearby providers...

Checking language compatibility...

Preparing communication support...

Waiting for provider confirmation...

Provider confirmed.

Translation prepared.

Consultation scheduled.

---

One message at a time.

Calm.

Confident.

Human.

---

# RIGHT PANEL

# ACTIVITY STREAM

Purpose:

Show network activity.

Not logs.

Not debugging.

Activity.

---

Examples

Provider Responded

Interpreter Scheduled

Passport Shared

Communication Ready

Medication Guidance Prepared

Outcome Recorded

Follow-Up Scheduled

---

Each event should feel meaningful.

---

# JOURNEY STORYTELLING

Reference:

Tsenta

The assistant tells a story through progress.

---

Assessment Complete

↓

Care Options Reviewed

↓

Provider Confirmed

↓

Communication Prepared

↓

Treatment Scheduled

↓

Outcome Recorded

---

This should feel like a journey.

Not a workflow.

---

# AGENT MODES

The Navigation Assistant changes behavior based on needs.

---

# FIND CARE

Purpose:

Find providers.

---

Example

Traveler needs:

Doctor

Clinic

Hospital

Pharmacy

Urgent Care

---

Output

Recommended Care Options

---

# MEDICATION SUPPORT

Purpose:

Help with medication access.

---

Example

Traveler needs:

Tylenol

↓

Local Equivalent Found

↓

Safety Reviewed

↓

Availability Confirmed

---

# COMMUNICATION SUPPORT

Purpose:

Bridge communication.

---

Example

Provider speaks Japanese.

Traveler speaks English.

Translation support prepared.

---

# FOLLOW-UP SUPPORT

Purpose:

Continue care after treatment.

---

Example

Follow-Up Scheduled

Recovery Check Planned

Outcome Tracking Active

---

# ESCALATION SUPPORT

Purpose:

Recover blocked journeys.

---

Example

Provider Unavailable

↓

Alternative Provider Search

↓

Operator Review

↓

Journey Recovered

---

# AUTONOMOUS BEHAVIOR

This is critical.

The assistant should feel proactive.

Not reactive.

---

Bad

User:

What next?

---

Good

Provider confirmed.

Would you like directions to the clinic?

---

Bad

User:

What should I do?

---

Good

Your consultation is scheduled for 4:30 PM.

Your passport has already been shared with the provider.

No further action is required right now.

---

The assistant should anticipate needs.

---

# AGENT WORKSPACE (DEMO MODE)

This is the page judges will remember.

Route:

```text
/demo/agent-workspace
```

---

Layout

Context

↓

Execution Timeline

↓

Activity Feed

---

Button

Start Journey

---

Journey automatically unfolds.

---

# DEMO NARRATIVE

Traveler reports issue

↓

Assistant reviews situation

↓

Providers evaluated

↓

Provider contacted

↓

Provider responds

↓

Communication prepared

↓

Consultation arranged

↓

Outcome recorded

↓

Network improves

---

This should take roughly:

60–90 seconds

and feel magical.

---

# COMPLETION SCREEN

After execution completes:

Show

Journey Resolved

---

Summary

Provider Confirmed

Treatment Received

Follow-Up Scheduled

Recovery Monitoring Active

---

# SYSTEM IMPACT PANEL

Do NOT show:

Graphs

Vectors

Embeddings

Agent Runtime

Knowledge Graphs

---

Show:

Provider Network Expanded

+1 Provider Response

Care Outcomes Updated

+1 Resolved Journey

Medication Guidance Improved

+1 Medication Match

---

Human language only.

---

# INTERVENTION SYSTEM

Sometimes journeys fail.

The assistant should show:

Provider unavailable.

Searching alternatives.

---

Communication delayed.

Preparing additional outreach.

---

No suitable provider found.

Escalating to a support specialist.

---

The user should always know:

The system is working.

---

# ACTIVITY DESIGN

Activity should feel alive.

Examples:

Provider confirmed

2 minutes ago

Translation prepared

4 minutes ago

Medication guidance updated

7 minutes ago

Follow-Up scheduled

12 minutes ago

---

The platform should constantly demonstrate progress.

---

# ANIMATION SYSTEM

Micro

Status changes

Buttons

Selections

Badges

80–120ms

---

Structural

Timeline progression

Panels

Cards

Activity items

180–250ms

---

Narrative

Provider confirmation

Journey completion

Communication readiness

Outcome recording

Network updates

500–900ms

---

# CONTENT LANGUAGE

Never show:

AI

Agent Runtime

Planner

Executor

Workflow Engine

LangGraph

Tool Calls

Vector Search

Inference

LLM

Knowledge Graph

Healthcare Graph

---

Always show:

Navigation Assistant

Care Coordination

Provider Network

Journey Progress

Communication Support

Care Outcomes

Traveler Support

Human-centered language only.

---

# VISUAL DIFFERENTIATION

Patient OS

Healthcare Journey

---

Doctor OS

Care Delivery

---

Pharmacist OS

Medication Coordination

---

Hospital OS

Healthcare Infrastructure

---

Organization OS

Traveler Oversight

---

Medical Assistant OS

Human Support

---

Operator OS

Mission Control

---

Navigation Assistant

The Intelligence Layer

The Navigation Assistant should feel like the nervous system connecting every part of SwasthYatra.

---

# SUCCESS CRITERIA

The Navigation Assistant should become the most memorable experience in the entire platform.

Judges should walk away saying:

"This wasn't a chatbot."

"This coordinated healthcare."

"This felt like a real operating system."

"This actually moved the journey forward."

The Navigation Assistant must embody:

Cursor-quality execution visibility

Raycast-quality craftsmanship

Linear-quality workflow clarity

Tsenta-quality storytelling

Stripe-quality trust

while remaining completely original and uniquely SwasthYatra.

# PHASE 15

# COMMUNICATION CENTER & LIVE INTERPRETER SYSTEM

# THE HUMAN CONNECTION LAYER

The Communication Center is where SwasthYatra becomes real.

This is where healthcare coordination leaves the software and enters the real world.

The Communication Center is not messaging.

It is not chat.

It is not a communication tool.

It is a healthcare coordination layer.

This system connects:

Travelers

↓

Doctors

↓

Pharmacists

↓

Hospitals

↓

Medical Assistants

↓

Organizations

↓

Operators

↓

Interpreters

through one unified experience.

---

# PRODUCT PHILOSOPHY

Most healthcare systems stop at information.

SwasthYatra continues into communication.

Finding a provider is not enough.

Understanding a provider is not enough.

The platform must help people actually communicate.

The Communication Center exists to remove:

Language Barriers

Geographic Barriers

Healthcare System Barriers

Provider Access Barriers

Coordination Friction

---

# DESIGN OBJECTIVE

Users should feel:

Connected

Supported

Understood

Coordinated

Confident

Never:

Lost

Ignored

Confused

Waiting without visibility

---

# COMMUNICATION CENTER IS NOT CHAT

This is extremely important.

Do not design:

WhatsApp Clone

Slack Clone

Discord Clone

Messenger Clone

Telegram Clone

---

The Communication Center is:

Healthcare Coordination

Communication is only one part.

Context is equally important.

---

# QUESTIONS THE COMMUNICATION CENTER MUST ANSWER

Who am I communicating with?

Why am I communicating with them?

What is the current status?

What should happen next?

What healthcare context matters?

What language barriers exist?

---

# CORE MODULES

Communication Home

Conversations

Provider Responses

Calls

Live Interpreter

Translation Support

Shared Documents

Care Updates

Communication Timeline

Notifications

---

# COMMUNICATION HOME

Purpose:

Provide communication visibility.

Not inbox management.

Healthcare communication coordination.

---

# Layout

Active Conversations

↓

Waiting Responses

↓

Interpreter Sessions

↓

Recent Updates

↓

Quick Actions

---

# Header

Communication Center

All healthcare conversations in one place.

---

# Quick Actions

Contact Provider

Start Interpreter Session

Call Provider

Share Passport

Share Documents

---

# ACTIVE CONVERSATIONS

Purpose:

Current communication channels.

---

# Conversation Card

Participant

Role

Language

Status

Last Activity

---

Example

Tokyo Medical Clinic

Provider

Japanese

Active

Updated 2 Minutes Ago

---

# Provider Responses

Purpose:

Track provider engagement.

---

# Status Types

Message Sent

Delivered

Read

Responded

Accepted

Scheduled

Completed

---

# Example

Provider Contacted

↓

Message Delivered

↓

Provider Read Message

↓

Provider Accepted Request

↓

Consultation Scheduled

---

The user should always know what happened.

---

# LIVE INTERPRETER SYSTEM

This is one of the most important experiences in SwasthYatra.

---

# PRODUCT PHILOSOPHY

The interpreter is not a translation tool.

The interpreter is a communication bridge.

The user should feel:

I can speak naturally.

The system handles the rest.

---

# INTERPRETER MODES

Traveler ↔ Doctor

Traveler ↔ Pharmacist

Traveler ↔ Hospital

Traveler ↔ Medical Assistant

Traveler ↔ Organization

---

# INTERPRETER HOME

Purpose:

Manage communication sessions.

---

# Layout

Upcoming Sessions

↓

Active Sessions

↓

Recent Sessions

↓

Quick Actions

---

# Session Card

Traveler

Provider

Languages

Time

Status

---

Example

English

↓

Japanese

Provider

Tokyo Medical Clinic

Status

Ready

---

# ACTIVE SESSION EXPERIENCE

This page must feel world-class.

Judges will remember this.

---

# Layout

```text
┌─────────────────────────────────────┐
│ Session Status                      │
├─────────────────────────────────────┤
│ Traveler Speech                     │
│                                     │
│ Translated Output                   │
├─────────────────────────────────────┤
│ Provider Speech                     │
│                                     │
│ Translated Output                   │
├─────────────────────────────────────┤
│ Session Activity                    │
└─────────────────────────────────────┘
```

---

# EXPERIENCE

Traveler speaks English.

↓

Speech appears.

↓

Translation appears.

↓

Provider receives Japanese.

↓

Provider responds.

↓

Japanese speech appears.

↓

English translation appears.

---

Everything should feel instant.

Fluid.

Natural.

---

# VISUAL DESIGN

Do NOT use:

Chat Bubbles

AI Assistants

Conversation Threads

---

Use:

Conversation Cards

Live Transcript Panels

Translation Panels

Session Timeline

Activity Feed

---

# COMMUNICATION STATUS

Always visible.

Examples:

Connecting

Ready

Provider Joined

Interpreter Active

Translation Available

Session Complete

---

The user should never wonder what is happening.

---

# CALL CENTER

Purpose:

Voice communication coordination.

---

# Layout

Upcoming Calls

↓

Active Calls

↓

Call History

---

# Call Card

Participant

Language

Status

Time

Duration

---

Example

Tokyo Medical Clinic

Japanese

Scheduled

4:30 PM

---

# DOCUMENT SHARING

Purpose:

Share healthcare information.

---

# Shareable Items

Health Passport

Medical Documents

Insurance

Prescriptions

Reports

Lab Results

---

# Sharing Flow

Select Document

↓

Review Access

↓

Generate Link

↓

Share

↓

Track Access

---

# COMMUNICATION TIMELINE

Purpose:

Show complete communication history.

---

Example

Provider Contacted

↓

Message Delivered

↓

Message Read

↓

Provider Responded

↓

Interpreter Scheduled

↓

Call Completed

↓

Follow-Up Sent

---

The timeline tells the story.

Not logs.

---

# TRANSLATION SUPPORT

Purpose:

Make language invisible.

---

# Translation Features

Real-Time Translation

Message Translation

Document Translation

Healthcare Terminology Support

Conversation Translation

---

# User Experience Goal

The user should forget translation exists.

Communication should feel natural.

---

# PROVIDER RESPONSE CENTER

Purpose:

Monitor provider communication.

---

# Categories

Waiting

Responded

Accepted

Scheduled

Delayed

Escalated

---

# Example

Tokyo Medical Clinic

Accepted

Consultation Scheduled

4:30 PM

---

# CONTEXT RAIL

Always visible.

Contains:

Current Conversations

Provider Status

Upcoming Calls

Interpreter Status

Recent Activity

Shared Documents

---

# ACTIVITY FEED

Provider Responded

2 Minutes Ago

Interpreter Scheduled

5 Minutes Ago

Passport Shared

8 Minutes Ago

Call Confirmed

11 Minutes Ago

Consultation Completed

17 Minutes Ago

The Communication Center should feel alive.

---

# NOTIFICATION SYSTEM

Purpose:

Keep users informed.

---

Examples

Provider Confirmed

Interpreter Ready

Call Starting Soon

Passport Viewed

Document Shared

Follow-Up Received

---

Notifications should reduce uncertainty.

Not create noise.

---

# EMPTY STATES

Never:

No conversations.

---

Instead:

No active conversations right now.

When providers, interpreters or care teams communicate, updates will appear here.

[ Contact Provider ]

---

# ANIMATION SYSTEM

Micro

Buttons

Status Changes

Selections

Badges

80–120ms

---

Structural

Conversation Panels

Interpreter Views

Call Panels

180–250ms

---

Narrative

Provider Acceptance

Interpreter Joining

Call Connection

Communication Completion

500–900ms

---

# CONTENT LANGUAGE

Never:

Translation Engine

Speech Model

Communication Runtime

AI Translator

Inference System

Internal Systems

---

Use:

Interpreter

Translation Support

Communication Center

Provider Communication

Conversation History

Care Updates

Human language only.

---

# DEMO EXPERIENCE

The Live Interpreter should be one of the strongest judge moments.

Scenario:

Traveler

English

↓

Provider

Japanese

↓

Live Translation

↓

Consultation

↓

Treatment Plan

↓

Follow-Up

Judges should immediately understand:

This solves a real-world problem.

---

# VISUAL DIFFERENTIATION

Navigation Assistant

Coordinates

---

Communication Center

Connects

---

Patient OS

Navigates

---

Doctor OS

Treats

---

Medical Assistant OS

Supports

---

Operator OS

Recovers

---

Communication Center

Makes all of them work together.

---

# SUCCESS CRITERIA

The Communication Center should feel like:

The communication backbone of global healthcare navigation.

Not a messaging app.

Not a chat application.

Not a translation tool.

Users should feel:

Connected

Supported

Understood

Confident

while maintaining:

Raycast-quality UI

Linear-quality communication workflows

Stripe-quality trust

Cursor-quality activity visibility

and world-class multilingual healthcare coordination.


# PHASE 16

# HEALTH PASSPORT, MEDICAL VAULT & MEDICAL HISTORY SYSTEM

# THE TRAVELER'S HEALTH IDENTITY

The Health Passport, Medical Vault and Medical History systems are among the most important assets in SwasthYatra.

They are not document storage.

They are not medical records.

They are not file repositories.

They are not profile pages.

Together they form:

The Traveler's Healthcare Identity.

Every healthcare journey relies on them.

Every provider interaction relies on them.

Every interpreter session relies on them.

Every care outcome relies on them.

These systems provide continuity across countries, providers and healthcare systems.

---

# PRODUCT PHILOSOPHY

Healthcare journeys become difficult because context is fragmented.

Important information is scattered.

Documents are inaccessible.

Medical history is unavailable.

Providers repeatedly ask the same questions.

Travelers repeatedly explain the same story.

SwasthYatra solves this by creating a portable healthcare identity.

The traveler should never feel:

"I have to explain everything again."

The platform should already know the context.

---

# THREE CORE SYSTEMS

Health Passport

↓

Medical History

↓

Medical Vault

Each serves a different purpose.

---

# HEALTH PASSPORT

Purpose:

Portable healthcare identity.

The Health Passport is what providers see.

The Health Passport is what travelers share.

The Health Passport is what travels across borders.

---

# WHAT THE PASSPORT IS NOT

Not a document folder.

Not a PDF.

Not a profile page.

Not an insurance form.

---

# WHAT THE PASSPORT IS

A healthcare summary designed for rapid understanding.

A provider should understand the traveler within seconds.

---

# PASSPORT LAYOUT

Traveler Identity

↓

Medical Summary

↓

Current Medications

↓

Allergies

↓

Conditions

↓

Insurance

↓

Emergency Contacts

↓

Documents

↓

Sharing Controls

---

# PASSPORT HEADER

Traveler Name

Nationality

Current Country

Preferred Language

Blood Type

Emergency Status

Passport Status

---

Example

Sarah Johnson

United States

Tokyo, Japan

English

O+

Passport Ready

---

# MEDICAL SUMMARY

Purpose:

Provide critical healthcare context.

---

# Sections

Known Conditions

Allergies

Current Medications

Recent Care

Vaccinations

Healthcare Notes

---

Providers should immediately understand:

What matters most.

---

# CURRENT MEDICATIONS

Purpose:

Medication awareness.

---

# Medication Card

Medication

Dosage

Frequency

Purpose

Started

---

Example

Metformin

500mg

Twice Daily

Diabetes Management

---

# ALLERGIES

Purpose:

Immediate safety awareness.

---

# Example

Penicillin

Severe

---

Peanuts

Moderate

---

Latex

Mild

---

Allergies should be impossible to miss.

---

# INSURANCE

Purpose:

Care coordination.

---

# Sections

Provider

Policy

Coverage

Emergency Support

Contact Information

---

# EMERGENCY CONTACTS

Purpose:

Rapid access during emergencies.

---

# Contact Card

Name

Relationship

Phone

Preferred Language

---

# SHARING SYSTEM

Purpose:

Instant healthcare access.

---

# Share Options

Secure Link

QR Code

Temporary Access

Provider Access

Emergency Access

---

# Share Flow

Generate Access

↓

Review Permissions

↓

Share Passport

↓

Track Access

---

The experience should feel effortless.

---

# PASSPORT ACCESS HISTORY

Purpose:

Transparency.

---

# Example

Tokyo Medical Clinic

Viewed Passport

3:42 PM

---

Interpreter Session

Passport Accessed

4:11 PM

---

The traveler always knows who accessed information.

---

# MEDICAL HISTORY

Purpose:

Long-term healthcare continuity.

---

# PHILOSOPHY

Medical History tells the story of the traveler.

Not a database.

A healthcare timeline.

---

# LAYOUT

Conditions

↓

Medications

↓

Procedures

↓

Past Journeys

↓

Documents

↓

Outcomes

---

# TIMELINE VIEW

The entire experience should be timeline-driven.

---

Example

2026

Food Poisoning

Tokyo

Resolved

---

2025

Allergy Consultation

Singapore

Resolved

---

2024

Vaccination

India

Completed

---

Healthcare history becomes understandable.

---

# CONDITIONS

Purpose:

Long-term awareness.

---

# Condition Card

Condition

Status

Diagnosed

Treatment

Provider

---

Example

Asthma

Managed

2021

Active Treatment

---

# MEDICATION HISTORY

Purpose:

Medication continuity.

---

# Sections

Current

Past

Stopped

Recommended

---

This should help future providers understand the traveler.

---

# PREVIOUS JOURNEYS

Purpose:

Context.

---

Example

Food Poisoning

Tokyo

Resolved

Provider Assisted

Outcome Recorded

---

The traveler can revisit any journey.

---

# CARE OUTCOME HISTORY

Purpose:

Show what happened.

---

# Outcome Card

Issue

Provider

Treatment

Resolution

Recovery

Feedback

---

Not analytics.

History.

---

# MEDICAL VAULT

Purpose:

Secure healthcare document storage.

---

# PHILOSOPHY

The Vault is not a file manager.

The Vault is a healthcare document repository.

Everything stored should contribute to healthcare understanding.

---

# DOCUMENT TYPES

Prescriptions

Lab Reports

Insurance Documents

Vaccination Records

Medical Reports

Discharge Summaries

Travel Health Documents

Imaging Reports

---

# VAULT HOME

Layout

Recent Documents

↓

Categories

↓

Shared Documents

↓

Upload Center

↓

Activity

---

# DOCUMENT CARD

Document Name

Type

Provider

Date

Status

---

Example

Blood Test Report

Lab Report

Tokyo Medical Clinic

May 12

Verified

---

# DOCUMENT PREVIEW

Purpose:

Rapid understanding.

---

# Sections

Document Overview

Key Information

Associated Journey

Sharing Status

Activity History

---

The user should not need to download every file.

---

# DOCUMENT SHARING

Purpose:

Healthcare coordination.

---

# Share Options

Provider

Hospital

Interpreter

Organization

Medical Assistant

---

# Access Controls

Temporary

Journey-Specific

Emergency

Permanent

---

# VAULT ACTIVITY

Purpose:

Transparency.

---

# Example

Document Uploaded

2 Hours Ago

Provider Accessed Report

Yesterday

Passport Updated

2 Days Ago

Insurance Shared

Last Week

---

# SEARCH EXPERIENCE

This is critical.

---

Users should search:

Condition

Medication

Provider

Document

Journey

Date

Country

---

Search should feel like Raycast.

Instant.

Contextual.

Useful.

---

# CONTEXT RAIL

Always visible.

Contains:

Passport Status

Recent Documents

Upcoming Expirations

Recent Shares

Emergency Contacts

Insurance Status

---

# EMPTY STATES

Never:

No documents found.

---

Instead:

Your Medical Vault is ready.

Store prescriptions, reports and important healthcare documents so they're available whenever care is needed.

[ Upload Document ]

---

# ANIMATION SYSTEM

Micro

Buttons

Uploads

Selections

Badges

80–120ms

---

Structural

Document Cards

Timeline Sections

Vault Panels

180–250ms

---

Narrative

Passport Shared

Document Uploaded

History Updated

Access Granted

500–700ms

---

# CONTENT LANGUAGE

Never:

Knowledge Graph

Medical Memory

Vector Database

Document Pipeline

Extraction Engine

Internal Systems

---

Use:

Health Passport

Medical History

Medical Vault

Healthcare Documents

Care Records

Journey History

Human language only.

---

# VISUAL DIFFERENTIATION

Patient OS

Current Healthcare Navigation

---

Communication Center

Current Coordination

---

Health Passport

Portable Healthcare Identity

---

Medical History

Healthcare Story

---

Medical Vault

Healthcare Documents

These should feel like permanent healthcare assets.

Not temporary workflows.

---

# JUDGE MOMENT

When a judge opens the Health Passport they should immediately think:

"This is what healthcare should feel like when traveling."

When they open Medical History:

"This tells a healthcare story."

When they open the Vault:

"This makes healthcare information portable."

---

# SUCCESS CRITERIA

The Health Passport, Medical History and Medical Vault should feel like:

A modern healthcare identity layer.

Not forms.

Not profiles.

Not document storage.

Travelers should feel:

Prepared

Protected

Organized

Supported

while maintaining:

Raycast-quality UI

Linear-quality information architecture

Stripe-quality trust

Apple-quality clarity

and a seamless healthcare identity experience that works anywhere in the world.


# PHASE 17

# PROVIDER NETWORK, PROVIDER DISCOVERY & CARE MATCHING EXPERIENCE

# THE REAL-WORLD CARE ACCESS LAYER

The Provider Network is one of the strongest moats in SwasthYatra.

It is where healthcare navigation becomes healthcare access.

Without providers:

The platform is information.

With providers:

The platform becomes action.

The Provider Network is not:

A provider directory.

A search engine.

A listing marketplace.

A doctor finder.

A hospital finder.

A pharmacy directory.

The Provider Network exists to answer one question:

Who can help this traveler right now?

---

# PRODUCT PHILOSOPHY

Most healthcare products help users discover providers.

SwasthYatra helps users reach providers.

This distinction is critical.

Discovery is not the goal.

Access is the goal.

The traveler should never feel:

"I'm browsing providers."

They should feel:

"The system is helping me reach care."

---

# DESIGN OBJECTIVE

Users should feel:

Confident

Supported

Guided

Connected

Safe

Never:

Overwhelmed

Forced to compare dozens of options

Responsible for evaluating healthcare providers

---

# CORE PRINCIPLE

Do not optimize for search.

Optimize for decisions.

Do not show:

500 providers

100 filters

Complex rankings

Comparison tables

Endless maps

The system should narrow options.

Not expand them.

---

# PROVIDER NETWORK MODULES

Provider Network Home

Recommended Care Options

Provider Directory

Provider Profiles

Availability Center

Communication Status

Care Matching

Provider Outcomes

Provider Activity

Network Coverage

---

# PROVIDER NETWORK HOME

Purpose:

Give users confidence.

Not information overload.

---

# Layout

Recommended Care Options

↓

Nearby Care Availability

↓

Provider Activity

↓

Communication Status

↓

Recent Care Outcomes

↓

Quick Actions

---

# Header

Provider Network

Trusted care options available nearby.

---

# Quick Actions

Find Care

View Providers

Contact Provider

Open Communication Center

Share Passport

---

# RECOMMENDED CARE OPTIONS

This is the most important component.

---

# Purpose

Help travelers decide.

---

# Card Structure

Provider

Availability

Languages

Care Type

Travel Distance

Support Methods

Status

---

# Example

Tokyo Medical Clinic

General Practice

English • Japanese

Available Today

15 Minutes Away

Supports Passport Sharing

---

Actions

View Details

Contact Provider

Get Directions

Share Passport

---

# PROVIDER DISCOVERY

Purpose:

Help travelers understand available options.

---

# Layout

Recommended

↓

Nearby

↓

Specialists

↓

Emergency Care

↓

Pharmacies

---

Not an overwhelming directory.

Curated.

Focused.

Useful.

---

# DISCOVERY EXPERIENCE

Instead of:

500 providers

↓

Use:

Top Recommended Options

Why they're recommended

Availability

Languages

Travel Context

---

Users should feel guided.

Not forced to evaluate.

---

# PROVIDER PROFILE

Purpose:

Build trust.

---

# Sections

Overview

Languages

Services

Availability

Communication Options

Traveler Reviews

Recent Outcomes

Location

---

# Provider Header

Tokyo Medical Clinic

General Practice

Tokyo, Japan

Accepting New Patients

---

Languages

English

Japanese

---

Availability

Today

---

# ABOUT SECTION

Explain:

Who they are

What they offer

Why travelers choose them

Avoid:

Marketing language

Buzzwords

Technical metrics

---

# SERVICES

Examples

General Consultation

Travel Illness

Prescription Assistance

Follow-Up Care

Urgent Consultation

---

Simple.

Clear.

Human.

---

# AVAILABILITY CENTER

Purpose:

Show real-world readiness.

---

# Status Types

Available

Busy

Limited Availability

Emergency Only

Unavailable

---

# Example

Tokyo Medical Clinic

Available

Next Appointment

4:30 PM

---

The user should know:

Can I receive care?

Not:

How does the scheduling algorithm work?

---

# COMMUNICATION STATUS

Purpose:

Visibility.

---

# Examples

Provider Contacted

↓

Message Delivered

↓

Provider Responded

↓

Consultation Scheduled

---

The traveler should feel:

Progress is happening.

---

# CARE MATCHING EXPERIENCE

This is where SwasthYatra becomes different.

---

# Philosophy

Do not expose algorithms.

Do not expose scores.

Do not expose rankings.

---

Instead explain:

Why this option may be helpful.

---

Example

Recommended because:

Available today

English-speaking staff

Supports traveler care

Located nearby

---

Human explanations.

Not machine explanations.

---

# PROVIDER RESPONSE CENTER

Purpose:

Monitor outreach.

---

# Layout

Contacted Providers

↓

Waiting Responses

↓

Accepted Requests

↓

Scheduled Consultations

---

# Example

Tokyo Medical Clinic

Accepted

Consultation Scheduled

4:30 PM

---

# PROVIDER OUTCOMES

Purpose:

Build trust.

---

# Sections

Traveler Experiences

Resolved Journeys

Recovery Outcomes

Follow-Up Completion

---

# Example

Traveler

Food Poisoning

Status

Resolved

Follow-Up

Completed

---

Avoid:

Provider scores

Performance ratings

Algorithms

---

Focus on confidence.

---

# PHARMACY NETWORK

Purpose:

Medication access.

---

# Layout

Nearby Pharmacies

↓

Medication Availability

↓

Traveler Assistance

---

# Example

Shinjuku Pharmacy

Open Now

English Support

Medication Available

---

# HOSPITAL NETWORK

Purpose:

Advanced care access.

---

# Layout

Hospitals

↓

Emergency Care

↓

Specialists

↓

Capacity Status

---

# Example

Tokyo Central Hospital

Emergency Services

Available

English Support

---

# NETWORK COVERAGE

Purpose:

Demonstrate availability.

---

# Content

Countries Supported

Provider Network Presence

Language Coverage

Care Categories

---

Avoid:

Maps full of dots

Complex geographic visualizations

---

Use:

Clear coverage storytelling.

---

# PROVIDER ACTIVITY

Purpose:

Show network vitality.

---

# Feed

Provider Accepted Request

2 Minutes Ago

Consultation Scheduled

5 Minutes Ago

Traveler Assisted

8 Minutes Ago

Follow-Up Completed

15 Minutes Ago

---

The network should feel alive.

---

# PROVIDER TIMELINE

Every provider interaction follows:

Care Request Created

↓

Provider Contacted

↓

Provider Responded

↓

Consultation Scheduled

↓

Treatment Delivered

↓

Follow-Up

↓

Outcome Recorded

---

The timeline should communicate trust.

---

# PROVIDER SEARCH

Reference:

Raycast.

---

Requirements

Instant

Keyboard Friendly

Fast

Context-Aware

Traveler-Aware

Location-Aware

---

Search should feel:

Powerful

Simple

Human

---

# CONTEXT RAIL

Always visible.

Contains:

Nearby Providers

Current Availability

Communication Status

Recent Activity

Upcoming Consultations

Emergency Options

---

# EMPTY STATES

Never:

No providers found.

---

Instead:

We're expanding provider coverage in this area.

Our support team can still help coordinate care options.

[ Contact Support ]

---

# ANIMATION SYSTEM

Micro

Buttons

Selections

Filters

Badges

80–120ms

---

Structural

Provider Cards

Provider Lists

Profiles

Panels

180–250ms

---

Narrative

Provider Response

Consultation Scheduled

Provider Confirmed

Care Coordinated

500–900ms

---

# CONTENT LANGUAGE

Never:

Provider Graph

Matching Engine

Provider Intelligence

Recommendation Engine

Outcome Model

Internal Systems

---

Use:

Provider Network

Care Options

Availability

Traveler Support

Care Coordination

Provider Response

Human language only.

---

# VISUAL DIFFERENTIATION

Patient OS

Personal Journey

---

Communication Center

Healthcare Coordination

---

Health Passport

Healthcare Identity

---

Provider Network

Healthcare Access

The Provider Network should feel like:

A trusted care access layer.

Not a search engine.

Not a directory.

Not a marketplace.

---

# JUDGE MOMENT

When judges open the Provider Network they should immediately think:

"This is not showing me providers."

"This is helping me reach care."

That is the moat.

Not discovery.

Access.

---

# SUCCESS CRITERIA

The Provider Network should feel like:

The world's most traveler-focused healthcare access network.

Users should feel:

Guided

Supported

Confident

Connected

while maintaining:

Raycast-quality UI

Linear-quality decision-making

Stripe-quality trust

Cursor-quality progress visibility

and a healthcare access experience that transforms provider discovery into real-world care coordination.



# PHASE 18

# CARE OUTCOMES, LEARNING NETWORK & TRUST LAYER

# THE COMPOUNDING ADVANTAGE OF SWASTHYATRA

The Care Outcomes System is the second major moat of SwasthYatra.

The first moat is:

Provider Network

The second moat is:

Care Outcomes

Every healthcare journey generates knowledge.

Every provider interaction generates insight.

Every medication experience creates context.

Every recovery strengthens the network.

The platform becomes more valuable over time because it learns from real-world healthcare journeys.

However:

Users should never see this as AI.

Users should never see this as algorithms.

Users should never see this as a graph.

Users should never see this as machine learning.

They should see:

Trust.

Confidence.

Experience.

Proven care pathways.

---

# PRODUCT PHILOSOPHY

Most healthcare platforms stop after treatment.

SwasthYatra continues after treatment.

The journey does not end when care is delivered.

The platform continues through:

Recovery

↓

Follow-Up

↓

Outcome

↓

Learning

↓

Improved Future Journeys

---

# DESIGN OBJECTIVE

Users should feel:

Confident

Supported

Reassured

Informed

Protected

Never:

Analyzed

Scored

Measured

Tracked

Evaluated

---

# QUESTIONS THIS SYSTEM MUST ANSWER

What happened?

Did the traveler recover?

What care was provided?

What worked well?

What can future travelers benefit from?

What should happen next?

---

# CORE MODULES

Care Outcomes Home

Completed Journeys

Recovery Tracking

Traveler Feedback

Follow-Up Center

Provider Outcomes

Medication Outcomes

Journey Insights

Network Impact

Trust Center

---

# CARE OUTCOMES HOME

Purpose:

Provide visibility into completed care journeys.

Not analytics.

Not dashboards.

Not reports.

Completed healthcare stories.

---

# Layout

Recent Outcomes

↓

Recovery Tracking

↓

Follow-Up Status

↓

Traveler Experiences

↓

Network Impact

↓

Quick Actions

---

# Header

Care Outcomes

Understanding what happened after care was delivered.

---

# Quick Actions

View Outcomes

Track Recovery

Submit Feedback

Review Follow-Up

---

# RECENT OUTCOMES

Purpose:

Show successful journey completions.

---

# Outcome Card

Traveler

Issue

Provider

Outcome

Recovery Status

Follow-Up

---

# Example

Sarah Johnson

Food Poisoning

Tokyo Medical Clinic

Resolved

Recovery Confirmed

Follow-Up Complete

---

# COMPLETED JOURNEYS

Purpose:

Healthcare stories.

Not records.

Not tickets.

Not cases.

---

# Layout

Journey Timeline

↓

Treatment Summary

↓

Recovery Status

↓

Follow-Up

↓

Traveler Feedback

---

# Journey Story Example

Food Poisoning

Tokyo, Japan

---

Assessment Completed

↓

Provider Confirmed

↓

Consultation Scheduled

↓

Treatment Received

↓

Recovery Confirmed

↓

Journey Completed

---

Users should feel:

Closure.

Confidence.

Resolution.

---

# RECOVERY TRACKING

Purpose:

Understand post-treatment progress.

---

# Sections

Recovery Status

Check-Ins

Follow-Up Tasks

Provider Recommendations

Traveler Notes

---

# Example

Recovery Status

Improving

---

Follow-Up

Scheduled Tomorrow

---

Provider Recommendation

Continue hydration and rest.

---

# FOLLOW-UP CENTER

Purpose:

Ensure continuity.

---

# Layout

Upcoming Follow-Ups

↓

Pending Follow-Ups

↓

Completed Follow-Ups

---

# Follow-Up Card

Traveler

Provider

Date

Status

---

Example

Sarah Johnson

Tokyo Medical Clinic

Tomorrow

Scheduled

---

# TRAVELER FEEDBACK

Purpose:

Capture experience.

Build trust.

Improve support.

---

# Feedback Structure

Experience

Communication

Provider Support

Resolution

Overall Satisfaction

---

# Example

The provider was easy to communicate with and treatment was arranged quickly.

Recovery was smooth and follow-up was helpful.

---

Avoid:

Star ratings everywhere.

Review spam.

Marketplace behavior.

---

# PROVIDER OUTCOMES

Purpose:

Build confidence.

Not rankings.

Not scores.

---

# Sections

Resolved Journeys

Traveler Recovery

Follow-Up Completion

Care Continuity

Traveler Experiences

---

# Example

Tokyo Medical Clinic

Recent Traveler Outcomes

Food Poisoning

Resolved

Recovery Confirmed

---

The focus is:

Trust.

Not competition.

---

# MEDICATION OUTCOMES

Purpose:

Show real-world medication experiences.

---

# Example

Medication

Calonal

Purpose

Pain Relief

Outcome

Symptoms Improved

Follow-Up

Not Required

---

# JOURNEY INSIGHTS

Purpose:

Help travelers understand.

---

# Philosophy

Never expose:

Algorithms

Graphs

Prediction Models

Outcome Engines

---

Instead explain:

Travelers in similar situations often found these steps helpful.

---

Example

For travelers experiencing food poisoning abroad:

Hydration guidance was frequently recommended.

Provider consultations typically occurred within a few hours.

Most journeys were resolved without hospitalization.

---

Human language only.

---

# NETWORK IMPACT

This is where SwasthYatra's moat becomes visible.

But not technical.

---

# Purpose

Show that every journey contributes to helping future travelers.

---

# Example

Your completed journey contributes to improving future healthcare navigation experiences.

Provider Network Updated

Care Outcomes Expanded

Traveler Support Improved

---

Do NOT show:

Nodes

Edges

Embeddings

Graphs

Learning Models

---

Show human outcomes.

---

# TRUST CENTER

Purpose:

Explain why recommendations can be trusted.

---

# Sections

Provider Experience

Traveler Outcomes

Follow-Up Completion

Communication Success

Care Continuity

---

The message should be:

This guidance is informed by real healthcare journeys.

---

# ORGANIZATION VIEW

Organizations see:

Traveler Recovery

Journey Completion

Support Effectiveness

Outcome Trends

Follow-Up Completion

---

Not:

Algorithms

Scores

Internal Systems

---

# PROVIDER VIEW

Doctors and Pharmacists see:

Resolved Cases

Follow-Up Success

Traveler Recovery

Care Continuity

Traveler Feedback

---

This helps improve care.

Not performance monitoring.

---

# MEDICAL ASSISTANT VIEW

Medical Assistants see:

Support Success

Recovery Confirmation

Follow-Up Completion

Traveler Satisfaction

---

This reinforces the value of human coordination.

---

# OPERATOR VIEW

Operators see:

Recovered Journeys

Resolved Escalations

Intervention Success

Network Recovery

Support Outcomes

---

Mission Control learns.

Not algorithms.

---

# CONTEXT RAIL

Always visible.

Contains:

Recent Outcomes

Follow-Up Status

Recovery Updates

Traveler Feedback

Care Continuity

Recent Activity

---

# ACTIVITY FEED

Recovery Confirmed

2 Hours Ago

Follow-Up Completed

Yesterday

Outcome Recorded

2 Days Ago

Traveler Feedback Submitted

3 Days Ago

---

The system should continuously demonstrate progress.

---

# OUTCOME TIMELINE

Every journey follows:

Issue Reported

↓

Assessment

↓

Provider Confirmed

↓

Treatment Delivered

↓

Recovery Tracked

↓

Follow-Up Completed

↓

Outcome Recorded

↓

Journey Contributes To Network

---

This should feel like completion.

Not data collection.

---

# EMPTY STATES

Never:

No outcomes found.

---

Instead:

As healthcare journeys are completed, outcomes and recovery updates will appear here.

These outcomes help strengthen future traveler support experiences.

[ View Active Journeys ]

---

# ANIMATION SYSTEM

Micro

Feedback Submission

Status Updates

Selections

Badges

80–120ms

---

Structural

Outcome Cards

Journey Stories

Recovery Panels

180–250ms

---

Narrative

Recovery Confirmation

Follow-Up Completion

Journey Completion

Network Contribution

500–900ms

---

# CONTENT LANGUAGE

Never:

Outcome Engine

Knowledge Graph

Learning Model

Prediction System

Healthcare Graph

AI Learning

Embeddings

Internal Systems

---

Use:

Care Outcomes

Recovery Tracking

Traveler Experiences

Provider Experience

Journey Completion

Care Continuity

Trust Center

Human language only.

---

# VISUAL DIFFERENTIATION

Provider Network

Access To Care

---

Communication Center

Coordination

---

Health Passport

Healthcare Identity

---

Care Outcomes

Trust

Confidence

Continuity

The Care Outcomes experience should feel reflective.

Calm.

Confident.

Human.

---

# JUDGE MOMENT

When judges open Care Outcomes they should think:

"This system doesn't stop at treatment."

"It follows through."

"It learns from real healthcare journeys."

"It becomes more valuable over time."

without ever seeing:

AI

Graphs

Models

Algorithms

---

# SUCCESS CRITERIA

The Care Outcomes System should feel like:

The trust layer of global healthcare navigation.

Not analytics software.

Not reporting software.

Not business intelligence.

Users should feel:

Confident

Supported

Reassured

Protected

while maintaining:

Raycast-quality UI

Linear-quality information flow

Stripe-quality trust

Apple-quality clarity

and a human-centered outcome experience that compounds the value of every healthcare journey completed through SwasthYatra.


Perfect. Now we move from product architecture into presentation architecture.
Everything until Phase 18 defined what SwasthYatra is.
Phases 19–24 define how the world experiences it.

PHASE 19
DEMO PLATFORM & JUDGE EXPERIENCE
THE 5-MINUTE STORY
The Demo Platform is not a demo.
It is a narrative engine.
It exists to answer:

Why should SwasthYatra exist?

within 5 minutes.

DEMO PHILOSOPHY
Most hackathons show features.
Most startups show dashboards.
Most products show screens.
SwasthYatra should show:
A healthcare journey.

JUDGE FLOW
Problem↓Traveler Gets Sick↓Navigation Assistant Activates↓Provider Network Engaged↓Communication Established↓Interpreter Activated↓Treatment Delivered↓Outcome Recorded↓Network Improved
This becomes the story.

DEMO ROUTES
/demo
Purpose:
Entry point.
Not dashboard.
Not documentation.
Narrative hub.

Layout
Hero↓Scenario Cards↓Role Cards↓Platform Overview↓Launch Demo

Scenario Cards
Tokyo Food Poisoning
Bangkok Skin Rash
Berlin Medication Refill
Paris Sports Injury
Dubai Emergency Consultation
Singapore Prescription Guidance

/demo/scenarios
Purpose:
Choose stories.
Not features.

Each scenario should show:
TravelerLocationIssueDifficultyExpected Journey

/demo/agent-workspace
Most important page.
This is the page judges remember.

Reference:
Cursor
But healthcare.

Layout
Context↓Execution Timeline↓Activity Stream

Narrative
Traveler Needs Help↓Assessment↓Provider Search↓Provider Response↓Communication↓Interpreter↓Treatment↓Outcome

/demo/journey
Purpose:
Complete healthcare story.

Interactive timeline.
Not cards.
Not dashboards.
Story.

/demo/provider-network
Purpose:
Show access.
Not providers.
Access.

/demo/communication
Purpose:
Show coordination.
Not messaging.

/demo/outcomes
Purpose:
Show trust.

/demo/system
Purpose:
Show ecosystem.

Visualization
Traveler↓Navigation Assistant↓Provider Network↓Communication↓Healthcare Provider↓Outcome

/demo/architecture
Purpose:
Show why SwasthYatra exists.

Comparison
DirectoriesShow ProvidersChatbotsAnswer QuestionsSwasthYatraCoordinates Care

/demo/judge
Purpose:
Guided experience.

Step 1
Problem

Step 2
Journey

Step 3
Provider Network

Step 4
Communication

Step 5
Interpreter

Step 6
Outcome

Step 7
Moat

JUDGE EMOTION CURVE
Minute 1
Interesting
↓
Minute 2
This is useful
↓
Minute 3
This is different
↓
Minute 4
This solves a real problem
↓
Minute 5
This should exist

SUCCESS
Judges should remember:
Not AI.
Not dashboards.
Not architecture.
They should remember:
The traveler.
The journey.
The outcome.
The network.

PHASE 20
DOCUMENTATION HUB
STRIPE-LEVEL PRODUCT DOCUMENTATION
Documentation is a product.
Not markdown.
Not Notion.
Not static content.

PURPOSE
Help users understand:
Platform
Workflows
Roles
Integrations
Architecture

STRUCTURE
Getting Started↓How SwasthYatra Works↓Role Guides↓Journey Guides↓Provider Network↓Communication↓Care Outcomes↓API Reference↓SDK Reference

STYLE
Stripe
Vercel
Raycast
Linear

COMPONENTS
Search
Copy Buttons
Code Blocks
Workflow Blocks
Interactive Examples
CLI Cards
SDK Cards
Journey Diagrams

PHASE 21
MOTION SYSTEM
THE SWASTHYATRA MOTION LANGUAGE
Motion is communication.
Not decoration.

LEVEL 1
Micro Motion
80–120ms
Buttons
Badges
Selections
Filters

LEVEL 2
Structural Motion
180–250ms
Cards
Lists
Panels
Tables
Dialogs

LEVEL 3
Navigation Motion
250–350ms
Page Changes
Sidebar
Layout Shifts
Context Rail

LEVEL 4
Narrative Motion
500–900ms
Journey Progress
Provider Confirmation
Communication Ready
Treatment Complete
Outcome Recorded

MOTION REFERENCES
Raycast
Linear
Arc
Apple

LIBRARIES
Use:
Framer Motion
GSAP
Lenis
Motion
React Bits
Only.
No new frameworks.

PHASE 22
COMPONENT LIBRARY
THE SWASTHYATRA DESIGN SYSTEM
Every component must feel handcrafted.

COMPONENT CATEGORIES
Navigation
Cards
Actions
Timelines
Activity
Communication
Documents
Provider
Journey
Outcome
Role
Documentation
Demo

SPECIAL COMPONENTS
Journey Card
Outcome Card
Provider Card
Passport Card
Activity Stream
Narrative Timeline
Status Rail
Mission Control Card
Communication Thread
Interpreter Session

QUALITY BAR
If it would look out of place inside:
Raycast
Linear
Apple
Stripe
Do not ship it.

PHASE 23
CONTENT LANGUAGE SYSTEM
One of the most important phases.

NEVER SAY
AI
LLM
Agent Runtime
Vector Search
Knowledge Graph
Healthcare Graph
Inference
Embeddings
Planner
Executor
Workflow Engine

ALWAYS SAY
Navigation Assistant
Provider Network
Care Outcomes
Journey
Support
Care Coordination
Communication
Traveler Support
Recovery
Follow-Up

TONE
Human
Professional
Trustworthy
Clear
Calm
Confident

EXAMPLE
Bad:
Provider ranking model selected provider.
Good:
A provider is available and ready to assist.

Bad:
Outcome engine updated.
Good:
Your completed journey helps improve future traveler support.

PHASE 24
FINAL QUALITY STANDARDS
ANTI-VIBECODING MANIFESTO
Before shipping anything ask:

Would Raycast ship this?
Would Linear ship this?
Would Stripe ship this?
Would Apple ship this?
Would Cursor ship this?

If the answer is:
No
Continue refining.

FORBIDDEN
Generic dashboards
Empty hero sections
Placeholder charts
Random metrics
Template cards
AI-generated copy
Fake activity
Fake analytics
Stock illustrations
Huge whitespace
Dribbble UI
Startup landing pages
Material UI lookalikes
Shadcn defaults left untouched
Generic SaaS design

REQUIRED
Intentional hierarchy
Narrative storytelling
Operational clarity
Meaningful motion
Dense information
Premium typography
Contextual activity
World-class onboarding
Role-specific experiences
Healthcare-first language

FINAL TEST
When someone opens SwasthYatra they should NOT think:
This looks like a healthcare startup.
They should think:
This feels like an operating system built specificallyto help people navigate healthcare anywhere in the world.
That is the standard every page, component, animation, interaction and workflow must meet.


SWASTHYATRA FRONTEND CODEBASE ARCHITECTURE
src/

├── app/
├── components/
├── features/
├── design-system/
├── motion/
├── providers/
├── hooks/
├── lib/
├── types/
├── config/
├── stores/
├── services/
├── layouts/
├── content/
├── demo/
└── docs/
APP ROUTER STRUCTURE
app/

├── (marketing)
├── (auth)
├── (onboarding)
├── (dashboard)
├── (provider)
├── (organization)
├── (hospital)
├── (operator)
├── (medical-assistant)
├── (demo)
├── (docs)
├── api
└── globals.css
MARKETING
(marketing)

├── page.tsx
├── architecture
├── provider-network
├── communication
├── outcomes
├── trust
├── pricing
├── contact
└── about

Pages:

/

/architecture

/provider-network

/communication

/outcomes

/about
AUTH
(auth)

├── sign-in
├── sign-up
├── auth-error
├── verify
└── loading
ONBOARDING
(onboarding)

├── welcome
├── role-selection
├── traveler
├── doctor
├── pharmacist
├── hospital
├── organization
├── medical-assistant
├── operator
└── complete
PATIENT OS
/dashboard

├── page.tsx
├── journey
├── passport
├── vault
├── history
├── medications
├── providers
├── communication
├── interpreter
├── outcomes
├── settings
└── support
DOCTOR OS
/provider

├── page.tsx
├── assignments
├── patients
├── communication
├── interpreter
├── availability
├── outcomes
├── profile
└── settings
PHARMACIST OS
/provider/pharmacist

├── page.tsx
├── requests
├── medications
├── equivalents
├── interactions
├── travelers
├── communication
├── outcomes
└── availability
HOSPITAL OS
/hospital

├── page.tsx
├── incoming-cases
├── emergency
├── departments
├── providers
├── interpreter
├── communication
├── travelers
├── outcomes
└── settings
ORGANIZATION OS
/organization

├── page.tsx
├── travelers
├── journeys
├── escalations
├── providers
├── communication
├── outcomes
├── reports
├── members
└── settings
MEDICAL ASSISTANT OS
/medical-assistant

├── page.tsx
├── travelers
├── journeys
├── provider-coordination
├── interpreter
├── communication
├── follow-ups
├── escalations
└── outcomes
OPERATOR OS
/operator

├── page.tsx
├── mission-control
├── escalations
├── failed-journeys
├── provider-operations
├── communication-monitoring
├── emergency
├── network-health
├── interventions
└── outcomes
AGENT OS

The crown jewel.

/dashboard/assistant

├── page.tsx

├── care-navigation
├── medication-support
├── communication-support
├── follow-up-support
├── escalation-support
└── activity

Components:

AgentWorkspace.tsx

AgentTimeline.tsx

AgentContextPanel.tsx

AgentActivityRail.tsx

NarrationBar.tsx

JourneyExecution.tsx

ProviderSearchStep.tsx

CommunicationStep.tsx

OutcomeStep.tsx

JourneyCompletion.tsx
COMMUNICATION CENTER
/dashboard/communication

├── page.tsx
├── conversations
├── provider-responses
├── calls
├── interpreter
├── shared-documents
├── timeline
└── notifications
HEALTH PASSPORT
/dashboard/passport

├── page.tsx
├── share
├── qr
├── access-history
├── insurance
├── emergency
└── medications
MEDICAL VAULT
/dashboard/vault

├── page.tsx
├── documents
├── reports
├── prescriptions
├── insurance
├── uploads
└── sharing
PROVIDER NETWORK
/dashboard/providers

├── page.tsx
├── doctors
├── pharmacists
├── hospitals
├── emergency
├── availability
├── communication
└── outcomes
DEMO SYSTEM

Your demo is already the judge experience.

/demo

├── page.tsx
├── pitch
├── judge
├── scenarios
├── architecture
├── system
├── communication
├── journey
├── provider-network
├── outcomes
├── patient
├── doctor
├── pharmacist
├── hospital
├── organization
├── operator
├── agent-workspace
├── docs
└── testing-guide
DOCS SYSTEM

Stripe-like docs.

/docs

├── page.tsx

├── getting-started
├── workflows
├── architecture
├── provider-network
├── communication
├── outcomes
├── sdk
├── api
├── guides
└── faq
FEATURE ARCHITECTURE
features/

├── auth
├── onboarding
├── patient
├── provider
├── pharmacist
├── hospital
├── organization
├── operator
├── medical-assistant
├── communication
├── interpreter
├── passport
├── vault
├── provider-network
├── outcomes
├── notifications
├── agent
├── demo
└── docs
COMPONENT SYSTEM
components/

├── navigation
├── sidebar
├── command-menu
├── cards
├── timelines
├── activity
├── communication
├── provider
├── passport
├── vault
├── outcomes
├── motion
├── docs
├── demo
└── shared
DESIGN SYSTEM
design-system/

├── foundations

│   ├── colors
│   ├── typography
│   ├── spacing
│   ├── radius
│   ├── shadows

├── components

│   ├── cards
│   ├── buttons
│   ├── inputs
│   ├── command
│   ├── dialogs

└── patterns

    ├── timelines
    ├── activity-streams
    ├── status-rails
    ├── narrative-sections
MOTION SYSTEM
motion/

├── transitions
├── page-transitions
├── timelines
├── activity
├── storytelling
├── provider-network
├── outcomes
├── communication
└── agent

Libraries:

Framer Motion

GSAP

Lenis

React Bits

Motion
SHARED LAYOUTS
layouts/

├── MarketingLayout
├── DashboardLayout
├── ProviderLayout
├── HospitalLayout
├── OrganizationLayout
├── OperatorLayout
├── AssistantLayout
├── DemoLayout
└── DocsLayout
BIGGEST FRONTEND SYSTEMS

The most important frontend systems are:

1. Navigation Assistant (Agent OS)

2. Communication Center

3. Health Passport

4. Medical Vault

5. Provider Network

6. Demo Platform

7. Organization OS

8. Operator Mission Control

9. Doctor OS

10. Medical Assistant OS

These directly map to the backend you've already built:

Agent Runtime V2
↓
Agent OS

Provider Network Domain
↓
Provider Network UI

Communication Domain
↓
Communication Center

Live Interpreter
↓
Interpreter Workspace

Health Passport
↓
Passport UI

Vault Pipeline
↓
Medical Vault

Outcome Engine
↓
Care Outcomes

Escalation Engine
↓
Mission Control

Provider Portal
↓
Doctor / Pharmacist OS

Organization Domain
↓
Organization OS

This architecture gives you a true multi-OS healthcare platform rather than a collection of dashboards, and it aligns almost 1:1 with the backend systems you've already implemented.


