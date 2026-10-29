# Activity Log

## 2026-10-29 — Work Gallery carousel replaced with marquees and modal

Overhauled the `#works` section in `index.html` per the redesign request.

- `#works` background switched to `var(--accent-blue)` with white text
- Removed the 3D carousel (HTML, CSS, `setupCarousel` JS, and mobile overrides)
- Added two infinite marquee tracks (left/right) built from `worksData`, duplicated once for a seamless -50% loop; a third certificate track was skipped until certificate images exist
- Each `.marquee-item` carries `data-title/subtitle/desc/link`; hover pauses the track
- Added a `#work-modal` overlay at the end of the body; item click populates and opens it, close button or backdrop click dismisses it
- Mobile 768px: marquee items shrink to 180px

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