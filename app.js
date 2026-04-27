const IMG = {
  museum: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=900&q=80',
  theater: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80',
  poster: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80',
  gallery: 'https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=900&q=80',
  kids: 'https://images.unsplash.com/photo-1519340333755-c1aa5571fd46?auto=format&fit=crop&w=900&q=80',
  concert: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80'
};

function moscowToday() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Moscow', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date()).reduce((a, p) => (a[p.type] = p.value, a), {});
  return new Date(`${parts.year}-${parts.month}-${parts.day}T00:00:00+03:00`);
}
function addDays(date, days) { const d = new Date(date); d.setDate(d.getDate() + days); return d; }
function iso(date) { return date.toISOString().slice(0, 10); }
const MONTHS = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const WEEKDAYS = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];
function dayLabel(date) { return `${date.getDate()} ${MONTHS[date.getMonth()]}`; }
function relativeTitle(date) {
  const today = moscowToday();
  const diff = Math.round((date - today) / 86400000);
  if (diff === 0) return ['Сегодня', dayLabel(date)];
  if (diff === 1) return ['Завтра', dayLabel(date)];
  if (diff === 2) return ['Послезавтра', dayLabel(date)];
  return [dayLabel(date), WEEKDAYS[date.getDay()]];
}

const T = moscowToday();
const EVENTS = [
  { id:'e1', title:'Выставка «Первый в России»', venue:'Государственный объединенный музей', address:'Севастополь, ул. Ленина, 11', date:iso(addDays(T,1)), time:'10:00', allDay:true, image:IMG.museum, category:'Выставка', rating:5, desc:'Выставка рассказывает о первых страницах истории, редких документах и предметах, которые помогают увидеть эпоху живой и понятной. Экспозиция подойдет для спокойного посещения, семейного досуга и знакомства с культурным наследием города.', ticketUrl:'https://yandex.ru/maps/?text=Севастополь%20ул.%20Ленина%2011' },
  { id:'e2', title:'Пешеходная экскурсия для сборных групп по Севастополю', venue:'Государственный объединенный музей', address:'Севастополь, пл. Нахимова', date:iso(addDays(T,1)), time:'11:00', allDay:false, image:IMG.poster, category:'Экскурсия', rating:0, desc:'Маршрут для тех, кто хочет узнать город через его улицы, памятники и истории жителей. Экскурсия проходит в удобном темпе, с остановками у знаковых мест и возможностью задать вопросы гиду.', ticketUrl:'https://yandex.ru/maps/?text=Севастополь%20площадь%20Нахимова' },
  { id:'e3', title:'Вафельное сердце', venue:'Театр юного зрителя', address:'Севастополь, проспект Гагарина, 16', date:iso(addDays(T,1)), time:'11:00', allDay:false, image:IMG.theater, category:'Спектакль', rating:4, desc:'Теплая история о дружбе, взрослении и маленьких открытиях. Постановка подходит для семейного просмотра и создает мягкое настроение без лишней тяжести.', ticketUrl:'https://yandex.ru/maps/?text=Севастополь%20проспект%20Гагарина%2016' },
  { id:'e4', title:'Косточка', venue:'Театр юного зрителя', address:'Севастополь, проспект Гагарина, 16', date:iso(addDays(T,1)), time:'11:00', allDay:false, image:IMG.kids, category:'Спектакль', rating:0, desc:'Сценическая история для детей и взрослых, где простые события становятся поводом поговорить о доброте, смелости и выборе.', ticketUrl:'https://yandex.ru/maps/?text=Севастополь%20проспект%20Гагарина%2016' },
  { id:'e5', title:'«Доступно о классиках»', venue:'Академический театр драмы', address:'Севастополь, проспект Нахимова, 6', date:iso(addDays(T,1)), time:'12:00', allDay:false, image:IMG.concert, category:'Лекция', rating:0, desc:'Встреча для тех, кто хочет понятнее и ближе познакомиться с классическими авторами, их биографиями и произведениями без академической тяжести.', ticketUrl:'https://yandex.ru/maps/?text=Севастополь%20проспект%20Нахимова%206' },
  { id:'e6', title:'«Елка Весна СССР»', venue:'Дворец культуры «Пролетарка»', address:'Севастополь, ул. Льва Толстого, 15', date:iso(addDays(T,1)), time:'20:00', allDay:false, image:IMG.concert, category:'Концерт', rating:0, desc:'Ностальгическая музыкальная программа с узнаваемыми образами, живым настроением и атмосферой большого вечера.', ticketUrl:'https://yandex.ru/maps/?text=Севастополь%20ул.%20Льва%20Толстого%2015' },
  { id:'e7', title:'Путешествие по закулисью', venue:'Государственный театр кукол', address:'Севастополь, проспект Победы, 9', date:iso(T), time:'11:00', allDay:false, image:IMG.kids, category:'Экскурсия', rating:0, desc:'6+ Рекомендуемый возраст: 6+. Продолжительность экскурсии: 1 час. Хотите попасть в сказочный мир закулисья театра кукол?! У вас есть уникальная возможность своими глазами увидеть театр кукол изнутри, узнать множество театральных легенд и секретов, прогуляться по театральным мастерским, где работают настоящие волшебники.', ticketUrl:'https://yandex.ru/maps/?text=Севастополь%20проспект%20Победы%209' },
  { id:'e8', title:'Не улетай', venue:'Кимрский театр драмы и комедии', address:'Севастополь, ул. Большая Морская, 22', date:iso(T), time:'11:00', allDay:false, image:IMG.poster, category:'Спектакль', rating:0, desc:'Яркая постановка для зрителей, которые любят эмоциональные истории, живую сцену и выразительные визуальные решения.', ticketUrl:'https://yandex.ru/maps/?text=Севастополь%20Большая%20Морская%2022' },
  { id:'e9', title:'Картинная галерея. Избранное. Том I. Классика', venue:'Областная картинная галерея', address:'Севастополь, проспект Нахимова, 9', date:iso(addDays(T,2)), time:'18:00', allDay:true, image:IMG.gallery, category:'Выставка', rating:0, desc:'Подборка работ, которые помогают увидеть главные мотивы классического искусства и провести время в спокойном музейном ритме.', ticketUrl:'https://yandex.ru/maps/?text=Севастополь%20проспект%20Нахимова%209' },
  { id:'e10', title:'Книжная выставка «Калининские чтения»', venue:'Областная библиотека им. Горького', address:'Севастополь, ул. Ленина, 51', date:iso(addDays(T,3)), time:'16:00', allDay:true, image:IMG.museum, category:'Выставка', rating:0, desc:'Выставка для тех, кто любит редкие издания, архивные материалы и спокойный интеллектуальный досуг.', ticketUrl:'https://yandex.ru/maps/?text=Севастополь%20ул.%20Ленина%2051' }
];

const state = {
  tab:'home', date:'all', venue:'Все площадки', current:null, expanded:false,
  favorites: JSON.parse(localStorage.getItem('afisha:favorites') || '[]'),
  subscriptions: JSON.parse(localStorage.getItem('afisha:subscriptions') || '[]'),
  reviews: JSON.parse(localStorage.getItem('afisha:reviews') || '{}')
};
const view = document.getElementById('view');
const overlay = document.getElementById('overlay');
const navBtns = [...document.querySelectorAll('.nav-btn')];
const venues = ['Все площадки', ...new Set(EVENTS.map(e => e.venue))];

function save() {
  localStorage.setItem('afisha:favorites', JSON.stringify(state.favorites));
  localStorage.setItem('afisha:subscriptions', JSON.stringify(state.subscriptions));
  localStorage.setItem('afisha:reviews', JSON.stringify(state.reviews));
}
function h(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function byId(id){return EVENTS.find(e=>e.id===id)}
function isFav(id){return state.favorites.includes(id)}
function isSub(id){return state.subscriptions.includes(id)}
function filteredEvents(){
  return EVENTS.filter(e => (state.date === 'all' || e.date === state.date) && (state.venue === 'Все площадки' || e.venue === state.venue))
    .sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time));
}
function groupByDate(list){return list.reduce((a,e)=>(a[e.date]??=[]).push(e),a,{});}
function filtersHtml(){
  const dateText = state.date === 'all' ? 'Выберите дату' : dayLabel(new Date(`${state.date}T00:00:00+03:00`));
  return `<section class="filters-shell"><div class="filters">
    <button class="filter-btn" data-action="date"><span class="filter-ico">▣</span><span>${h(dateText)}</span></button>
    <button class="filter-btn" data-action="venue"><span class="filter-ico">⌖</span><span>${h(state.venue)}</span></button>
  </div></section>`;
}
function eventCard(e, showAction=true){
  return `<article class="event-card ${showAction?'':'no-action'}" data-event="${e.id}">
    <img class="event-img" src="${e.image}" alt="">
    <div class="event-main">
      <div class="event-time">${h(e.time)}</div>
      <div class="event-title">${h(e.title)}</div>
      <div class="place"><span class="pin">⌖</span><span>${h(e.venue)}</span></div>
    </div>
    ${showAction?`<button class="event-action" data-fav="${e.id}" aria-label="Избранное"><span class="heart ${isFav(e.id)?'active':''}">♥</span></button>`:''}
  </article>`;
}
function renderHome(){
  const groups = groupByDate(filteredEvents());
  const html = Object.keys(groups).map(dateIso => {
    const date = new Date(`${dateIso}T00:00:00+03:00`);
    const [main, sub] = relativeTitle(date);
    const list = groups[dateIso];
    const all = list.filter(e=>e.allDay);
    const timed = list.filter(e=>!e.allDay);
    return `<section class="date-group">
      <div class="date-title">${h(main)} <span>${h(sub)}</span></div>
      <div class="all-day"><div class="clock">◷</div><div><strong>Весь день</strong><small>${list.length} ${plural(list.length,'мероприятие','мероприятия','мероприятий')}</small></div><div class="count-pill">${list.length}</div><div class="chev">⌄</div></div>
      ${all.length ? `<div class="horizontal">${all.map(featureCard).join('')}</div>` : ''}
      <div class="events">${timed.map(e=>eventCard(e)).join('')}</div>
    </section>`;
  }).join('') || `<div class="empty">На выбранную дату и площадку мероприятий пока нет</div>`;
  view.innerHTML = `<div class="screen">${filtersHtml()}${html}</div>`;
}
function featureCard(e){return `<article class="feature-card" data-event="${e.id}"><img class="feature-img" src="${e.image}" alt=""><div class="feature-body"><div class="feature-title">${h(e.title)}</div><div class="place"><span class="pin">⌖</span><span>${h(e.venue)}</span></div></div></article>`}
function renderFavorites(){
  const list = EVENTS.filter(e=>isFav(e.id));
  const groups = groupByDate(list);
  view.innerHTML = `<div class="screen">${filtersHtml()}<section class="section-intro"><h2>Ваш список избранных мероприятий</h2><p>Даты, которые вы сохранили, чтобы не потерять среди общей ленты</p></section>${list.length ? Object.keys(groups).map(d=>{
    const [m,s]=relativeTitle(new Date(`${d}T00:00:00+03:00`));
    return `<section class="date-group"><div class="date-title">${h(m)} <span>${h(s)}</span></div><div class="events">${groups[d].map(e=>eventCard(e)).join('')}</div></section>`
  }).join('') : `<div class="empty">Вы пока ничего не добавили в избранное</div>`}</div>`;
}
function renderSubscriptions(){
  const list = EVENTS.filter(e=>isSub(e.id));
  view.innerHTML = `<div class="screen">${filtersHtml()}<section class="section-intro"><h2>Список подписок</h2><p>Вы получите уведомление, когда организатор добавит новые даты</p></section>${list.length ? list.map(subCard).join('') : `<div class="empty">Подписок пока нет</div>`}</div>`;
}
function subCard(e){return `<article class="subscription-card"><div class="sub-head" data-event="${e.id}"><img src="${e.image}" alt=""><div><div class="sub-title">${h(e.title)}</div><div class="place"><span class="pin">⌖</span><span>${h(e.venue)}</span></div></div><button data-sub="${e.id}"><span class="bell active">♢</span></button></div><div class="sub-dates"><div class="sub-row"><div>${dayLabel(new Date(`${e.date}T00:00:00+03:00`))}<small>${relativeTitle(new Date(`${e.date}T00:00:00+03:00`))[0].toLowerCase()}</small></div><span class="heart ${isFav(e.id)?'active':''}">♥</span><span class="sub-time">${e.time}</span></div><div class="sub-row"><div>${dayLabel(addDays(new Date(`${e.date}T00:00:00+03:00`),23))}<small>${WEEKDAYS[addDays(new Date(`${e.date}T00:00:00+03:00`),23).getDay()]}</small></div><span></span><span class="sub-time">17:00</span></div></div></article>`}
function renderDetail(){
  const e = byId(state.current) || EVENTS[0];
  const date = new Date(`${e.date}T00:00:00+03:00`);
  const [rel] = relativeTitle(date);
  const reviews = state.reviews[e.id] || [];
  const avg = reviews.length ? Math.round(reviews.reduce((s,r)=>s+r.rating,0)/reviews.length) : e.rating;
  const desc = state.expanded ? e.desc : (e.desc.length > 230 ? e.desc.slice(0,230) + '...' : e.desc);
  view.innerHTML = `<div class="screen detail">
    <button class="back-btn" data-back>‹</button>
    <section class="detail-hero"><img src="${e.image}" alt=""></section>
    <section class="detail-card">
      <h1 class="detail-title">${h(e.title)}</h1>
      <div class="detail-date">${h(rel)} в ${h(e.time)}</div>
      <div class="detail-place"><span>⌖</span><span>${h(e.venue)}</span><span>›</span></div>
      <div class="actions"><button class="pill ${isFav(e.id)?'active':''}" data-fav="${e.id}">♥ ${isFav(e.id)?'В избранном':'Избранное'}</button><button class="pill ${isSub(e.id)?'active':''}" data-sub="${e.id}">♢ ${isSub(e.id)?'Подписаны':'Подписаться'}</button><button class="pill" data-help>?</button></div>
      <div class="divider"></div>
      <section class="block"><h3>О событии</h3><div class="desc">${h(desc)}</div>${e.desc.length>230?`<button class="read-more" data-expand>${state.expanded?'Свернуть ^':'Читать далее ›'}</button>`:''}</section>
      <button class="review-link" data-reviews="${e.id}"><span class="review-big">${avg||'☆'}</span><span class="review-star">${avg?'★':'☆'}</span><span><span class="review-title">${reviews.length||avg? 'Отзывы':'Отзывов пока нет'}</span><span class="review-sub">${reviews.length ? `${reviews.length} ${plural(reviews.length,'отзыв','отзыва','отзывов')}` : 'Будьте первым, кто оставит отзыв'}</span></span><span>›</span></button>
      <section class="block"><h3>Также доступны другие даты:</h3><div class="dates-list"><div class="date-option"><span>${dayLabel(addDays(date,23))}, 17:00</span><span class="ticket-small">Билеты</span><button data-fav="${e.id}"><span class="heart ${isFav(e.id)?'active':''}">♡</span></button></div></div></section>
      <section class="block"><div class="address"><strong>Адрес площадки:</strong> ${h(e.address.replace('Севастополь, ',''))}</div><iframe class="map" src="https://yandex.ru/map-widget/v1/?mode=search&text=${encodeURIComponent(e.address)}" loading="lazy"></iframe></section>
    </section>
    <div class="ticket-bar"><button class="ticket-btn" data-ticket="${e.id}">Купить билет</button></div>
  </div>`;
}
function renderReviews(id){
  const e=byId(id); const reviews=state.reviews[id]||[]; const avg=reviews.length?Math.round(reviews.reduce((s,r)=>s+r.rating,0)/reviews.length):e.rating;
  view.innerHTML = `<div class="reviews-page"><button class="back-btn" data-back>‹</button><h2>Отзывы</h2><div class="desc">${h(e.title)}</div><div class="rating-summary"><div><div class="rating-num">${avg||0}</div><div class="stars-line">${'★'.repeat(avg||0)}</div><div class="review-sub">${reviews.length || (avg?1:0)} ${plural(reviews.length || (avg?1:0),'отзыв','отзыва','отзывов')}</div></div><div class="bars">${[5,4,3,2,1].map(n=>`<div class="bar"><span>${n}</span><div class="bar-line"><div class="bar-fill" style="width:${n===avg?100:0}%"></div></div></div>`).join('')}</div></div><div class="events">${reviews.map(r=>`<article class="review-card"><div class="mini-avatar">${h(r.name[0]||'О')}</div><div><div class="review-name">${h(r.name)}</div><div class="review-sub">Сегодня</div><div class="stars-line">${'★'.repeat(r.rating)}</div><div class="review-body">${h(r.text)}</div></div></article>`).join('') || `<button class="pill" data-open-review="${id}">Оставить отзыв</button>`}</div></div>`;
}
function render(){
  navBtns.forEach(b=>b.classList.toggle('active', b.dataset.tab === state.tab));
  document.querySelector('.bottom-nav').style.display = state.tab === 'detail' || state.tab === 'reviews' ? 'none' : 'grid';
  if(state.tab==='home') renderHome();
  if(state.tab==='favorites') renderFavorites();
  if(state.tab==='subscriptions') renderSubscriptions();
  if(state.tab==='detail') renderDetail();
  if(state.tab==='reviews') renderReviews(state.current);
}
function plural(n,a,b,c){n=Math.abs(n)%100;let n1=n%10;if(n>10&&n<20)return c;if(n1>1&&n1<5)return b;if(n1===1)return a;return c;}
function openDatePicker(){
  const today = moscowToday(); let month = new Date(today.getFullYear(), today.getMonth(), 1);
  function draw(){
    const year=month.getFullYear(), mon=month.getMonth(); const first=(new Date(year,mon,1).getDay()+6)%7; const days=new Date(year,mon+1,0).getDate(); const prevDays=new Date(year,mon,0).getDate();
    let cells=[]; for(let i=0;i<42;i++){let dnum, cls='', cellDate; if(i<first){dnum=prevDays-first+i+1; cls='other disabled'; cellDate=new Date(year,mon-1,dnum);} else if(i>=first+days){dnum=i-first-days+1; cls='other'; cellDate=new Date(year,mon+1,dnum);} else {dnum=i-first+1; cellDate=new Date(year,mon,dnum);} const cellIso=iso(new Date(cellDate.getFullYear(),cellDate.getMonth(),cellDate.getDate())); const disabled = cellDate < new Date(today.getFullYear(),today.getMonth(),today.getDate()); if(disabled) cls+=' disabled'; if(state.date===cellIso) cls+=' active'; cells.push(`<button class="day ${cls}" data-pick-date="${cellIso}">${dnum}</button>`)}
    overlay.innerHTML = `<div class="overlay"><div class="sheet calendar"><div class="cal-head"><button data-prev-month>‹</button><div class="cal-title">${MONTHS[mon]} ${year} г.</div><button data-next-month>›</button></div><div class="cal-grid">${['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(w=>`<div class="week">${w}</div>`).join('')}${cells.join('')}</div></div></div>`;
    overlay.querySelector('[data-prev-month]').onclick=()=>{const prev=new Date(month.getFullYear(),month.getMonth()-1,1); if(prev >= new Date(today.getFullYear(),today.getMonth(),1)){month=prev;draw();}};
    overlay.querySelector('[data-next-month]').onclick=()=>{month=new Date(month.getFullYear(),month.getMonth()+1,1);draw();};
    overlay.querySelectorAll('[data-pick-date]').forEach(b=>b.onclick=()=>{state.date=b.dataset.pickDate; closeOverlay(); state.tab='home'; render();});
  } draw();
}
function openVenuePicker(){overlay.innerHTML=`<div class="overlay"><div class="sheet">${venues.map(v=>`<button class="option ${v===state.venue?'active':''}" data-pick-venue="${h(v)}"><span>${h(v)}</span><span>${v===state.venue?'✓':''}</span></button>`).join('')}</div></div>`; overlay.querySelectorAll('[data-pick-venue]').forEach(b=>b.onclick=()=>{state.venue=b.dataset.pickVenue; closeOverlay(); state.tab='home'; render();});}
function openReviewModal(id){const e=byId(id);let rating=0;overlay.innerHTML=`<div class="overlay review-modal"><div class="review-box"><button class="close" data-close>×</button><div class="avatar">О</div><h2>Отзыв</h2><div class="muted">Олег</div><div class="muted">${h(e.title)}</div><div class="stars-input">${[1,2,3,4,5].map(n=>`<button class="star-btn" data-rate="${n}">★</button>`).join('')}</div><div class="rating-label">Нажмите для оценки</div><textarea class="review-text" placeholder="Поделитесь впечатлениями..."></textarea><button class="send-review" disabled>Отправить</button></div></div>`; const stars=[...overlay.querySelectorAll('[data-rate]')]; const label=overlay.querySelector('.rating-label'); const send=overlay.querySelector('.send-review'); const text=overlay.querySelector('.review-text'); function upd(){stars.forEach(s=>s.classList.toggle('active', +s.dataset.rate<=rating));label.textContent=rating===5?'В восторге':rating?`${rating} из 5`:'Нажмите для оценки';send.disabled=!(rating&&text.value.trim());} stars.forEach(s=>s.onclick=()=>{rating=+s.dataset.rate;upd();}); text.oninput=upd; send.onclick=()=>{state.reviews[id]??=[];state.reviews[id].push({name:'Олег',rating,text:text.value.trim()});save();closeOverlay();state.tab='reviews';state.current=id;render();}; overlay.querySelector('[data-close]').onclick=closeOverlay;}
function closeOverlay(){overlay.innerHTML='';}
document.addEventListener('click',e=>{
  const t=e.target.closest('button,article'); if(!t) return;
  if(t.dataset.tab){state.tab=t.dataset.tab; render();}
  if(t.dataset.action==='date') openDatePicker();
  if(t.dataset.action==='venue') openVenuePicker();
  if(t.dataset.event){state.current=t.dataset.event;state.tab='detail';state.expanded=false;render();window.scrollTo(0,0)}
  if(t.dataset.fav){e.stopPropagation(); const id=t.dataset.fav; state.favorites=isFav(id)?state.favorites.filter(x=>x!==id):[...state.favorites,id]; save(); render();}
  if(t.dataset.sub){e.stopPropagation(); const id=t.dataset.sub; state.subscriptions=isSub(id)?state.subscriptions.filter(x=>x!==id):[...state.subscriptions,id]; save(); render();}
  if(t.dataset.back){state.tab='home'; render(); window.scrollTo(0,0)}
  if(t.dataset.expand){state.expanded=!state.expanded; render();}
  if(t.dataset.reviews){state.current=t.dataset.reviews; state.tab='reviews'; render(); window.scrollTo(0,0)}
  if(t.dataset.openReview) openReviewModal(t.dataset.openReview);
  if(t.dataset.help) alert('Добавьте событие в избранное или подпишитесь, чтобы не пропустить новые даты.');
  if(t.dataset.ticket){const ev=byId(t.dataset.ticket); window.open(ev.ticketUrl,'_blank');}
});
overlay.addEventListener('click',e=>{if(e.target.classList.contains('overlay')) closeOverlay();});
navBtns.forEach(btn=>btn.addEventListener('click',()=>{state.tab=btn.dataset.tab; render(); window.scrollTo(0,0)}));
try{window.WebApp?.ready?.();window.WebApp?.expand?.();}catch{}
render();
