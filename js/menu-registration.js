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

      initSortableTable();
    });
  });

  // D&Dによる並び替え
  let selectedRow = null;

  let registeredMenuSortable = null;
  let registerableMenuSortable = null;

  initSortableTable();

  function initSortableTable() {
    const currentPanel = document.querySelector(".tab-panel.active");
    const registeredMenuTbody = currentPanel.querySelector(".registered-menu-container tbody");
    const registerableMenuTbody = currentPanel.querySelector(".registerable-menu-container tbody");
    const rows = currentPanel.querySelectorAll("tbody tr");

    if (registeredMenuSortable) registeredMenuSortable.destroy();
    if (registerableMenuSortable) registerableMenuSortable.destroy();

    registeredMenuSortable = new Sortable(registeredMenuTbody, {
      group: "shared",
      animation: 150,
      onSort: onSort,
      onEnd: onEnd,
    });

    registerableMenuSortable = new Sortable(registerableMenuTbody, {
      group: { name: "shared", pull: "clone" },
      animation: 150,
      onSort: onSort,
      onEnd: onEnd,
    });

    rows.forEach((row) => {
      const arrowBtns = row.querySelectorAll(".arrow-up, .arrow-down, .arrow-right, .arrow-left");

      row.addEventListener("click", function (e) {
        e.stopPropagation();

        if (selectedRow === this) {
          this.classList.remove("selected");
          clearArrowVisibility(this);
          selectedRow = null;
          return;
        }

        if (selectedRow) {
          selectedRow.classList.remove("selected");
          clearArrowVisibility(selectedRow);
        }

        this.classList.add("selected");
        selectedRow = this;
        updateArrowVisibility(this);
      });

      arrowBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();

          const tr = btn.closest("tr");
          const tbody = tr.parentElement;

          if (btn.classList.contains("arrow-up")) {
            const prev = tr.previousElementSibling;
            if (prev) {
              tbody.insertBefore(tr, prev);
              tr.classList.remove("selected");
              clearArrowVisibility(tr);
              updateArrowVisibility(tr);
              onSort({ item: tr });
              tr.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }

          if (btn.classList.contains("arrow-down")) {
            const next = tr.nextElementSibling;
            if (next) {
              tbody.insertBefore(next, tr);
              tr.classList.remove("selected");
              clearArrowVisibility(tr);
              updateArrowVisibility(tr);
              onSort({ item: tr });
              tr.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }

          // 右ボタン：登録済み→登録可能へ
          if (btn.classList.contains("arrow-right")) {
            const registerableTbody =
              document.querySelector(".registerable-menu-container.active tbody") ||
              document.querySelector(".registerable-menu-container tbody");
            if (registerableTbody) {
              registerableTbody.appendChild(tr);
              tr.classList.remove("selected");
              clearArrowVisibility(tr);
              updateArrowVisibility(tr);
              onSort({ item: tr });
              tr.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }

          // 左ボタン：登録可能→登録済みへ
          if (btn.classList.contains("arrow-left")) {
            const registeredTbody =
              document.querySelector(".registered-menu-container.active tbody") ||
              document.querySelector(".registered-menu-container tbody");
            if (registeredTbody) {
              registeredTbody.appendChild(tr);
              tr.classList.remove("selected");
              clearArrowVisibility(tr);
              updateArrowVisibility(tr);
              onSort({ item: tr });
              tr.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }
        });
      });
    });
  }

  // D&D ソート完了時の処理(ここでAPIコールや重複制御などを行う)
  function onSort(e) {
    console.log("Sorted:", e);
  }

  // D&D ドラッグ終了時の処理
  function onEnd(e) {
    console.log("Drag Ended:", e);
    clearArrowVisibility(e.item);
  }

  function updateArrowVisibility(tr) {
    if (!selectedRow) return;

    const tbody = selectedRow.parentElement;
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

  document.addEventListener("click", function () {
    if (selectedRow) {
      selectedRow.classList.remove("selected");
      clearArrowVisibility(selectedRow);
      selectedRow = null;
    }
  });
});
