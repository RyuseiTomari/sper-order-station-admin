document.addEventListener("DOMContentLoaded", () => {
  // サイドバーのアクティブ状態の制御
  const buttons = document.querySelectorAll(".sidebar .sidebar-btn");

  const normalize = (p) => {
    if (!p) return "/";
    return p.replace(/\/+$/, "") || "/";
  };

  const currentPath = normalize(location.pathname);

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
      const targetPath = normalize(new URL(href, location.origin).pathname);
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
      backImg.src = "./images/back-active.png";

      forwardBtn?.removeAttribute("disabled");
      forwardImg.src = "./images/forward-active.png";
    } else {
      backBtn?.setAttribute("disabled", "true");
      backImg.src = "./images/back-inactive.png";

      forwardBtn?.setAttribute("disabled", "true");
      forwardImg.src = "./images/forward-inactive.png";
    }
  };

  updateNavButtons();

  backBtn?.addEventListener("click", () => {
    history.back();
  });

  forwardBtn?.addEventListener("click", () => {
    history.forward();
  });
});
