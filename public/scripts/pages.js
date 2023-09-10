const routerQueries = window.location.href.split("?")[1];
const pageId = routerQueries.split("&")[0];
const isDevMode = routerQueries.includes("admin-mode=true");

if (isDevMode) {
  const editPageButton = document.getElementById("edit-page-button");
  editPageButton.style.display = "flex";
  editPageButton.addEventListener("click", function () {
    window.location.href = `/edit-page?pageId=${pageId.split("=")[1]}`;
  });
}

document
  .getElementById("back-to-course-button")
  .addEventListener("click", function () {
    window.location.href = "index.html";
  });

document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = createLoadingScreen();
  document.body.appendChild(loadingScreen);

  async function getPageData() {
    try {
      const response = await fetch(`/get-page-data?${pageId}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      const pageContent = res.data.page_content;
      if (!pageContent) return;

      document.getElementById("page-title").innerHTML = res.data.page_title;

      document.getElementById("page-content").innerHTML = res.data.page_content;
      const backPageButton = document.getElementById("back-button");
      const nextPageButton = document.getElementById("next-button");

      if (res.data.back_page_id) {
        backPageButton.addEventListener("click", function () {
          window.location.href = `pages?pageId=${res.data.back_page_id}`;
        });
      } else {
        backPageButton.style.display = "none";
      }

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
      document.body.removeChild(loadingScreen);
    }
  }

  getPageData();
});

function createLoadingScreen() {
  const loadingScreen = document.createElement("div");
  loadingScreen.className = "loading-screen";
  loadingScreen.innerHTML = '<div class="loader"></div>';

  return loadingScreen;
}
