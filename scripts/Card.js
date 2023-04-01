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
      .querySelector(this._templateSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);

    return cardTemplate;
  }

  _clickButtonLikeCard = () => {
    this._likeButton.classList.toggle("cards__like-button_active");
  };

  _clickButtonDeleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _openPopupPhoto = () => {
    popupPhotoImage.src = this._cardImage.src;
    popupPhotoImage.alt = this._cardImage.alt;
    popupPhotoCaption.textContent = this._cardImage.alt;
    openPopup(popupPhoto);
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
      .addEventListener("click", this._openPopupPhoto);
  }

  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".cards__like-button");
    this._cardImage = this._element.querySelector(".cards__image");
    this._cardTitle = this._element.querySelector(".cards__title");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}
