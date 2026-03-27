const postsWrapper = document.querySelector('#posts-wrapper');
const favouriteList = document.querySelector('#favourite-list')

const posts = [
  {
    id: 1,
    title: "Основы JavaScript",
    description: "Изучите ключевые концепции JavaScript: переменные, функции, замыкания и прототипы."
  },
  {
    id: 2,
    title: "Работа с массивами",
    description: "Узнайте о методах map, filter, reduce и других способах эффективной обработки данных."
  },
  {
    id: 3,
    title: "Асинхронность в JS",
    description: "Разбираемся с промисами, async/await и колбэками для работы с асинхронным кодом."
  },
  {
    id: 4,
    title: "Введение в React",
    description: "Компонентный подход, хуки, управление состоянием и основы экосистемы React."
  },
  {
    id: 5,
    title: "Стилизация в CSS",
    description: "Flexbox, Grid, анимации и методологии написания чистых стилей."
  },
  {
    id: 6,
    title: "TypeScript для начинающих",
    description: "Типизация, интерфейсы, дженерики — пишите более надёжный код."
  },
  {
    id: 7,
    title: "Оптимизация веб-приложений",
    description: "Ленивая загрузка, кэширование, анализ бандла и метрики производительности."
  },
  {
    id: 8,
    title: "Работа с API",
    description: "Fetch, Axios, обработка ошибок и работа с эндпоинтами REST API."
  },
  {
    id: 9,
    title: "Webpack с нуля",
    description: "Настройка сборщика, загрузчики, плагины и оптимизация сборки."
  },
  {
    id: 10,
    title: "Безопасность в вебе",
    description: "XSS, CSRF, CORS и лучшие практики защиты приложений."
  }
];

const renderPosts = () => {

  let markup = ''
const postMarkup =posts.forEach((post) => {
  markup += `<div data-id="${post.id}" class="border rounded-3xl p-3 border-white w-100 h-50 flex gap-5 flex-col post">
            <h3 class="text-white text-xl font-bold">${post.title}</h3>
            <p class="text-white">${post.description}</p>
            <button class="rounded-md bg-blue-700 text-white px-3 py-1 cursor-pointer hover:bg-blue-800 disabled:opacity-75 disabled:bg-blue-700 disabled:cursor-auto">Добавить в избранное</button>
        </div>
        `
})
  postsWrapper.insertAdjacentHTML("beforeend", markup)
  
}



document.addEventListener("DOMContentLoaded", () => {

  renderPosts()

  postsWrapper.addEventListener("click", (e) => {
    if (e.target.matches(".post button")) {
      // console.log(e.target.closest("div").querySelector('h3'));
      const title = e.target.parentElement.querySelector("h3").textContent;
      const favoritesPostMarkup =`<li class="bg-gray-950 rounded-xl p-3 flex justify-between">
            <span>${title}</span>
            <button class="cursor-pointer">&times</button>
            </li>`
            favouriteList.insertAdjacentHTML("beforeend", favoritesPostMarkup)
    }
  })

})