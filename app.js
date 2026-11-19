const catalogueEl = document.getElementById('catalogue');
const watchlistEl = document.getElementById('watchlist');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const typeFilter = document.getElementById('typeFilter');
const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('appToast'), {delay: 3000});
let titles = [];
let authMode = 'login';

function notify(message) {
  document.getElementById('toastMessage').textContent = message;
  toast.show();
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
async function loadCatalogue() {
  const status = document.getElementById('loadingStatus');
  status.textContent = 'Loading catalogue…';
  try {
    const response = await fetch('./data/titles.json');
    if (!response.ok) throw new Error('Catalogue request failed');
    titles = await response.json();
    if (!Array.isArray(titles) || titles.length < 1) throw new Error('Catalogue is empty');
    status.textContent = 'Catalogue loaded successfully.';
  } catch (error) {
    // Reliable fallback keeps the catalogue usable if a host blocks local JSON fetching.
    titles = fallbackTitles;
    status.textContent = 'The catalogue file could not be reached, so all built-in sample titles are displayed instead.';
    notify('Catalogue loaded.');
  }
  document.getElementById('catalogueCount').textContent = `${titles.length} titles`;
  const knownGenres=[...new Set(titles.map(t=>t.genre))].sort();genreFilter.innerHTML='<option value="all">All genres</option>'+knownGenres.map(g=>`<option>${escapeHTML(g)}</option>`).join('');
  renderCatalogue();
  renderWatchlist();
  renderTrending();
  renderRecommended();
  renderActivity();
}
const fallbackTitles = [
  {
    "id": 1,
    "title": "Mountain Kingdom",
    "genre": "Documentary",
    "type": "Documentary",
    "year": 2025,
    "duration": "42 min",
    "description": "A journey through Lesotho's highlands, villages and mountain landscapes.",
    "poster": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700",
    "trailer": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "trailerCredit": "Blender Foundation open movie (Creative Commons Attribution 3.0)",
    "watchUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "watchType": "video",
    "watchLabel": "Open sample video · Blender Foundation"
  },
  {
    "id": 2,
    "title": "The Last Shepherd",
    "genre": "Drama",
    "type": "Film",
    "year": 2024,
    "duration": "1h 38min",
    "description": "A young shepherd faces difficult choices while protecting his family's land.",
    "poster": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700",
    "trailer": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "trailerCredit": "Blender Foundation open movie (Creative Commons Attribution 3.0)",
    "watchUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "watchType": "video",
    "watchLabel": "Open sample video · Blender Foundation"
  },
  {
    "id": 3,
    "title": "Code Your Future",
    "genre": "Education",
    "type": "Educational",
    "year": 2025,
    "duration": "28 min",
    "description": "An introduction to digital skills, problem solving and building your first website.",
    "poster": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700",
    "trailer": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "trailerCredit": "Blender Foundation open movie (Creative Commons Attribution 3.0)",
    "watchUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "watchType": "video",
    "watchLabel": "Open sample video · Blender Foundation"
  },
  {
    "id": 4,
    "title": "City Lights",
    "genre": "Drama",
    "type": "Series",
    "year": 2023,
    "duration": "6 episodes",
    "description": "Friends navigate work, family and ambition in a changing city.",
    "poster": "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=700",
    "trailer": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "trailerCredit": "Blender Foundation open movie (Creative Commons Attribution 3.0)",
    "watchUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "watchType": "video",
    "watchLabel": "Open sample video · Blender Foundation"
  },
  {
    "id": 5,
    "title": "Wild Africa",
    "genre": "Documentary",
    "type": "Documentary",
    "year": 2024,
    "duration": "51 min",
    "description": "Explore wildlife, conservation and the natural world across the region.",
    "poster": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=700",
    "trailer": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "trailerCredit": "Blender Foundation open movie (Creative Commons Attribution 3.0)",
    "watchUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "watchType": "video",
    "watchLabel": "Open sample video · Blender Foundation"
  },
  {
    "id": 6,
    "title": "The Startup",
    "genre": "Education",
    "type": "Educational",
    "year": 2025,
    "duration": "35 min",
    "description": "Learn how young entrepreneurs turn ideas into practical businesses.",
    "poster": "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=700",
    "trailer": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "trailerCredit": "Blender Foundation open movie (Creative Commons Attribution 3.0)",
    "watchUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "watchType": "video",
    "watchLabel": "Open sample video · Blender Foundation"
  },
  {
    "id": 7,
    "title": "Beyond the River",
    "genre": "Adventure",
    "type": "Film",
    "year": 2022,
    "duration": "1h 45min",
    "description": "An adventurous journey tests courage, teamwork and determination.",
    "poster": "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=700",
    "trailer": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "trailerCredit": "Blender Foundation open movie (Creative Commons Attribution 3.0)",
    "watchUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "watchType": "video",
    "watchLabel": "Open sample video · Blender Foundation"
  },
  {
    "id": 8,
    "title": "Learning Together",
    "genre": "Education",
    "type": "Educational",
    "year": 2024,
    "duration": "22 min",
    "description": "Practical study techniques for learners and teachers.",
    "poster": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700",
    "trailer": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "trailerCredit": "Blender Foundation open movie (Creative Commons Attribution 3.0)",
    "watchUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "watchType": "video",
    "watchLabel": "Open sample video · Blender Foundation"
  },
  {
    "id": 9,
    "title": "Our Heritage",
    "genre": "Documentary",
    "type": "Documentary",
    "year": 2023,
    "duration": "46 min",
    "description": "Stories celebrating culture, heritage and community traditions.",
    "poster": "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=700",
    "trailer": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "trailerCredit": "Blender Foundation open movie (Creative Commons Attribution 3.0)",
    "watchUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "watchType": "video",
    "watchLabel": "Open sample video · Blender Foundation"
  },
  {
    "id": 10,
    "title": "One More Chance",
    "genre": "Drama",
    "type": "Film",
    "year": 2025,
    "duration": "1h 29min",
    "description": "A story about second chances, friendship and believing in yourself.",
    "poster": "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=700",
    "trailer": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "trailerCredit": "Blender Foundation open movie (Creative Commons Attribution 3.0)",
    "watchUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "watchType": "video",
    "watchLabel": "Open sample video · Blender Foundation"
  },
  {
    "id": 11,
    "title": "Digital Lesotho",
    "genre": "Education",
    "type": "Documentary",
    "year": 2025,
    "duration": "31 min",
    "description": "How digital services can support education, health and business in Lesotho.",
    "poster": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700",
    "trailer": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "trailerCredit": "Blender Foundation open movie (Creative Commons Attribution 3.0)",
    "watchUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "watchType": "video",
    "watchLabel": "Open sample video · Blender Foundation"
  },
  {
    "id": 12,
    "title": "Highland Adventure",
    "genre": "Adventure",
    "type": "Series",
    "year": 2024,
    "duration": "4 episodes",
    "description": "Discover breathtaking highland routes and outdoor adventures.",
    "poster": "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=700",
    "trailer": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "trailerCredit": "Blender Foundation open movie (Creative Commons Attribution 3.0)",
    "watchUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "watchType": "video",
    "watchLabel": "Open sample video · Blender Foundation"
  },
  {
    "id": 101,
    "title": "The General",
    "genre": "Classic American",
    "type": "American Film",
    "year": 1926,
    "duration": "1h 19min",
    "description": "A silent comedy featuring a locomotive chase during the American Civil War. This archival copy is presented for educational discovery; verify territorial rights.",
    "poster": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700",
    "watchUrl": "https://archive.org/embed/TheGeneral",
    "watchType": "iframe",
    "watchLabel": "Internet Archive player",
    "downloadPage": "https://archive.org/download/TheGeneral/",
    "trailerCredit": "Internet Archive source; rights may vary by territory"
  },
  {
    "id": 102,
    "title": "Night of the Living Dead",
    "genre": "Classic American",
    "type": "American Film",
    "year": 1968,
    "duration": "1h 36min",
    "description": "A black-and-white horror classic in which strangers shelter in a farmhouse during a zombie outbreak. Archive edition and rights status can vary.",
    "poster": "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=700",
    "watchUrl": "https://archive.org/embed/NightOfTheLivingDead1968-Restored",
    "watchType": "iframe",
    "watchLabel": "Internet Archive player",
    "downloadPage": "https://archive.org/download/NightOfTheLivingDead1968-Restored/",
    "trailerCredit": "Internet Archive source; rights may vary by territory"
  },
  {
    "id": 103,
    "title": "His Girl Friday",
    "genre": "Classic American",
    "type": "American Film",
    "year": 1940,
    "duration": "1h 32min",
    "description": "A fast-paced newsroom comedy about an editor, his former wife and a story that refuses to slow down.",
    "poster": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963?w=700",
    "watchUrl": "https://archive.org/embed/his_girl_friday",
    "watchType": "iframe",
    "watchLabel": "Internet Archive player",
    "downloadPage": "https://archive.org/download/his_girl_friday/",
    "trailerCredit": "Internet Archive source; rights may vary by territory"
  }
];


const ratingKey = 'lesothostream-ratings-v1';
const reviewsKey = 'lesothostream-reviews-v1';
const activityKey = 'lesothostream-activity-v1';
function getRatings(){try{return JSON.parse(localStorage.getItem(ratingKey)||'{}')}catch{return {}}}
function getReviews(){try{return JSON.parse(localStorage.getItem(reviewsKey)||'[]')}catch{return []}}
function getActivity(){try{return JSON.parse(localStorage.getItem(activityKey)||'[]')}catch{return []}}
function currentDisplayName(){return getCurrentUser()?.name || 'Guest Viewer'}
function ratingSummary(id){const list=getRatings()[id]||[];return list.length?`${(list.reduce((a,r)=>a+r.stars,0)/list.length).toFixed(1)} ★ · ${list.length} rating${list.length===1?'':'s'}`:'Not rated yet'}
function addActivity(entry){const feed=getActivity();feed.unshift({...entry,at:new Date().toISOString()});localStorage.setItem(activityKey,JSON.stringify(feed.slice(0,40)));renderActivity()}
function saveRating(id,stars){const ratings=getRatings();ratings[id]=ratings[id]||[];const user=currentDisplayName();ratings[id]=ratings[id].filter(r=>r.user!==user);ratings[id].push({user,stars,at:new Date().toISOString()});localStorage.setItem(ratingKey,JSON.stringify(ratings));addActivity({kind:'rating',title:titles.find(t=>t.id===id)?.title||'Title',user,stars});notify(`You rated this ${stars} out of 5 stars.`);renderCatalogue();renderTrending();renderRecommended();showDetails(id)}
function saveReview(id,text){if(!text.trim())return;const reviews=getReviews();reviews.unshift({id,user:currentDisplayName(),text:text.trim(),at:new Date().toISOString()});localStorage.setItem(reviewsKey,JSON.stringify(reviews));addActivity({kind:'review',title:titles.find(t=>t.id===id)?.title||'Title',user,text:text.trim()});notify('Your review was added.');showDetails(id)}
function renderActivity(){const feed=document.getElementById('activityFeed');if(!feed)return;const entries=getActivity().slice(0,12);feed.innerHTML=entries.length?entries.map(e=>`<article class="activity-item"><span class="activity-icon">${e.kind==='rating'?'★':'✎'}</span><div><strong>${escapeHTML(e.user)}</strong> ${e.kind==='rating'?'rated':e.kind==='watched'?'watched':'reviewed'} <strong>${escapeHTML(e.title)}</strong>${e.kind==='rating'?` <span class="rating-stars">${'★'.repeat(e.stars)}${'☆'.repeat(5-e.stars)}</span>`:`<p class="mb-0 mt-1">${escapeHTML(e.text)}</p>`}<small class="muted">${new Date(e.at).toLocaleString()}</small></div></article>`).join(''):'<div class="empty-state">No community activity yet. Rate or review a title to start the feed.</div>'}

function renderRecommended(){const el=document.getElementById('recommendedCards');if(!el)return;const ids=getList();const history=JSON.parse(localStorage.getItem('lesothostream-history')||'[]');const seed=[...ids.map(id=>titles.find(t=>t.id===id)).filter(Boolean),...history.map(h=>titles.find(t=>t.id===h.id)).filter(Boolean)];const genres=seed.map(t=>t.genre);const fav=genres.sort((a,b)=>genres.filter(g=>g===b).length-genres.filter(g=>g===a).length)[0];const rec=titles.filter(t=>!ids.includes(t.id)&&(!fav||t.genre===fav)).slice(0,4);el.innerHTML=(rec.length?rec:titles.slice(0,4)).map(t=>cardHTML(t)).join('')}

function renderTrending(){const el=document.getElementById('trendingCards');if(!el)return;const ratings=getRatings();const sorted=[...titles].sort((a,b)=>{const ra=ratings[a.id]||[],rb=ratings[b.id]||[];const sa=ra.reduce((n,r)=>n+r.stars,0)/(ra.length||1),sb=rb.reduce((n,r)=>n+r.stars,0)/(rb.length||1);return (sb*rb.length)-(sa*ra.length)}).slice(0,4);el.innerHTML=sorted.map(t=>cardHTML(t)).join('');}

function cardHTML(item, inList=false) {
 return `<div class="col-6 col-md-4 col-xl-3"><article class="video-card">
  <div class="poster-wrap"><img src="${escapeHTML(item.poster)}" alt="Poster image for ${escapeHTML(item.title)}" loading="lazy" onerror="this.src='https://placehold.co/600x800/17211d/c2df9b?text=LesothoStream'"><span class="poster-tag">${escapeHTML(item.genre)}</span></div>
  <div class="video-card-body"><h3>${escapeHTML(item.title)}</h3><div class="card-meta">${escapeHTML(item.type)} · ${item.year} · ${escapeHTML(item.duration)}</div><div class="rating-summary">${ratingSummary(item.id)}</div><p>${escapeHTML(item.description)}</p>
  <div class="card-actions"><button class="btn btn-brand btn-card" data-action="details" data-id="${item.id}">Details / Watch</button>${inList?`<button class="btn btn-outline-green btn-card list-remove" data-action="remove" data-id="${item.id}">Remove</button>`:`<button class="btn btn-outline-green btn-card" data-action="add" data-id="${item.id}">+ My List</button>`}</div></div>
 </article></div>`;
}
function renderCatalogue() {
 const term = searchInput.value.trim().toLowerCase();
 const genre = genreFilter.value;
 const type = typeFilter.value;
 const filtered = titles.filter(item => {
  const matchesText = `${item.title} ${item.description}`.toLowerCase().includes(term);
  return matchesText && (genre === 'all' || item.genre === genre) && (type === 'all' || item.type === type);
 });
 catalogueEl.innerHTML = filtered.map(item => cardHTML(item)).join('');
 document.getElementById('emptySearch').classList.toggle('d-none', filtered.length !== 0);
}
function listStorageKey() { const user = getCurrentUser(); return user?.email ? `lesothostream-list-${user.email.toLowerCase()}` : 'lesothostream-list'; }
function getList() { try { return JSON.parse(localStorage.getItem(listStorageKey()) || '[]'); } catch { return []; } }
function saveList(list) { localStorage.setItem(listStorageKey(), JSON.stringify(list)); renderWatchlist(); renderRecommended(); renderTrending(); }
function renderWatchlist() {
 const ids = getList();
 const term = (document.getElementById('listSearch')?.value || '').trim().toLowerCase();
 const sort = document.getElementById('listSort')?.value || 'recent';
 let saved = ids.map(id => titles.find(item => item.id === id)).filter(Boolean);
 if (term) saved = saved.filter(item => `${item.title} ${item.description} ${item.genre}`.toLowerCase().includes(term));
 if (sort === 'title') saved.sort((a,b) => a.title.localeCompare(b.title));
 if (sort === 'year') saved.sort((a,b) => b.year - a.year);
 watchlistEl.innerHTML = saved.map(item => cardHTML(item, true)).join('');
 document.getElementById('listCount').textContent = `${ids.length} saved`;
 document.getElementById('listEmpty').classList.toggle('d-none', ids.length > 0);
 document.getElementById('listSummary').textContent = ids.length ? `${ids.length} ${ids.length === 1 ? 'title' : 'titles'} saved · ${saved.length} shown` : 'Your personal watchlist will appear here.';
 if (ids.length && !saved.length) watchlistEl.innerHTML = '<div class="col-12"><div class="empty-state">No saved titles match that search. Try another word.</div></div>';
}
function showDetails(id) {
 const item=titles.find(entry=>entry.id===Number(id));if(!item)return;
 const history=JSON.parse(localStorage.getItem('lesothostream-history')||'[]');history.unshift({id:Number(id),user:currentDisplayName(),at:new Date().toISOString(),event:'opened'});localStorage.setItem('lesothostream-history',JSON.stringify(history.slice(0,100)));
 const ratings=getRatings()[id]||[];const reviews=getReviews().filter(r=>r.id===Number(id));
 const myRating=ratings.find(r=>r.user===currentDisplayName())?.stars||0;
 const watch=item.watchUrl||item.trailer;const iframe=item.watchType==='iframe';
 const player=iframe?`<iframe class="video-player" src="${escapeHTML(watch)}" title="Watch ${escapeHTML(item.title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`:`<video class="video-player" controls playsinline preload="metadata"><source src="${escapeHTML(watch)}" type="video/mp4">Your browser cannot play this video.</video>`;
 const ratingsMarkup=ratings.length?ratings.map(r=>`<div class="rating-person"><span>${escapeHTML(r.user)}</span><span class="rating-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</span><small class="muted">${new Date(r.at).toLocaleDateString()}</small></div>`).join(''):'<p class="muted">No ratings yet. Be the first.</p>';
 const reviewsMarkup=reviews.length?reviews.map(r=>`<article class="review-item"><strong>${escapeHTML(r.user)}</strong><p>${escapeHTML(r.text)}</p><small class="muted">${new Date(r.at).toLocaleString()}</small></article>`).join(''):'<p class="muted">No reviews yet.</p>';
 document.getElementById('titleModalLabel').textContent=item.title;
 document.getElementById('titleDetails').innerHTML=`<img class="detail-poster" src="${escapeHTML(item.poster)}" alt="Poster for ${escapeHTML(item.title)}"><div class="eyebrow">${escapeHTML(item.genre)} · ${escapeHTML(item.type)}</div><p class="muted">${item.year} · ${escapeHTML(item.duration)} · ${ratingSummary(item.id)}</p><p>${escapeHTML(item.description)}</p><div class="player-heading"><h3>Watch on LesothoStream</h3><span class="badge text-bg-secondary">${escapeHTML(item.watchLabel||'Sample player')}</span></div>${player}<p class="small muted mt-2">Demo playback: open/sample video content is provided for coursework. Full commercial titles are not hosted here.</p><div class="d-flex flex-wrap gap-2 my-3"><button class="btn btn-brand" data-action="add" data-id="${item.id}">+ Add to My List</button>${item.downloadPage?`<a class="btn btn-outline-green" href="${escapeHTML(item.downloadPage)}" target="_blank" rel="noopener">Download options</a>`:''}<button class="btn btn-outline-green" data-action="watched" data-id="${item.id}">Mark watched</button></div><section class="rating-panel"><h3>Rate this title</h3><div class="star-rating" role="group" aria-label="Rate from one to five stars">${[1,2,3,4,5].map(n=>`<button type="button" class="star-button ${n<=myRating?'selected':''}" data-action="rate" data-id="${item.id}" data-stars="${n}" aria-label="${n} stars">★</button>`).join('')}</div><p class="small muted">Ratings are visible with demo viewer names in this browser.</p><h4>Who rated it?</h4>${ratingsMarkup}</section><section class="reviews-panel mt-3"><h3>Viewer reviews</h3>${reviewsMarkup}<form data-action="review-form" data-id="${item.id}" class="review-form mt-3"><label class="form-label" for="reviewText">Add your review</label><textarea id="reviewText" name="reviewText" class="form-control" rows="3" maxlength="400" placeholder="What did you think?" required></textarea><button class="btn btn-brand mt-2" type="submit">Post review</button></form></section>`;
 bootstrap.Modal.getOrCreateInstance(document.getElementById('titleModal')).show();
 const videoEl=document.querySelector('#titleDetails video.video-player');
 if(videoEl){ videoEl.addEventListener('error',()=>{ const box=document.createElement('div'); box.className='video-fallback'; box.innerHTML=`<strong>Sample video could not load in this preview.</strong><p>Some preview environments block external video sources. Use the button below to open the sample video directly, or continue exploring the website features.</p><a class="btn btn-outline-green" href="${escapeHTML(watch)}" target="_blank" rel="noopener">Open sample video in new tab</a>`; videoEl.replaceWith(box); },{once:true}); }
}

document.addEventListener('click', event => {
 const button = event.target.closest('[data-action]');
 if (!button) return;
 const id = Number(button.dataset.id);
 if (button.dataset.action === 'details') showDetails(id);
 if (button.dataset.action === 'rate') saveRating(id,Number(button.dataset.stars));
 if (button.dataset.action === 'watched') { const history=JSON.parse(localStorage.getItem('lesothostream-history')||'[]');history.unshift({id,user:currentDisplayName(),at:new Date().toISOString()});localStorage.setItem('lesothostream-history',JSON.stringify(history.slice(0,100)));addActivity({kind:'watched',title:titles.find(t=>t.id===id)?.title||'Title',user:currentDisplayName()});notify('Added to your watch history.'); }
 if (button.dataset.action === 'review-form') return;
 if (button.dataset.action === 'add') {
  const list = getList();
  if (list.includes(id)) notify('This title is already in My List.');
  else { list.push(id); saveList(list); notify('Title added to My List.'); }
 }
 if (button.dataset.action === 'remove') {
  saveList(getList().filter(savedId => savedId !== id));
  notify('Title removed from My List.');
 }
});
document.addEventListener('submit',event=>{const form=event.target.closest('[data-action=review-form]');if(!form)return;event.preventDefault();saveReview(Number(form.dataset.id),form.querySelector('[name=reviewText]').value);});
[searchInput, genreFilter, typeFilter].forEach(control => control.addEventListener(control === searchInput ? 'input' : 'change', renderCatalogue));


const AUTH_USERS_KEY = 'lesothostream-accounts';
const CURRENT_USER_KEY = 'lesothostream-current-user';
function getAccounts() { try { return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || '[]'); } catch { return []; } }
function setAccounts(accounts) { localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(accounts)); }
function getCurrentUser() { try { return JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY) || 'null'); } catch { return null; } }
function setAuthError(message='') {
 const el = document.getElementById('authError');
 el.textContent = message;
 el.classList.toggle('d-none', !message);
}
async function hashPassword(value, salt) {
 const encoder = new TextEncoder();
 const key = await crypto.subtle.importKey('raw', encoder.encode(value), 'PBKDF2', false, ['deriveBits']);
 const bits = await crypto.subtle.deriveBits({name:'PBKDF2', salt:encoder.encode(salt), iterations:120000, hash:'SHA-256'}, key, 256);
 return Array.from(new Uint8Array(bits)).map(byte => byte.toString(16).padStart(2,'0')).join('');
}
function setAuthMode(mode) {
 authMode = mode;
 const registering = mode === 'register';
 document.getElementById('loginTab').classList.toggle('active', !registering);
 document.getElementById('registerTab').classList.toggle('active', registering);
 document.getElementById('loginTab').setAttribute('aria-selected', String(!registering));
 document.getElementById('registerTab').setAttribute('aria-selected', String(registering));
 document.getElementById('authEyebrow').textContent = registering ? 'BECOME A MEMBER' : 'WELCOME BACK';
 document.getElementById('authHeading').textContent = registering ? 'Create your account' : 'Sign in to continue';
 document.getElementById('authDescription').textContent = registering ? 'A few details are all you need to get started.' : 'Your next favourite story is waiting.';
 document.getElementById('authSubmit').textContent = registering ? 'Create account' : 'Sign in';
 document.getElementById('registerNameGroup').classList.toggle('d-none', !registering);
 document.getElementById('confirmPasswordGroup').classList.toggle('d-none', !registering);
 document.getElementById('registerLanguageGroup').classList.toggle('d-none', !registering);
 document.getElementById('authName').required = registering;
 document.getElementById('authConfirmPassword').required = registering;
 document.getElementById('authPassword').autocomplete = registering ? 'new-password' : 'current-password';
 document.getElementById('authSwitchText').innerHTML = registering
  ? 'Already have an account? <button type="button" class="link-button" id="switchToLogin">Sign in</button>'
  : 'New to LesothoStream? <button type="button" class="link-button" id="switchToRegister">Create an account</button>';
 document.getElementById('authForm').classList.remove('was-validated');
 document.getElementById('authForm').querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
 document.getElementById('authForm').reset();
 setAuthError('');
}
document.getElementById('loginTab').addEventListener('click', () => setAuthMode('login'));
document.getElementById('registerTab').addEventListener('click', () => setAuthMode('register'));
document.getElementById('authSwitchText').addEventListener('click', event => {
 if (event.target.id === 'switchToRegister') setAuthMode('register');
 if (event.target.id === 'switchToLogin') setAuthMode('login');
});
document.getElementById('togglePassword').addEventListener('click', () => {
 const input = document.getElementById('authPassword');
 const showing = input.type === 'text';
 input.type = showing ? 'password' : 'text';
 document.getElementById('togglePassword').textContent = showing ? 'Show' : 'Hide';
});
document.getElementById('authForm').addEventListener('submit', async event => {
 event.preventDefault();
 const form = event.currentTarget;
 const email = document.getElementById('authEmail').value.trim().toLowerCase();
 const password = document.getElementById('authPassword').value;
 const name = document.getElementById('authName').value.trim();
 const confirm = document.getElementById('authConfirmPassword').value;
 document.getElementById('authEmail').value = email;
 document.getElementById('authName').value = name;
 document.getElementById('authEmail').setCustomValidity(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Enter a valid email address.');
 document.getElementById('authPassword').setCustomValidity(password.length >= 8 ? '' : 'Use at least 8 characters.');
 document.getElementById('authName').setCustomValidity(authMode === 'register' && name.length < 2 ? 'Enter your name.' : '');
 document.getElementById('authConfirmPassword').setCustomValidity(authMode === 'register' && confirm !== password ? 'Passwords do not match.' : '');
 if (!form.checkValidity()) {
  form.classList.add('was-validated');
  const invalid = form.querySelector(':invalid');
  if (invalid) invalid.focus();
  return;
 }
 const submit = document.getElementById('authSubmit');
 submit.disabled = true;
 submit.textContent = authMode === 'register' ? 'Creating account…' : 'Signing in…';
 try {
  const accounts = getAccounts();
  const existing = accounts.find(account => account.email === email);
  let user;
  if (authMode === 'register') {
   if (existing) { setAuthError('An account with this email already exists. Please sign in instead.'); return; }
   const salt = Array.from(crypto.getRandomValues(new Uint8Array(16))).map(byte => byte.toString(16).padStart(2,'0')).join('');
   const passwordHash = await hashPassword(password, salt);
   user = {name, email, salt, passwordHash, language: document.getElementById('authLanguage').value, createdAt: new Date().toISOString()};
   accounts.push(user);
   setAccounts(accounts);
   notify('Your account has been created. Welcome to LesothoStream.');
  } else {
   const passwordHash = existing ? await hashPassword(password, existing.salt) : '';
   if (!existing || existing.passwordHash !== passwordHash) { setAuthError('The email address or password is incorrect. Please try again.'); return; }
   user = existing;
   notify(`Welcome back, ${user.name}.`);
  }
  sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify({name:user.name,email:user.email,language:user.language || 'English'}));
  openApplication();
 } catch (error) {
  setAuthError('We could not complete that request. Please try again.');
 } finally {
  submit.disabled = false;
  submit.textContent = authMode === 'register' ? 'Create account' : 'Sign in';
 }
});
function openApplication() {
 const user = getCurrentUser();
 if (!user) return;
 document.getElementById('authGate').classList.add('d-none');
 document.getElementById('appShell').classList.remove('d-none');
 const area = document.getElementById('authArea');
 area.innerHTML = `<button class="account-menu" id="accountMenu" type="button"><span class="auth-avatar">${escapeHTML(user.name.charAt(0).toUpperCase())}</span><span class="account-menu-name">${escapeHTML(user.name)}</span><span aria-hidden="true">⌄</span></button>`;
 document.getElementById('accountMenu').addEventListener('click', showProfile);
 renderWatchlist();renderRecommended();
}
function showProfile() {
 const user = getCurrentUser();
 if (!user) return;
 document.getElementById('profileAvatar').textContent = user.name.charAt(0).toUpperCase();
 document.getElementById('profileName').textContent = user.name;
 document.getElementById('profileEmail').textContent = user.email;
 document.getElementById('profileLanguage').textContent = user.language || 'English';
 bootstrap.Modal.getOrCreateInstance(document.getElementById('profileModal')).show();
}
function signOut() {
 sessionStorage.removeItem(CURRENT_USER_KEY);
 document.getElementById('appShell').classList.add('d-none');
 document.getElementById('authGate').classList.remove('d-none');
 bootstrap.Modal.getInstance(document.getElementById('profileModal'))?.hide();
 setAuthMode('login');
 notify('You have signed out.');
}
document.getElementById('profileSignOut').addEventListener('click', signOut);
document.getElementById('listSearch').addEventListener('input', renderWatchlist);
document.getElementById('listSort').addEventListener('change', renderWatchlist);
document.getElementById('clearListBtn').addEventListener('click', () => {
 if (!getList().length) { notify('Your list is already empty.'); return; }
 if (window.confirm('Remove all saved titles from My List?')) { saveList([]); notify('My List has been cleared.'); }
});
document.getElementById('contactMessage').addEventListener('input', event => {
 document.getElementById('messageCount').textContent = `${event.target.value.length} / 1000`;
});
document.getElementById('contactForm').addEventListener('submit', event => {
 event.preventDefault();
 if (!event.target.checkValidity()) { event.target.reportValidity(); return; }
 const messages = JSON.parse(localStorage.getItem('lesothostream-messages') || '[]');
 messages.push({name:document.getElementById('contactName').value.trim(),email:document.getElementById('contactEmail').value.trim(),topic:document.getElementById('contactTopic').value,message:document.getElementById('contactMessage').value.trim(),sentAt:new Date().toISOString()});
 localStorage.setItem('lesothostream-messages', JSON.stringify(messages));
 notify('Thank you for contacting LesothoStream. Your message has been saved.');
 event.target.reset();
 document.getElementById('messageCount').textContent = '0 / 1000';
});
setAuthMode('login');
if (getCurrentUser()) openApplication();
loadCatalogue();
