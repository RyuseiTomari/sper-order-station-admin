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
      const checked = toggle.checked;
      const categoryContainer = toggle.closest(".input-multi-lang-input-container");
      const multiLangInputs = categoryContainer.querySelector(".multi-lang-input-container");
      const monolingualInput = categoryContainer.querySelector(".monolingual-input");

      if (checked) {
        multiLangInputs.style.display = "flex";
        monolingualInput.style.display = "none";
      } else {
        multiLangInputs.style.display = "none";
        monolingualInput.style.display = "block";
      }
    });
  });

  const formDetailsToggleLink = document.querySelector(".input-details-toggle-link");
  formDetailsToggleLink?.addEventListener("click", (e) => {
    const formDetailsContent = document.querySelector(".input-details-content");
    if (formDetailsContent.classList.contains("hidden")) {
      // 表示
      formDetailsContent.classList.remove("hidden", "fade-out");
      formDetailsContent.classList.add("fade-in");
      formDetailsToggleLink.textContent = "[ 詳細を非表示 ]";
    } else {
      // 非表示アニメーション
      formDetailsContent.classList.remove("fade-in");
      formDetailsContent.classList.add("fade-out");
      formDetailsToggleLink.textContent = "[ 詳細を表示 ]";
      formDetailsContent.addEventListener("animationend", function handler() {
        formDetailsContent.classList.add("hidden");
        formDetailsContent.classList.remove("fade-out");
        formDetailsContent.removeEventListener("animationend", handler);
      });
    }
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
});
