import PopupInceasedPhoto from './PopupIncreasedPhoto.js';

class Card {
  constructor(name, link, cardSelector) {
    this._cardTitle = name;
    this._cardLink = link;
    this._cardSelector = cardSelector;
  }

  _getCardTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.cloneNode(true);

    return cardTemplate;
  }

  _setEventListeners() {

    this._cardElement.querySelector('.photo-card__trash-icon').addEventListener('click', (event) => {
      this._deleteCard(event);
    });

    this._cardElement.querySelector('.photo-card__like-icon').addEventListener('click', (event) => {
      this._likeCard(event);
    });

    this._cardElement.querySelector('.photo-card__image').addEventListener('click', () => {
      new PopupInceasedPhoto(this._cardLink , this._cardTitle, '#popupIncreasePhoto').showIncreasedPhoto();
    });
  }

  _deleteCard() {
    event.target.closest('.photo-card').remove();
  }

  _likeCard() {
    event.target.classList.toggle('photo-card__like-icon_active');
  }

  generateCard() {
    this._cardElement = this._getCardTemplate();
    this._setEventListeners();

    this._cardElement.querySelector('.photo-card__title').textContent = this._cardTitle;
    this._cardElement.querySelector('.photo-card__image').setAttribute('src', this._cardLink);
    this._cardElement.querySelector('.photo-card__image').setAttribute('alt', this._cardTitle);

    return this._cardElement;
  }
}

export default Card;
