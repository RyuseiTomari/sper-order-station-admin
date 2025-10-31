document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".sidebar .sidebar-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      buttons.forEach((b) => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
    });
  });
});
