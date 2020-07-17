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

const buttonAddPhoto = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonsReset = document.querySelectorAll('.popup__close-button');


const pageUserName = document.querySelector('.profile__user-name');
const pageUserAbout = document.querySelector('.profile__user-about');

// FORMS + FORM FIELDS

const popupOverlays = document.querySelectorAll('.popup');

const popupIncreasePhoto = document.querySelector('#popupIncreasePhoto');
const popupIncreasePhotoImage = popupIncreasePhoto.querySelector('.popup__image');
const popupIncreasePhotoFigure = popupIncreasePhoto.querySelector('.popup__image-figure');

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

function togglePopup (form) {
  form.classList.toggle('popup_opened');
}

function saveProfile (event) {
  event.preventDefault();
  pageUserName.textContent = userNameInput.value;
  pageUserAbout.textContent = userAboutInput.value;
  togglePopup(popupEditProfile);
}

function savePhoto (event) {
  event.preventDefault();
  photoContainer.prepend(addCard(photoTitleInput.value, photoLinkInput.value));
  popupAddPhoto.reset();
  togglePopup(popupAddPhoto);
}

function addCard(name, link) {
  const photoCard = photoCardTemplate.cloneNode(true);

  const photoCardImage = photoCard.querySelector('.photo-card__image');
  const photoCardTitle = photoCard.querySelector('.photo-card__title');

  photoCardImage.setAttribute('src', link);
  photoCardImage.setAttribute('alt', name);
  photoCardTitle.textContent = name;

  photoCard.querySelector('.photo-card__trash-icon').addEventListener('click',function (event) {
    event.target.closest('.photo-card').remove();
  });

  photoCardImage.addEventListener('click',function (event) {
    increasePhoto(photoCardImage.src, photoCardTitle.textContent);
    togglePopup(popupIncreasePhoto);
  });

  photoCard.querySelector('.photo-card__like-icon').addEventListener('click',function (event) {
    event.target.classList.toggle('photo-card__like-icon_active');
  });

  return photoCard;
}

function increasePhoto(image, title) {
  popupIncreasePhotoImage.src = image;
  popupIncreasePhotoImage.alt = title;
  popupIncreasePhotoFigure.textContent = title;
}

function saveOnEnter(form) {
  if(event.key === 'Enter') {
    console.log(event.target);
    form.removeEventListener('keydown', saveOnEnter);
    togglePopup(document.querySelector('.popup_opened'));
  }
}

// -----------------------------------------------------------------------------------------

document.addEventListener('keydown', (event) => {
  if(event.key === 'Escape') {
    togglePopup(document.querySelector('.popup_opened'));
  }
});

buttonAddPhoto.addEventListener('click', (event) => {
  togglePopup(popupAddPhoto);
  popupAddPhoto.addEventListener('keydown', saveOnEnter(popupAddPhoto));
});

buttonEditProfile.addEventListener('click', (event) => {
  userNameInput.setAttribute('value',pageUserName.textContent);
  userAboutInput.setAttribute('value',pageUserAbout.textContent);
  togglePopup(popupEditProfile);
});

buttonsReset.forEach ((buttonReset) => {
  buttonReset.addEventListener('click', function (event) {
    togglePopup(event.target.closest('.popup'));
  });
});

popupOverlays.forEach ((popupOverlay) => {
  popupOverlay.addEventListener('click', function (event) {
    if(event.target === popupOverlay) {
      togglePopup(event.target.closest('.popup'));
    }
  });
});

popupEditProfile.addEventListener('submit', saveProfile);

popupAddPhoto.addEventListener('submit', savePhoto);

initialCards.forEach( (card) => {
  photoContainer.prepend(addCard(card.name, card.link));
});
