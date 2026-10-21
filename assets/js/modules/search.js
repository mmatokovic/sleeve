const fold = function (text) {
  return text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/đ/g, 'd').trim();
};

const filter = function (box, query) {
  const terms = fold(query).split(/\s+/).filter(Boolean);
  const active = terms.length > 0;
  const items = box.querySelectorAll('[data-search-results] > li');
  let matches = 0;

  items.forEach(function (item) {
    const text = item.dataset.searchFolded || (item.dataset.searchFolded = fold(item.dataset.searchText));
    const match = terms.every(function (term) {
      return text.includes(term);
    });
    item.hidden = !match;
    if (match) {
      matches++;
    }
  });

  box.querySelector('[data-search-results]').hidden = !active;
  box.querySelector('[data-search-clear]').hidden = !active;
  box.querySelector('[data-search-status]').textContent = active && matches === 0 ? box.dataset.searchEmpty : '';
  const paged = document.querySelector('[data-search-paged]');
  if (paged) {
    paged.hidden = active;
  }
};

const reset = function (box) {
  const input = box.querySelector('[data-search-input]');
  input.value = '';
  filter(box, '');
  return input;
};

const reveal = function () {
  document.querySelectorAll('[data-search]').forEach(function (box) {
    box.hidden = false;
    filter(box, box.querySelector('[data-search-input]').value);
  });
};

export const init = function () {
  document.addEventListener('DOMContentLoaded', reveal);
  document.addEventListener('turbo:load', reveal);

  document.addEventListener('input', function (event) {
    if (event.target.matches('[data-search-input]')) {
      filter(event.target.closest('[data-search]'), event.target.value);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && event.target.matches('[data-search-input]')) {
      reset(event.target.closest('[data-search]'));
    }
  });

  document.addEventListener('click', function (event) {
    const clear = event.target.closest('[data-search-clear]');
    if (clear) {
      reset(clear.closest('[data-search]')).focus();
    }
  });
};
