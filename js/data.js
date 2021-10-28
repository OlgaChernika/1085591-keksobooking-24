import {getRandomInt, shuffle} from './utils.js';
import {createCard} from './render-advertisement.js';

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const TITLES = ['Большой уютный номер', 'Квартира с панорамным видом на город', 'Небольшой уютный бунгало', 'Трехэтажный особняк с бассейном', 'Гостевой дом с открытой верандой'];

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'До метро и вокзала буквально 4 минуты пешком. Рядом круглосуточный магазин, аптека. Поблизости много ресторанов, кафе.',
  'Есть все необходимое для проживания. Недавно был сделан ремонт, так что в действительности даже лучше, чем на фото.',
  'Все продумано до мелочей. Есть все условия для комфортного проживания. Спокойный жилой район, рядом метро и парки.',
  'Прекрасное расположение, уютный и тихий двор. Всё продумано до мелочей!',
  'Удобное расположение, бесконтактное заселение. Есть все для кратковременного проживания.',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const ADS_LIST_LENGTH = 10;

const DECIMALS = 5;

const PATH = 'img/avatars/user';

const mapCanvas = document.querySelector('#map-canvas');

const createAvatarPathArray = () => {
  const array = [];
  for (let i = 1; i <= ADS_LIST_LENGTH; i++) {
    if (i < ADS_LIST_LENGTH) {
      i = `0${i}`;
    }
    array.push(`${PATH}${i}.png`);
  }
  return shuffle(array);
};

const pathArray = createAvatarPathArray();

const getRandomElement = (array) => {
  const elementIndex = getRandomInt(0, array.length - 1);
  const randomElement = array[elementIndex];

  array.slice(elementIndex, 1);
  return randomElement;
};

const createRandomArray = (array) => {
  const randomArray = [];
  const copiedArray = array.slice();
  const arrayLength = getRandomInt(1, array.length);

  for (let i = 0; i < arrayLength; i++) {
    const arrayElement = getRandomElement(copiedArray);
    randomArray.push(arrayElement);
  }

  return Array.from(new Set(randomArray));
};


const createNewAd = (i) => {
  const checkTime = TIME[getRandomInt(0, TIME.length - 1)];
  const location = {
    lat: getRandomInt(35.65000, 35.70000, DECIMALS),
    lng: getRandomInt(139.70000, 139.80000, DECIMALS),
  };

  return {
    author: {
      avatar: pathArray[i],
    },
    offer: {
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      address: `${location.lat}, ${location.lng}`,
      price: getRandomInt(0, 1000),
      type: TYPES[getRandomInt(0, TYPES.length - 1)],
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

const adsArray = getAdsArray(ADS_LIST_LENGTH);

const getAds = (array) => {
  const fragment = document.createDocumentFragment();
  array.forEach((ad) => {
    const card = createCard(ad);
    fragment.appendChild(card);
  });

  return fragment;
};

mapCanvas.appendChild(getAds(adsArray).childNodes[0]);
