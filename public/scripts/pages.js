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

      document.getElementById("page-content").innerHTML = pageContent;
      // Page navigation buttons
      const backPageButton = document.getElementById("back-button");
      const nextPageButton = document.getElementById("next-button");

      // Displaying previous page button if current page is not the first one
      if (parseInt(pageNumber) > 1) {
        backPageButton.addEventListener("click", function () {
          // Adding a link of previous page
          window.location.href = `pages.html?pageNumber=${
            parseInt(pageNumber) - 1
          }`;
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
          window.location.href = `pages.html?pageNumber=${
            parseInt(pageNumber) + 1
          }`;
        });
      } else {
        nextPageButton.style.display = "none";
      }

      const allModulesData = {};

      // populating allModulesData with module titles and entry page numbers
      res.data.all_pages_data.forEach((page) => {
        const moduleTitle = page.module_title;
        const moduleEntryPageNumber = page.module_entry_page_number;
        if (moduleTitle && moduleEntryPageNumber) {
          if (!allModulesData[moduleTitle]) {
            allModulesData[moduleTitle] = {
              entryPageNumber: moduleEntryPageNumber,
              pages: [],
            };
          }
          allModulesData[moduleTitle].pages.push({
            pageNumber: page.page_number,
            pageTitle: page.page_title,
          });
        } else {
          if (!allModulesData["Bonus Project Briefs"]) {
            allModulesData["Bonus Project Briefs"] = {
              entryPageNumber: page.page_number,
              pages: [],
            };
          }
        }
      });

      // populating page navigation section with module titles and pages
      for (const moduleTitle in allModulesData) {
        const moduleAnchor = document.createElement("a");

        function handleModuleClick() {
          window.location.href = `pages.html?pageNumber=${allModulesData[moduleTitle].entryPageNumber}`;
        }

        moduleAnchor.addEventListener("click", handleModuleClick);
        moduleAnchor.innerHTML = moduleTitle;
        const pagesSpan = document.createElement("span");

        if (
          !allModulesData[moduleTitle].pages.length &&
          parseInt(pageNumber) === parseInt(allModulesData[moduleTitle].entryPageNumber)
        ) {
          moduleAnchor.classList.add("active-page");
        }

        allModulesData[moduleTitle].pages.forEach((page) => {
          const pageAnchor = document.createElement("a");

          function handlePageClick() {
            window.location.href = `pages.html?pageNumber=${page.pageNumber}`;
          }

          pageAnchor.addEventListener("click", handlePageClick);

          if (parseInt(page.pageNumber) === parseInt(pageNumber)) {
            pageAnchor.classList.add("active-page");
            moduleAnchor.classList.add("active-page");
          }

          const pageTitle = document.createElement("span");
          pageTitle.innerHTML = page.pageTitle;

          pageAnchor.appendChild(pageTitle);
          pagesSpan.appendChild(pageAnchor);
        });

        pageNavigationSection.appendChild(moduleAnchor);
        pageNavigationSection.appendChild(pagesSpan);

        const clonedModuleAnchor = moduleAnchor.cloneNode(true);
        clonedModuleAnchor.addEventListener("click", handleModuleClick);
        pageNavigationSideBar.appendChild(clonedModuleAnchor);

        const clonedPagesSpan = pagesSpan.cloneNode(true);
        clonedPagesSpan.addEventListener("click", handleModuleClick);
        pageNavigationSideBar.appendChild(clonedPagesSpan);
      }

      document.getElementById("main").style.display = "block";
    } catch (error) {
      console.error("There was a problem fetching the page data:", error);
    }
  }

  getPageData();
});
