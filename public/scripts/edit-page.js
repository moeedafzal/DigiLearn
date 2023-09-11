// Take the page id out from the router query
const routerQueries = window.location.href.split("?")[1];
const pageId = routerQueries.split("&")[0];

// Button to exit back to page.html
document
  .getElementById("back-to-page-button")
  .addEventListener("click", function () {
    window.location.href = `/pages?${pageId}`;
  });

document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = createLoadingScreen();
  document.body.appendChild(loadingScreen);
  // Fetching data of the requested module
  async function editPageData() {
    try {
      const response = await fetch(`/get-page-data?${pageId}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      const pageContent = res.data.page_content;
      if (!pageContent) return;

      // Page title of the requested module
      document.getElementById("page-title").innerHTML = res.data.page_title;

      // Text area to edit the module content
      const pageContentContainer = document.getElementById(
        "page-content-container"
      );
      const saveButton = document.getElementById("save-button");

      pageContentContainer.innerHTML = pageContent;
      pageContentContainer.style.display = "block";
      saveButton.style.display = "block";

      // Saving posting the content for update
      saveButton.addEventListener("click", function () {
        const loadingScreen = createLoadingScreen();
        document.body.appendChild(loadingScreen);
        const content = pageContentContainer.value;
        fetch("/edit-page-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pageId: pageId.split("=")[1],
            content: content,
          }),
        })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(() => {
            document.body.removeChild(loadingScreen);
          });
      });
    } catch (error) {
      console.error("There was a problem fetching the page data:", error);
    } finally {
      document.body.removeChild(loadingScreen);
    }
  }

  editPageData();
});

// Loading screen while fetching data and posting data
function createLoadingScreen() {
  const loadingScreen = document.createElement("div");
  loadingScreen.className = "loading-screen";
  loadingScreen.innerHTML = '<div class="loader"></div>';

  return loadingScreen;
}
