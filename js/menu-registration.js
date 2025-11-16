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

  const registeredMenu = currentPanel.querySelector(".registered-menu-container");
  const registerableMenu = currentPanel.querySelector(".registerable-menu-container");

  const registeredMenuRows = registeredMenu.querySelectorAll("tbody tr");
  const registerableMenuRows = registerableMenu.querySelectorAll("tbody tr");

  registeredMenuRows.forEach((row) => {
    row.addEventListener("click", function (e) {
      if (selectedRow === this) {
        this.classList.remove("selected");
        selectedRow = null;
        updateArrowVisibility(this);
        return;
      }

      if (selectedRow) {
        selectedRow.classList.remove("selected");
      }

      this.classList.add("selected");
      selectedRow = this;
      updateArrowVisibility(this);
    });
  });

  function updateArrowVisibility(tr) {
    if (!selectedRow) return;

    const tbody = tr.parentElement;
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const selectedIndex = rows.indexOf(selectedRow);

    var upBtn = selectedRow.querySelector(".arrow-up");
    var downBtn = selectedRow.querySelector(".arrow-down");

    if (selectedIndex === 0) {
      upBtn.style.display = "none";
    } else {
      upBtn.style.display = "flex";
    }

    if (selectedIndex === rows.length - 1) {
      downBtn.style.display = "none";
    } else {
      downBtn.style.display = "flex";
    }
  }

  updateArrowVisibility();
});
