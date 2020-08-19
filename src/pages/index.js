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
popupWithImage.setEventListeners();

// POPUP ADD PHOTO

const popupAddPhoto = new PopupWithForm({submitCallBack: (values) => {
  const cardElement = newCardElement(values);
  photoList.addItem(cardElement);
  }
},'#popupAddPhoto');
popupAddPhoto.setEventListeners();
const formValidatorAddPhoto = new FormValidator(formSelectors, '#popupAddPhoto');

// POPUP EDIT PROFILE

const userNameInput = document.querySelector('#popup__user-name');
const userAboutInput = document.querySelector('#popup__user-about');

const popupEditProfile = new PopupWithForm({submitCallBack: (values) => {user.setUserInfo(values);}}, '#popupEditProfile');
const user = new UserInfo({name: pageUserName, about: pageUserAbout});
popupEditProfile.setEventListeners();

function setInputValue() {
  const userInfo = user.getUserInfo();
  userNameInput.setAttribute('value',userInfo.name);
  userAboutInput.setAttribute('value',userInfo.about);
}

const formValidatorEditProfile = new FormValidator(formSelectors, '#popupEditProfile');

// ༼ つ ◕_◕ ༽つ  ☆.。.:*・°☆.。 MAGIC ☆.。.:*・°☆.

function newCardElement(item) {
  const cardElement = new Card(item, '#photo-card-template', {handleCardClick: (values) => {popupWithImage.openPopup(values);}
  }).generateCard();

  return cardElement;
}

const photoList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = newCardElement(item);
    photoList.addItem(cardElement);
  }
},'.photo-cards');

photoList.renderer();

buttonAddPhoto.addEventListener('click',() => {
  formValidatorAddPhoto.enableValidation();
  popupAddPhoto.openPopup();
});

buttonEditProfile.addEventListener('click',() => {
  setInputValue();
  formValidatorEditProfile.enableValidation();
  popupEditProfile.openPopup();
});
