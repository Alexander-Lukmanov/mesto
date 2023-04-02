import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, formsConfig } from "./constants.js";

export const popup = document.querySelector(".popup");
export const popupContainer = document.querySelector(".popup__container");
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const cardAddButton = document.querySelector(".profile__add-button");
export const popupEditProfile = document.querySelector(".popup_edit-profile");
export const popupAddCard = document.querySelector(".popup_add-card");
export const popupPhoto = document.querySelector(".popup_photo");
export const popupPhotoImage = document.querySelector(".popup__figure-img");
export const popupPhotoCaption = document.querySelector(".popup__figcaption");
export const buttonClosePopupPhoto = popupPhoto.querySelector(
  ".popup__close-button"
);
export const buttonClosePopupEditProfile = popupEditProfile.querySelector(
  ".popup__close-button"
);
export const buttonClosePopupAddCart = popupAddCard.querySelector(
  ".popup__close-button"
);
export const buttonSubmitFormEditProfile = document.querySelector(
  '[name="submit-edit-profile"]'
);

export const buttonSubmitFormAddCart = document.querySelector(
  '[name="submit-add-card"]'
);
const popupFormEditProfile = document.querySelector(
  ".popup__form-edit-profile"
);
const popupFormAddCard = document.querySelector(".popup__form-add-card");

const buttonLikeCard = document.querySelector(".cards__like-button");

/////////////////////////////////////////////

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

function closeByEsc(e) {
  if (e.key === "Escape") {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
  }
}

function closePopupOutsideClick(e) {
  if (e.target.classList.contains("popup")) {
    closePopup(e.target);
  }
}

popupEditProfile.addEventListener("click", closePopupOutsideClick);
popupAddCard.addEventListener("click", closePopupOutsideClick);
popupPhoto.addEventListener("click", closePopupOutsideClick);

cardAddButton.addEventListener("click", function () {
  openPopup(popupAddCard);
});
buttonClosePopupAddCart.addEventListener("click", function () {
  closePopup(popupAddCard);
});

profileEditButton.addEventListener("click", function () {
  profileNameInput.value = nameProfileElement.textContent;
  profileJobInput.value = jobProfileElement.textContent;
  openPopup(popupEditProfile);
});
buttonClosePopupEditProfile.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

buttonClosePopupPhoto.addEventListener("click", function () {
  closePopup(popupPhoto);
});

//
const formEditProfile = document.querySelector(".popup__form-edit-profile");
const profileNameInput = formEditProfile.querySelector('[name="profile-name"]');
const profileJobInput = formEditProfile.querySelector(
  '[name="profile-profession"]'
);
const nameProfileElement = document.querySelector(".profile__name");
const jobProfileElement = document.querySelector(".profile__profession");

function editProfileSubmitHandler(evt) {
  evt.preventDefault();
  nameProfileElement.textContent = profileNameInput.value;
  jobProfileElement.textContent = profileJobInput.value;
  closePopup(popupEditProfile);
}

formEditProfile.addEventListener("submit", editProfileSubmitHandler);
//

const cardsContainer = document.querySelector(".cards");

const createCard = (item) => {
  const card = new Card(item, "#card-template");
  const cardElement = card.createCard();
  return cardElement;
};

const renderCard = (item) => {
  const cardElement = createCard(item);
  cardsContainer.prepend(cardElement);
};

initialCards.forEach(renderCard);

const formAddCard = document.querySelector(".popup__form-add-card");
const titleCardInput = formAddCard.querySelector('[name="title-card"]');
const linkImageInput = formAddCard.querySelector('[name="link-image"]');

function addCardSubmitHandler(e) {
  e.preventDefault();

  const newCardObject = {
    name: titleCardInput.value,
    link: linkImageInput.value,
  };
  renderCard(newCardObject);
  closePopup(popupAddCard);
  titleCardInput.value = "";
  linkImageInput.value = "";
}

formAddCard.addEventListener("submit", addCardSubmitHandler);

const popupFormAddCardValidator = new FormValidator(
  formsConfig,
  popupFormAddCard
);
popupFormAddCardValidator.enableValidation();

const popupFormEditProfileValidator = new FormValidator(
  formsConfig,
  popupFormEditProfile
);
popupFormEditProfileValidator.enableValidation();

////////////////////////////////////////////////////////////////
