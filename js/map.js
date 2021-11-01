import {activateForms} from './form-states.js';
import {getAdsArray, ADS_LIST_LENGTH, DECIMALS} from './data.js';
import {createCard} from './render-advertisements.js';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const addressInput = document.querySelector('#address');
const resetFormButton = document.querySelector('.ad-form__reset');

export const map = L.map('map-canvas');

const START_LOCATION = {
  lat: 35.68172,
  lng: 139.75392,
};

const interactivePinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const advertisementPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const interactiveMarker = L.marker(START_LOCATION, {draggable: true, icon: interactivePinIcon});

interactiveMarker.addTo(map);

const setLocation = (target) => {
  const location = target.getLatLng();
  addressInput.value = `${location.lat.toFixed(DECIMALS)}, ${location.lng.toFixed(DECIMALS)}`;
};

const onMarkerMoveend = (evt) => setLocation(evt.target);

interactiveMarker.on('moveend', onMarkerMoveend);

map.setView(START_LOCATION, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
  {
    foo: 'bar',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const offersArray = getAdsArray(ADS_LIST_LENGTH);

const createPopupMarker = (offer) => {
  const marker = L.marker(
    offer.location,
    {icon: advertisementPinIcon},
  );
  marker
    .addTo(markerGroup)
    .bindPopup(createCard(offer));

  return marker;
};

offersArray.map((offer) => createPopupMarker(offer));

const cleanMap = () => {
  markerGroup.clearLayers();
};

resetFormButton.addEventListener('click', () => {
  cleanMap();
  interactiveMarker.setLatLng(START_LOCATION);
  map.setView(START_LOCATION);
});

export const onMapLoad = () => {
  activateForms(filterForm);
  activateForms(adForm);
};
