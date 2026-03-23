let authForm,
  authFormEmail,
  authFormPassword,
  authFormSubmit,
  emailEror,
  passwordError,
  alertError,
  alertClose,
  registrationLinkInForm,
  registrationLinkInAlert,
  togglePassworVisibility;
wrapper = document.querySelector("#wrapper");
const validationRules = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
};

const authFormMarkup = `<form
        id="auth-form"
        class="border border-gray-50/50 rounded-xl flex flex-col p-10 pt-5 gap-3 w-full max-w-md"
      >
        <h1 class="text-white text-3xl md-5">Авторизация</h1>
        <div>
          <input
            id="auth-form-email"
            type="text"
            name="email"
            placeholder="Введите почту"
            class="rounded-md border border-gray-50/50 text-white px-3 py-1 w-full"
          />
          <p id="email-error" class="text-red-700 text-xs mt-1 invisible">
            почта не верна
          </p>
        </div>
        <div class="relative">
          <input
            id="auth-form-password"
            type="password"
            name="password"
            placeholder="Введите пароль"
            class="rounded-md border border-gray-50/50 text-white px-3 py-1 disabled:opacity-75 w-full"
            disabled
          />
          <button id="toggle-passwor-visibility" class="absolute right-1 top-1/4 -translate-y-1/3 w-5 h-5 appearance-none cursor-pointer  bg-no-repeat hidden" style="background-image: url(https://api.iconify.design/streamline:visible.svg?color=%23ffffff);" data-visibility="false"></button>

          <p id="password-error" class="text-red-700 text-xs mt-1 invisible">
            не верный пароль
          </p>
        </div>

        <input
          id="auth-form-submit"
          type="submit"
          value="Войти"
          class="rounded-md bg-blue-700 text-white px-3 py-1 cursor-pointer hover:bg-blue-800 disabled:opacity-75 disabled:bg-blue-700 disabled:cursor-auto"
          disabled
        />
        <a id="registration-link-in-form" href="#" class="text-blue-700 underline self-center hover:no-underline hover:text-white">Регистрация</a>
      </form>`;

const regFormMarkup = `<form
        id="auth-form"
        class="border border-gray-50/50 rounded-xl flex flex-col p-10 pt-5 gap-3 w-full max-w-md"
      >
        <h1 class="text-white text-3xl md-5">Регистрация</h1>
        <div>
          <input
            id="auth-form-email"
            type="text"
            name="email"
            placeholder="Введите почту"
            class="rounded-md border border-gray-50/50 text-white px-3 py-1 w-full"
          />
          <p id="email-error" class="text-red-700 text-xs mt-1 invisible">
            почта не верна
          </p>
        </div>
        <div class="relative">
          <input
            id="auth-form-password"
            type="password"
            name="password"
            placeholder="Введите пароль"
            class="rounded-md border border-gray-50/50 text-white px-3 py-1 disabled:opacity-75 w-full"
            disabled
          />
          <button id="toggle-passwor-visibility" class="absolute right-1 top-1/4 -translate-y-1/3 w-5 h-5 appearance-none cursor-pointer  bg-no-repeat hidden" style="background-image: url(https://api.iconify.design/streamline:visible.svg?color=%23ffffff);" data-visibility="false"></button>

          <p id="password-error" class="text-red-700 text-xs mt-1 invisible">
            не верный пароль
          </p>
        </div>

        <input
          id="auth-form-submit"
          type="submit"
          value="Зарегистрироваться"
          class="rounded-md bg-blue-700 text-white px-3 py-1 cursor-pointer hover:bg-blue-800 disabled:opacity-75 disabled:bg-blue-700 disabled:cursor-auto"
          disabled
        />
        <a id="registration-link-in-form" href="#" class="text-blue-700 underline self-center hover:no-underline hover:text-white">Войти</a>
      </form>`;

const users = [
  { email: "user1@mail.ru", password: "QAZ!333w" },
  { email: "user3@mail.ru", password: "QAZ!333w" },
  { email: "user5@mail.ru", password: "QAZ!333w" },
];

const formValiodation = {
  email: false,
  password: false,
};

let isAlertErrorVisible = false;

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

const render = (markup) => {
  wrapper.insertAdjacentHTML("afterbegin", markup);
};

const init = () => {
  authForm = document.querySelector("#auth-form");
  authFormEmail = document.querySelector("#auth-form-email");
  authFormPassword = document.querySelector("#auth-form-password");
  authFormSubmit = document.querySelector("#auth-form-submit");
  emailEror = document.querySelector("#email-error");
  passwordError = document.querySelector("#password-error");
  alertError = document.querySelector("#alert-error");
  alertClose = document.querySelector("#alert-close");
  registrationLinkInForm = document.querySelector("#registration-link-in-form");
  registrationLinkInAlert = document.querySelector(
    "#registration-link-in-alert",
  );

  togglePassworVisibility = document.querySelector(
    "#toggle-passwor-visibility",
  );
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
        alertError.classList.remove("opacity-0");
        isAlertErrorVisible = true;
        if (isAlertErrorVisible) {
          setTimeout(() => {
            alertError.classList.add("opacity-0");
          }, 7000);
        }
      } else {
        alert("Вход разрешён");
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
      alertError.classList.add("opacity-0");
    }
  });

  registrationLinkInAlert.addEventListener("click", (e) => {
    e.preventDefault();
    authForm.remove();
    render(regFormMarkup);
  });
  registrationLinkInForm.addEventListener("click", (e) => {
    e.preventDefault()
    authForm.remove();
    render(regFormMarkup);
  });
};
document.addEventListener("DOMContentLoaded", () => {
  render(authFormMarkup);
  init();
});
