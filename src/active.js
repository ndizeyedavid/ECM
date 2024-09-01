document.addEventListener("DOMContentLoaded", function () {
  let tabs = document.querySelectorAll(".tab");
  let contents = document.querySelectorAll(".tab-content");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function (e) {
      let targetId = tab.id.replace("Tab", "Content");

      // Hide all content divs
      contents.forEach(function (content) {
        content.classList.add("hidden");
      });

      // Remove active class from all tabs
      tabs.forEach(function (tab) {
        tab.classList.remove(
          "font-bold",
          "text-blue-500",
          "bg-white",
          "border-blue-500"
        );
        tab.classList.add("font-semibold", "text-gray-600", "border-gray-100");
      });

      // Show the target content
      document.getElementById(targetId).classList.remove("hidden");

      // Add active class to the clicked tab
      tab.classList.add(
        "font-bold",
        "text-blue-500",
        "bg-white",
        "border-blue-500"
      );
      tab.classList.remove("font-semibold", "text-gray-600", "border-gray-100");
    });
  });
});
