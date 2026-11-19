# LesothoStream — BIWD1110/DIWD1110 Principles of Web Design

## Open/run the project
1. Extract this ZIP.
2. Open the project folder in VS Code.
3. Start a local server (VS Code Live Server or run `python -m http.server 8000`).
4. Open `http://localhost:8000`. Fetching `data/titles.json` works best through a local web server.

## Files
- `index.html` — semantic HTML sections, navigation, forms and modals.
- `styles.css` — responsive styling, grid/flex layouts and media queries.
- `app.js` — JavaScript behaviour, DOM updates, validation, search, filters and local storage.
- `data/titles.json` — 15 catalogue records loaded with Fetch API.
- `REPORT.md` — assignment report.
- `ASSIGNMENT_CHECKLIST.md` — complete requirements/rubric checklist and final submission steps.
- `TESTING_GUIDE.md` — step-by-step manual test plan.
- `GROUP_CONTRIBUTION_LOG.md` — template to complete with actual group members/tasks.
- `PRESENTATION_GUIDE.md` — demonstration sequence and suggested explanations.

## Features
- Login/register gate with front-end validation (academic prototype only).
- Discover/featured, trending, catalogue, details, My List, activity, About/Help.
- 15 sample catalogue titles across multiple genres and content types.
- Search, genre/type filters, dynamic catalogue rendering and JSON-fetch fallback.
- Add/remove My List; local browser persistence.
- Demo video playback/source links where supplied, rating, review, watched status, activity and recommendations.
- Contact/help form validation and responsive Bootstrap layout.

## Important limitations
This is not a production streaming or authentication service. User accounts, list, ratings, reviews and activity are stored in the current browser and are not shared with other devices/users. Sample media are not necessarily the actual film named on each catalogue card. Archive download/source links must be checked for copyright, territory and reuse rights before sharing. Remote poster/video assets need internet access.

## Hosting
Upload the complete folder (including `data/titles.json`) to GitHub Pages, Netlify or Vercel. Test the public URL in an incognito/private window and on a phone. The lecturer must be able to open the public URL without a hosting-account login.

## Separate HTML pages
Five entry pages are included: `index.html` (Home), `browse.html` (Browse/Catalogue), `details.html` (select a title to open details modal), `my-list.html` (Watchlist), and `about.html` (About/Help). Shared CSS, JavaScript, and JSON keep features consistent.
