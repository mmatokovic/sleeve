/**
 * @file
 * A JavaScript file for the contact form.
 */

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

  // Wait for a mouse to move, indicating they are human.
  document.body.addEventListener('mousemove', activateForm, {once: true});
  // Wait for a touch move event, indicating that they are human.
  document.body.addEventListener('touchmove', activateForm, {once: true});
  // A tab or enter key pressed can also indicate they are human.
  document.body.addEventListener('keydown', function (e) {
    if ((e.key === 'Tab') || (e.key === 'Enter')) {
      activateForm();
    }
  }, {once: true});

  // Display messages.
  const status = new URLSearchParams(location.search);
  if (status.has('submitted')) {
    document.querySelector('.contact-submitted').classList.remove('hidden');
  } else if (status.has('error')) {
    document.querySelector('.contact-error').classList.remove('hidden');
  }

})();
