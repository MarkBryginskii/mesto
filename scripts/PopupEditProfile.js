import Popup from './Popup.js';

export class PopupEditProfile extends Popup {
  constructor(inputName, inputAbout, pageName, pageAbout, popup) {
    super(popup);
    this._inputName = inputName;
    this._inputAbout = inputAbout;
    this._pageName = pageName;
    this._pageAbout = pageAbout;
    this._saveProfile = this._saveProfile.bind(this);
  }

  openPopup() {
    this._inputName.setAttribute('value',this._pageName.textContent);
    this._inputAbout.setAttribute('value',this._pageAbout.textContent);

    document.querySelector(this.popup).addEventListener('submit', this._saveProfile);

    super.openPopup();
  }

  _saveProfile(event) {
    event.preventDefault();

    this._pageName.textContent = this._inputName.value;
    this._pageAbout.textContent = this._inputAbout.value;

    document.querySelector(this.popup).removeEventListener('submit', this._saveProfile);

    super.closePopup();
  }
}

export default PopupEditProfile;
