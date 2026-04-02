const cookieArray = document.cookie.split(";");
cookieArray.forEach((e) => {
  const [name, value] = e.split("=");
    if (name !== "authUser" || isNaN(value)) {
        if (location.pathname.trim() === "post.html") {
          location.href= "posts.html"
      }
  }
});