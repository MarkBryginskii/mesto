import './pages/index.css';

import {initialCards, obj, buttonAddPhoto, buttonEditProfile, pageUserName, pageUserAbout} from './scripts/utils/constants.js';
import Section from './scripts/components/Section.js';
import Card from './scripts/components/Card.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';

const popupWithImage = new PopupWithImage('#popupIncreasePhoto');

const photoList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = new Card(item, '#photo-card-template', popupWithImage).generateCard();
    photoList.addItem(cardElement);
  }
},
'.photo-cards'
);

photoList.renderer();

buttonAddPhoto.addEventListener('click',() => {

  const popupAddPhoto = new PopupWithForm({submitCallBack: (values) => {
    const cardElement = new Card(values, '#photo-card-template', popupWithImage).generateCard();
    photoList.addItem(cardElement);
  }}, '#popupAddPhoto');

  new FormValidator(obj, '#popupAddPhoto').enableValidation();
  popupAddPhoto.openPopup();
});

const user = new UserInfo({name: pageUserName, about: pageUserAbout});

buttonEditProfile.addEventListener('click',() => {

  const PopupEditProfile = new PopupWithForm({submitCallBack: (values) =>{
    user.setUserInfo(values);
  }}, '#popupEditProfile');

  new FormValidator(obj, '#popupEditProfile').enableValidation();
  user.getUserInfo();
  PopupEditProfile.openPopup();
});

