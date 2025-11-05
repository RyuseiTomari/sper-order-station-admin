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

  // 多言語入力切り替えスイッチの制御
  const toggleSwitches = document.querySelectorAll(".form-toggle-switch");
  toggleSwitches.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      const checked = toggle.checked;
      const categoryContainer = toggle.closest(".form-category-input-container");
      const multiLangInputs = categoryContainer.querySelector(".form-multi-lang-inputs");
      const monolingualInput = categoryContainer.querySelector(".form-monolingual-input");

      if (checked) {
        multiLangInputs.style.display = "flex";
        monolingualInput.style.display = "none";
      } else {
        multiLangInputs.style.display = "none";
        monolingualInput.style.display = "block";
      }
    });
  });

  const formDetailsToggleLink = document.querySelector(".form-details-toggle-link");
  formDetailsToggleLink.addEventListener("click", (e) => {
    const formDetailsContent = document.querySelector(".form-details-content");
    formDetailsContent.classList.toggle("hidden");
    formDetailsToggleLink.textContent = formDetailsContent.classList.contains("hidden")
      ? "[ 詳細を表示 ]"
      : "[ 詳細を非表示 ]";
  });
});
