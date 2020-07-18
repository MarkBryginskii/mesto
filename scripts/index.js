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

function openPopup (form) {
  resetErrors(form);
  document.addEventListener('keydown', (event) => {hotKeyHandler(event, form);});
  form.classList.add('popup_opened');
}

function closePopup (form) {
  document.removeEventListener('keydown', (event) => {hotKeyHandler(event, form);});
  form.classList.remove('popup_opened');
}

function saveProfile (event) {
  event.preventDefault();
  pageUserName.textContent = userNameInput.value;
  pageUserAbout.textContent = userAboutInput.value;
  closePopup(popupEditProfile);
}

function savePhoto (event) {
  event.preventDefault();
  photoContainer.prepend(addCard(photoTitleInput.value, photoLinkInput.value));
  closePopup(popupAddPhoto);
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

  photoCardImage.addEventListener('click',() => {
    showIncreasedPhoto(photoCardImage.src, photoCardTitle.textContent);
    openPopup(popupIncreasePhoto);
  });

  photoCard.querySelector('.photo-card__like-icon').addEventListener('click',function (event) {
    event.target.classList.toggle('photo-card__like-icon_active');
  });

  return photoCard;
}

function showIncreasedPhoto(image, title) {
  popupIncreasePhotoImage.src = image;
  popupIncreasePhotoImage.alt = title;
  popupIncreasePhotoFigure.textContent = title;
}

function hotKeyHandler(event, form) {
  switch (event.key) {
    case 'Escape':
      closePopup(form);
      break;
    case 'Enter':
      form.submit();
      break;
  }
}

// -----------------------------------------------------------------------------------------

buttonAddPhoto.addEventListener('click',() => {
  openPopup(popupAddPhoto);
});

buttonEditProfile.addEventListener('click',() => {
  userNameInput.setAttribute('value',pageUserName.textContent);
  userAboutInput.setAttribute('value',pageUserAbout.textContent);
  openPopup(popupEditProfile);
});

buttonsReset.forEach ((buttonReset) => {
  buttonReset.addEventListener('click', function (event) {
    closePopup(event.target.closest('.popup'));
  });
});

popupOverlays.forEach ((popupOverlay) => {
  popupOverlay.addEventListener('click', function (event) {
    if(event.target === popupOverlay) {
      closePopup(event.target.closest('.popup'));
    }
  });
});

popupEditProfile.addEventListener('submit', saveProfile);

popupAddPhoto.addEventListener('submit', savePhoto);

initialCards.forEach( (card) => {
  photoContainer.prepend(addCard(card.name, card.link));
});
