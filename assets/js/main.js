/**
 * @file
 * A JavaScript file for the theme. Runs first, before other things have loaded.
 */

(function () {

  'use strict';

  // Add a js class to the html-tag when JavsScript is active.
  document.querySelector('html').classList.replace('nojs', 'js');

  // Define offset value
  var offset = 10;

  window.addEventListener('scroll', function() {
      // Get the current vertical position of the scroll bar
      var position = window.scrollY;

      // Get all anchor elements in the TableOfContents
      var links = document.querySelectorAll('#TableOfContents ul li a[href^="#"]');

      links.forEach(function(link) {
          var anchorId = link.getAttribute('href');
          var targetElement = document.querySelector(anchorId);

          if (targetElement) {
              var target = targetElement.getBoundingClientRect().top + window.scrollY - offset;

              // Check if the document has crossed the page
              //console.log(position, target);
              if (position >= target) {
                  // Remove active from all anchor elements and add it to the current anchor
                  links.forEach(function(link) {
                      link.classList.remove('tocactive');
                  });
                  link.classList.add('tocactive');
              }
          }
      });
  });

})();