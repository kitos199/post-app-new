const authForm = document.querySelector("#auth-form");
const authFormEmail = document.querySelector("#auth-form-email");
const authFormPassword = document.querySelector("#auth-form-password");
const authFormSubmit = document.querySelector("#auth-form-submit");
const emailEror = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const showPassword = document.querySelector("#show-password");
const hidePassword = document.querySelector("#hide-password");
const validationRules = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
};

const formValiodation = {
  email: false,
  password: false,
};

const checkSubmitDisabled = function () {
  if (formValiodation.email && formValiodation.password) {
    authFormSubmit.disabled = false;
  } else {
    authFormSubmit.disabled = true;
  }
};

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const fromObj = new FormData(e.target);
  const formData = Object.fromEntries(fromObj);

  if (
    formData.email.match(validationRules.emailRegex) &&
    formData.password.match(validationRules.passwordRegex)
  ) {
    console.log("yes");
  }
});

authFormEmail.addEventListener("input", (e) => {
  if (e.target.value.match(validationRules.emailRegex)) {
    formValiodation.email = true;
    authFormPassword.disabled = false;
    emailEror.classList.add("invisible");
  } else {
    formValiodation.email = false;
    authFormPassword.disabled = true;
    emailEror.classList.remove("invisible");
  }
  checkSubmitDisabled();
});

authFormPassword.addEventListener("input", (e) => {
  if (e.target.value.match(validationRules.passwordRegex)) {
    formValiodation.password = true;
    passwordError.classList.add("invisible");
  } else {
    formValiodation.password = false;
    passwordError.classList.remove("invisible");
  }
  checkSubmitDisabled();
});

showPassword.addEventListener("change", (e) => {
  authFormPassword.type = "text";
  showPassword.classList.add("hidden");
  hidePassword.classList.remove("hidden");
});
