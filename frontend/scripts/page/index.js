'use strict';

let Filter = require('./../filter');
let PhoneCatalog = require('./../phoneCatalog');

module.exports = class Page {
  constructor(options) {
    this._el = options.element;
    this._el.classList.add('loading');

    var xhr = new XMLHttpRequest();

    xhr.open('GET', options.phonesUrl, true);


    xhr.onload = function() {
      this._el.classList.remove('loading');

      if (xhr.status !== 200) {
        console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
      } else {
        this._init({
          phones: JSON.parse(xhr.responseText)
        });
      }
    }.bind(this);

    xhr.send();
  }

  _init(options) {
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
