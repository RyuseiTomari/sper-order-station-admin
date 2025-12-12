document.addEventListener("DOMContentLoaded", () => {
  // サイドバーのアクティブ状態の制御
  const buttons = document.querySelectorAll(".sidebar .sidebar-btn");

  const normalize = (p) => {
    if (!p) return "/";
    return p.replace(/\/+$/, "") || "/";
  };

  const currentPath = normalize(location.pathname).split("/").slice(0, 2).join("/") || "/";

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      buttons.forEach((b) => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
    });
  });

  buttons.forEach((btn) => {
    const href = btn.getAttribute("href");
    if (!href || href === "#") return;

    try {
      const targetPath = normalize(new URL(href, location.origin).pathname).split("/").slice(0, 2).join("/") || "/";
      if (targetPath === currentPath) {
        btn.classList.add("active");
      }
    } catch (err) {}
  });

  // 戻る / 進むボタンの実装
  const backBtn = document.querySelector(".navbar-back-btn");
  const forwardBtn = document.querySelector(".navbar-forward-btn");
  const backImg = backBtn?.querySelector("img");
  const forwardImg = forwardBtn?.querySelector("img");

  const updateNavButtons = () => {
    // 戻る履歴の有無で backBtn の状態を更新
    if (window.history.length > 1) {
      backBtn?.removeAttribute("disabled");
      backImg.src = "/images/back-active.png";

      forwardBtn?.removeAttribute("disabled");
      forwardImg.src = "/images/forward-active.png";
    } else {
      backBtn?.setAttribute("disabled", "true");
      backImg.src = "/images/back-inactive.png";

      forwardBtn?.setAttribute("disabled", "true");
      forwardImg.src = "/images/forward-inactive.png";
    }
  };

  updateNavButtons();

  backBtn?.addEventListener("click", () => {
    history.back();
  });

  forwardBtn?.addEventListener("click", () => {
    history.forward();
  });

  // ハンバーガーメニューの制御
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const sidebar = document.querySelector(".sidebar");

  hamburgerBtn?.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("active");
    sidebar.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      sidebar.classList.remove("active");
      hamburgerBtn.classList.remove("active");
    }
  });

  // 多言語入力切り替えスイッチの制御
  const toggleSwitches = document.querySelectorAll(".form-toggle-switch");
  toggleSwitches.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      const categoryContainer = toggle.closest(".input-multi-lang-input-container");
      const multiLangInputs = categoryContainer.querySelector(".multi-lang-input-container");
      const monolingualInput = categoryContainer.querySelector(".monolingual-input");

      multiLangInputs.classList.toggle("expanded");
      monolingualInput.classList.toggle("expanded");
    });
  });

  // 詳細設定の表示制御
  const formDetailsToggleLink = document.querySelector(".input-details-toggle-link");
  formDetailsToggleLink?.addEventListener("click", () => {
    const formDetailsContent = document.querySelector(".input-details-content");
    formDetailsContent?.classList.toggle("hidden");
  });

  // 数値inputの+-ボタン制御
  document.querySelectorAll(".number-input-container").forEach((wrapper) => {
    const input = wrapper.querySelector('input[type="number"]');
    const minusBtn = wrapper.querySelector(".stepper-minus");
    const plusBtn = wrapper.querySelector(".stepper-plus");

    const stepAttr = input.getAttribute("data-step");
    const step = stepAttr ? parseInt(stepAttr, 10) || 1 : 1;

    minusBtn?.addEventListener("click", () => {
      let val = parseInt(input.value, 10) || 0;
      if (val - step >= (parseInt(input.min, 10) || 0)) {
        input.value = val - step;
        input.dispatchEvent(new Event("input"));
      }
    });

    plusBtn?.addEventListener("click", () => {
      let val = parseInt(input.value, 10) || 0;
      input.value = val + step;
      input.dispatchEvent(new Event("input"));
    });
  });

  // 入力ヒントアイコンの制御
  const hintIcons = document.querySelectorAll(".input-hint-icon");
  hintIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      const dialog = document.getElementById("tips-dialog");
      if (dialog) {
        dialog.showModal();
      }
    });
  });

  // タイアログの閉じるボタン制御
  const tipsDialog = document.getElementById("tips-dialog");
  const closeBtn = tipsDialog?.querySelector(".dialog-close-btn");

  closeBtn?.addEventListener("click", () => {
    tipsDialog.classList.add("closing");
    setTimeout(() => {
      tipsDialog.close();
      tipsDialog.classList.remove("closing");
    }, 150);
  });

  tipsDialog?.addEventListener("click", (e) => {
    if (e.target === tipsDialog) {
      tipsDialog.classList.add("closing");
      setTimeout(() => {
        tipsDialog.close();
        tipsDialog.classList.remove("closing");
      }, 150);
    }
  });

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

      // カスタムイベントを発火
      document.dispatchEvent(new CustomEvent("tabChanged", { detail: { targetTab } }));
    });
  });

  // ファイルアップロードボタンの制御
  document.querySelectorAll(".upload-btn-container").forEach((container) => {
    const fileInput = container.querySelector('input[type="file"]');
    const fileNameSpan = container.querySelector(".file-name");
    fileInput?.addEventListener("change", (e) => {
      const file = e.target.files[0];
      fileNameSpan.textContent = file ? file.name : "";
    });
  });

  // フォントサイズ設定の制御
  const fontSizeRadioButtons = document.querySelectorAll('input[name="fontSizeSetting"]');
  const body = document.body;
  const FONT_SIZE_STORAGE_KEY = "preferredFontSize";

  fontSizeRadioButtons.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const selectedSize = e.target.value;
      localStorage.setItem(FONT_SIZE_STORAGE_KEY, selectedSize);
      body.classList.remove("font-size-large");
      body.classList.add(`font-size-${selectedSize}`);
    });
  });

  function loadFontSize() {
    const savedSize = localStorage.getItem(FONT_SIZE_STORAGE_KEY) || "medium";

    body.classList.remove("size-medium", "size-large");
    body.classList.add(`font-size-${savedSize}`);

    const targetRadio = document.querySelector(`input[value="${savedSize}"]`);
    if (targetRadio) {
      targetRadio.checked = true;
    }
  }

  loadFontSize();
});
