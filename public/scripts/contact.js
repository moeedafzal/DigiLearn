import { closeMenu } from "./utils.js";

const contactButtons = document.querySelectorAll(".contact-button");
const contactPopup = document.getElementById("contact-popup");
const closeButton = document.getElementById("close-button");
const form = document.getElementsByTagName("form")[0];

contactButtons.forEach((contactButton) => {
  contactButton.addEventListener("click", function () {
    contactPopup.style.display = "flex";
  });
});

closeButton.addEventListener("click", function () {
  contactPopup.style.display = "none";
});

form.addEventListener("submit", async function (e) {
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
      form.reset();
    });

  this.submit();
});