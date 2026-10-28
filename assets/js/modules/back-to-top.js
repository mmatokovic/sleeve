const threshold = 1000;

let ticking = false;

const update = function () {
  ticking = false;
  const wrapper = document.querySelector('[data-back-to-top]');
  if (wrapper) {
    wrapper.toggleAttribute('data-shown', window.scrollY >= threshold);
  }
};

export const init = function () {
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, {passive: true});

  document.addEventListener('turbo:load', update);
  update();

  document.addEventListener('click', function (event) {
    if (!event.target.closest('[data-back-to-top] button')) {
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({top: 0, behavior: reduce ? 'auto' : 'smooth'});
  });
};
