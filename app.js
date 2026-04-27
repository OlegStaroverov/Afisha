(() => {
  'use strict';

  const app = document.getElementById('app');
  const tabbar = document.getElementById('tabbar');
  const modal = document.getElementById('modal');

  try {
    const max = window.WebApp || window.MAX?.WebApp;
    max?.ready?.();
    max?.expand?.();
  } catch (_) {}

  const STORAGE = 'afisha_sevastopol_state_v5';
  const MS_DAY = 86400000;

  const venues = [
    'Все площадки',
    'Севастопольский театр юного зрителя',
    'Театр им. Луначарского',
    'Севастопольский академический русский драматический театр',
    'Дворец культуры рыбаков',
    'Музей-заповедник Херсонес Таврический',
    'Севастопольский центр культуры и искусств',
    'Кинотеатр Москва'
  ];

  const venueMeta = {
    'Музей-заповедник Херсонес Таврический': { address: 'Севастополь, Древняя улица, 1', coords: [44.6127, 33.4935] },
    'Севастопольский центр культуры и искусств': { address: 'Севастополь, улица Ленина, 25', coords: [44.6120, 33.5243] },
    'Севастопольский театр юного зрителя': { address: 'Севастополь, проспект Победы, 9', coords: [44.5908, 33.5221] },
    'Театр им. Луначарского': { address: 'Севастополь, проспект Нахимова, 6', coords: [44.6167, 33.5240] },
    'Севастопольский академический русский драматический театр': { address: 'Севастополь, проспект Нахимова, 6', coords: [44.6167, 33.5240] },
    'Дворец культуры рыбаков': { address: 'Севастополь, улица Павла Корчагина, 1', coords: [44.5900, 33.4414] },
    'Кинотеатр Москва': { address: 'Севастополь, проспект Генерала Острякова, 70', coords: [44.5855, 33.5197] }
  };

  const pics = {
    museum: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=700&q=80',
    city: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80',
    theatre: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=700&q=80',
    drama: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80',
    art: 'https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=700&q=80',
    stage: 'https://images.unsplash.com/photo-1515165562835-c3b8c2d9f675?auto=format&fit=crop&w=700&q=80',
    concert: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=700&q=80',
    book: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=700&q=80',
    cinema: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80'
  };

  const baseEvents = [
    event('first-russia', 0, '10:00', 'Выставка «Первый в России»', 'Музей-заповедник Херсонес Таврический', pics.museum, 5, 'Выставочный проект о людях и событиях, которые стали первыми в истории. Экспозиция объединяет архивные материалы, редкие фотографии, документы и предметы из музейной коллекции.', true),
    event('walk', 0, '11:00', 'Пешеходная экскурсия для сборных групп по Севастополю', 'Севастопольский центр культуры и искусств', pics.city, 0, 'Прогулка по историческому центру города с рассказом о памятниках, площадях, архитектуре и людях, которые формировали облик Севастополя.'),
    event('heart', 0, '11:00', 'Вафельное сердце', 'Севастопольский театр юного зрителя', pics.theatre, 0, 'Трогательный спектакль для всей семьи о дружбе, взрослении и маленьких чудесах, которые случаются рядом с теми, кто умеет верить.'),
    event('backstage', 0, '12:00', 'Путешествие по закулисью', 'Севастопольский театр юного зрителя', pics.theatre, 0, '6+ Рекомендуемый возраст: 6+. Продолжительность экскурсии: 1 час. Хотите попасть в сказочный мир закулисья Тверского театра кукол?! У вас есть уникальная возможность своими глазами увидеть театр изнутри, узнать множество театральных легенд и секретов, прогуляться по театральным мастерским, где работают настоящие волшебники, и даже попробовать себя в роли кукловода.'),
    event('queen', 1, '16:00', 'Пиковая дама', 'Театр им. Луначарского', pics.drama, 5, 'Сценическая версия знаменитой повести о страсти, судьбе и цене одной тайны. Классический сюжет раскрывается через напряженную атмосферу и сильную актерскую игру.'),
    event('gallery', 1, '17:00', 'Диалоги в искусстве: художник, зритель и город', 'Севастопольский центр культуры и искусств', pics.art, 0, 'Встреча о современном искусстве, городских сюжетах и том, как зритель становится участником художественного разговора.'),
    event('hanuma', 1, '18:00', '«Ханума»', 'Севастопольский академический русский драматический театр', pics.stage, 5, 'Спектакль «Ханума» — всем известная история о соперничестве двух свах, блестяще воплощенная на сцене. События разворачиваются в старинном городе, где интрига, юмор и музыка соединяются в живой и яркий театральный праздник.'),
    event('ussr', 1, '20:00', '«Елка Весна СССР»', 'Дворец культуры рыбаков', pics.concert, 0, 'Музыкальная программа с атмосферой ретро, любимыми мелодиями и живыми историями о времени, которое многие помнят с теплом.'),
    event('heroes', 3, '09:00', 'Выставка «Герои Севастополя»', 'Музей-заповедник Херсонес Таврический', pics.museum, 0, 'Экспозиция о людях, связанных с историей города, военной славой и культурной памятью Севастополя.', true),
    event('virtuoso', 3, '10:00', 'Виртуоз', 'Севастопольский центр культуры и искусств', pics.concert, 0, 'Музыкальная программа с произведениями классики и современными аранжировками.', true),
    event('book', 3, '10:30', 'Книжная выставка «Калейдоскоп историй»', 'Севастопольский центр культуры и искусств', pics.book, 0, 'Подборка книг, изданий и редких материалов для любителей истории, литературы и краеведения.', true),
    event('cinema', 3, '18:30', 'Кинопоказ под открытым небом', 'Кинотеатр Москва', pics.cinema, 0, 'Вечерний показ фильма с обсуждением после сеанса.'),
  ];

  function event(id, offset, time, title, venue, image, rating, desc, allDay = false) {
    const meta = venueMeta[venue] || { address: 'Севастополь', coords: [44.6167, 33.5254] };
    return { id, offset, time, title, venue, address: meta.address, coords: meta.coords, image, rating, desc, allDay, ticketUrl: 'https://quicktickets.ru/sevastopol' };
  }

  const state = Object.assign({
    tab: 'home', date: 'all', venue: 'Все площадки', current: null,
    favorites: [], subscriptions: [], reviews: {}, expanded: false, descOpen: false, returnTab: 'home'
  }, loadState());

  const icons = {
    calendar:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    pin:'<svg viewBox="0 0 24 24"><path d="M12 21s7-5.2 7-12A7 7 0 0 0 5 9c0 6.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.4"/></svg>',
    clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    heart:'<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.5-9.4-10A5.4 5.4 0 0 1 12 5.8 5.4 5.4 0 0 1 21.4 11C19.5 16.5 12 21 12 21z"/></svg>',
    bell:'<svg viewBox="0 0 24 24"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9zM10 21h4"/></svg>',
    chevron:'<svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>'
  };

  function loadState(){ try { return JSON.parse(localStorage.getItem(STORAGE) || '{}'); } catch { return {}; } }
  function saveState(){ localStorage.setItem(STORAGE, JSON.stringify({ date:state.date, venue:state.venue, favorites:state.favorites, subscriptions:state.subscriptions, reviews:state.reviews })); }
  function escapeHtml(v){ return String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
  function moscowToday(){ const p = new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Moscow',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()); return new Date(+p.find(x=>x.type==='year').value, +p.find(x=>x.type==='month').value - 1, +p.find(x=>x.type==='day').value); }
  function addDays(d,n){ const x=new Date(d); x.setDate(x.getDate()+n); return x; }
  function iso(d){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
  function formatDay(d){ return new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',day:'numeric',month:'long'}).format(d); }
  function week(d){ return new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',weekday:'long'}).format(d); }
  function relTitle(d){ const t=moscowToday(); const diff=Math.round((new Date(d.getFullYear(),d.getMonth(),d.getDate())-t)/MS_DAY); if(diff===0)return ['Сегодня',formatDay(d)]; if(diff===1)return ['Завтра',formatDay(d)]; if(diff===2)return ['Послезавтра',formatDay(d)]; return [formatDay(d),week(d)]; }
  function plural(n,a,b,c){ n=Math.abs(n)%100; const n1=n%10; if(n>10&&n<20)return c; if(n1>1&&n1<5)return b; if(n1===1)return a; return c; }
  function events(){ const today=moscowToday(); return baseEvents.map(e => ({...e, date: iso(addDays(today, e.offset))})); }
  function byId(id){ return events().find(e => e.id === id); }
  function isFav(id){ return state.favorites.includes(id); }
  function isSub(id){ return state.subscriptions.includes(id); }
  function toggle(arr,id){ const i=arr.indexOf(id); i >= 0 ? arr.splice(i,1) : arr.push(id); saveState(); }

  function filtersHtml(){
    const dateText = state.date === 'all' ? 'Выберите дату' : formatDay(new Date(state.date+'T00:00:00'));
    return `<section class="filters">
      <button class="filter-btn" data-action="date" type="button">${icons.calendar}<span>${escapeHtml(dateText)}</span></button>
      <button class="filter-btn" data-action="venue" type="button">${icons.pin}<span>${escapeHtml(state.venue)}</span></button>
    </section>`;
  }

  function filtered(){
    return events().filter(e => (state.date === 'all' || e.date === state.date) && (state.venue === 'Все площадки' || e.venue === state.venue));
  }

  function card(e){
    return `<article class="event-card" data-open="${e.id}">
      <img class="event-img" src="${escapeHtml(e.image)}" alt="" loading="lazy" onerror="this.classList.add('broken')">
      <div class="event-main">
        ${!e.allDay ? `<div class="event-time">${escapeHtml(e.time)}</div>` : ''}
        <h3 class="event-title">${escapeHtml(e.title)}</h3>
        <p class="event-place">${icons.pin}<span>${escapeHtml(e.venue)}</span></p>
      </div>
      <button class="heart-btn ${isFav(e.id) ? 'active' : ''}" data-fav="${e.id}" type="button" aria-label="Избранное">${icons.heart}</button>
    </article>`;
  }

  function allDayBlock(list){
    const all = list.filter(e => e.allDay);
    if (!all.length) return '';
    const visible = state.expanded ? `<div class="all-scroll">${all.map(e => `
      <article class="mini-card" data-open="${e.id}">
        <img src="${escapeHtml(e.image)}" alt="" loading="lazy"><div><b>${escapeHtml(e.title)}</b><p>${icons.pin}<span>${escapeHtml(e.venue)}</span></p></div>
      </article>`).join('')}</div>` : '';
    return `<section class="all-wrap">
      <button class="all-day" data-toggle-all type="button">
        <span class="clock">${icons.clock}</span><span><b>Весь день</b><small>${all.length} ${plural(all.length,'мероприятие','мероприятия','мероприятий')}</small></span><em>${all.length}</em><i>${state.expanded ? '⌃' : '⌄'}</i>
      </button>${visible}</section>`;
  }

  function groupedHtml(list){
    const groups = new Map();
    list.forEach(e => { if(!groups.has(e.date)) groups.set(e.date, []); groups.get(e.date).push(e); });
    return [...groups.entries()].sort(([a],[b]) => a.localeCompare(b)).map(([date, items]) => {
      const d = new Date(date+'T00:00:00');
      const [main, sub] = relTitle(d);
      const timed = items.filter(e => !e.allDay).sort((a,b)=>a.time.localeCompare(b.time));
      return `<section class="day-section">
        <h2 class="day-title"><span>${escapeHtml(main)}</span><small>${escapeHtml(sub)}</small></h2>
        ${allDayBlock(items)}
        <div class="events-list">${timed.map(card).join('')}</div>
      </section>`;
    }).join('');
  }

  function renderHome(){
    const list = filtered();
    app.className = 'app';
    app.innerHTML = `${filtersHtml()}<div class="content">${list.length ? groupedHtml(list) : `<p class="empty">На эту дату мероприятий нет</p>`}</div>`;
  }

  function renderFavorites(){
    const list = events().filter(e => state.favorites.includes(e.id)).sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time));
    app.className = 'app';
    app.innerHTML = `${filtersHtml()}<div class="content"><section class="intro"><h1>Ваш список избранных мероприятий</h1><p>Даты, которые вы сохранили, чтобы не потерять среди общей ленты</p></section>${list.length ? groupedHtml(list) : `<p class="empty">В избранном пока пусто</p>`}</div>`;
  }

  function renderSubscriptions(){
    const list = events().filter(e => state.subscriptions.includes(e.id)).sort((a,b)=>a.title.localeCompare(b.title));
    app.className = 'app';
    app.innerHTML = `${filtersHtml()}<div class="content"><section class="intro"><h1>Список подписок</h1><p>Вы получите уведомление, когда организатор добавит новые даты</p></section>${list.length ? list.map(subscriptionCard).join('') : `<p class="empty center">Подписок пока нет</p>`}</div>`;
  }

  function subscriptionCard(e){
    const currentDate = new Date(e.date+'T00:00:00');
    const nextDate = addDays(currentDate, 23);
    return `<article class="sub-card" data-open="${e.id}">
      <div class="sub-head"><img src="${escapeHtml(e.image)}" alt=""><div><h3>${escapeHtml(e.title)}</h3><p>${icons.pin}<span>${escapeHtml(e.venue)}</span></p></div><button class="heart-btn active" data-sub="${e.id}" type="button">${icons.bell}</button></div>
      <div class="sub-row"><span>${formatDay(currentDate)} <small>${relTitle(currentDate)[0].toLowerCase()}</small></span><b>${isFav(e.id) ? '❤' : ''}</b><em>${escapeHtml(e.time)}</em>${icons.chevron}</div>
      <div class="sub-row"><span>${formatDay(nextDate)} <small>${week(nextDate)}</small></span><b></b><em>${e.id === 'hanuma' ? '17:00' : escapeHtml(e.time)}</em>${icons.chevron}</div>
    </article>`;
  }

  function mapSrc(e){
    const [lat,lng] = e.coords || [44.6167,33.5254];
    const ll = `${lng},${lat}`;
    return `https://yandex.ru/map-widget/v1/?ll=${ll}&z=15&pt=${ll},pm2rdm&l=map`;
  }
  function routeUrl(e){ const [lat,lng] = e.coords || [44.6167,33.5254]; return `https://yandex.ru/maps/?rtext=~${lat},${lng}&rtt=auto`; }
  function reviewList(id){ return state.reviews[id] || []; }
  function totalReviews(e){ return (e.rating ? 1 : 0) + reviewList(e.id).length; }
  function ratingValue(e){ const mine = reviewList(e.id); if (!mine.length) return e.rating || 0; const sum = mine.reduce((a,r)=>a+r.rating,0) + (e.rating || 0); return Math.round((sum / totalReviews(e))*10)/10; }

  function renderDetail(){
    const e = byId(state.current) || events()[0];
    state.current = e.id;
    const d = new Date(e.date+'T00:00:00');
    const [dateWord] = relTitle(d);
    const total = totalReviews(e);
    const rating = ratingValue(e);
    const desc = state.descOpen || e.desc.length < 190 ? e.desc : `${e.desc.slice(0, 185)}...`;
    app.className = 'app detail-app';
    app.innerHTML = `<section class="detail-screen">
      <button class="back-btn" data-back type="button">‹</button>
      <div class="detail-hero"><img src="${escapeHtml(e.image)}" alt=""></div>
      <div class="detail-panel">
        <h1>${escapeHtml(e.title)}</h1>
        <div class="detail-date">${escapeHtml(dateWord)} в ${escapeHtml(e.time)}</div>
        <button class="detail-place" data-route="${e.id}" type="button">${icons.pin}<span>${escapeHtml(e.venue)}</span>${icons.chevron}</button>
        <div class="detail-actions">
          <button class="action-pill ${isFav(e.id) ? 'active' : ''}" data-fav="${e.id}" type="button">${icons.heart}<span>${isFav(e.id) ? 'В избранном' : 'Избранное'}</span></button>
          <button class="action-pill ${isSub(e.id) ? 'active' : ''}" data-sub="${e.id}" type="button">${icons.bell}<span>${isSub(e.id) ? 'Подписаны' : 'Подписаться'}</span></button>
          <button class="action-help" data-help type="button">?</button>
        </div>
        <div class="line"></div>
        <section class="block"><h2>О событии</h2><p class="desc">${escapeHtml(desc)}</p>${e.desc.length > 190 ? `<button class="read-more" data-desc type="button">${state.descOpen ? 'Свернуть ↑' : 'Читать далее ›'}</button>` : ''}</section>
        <button class="review-link" data-reviews="${e.id}" type="button"><span class="review-num">${rating || '☆'}</span><span class="star-yellow">★</span><span><b>${total ? 'Отзывы' : 'Отзывов пока нет'}</b><small>${total ? `${total} ${plural(total,'отзыв','отзыва','отзывов')}` : 'Будьте первым, кто оставит отзыв'}</small></span>${icons.chevron}</button>
        <section class="block"><h2>Также доступны другие даты:</h2><div class="date-card"><span>${formatDay(addDays(d,23))}, ${e.id === 'hanuma' ? '17:00' : escapeHtml(e.time)}</span><button data-ticket="${e.id}" type="button">Билеты</button><button class="heart-mini" data-fav="${e.id}" type="button">${icons.heart}</button></div></section>
        <section class="block"><p class="address"><strong>Адрес площадки:</strong> ${escapeHtml(e.address)}</p><iframe class="map" src="${mapSrc(e)}" loading="lazy"></iframe><button class="route-btn" data-route="${e.id}" type="button">Построить маршрут</button></section>
      </div>
    </section><div class="ticketbar"><button class="ticket" data-ticket="${e.id}" type="button">Купить билет</button></div>`;
  }

  function renderReviews(){
    const e = byId(state.current) || events()[0];
    const list = reviewList(e.id);
    const rating = ratingValue(e);
    const total = totalReviews(e);
    const bars = [5,4,3,2,1].map(n => {
      const count = (e.rating === n ? 1 : 0) + list.filter(r => r.rating === n).length;
      const width = total ? Math.round(count / total * 100) : 0;
      return `<div class="bar"><span>${n}</span><i><b style="width:${width}%"></b></i></div>`;
    }).join('');
    app.className = 'app reviews-app';
    app.innerHTML = `<section class="reviews-screen"><button class="back-btn flat" data-detail="${e.id}" type="button">‹</button><h1>Отзывы</h1><p class="muted-title">${escapeHtml(e.title)}</p><div class="rating-box"><div><strong>${rating || 0}</strong><p>${'★'.repeat(Math.round(rating || 0))}</p><small>${total} ${plural(total,'отзыв','отзыва','отзывов')}</small></div><div>${bars}</div></div><button class="add-review" data-review-form="${e.id}" type="button">Оставить отзыв</button>${list.length ? list.map(r => reviewCard(r)).join('') : `<p class="empty center">Отзывов пока нет</p>`}</section>`;
  }

  function reviewCard(r){ return `<article class="review-card"><div class="avatar">${escapeHtml((r.name || 'О')[0])}</div><div><div class="review-top"><b>${escapeHtml(r.name || 'Олег')}</b><span>${'★'.repeat(r.rating)}</span></div><small>Сегодня</small><p>${escapeHtml(r.text)}</p></div></article>`; }

  function render(){
    closeModal(false);
    tabbar.hidden = state.tab === 'detail' || state.tab === 'reviews';
    tabbar.querySelectorAll('.tab').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === state.tab));
    if(state.tab === 'home') renderHome();
    if(state.tab === 'favorites') renderFavorites();
    if(state.tab === 'subscriptions') renderSubscriptions();
    if(state.tab === 'detail') renderDetail();
    if(state.tab === 'reviews') renderReviews();
  }

  function openDatePicker(yearArg, monthArg){
    const base = state.date === 'all' ? moscowToday() : new Date(state.date+'T00:00:00');
    const year = Number.isInteger(yearArg) ? yearArg : base.getFullYear(); const month = Number.isInteger(monthArg) ? monthArg : base.getMonth();
    const first = new Date(year, month, 1); const start = addDays(first, -((first.getDay()+6)%7));
    const days = Array.from({length:42},(_,i)=>addDays(start,i));
    openOverlay(`<div class="picker pop"><div class="picker-head"><button type="button" data-month="${iso(addDays(first,-1))}">‹</button><b>${new Intl.DateTimeFormat('ru-RU',{month:'long',year:'numeric'}).format(first)}</b><button type="button" data-month="${iso(new Date(year,month+1,1))}">›</button></div><div class="week"><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div><div class="days">${days.map(d => `<button class="day ${d.getMonth()!==month?'other':''} ${iso(d)===state.date?'active':''} ${iso(d)===iso(moscowToday())?'today':''}" data-date="${iso(d)}" type="button">${d.getDate()}</button>`).join('')}</div></div>`);
  }

  function openVenuePicker(){
    openOverlay(`<div class="venue-list pop">${venues.map(v => `<button class="venue-item ${state.venue===v?'active':''}" data-venue="${escapeHtml(v)}" type="button"><span>${escapeHtml(v)}</span>${state.venue===v?'✓':''}</button>`).join('')}</div>`);
  }

  function openOverlay(html){ modal.hidden = false; modal.innerHTML = `<div class="shade" data-close></div>${html}`; document.body.classList.add('modal-open'); }
  function closeModal(clear = true){ if(clear){ modal.hidden = true; modal.innerHTML = ''; } document.body.classList.remove('modal-open'); }
  function openHelp(){ openOverlay(`<div class="info-modal pop"><button class="modal-close" data-close type="button">×</button><h2>Что значит подписка?</h2><p>Подписка нужна, чтобы не пропустить новые даты события. Когда организатор добавит дату, она появится в списке подписок, а позже это можно подключить к уведомлениям через backend.</p><button class="send-review" data-close type="button">Понятно</button></div>`); }
  function openReviewForm(id){
    const e = byId(id); let rating = 0;
    openOverlay(`<div class="review-modal pop"><button class="modal-close" data-close type="button">×</button><div class="avatar big">О</div><h2>Отзыв</h2><p class="review-event">${escapeHtml(e.title)}</p><div class="stars-input">${[1,2,3,4,5].map(n=>`<button class="star-btn" data-rate="${n}" type="button">★</button>`).join('')}</div><div class="rating-word">Нажмите для оценки</div><textarea placeholder="Поделитесь впечатлениями..."></textarea><button class="send-review" disabled data-send-review="${id}" type="button">Отправить</button></div>`);
    modal.onclick = (ev) => {
      const rate = ev.target.closest('[data-rate]');
      if(rate){ rating = +rate.dataset.rate; modal.querySelectorAll('.star-btn').forEach((b,i)=>b.classList.toggle('active', i < rating)); modal.querySelector('.rating-word').textContent = rating === 5 ? 'В восторге' : rating >= 4 ? 'Понравилось' : 'Спасибо за оценку'; validate(); return; }
      if(ev.target.closest('[data-close]')) { modal.onclick = null; closeModal(); return; }
      const send = ev.target.closest('[data-send-review]');
      if(send){ const text = modal.querySelector('textarea').value.trim(); state.reviews[id] = state.reviews[id] || []; state.reviews[id].unshift({ rating, text, name: 'Олег', at: Date.now() }); saveState(); modal.onclick = null; closeModal(); state.tab = 'reviews'; render(); }
    };
    modal.querySelector('textarea').addEventListener('input', validate);
    function validate(){ const text = modal.querySelector('textarea').value.trim(); modal.querySelector('[data-send-review]').disabled = !(rating && text.length); }
  }

  app.addEventListener('click', (ev) => {
    const target = ev.target;
    const open = target.closest('[data-open]'); if(open && !target.closest('button')){ state.current = open.dataset.open; state.returnTab = state.tab === 'detail' || state.tab === 'reviews' ? 'home' : state.tab; state.tab='detail'; state.descOpen=false; render(); return; }
    const fav = target.closest('[data-fav]'); if(fav){ ev.stopPropagation(); toggle(state.favorites, fav.dataset.fav); render(); return; }
    const sub = target.closest('[data-sub]'); if(sub){ ev.stopPropagation(); toggle(state.subscriptions, sub.dataset.sub); render(); return; }
    if(target.closest('[data-toggle-all]')){ state.expanded = !state.expanded; render(); return; }
    if(target.closest('[data-back]')){ state.tab = state.returnTab || 'home'; render(); return; }
    const detail = target.closest('[data-detail]'); if(detail){ state.current = detail.dataset.detail; state.tab='detail'; render(); return; }
    const rev = target.closest('[data-reviews]'); if(rev){ state.current = rev.dataset.reviews; state.tab='reviews'; render(); return; }
    const form = target.closest('[data-review-form]'); if(form){ openReviewForm(form.dataset.reviewForm); return; }
    if(target.closest('[data-desc]')){ state.descOpen = !state.descOpen; render(); return; }
    if(target.closest('[data-help]')){ openHelp(); return; }
    const ticket = target.closest('[data-ticket]'); if(ticket){ const e=byId(ticket.dataset.ticket); window.open(e.ticketUrl, '_blank'); return; }
    const route = target.closest('[data-route]'); if(route){ const e=byId(route.dataset.route); window.open(routeUrl(e), '_blank'); return; }
    const action = target.closest('[data-action]'); if(action?.dataset.action === 'date') openDatePicker(); if(action?.dataset.action === 'venue') openVenuePicker();
  });

  tabbar.addEventListener('click', (ev) => { const btn = ev.target.closest('[data-tab]'); if(!btn) return; state.tab = btn.dataset.tab; state.current = null; render(); });

  modal.addEventListener('click', (ev) => {
    const m = ev.target.closest('[data-month]'); if(m){ const nd = new Date(m.dataset.month+'T00:00:00'); openDatePicker(nd.getFullYear(), nd.getMonth()); return; }
    const d = ev.target.closest('[data-date]'); if(d){ state.date = d.dataset.date; saveState(); closeModal(); render(); return; }
    const v = ev.target.closest('[data-venue]'); if(v){ state.venue = v.dataset.venue; saveState(); closeModal(); render(); return; }
    if(ev.target.closest('[data-close]')) closeModal();
  });

  render();
})();
