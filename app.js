'use strict';

class Menu {
  constructor(options) {
    this._el = options.el;
    this._list = this._el.querySelector('.menu-list');

    var itemTitles = Array.from(this._list.querySelectorAll('.item-title'));

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