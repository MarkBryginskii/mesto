class UserInfo {
  constructor(user) {
    this._pageUserName = user.name;
    this._pageUserAbout = user.about;
    this._pageUserAvatar = user.avatar;
  }

  getUserInfo() {
    const userInfo = {name: this._pageUserName.textContent, about: this._pageUserAbout.textContent};
    return userInfo;
  }

  setUserInfo(values) {
    this._pageUserName.textContent = values.name;
    this._pageUserAbout.textContent = values.about;
    this._pageUserAvatar.src = values.avatar;
  }
}

export default UserInfo;
