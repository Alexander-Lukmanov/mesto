const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

let editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
let popup = document.querySelector(".popup");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-card");
let closePopupEditProfileButton = popupEditProfile.querySelector(
  ".popup__close-button"
);
let closePopupAddCartButton = popupAddCard.querySelector(
  ".popup__close-button"
);
let submitFormEditProfileButton = document.querySelector(
  '[name="submit-edit-profile"]'
);
const submitFormAddCardButton = document.querySelector(
  '[name="submit-add-card"]'
);

const toggleEditProfilePopup = () => {
  popupEditProfile.classList.toggle("popup_edit-profile_opened");
};

const toggleAddCardPopup = () => {
  popupAddCard.classList.toggle("popup_add-card_opened");
};

addCardButton.addEventListener("click", toggleAddCardPopup);
editProfileButton.addEventListener("click", toggleEditProfilePopup);
closePopupAddCartButton.addEventListener("click", toggleAddCardPopup);
closePopupEditProfileButton.addEventListener("click", toggleEditProfilePopup);
//
let formEditProfile = document.querySelector(".popup__form-edit-profile");
let profileNameInput = formEditProfile.querySelector('[name="profile-name"]');
let profileJobInput = formEditProfile.querySelector(
  '[name="profile-profession"]'
);

function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();

  profileJobInput.getAttribute("value");
  profileNameInput.getAttribute("value");

  let nameProfileElement = document.querySelector(".profile__name");
  let jobProfileElement = document.querySelector(".profile__profession");

  nameProfileElement.textContent = profileNameInput.value;
  jobProfileElement.textContent = profileJobInput.value;
}

formEditProfile.addEventListener("submit", formEditProfileSubmitHandler);
submitFormEditProfileButton.addEventListener("click", toggleEditProfilePopup);
//

const cardsElement = document.querySelector(".cards");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".cards__item");

function createElement(item) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector(".cards__title");
  const cardImage = card.querySelector(".cards__image");
  const cardLikeButton = card.querySelector(".cards__like-button");
  const cardDeleteButton = card.querySelector(".cards__trash-button");
  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  cardLikeButton.addEventListener("click", cardLikeButtonClick);
  cardDeleteButton.addEventListener("click", cardDeleteButtonClick);

  return card;
}

const cardLikeButtonClick = (e) => {
  e.target.classList.toggle("cards__like-button_active");
};

const cardDeleteButtonClick = (e) => {
  e.target.closest(".cards__item").remove();
};

const renderCard = (item) => {
  const element = createElement(item);
  cardsElement.prepend(element);
};

initialCards.forEach(function (item) {
  renderCard(item);
});

const formAddCard = document.querySelector(".popup__form-add-card");
const titleCardInput = formAddCard.querySelector('[name="title-card"]');
const linkImageInput = formAddCard.querySelector('[name="link-image"]');

function formAddCardSubmitHandler(e) {
  e.preventDefault();

  const newCardObject = {
    name: titleCardInput.value,
    link: linkImageInput.value,
  };
  renderCard(newCardObject);
}

formAddCard.addEventListener("submit", formAddCardSubmitHandler);
submitFormAddCardButton.addEventListener("click", toggleAddCardPopup);
