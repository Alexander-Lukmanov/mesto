export class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);

    return cardTemplate;
  }

  _handleLikeClick = () => {
    this._buttonLike.classList.toggle("cards__like-button_active");
  };

  _handleDeleteClick = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._element
      .querySelector(".cards__like-button")
      .addEventListener("click", this._handleLikeClick);
    this._element
      .querySelector(".cards__trash-button")
      .addEventListener("click", this._handleDeleteClick);
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  createCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector(".cards__like-button");
    this._cardImage = this._element.querySelector(".cards__image");

    this._cardTitle = this._element.querySelector(".cards__title");
    this._cardImage.src = this._link;

    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}
