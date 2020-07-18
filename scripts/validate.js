function showErrorDesc(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__text-field_error');
  errorElement.textContent = errorMessage;
}

function hideErrorDesc(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__text-field_error');
  errorElement.textContent = '';
}

function checkValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showErrorDesc(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideErrorDesc(formElement, inputElement);
  }
};

function resetErrors(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__text-field'));
  const submitButton = form.querySelector('.popup__save-button');
  inputList.forEach((inputElement) => {
    hideErrorDesc(form, inputElement);
    toggleSubmitButton(inputList, submitButton);
  });
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text-field'));
  const submitButton = formElement.querySelector('.popup__save-button');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement);
      toggleSubmitButton(inputList, submitButton);
    });
  });
}

function enableValidation({formSelector}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
      });
    setEventListeners(formElement);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleSubmitButton(inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('popup__save-button_disabled');
  } else {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('popup__save-button_disabled');
  }
}

enableValidation({
  formSelector: '.popup__form-container',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-field_error',
  errorClass: 'popup__input-error'
});
