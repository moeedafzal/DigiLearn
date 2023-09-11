import { startLoader, stopLoader, closeMenu } from "./utils.js";

const contactButton = document.getElementById("contact-button");
const contactMenuButton = document.getElementById("contact-menu-button");
const contactPopup = document.getElementById('contact-popup');
const closeButton = document.getElementById("close-button")
const form = document.getElementsByTagName("form")[0];

contactButton.addEventListener("click", function () {
  contactPopup.style.display = "flex";
});

contactMenuButton.addEventListener("click", function () {
  closeMenu();
  contactPopup.style.display = "flex";
});

closeButton.addEventListener("click", function () {
  contactPopup.style.display = "none";
});

form.addEventListener("submit", async function (e) {
  startLoader();
  e.preventDefault();

  const formData = new FormData(form);
  const body = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  await fetch("/insert_contact_information", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      stopLoader();
      form.reset();
    });

  this.submit();
});