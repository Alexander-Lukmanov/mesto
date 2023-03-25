import { openPopup } from "./index.js";
import { popupPhoto, popupPhotoImage, popupPhotoCaption } from "./index.js";
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector("#card-template")
      .content.querySelector(".cards__item")
      .cloneNode(true);

    return cardTemplate;
  }

  _clickButtonLikeCard = (e) => {
    e.target.classList.toggle("cards__like-button_active");
  };

  _clickButtonDeleteCard = (e) => {
    e.target.closest(".cards__item").remove();
  };

  _setEventListeners() {
    this._element
      .querySelector(".cards__like-button")
      .addEventListener("click", this._clickButtonLikeCard);
    this._element
      .querySelector(".cards__trash-button")
      .addEventListener("click", this._clickButtonDeleteCard);
    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        popupPhotoImage.src = this._element.querySelector(".cards__image").src;
        popupPhotoImage.alt = this._element.querySelector(".cards__image").alt;
        popupPhotoCaption.textContent =
          this._element.querySelector(".cards__image").alt;
        openPopup(popupPhoto);
      });
  }

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".cards__image").src = this._link;
    this._element.querySelector(".cards__image").alt = this._name;
    this._element.querySelector(".cards__title").textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}
