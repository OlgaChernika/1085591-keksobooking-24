import {getAdsArray, ADS_LIST_LENGTH} from './data.js';
import {getAds} from './render-advertisement.js';
import {deactivateForms, activateForms} from './form-states.js';
import {adForm} from './form-validation.js';

deactivateForms();
activateForms(adForm);

const adsArray = getAdsArray(ADS_LIST_LENGTH);
const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(getAds(adsArray).childNodes[0]);

