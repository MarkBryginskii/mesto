import PopupInceasedPhoto from './PopupIncreasedPhoto.js';

class Card {
  constructor(name, link, cardSelector) {
    this._cardTitle = name;
    this._cardLink = link;
    this._cardSelector = cardSelector;
  }

  _getCardTemplate() {
    const _cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.photo-card').cloneNode(true);

    return _cardTemplate;
  }

  _setEventListeners() {

    this._cardElement.querySelector('.photo-card__trash-icon').addEventListener('click', () => {
      this._deleteCard();
    });

    this._photoCardLike.addEventListener('click', () => {
      this._likeCard();
    });

    this._photoCardImage.addEventListener('click', () => {
      new PopupInceasedPhoto(this._cardLink , this._cardTitle, '#popupIncreasePhoto').showIncreasedPhoto();
    });
  }

  _deleteCard() {
    this._cardElement.closest('.photo-card').remove();
  }

  _likeCard() {
    this._photoCardLike.classList.toggle('photo-card__like-icon_active');
  }

  generateCard() {
    this._cardElement = this._getCardTemplate();

    this._photoCardTitle = this._cardElement.querySelector('.photo-card__title');
    this._photoCardImage = this._cardElement.querySelector('.photo-card__image');
    this._photoCardLike = this._cardElement.querySelector('.photo-card__like-icon');
    this._photoCardTrash = this._cardElement.querySelector('.photo-card__trash-icon');

    this._setEventListeners();

    this._photoCardTitle.textContent = this._cardTitle;
    this._photoCardImage.setAttribute('src', this._cardLink);
    this._photoCardImage.setAttribute('alt', this._cardTitle);

    return this._cardElement;
  }
}

export default Card;
