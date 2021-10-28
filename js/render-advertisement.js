import {wordEndings, inclineWord} from './utils.js';

wordEndings['guestsEndings'];
//wordEndings['roomsEndings'];

const TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const renderSimpleText = (parent, cssClass, data) => {
  if (data) {
    parent.querySelector(cssClass).textContent = data;
    return;
  }

  parent.querySelector(cssClass).remove();
};


const renderPriceText = (parent, cssClass, data) => {
  if (data) {
    parent.querySelector(cssClass).innerHTML = `${data} <span>₽/ночь</span>`;
    return;
  }

  parent.querySelector(cssClass).remove();
};

const renderAvatarLink = (parent, cssClass, data) => {
  if (data) {
    parent.querySelector(cssClass).src = data;
    return;
  }

  parent.querySelector(cssClass).remove();
};

const renderFeatures = (parent, cssClass, data) => {
  if(typeof data === 'object' && data.length) {
    const content = data.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`)
      .join('\n');

    return parent.querySelector(cssClass).innerHTML = content;
  }

  parent.querySelector(cssClass).remove();
};

const renderPhotos = (parent, cssClass, data) => {
  if(typeof data === 'object' && data.length) {
    const content = data.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)
      .join('\n');

    parent.querySelector(cssClass).innerHTML = content;
    return;
  }

  parent.querySelector(cssClass).remove();
};

const renderCapacity = (parent, cssClass, roomsData, guestsData) => {
  if (roomsData || guestsData) {
    const roomsContent = roomsData ? `${inclineWord(roomsData, 'roomsEndings')} ` : '';
    const guestsContent = guestsData ? `для ${inclineWord(guestsData, 'guestsEndings')} ` : '';
    parent.querySelector(cssClass).textContent = `${roomsContent}${guestsContent}`;
    return;
  }

  parent.querySelector(cssClass).remove();
};

const renderCheckTime = (parent, cssClass, checkInData, checkOutData) => {
  if (checkInData || checkOutData) {
    const checkInContent = checkInData ? `Заезд после ${checkInData}` : '';
    const checkOutContent = checkOutData ? `выезд до ${checkOutData}` : '';
    const separator = checkInData && checkOutData ? ', ' : '';
    parent.querySelector(cssClass).textContent = `${checkInContent}${separator}${checkOutContent}`;
    return;
  }

  parent.querySelector(cssClass).remove();
};

export const createCard = ({author, offer}) => {

  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.querySelector('.popup');
  const newCard = card.cloneNode(true);

  renderSimpleText(newCard, '.popup__title', offer.title);
  renderSimpleText(newCard, '.popup__text--address', offer.address);
  renderSimpleText(newCard, '.popup__type', TYPES[offer.type]);
  renderSimpleText(newCard, '.popup__description', offer.description);
  renderPriceText(newCard, '.popup__text--price', offer.price);
  renderAvatarLink(newCard, '.popup__avatar', author.avatar);
  renderFeatures(newCard, '.popup__features', offer.features);
  renderPhotos(newCard, '.popup__photos', offer.photos);
  renderCapacity(newCard, '.popup__text--capacity', offer.rooms, offer.guests);
  renderCheckTime(newCard, '.popup__text--time', offer.checkin, offer.checkout);

  return newCard;
};
