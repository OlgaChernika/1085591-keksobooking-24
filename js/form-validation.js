import {inclineWord} from './utils.js';

const TYPE_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const titleInput = document.querySelector('#title');
//const timeInSelect = document.querySelector('#timein');
//const timeOutSelect = document.querySelector('#timeout');
const typeSelect = document.querySelector('#type');
const priceSelect = document.querySelector('#price');
const roomSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');

capacitySelect.value = roomSelect.value;

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

const onCapacityChange = (evt) => {
  const selectedValue = (evt.target.value === '100') ? '0' : evt.target.value;
  for (let i = 0; i < capacitySelect.length; i++) {
    capacitySelect[i].disabled = true;
    if (capacitySelect[i].value === selectedValue) {
      capacitySelect[i].disabled = false;
    }
    if (capacitySelect[i].value <= selectedValue && capacitySelect[i].value > 0) {
      capacitySelect[i].disabled = false;
    }
  }
};

export const initFormValidation = () =>{
  titleInput.addEventListener('input', onTitleInput);
  typeSelect.addEventListener('change', onPriceChange);
  roomSelect.addEventListener('change', onCapacityChange);
};

