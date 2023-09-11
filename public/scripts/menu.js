import { openMenu, closeMenu } from "./utils.js";

const openMenuButton = document.getElementById("open-menu-button");
const smallScreenMenu = document.getElementById("small-screen-menu");

smallScreenMenu.style.right = "-100%";

openMenuButton.addEventListener("click", () => {
  if (smallScreenMenu.style.right === "-100%") {
    openMenu();
  } else {
    closeMenu();
  }
});


