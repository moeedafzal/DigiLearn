// Obtaining contact button from DOM
const contactButton = document.getElementById('contact-button');
const contactPopup = document.getElementById('contact-popup');
const closeButton = document.getElementById("close-button");
const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", async function (e) {
  const loadingScreen = createLoadingScreen();
  document.body.appendChild(loadingScreen);
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
      document.body.removeChild(loadingScreen);
    });

  this.submit();
});

// Event listeners for contact button
contactButton.addEventListener("click", function () {
  contactPopup.style.display = "flex";
});

closeButton.addEventListener("click", function () {
  contactPopup.style.display = "none";
});


document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = createLoadingScreen();
  document.body.appendChild(loadingScreen);

  // Fecthing modules from database
  async function fetchModules() {
    try {
      const response = await fetch("/get-modules");
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();


      // Obtaining start learning button from DOM
      const startLearningButton = document.getElementById("start-learning-button");

      startLearningButton.addEventListener("click", function () {
        // Adding the desired link in button
        window.location.href = `pages?pageId=${data.rows[0].page_id}`;
      });

      const moduleCardsContainer = document.getElementById("module-cards");

      // Displaying modules
      data.rows.forEach((module) => {
        const moduleCard = createModuleCard(module);
        moduleCardsContainer.appendChild(moduleCard);
      });
    } catch (error) {
      console.error("There was a problem fetching the modules:", error);
    } finally {
      document.body.removeChild(loadingScreen);
    }
  }

  fetchModules();
});

// Responsive loading screen everytime data is fetched
function createLoadingScreen() {
  const loadingScreen = document.createElement("div");
  loadingScreen.className = "loading-screen";
  loadingScreen.innerHTML = '<div class="loader"></div>';

  return loadingScreen;
}

// Making Module cards for homepage
function createModuleCard(module) {
  const card = document.createElement("div");

  // Create card content
  const name = document.createElement("h2");
  name.textContent = module.name;

  const title = document.createElement("h3");
  title.textContent = module.title;

  const description = document.createElement("p");
  description.textContent = module.description;

  const seeModuleButton = document.createElement("button");
  seeModuleButton.innerHTML = `<span>See Module</span> <img src="/img/next-arrow.svg" />`;
  seeModuleButton.addEventListener("click", function () {
    window.location.href = `pages?pageId=${module.page_id}`;
  });

  // Append content to card
  card.appendChild(name);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(seeModuleButton);

  return card;
}
