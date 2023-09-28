const openMenuButton = document.getElementById("open-menu-button");
const smallScreenMenu = document.getElementById("small-screen-menu");
const body = document.body;

export function openMenu() {
  smallScreenMenu.style.right = "0";
  openMenuButton.innerHTML = `<img src="/img/cross-white.svg" alt="Close Menu Button">`;

  // disabling scrolling so that the navbar does not get scrolled up
  body.style.overflow = "hidden";
}

export function closeMenu() {
  smallScreenMenu.style.right = "-100%";
  openMenuButton.innerHTML = `<img src="/img/hamburger.svg" alt="Open Menu Button">`;

  // bringing back scrolling
  body.style.overflow = "auto";
}

export function startLoader() {
  const loadingScreen = document.createElement("div");
  loadingScreen.className = "loading-screen";
  loadingScreen.innerHTML = '<div class="loader"></div>';
  body.appendChild(loadingScreen);
}

export async function stopLoader() {
  const loadingScreen = document.querySelector(".loading-screen");
  body.removeChild(loadingScreen);
}
