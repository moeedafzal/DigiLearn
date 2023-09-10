const routerQueries = window.location.href.split("?")[1];
const pageId = routerQueries.split("&")[0];

document
  .getElementById("back-to-page-button")
  .addEventListener("click", function () {
    window.location.href = `/pages?${pageId}`;
  });

document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = createLoadingScreen();
  document.body.appendChild(loadingScreen);

  async function editPageData() {
    try {
      const response = await fetch(`/get-page-data?${pageId}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      const pageContent = res.data.page_content;
      if (!pageContent) return;

      document.getElementById("page-title").innerHTML = res.data.page_title;

      const textarea = document.getElementsByTagName("textarea")[0];
      const saveButton = document.getElementById("save-button");


      textarea.innerHTML = pageContent;
      textarea.style.display = "block";
      saveButton.style.display = "block";

      saveButton.addEventListener("click", function () {
        const loadingScreen = createLoadingScreen();
        document.body.appendChild(loadingScreen);
        const content = textarea.value;
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

function createLoadingScreen() {
  const loadingScreen = document.createElement("div");
  loadingScreen.className = "loading-screen";
  loadingScreen.innerHTML = '<div class="loader"></div>';

  return loadingScreen;
}
