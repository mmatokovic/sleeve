(function () {

  'use strict';

  const offset = 10;

  const targetOf = function (link) {
    const id = decodeURIComponent(link.getAttribute('href').slice(1));
    return document.getElementById(id);
  };

  let ticking = false;

  const update = function () {
    ticking = false;
    const links = document.querySelectorAll('#TableOfContents a[href^="#"]');
    let current = null;

    links.forEach(function (link) {
      const target = targetOf(link);
      if (target && target.getBoundingClientRect().top - offset <= 0) {
        current = link;
      }
    });

    links.forEach(function (link) {
      link.classList.toggle('tocactive', link === current);
    });
  };

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, {passive: true});

})();
