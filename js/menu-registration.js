document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("tabChanged", () => {
    initSortableTable();
  });

  // D&Dによる並び替え
  let selectedRow = null;

  let registeredMenuSortable = null;
  let registerableMenuSortable = null;

  initSortableTable();

  function initSortableTable() {
    const currentPanel = document.querySelector(".tab-panel.active");
    const registeredMenuTbody = currentPanel.querySelector(".registered-menu-container .tbody");
    const registerableMenuTbody = currentPanel.querySelector(".registerable-menu-container .tbody");
    const rows = currentPanel.querySelectorAll(".tbody .tr");

    if (registeredMenuSortable) registeredMenuSortable.destroy();
    if (registerableMenuSortable) registerableMenuSortable.destroy();

    registeredMenuSortable = new Sortable(registeredMenuTbody, {
      group: "shared",
      animation: 150,
      onSort: onSort,
      onEnd: onEnd,
      delay: isTouchDevice() ? 300 : 0,
      touchStartThreshold: 5,
      chosenClass: "dragging",
      scroll: true,
      scrollSensitivity: 100,
    });

    registerableMenuSortable = new Sortable(registerableMenuTbody, {
      group: "shared",
      animation: 150,
      onSort: onSort,
      onEnd: onEnd,
      delay: isTouchDevice() ? 300 : 0,
      touchStartThreshold: 5,
      chosenClass: "dragging",
      scroll: true,
      scrollSensitivity: 100,
    });

    rows.forEach((row) => {
      const arrowBtns = row.querySelectorAll(".arrow-up, .arrow-down, .arrow-right, .arrow-left");

      row.removeEventListener("click", handleRowClick);
      row.addEventListener("click", handleRowClick);

      arrowBtns.forEach((btn) => {
        btn.removeEventListener("click", handleArrowBtnClick);
        btn.addEventListener("click", handleArrowBtnClick);
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

  function handleRowClick(e) {
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
    updateArrowVisibility();
  }

  function handleArrowBtnClick(e) {
    e.stopPropagation();

    const btn = e.currentTarget;
    const tr = btn.closest(".tr");
    const tbody = tr.parentElement;

    if (btn.classList.contains("arrow-up")) {
      const prev = tr.previousElementSibling;
      if (prev) {
        tbody.insertBefore(tr, prev);
        clearArrowVisibility(tr);
        updateArrowVisibility();
        onSort({ item: tr });
        tr.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    if (btn.classList.contains("arrow-down")) {
      const next = tr.nextElementSibling;
      if (next) {
        tbody.insertBefore(next, tr);
        clearArrowVisibility(tr);
        updateArrowVisibility();
        onSort({ item: tr });
        tr.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    if (btn.classList.contains("arrow-right")) {
      const registerableTbody =
        document.querySelector(".registerable-menu-container.active .tbody") ||
        document.querySelector(".registerable-menu-container .tbody");
      if (registerableTbody) {
        registerableTbody.appendChild(tr);
        clearArrowVisibility(tr);
        updateArrowVisibility();
        onSort({ item: tr });
        tr.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    if (btn.classList.contains("arrow-left")) {
      const registeredTbody =
        document.querySelector(".registered-menu-container.active .tbody") ||
        document.querySelector(".registered-menu-container .tbody");
      if (registeredTbody) {
        registeredTbody.appendChild(tr);
        clearArrowVisibility(tr);
        updateArrowVisibility();
        onSort({ item: tr });
        tr.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  function updateArrowVisibility() {
    if (!selectedRow) return;

    const tbody = selectedRow.parentElement;
    const rows = Array.from(tbody.querySelectorAll(".tr"));
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

  // タッチデバイスかどうかを判定
  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  document.addEventListener("click", function () {
    if (selectedRow) {
      selectedRow.classList.remove("selected");
      clearArrowVisibility(selectedRow);
      selectedRow = null;
    }
  });
});
