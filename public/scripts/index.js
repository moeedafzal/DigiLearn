import { startLoader, stopLoader } from "./utils.js";

const startLearningButton = document.getElementById("start-learning-button");
const startLearningMenuButton = document.getElementById(
  "start-learning-menu-button"
);

document.addEventListener("DOMContentLoaded", function () {
  startLoader();

  async function fetchModules() {
    try {
      const response = await fetch("/get-modules");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      startLearningButton.addEventListener("click", function () {
        window.location.href = `pages?pageId=${data.rows[0].page_id}`;
      });

      startLearningMenuButton.addEventListener("click", function () {
        window.location.href = `pages?pageId=${data.rows[0].page_id}`;
      });

      const moduleCardsContainer = document.getElementById("module-cards");

      data.rows.forEach((module) => {
        const moduleCard = createModuleCard(module);
        moduleCardsContainer.appendChild(moduleCard);
      });
    } catch (error) {
      console.error("There was a problem fetching the modules:", error);
    } finally {
      stopLoader();
    }
  }

  fetchModules();
});

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
