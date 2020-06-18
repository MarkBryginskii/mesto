const page = document.querySelector('.page');
const formElement = page.querySelector('.popup');

let pageUserName = page.querySelector('.profile__user-name');
let pageUserAbout = page.querySelector('.profile__user-about');

let nameInput = formElement.querySelector('.popup__user-name');
let jobInput = formElement.querySelector('.popup__user-about');

let editButton = page.querySelector('.profile__edit-button');
let formCloseButton = formElement.querySelector('.popup__close-button');

function OpenForm() {
  formElement.classList.toggle('popup_opened');
  nameInput.setAttribute('value',pageUserName.textContent);
  jobInput.setAttribute('value',pageUserAbout.textContent);
}

function CloseForm() {
  formElement.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    pageUserName.textContent = nameInput.value;
    pageUserAbout.textContent = jobInput.value;

    CloseForm();
}

editButton.addEventListener('click', OpenForm);
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('reset', CloseForm);
