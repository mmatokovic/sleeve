(function () {
  let theme;
  try {
    theme = localStorage.getItem('theme');
  } catch (e) {
    theme = null;
  }
  const dark = theme ? theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', dark);
})();
