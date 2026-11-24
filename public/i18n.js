/* Minimal i18n: uz (default), ru, en. Keys are used via data-i18n / data-i18n-ph and I18N.t(). */
window.I18N = (function () {
  var D = {
    uz: {
      edit: 'Tahrirlash', editIdDesc: 'Brauzerdagi muharrir', history: 'Tarix', export: 'Eksport',
      traces: 'GPS izlar', diaries: 'Kundaliklar', communities: 'Hamjamiyat', copyright: 'Mualliflik',
      help: 'Yordam', about: 'Loyiha haqida', login: 'Kirish', signup: 'Ro‘yxatdan o‘tish',
      search: 'Joy, ko‘cha, manzil yoki koordinata', whereIsThis: 'Bu qayer?',
      searchNothing: 'Hech narsa topilmadi. Kamida 3 harf kiriting yoki koordinata (41.31, 69.28) yozing.',
      k_place: 'Aholi punkti', k_boundary: 'Hudud', k_hood: 'Mahalla', k_poi: 'Joy', k_building: 'Bino', k_address: 'Manzil', k_street: 'Ko‘cha',
      d_type: 'Turi', d_address: 'Manzil', d_levels: 'Qavatlar soni', d_area: 'Maydon', d_region: 'Viloyat', d_district: 'Tuman', d_area8: 'Hudud', d_osm: 'OpenStreetMap’da ko‘rish', d_loading: 'Ma’lumot yuklanmoqda…', d_en: 'Inglizcha nomi',
      a_ref: 'Raqami', a_oneway: 'Bir tomonlama', a_maxspeed: 'Maks. tezlik', a_lanes: 'Yo‘laklar', a_width: 'Kengligi', a_surface: 'Qoplama', a_bridge: 'Ko‘prik', a_tunnel: 'Tunnel', a_yes: 'ha',
      h_empty: 'Hali tahrirlar yo‘q.', h_nocomment: 'Izohsiz tahrir', h_by: 'muallif', h_created: 'yangi', h_modified: 'o‘zgargan', h_deleted: 'o‘chirilgan', h_show: 'Xaritada ko‘rsatish', h_more: 'Yana yuklash', h_loading: 'Yuklanmoqda…', h_error: 'Tarixni yuklab bo‘lmadi.', h_intro: 'Oxirgi tahrirlar (changeset)lar:',
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
      search: 'Место, улица, адрес или координаты', whereIsThis: 'Что здесь?',
      searchNothing: 'Ничего не найдено. Введите минимум 3 буквы или координаты (41.31, 69.28).',
      k_place: 'Населённый пункт', k_boundary: 'Территория', k_hood: 'Махалля', k_poi: 'Место', k_building: 'Здание', k_address: 'Адрес', k_street: 'Улица',
      d_type: 'Тип', d_address: 'Адрес', d_levels: 'Этажей', d_area: 'Площадь', d_region: 'Область', d_district: 'Район', d_area8: 'Территория', d_osm: 'Открыть в OpenStreetMap', d_loading: 'Загрузка данных…', d_en: 'Название на английском',
      a_ref: 'Номер', a_oneway: 'Односторонняя', a_maxspeed: 'Макс. скорость', a_lanes: 'Полосы', a_width: 'Ширина', a_surface: 'Покрытие', a_bridge: 'Мост', a_tunnel: 'Тоннель', a_yes: 'да',
      h_empty: 'Правок пока нет.', h_nocomment: 'Правка без комментария', h_by: 'автор', h_created: 'новых', h_modified: 'изменено', h_deleted: 'удалено', h_show: 'Показать на карте', h_more: 'Загрузить ещё', h_loading: 'Загрузка…', h_error: 'Не удалось загрузить историю.', h_intro: 'Последние правки (changeset):',
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
      search: 'Place, street, address or coordinates', whereIsThis: 'Where is this?',
      searchNothing: 'Nothing found. Type at least 3 letters or coordinates (41.31, 69.28).',
      k_place: 'Settlement', k_boundary: 'Area', k_hood: 'Neighbourhood', k_poi: 'Place', k_building: 'Building', k_address: 'Address', k_street: 'Street',
      d_type: 'Type', d_address: 'Address', d_levels: 'Levels', d_area: 'Area', d_region: 'Region', d_district: 'District', d_area8: 'Area', d_osm: 'View on OpenStreetMap', d_loading: 'Loading details…', d_en: 'English name',
      a_ref: 'Ref', a_oneway: 'One-way', a_maxspeed: 'Max speed', a_lanes: 'Lanes', a_width: 'Width', a_surface: 'Surface', a_bridge: 'Bridge', a_tunnel: 'Tunnel', a_yes: 'yes',
      h_empty: 'No edits yet.', h_nocomment: 'Edit without a comment', h_by: 'by', h_created: 'created', h_modified: 'modified', h_deleted: 'deleted', h_show: 'Show on map', h_more: 'Load more', h_loading: 'Loading…', h_error: 'Could not load the history.', h_intro: 'Latest edits (changesets):',
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
