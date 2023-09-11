import { startLoader, stopLoader } from "./utils.js";

// Take the page id out from the router query
const routerQueries = window.location.href.split("?")[1];
const pageId = routerQueries.split("&")[0];
const isDevMode = routerQueries.includes("admin-mode=true");

// If in DevMode "Edit Page" button is visible
if (isDevMode) {
  const editPageButton = document.getElementById("edit-page-button");
  editPageButton.style.display = "flex";
  editPageButton.addEventListener("click", function () {
    window.location.href = `/edit-page?pageId=${pageId.split("=")[1]}`;
  });
}

// Button exiting back to homepage
document
  .getElementById("back-to-course-button")
  .addEventListener("click", function () {
    window.location.href = "index.html";
  });

document.addEventListener("DOMContentLoaded", function () {
  startLoader();

  async function getPageData() {
    try {
      // Fetching Module content from database

      const response = await fetch(`/get-page-data?${pageId}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      const pageContent = res.data.page_content;
      if (!pageContent) return;

      // Page title according to the requested module
      document.getElementById("page-title").innerHTML = res.data.page_title;

      document.getElementById("page-content").innerHTML = res.data.page_content;
      // Modules navigation buttons
      const backPageButton = document.getElementById("back-button");
      const nextPageButton = document.getElementById("next-button");

      // Displaying previous module button if previous ID exits
      if (res.data.back_page_id) {
        backPageButton.addEventListener("click", function () {
          // Adding a link of previous module
          window.location.href = `pages?pageId=${res.data.back_page_id}`;
        });
      } else {
        backPageButton.style.display = "none";
      }

      // Displaying next module button if next ID exits
      if (res.data.next_page_id) {
        nextPageButton.addEventListener("click", function () {
          window.location.href = `pages?pageId=${res.data.next_page_id}`;
        });
      } else {
        nextPageButton.style.display = "none";
      }

      document.getElementById("main").style.display = "block";
    } catch (error) {
      console.error("There was a problem fetching the page data:", error);
    } finally {
      stopLoader();
    }
  }

  getPageData();
});

