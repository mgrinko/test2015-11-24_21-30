'use strict';

class Page {
  constructor(options) {
    this._el = options.element;

    this._filter = new Filter({
      element: this._el.querySelector('[data-component=filter]')
    });

    this._phoneCatalog = new PhoneCatalog({
      element: this._el.querySelector('[data-component=phone-catalog]'),
      phones: options.phones
    });
  }
}