import {adForm, resetMap, setStartAddressValue} from './map.js';
import {clearImageBlocks} from './preload-images.js';
import {isEcsEvt, renderElement} from './utils.js';

const createSuccessTemplate = () => { `<div class="success">
                                      <p class="success__message">Ваше объявление<br>успешно размещено!</p>
                                    </div>`;

};

const onSuccessClick = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.success')) {
    document.querySelector('.success').remove();
  }
};

const onSuccessKeydown = (evt) => {
  evt.preventDefault();
  if (isEcsEvt(evt)) {
    document.querySelector('.success').remove();
  }
};

const addListeners = () => {
  document.addEventListener('click', onSuccessClick, {once: true});
  document.addEventListener('keydown', onSuccessKeydown, {once: true});
};

export const renderSuccessMessage = () => {
  renderElement(document.body, createSuccessTemplate);
  addListeners();
  adForm.reset();
  resetMap();
  setStartAddressValue();
  clearImageBlocks();
};
