const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// BUTTONS

const addPhotoButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');
const resetButtons = document.querySelectorAll('.popup__close-button');
const saveButtons = document.querySelectorAll('.popup__save-button');


const pageUserName = document.querySelector('.profile__user-name');
const pageUserAbout = document.querySelector('.profile__user-about');

// FORMS

const popupPhotoIncrease = document.querySelector('#popupPhotoIncrease');

const popupAddPhoto = document.querySelector('#popupAddPhoto');
const photoTitleInput = popupAddPhoto.querySelector('#popup__card-name');
const photoLinkInput = popupAddPhoto.querySelector('#popup__card-link');

const popupEditProfile = document.querySelector('#popupEditProfile');
const userNameInput = popupEditProfile.querySelector('#popup__user-name');
const userAboutInput = popupEditProfile.querySelector('#popup__user-about');

// TEMPLATES

const photoCardTemplate = document.querySelector('#photo-card-template').content;

// CONTAINERS

const photoContainer = document.querySelector('.photo-cards');

// -----------------------------------------------------------------------------------------

initialCards.forEach( (card) => {
  addCard(card.name, card.link);
});

addPhotoButton.addEventListener('click', (event) => {
  formOpenClose(popupAddPhoto);
});

editProfileButton.addEventListener('click', (event) => {
  userNameInput.setAttribute('value',pageUserName.textContent);
  userAboutInput.setAttribute('value',pageUserAbout.textContent);
  formOpenClose(popupEditProfile);
});

popupEditProfile.addEventListener('submit', saveProfile);

function saveProfile (event) {
  event.preventDefault();
  pageUserName.textContent = userNameInput.value;
  pageUserAbout.textContent = userAboutInput.value;
}

popupAddPhoto.addEventListener('submit', savePhoto);

function savePhoto (event) {
  event.preventDefault();
  photoTitleInput.value !== '' || photoTitleInput.value !== '' ? addCard(photoTitleInput.value, photoLinkInput.value) : alert('Необходимо заполнить все поля');
  photoTitleInput.value = '';
  photoLinkInput.value = '';
}

saveButtons.forEach ((saveButton) => {
  saveButton.addEventListener('click', function (event) {
    formOpenClose(event.target.closest('.popup'));
  });
});

resetButtons.forEach ((resetButton) => {
  resetButton.addEventListener('click', function (event) {
    formOpenClose(event.target.closest('.popup'));
  });
});

function formOpenClose (form) {
  form.classList.toggle('popup_opened');
};

function addCard(name, link) {
    const photoCard = photoCardTemplate.cloneNode(true);

    photoCard.querySelector('.photo-card__image').setAttribute('src', link);
    photoCard.querySelector('.photo-card__image').setAttribute('alt', name);
    photoCard.querySelector('.photo-card__title').textContent = name;

    photoCard.querySelector('.photo-card__trash-icon').addEventListener('click',function (event) {
      event.target.closest('.photo-card').remove();
    });

    photoCard.querySelector('.photo-card__image').addEventListener('click',function (event) {
      const photoCard = event.target.closest('.photo-card');

      PhotoIncrease(photoCard.querySelector('.photo-card__image').src, photoCard.querySelector('.photo-card__title').textContent);
      formOpenClose(popupPhotoIncrease);
    });

    photoCard.querySelector('.photo-card__like-icon').addEventListener('click',function (event) {
      event.target.classList.toggle('photo-card__like-icon_active');
    });

    photoContainer.prepend(photoCard);
}

function PhotoIncrease(image, title) {
  const popupPhotoIncreaseImage = popupPhotoIncrease.querySelector('.popup__image');
  const popupPhotoIncreaseFigure = popupPhotoIncrease.querySelector('.popup__image-figure');

  popupPhotoIncreaseImage.src = image;
  popupPhotoIncreaseImage.alt = title;
  popupPhotoIncreaseFigure.textContent = title;
};

/*

function GridRender(cardTitle, cardUrl) {
  const photoCardTemplate = document.querySelector('#photo-card-template').content;
  const photoCard = photoCardTemplate.cloneNode(true);

  photoCard.querySelector('photo-card__image').setAttribute(src,'1');
  photoCard.querySelector('photo-card__image').setAttribute('alt','1');
  photoCard.querySelector('photo-card__title').textContent = '1';

  console.log(photoCardTemplate);
}


const page = document.querySelector('.page');
const forms = document.querySelectorAll('.popup');

console.log(forms);

let pageUserName = page.querySelector('.profile__user-name');
let pageUserAbout = page.querySelector('.profile__user-about');

const editButton = page.querySelector('.profile__edit-button');
editButton.addEventListener('click', function() {
  console.log(forms.find(editButton.dataset.popupTrigger));
});

// let nameInput = forms.querySelector('#popup__user-name');
// let jobInput = forms.querySelector('#popup__user-about');

// let editButton = page.querySelector('.profile__edit-button');
// let formCloseButton = forms.querySelector('.popup__close-button');

// function OpenForm() {
//   forms.classList.toggle('popup_opened');
//   nameInput.setAttribute('value',pageUserName.textContent);
//   jobInput.setAttribute('value',pageUserAbout.textContent);
// }

// function CloseForm() {
//   forms.classList.toggle('popup_opened');
// }

// function formSubmitHandler (evt) {
//     evt.preventDefault();

//     pageUserName.textContent = nameInput.value;
//     pageUserAbout.textContent = jobInput.value;

//     CloseForm();
// }

// editButton.addEventListener('click', OpenForm);
// forms.addEventListener('submit', formSubmitHandler);
// forms.addEventListener('reset', CloseForm);

*/
