import {activateForms} from './form-states.js';
import {createCard} from './render-advertisements.js';
import {getData} from './api.js';
import {renderGetErrorMessage, renderPostErrorMessage} from './error-messages.js';
import { addPhotoInputsListeners } from './preload-images.js';
import { initFormValidation, setAdFormSubmit } from './form-validation.js';
import { renderSuccessMessage } from './success-message.js';

export const START_LOCATION = {
  lat: 35.68172,
  lng: 139.75392,
};

const DECIMALS = 5;

export const adForm = document.querySelector('.ad-form');
const addressInput = document.querySelector('#address');
export const interactiveMap = L.map('map-canvas');
const markersGroup = L.layerGroup();
export let interactiveMarker;

export const addMarkersGroup = (data) => {
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
  data.map((offer) => createPopupMarker(offer));
};

export const setStartAddressValue = () => {
  addressInput.value = `${START_LOCATION.lat}, ${START_LOCATION.lng}`;
};

const activateAdForm = () => {
  activateForms(adForm);
  setStartAddressValue();
  addPhotoInputsListeners();
  initFormValidation();
  setAdFormSubmit(renderSuccessMessage, renderPostErrorMessage);
};

const setLocation = (target) => {
  const location = target.getLatLng();
  addressInput.value = `${location.lat.toFixed(DECIMALS)}, ${location.lng.toFixed(DECIMALS)}`;
};

const onMarkerMove = (evt) => setLocation(evt.target);

export const initMap = () => {
  interactiveMap.on('load', () => {
    getData(addMarkersGroup, renderGetErrorMessage);
    activateAdForm();
  }).setView(START_LOCATION, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
    {
      foo: 'bar',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(interactiveMap);

  interactiveMarker = L.marker(START_LOCATION,
    {
      draggable: true,
      icon: L.icon({
        iconUrl: './img/main-pin.svg',
        iconSize: [52, 52],
        iconAnchor: [26, 52],
      }),
    }).addTo(interactiveMap);

  interactiveMarker.on('moveend', onMarkerMove);
};

export const resetMap = () => {
  interactiveMarker.setLatLng(START_LOCATION);
  interactiveMap.setView(START_LOCATION);
};
