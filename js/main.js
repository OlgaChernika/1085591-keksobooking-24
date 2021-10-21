import {getAdsArray} from './create-ad.js';
//import {ADS_LIST_LENGTH} from './data.js';
import{createCard} from './ad-card.js';

const adsArray = getAdsArray(2);

const getAds = (array) => {
  const fragment = document.createDocumentFragment();
  array.forEach((ad) => {
    const card = createCard(ad);
    fragment.appendChild(card);
  });

  return fragment;
};

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(getAds(adsArray));
//console.log(getAds(adsArray));
