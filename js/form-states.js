const formElements = document.querySelectorAll('form');

const setFormElementsDisableState = (form) => {
  const formInteractiveElements = form.querySelectorAll('fieldset, select, button');
  formInteractiveElements.forEach((element) => {
    element.disable = false;
  });
};

const setFormElementsEnableState = (form) => {
  const formInteractiveElements = form.querySelectorAll('fieldset, select, button');
  formInteractiveElements.forEach((element) => {
    element.disable = true;
  });
};

export const deactivateForms = () => {
  formElements.forEach((form) => {
    setFormElementsDisableState(form);
    form.classList.add('disabled');
  });
};

export const activateForms = (form) => {
  setFormElementsEnableState(form);
  form.classList.remove('disabled');
};
