const now = new Date('2026-04-23T10:30:00');

const EVENTS = [
  {id:'e1',title:'Путешествие по закулисью',venue:'Государственный театр кукол',address:'проспект Победы 9, Севастополь',lat:44.5887,lon:33.5234,date:'2026-04-23',time:'11:00',age:'6+',image:'https://images.unsplash.com/photo-1607457561901-e6ec3a6d16cf?auto=format&fit=crop&w=900&q=80',summary:'Экскурсия в сказочный мир закулисья театра кукол.',description:'6+ Рекомендуемый возраст: 6+. Продолжительность экскурсии: 1 час. У вас есть уникальная возможность своими глазами увидеть театр кукол изнутри, узнать театральные легенды и секреты, прогуляться по мастерским, где работают артисты-кукловоды и специалисты театра.',ticketsUrl:'https://yandex.ru/maps/?text=Государственный театр кукол Севастополь',featured:false},
  {id:'e2',title:'Ханума',venue:'Севастопольский театр драмы',address:'проспект Нахимова 6, Севастополь',lat:44.6149,lon:33.5238,date:'2026-04-24',time:'18:00',age:'12+',image:'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80',summary:'История о соперничестве двух свах, блестяще воплощенная на сцене.',description:'Спектакль «Ханума» — всем известная история о соперничестве двух свах, блестяще воплощенная на сцене. События разворачиваются в старинном Тифлисе, где каждый герой ищет свое счастье, любовь и выгоду. Легкая комедия, яркие характеры и музыкальная атмосфера делают постановку отличным выбором для вечера.',ticketsUrl:'https://yandex.ru/maps/?text=Севастопольский театр драмы',featured:true},
  {id:'e3',title:'Выставка «Первый в России»',venue:'Музей обороны Севастополя',address:'Исторический бульвар, Севастополь',lat:44.6013,lon:33.5227,date:'2026-04-24',time:'10:00',age:'0+',image:'https://images.unsplash.com/photo-1566127992631-137a642a90f4?auto=format&fit=crop&w=900&q=80',summary:'Историческая выставка о людях и событиях, изменивших город.',description:'Экспозиция рассказывает о важных страницах истории Севастополя через документы, предметы быта, фотографии и редкие архивные материалы. Подходит для семейного посещения и спокойного музейного маршрута.',ticketsUrl:'https://yandex.ru/maps/?text=Музей обороны Севастополя',featured:true},
  {id:'e4',title:'Пешеходная экскурсия по центру',venue:'Площадь Нахимова',address:'Площадь Нахимова, Севастополь',lat:44.6167,lon:33.5254,date:'2026-04-24',time:'11:00',age:'6+',image:'https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=900&q=80',summary:'Маршрут по главным точкам города с гидом.',description:'Прогулка по центральной части Севастополя: площадь Нахимова, набережная, памятники, исторические здания и городские легенды. Удобный формат для гостей города и жителей, которые хотят взглянуть на привычные места иначе.',ticketsUrl:'https://yandex.ru/maps/?text=Площадь Нахимова Севастополь',featured:false},
  {id:'e5',title:'Вафельное сердце',venue:'Театр юного зрителя',address:'улица Ленина 25, Севастополь',lat:44.6097,lon:33.5221,date:'2026-04-24',time:'11:00',age:'6+',image:'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=900&q=80',summary:'Добрый семейный спектакль о дружбе и взрослении.',description:'Трогательная история для детей и взрослых. Постановка говорит простым языком о важных вещах: доверии, поддержке, честности и умении слышать друг друга.',ticketsUrl:'https://yandex.ru/maps/?text=Театр юного зрителя Севастополь',featured:false},
  {id:'e6',title:'Косточка',venue:'Театр юного зрителя',address:'улица Ленина 25, Севастополь',lat:44.6097,lon:33.5221,date:'2026-04-26',time:'11:00',age:'6+',image:'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=900&q=80',summary:'Театральная постановка для семейного посещения.',description:'Спектакль с теплой камерной атмосферой, где простая история раскрывается через выразительную игру актеров, свет и музыку.',ticketsUrl:'https://yandex.ru/maps/?text=Театр юного зрителя Севастополь',featured:false},
  {id:'e7',title:'Картинная галерея. Избранное',venue:'Севастопольский художественный музей',address:'проспект Нахимова 9, Севастополь',lat:44.6154,lon:33.5249,date:'2026-04-26',time:'18:00',age:'0+',image:'',summary:'Классика музейной коллекции в одной экспозиции.',description:'Выставка знакомит с работами из постоянной коллекции музея. В маршруте собраны произведения разных эпох и направлений, которые помогают увидеть развитие художественной традиции.',ticketsUrl:'https://yandex.ru/maps/?text=Севастопольский художественный музей',featured:true},
  {id:'e8',title:'Виртуоз',venue:'Картинная галерея',address:'проспект Нахимова 9, Севастополь',lat:44.6154,lon:33.5249,date:'2026-04-26',time:'12:00',age:'0+',image:'',summary:'Музыкальная программа в пространстве галереи.',description:'Небольшой концерт в музейном пространстве. Формат подходит для тех, кто любит спокойные культурные события без суеты.',ticketsUrl:'https://yandex.ru/maps/?text=Картинная галерея Севастополь',featured:true}
];

const $ = (s) => document.querySelector(s);
const app = $('#app');
const modal = $('#modal');
const pageTitle = $('#pageTitle');
const filters = $('#filters');
const backBtn = $('#backBtn');
const closeBtn = $('#closeBtn');
let state = {tab:'home', view:'home', selectedDate:null, selectedVenue:'Все площадки', opened:null, expanded:false};
let store = loadStore();

function loadStore(){
  try{return JSON.parse(localStorage.getItem('afisha-sev-store')||'{}')}catch{return {}}
}
function saveStore(){localStorage.setItem('afisha-sev-store',JSON.stringify(store))}
function arr(key){return Array.isArray(store[key])?store[key]:[]}
function toggle(key,id){const a=arr(key); store[key]=a.includes(id)?a.filter(x=>x!==id):[...a,id]; saveStore(); render()}
function is(key,id){return arr(key).includes(id)}
function fmtDate(iso){const d=new Date(iso+'T12:00:00'); return d.toLocaleDateString('ru-RU',{day:'numeric',month:'long'})}
function dayName(iso){const d=new Date(iso+'T12:00:00'); const today=new Date(now.toDateString()); const diff=(d-today)/86400000; if(diff===0)return 'Сегодня'; if(diff===1)return 'Завтра'; if(diff===2)return 'Послезавтра'; return fmtDate(iso)}
function weekday(iso){return new Date(iso+'T12:00:00').toLocaleDateString('ru-RU',{weekday:'long'})}
function byDate(){let list=[...EVENTS]; if(state.selectedDate) list=list.filter(e=>e.date===state.selectedDate); if(state.selectedVenue!=='Все площадки') list=list.filter(e=>e.venue===state.selectedVenue); return list.sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time))}
function groups(list){return list.reduce((m,e)=>((m[e.date]??=[]).push(e),m),{})}
function img(e,cls='poster'){return e.image?`<img class="${cls}" src="${e.image}" alt="${e.title}" loading="lazy">`:`<div class="${cls} empty-img"></div>`}
function place(e){return `<div class="place"><b>⌖</b><span>${e.venue}</span></div>`}
function routeUrl(e){return `https://yandex.ru/maps/?rtext=~${e.lat},${e.lon}&rtt=auto&text=${encodeURIComponent(e.address)}`}
function mapSrc(e){return `https://yandex.ru/map-widget/v1/?ll=${e.lon},${e.lat}&z=16&mode=search&text=${encodeURIComponent(e.address)}`}

function setTop(title,detail=false){pageTitle.textContent=title; backBtn.classList.toggle('hidden',!detail); closeBtn.classList.toggle('hidden',detail); filters.classList.toggle('hidden',detail)}
function render(){
  document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===state.tab));
  $('#dateFilter b').textContent = state.selectedDate ? fmtDate(state.selectedDate) : 'Выберите дату';
  $('#venueFilter b').textContent = state.selectedVenue;
  if(state.view==='detail') return renderDetail();
  setTop('Афиша Севастополя',false);
  if(state.tab==='favorites') return renderFavorites();
  if(state.tab==='subscriptions') return renderSubscriptions();
  renderHome();
}
function renderHome(){
  const list=byDate(); const g=groups(list); const dates=Object.keys(g);
  app.innerHTML= dates.length ? dates.map(date=>dayBlock(date,g[date])).join('') : '<div class="empty">Событий по фильтру не найдено</div>';
  bindCards();
}
function dayBlock(date,items){
  const featured=items.filter(e=>e.featured);
  return `<section><div class="day-head"><strong>${dayName(date)}</strong><span>${date==='2026-04-26'?'воскресенье':fmtDate(date)}</span></div>
  <button class="all-day"><div class="clock">◷</div><div class="all-day-text"><b>Весь день</b><span>${items.length} ${items.length===1?'мероприятие':'мероприятия'}</span></div><div class="count">${items.length}</div><div class="chev">⌄</div></button>
  ${featured.length?`<div class="featured-row">${featured.map(featureCard).join('')}</div>`:''}
  ${items.map(eventCard).join('')}</section>`
}
function featureCard(e){return `<button class="feature-card" data-event="${e.id}">${img(e,'feature-img')}<div><h3>${e.title}</h3>${place(e)}</div></button>`}
function eventCard(e){return `<button class="event-card" data-event="${e.id}">${img(e)}<div class="event-info"><div class="time">${e.time}</div><h3 class="event-title">${e.title}</h3>${place(e)}</div>${is('favorites',e.id)?'<div class="heart-mini">♥</div>':''}</button>`}
function bindCards(){document.querySelectorAll('[data-event]').forEach(el=>el.onclick=()=>{state.view='detail';state.opened=el.dataset.event;state.expanded=false;window.scrollTo(0,0);render()})}
function renderFavorites(){
  const fav=EVENTS.filter(e=>is('favorites',e.id));
  app.innerHTML=`<h2 class="section-title">Ваш список избранных мероприятий</h2><p class="section-subtitle">Даты, которые вы сохранили, чтобы не потерять среди общей ленты</p>${fav.length?fav.map(eventCard).join(''):'<div class="empty">В избранном пока пусто</div>'}`;
  bindCards();
}
function renderSubscriptions(){
  const subVenues=arr('subscriptions');
  const list=[...new Set(EVENTS.filter(e=>subVenues.includes(e.venue)).map(e=>e.venue))];
  app.innerHTML=`<h2 class="section-title">Список подписок</h2><p class="section-subtitle">Вы получите уведомление, когда организатор добавит новые даты</p>${list.length?list.map(venueCard).join(''):'<div class="empty">Подписок пока нет</div>'}`;
  bindCards();
}
function venueCard(venue){
  const evs=EVENTS.filter(e=>e.venue===venue).slice(0,2); const first=evs[0];
  return `<article class="sub-card"><div class="sub-top">${img(first,'poster')}<div><h3>${first.title}</h3>${place(first)}</div><button class="bell" data-sub="${venue}">♢</button></div><div class="sub-dates">${evs.map(e=>`<button class="date-line" data-event="${e.id}"><strong>${fmtDate(e.date)}</strong><span>${weekday(e.date)}</span><div class="date-actions"><span>${e.time}</span><b>›</b></div></button>`).join('')}</div></article>`
}
function renderDetail(){
  const e=EVENTS.find(x=>x.id===state.opened); if(!e)return;
  setTop(e.title,true);
  const desc=state.expanded?e.description:e.description.slice(0,155)+'...';
  app.innerHTML=`<section class="detail"><div class="detail-title">${e.title}</div><div class="detail-hero">${img(e,'detail-img')}</div><div class="detail-card"><div class="when">${dayName(e.date)} в ${e.time}</div><div class="detail-place place"><b>⌖</b><span>${e.venue}</span></div><div class="action-row"><button class="pill-btn" id="favBtn">${is('favorites',e.id)?'♥ В избранном':'♡ Избранное'}</button><button class="pill-btn" id="subBtn">${is('subscriptions',e.venue)?'♢ Подписаны':'♢ Подписаться'}</button><button class="pill-btn mini" id="helpBtn">?</button></div><div class="divider"></div><h2 class="block-title">О событии</h2><p class="description">${desc}</p><button class="readmore" id="readMore">${state.expanded?'Свернуть⌃':'Читать далее ›'}</button><button class="review-row" id="reviewBtn"><span class="review-score">${reviewScore(e.id)}</span><span class="review-star">★</span><span class="review-text"><b>${reviewCount(e.id)?'Отзывы':'Отзывов пока нет'}</b><span>${reviewCount(e.id)?reviewCount(e.id)+' отзыв':'Будьте первым, кто оставит отзыв'}</span></span><span class="arrow">›</span></button><h2 class="block-title">Также доступны другие даты:</h2><div class="dates-list">${otherDates(e).map(d=>`<div class="date-line"><strong>${fmtDate(d.date)}</strong><span>${weekday(d.date)}</span><div class="date-actions"><button class="ticket-small">Билеты</button><button onclick="toggle('favorites','${d.id}')">${is('favorites',d.id)?'♥':'♡'}</button></div></div>`).join('')||'<div class="date-line"><span>Других дат пока нет</span></div>'}</div><h2 class="block-title">Адрес площадки: <span style="font-weight:500">${e.address}</span></h2><div class="map-box"><iframe src="${mapSrc(e)}" loading="lazy"></iframe></div><a class="route" href="${routeUrl(e)}" target="_blank" rel="noopener">Построить маршрут</a><div class="buybar"><a href="${e.ticketsUrl}" target="_blank" rel="noopener">Купить билет</a></div></div></section>`;
  $('#favBtn').onclick=()=>toggle('favorites',e.id);
  $('#subBtn').onclick=()=>toggle('subscriptions',e.venue);
  $('#readMore').onclick=()=>{state.expanded=!state.expanded;render()};
  $('#reviewBtn').onclick=()=>openReview(e);
  $('#helpBtn').onclick=()=>alert('Сохраните событие, подпишитесь на площадку или постройте маршрут до места проведения.');
}
function otherDates(e){return EVENTS.filter(x=>x.title===e.title&&x.id!==e.id)}
function reviewCount(id){return arr('reviews').filter(r=>r.id===id).length}
function reviewScore(id){const r=arr('reviews').filter(x=>x.id===id); if(!r.length)return '☆'; return Math.round(r.reduce((s,x)=>s+x.rating,0)/r.length)}
function openReview(e){
  modal.innerHTML=`<div class="modal"><div class="modal-card"><button class="modal-close">×</button><div class="avatar">О</div><h2>Отзыв</h2><p>Олег<br>${e.title}</p><div class="stars">${[1,2,3,4,5].map(i=>`<button class="star" data-rate="${i}">☆</button>`).join('')}</div><p id="rateText">Нажмите для оценки</p><textarea id="reviewText" placeholder="Поделитесь впечатлениями..."></textarea><button class="submit" id="sendReview">Отправить</button></div></div>`;
  let rating=0;
  modal.querySelector('.modal-close').onclick=()=>modal.innerHTML='';
  modal.querySelectorAll('.star').forEach(st=>st.onclick=()=>{rating=Number(st.dataset.rate);modal.querySelectorAll('.star').forEach(x=>{x.textContent=Number(x.dataset.rate)<=rating?'★':'☆';x.classList.toggle('active',Number(x.dataset.rate)<=rating)});$('#rateText').textContent=rating===5?'В восторге':'Оценка '+rating});
  $('#sendReview').onclick=()=>{if(!rating)return; store.reviews=[...arr('reviews'),{id:e.id,rating,text:$('#reviewText').value.trim(),date:Date.now()}]; saveStore(); modal.innerHTML=''; render()};
}

function openCalendar(){
  const dates=[...new Set(EVENTS.map(e=>e.date))];
  modal.innerHTML=`<div class="fade"></div><div class="calendar"><div class="cal-head"><button>‹</button><strong>апрель 2026 г.</strong><button>›</button></div><div class="cal-grid">${['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d=>`<div class="cal-week">${d}</div>`).join('')}${[30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3].map((d,i)=>{const iso=(i<2?`2026-03-${d}`:i>31?`2026-05-0${d}`:`2026-04-${String(d).padStart(2,'0')}`);return `<button class="cal-day ${i<2||i>31?'off':''} ${state.selectedDate===iso?'active':''}" data-date="${iso}">${d}</button>`}).join('')}</div></div>`;
  modal.querySelector('.fade').onclick=()=>modal.innerHTML='';
  modal.querySelectorAll('.cal-day').forEach(b=>b.onclick=()=>{state.selectedDate=dates.includes(b.dataset.date)?b.dataset.date:null;modal.innerHTML='';render()});
}
function openVenues(){
  const venues=['Все площадки',...new Set(EVENTS.map(e=>e.venue))];
  modal.innerHTML=`<div class="fade"></div><div class="venues">${venues.map(v=>`<button class="venue-item ${state.selectedVenue===v?'active':''}" data-venue="${v}"><b>${v}</b>${state.selectedVenue===v?'<span>✓</span>':''}</button>`).join('')}</div>`;
  modal.querySelector('.fade').onclick=()=>modal.innerHTML='';
  modal.querySelectorAll('.venue-item').forEach(b=>b.onclick=()=>{state.selectedVenue=b.dataset.venue;modal.innerHTML='';render()});
}

document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;state.view='home';window.scrollTo(0,0);render()});
backBtn.onclick=()=>{state.view='home';render()};
closeBtn.onclick=()=>{if(window.WebApp?.close) window.WebApp.close()};
$('#dateFilter').onclick=openCalendar;
$('#venueFilter').onclick=openVenues;

window.WebApp?.ready?.();
window.WebApp?.expand?.();
render();
