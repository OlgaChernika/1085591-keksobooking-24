import {wordEndings, inclineWord} from './utils.js';

const TYPE_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

wordEndings['symbolsEndings'];

export const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
//const timeInSelect = adForm.querySelector('#timein');
//const timeOutSelect = adForm.querySelector('#timeout');
const typeSelect = adForm.querySelector('#type');
const priceSelect = adForm.querySelector('#price');
//const roomSelect = adForm.querySelector('#room_number');
//const capacitySelect = adForm.querySelector('#capacity');

const onTitleInput = () => {
  const valueLength = titleInput.value.length;

  if(valueLength === 0) {
    titleInput.setCustomValidity('Поле обязательно для заполнения');
  } else if(valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Слишком короткий заголовок, введите ещё ${inclineWord((MIN_TITLE_LENGTH - valueLength), 'symbolsEndings')}`);
  } else if(valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Слишком длинный заголовок, удалите ${inclineWord((valueLength - MAX_TITLE_LENGTH), 'symbolsEndings')}`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
};

const onPriceChange = () => {
  priceSelect.min = TYPE_MIN_PRICE[typeSelect.value];
  priceSelect.placeholder = TYPE_MIN_PRICE[typeSelect.value];
};

titleInput.addEventListener('input', onTitleInput);
typeSelect.addEventListener('change', onPriceChange);
