let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close-button");
let submitFormButton = document.querySelector(".popup__submit-button");

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

let formElement = document.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__input-name");
let jobInput = formElement.querySelector(".popup__input-profession");

function formSubmitHandler(evt) {
  evt.preventDefault();

  jobInput.getAttribute("value");
  nameInput.getAttribute("value");

  let nameProfileElement = document.querySelector(".profile__name");
  let jobProfileElement = document.querySelector(".profile__profession");

  nameProfileElement.textContent = nameInput.value;
  jobProfileElement.textContent = jobInput.value;
}

formElement.addEventListener("submit", formSubmitHandler);
submitFormButton.addEventListener("click", closePopup);
