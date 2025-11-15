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
