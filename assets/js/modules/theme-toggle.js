export const init = function () {
  document.addEventListener('click', function (event) {
    if (!event.target.closest('[data-theme-toggle]')) {
      return;
    }
    const dark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (e) {
      return;
    }
  });
};
