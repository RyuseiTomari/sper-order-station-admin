document.addEventListener("DOMContentLoaded", () => {
  // タブメニューの切り替え
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons?.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.dataset.tab;

      tabButtons?.forEach((btn) => btn.classList.remove("active"));
      tabPanels?.forEach((panel) => panel.classList.remove("active"));

      button.classList.add("active");
      document.querySelector(`[data-panel="${targetTab}"]`).classList.add("active");
    });
  });

  let selectedRow = null;
  const currentPanel = document.querySelector(".tab-panel.active");
  const rows = currentPanel.querySelectorAll("tbody tr");

  console.log(rows);

  rows.forEach((row) => {
    row.addEventListener("click", function (e) {
      if (selectedRow === this) {
        this.classList.remove("selected");
        selectedRow = null;
        // updateArrowVisibility();
        return;
      }

      if (selectedRow) {
        selectedRow.classList.remove("selected");
      }

      this.classList.add("selected");
      selectedRow = this;
      // updateArrowVisibility();
    });
  });
});
