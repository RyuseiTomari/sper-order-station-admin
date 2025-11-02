document.addEventListener("DOMContentLoaded", () => {
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
});
