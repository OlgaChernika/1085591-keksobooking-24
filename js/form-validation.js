import {inclineWord} from './utils.js';
import {resetMap, setStartAddressValue} from './map.js';
import {postData} from './api.js';
import {clearImageBlocks} from './preload-images.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const typeToPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const roomsToOptions = {
  '1': '1',
  '2': '2',
  '3': '3',
  '100': '0',
};

const adForm = document.querySelector('.ad-form');
const titleInput = document.querySelector('#title');
const timeInSelect = document.querySelector('#timein');
const timeOutSelect = document.querySelector('#timeout');
const typeSelect = document.querySelector('#type');
const priceSelect = document.querySelector('#price');
const roomSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');
const capacityOptions = document.querySelectorAll('#capacity option');
const mapFilter = document.querySelector('.map__filters');

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

const setPriceState = () => {
  priceSelect.min = typeToPrice[typeSelect.value];
  priceSelect.placeholder = typeToPrice[typeSelect.value];
};

const onPriceChange = () => setPriceState();

const setCapacityState = () => {
  const selectedValue = (roomSelect.value === '100') ? '0' : roomSelect.value;
  capacityOptions.forEach((option) => {
    option.disabled = true;
    if (option.value === selectedValue) {
      option.disabled = false;
    }
    if (option.value <= selectedValue && option.value > 0) {
      option.disabled = false;
    }
  });

  capacitySelect.value = roomsToOptions[roomSelect.value];
};

const onTimeOutChange = ({target}) => {
  timeOutSelect.value = target.value;
};

const onTimeInChange = ({target}) => {
  timeInSelect.value = target.value;
};

const onCapacityChange = () => setCapacityState();

export const resetFilter = () => {
  mapFilter.reset();
  const event = new Event('change');
  mapFilter.dispatchEvent(event);
};

export const initFormValidation = () => {
  setCapacityState();
  setPriceState();
  timeInSelect.value = timeOutSelect.value;
  titleInput.addEventListener('input', onTitleInput);
  typeSelect.addEventListener('change', onPriceChange);
  roomSelect.addEventListener('change', onCapacityChange);
  timeInSelect.addEventListener('change', onTimeOutChange);
  timeOutSelect.addEventListener('change', onTimeInChange);
};

export const setAdFormActions = (onSuccess, onError) => {
  initFormValidation();

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(adForm);

    postData(onSuccess, onError, formData);
  });

  adForm.addEventListener('reset', () => {
    resetMap();
    clearImageBlocks();
    resetFilter();
    setTimeout(() => {
      setStartAddressValue();
      setCapacityState();
      setPriceState();
    });
  });
};
