window.addEventListener("DOMContentLoaded", () => {
  const tabBar = document.getElementById("tab-bar");
  if (tabBar) setupTabBar(tabBar, document.getElementById("tab-content"));
});

function setupTabBar(el, contentEl) {
  let selectedIdx = 0;
  let anchor = window.location.hash.substring(1);
  var tabs = {};
  for (let idx = 0; idx < el.children.length; idx++) {
    tabs[el.children[idx].innerText] = idx;
    el.children[idx].addEventListener("click", (e) => {
      e.preventDefault();
      selectTabItem(el, contentEl, idx, false);
    });
  }
  if (anchor in tabs) selectedIdx = tabs[anchor];
  selectTabItem(el, contentEl, selectedIdx, true);
}

function selectTabItem(tabBar, content, selectedIdx, init) {
  for (let idx = 0; idx < tabBar.children.length; idx++) {
    tabBar.children[idx].classList.remove("active");
    content.children[idx].classList.add("hidden");
  }
  tabBar.children[selectedIdx].classList.add("active");
  content.children[selectedIdx].classList.remove("hidden");
  if (!init) history.replaceState({}, '', '#' + tabBar.children[selectedIdx].innerText);
}
