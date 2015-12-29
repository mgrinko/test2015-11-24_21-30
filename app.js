'use strict';

class Menu {
  constructor(options) {
    this._el = options.el;

    var itemTitles = Array.from(this._el.querySelectorAll('.item-title'));

    itemTitles.forEach(function(title) {
      title.onclick = function() {
        title.closest('.menu-item').classList.toggle('open');
      };
    });
  }
}

new Menu({
  el: document.getElementById('menu'),
  data: {}
});