import {TITLES, TYPES, TIME, FEATURES, DESCRIPTIONS, PHOTOS, DECIMALS} from './data.js';
import {getRandomInt, createRandomArray} from './utils.js';
import {pathArray} from './avatar-path.js';

const createNewAd = (i) => {
  const checkTime = TIME[getRandomInt(0, TIME.length - 1)];
  const location = {
    lat: getRandomInt(35.65000, 35.70000, DECIMALS),
    lng: getRandomInt(139.70000, 139.80000, DECIMALS),
  };

  const arrayOfTypesKeys = Array.from(Object.keys(TYPES));
  const randomKeyOfTypes = arrayOfTypesKeys[getRandomInt(0, arrayOfTypesKeys.length - 1)];

  return {
    author: {
      avatar: pathArray[i],
    },
    offer: {
      title: TITLES[randomKeyOfTypes],
      address: `${location.lat}, ${location.lng}`,
      price: getRandomInt(0, 1000000),
      type: TYPES[randomKeyOfTypes],
      rooms: getRandomInt(1, 10),
      guests: getRandomInt(1, 10),
      checkin: checkTime,
      checkout: checkTime,
      features: createRandomArray(FEATURES),
      description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
      photos: createRandomArray(PHOTOS),
    },
    location,
  };
};

const getAdsArray = (arrayLength) => {
  const adsList = [];
  for(let index = 0; index < arrayLength; index++) {
    adsList.push(createNewAd(index));
  }
  return adsList;
};

export {getAdsArray};
