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
const buttonClosePopupPhoto = popupPhoto.querySelector(".popup__close-button");
const buttonClosePopupEditProfile = popupEditProfile.querySelector(
  ".popup__close-button"
);
const buttonClosePopupAddCart = popupAddCard.querySelector(
  ".popup__close-button"
);
const buttonSubmitFormEditProfile = document.querySelector(
  '[name="submit-edit-profile"]'
);

const buttonSubmitFormAddCart = document.querySelector(
  '[name="submit-add-card"]'
);

/////////////////////////////////////////////

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
  document.addEventListener("click", closePopupOutsideClick);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
  document.removeEventListener("click", closePopupOutsideClick);
}

function closeByEsc(e) {
  if (e.key === "Escape") {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
  }
}

function closePopupOutsideClick(e) {
  if (e.target.classList.contains("popup")) {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
  }
}

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

  cardLikeButton.addEventListener("click", clickButtonLikeCard);
  cardDeleteButton.addEventListener("click", clickButtonDeleteCard);

  cardImage.addEventListener("click", function () {
    popupPhotoImage.src = cardImage.src;
    popupPhotoImage.alt = cardImage.alt;
    popupPhotoCaption.textContent = cardImage.alt;
    openPopup(popupPhoto);
  });

  return card;
}

const clickButtonLikeCard = (e) => {
  e.target.classList.toggle("cards__like-button_active");
};

const clickButtonDeleteCard = (e) => {
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

////////////////////////////////////////////////////////////////
