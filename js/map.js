import {activateForms} from './form-states.js';
import {createCard} from './render-advertisements.js';
import {getData} from './api.js';
import {renderGetErrorMessage, renderPostErrorMessage} from './error-messages.js';
import {addPhotoInputsListeners} from './preload-images.js';
import {initFormValidation, setAdFormActions} from './form-validation.js';
import {renderSuccessMessage} from './success-message.js';
import {filterData, setDataRanking} from './offer-filter.js';

export const START_LOCATION = {
  lat: 35.68172,
  lng: 139.75392,
};

const DECIMALS = 5;
const OFFERS_AMOUNT = 10;
const TIME_INTERVAL = 500;

const adForm = document.querySelector('.ad-form');
const formFilter = document.querySelector('.map__filters');
const addressInput = document.querySelector('#address');
const interactiveMap = L.map('map-canvas');
const markersGroup = L.layerGroup();
let interactiveMarker;
let marker;
let timer;

export const addMarkersGroup = (data) => {
  markersGroup.addTo(interactiveMap);
  setDataRanking(data)
    .slice()
    .filter(filterData)
    .slice(0, OFFERS_AMOUNT)
    .forEach((offer) => {
      marker = L.marker(
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
    });
};

export const setStartAddressValue = () => {
  addressInput.value = `${START_LOCATION.lat}, ${START_LOCATION.lng}`;
};

const activateAdForm = () => {
  activateForms(adForm);
  setStartAddressValue();
  addPhotoInputsListeners();
  initFormValidation();
  setAdFormActions(renderSuccessMessage, renderPostErrorMessage);
};

const setLocation = (target) => {
  const location = target.getLatLng();
  addressInput.value = `${location.lat.toFixed(DECIMALS)}, ${location.lng.toFixed(DECIMALS)}`;
};

const onMarkerMove = (evt) => setLocation(evt.target);


export const resetMap = () => {
  interactiveMarker.setLatLng(START_LOCATION);
  interactiveMap.setView(START_LOCATION, 12);
};

const setMapChange = (data) => {
  formFilter.addEventListener('change', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      markersGroup.clearLayers();
      resetMap();
      addMarkersGroup(data);
    }, TIME_INTERVAL);
  });
};

const getDataCallback = (data) => {
  addMarkersGroup(data);
  activateForms(document.querySelector('.map__filters'));
  setMapChange(data);
};

export const initMap = () => {
  interactiveMap.on('load', () => {
    getData(getDataCallback, renderGetErrorMessage);
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
