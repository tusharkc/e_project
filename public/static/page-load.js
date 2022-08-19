function pageLoad() {
  const loaderEl = document.getElementById('loader');
  loaderEl.style.display = `none`;
}

document.addEventListener('DOMContentLoaded', (event) => {
  pageLoad();
});

window.addEventListener('load', (event) => {
  setTimeout(() => {
    pageLoad();
  }, 500);
});
