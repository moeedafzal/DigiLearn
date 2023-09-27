import { startLoader, stopLoader } from "./utils.js";

// Take the page id out from the router query
const routerQueries = window.location.href.split("?")[1];
const pageNumber = routerQueries.split("&")[0].split("=")[1];
const isDevMode = routerQueries.includes("admin-mode=true");

const pageNavigationSection = document.getElementById(
  "page-navigation-section"
);

const pageNavigationSideBar = document.getElementById(
  "page-navigation-side-bar"
);

// If in DevMode "Edit Page" button is visible
if (isDevMode) {
  const editPageButton = document.getElementById("edit-page-button");
  editPageButton.style.display = "flex";
  editPageButton.addEventListener("click", function () {
    window.location.href = `/edit-page?pageNumber=${pageNumber}`;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  startLoader();

  async function getPageData() {
    try {
      // Fetching Page content from database
      const response = await fetch(`/get-page-data?pageNumber=${pageNumber}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      const pageContent = res.data.page_content;
      if (!pageContent) return;

      // Setting Page title
      document.getElementById("page-title").innerHTML = res.data.page_title;

      document.getElementById("page-content").innerHTML = res.data.page_content;
      // Page navigation buttons
      const backPageButton = document.getElementById("back-button");
      const nextPageButton = document.getElementById("next-button");

      // Displaying previous page button if current page is not the first one
      if (parseInt(pageNumber) > 1) {
        backPageButton.addEventListener("click", function () {
          // Adding a link of previous page
          window.location.href = `pages?pageNumber=${parseInt(pageNumber) - 1}`;
        });
      } else {
        backPageButton.style.display = "none";
      }

      // Displaying next page button if current page is not the last one
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

      // Creating divs for navigation each page

      res.data.all_pages_data.forEach((page) => {
        const pageDiv = document.createElement("div");

        function handlePageClick() {
          window.location.href = `pages?pageNumber=${page.page_number}`;
        }

        pageDiv.addEventListener("click", handlePageClick);

        const image = document.createElement("img");
        image.src = "/img/stars.svg";
        image.alt = "stars";

        if (page.title === res.data.page_title) {
          pageDiv.classList.add("active-page");
          image.src = "/img/stars-purple.svg";
        }

        const pageTitle = document.createElement("span");
        pageTitle.innerHTML = page.title;

        pageDiv.appendChild(image);
        pageDiv.appendChild(pageTitle);
        pageNavigationSection.appendChild(pageDiv);

        // Cloning the pageDiv and adding the event listener to the cloned element
        const clonedPageDiv = pageDiv.cloneNode(true);
        clonedPageDiv.addEventListener("click", handlePageClick);
        pageNavigationSideBar.appendChild(clonedPageDiv);
      });

      document.getElementById("main").style.display = "block";
    } catch (error) {
      console.error("There was a problem fetching the page data:", error);
    } finally {
      stopLoader();
    }
  }

  getPageData();
});
