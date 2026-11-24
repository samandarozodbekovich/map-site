/* Minimal i18n: uz (default), ru, en. Keys are used via data-i18n / data-i18n-ph and I18N.t(). */
window.I18N = (function () {
  var D = {
    uz: {
      edit: 'Tahrirlash', editIdDesc: 'Brauzerdagi muharrir', history: 'Tarix', export: 'Eksport',
      traces: 'GPS izlar', diaries: 'Kundaliklar', communities: 'Hamjamiyat', copyright: 'Mualliflik',
      help: 'Yordam', about: 'Loyiha haqida', login: 'Kirish', signup: 'Ro‘yxatdan o‘tish',
      search: 'Qidirish (41.31, 69.28)', whereIsThis: 'Bu qayer?',
      searchNothing: 'Hech narsa topilmadi. Hozircha koordinata (kenglik, uzunlik) qo‘llab-quvvatlanadi.',
      welcomeTitle: 'GetPlace xaritasiga xush kelibsiz!',
      welcomeText: 'GetPlace — O‘zbekiston uchun ochiq xarita. Uni siz kabi odamlar tuzadi va tahrirlaydi.',
      learnMore: 'Batafsil', startMapping: 'Xaritani tahrirlash',
      layers: 'Qatlamlar', baseMap: 'Asosiy xarita', standard: 'Standart', light: 'Och', dark: 'Qorong‘i',
      overlays: 'Qo‘shimcha', ovBuildings: 'Binolar', ovPoi: 'Qiziqarli joylar', ovBoundaries: 'Chegaralar', ovLabels: 'Yozuvlar',
      legend: 'Shartli belgilar', lgWater: 'Suv', lgLanduse: 'Yer foydalanish', lgVeg: 'O‘simlik', lgParking: 'Avtoturargoh',
      lgRoad: 'Yo‘l', lgRail: 'Temir yo‘l', lgBuilding: 'Bino', lgPoi: 'Qiziqarli joy',
      share: 'Ulashish', shLink: 'Havola', shGeo: 'Geo URI', shEmbed: 'HTML (iframe)', shMarker: 'Markerni qo‘shish', copy: 'Nusxalash', copied: 'Nusxalandi',
      exportTitle: 'Eksport', exportText: 'Joriy ko‘rinish uchun OSM XML ma’lumoti:', exportBtn: 'Yuklab olish (OSM XML)',
      exportHint: 'Katta hudud API tomonidan rad etilishi mumkin — xaritani yaqinlashtiring.',
      soon: 'Tez orada', soonText: 'Bu bo‘lim hali tayyor emas. U keyingi bosqichda qo‘shiladi.',
      noteTitle: 'Izohlar', noteText: 'Xaritadagi xato haqida izoh qoldirish tez orada qo‘shiladi. Hozircha xatoni o‘zingiz tuzatishingiz mumkin.',
      helpTitle: 'Yordam', helpText: 'Xaritani siljitish uchun sudrang, masshtab uchun g‘ildirakdan foydalaning. Obyekt haqida ma’lumot olish uchun uni bosing. Xatoni tuzatish uchun «Tahrirlash» ni bosing.',
      aboutTitle: 'Loyiha haqida', aboutText: 'GetPlace — O‘zbekiston geoma’lumotlari asosidagi o‘z-o‘zi joylashtirilgan OpenStreetMap uslubidagi platforma.',
      copyrightTitle: 'Mualliflik', copyrightText: 'Ma’lumotlar © OpenStreetMap contributors, Open Database License (ODbL) ostida. Hosila ma’lumotlar © NextGIS Data (ODbL).',
      whereTitle: 'Bu qayer?', coords: 'Koordinata', zoom: 'Masshtab', nearest: 'Eng yaqin obyekt', none: 'Obyekt topilmadi',
      object: 'Obyekt', layer: 'Qatlam', name: 'Nomi', directionsTitle: 'Yo‘nalish',
      directionsText: 'Yo‘nalish qurish hali tayyor emas.', editThis: 'Shu joyni tahrirlash', geoDenied: 'Joylashuvga ruxsat berilmadi',
      sidebarMeters: 'm', welcomeHide: 'Yopish'
    },
    ru: {
      edit: 'Правка', editIdDesc: 'Редактор в браузере', history: 'История', export: 'Экспорт',
      traces: 'GPS-треки', diaries: 'Дневники', communities: 'Сообщества', copyright: 'Авторские права',
      help: 'Справка', about: 'О проекте', login: 'Войти', signup: 'Регистрация',
      search: 'Поиск (41.31, 69.28)', whereIsThis: 'Что здесь?',
      searchNothing: 'Ничего не найдено. Пока поддерживаются координаты (широта, долгота).',
      welcomeTitle: 'Добро пожаловать в GetPlace!',
      welcomeText: 'GetPlace — открытая карта Узбекистана. Её создают и редактируют такие же люди, как вы.',
      learnMore: 'Подробнее', startMapping: 'Начать редактирование',
      layers: 'Слои', baseMap: 'Основная карта', standard: 'Стандартная', light: 'Светлая', dark: 'Тёмная',
      overlays: 'Дополнительно', ovBuildings: 'Здания', ovPoi: 'Места', ovBoundaries: 'Границы', ovLabels: 'Подписи',
      legend: 'Легенда', lgWater: 'Вода', lgLanduse: 'Землепользование', lgVeg: 'Растительность', lgParking: 'Парковка',
      lgRoad: 'Дорога', lgRail: 'Железная дорога', lgBuilding: 'Здание', lgPoi: 'Место',
      share: 'Поделиться', shLink: 'Ссылка', shGeo: 'Geo URI', shEmbed: 'HTML (iframe)', shMarker: 'Добавить маркер', copy: 'Копировать', copied: 'Скопировано',
      exportTitle: 'Экспорт', exportText: 'Данные OSM XML для текущей области:', exportBtn: 'Скачать (OSM XML)',
      exportHint: 'Слишком большая область может быть отклонена API — приблизьте карту.',
      soon: 'Скоро', soonText: 'Этот раздел пока не готов. Он появится на следующем этапе.',
      noteTitle: 'Заметки', noteText: 'Заметки об ошибках на карте появятся позже. Пока можно исправить ошибку самостоятельно.',
      helpTitle: 'Справка', helpText: 'Перетаскивайте карту, колесо мыши меняет масштаб. Нажмите на объект, чтобы увидеть данные. Чтобы исправить ошибку, нажмите «Правка».',
      aboutTitle: 'О проекте', aboutText: 'GetPlace — самостоятельно размещённая платформа в стиле OpenStreetMap на геоданных Узбекистана.',
      copyrightTitle: 'Авторские права', copyrightText: 'Данные © участники OpenStreetMap по лицензии ODbL. Производные данные © NextGIS Data (ODbL).',
      whereTitle: 'Что здесь?', coords: 'Координаты', zoom: 'Масштаб', nearest: 'Ближайший объект', none: 'Объект не найден',
      object: 'Объект', layer: 'Слой', name: 'Название', directionsTitle: 'Маршрут',
      directionsText: 'Построение маршрутов пока не готово.', editThis: 'Править это место', geoDenied: 'Нет доступа к геолокации',
      sidebarMeters: 'м', welcomeHide: 'Закрыть'
    },
    en: {
      edit: 'Edit', editIdDesc: 'In-browser editor', history: 'History', export: 'Export',
      traces: 'GPS Traces', diaries: 'User Diaries', communities: 'Communities', copyright: 'Copyright',
      help: 'Help', about: 'About', login: 'Log In', signup: 'Sign Up',
      search: 'Search (41.31, 69.28)', whereIsThis: 'Where is this?',
      searchNothing: 'Nothing found. Only coordinates (lat, lon) are supported for now.',
      welcomeTitle: 'Welcome to GetPlace!',
      welcomeText: 'GetPlace is an open map of Uzbekistan, created and edited by people like you.',
      learnMore: 'Learn More', startMapping: 'Start Mapping',
      layers: 'Layers', baseMap: 'Base map', standard: 'Standard', light: 'Light', dark: 'Dark',
      overlays: 'Overlays', ovBuildings: 'Buildings', ovPoi: 'Places of interest', ovBoundaries: 'Boundaries', ovLabels: 'Labels',
      legend: 'Legend', lgWater: 'Water', lgLanduse: 'Land use', lgVeg: 'Vegetation', lgParking: 'Parking',
      lgRoad: 'Road', lgRail: 'Railway', lgBuilding: 'Building', lgPoi: 'Point of interest',
      share: 'Share', shLink: 'Link', shGeo: 'Geo URI', shEmbed: 'HTML (iframe)', shMarker: 'Include marker', copy: 'Copy', copied: 'Copied',
      exportTitle: 'Export', exportText: 'OSM XML data for the current view:', exportBtn: 'Download (OSM XML)',
      exportHint: 'A large area may be rejected by the API — zoom in.',
      soon: 'Coming soon', soonText: 'This section is not ready yet. It will arrive in a later stage.',
      noteTitle: 'Notes', noteText: 'Leaving notes about map errors is coming soon. For now you can fix the error yourself.',
      helpTitle: 'Help', helpText: 'Drag to pan, use the wheel to zoom. Click an object to inspect it. Press Edit to fix a mistake.',
      aboutTitle: 'About', aboutText: 'GetPlace is a self-hosted, OpenStreetMap-style platform built on Uzbekistan geodata.',
      copyrightTitle: 'Copyright', copyrightText: 'Data © OpenStreetMap contributors under the ODbL. Derivative data © NextGIS Data (ODbL).',
      whereTitle: 'Where is this?', coords: 'Coordinates', zoom: 'Zoom', nearest: 'Nearest feature', none: 'No feature found',
      object: 'Feature', layer: 'Layer', name: 'Name', directionsTitle: 'Directions',
      directionsText: 'Routing is not ready yet.', editThis: 'Edit this place', geoDenied: 'Location access denied',
      sidebarMeters: 'm', welcomeHide: 'Close'
    }
  };
  var lang = 'uz';
  try { lang = localStorage.getItem('lang') || (navigator.language || 'uz').slice(0, 2); } catch (e) {}
  if (!D[lang]) lang = 'uz';

  function t(k) { return (D[lang] && D[lang][k]) || D.en[k] || k; }
  function apply(root) {
    (root || document).querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    (root || document).querySelectorAll('[data-i18n-ph]').forEach(function (el) { el.placeholder = t(el.dataset.i18nPh); });
    document.documentElement.lang = lang;
  }
  function set(l) {
    if (!D[l]) return;
    lang = l;
    try { localStorage.setItem('lang', l); } catch (e) {}
    apply();
  }
  // Extra string tables (e.g. auth-strings.js) add keys without touching this file
  function extend(l, obj) { if (D[l]) Object.keys(obj).forEach(function (k) { D[l][k] = obj[k]; }); }
  // t() with {placeholders}: I18N.f('codeSentTo', { phone: '+998...' })
  function f(k, vars) { return t(k).replace(/\{(\w+)\}/g, function (m, n) { return vars && vars[n] != null ? vars[n] : m; }); }
  return { t: t, f: f, apply: apply, set: set, extend: extend, get: function () { return lang; } };
})();
