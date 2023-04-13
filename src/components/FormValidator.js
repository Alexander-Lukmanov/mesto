export class FormValidator {
  constructor(formsConfig, form) {
    this._form = form;
    this._inputSelector = formsConfig.inputSelector;
    this._submitButtonSelector = formsConfig.submitButtonSelector;
    this._inactiveButtonClass = formsConfig.inactiveButtonClass;
    this._inputErrorClass = formsConfig.inputErrorClass;
    this._errorClass = formsConfig.errorClass;

    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  disableSubmitButton = () => {
    this._buttonElement.setAttribute("disabled", "disabled");
    this._buttonElement.classList.add(this._inactiveButtonClass);
  };

  _enableSubmitButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toogleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  };

  _setEventListeners = () => {
    this._toogleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toogleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };
}
