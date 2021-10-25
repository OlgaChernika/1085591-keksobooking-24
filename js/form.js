const deactivateForms = () => {
  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    form.classList.add(`${form.classList[0]}--disabled`);

    const fieldsets = form.querySelectorAll('fieldset');
    const selectControls = form.querySelectorAll('select');

    fieldsets.forEach((fieldset) => {
      fieldset.setAttribute('disabled', '');
    });

    selectControls.forEach((select) => {
      select.setAttribute('disabled', '');
    });
  });
};

const activateForms = () => {
  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    form.classList.remove(`${form.classList[0]}--disabled`);

    const fieldsets = form.querySelectorAll('fieldset');
    const selectControls = form.querySelectorAll('select');

    fieldsets.forEach((fieldset) => {
      fieldset.removeAttribute('disabled');
    });


    selectControls.forEach((select) => {
      select.removeAttribute('disabled');
    });
  });
};

export{deactivateForms, activateForms};
