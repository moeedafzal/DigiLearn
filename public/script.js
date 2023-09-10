document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = createLoadingScreen();
  document.body.appendChild(loadingScreen);

  async function fetchModules() {
    try {
      const response = await fetch("/modules?moduleName=Unit one");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const testContainer = document.getElementById("test-container");
      testContainer.innerHTML = JSON.stringify(data);

    } catch (error) {
      console.error("There was a problem fetching the modules:", error);
    } finally {
      document.body.removeChild(loadingScreen);
    }
  }

  fetchModules();
});


function createLoadingScreen () {
  const loadingScreen = document.createElement("div");
  loadingScreen.className = "loading-screen";
  loadingScreen.innerHTML = '<div class="loader"></div>';
  
  return loadingScreen;
}
