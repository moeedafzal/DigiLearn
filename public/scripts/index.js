const getStartedButtons = document.querySelectorAll(".get-started-button");

getStartedButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = `pages.html?pageNumber=1`;
  });
});
