const smallScreenSideBar = document.getElementById("small-screen-side-bar");
const openSideBarButton = document.getElementById("open-side-bar-button");
const closeSideBarButton = document.getElementById("close-side-bar-button");
const body = document.body;

smallScreenSideBar.style.left = "-100%";

openSideBarButton.addEventListener("click", () => {
  smallScreenSideBar.style.left = "0";

  // disabling scrolling so that the navbar does not get scrolled up
  body.style.overflow = "hidden";
});

closeSideBarButton.addEventListener("click", () => {
  smallScreenSideBar.style.left = "-100%";

  // bringing back scrolling
  body.style.overflow = "auto";
});
