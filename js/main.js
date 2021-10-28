import {getAdsArray, ADS_LIST_LENGTH} from './data.js';
import {getAds} from './render-advertisement.js';
import {deactivateForms, activateForms} from './form-states.js';
import {initFormValidation} from './form-validation.js';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');

deactivateForms();
activateForms(adForm);
activateForms(filterForm);
initFormValidation();

const adsArray = getAdsArray(ADS_LIST_LENGTH);
const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(getAds(adsArray).childNodes[0]);

