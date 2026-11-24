(function () {
  'use strict';

  var t = I18N.t;
  var DEFAULT_VIEW = { zoom: 12, lat: 41.3111, lon: 69.2797 }; // Tashkent
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ESC[c]; }); }

  // ── Icons (Lucide-style strokes) ────────────────────────────────────────
  var ICONS = {
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.6"/>',
    pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    chevron: '<path d="M6 9l6 6 6-6"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    directions: '<path d="M15 14l5-5-5-5"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    locate: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
    layers: '<path d="M12 2l10 5-10 5L2 7z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',
    note: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>'
  };
  function renderIcons(root) {
    (root || document).querySelectorAll('i[data-icon]').forEach(function (el) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('class', 'i' + (el.className ? ' ' + el.className : ''));
      svg.setAttribute('aria-hidden', 'true');
      svg.innerHTML = ICONS[el.dataset.icon] || '';
      el.replaceWith(svg);
    });
  }

  // ── URL: #map=zoom/lat/lon (same format as OSM and iD), ?mlat&mlon ──────
  function readHash() {
    var m = /map=(\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)/.exec(location.hash);
    return m ? { zoom: +m[1], lat: +m[2], lon: +m[3] } : DEFAULT_VIEW;
  }
  var qs = new URLSearchParams(location.search);
  var start = readHash();

  // ── Map style ───────────────────────────────────────────────────────────
  // Vector layer names (water, landuse, highway, ...) come from the Martin
  // basemap_tiles SQL function; admin borders from boundary_polygon_lvl* tables.
  var THEMES = {
    standard: { bg: '#f2efe9', water: '#aad3df', landuse: '#ebe8e0', veg: '#c8e1b0', parking: '#ebe7de', bFill: '#d9d0c9', bLine: '#bdb2a8',
                road: '#ffffff', casing: '#c4b8a8', rail: '#8a8a8a', poi: '#d9453b', text: '#333333', halo: '#ffffff', border: '#8e5ea2', waterText: '#4a7f93',
                typed: true,
                // [fill, casing] per road class (OSM-carto palette)
                roads: { motorway: ['#e892a2', '#dc2a67'], primary: ['#fcd6a4', '#d09a45'], secondary: ['#f7fabf', '#a9b04a'], tertiary: ['#ffffff', '#a8a8a8'],
                         minor: ['#ffffff', '#bbbbbb'], service: ['#ffffff', '#c4c4c4'], path: ['#f4796b'], track: ['#a07a3c'] } },
    light:    { bg: '#f3f4f6', water: '#cfe2ee', landuse: '#e7eae7', veg: '#dbe8d8', parking: '#e9eaee', bFill: '#e2e4e9', bLine: '#cdd1d9',
                road: '#ffffff', casing: '#cfd4dc', rail: '#9aa3ae', poi: '#e0556b', text: '#515b68', halo: '#ffffff', border: '#7c8aa0', waterText: '#6a8fa3',
                roads: { motorway: ['#ffe3b8', '#e2bd85'], primary: ['#fff0d6', '#dcc7a0'], secondary: ['#ffffff', '#cfd4dc'], tertiary: ['#ffffff', '#d5d9e0'],
                         minor: ['#ffffff', '#dde0e6'], service: ['#ffffff', '#e3e5ea'], path: ['#c9ced8'], track: ['#b9b2a2'] } },
    dark:     { bg: '#10151b', water: '#17364a', landuse: '#161e1d', veg: '#18291f', parking: '#182029', bFill: '#222b35', bLine: '#313d4a',
                road: '#37424f', casing: '#1b222b', rail: '#4b5663', poi: '#f08a97', text: '#c3ceda', halo: '#10151b', border: '#8a97ad', waterText: '#6fa6c4',
                roads: { motorway: ['#6a5a3c', '#2a2418'], primary: ['#56513f', '#242018'], secondary: ['#47505a', '#1b222b'], tertiary: ['#3d4753', '#1b222b'],
                         minor: ['#37424f', '#1b222b'], service: ['#2f3945', '#1b222b'], path: ['#56606d'], track: ['#4d4a3f'] } }
  };

  // Land cover palette for the small-zoom overview: country land vs. neighbours, desert, steppe, forest, oases, reserves
  var LAND = {
    standard: { out: '#e6e4de', land: '#f6f1e2', sand: '#f2e4b6', grass: '#dcebba', scrub: '#d0e3b0', scree: '#ddd5c5', forest: '#b6d79e', farm: '#d9ecaf',
                reserve: '#c9e5bd', reserveLine: '#86b87b', reserveText: '#3f7d3f' },
    light:    { out: '#e6e9ee', land: '#f5f6f9', sand: '#ece8dc', grass: '#e4ecdf', scrub: '#e0e9dc', scree: '#e2e3e6', forest: '#d3e3d1', farm: '#e5edd9',
                reserve: '#d9e8d8', reserveLine: '#a9c6a7', reserveText: '#5f8a62' },
    dark:     { out: '#0a0e13', land: '#10171e', sand: '#1c1b15', grass: '#14211a', scrub: '#142018', scree: '#1b2128', forest: '#12281c', farm: '#18281a',
                reserve: '#14291f', reserveLine: '#2c5a3d', reserveText: '#6fae82' }
  };

  // Parks, grounds, stations, peaks (zoom 11-16)
  var ZONE = {
    standard: { park: '#c8facc', garden: '#cdebb0', pitch: '#aae0cb', sport: '#dffce2', edu: '#f0eecb', hosp: '#f2ddd7', market: '#e8dccd', airport: '#e1e0ea', edge: '#9fae98',
                parkText: '#2f7a3f', eduText: '#6b5a1f', airportText: '#5a5a8a', peak: '#8a5a3c', stRail: '#b8383b', stMetro: '#2b6cb0', stText: '#8f2a2d' },
    light:    { park: '#dcebd9', garden: '#e2edde', pitch: '#d3e6dd', sport: '#e4eee6', edu: '#eeeee0', hosp: '#efe3e1', market: '#ece6dd', airport: '#e6e6ee', edge: '#b5c2b3',
                parkText: '#5f8a62', eduText: '#8a7d52', airportText: '#7a7aa0', peak: '#9a7a62', stRail: '#c25a5d', stMetro: '#4a82c0', stText: '#a35052' },
    dark:     { park: '#14291f', garden: '#163021', pitch: '#17332b', sport: '#16302a', edu: '#25251a', hosp: '#2a1d1f', market: '#262219', airport: '#1d1f2b', edge: '#2d4636',
                parkText: '#6fae82', eduText: '#b3a46a', airportText: '#8e8ec0', peak: '#b08a6a', stRail: '#e07a7d', stMetro: '#6aa4e0', stText: '#e29a9c' }
  };

  // OSM-carto-like colours by feature type (used by the "standard" theme only)
  var LANDUSE_COLORS = ['residential', '#e0dfdf', 'commercial', '#f2dad9', 'retail', '#ffd6d1', 'industrial', '#ebdbe8', 'railway', '#ebdbe8',
    'cemetery', '#aacbaf', 'farmland', '#eef0d5', 'farmyard', '#eef0d5', 'orchard', '#aedfa3', 'vineyard', '#aedfa3', 'allotments', '#c9e1bf',
    'grass', '#cdebb0', 'meadow', '#cdebb0', 'recreation_ground', '#dffce2', 'village_green', '#cdebb0', 'forest', '#add19e',
    'construction', '#c7c7b4', 'brownfield', '#c7c7b4', 'quarry', '#c5c3c3', 'military', '#f3e4e4', 'education', '#ffffe5', 'garages', '#dfddce', 'religious', '#d0d0d0'];
  var VEG_COLORS = ['wood', '#add19e', 'forest', '#add19e', 'scrub', '#c8d7ab', 'grassland', '#cdebb0', 'heath', '#d6d99f', 'wetland', '#b8dcd0',
    'meadow', '#cdebb0', 'grass', '#cdebb0', 'orchard', '#aedfa3', 'farmland', '#eef0d5'];
  var ROAD_GROUPS = {
    motorway: ['motorway', 'motorway_link', 'trunk', 'trunk_link'],
    primary: ['primary', 'primary_link'],
    secondary: ['secondary', 'secondary_link'],
    tertiary: ['tertiary', 'tertiary_link'],
    minor: ['residential', 'unclassified', 'living_street', 'road'],
    service: ['service'],
    path: ['footway', 'path', 'pedestrian', 'steps', 'cycleway', 'bridleway', 'corridor'],
    track: ['track']
  };
  // [width at z13, z16, z19] of the road fill; casing is derived from it
  var ROAD_ORDER = ['service', 'minor', 'tertiary', 'secondary', 'primary', 'motorway']; // draw order: minor first
  var ROAD_W = { motorway: [2.6, 9, 36], primary: [2.2, 8, 32], secondary: [2, 7, 28], tertiary: [1.7, 6, 24], minor: [1.2, 4.6, 20], service: [0.6, 2.6, 11] };
  var FONT = ['Noto Sans Regular']; // glyphs are served by Martin from map_work/fonts
  var tilesBase = location.origin + '/tiles/';

  var state = {
    theme: store.get('theme', 'standard'),
    ov: { buildings: true, poi: true, boundaries: true, labels: true }
  };
  if (!THEMES[state.theme]) state.theme = 'standard';
  try { var sv = JSON.parse(store.get('overlays', '')); if (sv) Object.keys(state.ov).forEach(function (k) { if (typeof sv[k] === 'boolean') state.ov[k] = sv[k]; }); } catch (e) {}

  function buildStyle() {
    var c = THEMES[state.theme], ov = state.ov;
    function vis(on) { return { visibility: on ? 'visible' : 'none' }; }
    function poly(id, fill, line, group) {
      var v = group === undefined ? true : ov[group];
      return [
        { id: id + '-fill', type: 'fill', source: 'base', 'source-layer': id, layout: vis(v), paint: { 'fill-color': fill } },
        { id: id + '-line', type: 'line', source: 'base', 'source-layer': id, layout: vis(v), paint: { 'line-color': line, 'line-width': 0.6 } }
      ];
    }
    function w3(a) { return ['interpolate', ['exponential', 1.6], ['zoom'], 13, a[0], 16, a[1], 19, a[2]]; }
    function casingW(a) { return w3([a[0] + 0.8, a[1] + 2.2, a[2] + 5]); }
    var hw = ['coalesce', ['get', 'highway'], ''];
    var ALL_ROADS = [].concat.apply([], Object.keys(ROAD_GROUPS).map(function (k) { return ROAD_GROUPS[k]; }));
    function hwFilter(g) {
      var inG = ['in', hw, ['literal', ROAD_GROUPS[g]]];
      // "minor" also catches features without a class (tiles from the old basemap_tiles)
      return g === 'minor' ? ['any', inG, ['!', ['in', hw, ['literal', ALL_ROADS]]]] : inG;
    }
    var ROAD_LAYER = { type: 'line', source: 'base', 'source-layer': 'highway' };
    var RLAYOUT = { 'line-cap': 'round', 'line-join': 'round' };
    var tunnelOpacity = ['case', ['in', ['coalesce', ['get', 'tunnel'], 'no'], ['literal', ['yes', 'building_passage', 'culvert']]], 0.45, 1];
    var roadCasings = ROAD_ORDER.map(function (g) {
      return Object.assign({ id: 'hw-casing-' + g, minzoom: g === 'service' ? 15 : 14, filter: hwFilter(g), layout: RLAYOUT, paint: { 'line-color': c.roads[g][1], 'line-width': casingW(ROAD_W[g]), 'line-opacity': tunnelOpacity } }, ROAD_LAYER);
    });
    var roadFills = ROAD_ORDER.map(function (g) {
      return Object.assign({ id: 'hw-' + g, minzoom: g === 'service' ? 15 : 14, filter: hwFilter(g), layout: RLAYOUT, paint: { 'line-color': c.roads[g][0], 'line-width': w3(ROAD_W[g]), 'line-opacity': tunnelOpacity } }, ROAD_LAYER);
    });
    var pathWidth = ['interpolate', ['linear'], ['zoom'], 15, 0.8, 19, 2.4];
    var pathLayers = [
      Object.assign({ id: 'hw-track', minzoom: 14, filter: hwFilter('track'), layout: { 'line-cap': 'butt' }, paint: { 'line-color': c.roads.track[0], 'line-width': pathWidth, 'line-dasharray': [4, 2] } }, ROAD_LAYER),
      Object.assign({ id: 'hw-path', minzoom: 15, filter: hwFilter('path'), layout: { 'line-cap': 'butt' }, paint: { 'line-color': c.roads.path[0], 'line-width': pathWidth, 'line-dasharray': [2, 1.5] } }, ROAD_LAYER)
    ];
    var onewayArrows = Object.assign({ id: 'hw-oneway', type: 'symbol', minzoom: 16, filter: ['in', ['coalesce', ['get', 'oneway'], ''], ['literal', ['yes', '1', 'true']]],
      layout: { 'symbol-placement': 'line', 'symbol-spacing': 110, 'icon-image': 'oneway-arrow', 'icon-size': 0.8, 'icon-rotation-alignment': 'map', 'icon-padding': 8 } }, { source: 'base', 'source-layer': 'highway' });
    var amen = ['coalesce', ['get', 'amenity'], ''];
    function amenIn(list) { return ['in', amen, ['literal', list]]; }
    var poiColor = ['case',
      ['has', 'shop'], '#ac39ac',
      amenIn(['restaurant', 'cafe', 'fast_food', 'bar', 'pub', 'food_court', 'biergarten', 'ice_cream']), '#c77400',
      amenIn(['hospital', 'pharmacy', 'clinic', 'doctors', 'dentist']), '#da0092',
      amenIn(['school', 'university', 'college', 'kindergarten', 'library']), '#734a08',
      amenIn(['place_of_worship']), '#6f6f6f',
      amenIn(['parking', 'bicycle_parking']), '#0066ff',
      amenIn(['bank', 'atm', 'post_office', 'police', 'fire_station', 'townhall']), '#4d5fc0',
      ['has', 'tourism'], '#0092da',
      ['has', 'leisure'], '#2e9e4a',
      c.poi];
    // POI icons (Maki, CC0, self-hosted in /icons). Rules are checked top to bottom; no match = plain coloured dot.
    var shp = ['coalesce', ['get', 'shop'], ''];
    var tour = ['coalesce', ['get', 'tourism'], ''];
    var leis = ['coalesce', ['get', 'leisure'], ''];
    var shopIn = function (list) { return ['in', shp, ['literal', list]]; };
    var POI_RULES = [
      [shopIn(['supermarket', 'grocery', 'greengrocer', 'butcher']), 'grocery', '#ac39ac'],
      [shopIn(['convenience', 'kiosk']), 'convenience', '#ac39ac'],
      [shopIn(['clothes', 'shoes', 'boutique', 'fashion', 'bag']), 'clothing-store', '#ac39ac'],
      [shopIn(['alcohol', 'beverages']), 'alcohol-shop', '#ac39ac'],
      [shopIn(['car_repair', 'car', 'car_parts', 'tyres']), 'car-repair', '#ac39ac'],
      [shopIn(['mobile_phone', 'electronics', 'computer']), 'mobile-phone', '#ac39ac'],
      [shopIn(['hairdresser', 'beauty', 'cosmetics']), 'hairdresser', '#ac39ac'],
      [shopIn(['bakery', 'pastry']), 'bakery', '#ac39ac'],
      [shopIn(['gift']), 'gift', '#ac39ac'],
      [shopIn(['florist']), 'florist', '#ac39ac'],
      [shopIn(['bicycle']), 'bicycle', '#ac39ac'],
      [['has', 'shop'], 'shop', '#ac39ac'],
      [amenIn(['restaurant']), 'restaurant', '#c77400'],
      [amenIn(['cafe']), 'cafe', '#c77400'],
      [amenIn(['fast_food', 'food_court', 'ice_cream']), 'fast-food', '#c77400'],
      [amenIn(['bar', 'pub', 'biergarten']), 'bar', '#c77400'],
      [amenIn(['pharmacy']), 'pharmacy', '#da0092'],
      [amenIn(['hospital', 'clinic']), 'hospital', '#da0092'],
      [amenIn(['doctors']), 'doctor', '#da0092'],
      [amenIn(['dentist']), 'dentist', '#da0092'],
      [amenIn(['veterinary']), 'veterinary', '#da0092'],
      [amenIn(['school', 'kindergarten']), 'school', '#734a08'],
      [amenIn(['college', 'university']), 'college', '#734a08'],
      [amenIn(['library']), 'library', '#734a08'],
      [amenIn(['place_of_worship']), 'place-of-worship', '#6f6f6f'],
      [amenIn(['fuel']), 'fuel', '#0066ff'],
      [amenIn(['parking']), 'parking', '#0066ff'],
      [amenIn(['bus_station']), 'bus', '#0066ff'],
      [amenIn(['bank', 'atm']), 'bank', '#4d5fc0'],
      [amenIn(['police']), 'police', '#4d5fc0'],
      [amenIn(['fire_station']), 'fire-station', '#4d5fc0'],
      [amenIn(['post_office', 'post_box']), 'post', '#4d5fc0'],
      [amenIn(['townhall']), 'town-hall', '#4d5fc0'],
      [amenIn(['theatre']), 'theatre', '#734a08'],
      [amenIn(['cinema']), 'cinema', '#734a08'],
      [amenIn(['toilets']), 'toilet', '#6f6f6f'],
      [amenIn(['shelter']), 'shelter', '#6f6f6f'],
      [amenIn(['car_wash']), 'car', '#6f6f6f'],
      [['in', tour, ['literal', ['hotel', 'guest_house', 'hostel', 'motel', 'apartment']]], 'lodging', '#0092da'],
      [['==', tour, 'museum'], 'museum', '#0092da'],
      [['==', tour, 'attraction'], 'attraction', '#0092da'],
      [['==', leis, 'playground'], 'playground', '#2e9e4a'],
      [['==', leis, 'stadium'], 'stadium', '#2e9e4a'],
      [['==', leis, 'swimming_pool'], 'swimming', '#2e9e4a']
    ];
    var poiIconExpr = ['case'];
    POI_RULES.forEach(function (r) { poiIconExpr.push(r[0], 'maki:' + r[1] + ':' + r[2].slice(1)); });
    poiIconExpr.push('');
    var landuseFill = c.typed ? ['match', ['coalesce', ['get', 'landuse'], '']].concat(LANDUSE_COLORS, [c.landuse]) : c.landuse;
    var vegFill = c.typed ? ['match', ['coalesce', ['get', 'natural'], ['get', 'wood'], ['get', 'landuse'], '']].concat(VEG_COLORS, [c.veg]) : c.veg;
    var label = function (id, layer, minzoom, extra) {
      var o = {
        id: id, type: 'symbol', source: 'base', 'source-layer': layer, minzoom: minzoom, filter: ['has', 'name'],
        layout: Object.assign({ visibility: ov.labels ? 'visible' : 'none', 'text-field': ['get', 'name'], 'text-font': FONT, 'text-size': 11, 'text-max-width': 8 }, extra.layout || {}),
        paint: Object.assign({ 'text-color': c.text, 'text-halo-color': c.halo, 'text-halo-width': 1.4 }, extra.paint || {})
      };
      return o;
    };
    // ── Overview layers (source "ovr" = Martin overview_tiles): big water + urban areas at small zoom,
    //    and labels that appear step by step: country → regions → districts, cities → towns → villages → hamlets
    var FONT_B = ['Noto Sans SemiBold'];
    var nm = ['coalesce', ['get', 'name'], ['get', 'name_en']];
    function zs(a) { return ['interpolate', ['linear'], ['zoom']].concat(a); }
    function ovLabel(id, layer, filter, minz, maxz, extra) {
      var o = {
        id: id, type: 'symbol', source: 'ovr', 'source-layer': layer, minzoom: minz, filter: filter,
        layout: Object.assign({ visibility: ov.labels ? 'visible' : 'none', 'text-field': nm, 'text-font': FONT, 'text-max-width': 7 }, extra.layout || {}),
        paint: Object.assign({ 'text-color': c.text, 'text-halo-color': c.halo, 'text-halo-width': 1.5 }, extra.paint || {})
      };
      if (maxz) o.maxzoom = maxz;
      return o;
    }
    var lvl = function (l) { return ['in', ['get', 'lvl'], ['literal', l]]; };
    var pl = function (p) { return ['==', ['get', 'place'], p]; };
    var placeSort = { 'symbol-sort-key': ['-', 0, ['get', 'pop']] };
    var L = LAND[state.theme] || LAND.standard;
    var surfaceFill = ['match', ['coalesce', ['get', 'natural'], ''], 'sand', L.sand, 'grassland', L.grass, 'scree', L.scree, 'beach', L.sand, L.scrub];
    var ovRoadColor = ['match', hw, ['motorway', 'trunk'], c.roads.motorway[0], 'primary', c.roads.primary[0], 'secondary', c.roads.secondary[0], 'tertiary', c.roads.tertiary[0], c.road];
    var ovRoadCasing = ['match', hw, ['motorway', 'trunk'], c.roads.motorway[1], 'primary', c.roads.primary[1], 'secondary', c.roads.secondary[1], 'tertiary', c.roads.tertiary[1], c.casing];
    var ovRoadFilter = function (list) { return ['in', hw, ['literal', list]]; };
    var overviewRoads = [
      { id: 'ovr-road-casing', type: 'line', source: 'ovr', 'source-layer': 'road', minzoom: 6, maxzoom: 14, layout: RLAYOUT, paint: { 'line-color': ovRoadCasing, 'line-width': zs([6, 1.4, 10, 2.6, 13, 4.2]) } },
      { id: 'ovr-road', type: 'line', source: 'ovr', 'source-layer': 'road', minzoom: 6, maxzoom: 14, layout: RLAYOUT, paint: { 'line-color': ovRoadColor, 'line-width': zs([6, 0.7, 10, 1.6, 13, 3]) } }
    ];
    var Z = ZONE[state.theme] || ZONE.standard;
    var kindIn = function (list) { return ['in', ['coalesce', ['get', 'kind'], ''], ['literal', list]]; };
    var zoneFill = ['case',
      kindIn(['park']), Z.park, kindIn(['garden']), Z.garden, kindIn(['pitch', 'track']), Z.pitch,
      kindIn(['stadium', 'sports_centre', 'playground', 'swimming_pool']), Z.sport,
      kindIn(['school', 'kindergarten', 'college', 'university']), Z.edu, kindIn(['hospital']), Z.hosp, kindIn(['marketplace']), Z.market, Z.park];
    var zoneLayers = [
      { id: 'ovr-zone', type: 'fill', source: 'ovr', 'source-layer': 'zone', minzoom: 12, paint: { 'fill-color': zoneFill } },
      { id: 'ovr-zone-line', type: 'line', source: 'ovr', 'source-layer': 'zone', minzoom: 14, paint: { 'line-color': Z.edge, 'line-opacity': 0.55, 'line-width': 0.7 } },
      { id: 'ovr-airport', type: 'fill', source: 'ovr', 'source-layer': 'airport', minzoom: 8, paint: { 'fill-color': Z.airport } },
      { id: 'ovr-airport-line', type: 'line', source: 'ovr', 'source-layer': 'airport', minzoom: 10, paint: { 'line-color': Z.airportText, 'line-opacity': 0.4, 'line-width': 0.8 } },
      { id: 'ovr-platform', type: 'fill', source: 'ovr', 'source-layer': 'platform', minzoom: 16, paint: { 'fill-color': c.typed ? '#bbbbbb' : c.casing, 'fill-opacity': 0.7 } },
      { id: 'ovr-runway', type: 'line', source: 'ovr', 'source-layer': 'infra', minzoom: 10, filter: ['==', ['get', 'kind'], 'runway'],
        paint: { 'line-color': c.typed ? '#c4c4d2' : c.casing, 'line-width': zs([10, 2, 14, 8, 17, 28]) } },
      { id: 'ovr-cliff', type: 'line', source: 'ovr', 'source-layer': 'infra', minzoom: 13, filter: ['==', ['get', 'kind'], 'cliff'],
        paint: { 'line-color': c.typed ? '#8b6f47' : c.rail, 'line-width': zs([13, 0.8, 17, 2]) } },
      { id: 'ovr-pipeline', type: 'line', source: 'ovr', 'source-layer': 'infra', minzoom: 11, filter: ['==', ['get', 'kind'], 'pipeline'],
        paint: { 'line-color': c.typed ? '#8a8aa6' : c.rail, 'line-width': zs([11, 0.6, 16, 1.4]), 'line-dasharray': [6, 2] } },
      { id: 'ovr-aerialway', type: 'line', source: 'ovr', 'source-layer': 'infra', minzoom: 12, filter: ['==', ['get', 'kind'], 'aerialway'],
        paint: { 'line-color': c.rail, 'line-width': 1, 'line-dasharray': [3, 2] } },
      { id: 'ovr-power', type: 'line', source: 'ovr', 'source-layer': 'infra', minzoom: 12, filter: ['==', ['get', 'kind'], 'power'],
        paint: { 'line-color': c.typed ? '#9a9a9a' : c.rail, 'line-opacity': 0.8, 'line-width': zs([12, 0.5, 17, 1.2]) } }
    ];
    var lblVis = { visibility: ov.labels ? 'visible' : 'none' };
    var haloText = { 'text-color': c.text, 'text-halo-color': c.halo, 'text-halo-width': 1.4 };
    var roadClassIn = function (list) { return ['in', hw, ['literal', list]]; };
    var featureLayers = [
      { id: 'label-ovr-road', type: 'symbol', source: 'ovr', 'source-layer': 'road', minzoom: 10, maxzoom: 14, filter: ['all', roadClassIn(['motorway', 'trunk', 'primary']), ['any', ['has', 'ref'], ['has', 'name']]],
        layout: Object.assign({ 'symbol-placement': 'line', 'text-field': ['coalesce', ['get', 'ref'], ['get', 'name']], 'text-font': FONT, 'text-size': 10, 'symbol-spacing': 320, 'text-max-angle': 30 }, lblVis), paint: Object.assign({}, haloText, { 'text-opacity': 0.85 }) },
      { id: 'label-ovr-road2', type: 'symbol', source: 'ovr', 'source-layer': 'road', minzoom: 12, maxzoom: 14, filter: ['all', roadClassIn(['secondary', 'tertiary']), ['any', ['has', 'ref'], ['has', 'name']]],
        layout: Object.assign({ 'symbol-placement': 'line', 'text-field': ['coalesce', ['get', 'name'], ['get', 'ref']], 'text-font': FONT, 'text-size': 9.5, 'symbol-spacing': 320, 'text-max-angle': 30 }, lblVis), paint: Object.assign({}, haloText, { 'text-opacity': 0.75 }) },
      { id: 'station-dot', type: 'circle', source: 'ovr', 'source-layer': 'station', minzoom: 11, layout: lblVis,
        paint: { 'circle-color': ['case', ['==', ['get', 'kind'], 'subway'], Z.stMetro, Z.stRail], 'circle-radius': ['case', ['==', ['get', 'kind'], 'halt'], 2.5, 3.8], 'circle-stroke-color': c.halo, 'circle-stroke-width': 1.2 } },
      { id: 'label-station', type: 'symbol', source: 'ovr', 'source-layer': 'station', minzoom: 12, filter: ['has', 'name'],
        layout: Object.assign({ 'text-field': ['get', 'name'], 'text-font': FONT, 'text-size': 10, 'text-anchor': 'top', 'text-offset': [0, 0.6], 'text-max-width': 7 }, lblVis),
        paint: { 'text-color': Z.stText, 'text-halo-color': c.halo, 'text-halo-width': 1.4 } },
      { id: 'peak', type: 'symbol', source: 'ovr', 'source-layer': 'peak', minzoom: 9,
        layout: Object.assign({ 'icon-image': 'peak-icon', 'icon-size': 0.85, 'symbol-sort-key': ['-', 0, ['coalesce', ['get', 'ele'], 0]], 'text-optional': true,
          'text-field': ['case', ['all', ['has', 'name'], ['has', 'ele']], ['concat', ['get', 'name'], '\n', ['to-string', ['get', 'ele']], ' m'],
                                   ['has', 'name'], ['get', 'name'], ['has', 'ele'], ['concat', ['to-string', ['get', 'ele']], ' m'], ''],
          'text-font': FONT, 'text-size': 10, 'text-anchor': 'top', 'text-offset': [0, 0.5], 'text-max-width': 8 }, lblVis),
        paint: { 'text-color': Z.peak, 'text-halo-color': c.halo, 'text-halo-width': 1.4 } }
    ];
    var overviewBase = [
      { id: 'ovr-land', type: 'fill', source: 'ovr', 'source-layer': 'land', paint: { 'fill-color': L.land } },
      { id: 'ovr-surface', type: 'fill', source: 'ovr', 'source-layer': 'surface', paint: { 'fill-color': surfaceFill } },
      { id: 'ovr-farm', type: 'fill', source: 'ovr', 'source-layer': 'farm', maxzoom: 13, paint: { 'fill-color': L.farm } },
      { id: 'ovr-forest', type: 'fill', source: 'ovr', 'source-layer': 'forest', maxzoom: 13, paint: { 'fill-color': L.forest } },
      { id: 'ovr-reserve', type: 'fill', source: 'ovr', 'source-layer': 'reserve', minzoom: 5, paint: { 'fill-color': L.reserve, 'fill-opacity': 0.55 } },
      { id: 'ovr-reserve-line', type: 'line', source: 'ovr', 'source-layer': 'reserve', minzoom: 6, paint: { 'line-color': L.reserveLine, 'line-width': 1, 'line-dasharray': [3, 2], 'line-opacity': 0.8 } },
      { id: 'ovr-settlement', type: 'fill', source: 'ovr', 'source-layer': 'settlement', minzoom: 7, maxzoom: 13, paint: { 'fill-color': c.typed ? '#e4e0d7' : c.bFill, 'fill-opacity': c.typed ? 1 : 0.5 } },
      { id: 'ovr-water', type: 'fill', source: 'ovr', 'source-layer': 'water', maxzoom: 11, paint: { 'fill-color': c.water, 'fill-opacity': ['case', ['==', ['get', 'natural'], 'wetland'], 0.55, 1] } },
      { id: 'ovr-island', type: 'fill', source: 'ovr', 'source-layer': 'island', minzoom: 8, paint: { 'fill-color': L.land } }
    ];
    var overviewLabels = featureLayers.concat([
      { id: 'place-dot-city', type: 'circle', source: 'ovr', 'source-layer': 'place', minzoom: 5, maxzoom: 14, filter: pl('city'),
        layout: { visibility: ov.labels ? 'visible' : 'none' },
        paint: { 'circle-color': c.text, 'circle-stroke-color': c.halo, 'circle-stroke-width': 1, 'circle-radius': 3.2 } },
      { id: 'place-dot-town', type: 'circle', source: 'ovr', 'source-layer': 'place', minzoom: 8, maxzoom: 14, filter: pl('town'),
        layout: { visibility: ov.labels ? 'visible' : 'none' },
        paint: { 'circle-color': c.text, 'circle-stroke-color': c.halo, 'circle-stroke-width': 1, 'circle-radius': 2.2 } },
      ovLabel('label-suburb', 'hood', pl('suburb'), 12, null, { layout: { 'text-size': zs([12, 10.5, 16, 13]), 'text-letter-spacing': 0.1, 'text-transform': 'uppercase' }, paint: { 'text-opacity': 0.6 } }),
      ovLabel('label-hood', 'hood', ['in', ['get', 'place'], ['literal', ['neighbourhood', 'quarter']]], 14, null, { layout: { 'text-size': zs([14, 9.5, 17, 12]), 'text-letter-spacing': 0.06 }, paint: { 'text-color': c.typed ? '#6b6258' : c.text, 'text-opacity': 0.85 } }),
      ovLabel('label-region', 'admin', lvl([3, 4]), 5, 10, { layout: { 'text-size': zs([5, 10, 9, 15]), 'text-letter-spacing': 0.08 }, paint: { 'text-opacity': 0.7, 'text-color': c.border } }),
      ovLabel('label-reserve', 'admin', lvl([99]), 8, 15, { layout: { 'text-size': zs([8, 9.5, 13, 12]), 'text-letter-spacing': 0.05 }, paint: { 'text-color': L.reserveText, 'text-opacity': 0.9 } }),
      ovLabel('label-park', 'admin', lvl([98]), 14, null, { layout: { 'text-size': zs([14, 9.5, 17, 12]) }, paint: { 'text-color': Z.parkText, 'text-opacity': 0.95 } }),
      ovLabel('label-amenity-area', 'admin', lvl([97]), 14, null, { layout: { 'text-size': zs([14, 9.5, 17, 11.5]) }, paint: { 'text-color': Z.eduText, 'text-opacity': 0.95 } }),
      ovLabel('label-airport', 'admin', lvl([96]), 9, 15, { layout: { 'text-font': FONT_B, 'text-size': zs([9, 10, 13, 12]) }, paint: { 'text-color': Z.airportText } }),
      ovLabel('label-district', 'admin', lvl([6]), 8, 14, { layout: { 'text-size': zs([8, 9.5, 12, 12]) }, paint: { 'text-opacity': 0.6 } }),
      ovLabel('label-district8', 'admin', lvl([8]), 11, 16, { layout: { 'text-size': zs([11, 10, 14, 12.5]) }, paint: { 'text-opacity': 0.6 } }),
      ovLabel('label-city', 'place', pl('city'), 4, null, { layout: Object.assign({ 'text-font': FONT_B, 'text-size': zs([4, 11, 8, 15, 12, 19]), 'text-anchor': 'top', 'text-offset': [0, 0.5] }, placeSort) }),
      ovLabel('label-town', 'place', pl('town'), 8, null, { layout: Object.assign({ 'text-size': zs([8, 10.5, 12, 14]), 'text-anchor': 'top', 'text-offset': [0, 0.4] }, placeSort) }),
      ovLabel('label-village', 'place', pl('village'), 11, null, { layout: Object.assign({ 'text-size': zs([11, 9.5, 14, 12]) }, placeSort), paint: { 'text-opacity': 0.9 } }),
      ovLabel('label-hamlet', 'place', pl('hamlet'), 13, null, { layout: Object.assign({ 'text-size': zs([13, 9, 16, 11]) }, placeSort), paint: { 'text-opacity': 0.75 } }),
      ovLabel('label-locality', 'place', pl('locality'), 14, null, { layout: { 'text-size': 9.5 }, paint: { 'text-opacity': 0.6 } }),
      // last in the list = placed first by the collision engine, so the country name always wins at small zoom
      ovLabel('label-country', 'admin', lvl([2]), 3, 7, { layout: { 'text-font': FONT_B, 'text-size': zs([3, 11, 6, 18]), 'text-transform': 'uppercase', 'text-letter-spacing': 0.2 }, paint: { 'text-opacity': 0.55 } })
    ]);
    var layers = [{ id: 'bg', type: 'background', paint: { 'background-color': L.out } }]
      .concat(overviewBase)
      .concat(poly('landuse', landuseFill, landuseFill), poly('vegetation', vegFill, vegFill), poly('water', c.water, c.water), poly('parking', c.parking, c.casing))
      .concat(zoneLayers)
      .concat([
        { id: 'water_line', type: 'line', source: 'base', 'source-layer': 'water_line', paint: { 'line-color': c.water, 'line-width': ['interpolate', ['linear'], ['zoom'], 12, 0.8, 18, 4] } },
        { id: 'railway', type: 'line', source: 'base', 'source-layer': 'railway', paint: { 'line-color': c.rail, 'line-width': 1.2, 'line-dasharray': [4, 3] } }
      ])
      .concat(overviewRoads, pathLayers, roadCasings, roadFills, [onewayArrows])
      .concat(poly('building', c.bFill, c.bLine, 'buildings'))
      .concat([
        { id: 'poi', type: 'circle', source: 'base', 'source-layer': 'poi', filter: ['==', poiIconExpr, ''], layout: vis(ov.poi), paint: { 'circle-color': poiColor, 'circle-radius': ['interpolate', ['linear'], ['zoom'], 16, 3, 19, 6], 'circle-stroke-color': c.halo, 'circle-stroke-width': 1.2 } },
        { id: 'poi-icon', type: 'symbol', source: 'base', 'source-layer': 'poi', minzoom: 16, filter: ['!=', poiIconExpr, ''],
          layout: Object.assign({ 'icon-image': poiIconExpr, 'icon-size': zs([16, 0.95, 19, 1.3]), 'icon-padding': 3, 'symbol-sort-key': ['case', ['has', 'name'], 0, 1] }, vis(ov.poi)) },
        { id: 'parking-icon', type: 'symbol', source: 'base', 'source-layer': 'parking', minzoom: 17,
          layout: Object.assign({ 'icon-image': 'maki:parking:0066ff', 'icon-size': zs([17, 0.95, 19, 1.3]) }, vis(ov.poi)) },
        { id: 'label-housenumber', type: 'symbol', source: 'base', 'source-layer': 'building', minzoom: 17, filter: ['all', ['has', 'housenumber'], ['!', ['has', 'name']]],
          layout: Object.assign({ 'text-field': ['get', 'housenumber'], 'text-font': FONT, 'text-size': zs([17, 9, 19, 12]), 'text-max-width': 5 }, lblVis),
          paint: { 'text-color': c.typed ? '#7d6b5f' : c.text, 'text-opacity': 0.85, 'text-halo-color': c.bFill, 'text-halo-width': 1 } },
        { id: 'label-address', type: 'symbol', source: 'base', 'source-layer': 'address', minzoom: 17,
          layout: Object.assign({ 'text-field': ['coalesce', ['get', 'name'], ['get', 'housenumber']], 'text-font': FONT, 'text-size': zs([17, 9, 19, 12]), 'text-max-width': 6 }, lblVis),
          paint: { 'text-color': c.typed ? '#7d6b5f' : c.text, 'text-halo-color': c.halo, 'text-halo-width': 1.2 } },
        { id: 'transit-stop', type: 'symbol', source: 'ovr', 'source-layer': 'transit', minzoom: 16, filter: ['==', ['get', 'kind'], 'stop'],
          layout: Object.assign({ 'icon-image': 'maki:bus:0066ff', 'icon-size': zs([16, 0.8, 19, 1.1]), 'icon-padding': 4, 'text-field': ['get', 'name'], 'text-font': FONT, 'text-size': 10,
            'text-anchor': 'top', 'text-offset': [0, 1.1], 'text-optional': true, 'text-max-width': 7 }, lblVis),
          paint: { 'text-color': '#0066ff', 'text-halo-color': c.halo, 'text-halo-width': 1.2 } },
        { id: 'transit-metro', type: 'symbol', source: 'ovr', 'source-layer': 'transit', minzoom: 16, filter: ['==', ['get', 'kind'], 'metro'],
          layout: Object.assign({ 'icon-image': 'maki:rail-metro:2b6cb0', 'icon-size': zs([16, 0.95, 19, 1.3]), 'icon-allow-overlap': true, 'text-field': ['get', 'name'], 'text-font': FONT, 'text-size': 10.5,
            'text-anchor': 'top', 'text-offset': [0, 1.2], 'text-optional': true, 'text-max-width': 7 }, lblVis),
          paint: { 'text-color': '#2b6cb0', 'text-halo-color': c.halo, 'text-halo-width': 1.3 } },
        { id: 'transit-crossing', type: 'circle', source: 'ovr', 'source-layer': 'transit', minzoom: 18, filter: ['==', ['get', 'kind'], 'crossing'],
          paint: { 'circle-color': c.text, 'circle-opacity': 0.55, 'circle-radius': 2 } },
        { id: 'power-tower', type: 'circle', source: 'ovr', 'source-layer': 'tower', minzoom: 16,
          paint: { 'circle-color': c.rail, 'circle-radius': zs([16, 1.5, 19, 3]), 'circle-stroke-color': c.halo, 'circle-stroke-width': 0.8 } },
        { id: 'bnd2', type: 'line', source: 'bnd2', 'source-layer': 'boundary_polygon_lvl2', layout: vis(ov.boundaries), paint: { 'line-color': c.border, 'line-width': ['interpolate', ['linear'], ['zoom'], 3, 1, 10, 2.2], 'line-dasharray': [5, 2] } },
        { id: 'bnd4', type: 'line', source: 'bnd4', 'source-layer': 'boundary_polygon_lvl4', minzoom: 5, layout: vis(ov.boundaries), paint: { 'line-color': c.border, 'line-opacity': 0.7, 'line-width': 1, 'line-dasharray': [2, 2] } },
        label('label-water', 'water', 12, { paint: { 'text-color': c.waterText }, layout: { 'text-size': zs([12, 10, 16, 13]), 'text-letter-spacing': 0.05 } }),
        { id: 'label-waterway', type: 'symbol', source: 'base', 'source-layer': 'water_line', minzoom: 12, filter: ['all', ['has', 'name'], ['==', ['get', 'waterway'], 'river']],
          layout: Object.assign({ 'symbol-placement': 'line', 'text-field': ['get', 'name'], 'text-font': FONT, 'text-size': 11, 'symbol-spacing': 350, 'text-letter-spacing': 0.12 }, lblVis),
          paint: { 'text-color': c.waterText, 'text-halo-color': c.halo, 'text-halo-width': 1.2 } },
        { id: 'label-waterway-minor', type: 'symbol', source: 'base', 'source-layer': 'water_line', minzoom: 14, filter: ['all', ['has', 'name'], ['in', ['coalesce', ['get', 'waterway'], ''], ['literal', ['canal', 'stream']]]],
          layout: Object.assign({ 'symbol-placement': 'line', 'text-field': ['get', 'name'], 'text-font': FONT, 'text-size': 10, 'symbol-spacing': 300 }, lblVis),
          paint: { 'text-color': c.waterText, 'text-halo-color': c.halo, 'text-halo-width': 1.2 } },
        label('label-highway', 'highway', 14, { layout: { 'symbol-placement': 'line', 'text-size': 11, 'symbol-spacing': 280, 'text-max-angle': 30 } }),
        label('label-building', 'building', 17, { layout: { 'text-size': 10 }, paint: { 'text-opacity': 0.85 } }),
        { id: 'bnd6', type: 'line', source: 'bnd6', 'source-layer': 'boundary_polygon_lvl6', minzoom: 8, layout: vis(ov.boundaries), paint: { 'line-color': c.border, 'line-opacity': 0.5, 'line-width': 0.8, 'line-dasharray': [1, 2] } },
        { id: 'bnd8', type: 'line', source: 'bnd8', 'source-layer': 'boundary_polygon_lvl8', minzoom: 11, layout: vis(ov.boundaries), paint: { 'line-color': c.border, 'line-opacity': 0.4, 'line-width': 0.8, 'line-dasharray': [1, 2] } },
        label('label-poi', 'poi', 15, { layout: { 'text-size': 11, 'text-offset': [0, 1.3], 'text-anchor': 'top', 'text-optional': true } })
      ])
      .concat(overviewLabels);
    return {
      version: 8,
      glyphs: tilesBase + 'font/{fontstack}/{range}',
      sources: {
        base: { type: 'vector', tiles: [tilesBase + 'basemap_tiles/{z}/{x}/{y}'], minzoom: 10, maxzoom: 22 },
        bnd2: { type: 'vector', tiles: [tilesBase + 'boundary_polygon_lvl2/{z}/{x}/{y}'], minzoom: 0, maxzoom: 22 },
        bnd4: { type: 'vector', tiles: [tilesBase + 'boundary_polygon_lvl4/{z}/{x}/{y}'], minzoom: 5, maxzoom: 22 },
        bnd6: { type: 'vector', tiles: [tilesBase + 'boundary_polygon_lvl6/{z}/{x}/{y}'], minzoom: 7, maxzoom: 22 },
        bnd8: { type: 'vector', tiles: [tilesBase + 'boundary_polygon_lvl8/{z}/{x}/{y}'], minzoom: 9, maxzoom: 22 },
        ovr: { type: 'vector', tiles: [tilesBase + 'overview_tiles/{z}/{x}/{y}'], minzoom: 0, maxzoom: 16 }
      },
      layers: layers
    };
  }

  var map = new maplibregl.Map({
    container: 'map', style: buildStyle(), center: [start.lon, start.lat], zoom: start.zoom,
    attributionControl: false, maxZoom: 21, dragRotate: false, pitchWithRotate: false
  });
  map.touchZoomRotate.disableRotation();
  // One-way arrow icon, drawn on demand in the current theme's text colour
  var SVG_CACHE = {};
  function loadSvg(name) {
    if (!SVG_CACHE[name]) SVG_CACHE[name] = fetch('/icons/' + name + '.svg').then(function (r) { return r.text(); });
    return SVG_CACHE[name];
  }
  // id = "maki:<icon>:<hex colour>": white disc + tinted glyph, drawn at 2x for sharp rendering
  function addMakiIcon(id) {
    var parts = id.split(':'), name = parts[1], colour = '#' + parts[2];
    loadSvg(name).then(function (svg) {
      var tinted = svg.replace('<svg ', '<svg fill="' + colour + '" ');
      var img = new Image();
      img.onload = function () {
        var S = 36, cv = document.createElement('canvas'); cv.width = cv.height = S;
        var g = cv.getContext('2d');
        g.fillStyle = THEMES[state.theme].halo; g.globalAlpha = 0.9;
        g.beginPath(); g.arc(S / 2, S / 2, S / 2 - 1, 0, Math.PI * 2); g.fill();
        g.globalAlpha = 1; g.drawImage(img, 7, 7, 22, 22);
        if (!map.hasImage(id)) map.addImage(id, g.getImageData(0, 0, S, S), { pixelRatio: 2 });
      };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(tinted);
    });
  }
  map.on('styleimagemissing', function (e) {
    if (e.id.indexOf('maki:') === 0) { addMakiIcon(e.id); return; }
    if (e.id === 'peak-icon') {
      var pc = document.createElement('canvas'); pc.width = pc.height = 16;
      var pg = pc.getContext('2d');
      pg.fillStyle = (ZONE[state.theme] || ZONE.standard).peak; pg.strokeStyle = THEMES[state.theme].halo; pg.lineWidth = 1.2;
      pg.beginPath(); pg.moveTo(8, 2); pg.lineTo(14, 13); pg.lineTo(2, 13); pg.closePath(); pg.stroke(); pg.fill();
      map.addImage('peak-icon', pg.getImageData(0, 0, 16, 16));
      return;
    }
    if (e.id !== 'oneway-arrow') return;
    var s = 16, cv = document.createElement('canvas'); cv.width = cv.height = s;
    var g = cv.getContext('2d');
    g.fillStyle = THEMES[state.theme].text; g.globalAlpha = 0.75;
    g.beginPath(); g.moveTo(2, 5); g.lineTo(9, 5); g.lineTo(9, 1.5); g.lineTo(15, 8); g.lineTo(9, 14.5); g.lineTo(9, 11); g.lineTo(2, 11); g.closePath(); g.fill();
    map.addImage('oneway-arrow', g.getImageData(0, 0, s, s));
  });
  map.on('error', function (e) { console.error('map:', e && e.error && e.error.message, e && e.sourceId || ''); });

  // Scale bars (metric on top, imperial below), like OSM
  var scales = document.getElementById('scales');
  ['metric', 'imperial'].forEach(function (u) {
    var s = new maplibregl.ScaleControl({ unit: u, maxWidth: 110 });
    scales.appendChild(s.onAdd(map));
  });

  // ── Position sync: address bar + Edit buttons ───────────────────────────
  var editLink = document.getElementById('edit-link');
  var editId = document.getElementById('edit-id');
  var hashTimer;
  function posHash() {
    var c = map.getCenter();
    return '#map=' + map.getZoom().toFixed(2) + '/' + c.lat.toFixed(6) + '/' + c.lng.toFixed(6);
  }
  function syncHash() {
    var h = posHash();
    editLink.href = editId.href = '/edit/' + h;
    clearTimeout(hashTimer);
    hashTimer = setTimeout(function () { history.replaceState(null, '', location.pathname + location.search + h); }, 150);
  }
  map.on('move', syncHash);
  syncHash();
  window.addEventListener('hashchange', function () {
    var v = readHash();
    map.jumpTo({ center: [v.lon, v.lat], zoom: v.zoom });
  });

  // ── Toast / markers ─────────────────────────────────────────────────────
  var toastEl = document.getElementById('toast'), toastTimer;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.hidden = true; }, 2200);
  }
  function pinEl() {
    var d = document.createElement('div');
    d.innerHTML = '<svg class="pin" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12zm0-9.2a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6z"/></svg>';
    return d.firstChild;
  }
  var marker = null;
  function setMarker(lon, lat) {
    if (marker) marker.remove();
    marker = new maplibregl.Marker({ element: pinEl(), anchor: 'bottom' }).setLngLat([lon, lat]).addTo(map);
  }
  if (qs.has('mlat') && qs.has('mlon') && isFinite(+qs.get('mlat')) && isFinite(+qs.get('mlon'))) setMarker(+qs.get('mlon'), +qs.get('mlat'));

  // ── Feature query ───────────────────────────────────────────────────────
  var QUERY_LAYERS = ['poi', 'poi-icon', 'building-fill'].concat(ROAD_ORDER.map(function (g) { return 'hw-' + g; }), ['hw-path', 'hw-track', 'railway', 'water-fill', 'vegetation-fill', 'landuse-fill', 'parking-fill']);
  function featureAt(pt, r) {
    var live = QUERY_LAYERS.filter(function (id) { return map.getLayer(id); });
    if (!live.length) return null;
    var f = map.queryRenderedFeatures([[pt.x - r, pt.y - r], [pt.x + r, pt.y + r]], { layers: live });
    return f.length ? f[0] : null;
  }
  function featureHtml(f) {
    if (!f) return '<p>' + esc(t('none')) + '</p>';
    var p = f.properties || {};
    return '<dl class="kv"><dt>' + t('layer') + '</dt><dd>' + esc(f.sourceLayer) + '</dd>' +
      (p.name ? '<dt>' + t('name') + '</dt><dd>' + esc(p.name) + '</dd>' : '') + '</dl>';
  }
  map.on('click', function (e) {
    var f = featureAt(e.point, 5);
    if (!f) return;
    openPanel('object', { f: f, lngLat: e.lngLat });
  });
  map.on('mousemove', function (e) { map.getCanvas().style.cursor = featureAt(e.point, 3) ? 'pointer' : ''; });

  // ── Side panels ─────────────────────────────────────────────────────────
  var sidebar = document.getElementById('sidebar');
  var sideTitle = document.getElementById('side-title');
  var sideBody = document.getElementById('side-body');
  var current = null, currentArg = null;

  function soon(titleKey) {
    return { title: t(titleKey), html: '<div class="soon"><span class="badge">' + t('soon') + '</span><p>' + t('soonText') + '</p></div>' };
  }
  function simple(titleKey, textKey) { return { title: t(titleKey), html: '<p>' + t(textKey) + '</p>' }; }

  function field(id, value) {
    return '<div class="field"><input id="' + id + '" readonly value="' + esc(value) + '"><button type="button" data-copy="' + id + '">' + t('copy') + '</button></div>';
  }

  var PANELS = {
    welcome: function () {
      return { title: t('welcomeTitle'), html:
        '<div class="welcome-hero"><i data-icon="pin"></i></div><p>' + t('welcomeText') + '</p>' +
        '<div class="btn-row"><button class="btn" data-panel="about" type="button">' + t('learnMore') + '</button>' +
        '<a class="btn primary" href="' + editLink.getAttribute('href') + '">' + t('startMapping') + '</a></div>' };
    },
    history: function () { return soon('history'); },
    traces: function () { return soon('traces'); },
    diaries: function () { return soon('diaries'); },
    communities: function () { return soon('communities'); },
    note: function () { return simple('noteTitle', 'noteText'); },
    help: function () { return simple('helpTitle', 'helpText'); },
    about: function () { return simple('aboutTitle', 'aboutText'); },
    copyright: function () { return simple('copyrightTitle', 'copyrightText'); },
    directions: function () { return simple('directionsTitle', 'directionsText'); },
    export: function () {
      var b = map.getBounds();
      var bbox = [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()].map(function (v) { return v.toFixed(5); }).join(',');
      var url = location.origin + '/api/0.6/map?bbox=' + bbox;
      return { title: t('exportTitle'), html: '<p>' + t('exportText') + '</p><dl class="kv"><dt>bbox</dt><dd>' + bbox + '</dd></dl>' +
        '<div class="btn-row"><a class="btn primary" href="' + esc(url) + '" download="map.osm">' + t('exportBtn') + '</a></div><p>' + t('exportHint') + '</p>' };
    },
    layers: function () {
      var themeOpt = function (k, sw) {
        return '<label><input type="radio" name="theme" value="' + k + '"' + (state.theme === k ? ' checked' : '') + '><span><div class="sw" style="background:' + sw + '"></div>' + t(k) + '</span></label>';
      };
      var ck = function (k, label) { return '<label class="check"><input type="checkbox" data-ov="' + k + '"' + (state.ov[k] ? ' checked' : '') + '>' + t(label) + '</label>'; };
      return { title: t('layers'), html:
        '<h3>' + t('baseMap') + '</h3><div class="choice">' +
        themeOpt('standard', 'linear-gradient(135deg,#f2efe9 55%,#aad3df 55%)') + themeOpt('light', 'linear-gradient(135deg,#f3f4f6 55%,#cfe2ee 55%)') + themeOpt('dark', 'linear-gradient(135deg,#10151b 55%,#17364a 55%)') + '</div>' +
        '<h3>' + t('overlays') + '</h3>' + ck('buildings', 'ovBuildings') + ck('poi', 'ovPoi') + ck('boundaries', 'ovBoundaries') + ck('labels', 'ovLabels') };
    },
    legend: function () {
      var c = THEMES[state.theme];
      var row = function (sw, label, cls) { return '<div class="legend-row"><span class="legend-sw ' + (cls || '') + '" style="background:' + sw + '"></span>' + t(label) + '</div>'; };
      return { title: t('legend'), html: row(c.water, 'lgWater') + row(c.landuse, 'lgLanduse') + row(c.veg, 'lgVeg') + row(c.parking, 'lgParking') +
        row(c.road, 'lgRoad', 'line') + row(c.rail, 'lgRail', 'line') + row(c.bFill, 'lgBuilding') + row(c.poi, 'lgPoi', 'dot') };
    },
    share: function () {
      var c = map.getCenter(), z = Math.round(map.getZoom());
      var withMarker = !!(currentArg && currentArg.marker);
      var q = withMarker ? '?mlat=' + c.lat.toFixed(6) + '&mlon=' + c.lng.toFixed(6) : '';
      var link = location.origin + '/' + q + posHash();
      var geo = 'geo:' + c.lat.toFixed(6) + ',' + c.lng.toFixed(6) + '?z=' + z;
      var embed = '<iframe src="' + link + '" width="425" height="350" style="border:0" loading="lazy"></iframe>';
      return { title: t('share'), html:
        '<label class="check"><input type="checkbox" id="sh-marker"' + (withMarker ? ' checked' : '') + '>' + t('shMarker') + '</label>' +
        '<h3>' + t('shLink') + '</h3>' + field('sh-link', link) + '<h3>' + t('shGeo') + '</h3>' + field('sh-geo', geo) +
        '<h3>' + t('shEmbed') + '</h3>' + field('sh-embed', embed) };
    },
    where: function () {
      var c = map.getCenter();
      var f = featureAt(map.project(c), 14);
      return { title: t('whereTitle'), html:
        '<dl class="kv"><dt>' + t('coords') + '</dt><dd>' + c.lat.toFixed(6) + ', ' + c.lng.toFixed(6) + '</dd><dt>' + t('zoom') + '</dt><dd>' + map.getZoom().toFixed(1) + '</dd></dl>' +
        '<h3>' + t('nearest') + '</h3>' + featureHtml(f) +
        '<div class="btn-row"><a class="btn primary" href="' + editLink.getAttribute('href') + '">' + t('editThis') + '</a></div>' };
    },
    object: function (arg) {
      var ll = arg.lngLat;
      return { title: t('object'), html: featureHtml(arg.f) + '<dl class="kv"><dt>' + t('coords') + '</dt><dd>' + ll.lat.toFixed(6) + ', ' + ll.lng.toFixed(6) + '</dd></dl>' +
        '<div class="btn-row"><a class="btn primary" href="/edit/#map=19/' + ll.lat.toFixed(6) + '/' + ll.lng.toFixed(6) + '">' + t('editThis') + '</a></div>' };
    }
  };

  function markActive(name) {
    document.querySelectorAll('[data-panel]').forEach(function (b) { b.classList.toggle('active', b.dataset.panel === name && !b.closest('.btn-row')); });
  }
  function render() {
    if (!current) return;
    var p = PANELS[current](currentArg);
    sideTitle.textContent = p.title;
    sideBody.innerHTML = p.html;
    renderIcons(sideBody);
    sidebar.hidden = false;
    markActive(current);
  }
  function openPanel(name, arg) {
    if (current === name && name !== 'object' && !arg) { closePanel(); return; } // toggle
    current = name; currentArg = arg || null;
    render();
  }
  function closePanel() {
    current = null; currentArg = null; sidebar.hidden = true; markActive(null);
    store.set('welcomed', '1');
  }
  document.getElementById('side-close').onclick = closePanel;

  // Delegated clicks: panel openers, copy buttons, layer controls
  document.addEventListener('click', function (e) {
    var op = e.target.closest('[data-panel]');
    if (op) { document.getElementById('nav').classList.remove('open'); openPanel(op.dataset.panel); return; }
    var cp = e.target.closest('[data-copy]');
    if (cp) {
      var inp = document.getElementById(cp.dataset.copy);
      inp.select();
      if (navigator.clipboard) navigator.clipboard.writeText(inp.value).then(function () { toast(t('copied')); }, function () {});
      return;
    }
    if (!e.target.closest('.edit-split')) document.getElementById('edit-menu').hidden = true;
    if (!e.target.closest('.lang-wrap')) document.getElementById('lang-menu').hidden = true;
    if (!e.target.closest('#nav, #burger')) document.getElementById('nav').classList.remove('open');
  });
  sideBody.addEventListener('change', function (e) {
    var el = e.target;
    if (el.name === 'theme') {
      state.theme = el.value; store.set('theme', el.value);
      map.listImages().filter(function (id) { return id === 'oneway-arrow' || id === 'peak-icon' || id.indexOf('maki:') === 0; }).forEach(function (id) { map.removeImage(id); });
      map.setStyle(buildStyle());
    } else if (el.dataset.ov) {
      state.ov[el.dataset.ov] = el.checked; store.set('overlays', JSON.stringify(state.ov));
      map.setStyle(buildStyle());
    } else if (el.id === 'sh-marker') {
      var c = map.getCenter();
      if (el.checked) setMarker(c.lng, c.lat); else if (marker) { marker.remove(); marker = null; }
      currentArg = { marker: el.checked };
      render();
    }
  });

  // ── Top bar ─────────────────────────────────────────────────────────────
  document.getElementById('edit-more').onclick = function (e) { e.stopPropagation(); var m = document.getElementById('edit-menu'); m.hidden = !m.hidden; };
  document.getElementById('lang-btn').onclick = function (e) { e.stopPropagation(); var m = document.getElementById('lang-menu'); m.hidden = !m.hidden; };
  document.getElementById('burger').onclick = function (e) { e.stopPropagation(); document.getElementById('nav').classList.toggle('open'); };
  var langCode = document.getElementById('lang-code');
  function setLang(l) {
    I18N.set(l); langCode.textContent = l.toUpperCase();
    document.getElementById('lang-menu').hidden = true;
    render();
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) { b.onclick = function () { setLang(b.dataset.lang); }; });
  langCode.textContent = I18N.get().toUpperCase();

  // ── Tools ───────────────────────────────────────────────────────────────
  document.getElementById('zoom-in').onclick = function () { map.zoomIn(); };
  document.getElementById('zoom-out').onclick = function () { map.zoomOut(); };
  var meDot = null;
  document.getElementById('locate').onclick = function () {
    if (!navigator.geolocation) return toast(t('geoDenied'));
    navigator.geolocation.getCurrentPosition(function (p) {
      var ll = [p.coords.longitude, p.coords.latitude];
      if (!meDot) {
        var d = document.createElement('div');
        d.style.cssText = 'width:16px;height:16px;border-radius:50%;background:#2563eb;border:3px solid #fff;box-shadow:0 0 0 6px rgba(37,99,235,.25)';
        meDot = new maplibregl.Marker({ element: d });
      }
      meDot.setLngLat(ll).addTo(map);
      map.flyTo({ center: ll, zoom: Math.max(map.getZoom(), 16) });
    }, function () { toast(t('geoDenied')); });
  };

  // ── Search (coordinates for now) ────────────────────────────────────────
  var form = document.getElementById('search'), q = document.getElementById('q');
  form.onsubmit = function (e) {
    e.preventDefault();
    var m = /^\s*(-?\d+(?:\.\d+)?)\s*[,;\s]\s*(-?\d+(?:\.\d+)?)\s*$/.exec(q.value);
    if (m && Math.abs(+m[1]) <= 90 && Math.abs(+m[2]) <= 180) {
      map.flyTo({ center: [+m[2], +m[1]], zoom: 17 });
      setMarker(+m[2], +m[1]);
    } else {
      toast(t('searchNothing'));
    }
  };
  document.getElementById('where').onclick = function () { current = null; openPanel('where'); };
  document.getElementById('directions').onclick = function () { openPanel('directions'); };

  // ── Account chip: login state comes from the Django session cookie (see /api/auth/) ──
  (function () {
    var guest = document.getElementById('auth-guest'), box = document.getElementById('auth-user');
    var menu = document.getElementById('user-menu');
    function here() { return location.pathname + location.search + location.hash; }
    ['login-link', 'signup-link'].forEach(function (id) {
      var a = document.getElementById(id), href = a.getAttribute('href');
      a.addEventListener('click', function () { a.href = href + '?next=' + encodeURIComponent(here()); });
    });
    document.getElementById('user-btn').onclick = function (e) { e.stopPropagation(); menu.hidden = !menu.hidden; };
    document.addEventListener('click', function () { menu.hidden = true; });
    document.getElementById('logout-btn').onclick = function () {
      var m = document.cookie.match(/(?:^|; )csrftoken=([^;]*)/);
      fetch('/api/auth/logout/', { method: 'POST', credentials: 'same-origin', headers: { 'X-CSRFToken': m ? decodeURIComponent(m[1]) : '' } })
        .then(function () { location.reload(); });
    };
    fetch('/api/auth/me/', { credentials: 'same-origin' }).then(function (r) { return r.json(); }).then(function (d) {
      if (!d.authenticated) return;
      guest.hidden = true; box.hidden = false;
      document.getElementById('user-name').textContent = d.user.display_name;
      document.getElementById('user-initial').textContent = (d.user.display_name || '?').charAt(0).toUpperCase();
    }, function () { /* offline: stay in guest mode */ });
  })();

  // ── Boot ────────────────────────────────────────────────────────────────
  renderIcons();
  I18N.apply();
  if (!store.get('welcomed', '') && !qs.has('mlat')) openPanel('welcome');
})();
