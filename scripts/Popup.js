class Popup{
  constructor(popup) {
    this.popup = popup;
  }

  _getPopup() {
    const _popupElement = document.querySelector(this.popup);
    return _popupElement;
  }

  _setEventListeners() {
    document.addEventListener('keydown', (event) => {this._hotKeyHandler(event);});
    this._popupElement.querySelector('.popup__close-button').addEventListener('click', (event) => {this.closePopup(event);});
    this._popupElement.addEventListener('click', (event) => {
      if(event.target.classList.contains('popup')) {
        this.closePopup();
      }
    });
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', (event) => {this._hotKeyHandler(event);});
    this._popupElement.querySelector('.popup__close-button').removeEventListener('click', (event) => {this.closePopup(event);});
    this._popupElement.removeEventListener('click', (event) => {
      if(event.target.classList.contains('popup')) {
        this.closePopup();
      }
    });
  }

  _resetForm() {
    const inputList = Array.from(this._popupElement.querySelectorAll('.popup__text-field'));
    const submitButton = this._popupElement.querySelector('.popup__save-button');

    if(inputList.length > 0) {
      this._popupElement.reset();

      inputList.forEach((inputElement) => {
        inputElement.classList.remove('popup__text-field_error');
        const errorElement = this._popupElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = '';
      });

      submitButton.setAttribute('disabled', true);
      submitButton.classList.add('popup__save-button_disabled');
    }
  }

  _hotKeyHandler(event) {
    switch (event.key) {
      case 'Escape':
        console.log('1');
        this.closePopup();
        break;
    }
  }

  openPopup() {
    this._popupElement = this._getPopup();
    this._resetForm();
    this._setEventListeners();
    this._popupElement.classList.add('popup_opened');
  }

  closePopup() {
    this._removeEventListeners();
    this._popupElement.classList.remove('popup_opened');
  }
}

export default Popup;
