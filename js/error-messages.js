import {isEcsEvt, renderElement} from './utils.js';

const GET_ERROR_TEXT = 'Ошибка при загрузке данных';
const POST_ERROR_TEXT = 'Ошибка размещения объявления';

const createErrorTemplate = (text, buttonState) =>  `<div class="error">
                                                    <p class="error__message">${text}</p>
                                                    ${buttonState ? '<button type="button" class="error__button">Попробовать снова</button>' : ''}
                                                  </div>`;

const removeError = () => {
  document.querySelector('.error').remove();
};

const onErrorClick = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.error')) {
    removeError();
  }
};

const onErrorKeydown = (evt) => {
  evt.preventDefault();
  if (isEcsEvt(evt) && document.querySelector('.error')) {
    removeError();
  }
};

const addListeners = () => {
  document.addEventListener('click', onErrorClick, {once: true});
  document.addEventListener('keydown', onErrorKeydown, {once: true});
};

export const renderGetErrorMessage = () => {
  renderElement(document.body, createErrorTemplate(GET_ERROR_TEXT, false));
  addListeners();
};

export const renderPostErrorMessage = () => {
  renderElement(document.body, createErrorTemplate(POST_ERROR_TEXT, true));
  addListeners();
};
