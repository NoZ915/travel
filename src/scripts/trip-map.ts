import L from 'leaflet';

type CityPoint = {
  name: string;
  label?: string;
  lat: number;
  lng: number;
  note?: string;
};

const initializedMaps = new WeakSet<HTMLElement>();

function parseCities(raw: string | undefined): CityPoint[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function createNumberedIcon(index: number): L.DivIcon {
  return L.divIcon({
    className: 'trip-marker',
    html: `<span class="trip-marker-inner">${index + 1}</span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
}

function initMap(container: HTMLElement) {
  if (initializedMaps.has(container)) return;

  const cities = parseCities(container.dataset.cities);
  if (cities.length === 0) return;

  initializedMaps.add(container);

  const map = L.map(container, {
    scrollWheelZoom: false,
    zoomControl: false,
    attributionControl: false,
  });

  // Zoom control on top-right
  L.control.zoom({ position: 'topright' }).addTo(map);

  // Attribution on bottom-right
  L.control.attribution({ position: 'bottomright', prefix: false })
    .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> &middot; <a href="https://carto.com/" target="_blank">CARTO</a>')
    .addTo(map);

  // Use CARTO Voyager — cleaner, warmer style
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    subdomains: 'abcd',
  }).addTo(map);

  const latlngs: [number, number][] = [];

  cities.forEach((city, index) => {
    const latlng: [number, number] = [city.lat, city.lng];
    latlngs.push(latlng);

    const marker = L.marker(latlng, {
      icon: createNumberedIcon(index),
    }).addTo(map);

    const safeNote = city.note ? `<p style="margin:0.25rem 0 0;font-size:0.82rem;color:#6b6b6b;">${city.note}</p>` : '';

    marker.bindPopup(`
      <div style="font-family:'Noto Sans TC',sans-serif;line-height:1.5;min-width:140px;">
        <strong style="font-size:0.92rem;color:#2c2c2c;">${city.label ?? city.name}</strong>
        ${safeNote}
      </div>
    `, { closeButton: false, offset: [0, -4] });
  });

  // Animated dashed route
  if (latlngs.length > 1) {
    // Shadow line
    L.polyline(latlngs, {
      color: '#c0392b',
      weight: 5,
      opacity: 0.12,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);

    // Main route
    L.polyline(latlngs, {
      color: '#c0392b',
      weight: 2.5,
      opacity: 0.7,
      dashArray: '8 6',
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);
  }

  const bounds = L.latLngBounds(latlngs);
  map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
}

document.querySelectorAll<HTMLElement>('[data-trip-map]').forEach(initMap);
