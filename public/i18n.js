/* Minimal i18n: uz (default), ru, en. Keys are used via data-i18n / data-i18n-ph and I18N.t(). */
window.I18N = (function () {
  var D = {
    uz: {
      edit: 'Tahrirlash', editIdDesc: 'Brauzerdagi muharrir', history: 'Tarix', export: 'Eksport',
      traces: 'GPS izlar', diaries: 'Kundaliklar', communities: 'Hamjamiyat', copyright: 'Mualliflik',
      help: 'Yordam', about: 'Loyiha haqida', login: 'Kirish', signup: 'Ro‘yxatdan o‘tish',
      search: 'Joy, ko‘cha, manzil yoki koordinata', whereIsThis: 'Bu qayer?',
      searchNothing: 'Hech narsa topilmadi. Kamida 3 harf kiriting yoki koordinata (41.31, 69.28) yozing.',
      k_place: 'Aholi punkti', k_boundary: 'Hudud', k_hood: 'Mahalla', k_poi: 'Joy', k_building: 'Bino', k_address: 'Manzil', k_street: 'Ko‘cha', k_quarter: 'Kvartal (mavze)', k_station: 'Bekat', k_stop: 'Bekat', k_route: 'Marshrut',
      ovNotes: 'Izohlar',
      n_intro: 'Xaritada xato yoki yetishmayotgan narsa bormi? Izoh qoldiring: boshqa foydalanuvchilar ko‘radi va tuzatadi.', n_layer: 'Xaritada izohlarni ko‘rsatish', n_add: 'Izoh qo‘shish', n_place: 'Xaritada joyni bosing…',
      n_draftHint: 'Belgini kerakli joyga suring va nima noto‘g‘riligini yozing.', n_textPh: 'Nima noto‘g‘ri? Masalan: bu yerda do‘kon yopilgan.', n_send: 'Yuborish', n_cancel: 'Bekor qilish',
      n_commentPh: 'Izoh yozing…', n_comment: 'Izoh qoldirish', n_resolve: 'Hal qilindi (yopish)', n_reopen: 'Qayta ochish', n_open: 'Ochiq', n_closed: 'Yopilgan', n_loading: 'Yuklanmoqda…',
      n_a_opened: 'ochdi', n_a_commented: 'izoh qoldirdi', n_a_closed: 'yopdi', n_a_reopened: 'qayta ochdi', n_fix: 'Xatoni o‘zingiz ham tuzatishingiz mumkin: yuqoridagi “Tahrirlash” tugmasi.',
      n_login: 'Izoh qoldirish uchun tizimga kiring.', n_short: 'Matn kamida 3 belgidan iborat bo‘lsin.', n_long: 'Matn 2000 belgidan oshmasin.', n_far: 'Izohni faqat O‘zbekiston hududida qoldirish mumkin.',
      n_rate: 'Juda ko‘p urinish. Keyinroq qayta urinib ko‘ring.', n_closedErr: 'Bu izoh allaqachon yopilgan.', n_openErr: 'Bu izoh yopilmagan.', n_gone: 'Izoh topilmadi.', n_error: 'Xatolik yuz berdi. Qayta urinib ko‘ring.',
      d_type: 'Turi', d_address: 'Manzil', d_levels: 'Qavatlar soni', d_area: 'Maydon', d_region: 'Viloyat', d_district: 'Tuman', d_area8: 'Hudud', d_osm: 'OpenStreetMap’da ko‘rish', d_loading: 'Ma’lumot yuklanmoqda…', d_en: 'Inglizcha nomi',
      a_ref: 'Raqami', a_oneway: 'Bir tomonlama', a_maxspeed: 'Maks. tezlik', a_lanes: 'Yo‘laklar', a_width: 'Kengligi', a_surface: 'Qoplama', a_bridge: 'Ko‘prik', a_tunnel: 'Tunnel', a_yes: 'ha',
      h_empty: 'Hali tahrirlar yo‘q.', h_nocomment: 'Izohsiz tahrir', h_by: 'muallif', h_created: 'yangi', h_modified: 'o‘zgargan', h_deleted: 'o‘chirilgan', h_show: 'Xaritada ko‘rsatish', h_more: 'Yana yuklash', h_loading: 'Yuklanmoqda…', h_error: 'Tarixni yuklab bo‘lmadi.', h_intro: 'Oxirgi tahrirlar (changeset)lar:',
      d_from: 'Qayerdan', d_to: 'Qayerga', d_fromPh: 'Boshlanish joyi', d_toPh: 'Manzil', d_pick: 'Xaritadan tanlash', d_me: 'Mening joylashuvim', d_swap: 'Almashtirish', d_clear: 'Tozalash',
      d_pickHint: 'Xaritada nuqtani bosing…', d_calc: 'Yo‘l hisoblanmoqda…', d_noRoute: 'Bu ikki nuqta orasida avtomobil yo‘li topilmadi.', d_routeErr: 'Marshrutlash xizmati javob bermadi.',
      d_car: 'Avtomobil', d_min: 'daq', d_hour: 'soat', d_km: 'km', d_m: 'm', d_here: 'Shu yerga yo‘l', d_dirHint: 'Ikkala nuqtani kiriting yoki xaritadan tanlang.',
      c_phone: 'Telefon', c_hours: 'Ish vaqti', c_web: 'Veb-sayt', c_email: 'Email', c_cuisine: 'Oshxona', c_wheelchair: 'Aravacha uchun', c_operator: 'Tashkilot', c_brand: 'Brend', c_desc: 'Tavsif', c_internet: 'Internet', c_open: 'Hozir ochiq', c_closed: 'Hozir yopiq', c_social: 'Ijtimoiy tarmoq',
      r_depart: 'Yo‘lga chiqing', r_arrive: 'Manzilga yetib keldingiz', r_left: 'Chapga buriling', r_right: 'O‘ngga buriling', r_slight_left: 'Biroz chapga oling', r_slight_right: 'Biroz o‘ngga oling',
      r_sharp_left: 'Keskin chapga buriling', r_sharp_right: 'Keskin o‘ngga buriling', r_straight: 'To‘g‘ri yuring', r_uturn: 'Teskari buriling', r_continue: 'Davom eting', r_roundabout: 'Aylanadan {n}-chiqishga chiqing', r_roundabout0: 'Aylanadan chiqing',
      welcomeTitle: 'GetPlace xaritasiga xush kelibsiz!',
      welcomeText: 'GetPlace — O‘zbekiston uchun ochiq xarita. Uni siz kabi odamlar tuzadi va tahrirlaydi.',
      learnMore: 'Batafsil', startMapping: 'Xaritani tahrirlash',
      layers: 'Qatlamlar', baseMap: 'Asosiy xarita', standard: 'Standart', light: 'Och', dark: 'Qorong‘i',
      overlays: 'Qo‘shimcha', ovBuildings: 'Binolar', ovPoi: 'Qiziqarli joylar', ovBoundaries: 'Chegaralar', ovTransit: 'Jamoat transporti', ovLabels: 'Yozuvlar',
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
      k_place: 'Населённый пункт', k_boundary: 'Территория', k_hood: 'Махалля', k_poi: 'Место', k_building: 'Здание', k_address: 'Адрес', k_street: 'Улица', k_quarter: 'Квартал (мавзе)', k_station: 'Станция', k_stop: 'Остановка', k_route: 'Маршрут',
      ovNotes: 'Заметки',
      n_intro: 'Нашли ошибку или чего-то не хватает на карте? Оставьте заметку: другие пользователи увидят и исправят.', n_layer: 'Показывать заметки на карте', n_add: 'Добавить заметку', n_place: 'Нажмите место на карте…',
      n_draftHint: 'Перетащите метку в нужное место и опишите проблему.', n_textPh: 'Что не так? Например: здесь закрылся магазин.', n_send: 'Отправить', n_cancel: 'Отмена',
      n_commentPh: 'Напишите комментарий…', n_comment: 'Комментировать', n_resolve: 'Решено (закрыть)', n_reopen: 'Открыть снова', n_open: 'Открыта', n_closed: 'Закрыта', n_loading: 'Загрузка…',
      n_a_opened: 'открыл(а)', n_a_commented: 'прокомментировал(а)', n_a_closed: 'закрыл(а)', n_a_reopened: 'открыл(а) снова', n_fix: 'Ошибку можно исправить и самому: кнопка «Править» вверху.',
      n_login: 'Войдите, чтобы оставить заметку.', n_short: 'Текст должен быть не короче 3 символов.', n_long: 'Текст не длиннее 2000 символов.', n_far: 'Заметки можно ставить только на территории Узбекистана.',
      n_rate: 'Слишком много попыток. Попробуйте позже.', n_closedErr: 'Эта заметка уже закрыта.', n_openErr: 'Эта заметка не закрыта.', n_gone: 'Заметка не найдена.', n_error: 'Произошла ошибка. Попробуйте ещё раз.',
      d_type: 'Тип', d_address: 'Адрес', d_levels: 'Этажей', d_area: 'Площадь', d_region: 'Область', d_district: 'Район', d_area8: 'Территория', d_osm: 'Открыть в OpenStreetMap', d_loading: 'Загрузка данных…', d_en: 'Название на английском',
      a_ref: 'Номер', a_oneway: 'Односторонняя', a_maxspeed: 'Макс. скорость', a_lanes: 'Полосы', a_width: 'Ширина', a_surface: 'Покрытие', a_bridge: 'Мост', a_tunnel: 'Тоннель', a_yes: 'да',
      h_empty: 'Правок пока нет.', h_nocomment: 'Правка без комментария', h_by: 'автор', h_created: 'новых', h_modified: 'изменено', h_deleted: 'удалено', h_show: 'Показать на карте', h_more: 'Загрузить ещё', h_loading: 'Загрузка…', h_error: 'Не удалось загрузить историю.', h_intro: 'Последние правки (changeset):',
      d_from: 'Откуда', d_to: 'Куда', d_fromPh: 'Начальная точка', d_toPh: 'Пункт назначения', d_pick: 'Выбрать на карте', d_me: 'Моё местоположение', d_swap: 'Поменять местами', d_clear: 'Очистить',
      d_pickHint: 'Нажмите точку на карте…', d_calc: 'Строим маршрут…', d_noRoute: 'Между этими точками не найден автомобильный маршрут.', d_routeErr: 'Сервис маршрутов не отвечает.',
      d_car: 'Автомобиль', d_min: 'мин', d_hour: 'ч', d_km: 'км', d_m: 'м', d_here: 'Маршрут сюда', d_dirHint: 'Введите обе точки или выберите их на карте.',
      c_phone: 'Телефон', c_hours: 'Время работы', c_web: 'Сайт', c_email: 'Email', c_cuisine: 'Кухня', c_wheelchair: 'Для колясок', c_operator: 'Организация', c_brand: 'Бренд', c_desc: 'Описание', c_internet: 'Интернет', c_open: 'Сейчас открыто', c_closed: 'Сейчас закрыто', c_social: 'Соцсети',
      r_depart: 'Начните движение', r_arrive: 'Вы прибыли', r_left: 'Поверните налево', r_right: 'Поверните направо', r_slight_left: 'Возьмите левее', r_slight_right: 'Возьмите правее',
      r_sharp_left: 'Резко налево', r_sharp_right: 'Резко направо', r_straight: 'Двигайтесь прямо', r_uturn: 'Развернитесь', r_continue: 'Продолжайте движение', r_roundabout: 'На кольце съезд {n}', r_roundabout0: 'Съезжайте с кольца',
      welcomeTitle: 'Добро пожаловать в GetPlace!',
      welcomeText: 'GetPlace — открытая карта Узбекистана. Её создают и редактируют такие же люди, как вы.',
      learnMore: 'Подробнее', startMapping: 'Начать редактирование',
      layers: 'Слои', baseMap: 'Основная карта', standard: 'Стандартная', light: 'Светлая', dark: 'Тёмная',
      overlays: 'Дополнительно', ovBuildings: 'Здания', ovPoi: 'Места', ovBoundaries: 'Границы', ovTransit: 'Общественный транспорт', ovLabels: 'Подписи',
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
      k_place: 'Settlement', k_boundary: 'Area', k_hood: 'Neighbourhood', k_poi: 'Place', k_building: 'Building', k_address: 'Address', k_street: 'Street', k_quarter: 'Quarter', k_station: 'Station', k_stop: 'Stop', k_route: 'Route',
      ovNotes: 'Notes',
      n_intro: 'Found a mistake or something missing on the map? Leave a note: other users will see it and fix it.', n_layer: 'Show notes on the map', n_add: 'Add a note', n_place: 'Click a place on the map…',
      n_draftHint: 'Drag the pin to the right place and describe the problem.', n_textPh: 'What is wrong? For example: this shop has closed.', n_send: 'Submit', n_cancel: 'Cancel',
      n_commentPh: 'Write a comment…', n_comment: 'Comment', n_resolve: 'Resolved (close)', n_reopen: 'Reopen', n_open: 'Open', n_closed: 'Closed', n_loading: 'Loading…',
      n_a_opened: 'opened', n_a_commented: 'commented', n_a_closed: 'closed', n_a_reopened: 'reopened', n_fix: 'You can also fix the mistake yourself: the Edit button above.',
      n_login: 'Log in to leave a note.', n_short: 'The text must be at least 3 characters.', n_long: 'The text must not exceed 2000 characters.', n_far: 'Notes can only be placed in Uzbekistan.',
      n_rate: 'Too many attempts. Try again later.', n_closedErr: 'This note is already closed.', n_openErr: 'This note is not closed.', n_gone: 'Note not found.', n_error: 'Something went wrong. Please try again.',
      d_type: 'Type', d_address: 'Address', d_levels: 'Levels', d_area: 'Area', d_region: 'Region', d_district: 'District', d_area8: 'Area', d_osm: 'View on OpenStreetMap', d_loading: 'Loading details…', d_en: 'English name',
      a_ref: 'Ref', a_oneway: 'One-way', a_maxspeed: 'Max speed', a_lanes: 'Lanes', a_width: 'Width', a_surface: 'Surface', a_bridge: 'Bridge', a_tunnel: 'Tunnel', a_yes: 'yes',
      h_empty: 'No edits yet.', h_nocomment: 'Edit without a comment', h_by: 'by', h_created: 'created', h_modified: 'modified', h_deleted: 'deleted', h_show: 'Show on map', h_more: 'Load more', h_loading: 'Loading…', h_error: 'Could not load the history.', h_intro: 'Latest edits (changesets):',
      d_from: 'From', d_to: 'To', d_fromPh: 'Starting point', d_toPh: 'Destination', d_pick: 'Pick on map', d_me: 'My location', d_swap: 'Swap', d_clear: 'Clear',
      d_pickHint: 'Click a point on the map…', d_calc: 'Calculating route…', d_noRoute: 'No driving route found between these points.', d_routeErr: 'The routing service did not answer.',
      d_car: 'Car', d_min: 'min', d_hour: 'h', d_km: 'km', d_m: 'm', d_here: 'Directions to here', d_dirHint: 'Enter both points or pick them on the map.',
      c_phone: 'Phone', c_hours: 'Opening hours', c_web: 'Website', c_email: 'Email', c_cuisine: 'Cuisine', c_wheelchair: 'Wheelchair', c_operator: 'Operator', c_brand: 'Brand', c_desc: 'Description', c_internet: 'Internet', c_open: 'Open now', c_closed: 'Closed now', c_social: 'Social',
      r_depart: 'Head out', r_arrive: 'You have arrived', r_left: 'Turn left', r_right: 'Turn right', r_slight_left: 'Bear left', r_slight_right: 'Bear right',
      r_sharp_left: 'Sharp left', r_sharp_right: 'Sharp right', r_straight: 'Go straight', r_uturn: 'Make a U-turn', r_continue: 'Continue', r_roundabout: 'At the roundabout take exit {n}', r_roundabout0: 'Leave the roundabout',
      welcomeTitle: 'Welcome to GetPlace!',
      welcomeText: 'GetPlace is an open map of Uzbekistan, created and edited by people like you.',
      learnMore: 'Learn More', startMapping: 'Start Mapping',
      layers: 'Layers', baseMap: 'Base map', standard: 'Standard', light: 'Light', dark: 'Dark',
      overlays: 'Overlays', ovBuildings: 'Buildings', ovPoi: 'Places of interest', ovBoundaries: 'Boundaries', ovTransit: 'Public transport', ovLabels: 'Labels',
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
