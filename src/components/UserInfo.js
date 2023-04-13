export default class UserInfo {
  constructor({ userNameElement, userInfoElement }) {
    this._userNameElement = document.querySelector(userNameElement);
    this._userInfoElement = document.querySelector(userInfoElement);
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
