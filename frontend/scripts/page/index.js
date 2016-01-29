'use strict';

let Filter = require('./../filter');
let PhoneCatalog = require('./../phoneCatalog');

module.exports = class Page {
  constructor(options) {
    this._el = options.element;

    this._filter = new Filter({
      element: this._el.querySelector('[data-component=filter]')
    });

    this._phoneCatalog = new PhoneCatalog({
      element: this._el.querySelector('[data-component=phone-catalog]'),
      phones: options.phones
    });

    this._phoneCatalog._el.addEventListener('phoneSelected', this._onPhoneSelected.bind(this))
  }

  _onPhoneSelected(event) {
    alert(event.detail.phoneId + 'qweqwe');
  }
};
