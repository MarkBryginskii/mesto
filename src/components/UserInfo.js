class UserInfo {
  constructor(user) {
    this._pageUserName = user.name;
    this._pageUserAbout = user.about;
    this._userNameInput = document.querySelector('#popup__user-name');
    this._userAboutInput = document.querySelector('#popup__user-about');
  }

  getUserInfo() {
    const userInfo = {name: this._pageUserName.textContent, about: this._pageUserAbout.textContent};
    return userInfo;
  }

  setInputValue() {
    this._userNameInput.setAttribute('value',this._pageUserName.textContent);
    this._userAboutInput.setAttribute('value',this._pageUserAbout.textContent);
  }

  setUserInfo(values) {
    this._pageUserName.textContent = values.name;
    this._pageUserAbout.textContent = values.about;
  }
}

export default UserInfo;
