'use strict';

class Menu {
  constructor(options) {
    this._el = options.element;

    this._title = this._el.querySelector('.menu_title');

    this._title.onclick = this._onTitleClick.bind(this);
  }

  _onTitleClick() {
    console.log(this);
    this._el.classList.toggle('open');
  }
}