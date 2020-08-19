class Popup{
  constructor(popup) {
    this.popup = popup;
    this._handleEscClose = this._handleEscClose.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this._closeByPopupOverlay = this._closeByPopupOverlay.bind(this);
    this._popupElement = this._getPopup();
  }

  _getPopup() {
    const _popupElement = document.querySelector(this.popup);
    return _popupElement;
  }

  setEventListeners() {
    this._popupElement.querySelector('.popup__close-button').addEventListener('click', this.closePopup);
    this._popupElement.addEventListener('click', this._closeByPopupOverlay);
  }

  _removeEventListeners() {
    this._popupElement.querySelector('.popup__close-button').removeEventListener('click', this.closePopup);
    this._popupElement.removeEventListener('click', this._closeByPopupOverlay);
  }

  _closeByPopupOverlay(event) {
    if(event.target.classList.contains('popup')) {
      this.closePopup();
    }
  }

  _handleEscClose(event) {
    if(event.key === 'Escape') {
      this.closePopup();
    }
  }

  openPopup() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.classList.add('popup_opened');
  }

  closePopup() {
    this._removeEventListeners();
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.classList.remove('popup_opened');
  }
}

export default Popup;
