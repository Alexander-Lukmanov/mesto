export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userInfoSelector = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userNameSelector.textContent,
      info: this._userInfoSelector.textContent,
    };

    return this._userInfo;
  }

  setUserInfo({ name, info }) {
    this._userNameSelector.textContent = name;
    this._userInfoSelector.textContent = info;
  }
}
