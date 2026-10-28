const setOpen = function (button, open) {
  button.setAttribute('aria-expanded', open ? 'true' : 'false');
  const menu = document.getElementById(button.getAttribute('aria-controls'));
  if (menu) {
    menu.hidden = !open;
  }
};

const openButtons = function () {
  return document.querySelectorAll('[data-menu-toggle][aria-expanded="true"]');
};

export const init = function () {
  document.addEventListener('click', function (event) {
    const button = event.target.closest('[data-menu-toggle]');
    if (button) {
      setOpen(button, button.getAttribute('aria-expanded') !== 'true');
      return;
    }
    openButtons().forEach(function (open) {
      if (!open.parentElement.contains(event.target)) {
        setOpen(open, false);
      }
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') {
      return;
    }
    openButtons().forEach(function (open) {
      const focusInside = open.parentElement.contains(document.activeElement);
      setOpen(open, false);
      if (focusInside) {
        open.focus();
      }
    });
  });
};
