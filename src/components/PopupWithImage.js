import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupIncreasePhotoImage = document.querySelector('#popupIncreasePhoto').querySelector('.popup__image');
    this._popupIncreasePhotoFigure = document.querySelector('#popupIncreasePhoto').querySelector('.popup__image-figure');
  }

  setImage(values) {

    this._popupIncreasePhotoImage.src = values.link;
    this._popupIncreasePhotoImage.alt = values.title;
    this._popupIncreasePhotoFigure.textContent = values.title;

    this._openPopup();
  }

  _openPopup() {
    super.setEventListeners();
    super.openPopup();
  }
}

export default PopupWithImage;
