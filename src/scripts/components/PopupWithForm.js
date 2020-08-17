import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor({submitCallBack}, popup) {
    super(popup);
    this._submitCallBack = submitCallBack;
    this._save = this._save.bind(this);
  }

  _getInputValues() {
    const _inputList = this._popupElement.querySelectorAll('.popup__text-field');
    const _inputValues = {};

    _inputList.forEach(inputField => {
      _inputValues[inputField.dataset.fieldName] = inputField.value;
    });

    return _inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', this._save);
  }

  _save(event) {
    event.preventDefault();

    const values = this._getInputValues();
    this._submitCallBack(values);

    this.closePopup();
  }

  _formReset() {
    this._popupElement.reset();

    const inputList = Array.from(this._popupElement.querySelectorAll('.popup__text-field'));
    const submitButton = this._popupElement.querySelector('.popup__save-button');

    inputList.forEach((inputElement) => {
      inputElement.classList.remove('popup__text-field_error');
      const errorElement = this._popupElement.querySelector(`#${inputElement.id}-error`);
      errorElement.textContent = '';
    });

    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('popup__save-button_disabled');

  }

  closePopup() {
    super.closePopup();
    this._formReset();
    this._popupElement.removeEventListener('submit', this._save);
  }
}

export default PopupWithForm;
