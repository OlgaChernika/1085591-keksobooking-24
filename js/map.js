import {activateForms} from './form-states.js';
import {getAdsArray, ADS_LIST_LENGTH, DECIMALS} from './data.js';
import {createCard} from './render-advertisements.js';

const START_LOCATION = {
  lat: 35.68172,
  lng: 139.75392,
};

const adForm = document.querySelector('.ad-form');
const addressInput = document.querySelector('#address');
const interactiveMap = L.map('map-canvas');
const offersArray = getAdsArray(ADS_LIST_LENGTH);
const markersGroup = L.layerGroup();


const addMarkersGroup = () => {
  markersGroup.addTo(interactiveMap);

  const createPopupMarker = (offer) => {
    const marker = L.marker(
      offer.location,
      {icon: L.icon({
        iconUrl: './img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      }),
      },
    );
    marker
      .addTo(markersGroup)
      .bindPopup(createCard(offer));

    return marker;
  };

  offersArray.map((offer) => createPopupMarker(offer));
};

const setLocation = (target) => {
  const location = target.getLatLng();
  addressInput.value = `${location.lat.toFixed(DECIMALS)}, ${location.lng.toFixed(DECIMALS)}`;
};

const onMarkerMove = (evt) => setLocation(evt.target);

export const initMap = () => {
  interactiveMap.on('load', () => {
    activateForms(adForm);
    addMarkersGroup();
  }).setView(START_LOCATION, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
    {
      foo: 'bar',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(interactiveMap);

  const interactiveMarker = L.marker(START_LOCATION,
    {
      draggable: true,
      icon: L.icon({
        iconUrl: './img/main-pin.svg',
        iconSize: [52, 52],
        iconAnchor: [26, 52],
      }),
    }).addTo(interactiveMap);

  addressInput.value = `${START_LOCATION.lat}, ${START_LOCATION.lng}`;

  interactiveMarker.on('moveend', onMarkerMove);
};

