class Popup{
  constructor(popup) {
    this.popup = popup;
    this._hotKeyHandler = this._hotKeyHandler.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this._closeByPopupOverlay = this._closeByPopupOverlay.bind(this);
  }

  _getPopup() {
    const _popupElement = document.querySelector(this.popup);

    return _popupElement;
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._hotKeyHandler);
    this._popupElement.querySelector('.popup__close-button').addEventListener('click', this.closePopup);
    this._popupElement.addEventListener('click', this._closeByPopupOverlay);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._hotKeyHandler);
    this._popupElement.querySelector('.popup__close-button').removeEventListener('click', this.closePopup);
    this._popupElement.removeEventListener('click', this._closeByPopupOverlay);
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

  _closeByPopupOverlay() {
    if(event.target.classList.contains('popup')) {
      this.closePopup();
    }
  }

  _hotKeyHandler() {
    if(event.key === 'Escape') {
      this.closePopup();
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
