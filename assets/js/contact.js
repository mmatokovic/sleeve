(function () {

  'use strict';

  const form = document.querySelector('#contact-form');
  if (!form) {
    return;
  }
  const button = form.querySelector('[type=submit]');
  const action = form.getAttribute('data-protect');

  const activateForm = function () {
    if (action) {
      form.setAttribute('action', action);
    }
    button.removeAttribute('disabled');
  };

  document.body.addEventListener('mousemove', activateForm, {once: true});
  document.body.addEventListener('touchmove', activateForm, {once: true});
  document.body.addEventListener('keydown', function (e) {
    if ((e.key === 'Tab') || (e.key === 'Enter')) {
      activateForm();
    }
  }, {once: true});

  const status = new URLSearchParams(location.search);
  if (status.has('submitted')) {
    document.querySelector('.contact-submitted').classList.remove('hidden');
  } else if (status.has('error')) {
    document.querySelector('.contact-error').classList.remove('hidden');
  }

})();
