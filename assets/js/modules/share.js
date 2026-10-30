const statusDuration = 2000;

const reveal = function () {
  if (!navigator.share && !navigator.clipboard) {
    return;
  }
  document.querySelectorAll('[data-share]').forEach(function (button) {
    button.hidden = false;
  });
};

const copy = async function (button) {
  await navigator.clipboard.writeText(button.dataset.shareUrl);
  const status = button.parentElement.querySelector('[data-share-status]');
  if (status) {
    status.hidden = false;
    window.setTimeout(function () {
      status.hidden = true;
    }, statusDuration);
  }
};

export const init = function () {
  document.addEventListener('DOMContentLoaded', reveal);
  document.addEventListener('turbo:load', reveal);

  document.addEventListener('click', async function (event) {
    const button = event.target.closest('[data-share]');
    if (!button) {
      return;
    }
    if (navigator.share) {
      try {
        await navigator.share({title: button.dataset.shareTitle, url: button.dataset.shareUrl});
        return;
      } catch (error) {
        if (error.name === 'AbortError' || !navigator.clipboard) {
          return;
        }
      }
    }
    try {
      await copy(button);
    } catch {
    }
  });
};
