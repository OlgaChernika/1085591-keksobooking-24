import {isEcsEvt, renderElement} from './utils.js';

const getDataErrorText = 'Ошибка при загрузке данных';
const postDataErrorText = 'Ошибка размещения объявления';

const createErrorTemplate = (text, buttonState) =>  `<div class="error">
                                                    <p class="error__message">${text}</p>
                                                    ${buttonState ? '<button type="button" class="error__button">Попробовать снова</button>' : ''}
                                                  </div>`;

const onErrorClick = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.error')) {
    document.querySelector('.error').remove();
  }
};

const onErrorKeydown = (evt) => {
  evt.preventDefault();
  if (isEcsEvt(evt) && document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
};

const addListeners = () => {
  document.addEventListener('click', onErrorClick, {once: true});
  document.addEventListener('keydown', onErrorKeydown, {once: true});
};

export const renderGetErrorMessage = () => {
  renderElement(document.body, createErrorTemplate(getDataErrorText, false));
  addListeners();
};

export const renderPostErrorMessage = () => {
  renderElement(document.body, createErrorTemplate(postDataErrorText, true));
  addListeners();
};
