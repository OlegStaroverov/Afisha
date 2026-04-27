(() => {
  'use strict';

  const app = document.getElementById('app');
  const tabbar = document.getElementById('tabbar');
  const modal = document.getElementById('modal');

  if (window.WebApp) {
    try { window.WebApp.ready?.(); window.WebApp.expand?.(); } catch (_) {}
  }

  const STORAGE = 'afisha_sevastopol_state_v3';
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

  const baseEvents = [
    {
      id:'first-russia', offset:0, time:'10:00', allDay:false,
      title:'Выставка «Первый в России»', venue:'Музей-заповедник Херсонес Таврический', address:'Севастополь, Древняя улица, 1',
      image:'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=500&q=80', rating:5,
      desc:'Выставочный проект о людях и событиях, которые стали первыми в истории. Экспозиция объединяет архивные материалы, редкие фотографии, документы и предметы из музейной коллекции.'
    },
    {
      id:'walk', offset:0, time:'11:00', allDay:false,
      title:'Пешеходная экскурсия для сборных групп по Севастополю', venue:'Севастопольский центр культуры и искусств', address:'Севастополь, улица Ленина, 25',
      image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80', rating:0,
      desc:'Прогулка по историческому центру города с рассказом о памятниках, площадях, архитектуре и людях, которые формировали облик Севастополя.'
    },
    {
      id:'heart', offset:0, time:'11:00', allDay:false,
      title:'Вафельное сердце', venue:'Севастопольский театр юного зрителя', address:'Севастополь, проспект Победы, 9',
      image:'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=500&q=80', rating:0,
      desc:'Трогательный спектакль для всей семьи о дружбе, взрослении и маленьких чудесах, которые случаются рядом с теми, кто умеет верить.'
    },
    {
      id:'backstage', offset:0, time:'12:00', allDay:false,
      title:'Путешествие по закулисью', venue:'Севастопольский театр юного зрителя', address:'Севастополь, проспект Победы, 9',
      image:'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=500&q=80', rating:0,
      desc:'6+ Рекомендуемый возраст: 6+. Продолжительность экскурсии: 1 час. Хотите попасть в сказочный мир закулисья театра? У вас есть уникальная возможность своими глазами увидеть театр изнутри, узнать множество театральных легенд и секретов, прогуляться по мастерским, где работают настоящие волшебники сцены.'
    },
    {
      id:'queen', offset:1, time:'16:00', allDay:false,
      title:'Пиковая дама', venue:'Театр им. Луначарского', address:'Севастополь, проспект Нахимова, 6',
      image:'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=500&q=80', rating:5,
      desc:'Сценическая версия знаменитой повести о страсти, судьбе и цене одной тайны. Классический сюжет раскрывается через напряженную атмосферу и сильную актерскую игру.'
    },
    {
      id:'gallery', offset:1, time:'17:00', allDay:false,
      title:'Диалоги в искусстве: художник, зритель и город', venue:'Севастопольский центр культуры и искусств', address:'Севастополь, улица Ленина, 25',
      image:'https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=500&q=80', rating:0,
      desc:'Встреча о современном искусстве, городских сюжетах и том, как зритель становится участником художественного разговора.'
    },
    {
      id:'hanuma', offset:1, time:'18:00', allDay:false,
      title:'«Ханума»', venue:'Севастопольский академический русский драматический театр', address:'Севастополь, проспект Нахимова, 6',
      image:'https://images.unsplash.com/photo-1515165562835-c3b8c2d9f675?auto=format&fit=crop&w=500&q=80', rating:5,
      desc:'Спектакль «Ханума» — всем известная история о соперничестве двух свах, блестяще воплощенная на сцене. События разворачиваются в старинном городе, где интрига, юмор и музыка соединяются в живой и яркий театральный праздник.'
    },
    {
      id:'ussr', offset:1, time:'20:00', allDay:false,
      title:'«Елка Весна СССР»', venue:'Дворец культуры рыбаков', address:'Севастополь, улица Павла Корчагина, 1',
      image:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80', rating:0,
      desc:'Музыкальная программа с атмосферой ретро, любимыми мелодиями и живыми историями о времени, которое многие помнят с теплом.'
    },
    {
      id:'heroes', offset:3, time:'09:00', allDay:true,
      title:'Выставка «Герои Севастополя»', venue:'Музей-заповедник Херсонес Таврический', address:'Севастополь, Древняя улица, 1',
      image:'https://images.unsplash.com/photo-1566127992631-137a642a90f4?auto=format&fit=crop&w=500&q=80', rating:0,
      desc:'Экспозиция о людях, связанных с историей города, военной славой и культурной памятью Севастополя.'
    },
    {
      id:'virtuoso', offset:3, time:'10:00', allDay:true,
      title:'Виртуоз', venue:'Севастопольский центр культуры и искусств', address:'Севастополь, улица Ленина, 25',
      image:'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80', rating:0,
      desc:'Музыкальная программа с произведениями классики и современными аранжировками.'
    },
    {
      id:'book', offset:3, time:'10:30', allDay:true,
      title:'Книжная выставка «Калейдоскоп историй»', venue:'Севастопольский центр культуры и искусств', address:'Севастополь, улица Ленина, 25',
      image:'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=500&q=80', rating:0,
      desc:'Подборка книг, изданий и редких материалов для любителей истории, литературы и краеведения.'
    },
    {
      id:'cinema', offset:3, time:'18:30', allDay:false,
      title:'Кинопоказ под открытым небом', venue:'Кинотеатр Москва', address:'Севастополь, проспект Генерала Острякова, 70',
      image:'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80', rating:0,
      desc:'Вечерний показ фильма с обсуждением после сеанса.'
    }
  ];

  const state = Object.assign({ tab:'home', date:'all', venue:'Все площадки', current:null, favorites:[], subscriptions:[], reviews:{}, expanded:false }, loadState());

  const icons = {
    calendar:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    pin:'<svg viewBox="0 0 24 24"><path d="M12 21s7-5.2 7-12A7 7 0 0 0 5 9c0 6.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.4"/></svg>',
    clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    heart:'<svg class="icon-heart" viewBox="0 0 24 24"><path d="M12 21s-7.5-4.5-9.4-10A5.4 5.4 0 0 1 12 5.8 5.4 5.4 0 0 1 21.4 11C19.5 16.5 12 21 12 21z"/></svg>',
    bell:'<svg class="icon-bell" viewBox="0 0 24 24"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9zM10 21h4"/></svg>'
  };

  function loadState(){ try { return JSON.parse(localStorage.getItem(STORAGE) || '{}'); } catch { return {}; } }
  function saveState(){ localStorage.setItem(STORAGE, JSON.stringify({ date:state.date, venue:state.venue, favorites:state.favorites, subscriptions:state.subscriptions, reviews:state.reviews })); }
  function escapeHtml(v){ return String(v ?? '').replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch])); }
  function moscowToday(){ const parts = new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Moscow',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()); const y=+parts.find(p=>p.type==='year').value; const m=+parts.find(p=>p.type==='month').value-1; const d=+parts.find(p=>p.type==='day').value; return new Date(y,m,d); }
  function addDays(date,n){ const d=new Date(date); d.setDate(d.getDate()+n); return d; }
  function iso(date){ return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
  function todayIso(){ return iso(moscowToday()); }
  function formatDay(date){ return new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',day:'numeric',month:'long'}).format(date); }
  function week(date){ return new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',weekday:'long'}).format(date); }
  function relTitle(date){ const t=moscowToday(); const diff=Math.round((new Date(date.getFullYear(),date.getMonth(),date.getDate())-t)/MS_DAY); if(diff===0) return ['Сегодня', formatDay(date)]; if(diff===1) return ['Завтра', formatDay(date)]; if(diff===2) return ['Послезавтра', formatDay(date)]; return [formatDay(date), week(date)]; }
  function plural(n,a,b,c){ n=Math.abs(n)%100; const n1=n%10; if(n>10&&n<20)return c; if(n1>1&&n1<5)return b; if(n1===1)return a; return c; }
  function events(){ const today = moscowToday(); return baseEvents.map(e => ({...e, date: iso(addDays(today, e.offset))})); }
  function byId(id){ return events().find(e => e.id === id); }
  function isFav(id){ return state.favorites.includes(id); }
  function isSub(id){ return state.subscriptions.includes(id); }
  function toggle(arr,id){ const i=arr.indexOf(id); if(i>=0) arr.splice(i,1); else arr.push(id); saveState(); }

  function filtersHtml(){
    const dateText = state.date === 'all' ? 'Выберите дату' : formatDay(new Date(state.date + 'T00:00:00'));
    return `<section class="filters">
      <button class="filter-btn" data-action="date">${icons.calendar}<span>${escapeHtml(dateText)}</span></button>
      <button class="filter-btn" data-action="venue">${icons.pin}<span>${escapeHtml(state.venue)}</span></button>
    </section>`;
  }

  function filtered(){
    return events().filter(e => (state.date === 'all' || e.date === state.date) && (state.venue === 'Все площадки' || e.venue === state.venue)).sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time));
  }
  function groupByDate(list){ return list.reduce((acc,e)=>{ (acc[e.date] ||= []).push(e); return acc; },{}); }
  function placeHtml(v){ return `<div class="place">${icons.pin}<span>${escapeHtml(v)}</span></div>`; }
  function eventCard(e){
    return `<article class="event" data-open="${e.id}">
      <img class="event-img" src="${e.image}" alt="">
      <div class="event-content">
        <div class="event-time">${escapeHtml(e.time)}</div>
        <button class="event-action ${isFav(e.id)?'active':''}" data-fav="${e.id}" aria-label="Избранное">${icons.heart}</button>
        <div class="event-title">${escapeHtml(e.title)}</div>
        ${placeHtml(e.venue)}
      </div>
    </article>`;
  }
  function featureCard(e){ return `<article class="feature" data-open="${e.id}"><img src="${e.image}" alt=""><div class="feature-body"><div class="feature-title">${escapeHtml(e.title)}</div>${placeHtml(e.venue)}</div></article>`; }

  function renderHome(){
    const groups=groupByDate(filtered());
    const content = Object.keys(groups).map(dateIso=>{
      const d=new Date(dateIso+'T00:00:00'); const [main,sub]=relTitle(d); const list=groups[dateIso]; const all=list.filter(e=>e.allDay); const timed=list.filter(e=>!e.allDay);
      return `<section class="day-block">
        <div class="day-title">${escapeHtml(main)} <span class="sub">${escapeHtml(sub)}</span></div>
        <button class="all-day"><span class="clock">${icons.clock}</span><span><div class="all-day-title">Весь день</div><div class="all-day-count">${list.length} ${plural(list.length,'мероприятие','мероприятия','мероприятий')}</div></span><span class="counter">${list.length}</span><span class="chev">⌄</span></button>
        ${all.length ? `<div class="featured">${all.map(featureCard).join('')}</div>` : ''}
        <div class="events">${timed.map(eventCard).join('')}</div>
      </section>`;
    }).join('') || `<div class="empty">На выбранную дату и площадку мероприятий пока нет</div>`;
    app.innerHTML = filtersHtml() + `<div class="screen">${content}</div>`;
  }

  function renderFavorites(){
    const list=events().filter(e=>isFav(e.id)); const groups=groupByDate(list);
    const content = list.length ? Object.keys(groups).map(d=>{ const [m,s]=relTitle(new Date(d+'T00:00:00')); return `<section class="day-block"><div class="day-title">${escapeHtml(m)} <span class="sub">${escapeHtml(s)}</span></div><div class="events">${groups[d].map(eventCard).join('')}</div></section>`; }).join('') : '<div class="empty">Вы пока ничего не добавили в избранное</div>';
    app.innerHTML = filtersHtml() + `<div class="screen"><section class="intro"><h1>Ваш список избранных мероприятий</h1><p>Даты, которые вы сохранили, чтобы не потерять среди общей ленты</p></section>${content}</div>`;
  }

  function renderSubscriptions(){
    const list=events().filter(e=>isSub(e.id));
    const content = list.length ? list.map(e=>`<article class="sub-card"><div class="sub-head" data-open="${e.id}"><img src="${e.image}" alt=""><div><div class="sub-title">${escapeHtml(e.title)}</div>${placeHtml(e.venue)}</div><button class="active" data-sub="${e.id}">${icons.bell}</button></div><div class="sub-dates"><div class="sub-row"><span>${formatDay(new Date(e.date+'T00:00:00'))}<small>${relTitle(new Date(e.date+'T00:00:00'))[0].toLowerCase()}</small></span><span class="active">${icons.heart}</span><span class="sub-time">${e.time}</span></div><div class="sub-row"><span>${formatDay(addDays(new Date(e.date+'T00:00:00'),23))}<small>${week(addDays(new Date(e.date+'T00:00:00'),23))}</small></span><span></span><span class="sub-time">17:00</span></div></div></article>`).join('') : '<div class="empty">Подписок пока нет</div>';
    app.innerHTML = filtersHtml() + `<div class="screen"><section class="intro"><h1>Список подписок</h1><p>Вы получите уведомление, когда организатор добавит новые даты</p></section>${content}</div>`;
  }

  function renderDetail(){
    const e=byId(state.current) || events()[0]; const d=new Date(e.date+'T00:00:00'); const reviews=state.reviews[e.id]||[]; const avg=reviews.length ? Math.round(reviews.reduce((s,r)=>s+r.rating,0)/reviews.length) : e.rating; const [rel]=relTitle(d);
    const desc = state.expanded ? e.desc : e.desc.length > 230 ? e.desc.slice(0,230) + '...' : e.desc;
    tabbar.hidden = true;
    app.classList.add('detail');
    app.innerHTML = `<button class="back" data-back>‹</button>
      <section class="hero"><img src="${e.image}" alt=""></section>
      <section class="detail-body">
        <h1 class="detail-title">${escapeHtml(e.title)}</h1>
        <div class="detail-date">${escapeHtml(rel)} в ${escapeHtml(e.time)}</div>
        <div class="detail-place">${icons.pin}<span>${escapeHtml(e.venue)}</span><span>›</span></div>
        <div class="actions"><button class="pill ${isFav(e.id)?'active':''}" data-fav="${e.id}">${icons.heart}<span>${isFav(e.id)?'В избранном':'Избранное'}</span></button><button class="pill ${isSub(e.id)?'active':''}" data-sub="${e.id}">${icons.bell}<span>${isSub(e.id)?'Подписаться':'Подписаться'}</span></button><button class="pill" data-help>?</button></div>
        <div class="divider"></div>
        <section class="block"><h2>О событии</h2><div class="desc">${escapeHtml(desc)}</div>${e.desc.length>230?`<button class="link-btn" data-expand>${state.expanded?'Свернуть ^':'Читать далее ›'}</button>`:''}</section>
        <button class="review-link" data-reviews="${e.id}"><span class="review-num">${avg || '☆'}</span><span class="star-yellow">${avg?'★':'☆'}</span><span><span class="review-title">${avg || reviews.length ? 'Отзывы':'Отзывов пока нет'}</span><span class="review-sub">${reviews.length ? `${reviews.length} ${plural(reviews.length,'отзыв','отзыва','отзывов')}` : 'Будьте первым, кто оставит отзыв'}</span></span><span>›</span></button>
        <section class="block"><h2>Также доступны другие даты:</h2><div class="date-option"><span>${formatDay(addDays(d,23))}, 17:00</span><span class="ticket-small">Билеты</span><button class="${isFav(e.id)?'active':''}" data-fav="${e.id}">${icons.heart}</button></div></section>
        <section class="block"><div class="address"><strong>Адрес площадки:</strong> ${escapeHtml(e.address.replace('Севастополь, ',''))}</div><iframe class="map" src="https://yandex.ru/map-widget/v1/?mode=search&text=${encodeURIComponent(e.address)}" loading="lazy"></iframe></section>
      </section><div class="ticketbar"><button class="ticket" data-ticket="${e.id}">Купить билет</button></div>`;
  }

  function renderReviews(){
    const e=byId(state.current) || events()[0]; const reviews=state.reviews[e.id]||[]; const avg=reviews.length ? Math.round(reviews.reduce((s,r)=>s+r.rating,0)/reviews.length) : e.rating;
    tabbar.hidden = true; app.classList.remove('detail');
    app.innerHTML = `<div class="reviews-page"><button class="back" data-back>‹</button><h1>Отзывы</h1><div class="desc">${escapeHtml(e.title)}</div><div class="rating-summary"><div><div class="rating-num">${avg||0}</div><div class="stars">${'★'.repeat(avg||0)}</div><div class="review-sub">${reviews.length || (avg?1:0)} ${plural(reviews.length || (avg?1:0),'отзыв','отзыва','отзывов')}</div></div><div>${[5,4,3,2,1].map(n=>`<div class="bar"><span>${n}</span><div class="bar-line"><div class="bar-fill" style="width:${n===avg?100:0}%"></div></div></div>`).join('')}</div></div><button class="pill" data-open-review="${e.id}">Оставить отзыв</button><div class="events">${reviews.map(r=>`<article class="review-card"><div class="avatar">${escapeHtml((r.name||'О')[0])}</div><div><div class="review-name">${escapeHtml(r.name||'Олег')}</div><div class="review-sub">Сегодня</div><div class="stars">${'★'.repeat(r.rating)}</div><div class="review-text">${escapeHtml(r.text)}</div></div></article>`).join('')}</div></div>`;
  }

  function render(){
    app.classList.remove('detail'); tabbar.hidden = false;
    document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active', b.dataset.tab===state.tab));
    if(state.tab==='home') renderHome();
    if(state.tab==='favorites') renderFavorites();
    if(state.tab==='subscriptions') renderSubscriptions();
    if(state.tab==='detail') renderDetail();
    if(state.tab==='reviews') renderReviews();
  }

  function openDatePicker(){
    const shade=document.createElement('div'); shade.className='shade'; document.body.appendChild(shade);
    const today=moscowToday(); let month=new Date(today.getFullYear(),today.getMonth(),1);
    const picker=document.createElement('div'); picker.className='picker'; document.body.appendChild(picker);
    function draw(){
      const y=month.getFullYear(), m=month.getMonth(); const first=(new Date(y,m,1).getDay()+6)%7; const days=new Date(y,m+1,0).getDate(); const prevDays=new Date(y,m,0).getDate(); let cells='';
      for(let i=0;i<42;i++){ let dnum, cd, cls=''; if(i<first){dnum=prevDays-first+i+1; cd=new Date(y,m-1,dnum); cls='other';} else if(i>=first+days){dnum=i-first-days+1; cd=new Date(y,m+1,dnum); cls='other';} else {dnum=i-first+1; cd=new Date(y,m,dnum);} const disabled=cd<today; const val=iso(cd); if(disabled) cls+=' disabled'; if(val===state.date) cls+=' active'; if(val===todayIso()) cls+=' today'; cells+=`<button class="day ${cls}" data-pick="${val}">${dnum}</button>`; }
      picker.innerHTML=`<div class="picker-head"><button data-prev>‹</button><div class="month-title">${new Intl.DateTimeFormat('ru-RU',{month:'long',year:'numeric'}).format(month)}</div><button data-next>›</button></div><div class="week"><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div><div class="days">${cells}</div>`;
    }
    function close(){ picker.remove(); shade.remove(); }
    picker.addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b)return; if(b.dataset.prev!==undefined){ month=new Date(month.getFullYear(),month.getMonth()-1,1); draw(); } if(b.dataset.next!==undefined){ month=new Date(month.getFullYear(),month.getMonth()+1,1); draw(); } if(b.dataset.pick){ state.date=b.dataset.pick; saveState(); close(); render(); }});
    shade.addEventListener('click', close); draw();
  }

  function openVenueList(){
    const shade=document.createElement('div'); shade.className='shade'; document.body.appendChild(shade);
    const list=document.createElement('div'); list.className='venue-list'; list.innerHTML=venues.map(v=>`<button class="venue-item ${v===state.venue?'active':''}" data-venue="${escapeHtml(v)}"><span>${escapeHtml(v)}</span><span>${v===state.venue?'✓':''}</span></button>`).join(''); document.body.appendChild(list);
    function close(){ list.remove(); shade.remove(); }
    list.addEventListener('click',e=>{ const b=e.target.closest('[data-venue]'); if(!b)return; state.venue=b.dataset.venue; saveState(); close(); render(); }); shade.addEventListener('click', close);
  }

  function openReviewModal(id){
    const e=byId(id); let rating=0;
    modal.hidden=false; modal.innerHTML=`<div class="review-modal"><button class="modal-close" data-close>×</button><h2>Отзыв</h2><div class="review-event">${escapeHtml(e.title)}</div><div class="stars-input">${[1,2,3,4,5].map(n=>`<button class="star-btn" data-rate="${n}">★</button>`).join('')}</div><div class="rating-word">Нажмите для оценки</div><textarea placeholder="Поделитесь впечатлениями..."></textarea><button class="send-review" disabled>Отправить</button></div>`;
    const update=()=>{ modal.querySelectorAll('.star-btn').forEach(b=>b.classList.toggle('active', +b.dataset.rate<=rating)); modal.querySelector('.rating-word').textContent = rating===5?'В восторге':rating===4?'Очень хорошо':rating===3?'Нормально':rating===2?'Не очень':'Нажмите для оценки'; modal.querySelector('.send-review').disabled = !rating || !modal.querySelector('textarea').value.trim(); };
    modal.addEventListener('input', update, {once:false});
    modal.onclick=(ev)=>{ const rate=ev.target.closest('[data-rate]'); if(rate){ rating=+rate.dataset.rate; update(); } if(ev.target.closest('[data-close]')||ev.target===modal){ modal.hidden=true; modal.innerHTML=''; } if(ev.target.closest('.send-review')&&!ev.target.closest('.send-review').disabled){ const text=modal.querySelector('textarea').value.trim(); (state.reviews[id] ||= []).push({name:'Олег',rating,text}); saveState(); modal.hidden=true; modal.innerHTML=''; state.tab='reviews'; render(); }};
  }

  tabbar.addEventListener('click', e=>{ const b=e.target.closest('[data-tab]'); if(!b)return; state.tab=b.dataset.tab; state.expanded=false; render(); });
  app.addEventListener('click', e=>{
    const fav=e.target.closest('[data-fav]'); if(fav){ e.stopPropagation(); toggle(state.favorites, fav.dataset.fav); render(); return; }
    const sub=e.target.closest('[data-sub]'); if(sub){ e.stopPropagation(); toggle(state.subscriptions, sub.dataset.sub); render(); return; }
    const open=e.target.closest('[data-open]'); if(open){ state.current=open.dataset.open; state.tab='detail'; state.expanded=false; render(); window.scrollTo(0,0); return; }
    if(e.target.closest('[data-action="date"]')){ openDatePicker(); return; }
    if(e.target.closest('[data-action="venue"]')){ openVenueList(); return; }
    if(e.target.closest('[data-back]')){ state.tab='home'; state.expanded=false; render(); return; }
    if(e.target.closest('[data-expand]')){ state.expanded=!state.expanded; render(); return; }
    const rev=e.target.closest('[data-reviews]'); if(rev){ state.current=rev.dataset.reviews; state.tab='reviews'; render(); return; }
    const openRev=e.target.closest('[data-open-review]'); if(openRev){ openReviewModal(openRev.dataset.openReview); return; }
    const ticket=e.target.closest('[data-ticket]'); if(ticket){ const ev=byId(ticket.dataset.ticket); window.open(`https://yandex.ru/maps/?rtext=~${encodeURIComponent(ev.address)}&rtt=auto`, '_blank'); }
  });

  window.addEventListener('error', (event) => { console.error(event.error || event.message); app.innerHTML = `<div class="empty">Ошибка загрузки интерфейса. Обновите mini app.</div>`; });
  render();
})();
