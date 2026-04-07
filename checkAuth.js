const url = location.pathname.replace(/\//g, "");
const cookieArray = document.cookie.split(";");
cookieArray.forEach((e) => {
  const [name, value] = e.split("=");
  if ((name !== "authUser" || isNaN(value)) && url === "posts.html") {
    location.href = "index.html"
  }
  else if (name === "authUser" && !isNaN(value) && url === "index.html") {
    location.href = "posts.html"
  }
}
);