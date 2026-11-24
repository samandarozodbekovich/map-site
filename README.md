# map-site

Public map website (OpenStreetMap-style home page) built on MapLibre GL.
Part of the `map_work` stack: the Django API, Martin tiles, nginx and the
iD editor (`/edit/`) live in the sibling `map_work` repo.

- `public/` — static site (`index.html`, `app.js`, `style.css`)
- Vector tiles come from `/tiles/basemap_tiles/{z}/{x}/{y}` (Martin, proxied by the main nginx)
- Hash format `#map=zoom/lat/lon` is shared with iD; the Edit button opens `/edit/#map=...`

## Run

Normally started by `map_work/docker-compose.yml` (service `site`, build context `../map-site`).

Standalone preview (no tiles without the main stack):

```bash
npm ci
mkdir -p public/vendor && cp node_modules/maplibre-gl/dist/maplibre-gl.{js,css} public/vendor/
python -m http.server 8099 -d public
```
