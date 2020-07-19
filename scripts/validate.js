function showErrorDesc(formElement, inputElement, errorMessage, inputErrorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
}

function hideErrorDesc(formElement, inputElement, inputErrorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
}

function checkValidity(formElement, inputElement, inputErrorClass) {
  if (!inputElement.validity.valid) {
    showErrorDesc(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
  } else {
    hideErrorDesc(formElement, inputElement, inputErrorClass);
  }
}

function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement, inputErrorClass);
      toggleSubmitButton(inputList, submitButton, inactiveButtonClass);
    });
  });
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
      });
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleSubmitButton(inputList, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(inactiveButtonClass);
  }
}

enableValidation({
  formSelector: '.popup__form-container',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-field_error'
});
