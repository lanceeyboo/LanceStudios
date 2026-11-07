# Activity Log

## 2026-11-08 — Mobile hero spacing fixes and splash loader logo

Repositioned portrait-mode hero elements and rebuilt the splash loader in `index.html`.

- Splash loader HTML now nests the spinner and logo (`Assets/lancestudios.png`) inside a `.spinner-container`
- New `.spinner-container` (90px) with absolute full-size `.spinner`; added `.loader-logo` with `pulse` keyframe animation; `.dark-mode .spinner` styling preserved
- Mobile 768px: `.hero-bg-portfolio` raised to `top: 12%`
- Mobile 768px: `.hero-photo-layer` set to `height: 65vh; bottom: 8%` so the head blocks the T and F
- Mobile 768px: `.hero-bottom-left` moved down to `bottom: 12%` (shoulder level, away from the nose)
- Mobile 768px: `.hero-bottom-right` raised to `bottom: 12%` to avoid bottom cutoff
- Ran `graphify update .` after changes (no topology changes detected)

## 2026-11-07 — Hybrid tech marquee icons: local images for 7 apps, CDN/SVG for rest

Switched 7 marquee icons to local files in `Assets/app/` while keeping CDN and inline SVG icons for the remaining tools.

- Photoshop, Canva, VS Code, Visual Studio, CapCut, CSS, and ProPresenter now use local `<img>` tags with exact filenames the user has on disk
- Figma, HTML, JavaScript, Git, GitHub keep Simple Icons CDN links; OBS Studio, Gemini, ChatGPT, Claude, DeepSeek keep inline SVGs
- Applied identically to both `.tech-group` blocks for seamless scroll
- Existing `.tech-item img` height constraints (28px desktop, 22px mobile) unchanged

## 2026-11-07 — Update tech marquee tool list, add AI tools, inline SVGs for non-CDN icons

Updated the tech stack marquee in `index.html` to remove a backend tool and add AI tools.

- Removed Node.js from both marquee groups
- Added Gemini, ChatGPT, Claude, and DeepSeek with inline SVG icons using brand colors
- CapCut, ProPresenter, and OBS Studio now use inline SVGs instead of CDN images
- Standard tools (Photoshop, Canva, Figma, VS Code, Visual Studio, HTML, CSS, JavaScript, Git, GitHub) still use Simple Icons CDN with brand colors
- Added `.tech-item svg` CSS rule (28px desktop, 22px mobile) matching the existing img constraints
- Final order: Photoshop, Canva, Figma, VS Code, Visual Studio, CapCut, HTML, CSS, JavaScript, Git, GitHub, ProPresenter, OBS Studio, Gemini, ChatGPT, Claude, DeepSeek

## 2026-11-07 — Fix broken tech marquee icons and update tool list

Replaced broken local icon files in the tech stack marquee with Simple Icons CDN images in `index.html`.

- Swapped all `Assets/Icons/*.png` references for `https://cdn.simpleicons.org/...` URLs with brand colors
- Removed Playwright from both duplicated marquee groups; list is now Photoshop, Canva, Figma, VS Code, Visual Studio, CapCut, HTML, CSS, JavaScript, Node.js, Git, GitHub, ProPresenter, OBS Studio
- Added `.dark-mode .tech-item img.mono-icon` filter rule so monochrome icons (CapCut, GitHub, ProPresenter, OBS) stay visible in dark mode
- Existing `.tech-item img` height constraints (28px desktop, 22px mobile) continue to apply to the CDN images

## 2026-11-07 — Add tech stack auto-scrolling marquee banner between hero and works

Added an infinite-scrolling tech stack banner in `index.html` positioned between the `#home` hero section and the `#works` gallery.

- Inserted `.tech-marquee-wrapper` with two duplicated `.tech-group` blocks (15 tools each) for seamless looping
- Added CSS: flex track with `scroll-tech` 40s linear infinite animation, pause on hover, responsive sizing at 768px
- Tools listed: Photoshop, Canva, Figma, VS Code, Visual Studio, CapCut, HTML, CSS, JavaScript, Node.js, Playwright, Git, GitHub, ProPresenter, OBS Studio
- Icon images reference `Assets/Icons/*.png` (user must supply the PNG files)
- Ran `graphify update .` after changes (27 nodes, 25 edges, 4 communities)

## 2026-11-07 — Revert works marquee to 3D carousel, add grid background, mobile hero box spacing

Reverted the unrequested marquee layout and applied two requested visual fixes in `index.html`.

- Fix A: restored `.works-container` HTML, CSS, and JS to the 3D carousel version from the prior commit; removed marquee tracks, `#work-modal`, and modal JS
- Fix B: added `body::before` fixed 40px grid pattern with dark-mode variant using `rgba(255,255,255,0.04)`
- Fix C: mobile `.hero-bottom-right` updated to `max-width: 260px; padding: 15px; box-sizing: border-box` to prevent content hitting the screen edge
- Ran `graphify update .` after changes (26 nodes, 24 edges, 4 communities)

## 2026-11-07 — Hero header fix, text reposition, works marquee rebuild

Applied portrait-layout fixes and rebuilt the Work Gallery in `index.html`.

- Removed the `.floating-header.header-hidden` CSS rule and the `classList.toggle('header-hidden', ...)` line so the menu bar no longer hides on mobile
- `.hero-bottom-left` moved to shoulder level: `bottom: 22%; left: 5%; width: auto; max-width: 250px; padding: 0`
- `.hero-bottom-right` moved to armpit level: `bottom: 8%; right: 5%; width: auto; max-width: 250px; padding: 0`
- `.hero-role-typed` gains `white-space: normal; word-break: keep-all` to prevent text cutoff
- Replaced the 3D carousel with three infinite marquee tracks (scroll-left artworks, scroll-right lanyards, scroll-left landscape certificates) plus `.marquee-item.cert-item` landscape sizing
- Added `#work-modal` pop-up with image-left / text-right layout, close button, backdrop and Escape key handling
- Added five new works entries (Clicker, Logic Unlocked, Codesortium, Recruitment Poster, BSCS Entry) to `worksData`
- Marquee items pause on hover and open the modal on click
- Mobile 768px: smaller marquee items (180px), landscape certs (260x160), modal stacks vertically

## 2026-11-07 — Mobile hero layout fixes pass 2 (overlaps and missing elements)

Repositioned portrait-mode hero elements in `index.html` to fix overlaps.

- Header rule updated: removed `padding`, added `top: 0` so the menu bar sits flush
- `.hero-bg-portfolio` moved up to `top: 15%` with `translate(-50%, 0)` so the head blocks the T and F
- `.hero-photo-layer` raised: `height: 75vh; bottom: 5%`, centered, `z-index: 2`
- `.hero-bottom-left` moved to shoulder level: `bottom: 35%; left: 0`, width `50%`, `max-width: 250px`, `z-index: 5`
- `.hero-bottom-right` moved to armpit level: `bottom: 15%; right: 0`, width `50%`, `max-width: 250px`, `z-index: 5`
- Side fades widened to `25vw` and raised to `z-index: 4` so they are visible over the photo

## 2026-11-07 — Default dark mode, side fades, mobile hero layout

Applied mobile/portrait hero refinements and default dark theme in `index.html`.

- `<body>` now starts with `no-scroll dark-mode` so dark mode is the default
- Added `.side-fade-left` / `.side-fade-right` gradient overlays inside `.hero-stack` (15vw, z-index 2, pointer-events none)
- Theme toggle icons: sun is active by default; JS initializes icon state from the body class on load
- 768px media query: forced `header` visible with flex row layout; `.hero-bg-portfolio` centered at `top: 28%` with `clamp(8rem, 40vw, 15rem)` and letter-spacing; photo layer full-width at `bottom: 0`, `60vh`, centered with `object-position: center bottom`; staggered text boxes (`.hero-bottom-left` at `bottom: 22%`, `.hero-bottom-right` at `bottom: 5%`); reduced font sizes for welcome, looking-for, and role text with right alignment

## 2026-10-20 — Right-side role box and blue theme (v4)

Added a floating role-typewriter box and updated the color scheme in `index.html`.

- Removed the scrolling name marquee (HTML + all associated CSS and keyframes)
- Added `.hero-bottom-right` floating box at `bottom: 25%; right: 12.5%` with border, radius, and shadow
- New `.hero-looking-for` and `.hero-role-typed` styles for the box content
- New role typewriter JS cycling through five job titles
- `:root` logo variables changed to `var(--accent-blue)`
- `.cta-btn` background and border switched to `var(--accent-blue)`, text color to `#ffffff`
- `.cta-btn:hover` now shows transparent bg with blue text
- Mobile 768px: role box repositioned to `bottom: -5%` spanning full width, centered

## 2026-10-20 — Hero section typewriter restored (v3)

Re-added the typewriter effect and cleared the photo-gradient overlap in `index.html`.

- Reverted the typed line to `<span id="hero-typewriter"></span><span class="hero-cursor">|</span>`
- Restored the full typewriter JS (`heroPhrases`, `renderHeroText`, `heroTypeEffect`)
- `.hero-bottom-left` raised to `bottom: 25%` to clear the suit's fade gradient
- `.hero-typed-line` already carries `white-space: nowrap` from the previous pass

## 2026-10-20 — Hero section layout rebalance (v2)

Further refinements to the `#home` `.hero-stack` layout in `index.html`.

- Removed the typewriter JS entirely; hero line is now static "Lance's Website" with blinking cursor
- `.hero-typed-line` gains `white-space: nowrap` to prevent wrapping
- `.hero-bg-portfolio` made massive: `clamp(12rem, 38vw, 32rem)`, `top: 38%`, with a bottom-fade mask
- `.hero-photo-layer` set to `bottom: 0; height: 88vh`
- `.hero-bottom-left` moved down to `bottom: 12%`
- Mobile 768px overrides updated: bg text `clamp(8rem, 32vw, 15rem)` at `top: 35%`, photo `65vh` at `bottom: 5%`, content at `bottom: 10%`

## 2026-10-20 — Hero section layout rebalance (v1)

Reworked the `#home` `.hero-stack` layout in `index.html` to fix cramped bottom elements.

- `.hero-bg-portfolio` enlarged to `clamp(8rem, 30vw, 26rem)` and moved to `top: 45%`
- `.hero-photo-layer` raised to `bottom: 5%`, height `80vh`
- New `.hero-bottom-left` container groups welcome text, typed line, description, and CTA button at `bottom: 25%; left: 12.5%` to align with the 75%-width header
- New `.hero-description` paragraph style added
- `.cta-btn` converted from absolute positioning to `position: relative; display: inline-block` so it flows inside the container
- 768px media query updated with matching mobile values