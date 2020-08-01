import Popup from './Popup.js';

class PopupInceasedPhoto extends Popup {
  constructor(image, title, popup) {
    super(popup);
    this._image = image;
    this._title = title;
  }

  showIncreasedPhoto() {
    super.openPopup();

    const popupIncreasePhoto = document.querySelector(this.popup);
    const popupIncreasePhotoImage = popupIncreasePhoto.querySelector('.popup__image');
    const popupIncreasePhotoFigure = popupIncreasePhoto.querySelector('.popup__image-figure');

    popupIncreasePhotoImage.src = this._image;
    popupIncreasePhotoImage.alt = this._title;
    popupIncreasePhotoFigure.textContent = this._title;
  }

  closePopup() {
    super.closePopup();
  }
}

export default PopupInceasedPhoto;
