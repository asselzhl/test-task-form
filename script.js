const form = document.querySelector("form");
const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstNameError");
const lastName = document.querySelector("#lastName");
const lastNameError = document.querySelector("#lastNameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const birthDate = document.querySelector("#birthDate");
const birthDateError = document.querySelector("#birthDateError");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");
const passwordConfirm = document.querySelector("#passwordConfirm");
const passwordConfirmError = document.querySelector("#passwordConfirmError");
const submitButton = document.querySelector("#submitButton");


function validateFirstName() {
    if (!isValidName(firstName.value)) {
      firstNameError.innerHTML = "Недопустимые символы или неверная длина";
    } else {
      firstNameError.innerHTML = "";
    }
    updateSubmitButton();
}

function validateLastName() {
    if (!isValidName(lastName.value)) {
      lastNameError.innerHTML = "Недопустимые символы или неверная длина";
    } else {
      lastNameError.innerHTML = "";
    }
    updateSubmitButton();
}

function validateEmail() {
    if (!isValidEmail(email.value)) {
      emailError.innerHTML = "Невалидный email-адрес";
    } else {
      emailError.innerHTML = "";
    }
    updateSubmitButton();
}

function validateBirthDate() {
    if (!isValidAge(new Date(birthDate.value))) {
      birthDateError.innerHTML = "Вы должны быть старше 18 лет";
    } else {
      birthDateError.innerHTML = "";
    }
    updateSubmitButton();
}

function validatePassword() {
    if (!isValidPassword(password.value)) {
      passwordError.innerHTML = "Недопустимый пароль. Минимальная длина пароля 8 символов. Пароль должен содержать минимум одну цифру, по одной заглавной и строчной буквы и один символ.";
    } else {
      passwordError.innerHTML = "";
    }
    updateSubmitButton();
}

function validateConfirmPassword() {
    if (password.value !== passwordConfirm.value) {
      passwordConfirmError.innerHTML =
        "Пароль и подтверждение пароля не совпадают";
    } else {
      passwordConfirmError.innerHTML = "";
    }
    updateSubmitButton();
}

function updateSubmitButton() {
    let formValid = validateForm();
    submitButton.disabled = !formValid;
}

form.addEventListener("submit", function (event) {
  if (!validateForm()) {
    event.preventDefault();
  }
});

function isValidName(name) {
  let validChars = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
  let validLength = name.length >= 2 && name.length <= 30;
  return validChars.test(name) && validLength;
}

function isValidEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
  return passwordRegex.test(password);
}

function isValidAge(birthDate) {
  let currentDate = new Date();
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  let monthDiff = currentDate.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age >= 18;
}


function validateForm() {
    let birthDateConverted = new Date(birthDate.value);
    
    return (
      isValidName(firstName.value) &&
      isValidName(lastName.value) &&
      isValidEmail(email.value) &&
      isValidAge(birthDateConverted) &&
      isValidPassword(password.value) &&
      password.value === passwordConfirm.value
    );
}


firstName.addEventListener("blur", validateFirstName);
lastName.addEventListener("blur", validateLastName);
email.addEventListener("blur", validateEmail);
birthDate.addEventListener("blur", validateBirthDate);
password.addEventListener("blur", validatePassword);
passwordConfirm.addEventListener("blur", validateConfirmPassword);
