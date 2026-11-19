# LesothoStream — Principles of Web Design Group Assignment Report

**Course:** BIWD1110/DIWD1110 – Principles of Web Design  
**Institution:** Limkokwing University of Creative Technology, Lesotho  
**Project:** LesothoStream – Online Video Catalogue  
**Platform type:** Responsive web application

## 1. Project concept and target audience
LesothoStream is an original student streaming-catalogue concept inspired by common streaming-service navigation. It allows visitors to discover sample films, series, documentaries and educational videos. The target audience is viewers and learners in Lesotho, including mobile users and people with varying internet access. The interface uses a dark background and green accent colour inspired by the natural environment of the Mountain Kingdom.

## 2. Required website pages and sections
1. **Home / Discover:** A featured hero banner, navigation and a call to explore the catalogue.
2. **Browse / Catalogue:** Fifteen catalogue records, including Adventure, Documentary, Drama, Education and Classic American entries. Each card displays a poster, title, genre, type, year, duration and short description.
3. **Title details:** Selecting Details / Watch opens a Bootstrap modal with title information, an in-page media player, sample/trailer information, archive download options when available, and rating/review controls.
4. **My List:** Users can add, remove, search, sort and clear titles; saved titles feed a recommendation row. Saved IDs are stored separately for each account in browser `localStorage`, so each viewer has a personal list on the same browser.
5. **Search and filtering:** Search checks title and description. Genre and content-type dropdowns provide additional filters.
6. **Sign in / Sign up:** A full-screen sign-in and registration gate appears before the rest of the website. Registration validates a full name, email, password and password confirmation, and offers English/Sesotho language preference. Visitors cannot view the catalogue or other sections until they sign in or register. A profile view and sign-out action are available after access is granted.
7. **About / Help:** Provides an expanded platform story, values, feature information, FAQs and a validated contact form.

## 3. HTML5 and semantic structure
`index.html` uses semantic `header`, `nav`, `main`, `section`, `article` and `footer` elements. It includes page metadata, a descriptive page title, labelled form controls, alternative text for poster images and working in-page navigation.

## 4. CSS styling and layout
The external `styles.css` file defines the colour palette, typography, spacing, backgrounds, borders, card design, hover states and responsive media queries. Flexbox is used for alignment and Bootstrap's grid is used for responsive catalogue columns. The layout adapts to mobile, tablet and desktop widths and avoids intentional horizontal overflow.

## 5. Bootstrap and responsive design
Bootstrap 5 is included through its CDN stylesheet and JavaScript bundle. Components/utilities used include:
- Responsive navbar and collapsible mobile navigation.
- Grid rows and columns for the catalogue and content sections.
- Cards built with Bootstrap grid and custom card styling.
- Modal windows for title details and account profile.
- Forms and form controls.
- Toast notifications and alerts.
- Responsive spacing and display utilities.

Bootstrap's grid and responsive navbar help the interface rearrange for different screen widths.

## 6. JavaScript fundamentals, search and filtering
`app.js` uses variables, strings, arrays, objects, conditions, loops/array methods, functions and event listeners. The catalogue is stored as an array of objects loaded from JSON and rendered dynamically. Search filters by title or description. Genre and type filters provide additional filtering. DOM selection and manipulation update the catalogue, watchlist, status messages and authentication controls. Events include `click`, `input`, `change` and `submit`.

## 7. Forms and validation
The contact form uses labelled fields, `required`, `type="email"` and `minlength` constraints. JavaScript checks validity and displays feedback through a toast notification. The account forms validate required fields, email format, password length and password confirmation. Passwords are processed using PBKDF2 with a per-account random salt before the derived hash is stored in browser `localStorage`. The original password is not stored. The sign-in screen clearly identifies the account feature as an academic front-end demonstration and tells users that account information stays in the current browser; users are warned not to use a real or reused password or enter payment details. Because there is no server-side authentication, this remains a front-end academic implementation and must not be used with a password used on another service.

## 8. Arrays, objects, DOM and localStorage
`data/titles.json` contains fifteen title objects with IDs, titles, genres, content types, years, durations, descriptions, poster paths and trailer links. JavaScript creates catalogue cards from these objects. My List uses account-specific `localStorage` keys to save selected title IDs, restore them on sign-in, search and sort saved titles, clear the list, and update the page when a title is added or removed. A helpful empty-list message is shown when there are no saved titles.

## 9. Fetch/API or JSON and error handling
The page uses the Fetch API to request `./data/titles.json`. The supplied project folder includes this file at that exact relative path. A loading message is displayed while data is retrieved. If the request fails, the app uses a built-in fallback containing the catalogue records (15 titles) and shows a status message. This means the minimum catalogue requirement remains visible even when the JSON request cannot be completed. This demonstrates data retrieval and error handling without depending on an external API.

## 10. Media and links
The catalogue includes fifteen poster thumbnail references. Poster images are remote image links and therefore need an internet connection. The details modal includes in-page sample video playback for catalogue demo titles and Internet Archive embeds/download source pages for selected classic American entries. The sample catalogue videos are demonstration media, not title-specific full films. Check the archive item page and local territorial rights before public redistribution or downloading. The original creators and licensing information are acknowledged here. Poster photographs are loaded from Unsplash and remain subject to the applicable Unsplash licence and terms.

## 11. Advanced interactive features
- Trending section: ranks catalogue entries using browser-stored viewer ratings; shows title rating averages and counts.
- Recommended for you: suggests titles based on genres in My List and local watch history.
- Rating system: viewers can rate titles from one to five stars; ratings are associated with the demonstration display name and can be changed by that viewer.
- Rating transparency: details modal lists display names and ratings.
- Reviews: visitors can write short title reviews; reviewer names and timestamps are shown.
- Activity feed: records rating, review and watched actions in the browser.
- Watch history: records title opens and marked-watched actions locally.
- Embedded playback: sample video sources play in an HTML video player; Internet Archive classics use archive embeds. These are demo/source-hosted media, not a promise that every catalogue title has a full commercial film stream.
- Download links: archive titles provide a link to their source download options where available.
- Personalised list sorting/search and clear-list confirmation.
- Profile display, sign-out, language preference and password show/hide control.
- Contact form topic selection, character counter and validation.

All ratings, reviews, activity and history are stored locally. This is a prototype: data is not shared across devices or through a server/database.

## 12. Hosting and testing
The project is suitable for static hosting on GitHub Pages, Netlify or Vercel. All project files and the `data` folder must be uploaded together. After deployment, test the public URL in a private/incognito browser and on a separate mobile device. Confirm that the lecturer can access the site without needing an account or permission.

## 13. Lesotho context
The platform uses the identity LesothoStream and references the Mountain Kingdom and Basotho audiences. The design is mobile-responsive and recognises that internet connectivity and data affordability can differ between Maseru and rural districts. Local stories and educational content are represented in the sample catalogue.

## 14. Testing checklist
- [ ] Home, Browse, My List and About navigation links work.
- [ ] Catalogue loads and displays all 15 records when the JSON file is available.
- [ ] Search filters by title and description.
- [ ] Genre filter works.
- [ ] Content-type filter works.
- [ ] Details modal opens; embedded sample/Archive playback displays; download link appears for archival items.
- [ ] Add to My List works and prevents duplicates.
- [ ] Remove from My List works.
- [ ] My List remains after refreshing the same browser.
- [ ] The sign-in screen is the only screen visible before authentication.
- [ ] Registration validates name, email, password and password confirmation.
- [ ] Registration language preference is saved to the account.
- [ ] A registered account can sign in again using the same browser.
- [ ] Incorrect credentials display an error message.
- [ ] Profile details display correctly and sign-out returns to the access screen.
- [ ] My List remains separate for different accounts.
- [ ] Contact form validates required fields and email.
- [ ] Ratings, rating names, reviews, activity feed and watch history persist locally and appear in the UI.
- [ ] JSON loading failure shows a fallback message and catalogue.
- [ ] Trending and recommendations render; layout is checked at phone, tablet and desktop widths.
- [ ] Deployed URL is tested without hosting-account login.

## 14. Limitations
This is an academic front-end project. Account records and salted password hashes are stored in the browser, not on a server. This does not provide production-grade authentication, central account management, password recovery, multi-device synchronisation, rate limiting or server-side access control. Do not reuse a personal password. The contact form saves submissions in the current browser only and does not send messages to a server. The catalogue is sample content and the external poster/trailer resources require internet access. A production streaming service would require licensed content, a secure backend, database, account security, content delivery infrastructure and appropriate privacy controls.

## 15. Conclusion
LesothoStream demonstrates the main web-design skills required by the assignment: semantic HTML, external CSS, Bootstrap, responsive layout, JavaScript fundamentals, dynamic catalogue rendering, search, filters, form validation, DOM interaction, localStorage, Fetch API, error handling and hosting readiness. It provides a locally relevant streaming-catalogue concept for Basotho users.
