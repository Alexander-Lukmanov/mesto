import "./index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";

import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, formsConfig } from "../utils/constants.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const popupFormEditProfile = document.querySelector(
  ".popup__form-edit-profile"
);
const popupFormAddCard = document.querySelector(".popup__form-add-card");

const imagePopup = new PopupWithImage(".popup_photo");
imagePopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

const formEditProfile = document.querySelector(".popup__form-edit-profile");
const profileNameInput = formEditProfile.querySelector(
  ".popup__input-profile-name"
);
const profileJobInput = formEditProfile.querySelector(
  ".popup__input-profile-profession"
);

//////////////////////////////////////////////////////////////////////
const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
};

///////////////////////////////////////////////////////////////////////////

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      cardsSection.addItem(createCard(cardData));
    },
  },
  ".cards"
);

cardsSection.renderItems();

////////////////////////////////////////////////////////////////////////////

const userInfo = new UserInfo({
  userNameElement: ".profile__name",
  userInfoElement: ".profile__profession",
});

///////////////////////////////////////////////////////////////////////////

const popupEditProfile = new PopupWithForm(".popup_edit-profile", {
  handleSubmit: (data) => {
    userInfo.setUserInfo({
      name: data.name,
      info: data.info,
    });
  },
});
popupEditProfile.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const getUserInfo = userInfo.getUserInfo();
  profileNameInput.value = getUserInfo.name;
  profileJobInput.value = getUserInfo.info;
  popupEditProfile.open();
});

/////////////////////////////////////////////////////////////////////////////

const popupAddCard = new PopupWithForm(".popup_add-card", {
  handleSubmit: ({ titleCard, linkImage }) => {
    console.log({ titleCard, linkImage });
    cardsSection.addItem(createCard({ name: titleCard, link: linkImage }));
  },
});

popupAddCard.setEventListeners();

cardAddButton.addEventListener("click", () => {
  popupAddCard.open();
});

////////////////////////////////////////////////////////////////////////////

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
