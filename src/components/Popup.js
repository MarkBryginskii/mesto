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

  setDefaultEventListeners() {
    this._popupElement.querySelector('.popup__close-button').addEventListener('click', this.closePopup);
    this._popupElement.addEventListener('click', this._closeByPopupOverlay);
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
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
    this._popupElement.classList.add('popup_opened');
  }

  closePopup() {
    this._removeEventListeners();
    this._popupElement.classList.remove('popup_opened');
  }
}

export default Popup;