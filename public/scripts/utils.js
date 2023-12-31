const openMenuButton = document.getElementById("open-menu-button");
const smallScreenMenu = document.getElementById("small-screen-menu");
const getStartedButtons = document.querySelectorAll(".get-started-button");
const body = document.body;

getStartedButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = `pages.html?pageNumber=1`;
  });
});

export function openMenu() {
  smallScreenMenu.style.right = "0";
  openMenuButton.innerHTML = `<img src="/img/cross-white.svg" alt="Close Icon"  width="13" height="13">`;

  // disabling scrolling so that the navbar does not get scrolled up
  body.style.overflow = "hidden";
}

export function closeMenu() {
  smallScreenMenu.style.right = "-100%";
  openMenuButton.innerHTML = `<img src="/img/hamburger.svg" alt="Menu Icon"  width="17" height="17" >`;

  // bringing back scrolling
  body.style.overflow = "auto";
}