import initialCards from './initial-cards.js';
import Card from './Card.js';
import PopupAddPhoto from './PopupAddPhoto.js';
import PopupEditProfile from './PopupEditProfile.js';
import FormValidator from './FormValidator.js';

const obj =
  {
    formSelector: '.popup__form-container',
    inputSelector: '.popup__text-field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__text-field_error'
  };

// BUTTONS

const buttonAddPhoto = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');

// PAGE FIELDS

const pageUserName = document.querySelector('.profile__user-name');
const pageUserAbout = document.querySelector('.profile__user-about');

// FORMS + FORM FIELDS

const popupAddPhotoForm = document.querySelector('#popupAddPhoto');
const photoTitleInput = popupAddPhotoForm.querySelector('#popup__card-name');
const photoLinkInput = popupAddPhotoForm.querySelector('#popup__card-link');

const popupEditProfileForm = document.querySelector('#popupEditProfile');
const userNameInput = popupEditProfileForm.querySelector('#popup__user-name');
const userAboutInput = popupEditProfileForm.querySelector('#popup__user-about');

// CONTAINERS

const photoContainer = document.querySelector('.photo-cards');

// -----------------------------------------------------------------------------------------

buttonAddPhoto.addEventListener('click',() => {
  new PopupAddPhoto(photoTitleInput, photoLinkInput, '#popupAddPhoto').openPopup();
  new FormValidator(obj, '#popupAddPhoto').enableValidation();
});

buttonEditProfile.addEventListener('click',() => {
  new PopupEditProfile(userNameInput, userAboutInput, pageUserName, pageUserAbout, '#popupEditProfile').openPopup();
  new FormValidator(obj, '#popupEditProfile').enableValidation();
});

initialCards.forEach((card) => {
  const newСard = new Card(card.name, card.link, '#photo-card-template');
  const cardElement = newСard.generateCard();
  photoContainer.prepend(cardElement);
});
