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

  rows.forEach((row) => {
    row.addEventListener("click", function (e) {
      e.stopPropagation();

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

    row.addEventListener("mouseleave", function () {
      if (selectedRow) {
        clearArrowVisibility(selectedRow);
        selectedRow.classList.remove("selected");
        selectedRow = null;
      }
    });
  });

  function updateArrowVisibility(tr) {
    if (!selectedRow) return;

    const tbody = tr.parentElement;
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const selectedIndex = rows.indexOf(selectedRow);

    const upBtn = selectedRow.querySelector(".arrow-up");
    const downBtn = selectedRow.querySelector(".arrow-down");
    const rightBtn = selectedRow.querySelector(".arrow-right");
    const leftBtn = selectedRow.querySelector(".arrow-left");

    rows.forEach((row) => {
      clearArrowVisibility(row);
    });

    if (isRegisterableRow(selectedRow)) {
      leftBtn?.classList.add("arrow-btn-visible");
      return;
    }

    if (selectedIndex === 0) {
      upBtn?.classList.remove("arrow-btn-visible");
    } else {
      upBtn?.classList.add("arrow-btn-visible");
    }

    if (selectedIndex === rows.length - 1) {
      downBtn?.classList.remove("arrow-btn-visible");
    } else {
      downBtn?.classList.add("arrow-btn-visible");
    }

    rightBtn?.classList.add("arrow-btn-visible");
  }

  function isRegisterableRow(tr) {
    return tr.closest(".registerable-menu-container") !== null;
  }

  function clearArrowVisibility(row) {
    row.querySelectorAll(".arrow-up, .arrow-down, .arrow-right, .arrow-left").forEach((btn) => {
      btn?.classList.remove("arrow-btn-visible");
    });
  }

  updateArrowVisibility();
});
