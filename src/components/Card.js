class Card {
  constructor(item, cardSelector, {handleCardClick, handleLikeClick, handleDeleteIconClick}) {
    this._cardId = item._id;
    this._ownerId = item.owner._id;
    this._cardTitle = item.name;
    this._cardLink = item.link;
    this._likes = item.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._increasedImage = this._increasedImage.bind(this);
    this._deleteCard = this._deleteCard.bind(this);
  }

  _getCardTemplate() {
    const _cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.photo-card').cloneNode(true);

    return _cardTemplate;
  }

  _setEventListeners() {

    this._photoCardTrash.addEventListener('click', this._deleteCard);

    this._photoCardLike.addEventListener('click', () => {
      this._likeCard();
    });

    this._photoCardImage.addEventListener('click', this._increasedImage);
  }

  _increasedImage() {
    const cardData = {link: this._cardLink, title: this._cardTitle};
    this._handleCardClick(cardData);
  }

  _deleteCard() {
    this._handleDeleteIconClick(this._cardId, this._cardElement);
  }

  _likeCard() {
    this._handleLikeClick(this._cardId, this._photoCardLike.classList.contains('photo-card__like-icon_active'), this._cardElement.querySelector('.photo-card__like-counter'));
    this._photoCardLike.classList.toggle('photo-card__like-icon_active');
  }

  generateCard() {
    this._cardElement = this._getCardTemplate();

    this._photoCardTitle = this._cardElement.querySelector('.photo-card__title');
    this._photoCardImage = this._cardElement.querySelector('.photo-card__image');
    this._photoCardLike = this._cardElement.querySelector('.photo-card__like-icon');
    this._photoCardLikeCounter = this._cardElement.querySelector('.photo-card__like-counter');
    this._photoCardTrash = this._cardElement.querySelector('.photo-card__trash-icon');

    this._setEventListeners();

    this._photoCardTitle.textContent = this._cardTitle;
    this._photoCardImage.setAttribute('src', this._cardLink);
    this._photoCardImage.setAttribute('alt', this._cardTitle);
    if(this._likes.some( (user) => user._id === 'e585c76ac36f89aeac52063e') ) {
      this._photoCardLike.classList.add('photo-card__like-icon_active');
    }
    this._photoCardLikeCounter.textContent = this._likes.length;
    if(this._ownerId !== 'e585c76ac36f89aeac52063e') {
      this._photoCardTrash .classList.add('photo-card__trash-icon_hide');
    }

    return this._cardElement;
  }
}

export default Card;
