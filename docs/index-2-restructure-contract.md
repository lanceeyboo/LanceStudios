# Contract: index portfolio major restructure (index_2 request)

Approved by the developer before implementation. Scope: `index.html` (edited directly per approval).

## Deliverables

1. Navigation: add `Certificates` and `Tools` links to `.header-center` and `.mobile-nav`, ordered to match page flow (Works, Certificates, Tools, Profile, Background).
2. Mobile hero fixes (max-width: 768px): bg text raised to fill the top empty space, photo raised so the head top blocks the lower portion of the T and F in PORTFOLIO, `.hero-bottom-left` moved to shoulder level (clear of nose and mouth), `.hero-bottom-right` kept lower than the left box and fully visible at scroll 0.
3. `#works`: replace the 3D carousel with three portrait rectangle cards (Visuals, Merchandise, Brands); each card top 3/8 is an image slider cycling every 5 seconds, bottom 5/8 is Theme, Title, Subtitle, justified Description and a See Full Project button. Clicking a card or button opens a modal with a 5-slot 3D coverflow of that category's items (portrait cards). All visuals items carry a Lead Designer tag (developer decision). Merchandise items: Lanyards, Pins, Polo Shirts (Polo Shirts carry the stroked Unpublished tag with a red dot). Brands items: Glory, JPCS, Revise (Unpublished tag), BSCS-Entry; BSCS-Entry carries a bronze medal icon plus "3rd" top-right which closes the modal, scrolls to #certificates and activates the 3rd Placer certificate.
4. `#certificates` (new, after works): title "Certificates", subtitle "Some credentials achieved by Lance Harvey B. Borras." A 5-slot 3D landscape carousel of the six Assets/Certificates images, auto-advancing every 5 seconds, no See Full Project button; title, type and description parsed from filenames.
5. `#tools` (new, after certificates): title "Tools", subtitle "Tools and technologies Lance works with." Four boxes (Visual Tools, Programming Languages, AIs, Presentation) with per-item dividers. Icon logic: CDN for Figma, HTML, CSS, JavaScript, Git, GitHub, OBS Studio; inline SVG for EasyWorship (no CDN slug exists); local Assets/app images for Photoshop, Canva, VS Code, Visual Studio, CapCut, ProPresenter, Gemini, ChatGPT, Claude, DeepSeek. Developer decision: all dev tools (HTML, CSS, JavaScript, VS Code, Visual Studio, Git, GitHub) go in the Programming box.
6. `#background`: two-column layout (Experience left, Education right) on desktop, stacked on mobile. Experience adds NCMB (Frontend Developer Intern, Sept 2026 - Nov 2026, National Conciliation and Mediation Board, Brgy. Paligsahan, Quezon City) and a JPCS duties expand/collapse arrow toggle. Education adds CSBN (Colegio de San Bartolome de Novaliches, 2017 - 2021, Graduated junior high school) under MMC.

## Out of scope

- No backend changes (no backend exists in this repository).
- No changes to Assets, CLAUDE.md, the tech marquee, or unrelated JS behaviors.
- Copy for new items (Recruitment, Revise, BSCS-Entry, pins, shirts) is drafted conservatively and flagged for developer review.

## Verification

- CDP-driven Edge headless screenshots at 360x640 and desktop width before and after; hero criteria verified visually at scroll 0.
- `graphify update .` run after implementation.
- `docs/activity-log.md` updated (not committed).
