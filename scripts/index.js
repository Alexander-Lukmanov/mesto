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
const popup = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup__container");
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-card");
const popupPhoto = document.querySelector(".popup_photo");
const popupPhotoImage = document.querySelector(".popup__figure-img");
const popupPhotoCaption = document.querySelector(".popup__figcaption");
const closePopupPhotoButton = popupPhoto.querySelector(".popup__close-button");
const closePopupEditProfileButton = popupEditProfile.querySelector(
  ".popup__close-button"
);
const closePopupAddCartButton = popupAddCard.querySelector(
  ".popup__close-button"
);
const submitFormEditProfileButton = document.querySelector(
  '[name="submit-edit-profile"]'
);
const submitFormAddCardButton = document.querySelector(
  '[name="submit-add-card"]'
);

/////////////////////////////////////////////

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePopup(popupPhoto);
    closePopup(popupAddCard);
    closePopup(popupEditProfile);
  }
});

document.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(popupPhoto);
    closePopup(popupAddCard);
    closePopup(popupEditProfile);
  }
});

cardAddButton.addEventListener("click", function () {
  openPopup(popupAddCard);
});
closePopupAddCartButton.addEventListener("click", function () {
  closePopup(popupAddCard);
});

profileEditButton.addEventListener("click", function () {
  profileNameInput.value = nameProfileElement.textContent;
  profileJobInput.value = jobProfileElement.textContent;
  openPopup(popupEditProfile);
});
closePopupEditProfileButton.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

closePopupPhotoButton.addEventListener("click", function () {
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

function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();

  profileJobInput.getAttribute("value");
  profileNameInput.getAttribute("value");

  nameProfileElement.textContent = profileNameInput.value;
  jobProfileElement.textContent = profileJobInput.value;
  closePopup(popupEditProfile);
}

formEditProfile.addEventListener("submit", formEditProfileSubmitHandler);
//

const cardsContainer = document.querySelector(".cards");
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
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  cardLikeButton.addEventListener("click", cardLikeButtonClick);
  cardDeleteButton.addEventListener("click", cardDeleteButtonClick);

  cardImage.addEventListener("click", function () {
    openPopup(popupPhoto);
    popupPhotoImage.src = cardImage.src;
    popupPhotoImage.alt = cardImage.alt;
    popupPhotoCaption.textContent = cardImage.alt;
  });

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
  cardsContainer.prepend(element);
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

  titleCardInput.value = "";
  linkImageInput.value = "";
  closePopup(popupAddCard);
}

formAddCard.addEventListener("submit", formAddCardSubmitHandler);

////////////////////////////////////////////////////////////////
