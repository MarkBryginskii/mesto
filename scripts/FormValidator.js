class FormValidator {
  constructor(obj, popup) {
    this._formSelector = obj.formSelector;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._popup = popup;
  }

  _showErrorDesc(formElement, inputElement, errorMessage, inputErrorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideErrorDesc(formElement, inputElement, inputErrorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
  }

  _checkValidity(formElement, inputElement, inputErrorClass) {
    if (!inputElement.validity.valid) {
      this._showErrorDesc(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
    } else {
      this._hideErrorDesc(formElement, inputElement, inputErrorClass);
    }
  }

  _setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValidity(formElement, inputElement, inputErrorClass);
        this._toggleSubmitButton(inputList, submitButton, inactiveButtonClass);
      });
    });
  }

  enableValidation() {
    const popup = document.querySelector(this._popup);
    const formElement = popup.querySelector(this._formSelector);

    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
      });

    this._setEventListeners(formElement, this._inputSelector, this._submitButtonSelector, this._inactiveButtonClass, this._inputErrorClass);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleSubmitButton(inputList, submitButton, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.setAttribute('disabled', true);
      submitButton.classList.add(inactiveButtonClass);
    } else {
      submitButton.removeAttribute('disabled');
      submitButton.classList.remove(inactiveButtonClass);
    }
  }
}

export default FormValidator;
