const EVENTS = [
  {
    id: 'event-1',
    title: 'Ночь коротких форм',
    venue: 'Сцена Авангард',
    city: 'Москва',
    address: 'Кленовый проспект, 12',
    date: '2026-04-26',
    time: '19:00',
    duration: '1 ч 40 мин',
    age: '16+',
    category: 'Театр',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80',
    summary: 'Три короткие постановки в одном вечере. Живой свет, минималистичная сцена и камерная атмосфера.',
    description: 'Это событие можно использовать как шаблон для вашей карточки. Здесь уже собрана правильная логика: крупная обложка, время, место, краткое описание, полная версия текста, отзывы и основное действие. Замените контент на свои мероприятия и подключите реальные данные с сервера.',
    lat: 55.7431,
    lon: 37.6057,
    featured: true,
    ticketsUrl: 'https://example.com/checkout/event-1'
  },
  {
    id: 'event-2',
    title: 'Маркет локальных брендов',
    venue: 'Двор Мануфактура',
    city: 'Москва',
    address: 'Улица Светлая, 8',
    date: '2026-04-26',
    time: '12:00',
    duration: 'Весь день',
    age: '0+',
    category: 'Маркет',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    summary: 'Музыка, еда и независимые бренды в большом внутреннем дворе.',
    description: 'Отличный пример события формата весь день. Его можно показывать в верхней подборке и в общем списке. По логике MAX mini app оно должно быстро открываться, добавляться в избранное и сохранять интерес пользователя через подписки на площадку или тему.',
    lat: 55.7518,
    lon: 37.6176,
    featured: true,
    ticketsUrl: 'https://example.com/checkout/event-2'
  },
  {
    id: 'event-3',
    title: 'Лекция о цифровом искусстве',
    venue: 'Центр Форм',
    city: 'Москва',
    address: 'Линия Парк, 4',
    date: '2026-04-27',
    time: '18:30',
    duration: '1 ч 20 мин',
    age: '12+',
    category: 'Лекция',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    summary: 'Разбор визуальных трендов и практики для современного digital-проекта.',
    description: 'На карточке можно выводить организатора, программу, условия регистрации и ссылку на маршрут. Для MVP мы держим структуру легкой и быстрой: ничего лишнего, только нужные действия и правильная иерархия блоков.',
    lat: 55.7601,
    lon: 37.6189,
    featured: false,
    ticketsUrl: 'https://example.com/checkout/event-3'
  },
  {
    id: 'event-4',
    title: 'Кинопоказ под открытым небом',
    venue: 'Летний Парк',
    city: 'Москва',
    address: 'Павильон 3, парк Северный',
    date: '2026-04-27',
    time: '21:00',
    duration: '2 ч',
    age: '18+',
    category: 'Кино',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    summary: 'Большой экран, пледы и вечерняя программа на улице.',
    description: 'Хороший кейс для вечернего сегмента. В списке такие события удобно группировать по времени, а в детальной карточке усиливать атмосферу крупной обложкой и четкой кнопкой действия.',
    lat: 55.7664,
    lon: 37.6382,
    featured: false,
    ticketsUrl: 'https://example.com/checkout/event-4'
  },
  {
    id: 'event-5',
    title: 'Тихий концерт при свечах',
    venue: 'Зал Нота',
    city: 'Москва',
    address: 'Набережная, 21',
    date: '2026-04-28',
    time: '20:00',
    duration: '1 ч 15 мин',
    age: '6+',
    category: 'Музыка',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    summary: 'Камерная программа в теплой визуальной сценографии.',
    description: 'Для музыкальных событий можно усиливать эмоцию за счет крупной фотографии, понятного тайминга и короткого текстового блока без перегруза.',
    lat: 55.7388,
    lon: 37.5864,
    featured: false,
    ticketsUrl: 'https://example.com/checkout/event-5'
  }
];

const VENUES = ['Все площадки', ...new Set(EVENTS.map((e) => e.venue))];
const DATE_LABELS = {
  all: 'Все даты',
  '2026-04-26': '26 апреля',
  '2026-04-27': '27 апреля',
  '2026-04-28': '28 апреля'
};

const state = {
  user: null,
  platform: 'web',
  version: '',
  startParam: '',
  favorites: [],
  subscriptions: [],
  reviews: {},
  activeTab: 'home',
  selectedVenue: 'Все площадки',
  selectedDate: 'all',
  notifications: [],
  history: []
};

const view = document.getElementById('view');
const overlayRoot = document.getElementById('overlayRoot');
const titleEl = document.getElementById('appTitle');
const headerBack = document.getElementById('headerBack');
const menuButton = document.getElementById('menuButton');
const navButtons = [...document.querySelectorAll('.nav-btn')];

const WebApp = window.WebApp || null;

async function boot() {
  view.innerHTML = document.getElementById('loadingTemplate').innerHTML;
  initMaxBridge();
  await hydrateState();
  applyStartParam();
  bindGlobalEvents();
  renderCurrentView();
}

function initMaxBridge() {
  if (!WebApp) return;
  try {
    state.user = WebApp.initDataUnsafe?.user || null;
    state.platform = WebApp.platform || 'web';
    state.version = WebApp.version || '';
    state.startParam = WebApp.initDataUnsafe?.start_param || '';
    WebApp.enableClosingConfirmation?.();
    WebApp.BackButton?.hide?.();
  } catch (err) {
    console.warn('MAX Bridge init error', err);
  }
}

function storageKey(name) {
  const userId = state.user?.id || 'guest';
  return `max-mini-app:${userId}:${name}`;
}

async function setPersistent(name, value) {
  const serialized = JSON.stringify(value);
  try {
    if (WebApp?.DeviceStorage?.setItem && state.platform !== 'web' && state.platform !== 'desktop') {
      await WebApp.DeviceStorage.setItem(storageKey(name), serialized);
      return;
    }
  } catch (err) {
    console.warn('DeviceStorage set failed', err);
  }
  localStorage.setItem(storageKey(name), serialized);
}

async function getPersistent(name, fallback) {
  try {
    if (WebApp?.DeviceStorage?.getItem && state.platform !== 'web' && state.platform !== 'desktop') {
      const result = await WebApp.DeviceStorage.getItem(storageKey(name));
      if (result?.value) return JSON.parse(result.value);
    }
  } catch (err) {
    console.warn('DeviceStorage get failed', err);
  }
  const raw = localStorage.getItem(storageKey(name));
  return raw ? JSON.parse(raw) : fallback;
}

async function hydrateState() {
  state.favorites = await getPersistent('favorites', []);
  state.subscriptions = await getPersistent('subscriptions', []);
  state.reviews = await getPersistent('reviews', {});
  state.notifications = await getPersistent('notifications', createInitialNotifications());
}

function applyStartParam() {
  const param = state.startParam;
  if (!param) return;
  if (param.startsWith('event_')) {
    const id = param.replace('event_', 'event-');
    const target = EVENTS.find((e) => e.id === id);
    if (target) openEvent(target.id, false);
  }
  if (param.startsWith('venue_')) {
    const decodedVenue = decodeURIComponent(param.replace('venue_', '').replaceAll('_', ' '));
    if (VENUES.includes(decodedVenue)) state.selectedVenue = decodedVenue;
  }
}

function bindGlobalEvents() {
  navButtons.forEach((btn) => btn.addEventListener('click', () => {
    navigateToTab(btn.dataset.tab);
  }));

  headerBack.addEventListener('click', goBack);
  menuButton.addEventListener('click', openMenuModal);

  if (WebApp?.BackButton?.onClick) {
    WebApp.BackButton.onClick(goBack);
  }
}

function vibrate(type = 'light') {
  try {
    WebApp?.HapticFeedback?.impactOccurred?.(type).catch(() => {});
  } catch (_) {}
}

function notifyStatus(type = 'success') {
  try {
    WebApp?.HapticFeedback?.notificationOccurred?.(type).catch(() => {});
  } catch (_) {}
}

function navigateToTab(tab) {
  state.activeTab = tab;
  state.history = [];
  renderCurrentView();
}

function pushHistory(entry) {
  state.history.push(entry);
  syncBackButton();
}

function goBack() {
  closeOverlay();
  const prev = state.history.pop();
  if (!prev) return;
  if (prev.type === 'tab') {
    state.activeTab = prev.tab;
  } else if (prev.type === 'event') {
    state.activeTab = 'event';
    state.currentEventId = prev.id;
  }
  renderCurrentView();
}

function syncBackButton() {
  const visible = state.history.length > 0 || overlayRoot.innerHTML.trim();
  headerBack.classList.toggle('hidden', !visible);
  if (!WebApp?.BackButton) return;
  if (visible) WebApp.BackButton.show?.();
  else WebApp.BackButton.hide?.();
}

function renderCurrentView() {
  navButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === state.activeTab));
  syncBackButton();

  switch (state.activeTab) {
    case 'favorites':
      titleEl.textContent = 'Избранное';
      renderFavorites();
      break;
    case 'notifications':
      titleEl.textContent = 'Уведомления';
      renderNotifications();
      break;
    case 'event':
      titleEl.textContent = 'Карточка события';
      renderEventDetail(state.currentEventId);
      break;
    default:
      titleEl.textContent = 'Афиша';
      renderHome();
      break;
  }
}

function renderHome() {
  const events = getFilteredEvents();
  const featured = events.filter((e) => e.featured);
  view.innerHTML = `
    <section class="screen">
      ${renderUserCard()}
      <div class="filters">
        <button class="filter-btn" id="dateFilterBtn">
          <span>Дата</span>
          <span>${DATE_LABELS[state.selectedDate] || state.selectedDate}</span>
        </button>
        <button class="filter-btn" id="venueFilterBtn">
          <span>Площадка</span>
          <span>${state.selectedVenue}</span>
        </button>
      </div>

      <div class="section-head">
        <div class="section-title">Подборка дня</div>
        <button class="link-btn" id="resetFiltersBtn">Сбросить</button>
      </div>

      <div class="horizontal-scroller">
        ${featured.map(renderHighlightCard).join('')}
      </div>

      <div class="section-head">
        <div class="section-title">События</div>
        <div class="muted small">${events.length} шт.</div>
      </div>

      ${renderEventsGrouped(events)}
    </section>
  `;

  document.getElementById('dateFilterBtn').addEventListener('click', openDateModal);
  document.getElementById('venueFilterBtn').addEventListener('click', openVenueModal);
  document.getElementById('resetFiltersBtn').addEventListener('click', () => {
    state.selectedDate = 'all';
    state.selectedVenue = 'Все площадки';
    renderHome();
  });
  bindEventCards();
}

function renderFavorites() {
  const events = getFilteredEvents().filter((e) => state.favorites.includes(e.id));
  view.innerHTML = `
    <section class="screen">
      ${renderUserCard()}
      <div class="filters">
        <button class="filter-btn" id="dateFilterBtn"><span>Дата</span><span>${DATE_LABELS[state.selectedDate] || state.selectedDate}</span></button>
        <button class="filter-btn" id="venueFilterBtn"><span>Площадка</span><span>${state.selectedVenue}</span></button>
      </div>
      <div class="panel">
        <div class="section-title">Ваш список избранного</div>
        <p class="muted small">Все сохраненные события записываются на аккаунт MAX пользователя ${state.user?.first_name || 'гостя'}.</p>
      </div>
      ${events.length ? renderEventsGrouped(events) : renderEmpty('♡', 'Пока ничего нет', 'Добавляйте события в избранное прямо из карточки события или из общего списка.')}
    </section>
  `;

  document.getElementById('dateFilterBtn').addEventListener('click', openDateModal);
  document.getElementById('venueFilterBtn').addEventListener('click', openVenueModal);
  bindEventCards();
}

function renderNotifications() {
  view.innerHTML = `
    <section class="screen">
      ${renderUserCard()}
      <div class="panel">
        <div class="section-title">Ваши уведомления</div>
        <p class="muted small">Сюда приходят новые анонсы по подпискам, напоминания по избранному и изменения по событиям.</p>
      </div>
      ${state.notifications.length ? `
        <div class="reviews-wrap">
          ${state.notifications.map((item, index) => `
            <button class="review-item option-btn notification-item" data-index="${index}" data-event="${item.eventId || ''}">
              <div class="review-head">
                <strong>${item.title}</strong>
                <span class="tiny muted">${item.time}</span>
              </div>
              <div class="small muted">${item.body}</div>
            </button>
          `).join('')}
        </div>
      ` : renderEmpty('🔔', 'Пока пусто', 'Когда вы подпишетесь на площадку или сохраните событие, уведомления появятся здесь.')}
    </section>
  `;

  document.querySelectorAll('.notification-item').forEach((node) => {
    node.addEventListener('click', () => {
      const eventId = node.dataset.event;
      if (eventId) openEvent(eventId);
    });
  });
}

function renderEventDetail(id) {
  const event = EVENTS.find((item) => item.id === id);
  if (!event) {
    view.innerHTML = renderEmpty('⚠', 'Событие не найдено', 'Возможно, оно было удалено или ссылка устарела.');
    return;
  }

  const reviews = getEventReviews(id);
  const descriptionPreview = event.description.slice(0, 165);
  const expanded = state.descriptionExpanded === id;
  const isFav = state.favorites.includes(id);
  const isSub = state.subscriptions.includes(event.venue);

  view.innerHTML = `
    <section class="screen">
      <article class="panel hero">
        <div class="hero-media" style="background-image:url('${event.image}')">
          <div class="hero-overlay">
            <div class="hero-badge">${formatDate(event.date)} • ${event.time}</div>
          </div>
        </div>
      </article>

      <div class="panel detail-meta">
        <div class="detail-time">${event.time}</div>
        <div class="detail-title">${event.title}</div>
        <div class="muted">${event.venue} • ${event.address}</div>
        <div class="tags">
          <span class="tag">${event.category}</span>
          <span class="tag">${event.age}</span>
          <span class="tag">${event.duration}</span>
        </div>
      </div>

      <div class="cta-row">
        <button class="action-pill ${isFav ? 'active' : ''}" id="favoriteToggleBtn">${isFav ? 'В избранном' : 'В избранное'}</button>
        <button class="action-pill ${isSub ? 'active' : ''}" id="subscribeToggleBtn">${isSub ? 'Подписаны' : 'Подписаться'}</button>
        <button class="action-pill" id="shareBtn">Поделиться</button>
      </div>

      <div class="panel detail-block">
        <h3>О событии</h3>
        <div class="detail-text">${expanded ? event.description : descriptionPreview + (event.description.length > 165 ? '…' : '')}</div>
        ${event.description.length > 165 ? `<button class="link-btn" id="toggleDescriptionBtn">${expanded ? 'Свернуть' : 'Читать полностью'}</button>` : ''}
      </div>

      <div class="panel detail-block">
        <h4>Детали</h4>
        <div class="inline-stats">
          <span class="stat-chip">${formatDate(event.date)}</span>
          <span class="stat-chip">${event.duration}</span>
          <span class="stat-chip">Возраст: ${event.age}</span>
        </div>
      </div>

      <div class="panel detail-block">
        <div class="section-head">
          <div class="section-title">Отзывы</div>
          <button class="link-btn" id="openReviewBtn">Оставить отзыв</button>
        </div>
        ${reviews.length ? `
          <div class="reviews-wrap">${reviews.map(renderReviewItem).join('')}</div>
        ` : `<div class="empty-state"><div class="empty-icon">★</div><div><strong>Отзывов пока нет</strong><div class="small muted">Станьте первым, кто оставит оценку этому событию.</div></div></div>`}
      </div>

      <div class="map-card">
        <div class="fake-map"><div class="fake-pin"></div></div>
        <div class="map-footer">
          <div>
            <div><strong>${event.venue}</strong></div>
            <div class="small muted">${event.address}</div>
          </div>
          <button class="action-pill" id="routeBtn">Маршрут</button>
        </div>
      </div>

      <div class="bottom-cta">
        <button class="primary-btn" id="buyBtn">Открыть целевое действие</button>
      </div>
    </section>
  `;

  document.getElementById('favoriteToggleBtn').addEventListener('click', () => toggleFavorite(id));
  document.getElementById('subscribeToggleBtn').addEventListener('click', () => toggleSubscription(event.venue, id));
  document.getElementById('shareBtn').addEventListener('click', () => shareEvent(event));
  document.getElementById('openReviewBtn').addEventListener('click', () => openReviewModal(id));
  document.getElementById('buyBtn').addEventListener('click', () => openTargetAction(event));
  document.getElementById('routeBtn').addEventListener('click', () => openRoute(event));

  if (document.getElementById('toggleDescriptionBtn')) {
    document.getElementById('toggleDescriptionBtn').addEventListener('click', () => {
      state.descriptionExpanded = expanded ? null : id;
      renderEventDetail(id);
    });
  }
}

function renderUserCard() {
  const user = state.user;
  const fallbackAvatar = 'https://ui-avatars.com/api/?background=0d1b2a&color=ffffff&name=' + encodeURIComponent(user?.first_name || 'MAX');
  return `
    <div class="panel user-card">
      <img class="avatar" src="${user?.photo_url || fallbackAvatar}" alt="avatar" />
      <div class="user-meta">
        <strong>${user ? [user.first_name, user.last_name].filter(Boolean).join(' ') : 'Гость MAX'}</strong>
        <div class="small muted">${user?.username ? '@' + user.username : 'Аккаунт привязан автоматически через MAX'}</div>
        <div class="tiny muted">Платформа: ${state.platform}${state.version ? ' • ' + state.version : ''}</div>
      </div>
    </div>
  `;
}

function getFilteredEvents() {
  return EVENTS.filter((event) => {
    const dateOk = state.selectedDate === 'all' || event.date === state.selectedDate;
    const venueOk = state.selectedVenue === 'Все площадки' || event.venue === state.selectedVenue;
    return dateOk && venueOk;
  }).sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
}

function renderEventsGrouped(events) {
  const groups = events.reduce((acc, event) => {
    acc[event.date] ||= [];
    acc[event.date].push(event);
    return acc;
  }, {});

  return Object.entries(groups).map(([date, list]) => `
    <div class="day-group">
      <div class="day-title"><span>${formatDate(date)}</span><span class="muted small">${list.length} событий</span></div>
      ${renderSegments(list)}
    </div>
  `).join('');
}

function renderSegments(events) {
  const segments = { 'весь день': [], 'до 18:00': [], 'после 18:00': [] };
  events.forEach((event) => {
    if (event.duration === 'Весь день') segments['весь день'].push(event);
    else if (event.time < '18:00') segments['до 18:00'].push(event);
    else segments['после 18:00'].push(event);
  });
  return Object.entries(segments).filter(([, items]) => items.length).map(([label, items]) => `
    <div>
      <div class="segment-label">${label}</div>
      <div class="reviews-wrap">${items.map(renderEventCard).join('')}</div>
    </div>
  `).join('');
}

function renderEventCard(event) {
  const isFav = state.favorites.includes(event.id);
  return `
    <article class="event-card" data-open-event="${event.id}">
      <img class="event-thumb" src="${event.image}" alt="${event.title}" />
      <div>
        <div class="event-time">${event.time}</div>
        <div class="event-title">${event.title}</div>
        <div class="event-meta">${event.venue} • ${event.address}</div>
      </div>
      <button class="heart-btn ${isFav ? 'active' : ''}" data-fav-id="${event.id}" aria-label="Избранное">${isFav ? '♥' : '♡'}</button>
    </article>
  `;
}

function renderHighlightCard(event) {
  return `
    <article class="highlight-card" data-open-event="${event.id}" style="background-image:url('${event.image}')">
      <div class="highlight-content">
        <div class="highlight-time">${event.time}</div>
        <div class="highlight-title">${event.title}</div>
        <div class="small muted">${event.venue}</div>
      </div>
    </article>
  `;
}

function renderEmpty(icon, title, text) {
  return `
    <div class="empty-state">
      <div class="empty-icon">${icon}</div>
      <div><strong>${title}</strong><div class="small muted">${text}</div></div>
    </div>
  `;
}

function bindEventCards() {
  document.querySelectorAll('[data-open-event]').forEach((node) => {
    node.addEventListener('click', (e) => {
      if (e.target.closest('[data-fav-id]')) return;
      openEvent(node.dataset.openEvent);
    });
  });

  document.querySelectorAll('[data-fav-id]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.favId);
    });
  });
}

function openEvent(id, push = true) {
  if (push) pushHistory({ type: 'tab', tab: state.activeTab });
  state.activeTab = 'event';
  state.currentEventId = id;
  renderCurrentView();
}

async function toggleFavorite(id) {
  vibrate();
  const has = state.favorites.includes(id);
  state.favorites = has ? state.favorites.filter((item) => item !== id) : [...state.favorites, id];
  await setPersistent('favorites', state.favorites);
  addNotification(has ? 'Удалено из избранного' : 'Событие сохранено', has ? 'Вы убрали событие из избранного.' : 'Событие добавлено в избранное и привязано к вашему MAX аккаунту.', id);
  notifyStatus('success');
  renderCurrentView();
}

async function toggleSubscription(venue, id) {
  vibrate();
  const has = state.subscriptions.includes(venue);
  state.subscriptions = has ? state.subscriptions.filter((item) => item !== venue) : [...state.subscriptions, venue];
  await setPersistent('subscriptions', state.subscriptions);
  addNotification(has ? 'Подписка отключена' : 'Подписка включена', has ? `Вы отписались от площадки ${venue}.` : `Теперь вы будете получать анонсы площадки ${venue}.`, id);
  notifyStatus('success');
  renderCurrentView();
}

function createInitialNotifications() {
  return [
    { title: 'Добро пожаловать', body: 'Это стартовый экран уведомлений. Сюда можно подключить реальные пуши и системные сообщения.', time: 'Сейчас', eventId: '' }
  ];
}

async function addNotification(title, body, eventId = '') {
  state.notifications = [{ title, body, time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }), eventId }, ...state.notifications].slice(0, 20);
  await setPersistent('notifications', state.notifications);
}

function getEventReviews(eventId) {
  return state.reviews[eventId] || [];
}

function renderReviewItem(review) {
  return `
    <div class="review-item">
      <div class="review-head">
        <strong>${review.author}</strong>
        <span class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
      </div>
      <div class="small muted">${review.date}</div>
      ${review.text ? `<div class="detail-text" style="margin-top:8px">${escapeHtml(review.text)}</div>` : ''}
    </div>
  `;
}

function openDateModal() {
  openModal(`
    <div class="modal-header">
      <div class="modal-title">Выберите дату</div>
      <button class="icon-btn" data-close-modal>✕</button>
    </div>
    <div class="panel" style="padding:12px; margin-bottom:12px;">
      <div class="small muted">Быстрый выбор</div>
      <div class="option-list" style="margin-top:8px;">
        ${Object.entries(DATE_LABELS).map(([key, label]) => `<button class="option-btn ${state.selectedDate === key ? 'active' : ''}" data-date="${key}">${label}</button>`).join('')}
      </div>
    </div>
    ${renderMiniCalendar()}
  `);

  overlayRoot.querySelectorAll('[data-date]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedDate = btn.dataset.date;
      closeOverlay();
      renderCurrentView();
      vibrate('soft');
    });
  });
}

function renderMiniCalendar() {
  const monthDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekdays = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  return `
    <div class="panel">
      <div class="section-head"><div class="section-title">Апрель 2026</div><div class="small muted">Демо календарь</div></div>
      <div class="calendar-grid" style="margin-top:10px;">
        ${weekdays.map((d) => `<div class="weekday">${d}</div>`).join('')}
        ${monthDays.map((day) => {
          const date = `2026-04-${String(day).padStart(2,'0')}`;
          const active = state.selectedDate === date;
          const hasEvents = EVENTS.some((e) => e.date === date);
          return `<button class="day-cell ${active ? 'active' : ''} ${!hasEvents ? 'muted' : ''}" data-date="${date}">${day}</button>`;
        }).join('')}
      </div>
    </div>
  `;
}

function openVenueModal() {
  openModal(`
    <div class="modal-header">
      <div class="modal-title">Выберите площадку</div>
      <button class="icon-btn" data-close-modal>✕</button>
    </div>
    <div class="option-list">
      ${VENUES.map((venue) => `<button class="option-btn ${state.selectedVenue === venue ? 'active' : ''}" data-venue="${venue}">${venue}</button>`).join('')}
    </div>
  `);
  overlayRoot.querySelectorAll('[data-venue]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedVenue = btn.dataset.venue;
      closeOverlay();
      renderCurrentView();
      vibrate('soft');
    });
  });
}

function openReviewModal(eventId) {
  const event = EVENTS.find((item) => item.id === eventId);
  let rating = 0;
  openModal(`
    <div class="modal-header">
      <div>
        <div class="modal-title">Отзыв</div>
        <div class="small muted">${event.title}</div>
      </div>
      <button class="icon-btn" data-close-modal>✕</button>
    </div>
    <div class="small muted">Оценка</div>
    <div class="review-stars">
      ${[1,2,3,4,5].map((n) => `<button class="star-btn" data-star="${n}">★</button>`).join('')}
    </div>
    <textarea id="reviewText" class="textarea" placeholder="Расскажите, что понравилось или что стоит улучшить"></textarea>
    <div style="height:12px"></div>
    <button class="primary-btn" id="submitReviewBtn" disabled>Отправить</button>
  `);

  const submit = overlayRoot.querySelector('#submitReviewBtn');
  overlayRoot.querySelectorAll('[data-star]').forEach((btn) => {
    btn.addEventListener('click', () => {
      rating = Number(btn.dataset.star);
      overlayRoot.querySelectorAll('[data-star]').forEach((node, idx) => node.classList.toggle('active', idx < rating));
      submit.disabled = rating === 0;
      vibrate('light');
    });
  });

  submit.addEventListener('click', async () => {
    const text = overlayRoot.querySelector('#reviewText').value.trim();
    const author = state.user ? [state.user.first_name, state.user.last_name].filter(Boolean).join(' ') : 'Гость MAX';
    const payload = { author, rating, text, date: new Date().toLocaleDateString('ru-RU') };
    state.reviews[eventId] ||= [];
    state.reviews[eventId].unshift(payload);
    await setPersistent('reviews', state.reviews);
    await addNotification('Новый отзыв', `Вы оставили отзыв на событие «${event.title}».`, eventId);
    notifyStatus('success');
    closeOverlay();
    renderEventDetail(eventId);
  });
}

function openMenuModal() {
  openModal(`
    <div class="modal-header">
      <div class="modal-title">Меню</div>
      <button class="icon-btn" data-close-modal>✕</button>
    </div>
    <div class="menu-list">
      <button class="option-btn" data-menu="share-app">Поделиться приложением</button>
      <button class="option-btn" data-menu="about">О проекте</button>
      <button class="option-btn" data-menu="clear">Очистить локальные данные</button>
    </div>
  `);

  overlayRoot.querySelectorAll('[data-menu]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const action = btn.dataset.menu;
      if (action === 'share-app') {
        shareApp();
      }
      if (action === 'about') {
        alert('Это стартовая версия мини-аппа для MAX: главная лента, карточка события, избранное, подписки, отзывы и интеграция с WebApp.');
      }
      if (action === 'clear') {
        localStorage.clear();
        if (WebApp?.DeviceStorage?.clear) {
          try { await WebApp.DeviceStorage.clear(); } catch (_) {}
        }
        location.reload();
      }
      closeOverlay();
    });
  });
}

function openModal(content) {
  overlayRoot.innerHTML = `<div class="overlay"><div class="modal">${content}</div></div>`;
  syncBackButton();
  overlayRoot.querySelectorAll('[data-close-modal]').forEach((btn) => btn.addEventListener('click', closeOverlay));
  overlayRoot.querySelector('.overlay')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('overlay')) closeOverlay();
  });
}

function closeOverlay() {
  overlayRoot.innerHTML = '';
  syncBackButton();
}

function shareApp() {
  const link = 'https://max.ru/YourBotName?startapp';
  if (WebApp?.shareMaxContent) {
    WebApp.shareMaxContent({ text: `Открой мини-приложение: ${link}` }).catch(() => {
      navigator.clipboard?.writeText(link);
    });
  } else {
    navigator.clipboard?.writeText(link);
  }
}

function shareEvent(event) {
  const link = `https://max.ru/YourBotName?startapp=${event.id.replace('event-', 'event_')}`;
  const text = `${event.title} • ${formatDate(event.date)} ${event.time}\n${event.venue}\n${link}`;
  if (WebApp?.shareMaxContent) {
    WebApp.shareMaxContent({ text }).catch(() => WebApp?.openMaxLink?.(link));
  } else if (navigator.share) {
    navigator.share({ title: event.title, text }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(text);
  }
}

function openTargetAction(event) {
  if (WebApp?.openLink) {
    WebApp.openLink(event.ticketsUrl);
  } else {
    window.open(event.ticketsUrl, '_blank', 'noopener,noreferrer');
  }
}

function openRoute(event) {
  const url = `https://yandex.ru/maps/?ll=${event.lon}%2C${event.lat}&z=16&pt=${event.lon},${event.lat},pm2rdm`;
  if (WebApp?.openLink) WebApp.openLink(url);
  else window.open(url, '_blank', 'noopener,noreferrer');
}

function formatDate(date) {
  const formatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', weekday: 'long' });
  return formatter.format(new Date(date + 'T12:00:00'));
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, (tag) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#39;' }[tag] || tag));
}

boot();
