import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor({submitCallBack}, popup) {
    super(popup);
    this._submitCallBack = submitCallBack;
    this._save = this._save.bind(this);
    this._saveButton = document.querySelector(popup).querySelector('.popup__save-button');
  }

  setButtonPendingState() {
    this._popupElement.querySelector('.popup__save-button').textContent = 'Сохранение...';
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
  }
}

export default PopupWithForm;
