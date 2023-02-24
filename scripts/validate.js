const formsConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formsConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formsConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formsConfig.inputErrorClass);
  errorElement.classList.remove(formsConfig.errorClass);
  errorElement.textContent = "";
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(formsConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    formsConfig.submitButtonSelector
  );
  toogleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toogleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(
    document.querySelectorAll(formsConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (e) {
      e.preventDefault();
    });
    setEventListeners(formElement);
  });
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toogleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formsConfig.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(formsConfig.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

enableValidation();
