const view = document.getElementById('view');
const bottomNav = document.getElementById('bottomNav');
const overlayRoot = document.getElementById('overlayRoot');

const MONTHS = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const MONTHS_NOM = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
const WEEKDAYS = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];
const WEEKDAYS_SHORT = ['вс','пн','вт','ср','чт','пт','сб'];

const img = {
  museum: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=500&q=80',
  theater: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?auto=format&fit=crop&w=500&q=80',
  gallery: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=500&q=80',
  kids: 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=500&q=80',
  concert: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80',
  city: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=500&q=80',
  sea: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80',
  default: ''
};

function moscowToday() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Moscow', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date()).reduce((acc, p) => (acc[p.type] = p.value, acc), {});
  return new Date(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
}
function addDays(date, days) { const d = new Date(date); d.setDate(d.getDate() + days); return d; }
function iso(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
function fromIso(value) { const [y,m,d] = value.split('-').map(Number); return new Date(y, m - 1, d); }
function formatDayMonth(date) { return `${date.getDate()} ${MONTHS[date.getMonth()]}`; }
function relativeDate(date) {
  const today = moscowToday();
  const diff = Math.round((date - today) / 86400000);
  if (diff === 0) return ['Сегодня', formatDayMonth(date)];
  if (diff === 1) return ['Завтра', formatDayMonth(date)];
  if (diff === 2) return ['Послезавтра', formatDayMonth(date)];
  return [formatDayMonth(date), WEEKDAYS[date.getDay()]];
}
function h(text = '') {
  return String(text).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function plural(n, a, b, c) {
  n = Math.abs(n) % 100; const n1 = n % 10;
  if (n > 10 && n < 20) return c;
  if (n1 > 1 && n1 < 5) return b;
  if (n1 === 1) return a;
  return c;
}
function placeIcon() { return '<svg viewBox="0 0 24 24"><path d="M12 21s7-5.2 7-12A7 7 0 0 0 5 9c0 6.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>'; }
function heartIcon() { return '<svg class="fillable" viewBox="0 0 24 24"><path d="M12 21s-7.2-4.5-9.4-8.7C.6 8.5 2.6 5 6.5 5c2.2 0 3.8 1.3 5.5 3.4C13.7 6.3 15.3 5 17.5 5c3.9 0 5.9 3.5 3.9 7.3C19.2 16.5 12 21 12 21z"/></svg>'; }
function bellIcon() { return '<svg viewBox="0 0 24 24"><path d="M18 10a6 6 0 0 0-12 0v4.2L4.3 17A1 1 0 0 0 5 18.5h14a1 1 0 0 0 .7-1.5L18 14.2V10z"/><path d="M10 20a2.2 2.2 0 0 0 4 0"/></svg>'; }
function calendarIcon() { return '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>'; }
function clockIcon() { return '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>'; }

function buildEvents() {
  const today = moscowToday();
  return [
    { id:'sev1', offset:0, time:'11:00', title:'Путешествие по закулисью', venue:'Севастопольский театр кукол', address:'Севастополь, проспект Победы 9', image:img.kids, desc:'6+ Рекомендуемый возраст: 6+. Продолжительность экскурсии: 1 час. Хотите попасть в сказочный мир закулисья театра кукол? У вас есть уникальная возможность своими глазами увидеть театр кукол изнутри, узнать множество театральных легенд и секретов, прогуляться по театральным мастерским, где работают настоящие волшебники.', rating:0 },
    { id:'sev2', offset:0, time:'11:00', title:'Не улетай', venue:'Севастопольский театр драмы и комедии', address:'Севастополь, улица Ленина 12', image:img.theater, desc:'Семейный спектакль о дружбе, смелости и маленьких решениях, которые меняют большой день. Подходит для зрителей всех возрастов.', rating:5 },
    { id:'sev3', offset:0, time:'12:00', title:'Выставка «Первый в России»', venue:'Государственный объединенный музей', address:'Севастополь, Исторический бульвар 1', image:img.museum, desc:'Историческая выставка о людях, событиях и предметах, которые стали первыми в своем деле и повлияли на развитие региона.', rating:4 },
    { id:'sev4', offset:0, time:'16:00', title:'Пиковая дама', venue:'Академический театр драмы', address:'Севастополь, проспект Нахимова 6', image:img.theater, desc:'Классическая история в современной сценической форме. Напряжение, азарт и тонкая психологическая игра.', rating:5 },
    { id:'sev5', offset:0, time:'17:00', title:'Диалоги в искусстве: художник, зритель и город', venue:'Художественная галерея', address:'Севастополь, улица Большая Морская 15', image:img.gallery, desc:'Открытая встреча о том, как смотреть искусство, понимать контекст и находить в работах личные смыслы.', rating:0 },
    { id:'sev6', offset:1, time:'10:00', title:'Морская прогулка и экскурсия по бухтам', venue:'Графская пристань', address:'Севастополь, Графская пристань', image:img.sea, desc:'Маршрут по знаковым бухтам города с рассказом о флотской истории, архитектуре и природных видах Севастополя.', rating:5 },
    { id:'sev7', offset:1, time:'18:00', title:'Ханума', venue:'Севастопольский драматический театр', address:'Севастополь, проспект Нахимова 6', image:img.theater, desc:'Спектакль «Ханума» — всем известная история о соперничестве двух свах, блестяще воплощенная на сцене. События разворачиваются в старинном городе, где каждая встреча может изменить судьбу.', rating:5 },
    { id:'sev8', offset:1, time:'20:00', title:'Вечерний концерт на набережной', venue:'Приморский бульвар', address:'Севастополь, Приморский бульвар', image:img.concert, desc:'Музыка под открытым небом, вечерний город и программа из популярных композиций.', rating:4 },
    { id:'sev9', offset:2, time:'10:00', title:'Архитектурная прогулка по центру Севастополя', venue:'Площадь Нахимова', address:'Севастополь, площадь Нахимова', image:img.city, desc:'Пешеходный маршрут по ключевым зданиям центра, скрытым деталям фасадов и городским историям.', rating:0 },
    { id:'sev10', offset:2, time:'17:00', title:'Камерный концерт классической музыки', venue:'Дом офицеров флота', address:'Севастополь, улица Ленина 9', image:img.concert, desc:'Камерная программа в уютном зале: классика, романтические произведения и авторские комментарии исполнителей.', rating:5 },
    { id:'sev11', offset:3, time:'11:00', title:'Детская мастерская выходного дня', venue:'Культурный центр', address:'Севастополь, улица Льва Толстого 51', image:img.kids, desc:'Творческая мастерская для детей и родителей. Участники создадут собственную работу и заберут ее с собой.', rating:0 },
    { id:'sev12', offset:3, time:'19:00', title:'Спектакль «Вафельное сердце»', venue:'Театр юного зрителя', address:'Севастополь, улица Адмирала Октябрьского 2', image:img.theater, desc:'Теплый спектакль о детстве, дружбе, семье и важности маленьких обещаний.', rating:5 }
  ].map(e => ({...e, date: iso(addDays(today, e.offset)), ticketUrl: `https://yandex.ru/maps/?text=${encodeURIComponent(e.address)}`}));
}
let EVENTS = buildEvents();

const venues = ['Все площадки', ...Array.from(new Set(EVENTS.map(e => e.venue)))];
const saved = JSON.parse(localStorage.getItem('afisha_state_v5') || '{}');
const state = {
  tab: 'home',
  date: saved.date || iso(moscowToday()),
  venue: saved.venue || 'Все площадки',
  favorites: saved.favorites || [],
  subscriptions: saved.subscriptions || [],
  reviews: saved.reviews || {},
  current: saved.current || EVENTS[0].id,
  expanded: false
};
function save() {
  localStorage.setItem('afisha_state_v5', JSON.stringify({
    date: state.date, venue: state.venue, favorites: state.favorites,
    subscriptions: state.subscriptions, reviews: state.reviews, current: state.current
  }));
}
function byId(id) { return EVENTS.find(e => e.id === id); }
function isFav(id) { return state.favorites.includes(id); }
function isSub(id) { return state.subscriptions.includes(id); }
function filteredEvents() {
  return EVENTS.filter(e => e.date === state.date && (state.venue === 'Все площадки' || e.venue === state.venue));
}
function dayGroups() {
  const today = moscowToday();
  return [0,1,2,3].map(offset => {
    const d = addDays(today, offset);
    const dateIso = iso(d);
    const items = EVENTS.filter(e => e.date === dateIso && (state.venue === 'Все площадки' || e.venue === state.venue));
    return { date: d, iso: dateIso, items };
  }).filter(g => g.items.length);
}

function filterShell() {
  return `<section class="filters-shell"><div class="filters">
    <button class="filter-btn" data-action="date">${calendarIcon()}<span class="filter-label">${state.date === iso(moscowToday()) ? 'Выберите дату' : formatDayMonth(fromIso(state.date))}</span></button>
    <button class="filter-btn" data-action="venue">${placeIcon()}<span class="filter-label">${h(state.venue)}</span></button>
  </div></section>`;
}
function renderFeatureCard(e) {
  return `<article class="feature-card" data-event="${e.id}">
    <img class="feature-img" src="${e.image}" alt="">
    <div class="feature-body"><div class="feature-title">${h(e.title)}</div><div class="place">${placeIcon()}<span>${h(e.venue)}</span></div></div>
  </article>`;
}
function renderEventCard(e, action = true) {
  return `<article class="event-card ${action ? 'with-action' : ''}" data-event="${e.id}">
    <img class="event-img" src="${e.image}" alt="">
    <div class="event-main">
      <div class="event-time">${h(e.time)}</div>
      <div class="event-title">${h(e.title)}</div>
      <div class="place">${placeIcon()}<span>${h(e.venue)}</span></div>
    </div>
    ${action ? `<div class="event-actions"><button class="icon-btn ${isFav(e.id) ? 'active' : ''}" data-fav="${e.id}" aria-label="Избранное">${heartIcon()}</button></div>` : ''}
  </article>`;
}
function renderAllDay(group, expanded = true) {
  const count = group.items.length + 38;
  return `<section class="date-block">
    <div class="date-heading">${h(relativeDate(group.date)[0])}<span class="sub">${h(relativeDate(group.date)[1])}</span></div>
    <button class="all-day" data-set-date="${group.iso}">
      <span class="clock">${clockIcon()}</span>
      <span><span class="all-day-title">Весь день</span><span class="all-day-count">${count} ${plural(count, 'мероприятие', 'мероприятия', 'мероприятий')}</span></span>
      <span class="count-pill">${count}</span><span class="chevron">${expanded ? '⌃' : '⌄'}</span>
    </button>
    ${expanded ? `<div class="feature-row">${group.items.slice(0, 4).map(renderFeatureCard).join('')}</div>` : ''}
    <div class="events-list">${group.items.map(e => renderEventCard(e)).join('')}</div>
  </section>`;
}

function renderHome() {
  const selected = filteredEvents();
  let groups;
  if (state.date === iso(moscowToday())) groups = dayGroups();
  else {
    const d = fromIso(state.date);
    groups = [{date: d, iso: state.date, items: selected}];
  }
  view.innerHTML = `<div class="screen">${filterShell()}${groups.length ? groups.map((g, i) => renderAllDay(g, i === 0)).join('') : '<div class="empty">На выбранную дату событий пока нет.</div>'}</div>`;
}
function renderFavorites() {
  const items = EVENTS.filter(e => isFav(e.id));
  view.innerHTML = `<div class="screen">${filterShell()}<section class="section-intro"><h1>Ваш список избранных мероприятий</h1><p>Даты, которые вы сохранили, чтобы не потерять среди общей ленты</p></section><div class="events-list">${items.length ? items.map(e => renderEventCard(e)).join('') : '<div class="empty">Вы пока не добавили события в избранное.</div>'}</div></div>`;
}
function renderSubscriptionCard(e) {
  const d1 = fromIso(e.date), d2 = addDays(d1, 23);
  return `<article class="subscription-card">
    <div class="sub-head"><img src="${e.image}" alt=""><div><div class="sub-title">${h(e.title)}</div><div class="place">${placeIcon()}<span>${h(e.venue)}</span></div></div><button class="icon-btn active" data-sub="${e.id}">${bellIcon()}</button></div>
    <div class="sub-dates">
      <div class="sub-row"><span>${formatDayMonth(d1)} <small>${WEEKDAYS_SHORT[d1.getDay()]}</small></span><button class="icon-btn ${isFav(e.id) ? 'active' : ''}" data-fav="${e.id}">${heartIcon()}</button><span class="sub-time">${e.time}</span></div>
      <div class="sub-row"><span>${formatDayMonth(d2)} <small>${WEEKDAYS_SHORT[d2.getDay()]}</small></span><span></span><span class="sub-time">17:00</span></div>
    </div>
  </article>`;
}
function renderSubscriptions() {
  const items = EVENTS.filter(e => isSub(e.id));
  view.innerHTML = `<div class="screen">${filterShell()}<section class="section-intro"><h1>Список подписок</h1><p>Вы получите уведомление, когда организатор добавит новые даты</p></section><div class="events-list">${items.length ? items.map(renderSubscriptionCard).join('') : '<div class="empty">Подписок пока нет.</div>'}</div></div>`;
}
function renderDetail() {
  const e = byId(state.current) || EVENTS[0];
  const d = fromIso(e.date);
  const rel = relativeDate(d)[0];
  const reviews = state.reviews[e.id] || [];
  const countReviews = reviews.length || (e.rating ? 1 : 0);
  const avg = reviews.length ? Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : e.rating;
  const short = e.desc.length > 260 && !state.expanded;
  const desc = short ? e.desc.slice(0, 260).trim() + '…' : e.desc;
  view.innerHTML = `<div class="screen detail">
    <button class="back-floating" data-back>‹</button>
    <section class="detail-hero"><img src="${e.image}" alt=""></section>
    <section class="detail-card">
      <h1 class="detail-title">${h(e.title)}</h1>
      <div class="detail-date">${h(rel)} в ${h(e.time)}</div>
      <div class="detail-place">${placeIcon()}<span>${h(e.venue)}</span><span>›</span></div>
      <div class="detail-actions">
        <button class="pill ${isFav(e.id) ? 'active' : ''}" data-fav="${e.id}">${heartIcon()} ${isFav(e.id) ? 'В избранном' : 'Избранное'}</button>
        <button class="pill ${isSub(e.id) ? 'active' : ''}" data-sub="${e.id}">${bellIcon()} ${isSub(e.id) ? 'Подписаны' : 'Подписаться'}</button>
        <button class="pill" data-help>?</button>
      </div>
      <div class="divider"></div>
      <section class="block"><h2>О событии</h2><div class="description">${h(desc)}</div>${e.desc.length > 260 ? `<button class="read-more" data-expand>${state.expanded ? 'Свернуть ^' : 'Читать далее ›'}</button>` : ''}</section>
      <button class="review-link" data-reviews="${e.id}"><span class="review-score"><span>${avg || '☆'}</span>${avg ? '<span class="star">★</span>' : ''}</span><span><span class="review-title">${countReviews ? 'Отзывы' : 'Отзывов пока нет'}</span><span class="review-sub">${countReviews ? `${countReviews} ${plural(countReviews, 'отзыв', 'отзыва', 'отзывов')}` : 'Будьте первым, кто оставит отзыв'}</span></span><span>›</span></button>
      <section class="block"><h2>Также доступны другие даты:</h2><div class="date-option"><span>${formatDayMonth(addDays(d, 23))}, 17:00</span><span class="ticket-small">Билеты</span><button class="icon-btn ${isFav(e.id) ? 'active' : ''}" data-fav="${e.id}">${heartIcon()}</button></div></section>
      <section class="block"><div class="address"><strong>Адрес площадки:</strong> ${h(e.address.replace('Севастополь, ', ''))}</div><iframe class="map-frame" src="https://yandex.ru/map-widget/v1/?mode=search&text=${encodeURIComponent(e.address)}" loading="lazy"></iframe><button class="route-link" data-route="${e.id}">Построить маршрут</button></section>
    </section>
    <div class="ticket-bar"><button class="ticket-btn" data-ticket="${e.id}">Купить билет</button></div>
  </div>`;
}
function renderReviews() {
  const e = byId(state.current) || EVENTS[0];
  const reviews = state.reviews[e.id] || [];
  const countReviews = reviews.length || (e.rating ? 1 : 0);
  const avg = reviews.length ? Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : e.rating;
  const sample = e.rating && !reviews.length ? [{name: 'Олег', rating: e.rating, text: 'Отличное событие, очень понравилось.'}] : reviews;
  view.innerHTML = `<div class="reviews-page">
    <button class="back-floating" data-back-detail>‹</button>
    <h1>Отзывы</h1><div class="description">${h(e.title)}</div>
    <div class="rating-summary"><div><div class="rating-num">${avg || 0}</div><div class="stars">${avg ? '★'.repeat(avg) : '☆'}</div><div class="review-sub">${countReviews} ${plural(countReviews, 'отзыв', 'отзыва', 'отзывов')}</div></div><div>${[5,4,3,2,1].map(n => `<div class="bar"><span>${n}</span><span class="bar-line"><span class="bar-fill" style="width:${n === avg ? 100 : 0}%"></span></span></div>`).join('')}</div></div>
    <div class="events-list">${sample.map(r => `<article class="review-card"><div class="avatar-mini">${h((r.name || 'О')[0])}</div><div><div class="review-name">${h(r.name || 'Олег')}</div><div class="review-sub">Сегодня</div><div class="stars">${'★'.repeat(r.rating)}</div><div class="review-body">${h(r.text)}</div></div></article>`).join('')}</div>
    <button class="pill" style="width:100%;margin-top:18px" data-open-review="${e.id}">Оставить отзыв</button>
  </div>`;
}
function setNav() {
  bottomNav.style.display = ['detail', 'reviews'].includes(state.tab) ? 'none' : 'grid';
  bottomNav.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === state.tab));
}
function render() {
  setNav();
  if (state.tab === 'home') renderHome();
  if (state.tab === 'favorites') renderFavorites();
  if (state.tab === 'subscriptions') renderSubscriptions();
  if (state.tab === 'detail') renderDetail();
  if (state.tab === 'reviews') renderReviews();
}

function openDatePicker() {
  const today = moscowToday();
  let month = new Date(today.getFullYear(), today.getMonth(), 1);
  function draw() {
    const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const y = month.getFullYear(), m = month.getMonth();
    const first = (new Date(y, m, 1).getDay() + 6) % 7;
    const days = new Date(y, m + 1, 0).getDate();
    const prevDays = new Date(y, m, 0).getDate();
    const cells = [];
    for (let i = 0; i < 42; i++) {
      let num, date, other = false;
      if (i < first) { num = prevDays - first + i + 1; date = new Date(y, m - 1, num); other = true; }
      else if (i >= first + days) { num = i - first - days + 1; date = new Date(y, m + 1, num); other = true; }
      else { num = i - first + 1; date = new Date(y, m, num); }
      const disabled = date < today;
      const active = iso(date) === state.date;
      cells.push(`<button class="day ${other ? 'other' : ''} ${disabled ? 'disabled' : ''} ${active ? 'active' : ''}" data-pick-date="${iso(date)}">${num}</button>`);
    }
    overlayRoot.innerHTML = `<div class="overlay"><div class="sheet calendar"><div class="cal-head"><button data-prev-month ${month <= startMonth ? 'style="opacity:.25;pointer-events:none"' : ''}>‹</button><div class="cal-title">${MONTHS_NOM[m]} ${y} г.</div><button data-next-month>›</button></div><div class="cal-grid">${['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(w => `<div class="week">${w}</div>`).join('')}${cells.join('')}</div></div></div>`;
    overlayRoot.querySelector('[data-prev-month]')?.addEventListener('click', () => { month = new Date(y, m - 1, 1); draw(); });
    overlayRoot.querySelector('[data-next-month]').addEventListener('click', () => { month = new Date(y, m + 1, 1); draw(); });
    overlayRoot.querySelectorAll('[data-pick-date]').forEach(b => b.addEventListener('click', () => { state.date = b.dataset.pickDate; save(); closeOverlay(); state.tab = 'home'; render(); }));
  }
  draw();
}
function openVenuePicker() {
  overlayRoot.innerHTML = `<div class="overlay"><div class="sheet">${venues.map(v => `<button class="option ${v === state.venue ? 'active' : ''}" data-pick-venue="${h(v)}"><span>${h(v)}</span><span>${v === state.venue ? '✓' : ''}</span></button>`).join('')}</div></div>`;
}
function closeOverlay() { overlayRoot.innerHTML = ''; }
function openReviewModal(id) {
  const e = byId(id); let rating = 0;
  overlayRoot.innerHTML = `<div class="overlay review-modal"><div class="review-box"><button class="close" data-close>×</button><div class="avatar-big">О</div><h2>Отзыв</h2><div class="muted">Олег</div><div class="muted">${h(e.title)}</div><div class="stars-input">${[1,2,3,4,5].map(n => `<button class="star-btn" data-rate="${n}">★</button>`).join('')}</div><div class="rating-label">Нажмите для оценки</div><textarea class="review-text" placeholder="Поделитесь впечатлениями..."></textarea><button class="send-review" disabled>Отправить</button></div></div>`;
  const stars = Array.from(overlayRoot.querySelectorAll('[data-rate]'));
  const label = overlayRoot.querySelector('.rating-label');
  const text = overlayRoot.querySelector('.review-text');
  const send = overlayRoot.querySelector('.send-review');
  function update() { stars.forEach(s => s.classList.toggle('active', Number(s.dataset.rate) <= rating)); label.textContent = rating === 5 ? 'В восторге' : rating ? `${rating} из 5` : 'Нажмите для оценки'; send.disabled = !(rating && text.value.trim()); }
  stars.forEach(s => s.addEventListener('click', () => { rating = Number(s.dataset.rate); update(); }));
  text.addEventListener('input', update);
  send.addEventListener('click', () => { state.reviews[id] ||= []; state.reviews[id].push({name: 'Олег', rating, text: text.value.trim()}); save(); closeOverlay(); state.current = id; state.tab = 'reviews'; render(); window.scrollTo(0,0); });
}

document.addEventListener('click', (ev) => {
  const el = ev.target.closest('[data-tab],[data-action],[data-event],[data-fav],[data-sub],[data-back],[data-back-detail],[data-expand],[data-reviews],[data-help],[data-ticket],[data-route],[data-open-review],[data-pick-venue],[data-set-date],[data-close]');
  if (!el) return;
  if (el.dataset.tab) { state.tab = el.dataset.tab; render(); window.scrollTo(0,0); }
  if (el.dataset.action === 'date') openDatePicker();
  if (el.dataset.action === 'venue') openVenuePicker();
  if (el.dataset.pickVenue) { state.venue = el.dataset.pickVenue; save(); closeOverlay(); state.tab = 'home'; render(); }
  if (el.dataset.setDate) { state.date = el.dataset.setDate; save(); render(); }
  if (el.dataset.event) { state.current = el.dataset.event; state.tab = 'detail'; state.expanded = false; save(); render(); window.scrollTo(0,0); }
  if (el.dataset.fav) { ev.stopPropagation(); const id = el.dataset.fav; state.favorites = isFav(id) ? state.favorites.filter(x => x !== id) : [...state.favorites, id]; save(); render(); }
  if (el.dataset.sub) { ev.stopPropagation(); const id = el.dataset.sub; state.subscriptions = isSub(id) ? state.subscriptions.filter(x => x !== id) : [...state.subscriptions, id]; save(); render(); }
  if (el.dataset.back) { state.tab = 'home'; render(); window.scrollTo(0,0); }
  if (el.dataset.backDetail) { state.tab = 'detail'; render(); window.scrollTo(0,0); }
  if (el.dataset.expand !== undefined) { state.expanded = !state.expanded; render(); }
  if (el.dataset.reviews) { state.current = el.dataset.reviews; state.tab = 'reviews'; render(); window.scrollTo(0,0); }
  if (el.dataset.openReview) openReviewModal(el.dataset.openReview);
  if (el.dataset.help !== undefined) alert('Добавьте событие в избранное или подпишитесь на новые даты.');
  if (el.dataset.ticket) { const e = byId(el.dataset.ticket); window.open(e.ticketUrl, '_blank'); }
  if (el.dataset.route) { const e = byId(el.dataset.route); window.open(`https://yandex.ru/maps/?rtext=~${encodeURIComponent(e.address)}&rtt=auto`, '_blank'); }
  if (el.dataset.close !== undefined) closeOverlay();
});
overlayRoot.addEventListener('click', (ev) => { if (ev.target.classList.contains('overlay')) closeOverlay(); });
try { window.WebApp?.ready?.(); window.WebApp?.expand?.(); } catch {}
render();
