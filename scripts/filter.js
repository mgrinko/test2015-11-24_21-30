'use strict';

class Filter {
  constructor(options) {
    this._el = options.element;

    this._template = `
      <input type="text" data-selector="filterField">
    `;

    this._el.innerHTML = this._template;
  }
}