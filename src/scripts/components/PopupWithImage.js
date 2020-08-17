import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  _setImage() {

    const card = event.target.closest('.photo-card');
    const cardImage = card.querySelector('.photo-card__image').src;
    const cardLink = card.querySelector('.photo-card__title').textContent;

    const popupIncreasePhoto = document.querySelector('#popupIncreasePhoto');
    const popupIncreasePhotoImage = popupIncreasePhoto.querySelector('.popup__image');
    const popupIncreasePhotoFigure = popupIncreasePhoto.querySelector('.popup__image-figure');

    popupIncreasePhotoImage.src = cardImage;
    popupIncreasePhotoImage.alt = cardLink;
    popupIncreasePhotoFigure.textContent = cardLink;
  }

  openPopup() {
    this._setImage();
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
  }
}

export default PopupWithImage;
