import './index.css';

import Api from '../components/Api.js';

import {formSelectors} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupDeleteConfirm from '../components/PopupDeleteConfirm.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';

// API

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'aa78f1a9-4e3b-428a-a9f7-5265cbc9b3da',
    'Content-Type': 'application/json'
  }
});

// BUTTONS

const buttonAddPhoto = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonEditAvatar = document.querySelector('.profile__avatar-edit-button');

// PAGE ELEMENTS

const pageUserName = document.querySelector('.profile__user-name');
const pageUserAbout = document.querySelector('.profile__user-about');
const pageUserAvatar = document.querySelector('.profile__avatar');

// POPUP WITH IMAGE

const popupWithImage = new PopupWithImage('#popupIncreasePhoto');
popupWithImage.setEventListeners();

// POPUP ADD PHOTO

const popupAddPhoto = new PopupWithForm({submitCallBack:
  (values) => {api.addCard(values)
    .then(popupAddPhoto.setButtonPendingState())
    .then((res) => {newCardElement(res);})
    .catch((error) => {console.log(error);})
    .finally(popupAddPhoto.closePopup())
  }
},'#popupAddPhoto');
popupAddPhoto.setEventListeners();
const formValidatorAddPhoto = new FormValidator(formSelectors, '#popupAddPhoto');

// POPUP EDIT PROFILE

const user = new UserInfo({name: pageUserName, about: pageUserAbout, avatar: pageUserAvatar});

const userNameInput = document.querySelector('#popup__user-name');
const userAboutInput = document.querySelector('#popup__user-about');

const popupEditProfile = new PopupWithForm({submitCallBack:
  (values) => {api.setUserInfo(values)
    .then(popupEditProfile.setButtonPendingState())
    .then((data) => {user.setUserInfo(data);})
    .catch((error) => {console.log(error);})
    .finally(popupEditProfile.closePopup())
  }}
  , '#popupEditProfile');

popupEditProfile.setEventListeners();

function setInputValue() {
  const userInfo = user.getUserInfo();
  userNameInput.setAttribute('value',userInfo.name);
  userAboutInput.setAttribute('value',userInfo.about);
}

const formValidatorEditProfile = new FormValidator(formSelectors, '#popupEditProfile');

// POPUP EDIT AVATAR

const popupEditAvatar = new PopupWithForm({submitCallBack:
  (values) => {api.setUserAvatar(values)
    .then(popupEditAvatar.setButtonPendingState())
    .then((data) => {user.setUserInfo(data);})
    .catch((error) => {console.log(error);})
    .finally(popupEditAvatar.closePopup())
  }}
  , '#popupEditAvatar');

popupEditAvatar.setEventListeners();
const formValidatorEditAvatar = new FormValidator(formSelectors, '#popupEditAvatar');

// POPUP SUBMIT

const popupDeleteConfirm = new PopupDeleteConfirm({submitCallBack: (cardId, card) => {
  api.deleteCard(cardId)
  .then(popupDeleteConfirm.setButtonPendingState())
  .then(card.remove())
  .catch((error) => {console.log(error);})
  .finally(popupDeleteConfirm.closePopup())}
}, '#popupConfirm');
popupDeleteConfirm.setEventListeners();

// ༼ つ ◕_◕ ༽つ  ☆.。.:*・°☆.。 MAGIC ☆.。.:*・°☆.

function newCardElement(item) {
  const cardElement = new Card(
    item,
    '#photo-card-template',
    {
      handleCardClick: (values) => {popupWithImage.openPopup(values)},
      handleLikeClick: (cardId, isLiked, likeCounter) => {
        if(isLiked) {
          api.removeCardLike(cardId);
          likeCounter.textContent = parseInt(likeCounter.textContent) - 1;
        }
        else {
          api.addCardLike(cardId);
          likeCounter.textContent = parseInt(likeCounter.textContent) + 1;
        }
      },
      handleDeleteIconClick: (cardId, card) => {popupDeleteConfirm.openPopup(cardId, card)}
    }
  ).generateCard();
  photoList.addItem(cardElement);
}

let photoList = {}

api.getInitialCards()
  .then((data) => {
    photoList = new Section({
      items: data,
      renderer: (item) => {
        newCardElement(item);
      }
    },'.photo-cards');
  photoList.renderer();
});

api.getUserInfo()
  .then((data) => {
    user.setUserInfo(data);
  });

buttonAddPhoto.addEventListener('click',() => {
  formValidatorAddPhoto.enableValidation();
  popupAddPhoto.openPopup();
});

buttonEditProfile.addEventListener('click',() => {
  setInputValue();
  formValidatorEditProfile.enableValidation();
  popupEditProfile.openPopup();
});

buttonEditAvatar.addEventListener('click',() => {
  formValidatorEditAvatar.enableValidation();
  popupEditAvatar.openPopup();
});
