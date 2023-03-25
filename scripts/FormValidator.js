export class FormValidator {
  formsConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  };
  constructor(formsConfig, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = formsConfig.inputSelector;
    this._submitButtonSelector = formsConfig.submitButtonSelector;
    this._inactiveButtonClass = formsConfig.inactiveButtonClass;
    this._inputErrorClass = formsConfig.inputErrorClass;
    this._errorClass = formsConfig.errorClass;
  }
  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _disableSubmitButton = (buttonSubmit) => {
    buttonSubmit.setAttribute("disabled", "disabled");
    buttonSubmit.classList.add(this._inactiveButtonClass);
  };

  _setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    this._toogleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toogleButtonState(inputList, buttonElement);
        this._checkInputValidity(formElement, inputElement);
      });
    });
  };

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._formSelector));

    formList.forEach((formElement) => {
      const buttonElement = formElement.querySelector(
        this._submitButtonSelector
      );
      formElement.addEventListener("submit", (e) => {
        e.preventDefault();
        this._disableSubmitButton(buttonElement);
      });
      this._setEventListeners(formElement);
    });
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toogleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };
}
