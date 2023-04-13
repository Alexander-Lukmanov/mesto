export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._buttonClose = document.querySelector(".popup__close-button");
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("popup")) {
        this.close(e.target);
      }
      if (e.target.classList.contains("popup__close-button")) {
        this.close(e.target);
      }
    });
  }
}
