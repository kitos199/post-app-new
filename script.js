const authForm = document.querySelector("#auth-form");
const authFormEmail = document.querySelector("#auth-form-email");
const authFormPassword = document.querySelector("#auth-form-password");
const authFormSubmit = document.querySelector("#auth-form-submit");
const emailEror = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const alertError = document.querySelector('#alert-error')
const alertClose = document.querySelector('#alert-close')
const togglePassworVisibility = document.querySelector(
  "#toggle-passwor-visibility",
);
const validationRules = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
};

const users = [
  { email: "user1@mail.ru", password: "QAZ!333w" },
  { email: "user3@mail.ru", password: "QAZ!333w" },
  { email: "user5@mail.ru", password: "QAZ!333w" },
];

const formValiodation = {
  email: false,
  password: false,
};

let isAlertErrorVisible=false

const passwordIcons = {
  eyeOpen:
    "url(https://api.iconify.design/streamline:visible.svg?color=%23ffffff)",
  eyeClose:
    "url(https://api.iconify.design/streamline:invisible-1.svg?color=%23ffffff)",
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
    // try {
    //   users.forEach((user) => {
    //     if (
    //       formData.email === user.email &&
    //       formData.password === user.password
    //     ) {
    //       console.log(135);
    //       throw new Erorr("");
    //     }
    //   });
    // } catch (error) {}
    const isUsers = users.find(
      (user) =>
        formData.email === user.email && formData.password === user.password,
    );
    if (!isUsers) {
      alertError.classList.remove("opacity-0")
      isAlertErrorVisible = true
      if (isAlertErrorVisible) {
        setTimeout(() => {
        alertError.classList.add("opacity-0")
      },7000)
    };
    }
    else {
      alert("Вход разрешён")
    }
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
  if (e.target.value) {
    togglePassworVisibility.classList.remove("hidden");
  } else {
    togglePassworVisibility.classList.add("hidden");
  }
  if (e.target.value.match(validationRules.passwordRegex)) {
    formValiodation.password = true;
    passwordError.classList.add("invisible");
  } else {
    formValiodation.password = false;
    passwordError.classList.remove("invisible");
  }
  checkSubmitDisabled();
});

togglePassworVisibility.addEventListener("click", (e) => {
  if (e.target.dataset.visibility == "true") {
    authFormPassword.type = "password";
    e.target.dataset.visibility = "false";
    e.target.style.backgroundImage = passwordIcons.eyeOpen;
  } else {
    console.log(e.target.dataset.visibility);
    authFormPassword.type = "text";
    e.target.dataset.visibility = "true";
    e.target.style.backgroundImage = passwordIcons.eyeClose;
  }
  authFormPassword.focus();
});

alertClose.addEventListener("click", (e) => {
  if (isAlertErrorVisible) {
    alertError.classList.add("opacity-0")
  }
})