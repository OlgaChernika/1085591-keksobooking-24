import {getAdsArray, ADS_LIST_LENGTH} from './create-ad.js';
import{createCard} from './ad-card.js';
import{deactivateForms, activateForms} from './form-states.js';

const adsArray = getAdsArray(ADS_LIST_LENGTH);

const getAds = (array) => {
  const fragment = document.createDocumentFragment();
  array.forEach((ad) => {
    const card = createCard(ad);
    fragment.appendChild(card);
  });

  return fragment;
};

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(getAds(adsArray).childNodes[0]);

const adForm = document.querySelector('.ad-form');

deactivateForms();
activateForms(adForm);
