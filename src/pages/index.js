import './index.css';

import {initialCards, formSelectors} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';

// BUTTONS

const buttonAddPhoto = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');

// PAGE ELEMENTS

const pageUserName = document.querySelector('.profile__user-name');
const pageUserAbout = document.querySelector('.profile__user-about');

// POPUP WITH IMAGE

const popupWithImage = new PopupWithImage('#popupIncreasePhoto');
popupWithImage.setDefaultEventListeners();

// POPUP ADD PHOTO

const popupAddPhoto = new PopupWithForm({submitCallBack: (values) => {
  const cardElement = _newCardElement(values);
  photoList.addItem(cardElement);
  }
},'#popupAddPhoto');
popupAddPhoto.setDefaultEventListeners();
const formValidatorAddPhoto = new FormValidator(formSelectors, '#popupAddPhoto');

// POPUP EDIT PROFILE

const popupEditProfile = new PopupWithForm({submitCallBack: (values) => {user.setUserInfo(values);}}, '#popupEditProfile');
popupEditProfile.setDefaultEventListeners();
const user = new UserInfo({name: pageUserName, about: pageUserAbout});
const formValidatorEditProfile = new FormValidator(formSelectors, '#popupEditProfile');

// ༼ つ ◕_◕ ༽つ  ☆.。.:*・°☆.。 MAGIC ☆.。.:*・°☆.

function _newCardElement(item) {
  const cardElement = new Card(item, '#photo-card-template', {handleCardClick: (values) => {popupWithImage.setImage(values);}
  }).generateCard();

  return cardElement;
}

const photoList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = _newCardElement(item);
    photoList.addItem(cardElement);
  }
},'.photo-cards');

photoList.renderer();

buttonAddPhoto.addEventListener('click',() => {
  formValidatorAddPhoto.enableValidation();
  popupAddPhoto.setEventListeners();
  popupAddPhoto.openPopup();
});

buttonEditProfile.addEventListener('click',() => {
  user.setInputValue();
  formValidatorEditProfile.enableValidation();
  popupEditProfile.setEventListeners();
  popupEditProfile.openPopup();
});
