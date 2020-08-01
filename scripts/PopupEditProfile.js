import Popup from './Popup.js';

export class PopupEditProfile extends Popup {
  constructor(inputName, inputAbout, pageName, pageAbout, popup) {
    super(popup);
    this._inputName = inputName;
    this._inputAbout = inputAbout;
    this._pageName = pageName;
    this._pageAbout = pageAbout;
  }

  openPopup() {
    this._inputName.setAttribute('value',this._pageName.textContent);
    this._inputAbout.setAttribute('value',this._pageAbout.textContent);

    document.querySelector(this.popup).addEventListener('submit', (event) => {this._saveProfile(event);});

    super.openPopup();
  }

  _saveProfile(event) {
    event.preventDefault();

    this._pageName.textContent = this._inputName.value;
    this._pageAbout.textContent = this._inputAbout.value;

    document.querySelector(this.popup).removeEventListener('submit', (event) => {this._saveProfile(event);});

    super.closePopup();
  }
}

export default PopupEditProfile;
