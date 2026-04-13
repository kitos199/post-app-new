const postsWrapper = document.querySelector("#posts-wrapper");
const favouriteList = document.querySelector("#favourite-list");
const logout = document.querySelector("#logout");

// const posts = [
//   {
//     id: 1,
//     title: "Основы JavaScript",
//     description: "Изучите ключевые концепции JavaScript: переменные, функции, замыкания и прототипы."
//   },
//   {
//     id: 2,
//     title: "Работа с массивами",
//     description: "Узнайте о методах map, filter, reduce и других способах эффективной обработки данных."
//   },
//   {
//     id: 3,
//     title: "Асинхронность в JS",
//     description: "Разбираемся с промисами, async/await и колбэками для работы с асинхронным кодом."
//   },
//   {
//     id: 4,
//     title: "Введение в React",
//     description: "Компонентный подход, хуки, управление состоянием и основы экосистемы React."
//   },
//   {
//     id: 5,
//     title: "Стилизация в CSS",
//     description: "Flexbox, Grid, анимации и методологии написания чистых стилей."
//   },
//   {
//     id: 6,
//     title: "TypeScript для начинающих",
//     description: "Типизация, интерфейсы, дженерики — пишите более надёжный код."
//   },
//   {
//     id: 7,
//     title: "Оптимизация веб-приложений",
//     description: "Ленивая загрузка, кэширование, анализ бандла и метрики производительности."
//   },
//   {
//     id: 8,
//     title: "Работа с API",
//     description: "Fetch, Axios, обработка ошибок и работа с эндпоинтами REST API."
//   },
//   {
//     id: 9,
//     title: "Webpack с нуля",
//     description: "Настройка сборщика, загрузчики, плагины и оптимизация сборки."
//   },
//   {
//     id: 10,
//     title: "Безопасность в вебе",
//     description: "XSS, CSRF, CORS и лучшие практики защиты приложений."
//   }
// ];

// localStorage.setItem("posts", JSON.stringify(posts))

const getUserId = () => {
  let userId;
  const cookieArray = document.cookie.split(";");
  cookieArray.forEach((e) => {
    const [name, value] = e.split("=");
    if (name === "authUser") {
      userId = Number(value);
    }
  });
  return userId;
};

const userId = getUserId();

const posts = JSON.parse(localStorage.getItem("posts"));
let favourites = JSON.parse(localStorage.getItem("favourites"))?.find(
  (obj) => Number(obj.id) === userId,
)?.posts;
const renderFavourites = () => {
  const postUi = postsWrapper.querySelectorAll(".post");
  let markup = "";

  favourites.forEach((postId) => {
    const post = posts.find((e) => e.id === postId);
    markup += `<li data-id="${post.id}" class="bg-gray-950 rounded-xl p-3 flex justify-between">
             <span>${post.title}</span>
            <button class="cursor-pointer delete-favourite">&times</button>
            </li>`;
    for (const element of postUi) {
      if (Number(element.dataset.id) === postId) {
        const button = element.querySelector("button");
        button.disabled = true;
        button.textContent = "В избранном";
      }
    }
  });

  favouriteList.insertAdjacentHTML("beforeend", markup);
};

const renderPosts = () => {
  let markup = "";
  posts.forEach((post) => {
    markup += `<div data-id="${post.id}" class="border rounded-3xl p-3 border-white w-100 min-h-50 flex gap-5 flex-col post">
            <h3 class="text-white text-xl font-bold">${post.title}</h3>
            <p class="text-white">${post.description}</p>
            <button class="rounded-md bg-blue-700 text-white px-3 py-1 cursor-pointer hover:bg-blue-800 disabled:opacity-75 disabled:bg-blue-700 disabled:cursor-auto">Добавить в избранное</button>
        </div>
        `;
  });
  postsWrapper.insertAdjacentHTML("afterbegin", markup);
};

document.addEventListener("DOMContentLoaded", () => {
  renderPosts();

  if (favourites && favourites.length > 0) {
    renderFavourites();
  }

  postsWrapper.addEventListener("click", (e) => {
    if (e.target.matches(".post button")) {
      const id = Number(e.target.closest("div").dataset.id);

      // let favourites = JSON.parse(localStorage.getItem("favourites"));
      // if (favorutiesLS) {
      //   favorutiesLS.push(id)
      //   localStorage.setItem("favourites", JSON.stringify(favorutiesLS))
      // }
      // if (!favourites) {
      //   favourites = [];
      // }
      let favourites = JSON.parse(localStorage.getItem("favourites"))?.find(
        obj => Number(obj.id) === userId
      )?.posts;
      if (favourites && favourites.find((e) => e.id === id)) {
        return
      }
      
      // if (!favourites.includes(id)) {
      const post = posts.find((post) => id === post.id);
      if (post?.id) {
        // favourites.push(id);
        // localStorage.setItem("favourites", JSON.stringify(favourites));
        // const jsonFavouritesLs = localStorage.getItem("favourites");

        if (!favourites) {
  favourites = []
        }
        favourites.push(post.id)
        const jsonFavouritesLs = localStorage.getItem("favourites");
        if (jsonFavouritesLs) {
          console.log(135);
          let allUserFavourites = JSON.parse(jsonFavouritesLs)
          if (allUserFavourites.length === 0) {
            localStorage.setItem("favourites", {
              id : userId,
            posts :[post.id]})
          } else {
            let isUSer = false
            allUserFavourites.forEach(e => {
              if (e.id === userId) {
                e.posts = favourites;
                isUSer=true
              }
              localStorage.setItem("favourites", JSON.stringify(allUserFavourites));
            });
            if (isUSer === false) {
              allUserFavourites.push({
                
              })
               localStorage.setItem("favourites", )
            }
          }
          
          localStorage.setItem("favourites", JSON.stringify(allUserFavourites));
          
          const favouritesPostMarkup = `<li data-id="${post.id}" class="bg-gray-950 rounded-xl p-3 flex justify-between">
             <span>${post.title}</span>
            <button class="cursor-pointer delete-favourite">&times</button>
            </li>`;
          favouriteList.insertAdjacentHTML("beforeend", favouritesPostMarkup);
          e.target.disabled = true;
          e.target.textContent = "В избранном";
        } else {
          alert("По пробуйте позже")
        }
      }
    }
    //       if (jsonFavouritesLs && jsonFavouritesLs.length > 0) {
    //         const favouritesLs = JSON.parse(jsonFavouritesLs);
    //         favouritesLs.forEach((obj) => {
    //           if (obj.id === userId) {
    //             obj.posts.push(id);
    //           }
    //         });
    //         localStorage.setItem("favourites", JSON.stringify(favouritesLs));
    //       } else {
    //         // favouritesLs = [];
    //         const userObj = {
    //           id: userId,
    //           posts:[post.id]
    //         }
    //         localStorage.setItem("favourites", JSON.stringify([userObj]));
    //       }
    //       const favouritesPostMarkup = `<li data-id="${post.id}" class="bg-gray-950 rounded-xl p-3 flex justify-between">
    //          <span>${post.title}</span>
    //         <button class="cursor-pointer delete-favourite">&times</button>
    //         </li>`;
    //       favouriteList.insertAdjacentHTML("beforeend", favouritesPostMarkup);
    //       e.target.disabled = true;
    //       e.target.textContent = "В избранном";
    //     } else {
    //       alert("Попробуйте позже");
    //     }
    //   // }
    // }
  });

  favouriteList.addEventListener("click", (e) => {
    if (e.target.matches(".delete-favourite")) {
      const id = e.target.parentElement.dataset.id;
      // const post = favourites.find(e => Number(id) === e)

      let favourites = JSON.parse(localStorage.getItem("favourites"));
      if (!favourites) {
        alert("Локал сторедж удален");
        favouriteList.textContent = "";
      } else {
        const ind = favourites.findIndex(e => e.posts.includes(Number(id)));
        console.log(ind);

        if (ind !== -1) {
          favourites.splice(ind, 1);
          localStorage.setItem("favourites", JSON.stringify(favourites));
          e.target.parentElement.remove();
          //
          const posts = postsWrapper.querySelectorAll(".post");
          for (const element of posts) {
            if (element.dataset.id === id) {
              const button = element.querySelector("button");
              button.disabled = false;
              button.textContent = "Добавить в избранное";
            }
          }
        } else {
          alert("Попробуйте снова");
        }
      }
    }
  });
});
