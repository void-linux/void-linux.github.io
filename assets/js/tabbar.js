window.addEventListener("DOMContentLoaded", () => {
  const tabBar = document.getElementById("tab-bar");
  if (tabBar) setupTabBar(tabBar, document.getElementById("tab-content"));
});

function setupTabBar(el, contentEl) {
  let selectedIdx = 0;
  selectTabItem(el, contentEl, selectedIdx);
  for (let idx = 0; idx < el.children.length; idx++) {
    el.children[idx].addEventListener("click", (e) => {
      e.preventDefault();
      selectTabItem(el, contentEl, idx);
    });
  }
}

function selectTabItem(tabBar, content, selectedIdx) {
  for (let idx = 0; idx < tabBar.children.length; idx++) {
    tabBar.children[idx].classList.remove("active");
    content.children[idx].classList.add("hidden");
  }
  tabBar.children[selectedIdx].classList.add("active");
  content.children[selectedIdx].classList.remove("hidden");
}
