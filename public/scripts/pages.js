const pageId = window.location.href.split("?")[1];

document
        .getElementById("back-to-course-button")
        .addEventListener("click", function () {
          window.location.href = "index.html";
        });

document.addEventListener("DOMContentLoaded", function () {
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
    }
  }

  getPageData();
});
