# Activity Log

## 2026-11-09 — Review round 9: mobile top-row alignment fix

- Mobile media query only: the status bubble and QCU link both use the exact same fixed `top: 40px` inside the hero stack (the stack begins 30px below the floating header, so this is the coordinate-space equivalent of the requested 110-120px viewport value); a literal 110px would have landed on the PORTFOLIO lettering and portrait
- The link carries a small `transform: translateY(6px)` so its text sits on the same horizontal baseline as the taller bubble (verified center delta 0.5px at both 360x640 and 768x1024)
- Left stays at 5% for the bubble and right at 5% for the link; desktop rules were left exactly as they are
- Verified: same computed top value for both elements, 70px clearance below the header, tooltip shows 40px below the header when active, and no overlap with the portfolio text at phone and tablet sizes; graphify update run after changes

## 2026-11-09 — Review round 8: password obfuscation, modal description, bubble hover, auto tooltip

- Password check now compares the Base64 form (`btoa(...)` against the encoded string) so no plaintext password remains in the source; comments updated accordingly
- Added the descriptive paragraph above the password input ("To allow you to change this status you need to enter the password.") styled at 0.9rem with 0.8 opacity and a 15px bottom margin
- Status bubble text wrapped in `.status-text-content`; on hover or focus the text fades out and a "Change" label appears via the bubble's `::after` pseudo-element while the green live dot stays visible
- The internship tooltip gained a `.show-tooltip` auto-toggle driven by a 5-second interval (visible 5 seconds, hidden 5 seconds, repeating), a 0.5s opacity transition, and kept its hover reveal and blue speech-bubble styling with the down-pointing triangle
- Verified with headless Edge CDP at 1366x768: wrong password clears the input, the encoded comparison accepts the correct password, description text and styles match, the pseudo-element content reads "Change", and the tooltip toggles on at 5 seconds and off at 10 seconds; no console errors; graphify update run after changes

## 2026-11-09 — Review round 7: header-edge alignment, caption cleanup, gallery credits

- Desktop: the status bubble now uses `left: 12.5%` and the QCU link `right: 12.5%`, so both align pixel-perfectly with the 75% floating header edges (verified bubble x 171 = header left 171 and link right 1195 = header right 1195); both sit on the same row at `top: 16%`
- Mobile: both elements share one top row again (`left/right 5%`, `top 2%`) with scaled fonts (bubble 0.58rem, link 0.6rem) producing a 9px gap between them, 43px below the floating header and above the PORTFOLIO ink
- Works modal: removed the redundant `.cf-caption` creation from `openWorksModal` and deleted the orphaned CSS rule; titles now appear only in the modal info panel
- Data: Logic Unlocked and Codesortium descriptions rewritten with the co-designer credits; all published merchandise items tagged (10 Lead Designer, Black Theme and Debug now Co-designer with new descriptions, three polo shirts stay Unpublished); BSCS-Entry tagged Lead Designer with the new description
- Verified with headless Edge CDP at 360x640 and 1366x768: edge alignment deltas of 0px, same-row checks, zero `.cf-caption` nodes, exact tag and description strings for all updated items; no console errors; graphify update run after changes

## 2026-11-09 — Review round 6: hero top row layout and centered status modals

- Split the status bubble and the Quezon City University link into two independently positioned elements: bubble at `top: 12%; left: 5%` and link at `top: 12%; right: 5%` with `z-index: 10` on both; the link stays borderless plain text with its animated underline and tooltip
- Mobile keeps the bubble at 12% left but moves the link to 17.5% right (below the bubble) because both elements cannot share one 360px-wide row without overlapping; verified no mutual overlap and no floating header overlap on both viewports
- Status modals are now perfectly centered (`top/left 50%` with a translate), z-index 2000, with a new full-screen `.status-overlay` backdrop (`rgba(0,0,0,0.5)` plus `blur(8px)`, z-index 1999) that closes the dialog on click
- Opening either status modal sets `document.body.style.overflow = 'hidden'` and closing restores it; verified open, cancel and overlay-restore paths
- Copy updated from "passcode" to "password" in the modal heading, input placeholder and the eye button labels
- Verified with headless Edge CDP at 360x640 and 1366x768: same-row alignment on desktop (0px delta), no overlaps, centered modal geometry, blur overlay styles, scroll lock and restore; no console errors; graphify update run after changes

## 2026-11-09 — Review round 5: custom status modal, top-right link, splash reveal, coverflow hit-test fix, Lance Studios brand

- Status editing replaced the native prompt with two custom bottom-centered modals matching the theme: a passcode modal (input with a show/hide eye toggle, Cancel and Enter buttons, passcode "Magneto21") and a status text modal with Cancel and Enter; wrong passcodes clear the input, correct ones open the text modal prefilled, Enter saves to localStorage under `userStatus` and Escape or Cancel closes the dialogs
- The Quezon City University link moved to the hero's top right as plain text (no borders or background) with a left-to-right animated underline and a right-aligned hover tooltip that no longer overflows the viewport edge
- `.floating-header` and `.hero-photo-layer` now start at opacity 0 with pointer events disabled; a `hero-revealed` class on the body fades them in
- The splash spinner became a speedometer ring (SVG circle, stroke-dashoffset 1.5s linear, clockwise from the top) started when "Yes, I'm sure" is clicked; when the fill completes the splash fades out and the header and portrait fade in together
- Works modal coverflow: root cause of the unclickable side cards was the `translateZ` depth offsets breaking hit-testing inside the modal context, so the works slots now use rotation and scale only (`.works-cf` overrides) while staying visually 3D; the modal also gained the same 5-second autoplay as the certifications carousel, with the coverflow timer destroyed on close to avoid stacked intervals; side cards now click-to-center correctly
- Added the "Lance Studios" brand as the first brands item (and first card slider image) with the provided description
- Verified with headless Edge CDP at 360x640 and 1366x768: splash flow (hidden opacity 0 to revealed 1), speedometer mid-fill, modal passcode flow including the eye toggle, click-to-center, autoplay advance, location link geometry and Lance Studios first item; no console errors; graphify update run after changes

## 2026-11-09 — Review round 4: hero box spacing, internship link, status bubble, tools columns, header and title styling

- Mobile hero: `.hero-bottom-left` to `bottom: 30%` and `.hero-bottom-right` to `bottom: 15%`; boxes now sit 14px apart with no overlap (left 329-568, right 582-664 at 360x640) instead of the previous 46px gap
- New `.hero-top-links` wrapper above the portfolio text: a location pin link to the Quezon City University Drive folder ("Quezon City University") with a blue tooltip on hover ("Click here to see 'Internship portfolio'") and an editable status bubble below it
- Status bubble: pulsing green dot, default text, blue hover and active states; click prompts a passcode, "magneto" opens a second prompt, the new text is saved to localStorage under `userStatus` and restored on page load
- Tools: mobile now uses two main columns (Visual Tools plus Applications left, Languages plus AIs right), Presentation spans both columns and the legend sits below; inner items switched to one column since the boxes are narrow; dots swapped so blue means Best, green means Good and yellow means Still learning (legend updated)
- Header: "Hire Me" renamed to "Contacts"; nav links got an animated left-to-right underline via a `::after` pseudo-element and dark-mode hover turns the link accent blue
- Dark mode: `.section-title` and `.contact-left .big-title` now use the accent blue; light mode unchanged
- Verified with headless Edge CDP at 360x640 and 1366x768; status persistence across reloads, dot counts (9 blue, 7 green, 4 yellow), grid placement and title colors all checked; no console errors; graphify update run after changes

## 2026-11-09 — Review round 3: hero separation, modal links, certification rename, tools legend, clamp fix

- Mobile hero: `.hero-bottom-left` to `bottom: 32%` and `.hero-bottom-right` to `bottom: 12%` (boxes now fully separated: left 316-555, right 601-683 at 360x640)
- Works modal: `.modal-info` got `min-height: 200px` with flex column centering so the panel no longer shifts between slides; added the `#works-modal-link` See Full Project button whose display and href are set per item (hidden for unpublished items and for published items without a link)
- Data: added the provided Facebook links for Logic Unlocked and Codesortium; restored the original curated links (Azure, Occupational Safety, Trust in God, Goodness of God, Code Quest, JPCS, Glory, lanyard posts) so the modal button logic has hrefs
- Merchandise: renamed files wired in (PS-Certificate/Favory/Statement, SC-BlackTheme/Debug/JpcsQcu/JpcsXCys/Pixelated); display titles stripped of PS and SC prefixes; card slider image paths updated; verified 0 broken images
- Renamed Certificates to Certifications across nav links, section id, section title and the medal deep-link target
- Tools: Programming Languages box renamed to Languages; mobile layout switches tool boxes to a 2-column grid with the Presentation box keeping a single column; new bordered legend below the grid for Best/Good/Still learning
- Added `line-clamp: 3` next to `-webkit-line-clamp` in the mobile card description and set `flex-shrink: 0` so the three-line clamp renders cleanly without the text colliding with the button
- Verified with headless Edge CDP at 360x640 and 1366x768; no console errors; graphify update run after changes

## 2026-11-09 — Refinements: mobile hero nudges, landscape works cards, square modal, tools v2, marquee sync, background toggle

Applied the second review round in `index.html`.

- Mobile hero: `.hero-bottom-left` raised to `bottom: 20.5%`, `.hero-bottom-right` lowered to `bottom: 25%` (still fully visible at scroll 0, right box remains lower than the left box)
- Works cards: removed the hard 3/8 divider; the picture now fades into the card color (bottom fade on desktop, right fade on the landscape mobile cards)
- Mobile works: cards are landscape rectangles (left 3/8 slider, right 5/8 text); `#works` uses `padding-top: 95px` and card height 131px so the title and all three cards fit one 360x640 viewport when navigating to #works
- Works modal: carousel slides are square 1:1 (300px desktop, 210px mobile) with `object-fit: contain`; certificates remain landscape; confirmed no See Full Project button exists inside the modal
- Visuals data: added Codesortium and Logic-Unlocked with the Co-designer tag (the six original items stay Lead Designer)
- Merchandise data: 15 items matching the exact file names; the five SC pin items use the release description "Released March 2025, on celebrating the 31st anniversary of QCU."; the three JPCS PoloShirt items keep the Unpublished tag
- Tools: new Applications box after Programming Languages (5-column grid); Node.js joined Programming; proficiency dots added (green best, blue good, yellow still learning); FreeShow and EasyWorship use Assets/app/FreeShow.png and Assets/app/EastWorship.png; OBS uses the local icon
- Marquee: rebuilt to the exact 20-item sequence with local Assets/app/ icons wherever available
- Background: JPCS duties start collapsed; the chevron toggle moved to the bottom-left underneath the text block
- Verified with headless Edge CDP at 360x640 and 1366x768 in dark and light mode; no console errors; graphify update run after changes

## 2026-11-09 — Major restructure: works cards, certificates, tools, 2-column background, mobile hero

Reworked `index.html` directly per the approved contract in `docs/index-2-restructure-contract.md`.

- Navigation: added Certificates and Tools links to `.header-center` and `.mobile-nav`; compact header rules moved to a new `max-width: 1200px` band (90% width, smaller links) so five links fit at 850-1200px
- Mobile hero 768px: `.hero-bg-portfolio` to `top: 7%`, `.hero-photo-layer` to `65vh` at `bottom: 20%` so the head top blocks the lower portion of the T and F while the upper portion stays visible, `.hero-bottom-left` to `bottom: 19%` (shoulder level, clear of nose and mouth), `.hero-bottom-right` to `bottom: 26%` (lower than the left box and fully visible at scroll 0)
- `#works`: replaced the 3D carousel with three portrait cards (Visuals, Merchandise, Brands); each card has a 3/8 image slider advancing every 5 seconds and a 5/8 text block with theme, title, subtitle, justified description and a See Full Project button
- `#works` modal: category items open in a five-slot 3D coverflow with portrait cards, arrows, swipe, click-to-focus and Escape/backdrop close; Visuals items carry the Lead Designer chip; Polo Shirts and Revise carry the stroked Unpublished chip with a red dot
- BSCS-Entry medal: bronze medal plus "3rd" badge closes the modal, scrolls to `#certificates` and activates the 3rd Placer slide
- `#certificates` (new): five-slot 3D landscape carousel over the six Assets/Certificates files, auto-advancing every 5 seconds; title, type and description parsed from filenames with display typos corrected
- `#tools` (new): four boxes (Visual Tools, Programming Languages, AIs, Presentation) with divider rows; CDN icons for Figma, HTML, CSS, JavaScript, Git, GitHub and OBS Studio; inline SVG for EasyWorship; local Assets/app icons for the remaining tools
- `#background`: two-column grid (Experience left, Education right) collapsing to one column on mobile; added NCMB internship entry and CSBN education entry under MMC; added a chevron toggle for the JPCS duties list
- Verified with headless Edge CDP screenshots at 360x640, 940x700 and 1366x768 in dark and light mode; no console errors; card and certificate auto-advance confirmed working

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