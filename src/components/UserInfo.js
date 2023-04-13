export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userNameElement.textContent,
      info: this._userInfoElement.textContent,
    };

    return this._userInfo;
  }

  setUserInfo({ name, info }) {
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = info;
  }
}
