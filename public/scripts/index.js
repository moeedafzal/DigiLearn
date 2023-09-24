import { startLoader, stopLoader } from "./utils.js";

const getStartedButtons = document.querySelectorAll(".get-started-button");
const startLearningMenuButton = document.getElementById(
  "start-learning-menu-button"
);

document.addEventListener("DOMContentLoaded", function () {
  startLoader();

  // Fetching modules from database
  async function fetchModules() {
    try {
      const response = await fetch("/get-initial-page-id");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const {page_id} = await response.json();

      getStartedButtons.forEach((getStartedButton) => {
        getStartedButton.addEventListener("click", function () {
          // Adding the desired link in button
          window.location.href = `pages?pageId=${page_id}`;
        });
      });

      startLearningMenuButton.addEventListener("click", function () {
        window.location.href = `pages?pageId=${page_id}`;
      });
    } catch (error) {
      console.error("There was a problem fetching the modules:", error);
    } finally {
      stopLoader();
    }
  }

  fetchModules();
});