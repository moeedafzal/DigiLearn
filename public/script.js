document.addEventListener("DOMContentLoaded", function () {
  async function fetchModules() {
    await fetch("/modules?moduleName=Unit one")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        const testContainer = document.getElementById("test-container");
        testContainer.innerHTML=JSON.stringify(data);
      })
      .catch((error) => {
        console.error("There was a problem fetching the modules:", error);
      });
  }

  fetchModules();
});
