const IMG = {
  museum:'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&w=900&q=75',
  poster:'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=900&q=75',
  theatre:'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=75',
  ballet:'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=900&q=75',
  kids:'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=75',
  city:'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&w=900&q=75',
  cyan:''
};

const EVENTS = [
  {id:'e1', title:'Выставка «Первый в России»', venue:'Государственный объединенный музей', address:'ул. Ленина, 11', date:'2026-04-24', time:'10:00', duration:'Весь день', countDay:true, category:'Выставка', age:'6+', image:IMG.poster, lat:44.61665, lon:33.52536, featured:true, ticketUrl:'https://afisha.yandex.ru/sevastopol', desc:'Выставочный проект о важных страницах истории и людях, которые меняли город и страну. Экспозиция подходит для самостоятельного посещения и семейного маршрута по центру Севастополя.'},
  {id:'e2', title:'Пешеходная экскурсия для сборных групп по Севастополю', venue:'Государственный объединенный музей', address:'ул. Ленина, 11', date:'2026-04-24', time:'11:00', duration:'1 час', category:'Экскурсия', age:'6+', image:IMG.city, lat:44.61665, lon:33.52536, featured:false, ticketUrl:'https://afisha.yandex.ru/sevastopol', desc:'Маршрут по историческому центру с рассказом о главных местах города. Удобный формат для первого знакомства с Севастополем.'},
  {id:'e3', title:'Вафельное сердце', venue:'Театр юного зрителя', address:'проспект Гагарина, 16', date:'2026-04-24', time:'11:00', duration:'1 час 20 мин', category:'Спектакль', age:'6+', image:IMG.theatre, lat:44.5997, lon:33.4845, featured:false, ticketUrl:'https://afisha.yandex.ru/sevastopol', desc:'Добрый спектакль для семейного просмотра о дружбе, взрослении и маленьких открытиях, которые остаются с нами надолго.'},
  {id:'e4', title:'«Ханума»', venue:'Севастопольский драматический театр', address:'проспект Нахимова, 6', date:'2026-04-24', time:'18:00', duration:'2 часа', category:'Спектакль', age:'12+', image:IMG.ballet, lat:44.6144, lon:33.5222, featured:false, ticketUrl:'https://afisha.yandex.ru/sevastopol', desc:'Спектакль «Ханума» — всем известная история о соперничестве двух свах, блестяще воплощенная на сцене. События разворачиваются в старинном городе, где любовь, расчет и характеры сталкиваются в одной комедийной интриге.'},
  {id:'e5', title:'Елка Весна СССР', venue:'Дворец культуры', address:'ул. Павла Корчагина, 1', date:'2026-04-24', time:'20:00', duration:'2 часа', category:'Концерт', age:'12+', image:IMG.kids, lat:44.588, lon:33.4605, featured:false, ticketUrl:'https://afisha.yandex.ru/sevastopol', desc:'Музыкальный вечер с узнаваемой атмосферой, ностальгией и живым звучанием.'},
  {id:'e6', title:'Путешествие по закулисью', venue:'Государственный театр кукол', address:'проспект Победы, 9', date:'2026-04-25', time:'11:00', duration:'1 час', category:'Экскурсия', age:'6+', image:IMG.kids, lat:44.6061, lon:33.5487, featured:false, ticketUrl:'https://afisha.yandex.ru/sevastopol', desc:'Рекомендуемый возраст: 6+. Продолжительность экскурсии: 1 час. Хотите попасть в сказочный мир закулисья театра кукол? У вас есть уникальная возможность своими глазами увидеть театр кукол изнутри, узнать множество театральных легенд и секретов, прогуляться по театральным мастерским, где работают настоящие волшебники и даже попробовать себя в роли кукловода.'},
  {id:'e7', title:'Косточка', venue:'Театр юного зрителя', address:'проспект Гагарина, 16', date:'2026-04-26', time:'11:00', duration:'1 час 30 мин', category:'Спектакль', age:'6+', image:IMG.theatre, lat:44.5997, lon:33.4845, featured:false, ticketUrl:'https://afisha.yandex.ru/sevastopol', desc:'Спектакль для детей и взрослых с теплой камерной интонацией.'},
  {id:'e8', title:'Пиковая дама', venue:'Академический театр драмы', address:'проспект Нахимова, 6', date:'2026-04-26', time:'16:00', duration:'2 часа', category:'Спектакль', age:'16+', image:IMG.poster, lat:44.6144, lon:33.5222, featured:false, ticketUrl:'https://afisha.yandex.ru/sevastopol', desc:'Классический сюжет в сценической версии театра драмы.'},
  {id:'e9', title:'Герои Севастополя', venue:'Государственный объединенный музей', address:'ул. Ленина, 11', date:'2026-04-26', time:'00:00', duration:'Весь день', category:'Выставка', age:'6+', image:IMG.museum, lat:44.61665, lon:33.52536, featured:true, ticketUrl:'https://afisha.yandex.ru/sevastopol', desc:'Экспозиция о людях и событиях, связанных с историей города.'},
  {id:'e10', title:'Виртуоз', venue:'Областная картинная галерея', address:'проспект Нахимова, 9', date:'2026-04-26', time:'00:00', duration:'Весь день', category:'Выставка', age:'0+', image:'', lat:44.6149, lon:33.5231, featured:true, ticketUrl:'https://afisha.yandex.ru/sevastopol', desc:'Выставочный проект для любителей классики и современного взгляда.'},
];

const venues = ['Все площадки', ...new Set(EVENTS.map(e => e.venue))];
const state = { tab:'home', date:null, venue:'Все площадки', allOpen:true, fav:load('fav', ['e1','e4']), subs:load('subs', ['e4']), reviews:load('reviews', {e4:[{name:'Олег', rating:5, text:'А', date:'Сегодня'}]}), detail:null, expanded:false, lastTab:'home' };
const view = document.getElementById('view'), modalRoot = document.getElementById('modalRoot'), dropdownRoot = document.getElementById('dropdownRoot');
const dateText = document.getElementById('dateText'), venueText = document.getElementById('venueText'), pageTitle = document.getElementById('pageTitle'), backBtn = document.getElementById('backBtn');
const WebApp = window.WebApp;
try { WebApp?.ready?.(); WebApp?.expand?.(); } catch(e){}

function load(k,d){try{return JSON.parse(localStorage.getItem('afisha:'+k)) ?? d}catch{return d}}
function save(k,v){localStorage.setItem('afisha:'+k, JSON.stringify(v))}
function fmtDate(date){const d=new Date(date+'T12:00:00');return d.toLocaleDateString('ru-RU',{day:'numeric',month:'long'}).replace(' г.','')}
function weekday(date){return new Date(date+'T12:00:00').toLocaleDateString('ru-RU',{weekday:'long'})}
function dayLabel(date){const n=date.slice(-2); if(date==='2026-04-24') return 'Завтра'; if(date==='2026-04-25') return 'Послезавтра'; return `${Number(n)} апреля`}
function img(event){return event.image ? `<img src="${event.image}" alt="${event.title}">` : `<div class="cyan-img"></div>`}
function filtered(){return EVENTS.filter(e=>(!state.date||e.date===state.date)&&(state.venue==='Все площадки'||e.venue===state.venue)).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time))}

function render(){
  closeDropdown();
  document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active', b.dataset.tab===state.tab));
  dateText.textContent = state.date ? fmtDate(state.date) : 'Выберите дату';
  venueText.textContent = state.venue;
  backBtn.textContent = state.tab === 'detail' || state.tab === 'reviews' ? '‹' : '×';
  backBtn.style.fontSize = state.tab === 'detail' || state.tab === 'reviews' ? '42px' : '48px';
  pageTitle.textContent = 'Афиша Севастополя';
  document.getElementById('filters').classList.toggle('hidden', state.tab === 'detail' || state.tab === 'reviews');
  if(state.tab==='favorites') return renderFavorites();
  if(state.tab==='subs') return renderSubs();
  if(state.tab==='detail') return renderDetail();
  if(state.tab==='reviews') return renderReviewsPage();
  renderHome();
}

function renderHome(){
  const events=filtered();
  const dates=[...new Set(events.map(e=>e.date))];
  view.classList.remove('detail');
  view.innerHTML = `<section class="screen">${dates.map(date=>renderDay(date, events.filter(e=>e.date===date))).join('')}</section>`;
  bindCards();
}
function renderDay(date, list){
  const all=list.filter(e=>e.duration==='Весь день'); const timed=list.filter(e=>e.duration!=='Весь день');
  return `<div class="day-block">
    <div class="day-head"><span class="day-main">${dayLabel(date)}</span><span class="day-sub">${date==='2026-04-24'||date==='2026-04-25'?fmtDate(date):weekday(date)}</span></div>
    ${all.length?`<button class="all-day" data-toggle-all><span class="clock">◷</span><span><div class="all-title">Весь день</div><div class="all-count">${list.length} мероприятия</div></span><span class="pill-count">${list.length}</span><span class="chev">${state.allOpen?'⌃':'⌄'}</span></button>`:''}
    ${all.length&&state.allOpen?`<div class="highlights">${all.map(renderHighlight).join('')}</div>`:''}
    ${timed.map(renderEventCard).join('')}<div class="spacer"></div>
  </div>`;
}
function renderHighlight(e){return `<article class="highlight" data-open="${e.id}">${img(e)}<div class="h-body"><div class="h-title">${e.title}</div><div class="place">${e.venue}</div></div></article>`}
function renderEventCard(e){const fav=state.fav.includes(e.id);return `<article class="event-card" data-open="${e.id}">${img(e)}<div><div class="event-time">${e.time}</div><div class="event-title">${e.title}</div><div class="event-place">⌖ ${e.venue}</div></div><button class="heart ${fav?'':'empty'}" data-fav="${e.id}">${fav?'♥':'♡'}</button></article>`}

function renderFavorites(){
  const events=EVENTS.filter(e=>state.fav.includes(e.id)); view.classList.remove('detail');
  view.innerHTML=`<section><h2 class="section-title">Ваш список избранных<br>мероприятий</h2><p class="section-note">Даты, которые вы сохранили, чтобы не потерять среди общей ленты</p>${events.length?events.map(renderEventCard).join(''):'<div class="empty"><div class="empty-ico">♡</div>Пока ничего нет</div>'}</section>`; bindCards();
}
function renderSubs(){
  const subscribed=EVENTS.filter(e=>state.subs.includes(e.id)); view.classList.remove('detail');
  view.innerHTML=`<section><h2 class="section-title">Список подписок</h2><p class="section-note">Вы получите уведомление, когда организатор добавит новые даты</p>${subscribed.length?subscribed.map(e=>`<article class="event-card sub-card" data-open="${e.id}">${img(e)}<div><div class="event-title">${e.title}</div><div class="event-place">⌖ ${e.venue}</div><div class="sub-dates"><span>${fmtDate(e.date)}</span><span>${e.time}</span></div></div><button class="heart">🔔</button></article>`).join(''):'<div class="empty"><div class="empty-ico">🔔</div>Подписок пока нет</div>'}</section>`; bindCards();
}
function renderDetail(){
  const e=EVENTS.find(x=>x.id===state.detail); if(!e) return; const fav=state.fav.includes(e.id), sub=state.subs.includes(e.id), reviews=state.reviews[e.id]||[];
  view.classList.add('detail'); pageTitle.textContent='Афиша Севастополя';
  const text=state.expanded?e.desc:(e.desc.length>180?e.desc.slice(0,180)+'...':e.desc);
  view.innerHTML=`<section>
    <div class="detail-titlebar">${e.title}</div>
    <div class="detail-hero">${img(e)}</div>
    <div class="detail-sheet">
      <div class="big-time">${dayLabel(e.date)} в ${e.time}</div>
      <div class="detail-place">⌖ ${e.venue} ›</div>
      <div class="action-row"><button class="outline-btn" id="favDetail">${fav?'♥ В избранном':'♡ Избранное'}</button><button class="outline-btn" id="subDetail">${sub?'🔔 Подписаны':'♧ Подписаться'}</button><button class="outline-btn ghost" id="helpBtn">?</button></div>
      <div class="divider"></div>
      <h3 class="block-title">О событии</h3><div class="desc">${text}</div>${e.desc.length>180?`<button class="read-more" id="readMore">${state.expanded?'Свернуть ⌃':'Читать далее ›'}</button>`:''}
      <button class="review-card" id="reviewsOpen"><span>${reviews.length?`<b class="rating-big">${avg(reviews)}</b><span class="star-yellow">★</span>`:'☆'}</span><span><b>${reviews.length?'Отзывы':'Отзывов пока нет'}</b><br><span class="muted">${reviews.length?reviews.length+' отзыв':'Будьте первым, кто оставит отзыв'}</span></span><span>›</span></button>
      <div class="other-dates"><h3 class="block-title">Также доступны другие даты:</h3><div class="date-card"><span>${e.id==='e4'?'17 мая, 17:00':fmtDate(e.date)+', '+e.time}</span><button class="route-btn">Билеты</button><button class="heart empty">♡</button></div></div>
      <div class="map-title"><b>Адрес площадки:</b> ${e.address}</div><div class="map-frame"><iframe src="https://yandex.ru/map-widget/v1/?ll=${e.lon}%2C${e.lat}&z=16&pt=${e.lon},${e.lat},pm2rdm" loading="lazy"></iframe></div><button class="route-btn" id="routeBtn">Построить маршрут</button>
    </div><div class="buybar"><button class="buy" id="buyBtn">Купить билет</button></div></section>`;
  document.getElementById('favDetail').onclick=()=>toggleFav(e.id,true); document.getElementById('subDetail').onclick=()=>toggleSub(e.id,true); document.getElementById('reviewsOpen').onclick=()=>{state.tab='reviews';render()};
  document.getElementById('buyBtn').onclick=()=>openLink(e.ticketUrl); document.getElementById('routeBtn').onclick=()=>openRoute(e); const rm=document.getElementById('readMore'); if(rm) rm.onclick=()=>{state.expanded=!state.expanded;render()};
}
function renderReviewsPage(){
  const e=EVENTS.find(x=>x.id===state.detail), list=state.reviews[e.id]||[]; view.classList.remove('detail');
  view.innerHTML=`<section class="reviews-page"><h2 class="section-title">Отзывы</h2><div class="section-note">${e.title}</div><div class="rating-summary"><div><div class="score">${list.length?avg(list):'0'}</div><div class="review-stars-line">★★★★★</div><div class="muted">${list.length} отзыв</div></div><div class="bars">${[5,4,3,2,1].map(n=>`<div>${n}<div class="bar"><span style="width:${list.filter(r=>r.rating===n).length/list.length*100||0}%"></span></div></div>`).join('')}</div></div><button class="outline-btn" id="addReview" style="width:100%;margin-bottom:18px">Оставить отзыв</button>${list.map(r=>`<div class="review-full"><div class="review-top"><div style="display:flex;gap:14px;align-items:center"><div class="avatar-small">${r.name[0]||'О'}</div><div><b>${r.name}</b><br><span class="muted">${r.date}</span></div></div><div class="review-stars-line">${'★'.repeat(r.rating)}</div></div><div class="review-text">${escapeHtml(r.text)}</div></div>`).join('')}</section>`;
  document.getElementById('addReview').onclick=()=>openReviewModal(e.id);
}
function avg(list){return Math.round(list.reduce((s,r)=>s+r.rating,0)/list.length*10)/10}

function bindCards(){
  document.querySelectorAll('[data-open]').forEach(n=>n.onclick=(ev)=>{if(ev.target.closest('[data-fav]'))return;state.lastTab=state.tab;state.tab='detail';state.detail=n.dataset.open;state.expanded=false;render();});
  document.querySelectorAll('[data-fav]').forEach(b=>b.onclick=(ev)=>{ev.stopPropagation();toggleFav(b.dataset.fav,false)});
  document.querySelector('[data-toggle-all]')?.addEventListener('click',()=>{state.allOpen=!state.allOpen;renderHome()});
}
function toggleFav(id,stay){state.fav=state.fav.includes(id)?state.fav.filter(x=>x!==id):[...state.fav,id];save('fav',state.fav);haptic(); stay?renderDetail():render()}
function toggleSub(id,stay){state.subs=state.subs.includes(id)?state.subs.filter(x=>x!==id):[...state.subs,id];save('subs',state.subs);haptic(); stay?renderDetail():render()}
function haptic(){try{WebApp?.HapticFeedback?.impactOccurred?.('light')}catch{}}
function openLink(url){try{WebApp?.openLink?WebApp.openLink(url):window.open(url,'_blank')}catch{window.open(url,'_blank')}}
function openRoute(e){openLink(`https://yandex.ru/maps/?rtext=~${e.lat},${e.lon}&rtt=auto&z=16`)}

function openDateDropdown(){
  const days=['2026-04-23','2026-04-24','2026-04-25','2026-04-26','2026-04-27','2026-04-28','2026-04-29','2026-04-30'];
  dropdownRoot.innerHTML=`<div class="calendar dropdown"><div class="cal-top"><button class="cal-nav">‹</button><div class="cal-title">апрель 2026 г.</div><button class="cal-nav">›</button></div><div class="cal-grid">${['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d=>`<div class="weekday">${d}</div>`).join('')}${['30','31','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22',...days.map(d=>String(Number(d.slice(-2)))),'1','2','3'].map(x=>{const num=String(x).padStart(2,'0');const date=`2026-04-${num}`;const active=state.date===date||(!state.date&&num==='23');const off=Number(x)<23&&Number(x)>2||['30','31','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22'].includes(String(x));return `<button class="day ${active?'active':''} ${off?'off':''}" data-date="${date}">${x}</button>`}).join('')}</div></div>`;
  document.body.classList.add('backdrop-blur'); dropdownRoot.querySelectorAll('[data-date]').forEach(b=>b.onclick=()=>{state.date=b.dataset.date; closeDropdown(); render()});
}
function openVenueDropdown(){
  dropdownRoot.innerHTML=`<div class="dropdown venue-list">${venues.map(v=>`<button class="venue-item ${state.venue===v?'active':''}" data-venue="${v}"><span>${v}</span>${state.venue===v?'<span>✓</span>':''}</button>`).join('')}</div>`; document.body.classList.add('backdrop-blur'); dropdownRoot.querySelectorAll('[data-venue]').forEach(b=>b.onclick=()=>{state.venue=b.dataset.venue;closeDropdown();render()});
}
function closeDropdown(){dropdownRoot.innerHTML='';document.body.classList.remove('backdrop-blur')}
function openReviewModal(eventId){
  const e=EVENTS.find(x=>x.id===eventId); let rating=0;
  modalRoot.innerHTML=`<div class="modal-overlay"><div class="review-modal"><button class="modal-close">×</button><div class="modal-avatar">О</div><h2>Отзыв</h2><div class="muted">Олег</div><div style="margin-top:14px">${e.title}</div><div class="stars-select">${[1,2,3,4,5].map(n=>`<button class="star-select" data-star="${n}">★</button>`).join('')}</div><div class="rating-label">Нажмите для оценки</div><textarea class="review-input" placeholder="Поделитесь впечатлениями..."></textarea><button class="send-review" disabled>Отправить</button></div></div>`;
  modalRoot.querySelector('.modal-close').onclick=()=>modalRoot.innerHTML=''; modalRoot.querySelector('.modal-overlay').onclick=e=>{if(e.target.className==='modal-overlay')modalRoot.innerHTML=''};
  const send=modalRoot.querySelector('.send-review'), label=modalRoot.querySelector('.rating-label');
  modalRoot.querySelectorAll('[data-star]').forEach(btn=>btn.onclick=()=>{rating=+btn.dataset.star;modalRoot.querySelectorAll('[data-star]').forEach((s,i)=>s.classList.toggle('active',i<rating));label.textContent=rating===5?'В восторге':rating===4?'Отлично':'Оценка '+rating;send.disabled=false;});
  send.onclick=()=>{const text=modalRoot.querySelector('textarea').value.trim()||'Без текста';state.reviews[eventId] ||= [];state.reviews[eventId].unshift({name:'Олег',rating,text,date:'Сегодня'});save('reviews',state.reviews);modalRoot.innerHTML='';state.tab='reviews';render()};
}
function escapeHtml(s){return String(s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]))}

document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;state.detail=null;render()});
document.getElementById('dateBtn').onclick=()=> dropdownRoot.innerHTML?closeDropdown():openDateDropdown();
document.getElementById('venueBtn').onclick=()=> dropdownRoot.innerHTML?closeDropdown():openVenueDropdown();
document.getElementById('menuBtn').onclick=()=>{};
backBtn.onclick=()=>{ if(state.tab==='detail'){state.tab=state.lastTab||'home'; render(); return} if(state.tab==='reviews'){state.tab='detail'; render(); return} try{WebApp?.close?.()}catch{} };
render();
