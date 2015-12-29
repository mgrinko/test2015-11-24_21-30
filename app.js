'use strict';

document.querySelector('i').onclick = function(event) {
  alert('hidden click');

  event.stopPropagation();
};

class Menu {
  constructor(options) {
    this._el = options.el;

    this._el.addEventListener('click', this._onItemTitleClick.bind(this));
  }

  _onItemTitleClick(event) {
    var title = event.target.closest('.item-title');

    event.preventDefault();

    if (title) {
      this._toggleItem(title.closest('.menu-item'));
    }

    if (event.target.tagName === 'B') {
      alert('Tag B detected');
    }
  }

  _toggleItem(item) {
    item.classList.toggle('open');
  }
}

new Menu({
  el: document.getElementById('menu'),
  data: {}
});