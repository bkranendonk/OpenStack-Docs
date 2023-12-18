// Sidebar
/* global bootstrap: false */
(function () {
  'use strict'
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()


$(document).ready(function () {
  // Add 'collapsed' class if window width is less than or equal to 768px
  if(window.innerWidth <= 768) {
    $('#sidebar').addClass('collapsed');
  }

  $('#sidebarToggle').click(function () {
    // Toggle 'opened' class
    $('#sidebar').toggleClass('opened');

    // If 'collapsed' class exists, remove it and adjust navbar classes
    // Else, add 'collapsed' class and remove 'opened' class, then adjust navbar classes
    if ($('#sidebar').hasClass('collapsed')) {
      $('#sidebar').removeClass('collapsed');
      $('#navbar').addClass('navbar-with-sidebar').removeClass('navbar-full');
    } else {
      $('#sidebar').addClass('collapsed').removeClass('opened');
      $('#navbar').addClass('navbar-full').removeClass('navbar-with-sidebar');
    }
  });
});