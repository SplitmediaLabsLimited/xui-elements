(function() {
  'use strict';
  var button = document.getElementsByTagName('xui-button')[0];
  var notif  = document.getElementsByTagName('span')[0];
  button.addEventListener('click', function() {
    notif.classList.remove('animate');
    notif.style.opacity = 1;
    setTimeout(function() {
      notif.classList.add('animate');
      notif.style.opacity = 0;
    }, 10);
  });
}());
