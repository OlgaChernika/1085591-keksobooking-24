import {initFormValidation} from './form-validation.js';
import {resetMap, setStartAddressValue} from './map.js';
import {clearImageBlocks} from './preload-images.js';
import {isEcsEvt, renderElement} from './utils.js';

const createSuccessTemplate = () => { `<div class="success">
                                      <p class="success__message">Ваше объявление<br>успешно размещено!</p>
                                    </div>`;

};

const removeSuccess = () => {
  document.querySelector('.success').remove();
};

const onSuccessClick = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.success')) {
    removeSuccess();
  }
};

const onSuccessKeydown = (evt) => {
  evt.preventDefault();
  if (isEcsEvt(evt) && document.querySelector('.success')) {
    removeSuccess();
  }
};

const addListeners = () => {
  document.addEventListener('click', onSuccessClick, {once: true});
  document.addEventListener('keydown', onSuccessKeydown, {once: true});
};

export const renderSuccessMessage = () => {
  renderElement(document.body, createSuccessTemplate);
  addListeners();
  document.querySelector('.ad-form').reset();
  resetMap();
  setStartAddressValue();
  clearImageBlocks();
  initFormValidation();
};
