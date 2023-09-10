document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = createLoadingScreen();
  document.body.appendChild(loadingScreen);

  async function fetchModules() {
    try {
      const response = await fetch("/get-modules");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const moduleCardsContainer = document.getElementById("module-cards");

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

function createLoadingScreen() {
  const loadingScreen = document.createElement("div");
  loadingScreen.className = "loading-screen";
  loadingScreen.innerHTML = '<div class="loader"></div>';

  return loadingScreen;
}

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
  seeModuleButton.innerHTML = `<span>See Module</span> <img src="/img/vector.png" />`;

  // Append content to card
  card.appendChild(name);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(seeModuleButton);

  return card;
}
