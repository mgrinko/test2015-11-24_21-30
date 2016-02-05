'use strict';

let Filter = require('./../filter');
let PhoneCatalog = require('./../phoneCatalog');

let SELECTORS = {
  content: '[data-selector=pageContent]'
};

module.exports = class Page {
  constructor(options) {
    this._el = options.element;
    this._content = this._el.querySelector(SELECTORS.content);

    this._sendRequest({
      method: 'GET',
      url: options.phonesUrl,
      successCallback: this._onPhoneListLoaded.bind(this),
      errorCallback: function(error) {
        console.log(error);
      }
    });
  }

  _onPhoneListLoaded(phones) {
    this._init({
      phones: phones
    });
  }

  _init(options) {
    this._filter = new Filter({
      element: this._el.querySelector('[data-component=filter]')
    });

    this._phoneCatalog = new PhoneCatalog({
      element: this._el.querySelector('[data-component=phone-catalog]'),
      phones: options.phones
    });

    this._phoneCatalog._el.addEventListener('phoneSelected', this._onPhoneSelected.bind(this));
  }

  _onPhoneSelected(event) {
    this._sendRequest({
      method: 'GET',
      url: `/data/phones/${event.detail.phoneId}.json`,
      successCallback: this._onPhoneDetailsLoaded.bind(this)
    });
  }

  _onPhoneDetailsLoaded(phoneData) {
    this._renderPhone(phoneData);
  }

  _renderPhone(phoneData) {
    this._content.innerHTML = `<img src="${phoneData.images[0]}">`;
  }

  _sendRequest(options) {
    var xhr = new XMLHttpRequest();

    xhr.open(options.method, options.url);

    xhr.onload = function() {
      if (xhr.status !== 200) {
        options.errorCallback( new Error(xhr.status + ': ' + xhr.statusText) );
      } else {
        options.successCallback( JSON.parse(xhr.responseText) );
      }
    };

    xhr.onerror = function(error) {
      options.errorCallback(error);
    };

    xhr.send();
  }
};
