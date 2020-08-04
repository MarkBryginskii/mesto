import Popup from './Popup.js';
import Card from './Card.js';

class PopupAddPhoto extends Popup {
  constructor(title, link, popup) {
    super(popup);
    this._title = title;
    this._link = link;
    this._savePhoto = this._savePhoto.bind(this);
  }

  openPopup() {
    super.openPopup();
    document.querySelector(this.popup).addEventListener('submit', this._savePhoto);
  }

  _savePhoto(event) {
    event.preventDefault();

    const _photoContainer = document.querySelector('.photo-cards');
    const _newСard = new Card(this._title.value, this._link.value, '#photo-card-template');
    const _cardElement = _newСard.generateCard();

    _photoContainer.prepend(_cardElement);

    document.querySelector(this.popup).removeEventListener('submit', this._savePhoto);

    super.closePopup();
  }
}

export default PopupAddPhoto;
