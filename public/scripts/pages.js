import { startLoader, stopLoader } from "./utils.js";

// Take the page id out from the router query
const routerQueries = window.location.href.split("?")[1];
const pageNumber = routerQueries.split("&")[0].split("=")[1];
const isDevMode = routerQueries.includes("admin-mode=true");

// If in DevMode "Edit Page" button is visible
if (isDevMode) {
  const editPageButton = document.getElementById("edit-page-button");
  editPageButton.style.display = "flex";
  editPageButton.addEventListener("click", function () {
    window.location.href = `/edit-page?pageNumber=${pageNumber}`;
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
      const response = await fetch(`/get-page-data?pageNumber=${pageNumber}`);

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

      // Displaying previous module button if current page is not the first one
      if (parseInt(pageNumber) > 1) {
        backPageButton.addEventListener("click", function () {
          // Adding a link of previous module
          window.location.href = `pages?pageNumber=${parseInt(pageNumber) - 1}`;
        });
      } else {
        backPageButton.style.display = "none";
      }

      // Displaying next module button if current page is not the last one
      if (
        parseInt(res.data.last_page_number) &&
        parseInt(res.data.last_page_number) > parseInt(pageNumber)
      ) {
        nextPageButton.addEventListener("click", function () {
          window.location.href = `pages?pageNumber=${parseInt(pageNumber) + 1}`;
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
