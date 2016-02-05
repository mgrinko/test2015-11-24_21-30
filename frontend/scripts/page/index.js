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

    let phoneCatalogPromise = this._sendRequest({
      method: 'GET',
      url: options.phonesUrl
    });

    phoneCatalogPromise
      .then(this._onPhoneCatalogLoaded.bind(this))
      .catch(function(error) {
        console.log(error);
      });
  }

  _onPhoneCatalogLoaded(phones) {
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
    let phoneDetailsPromise = this._sendRequest({
      method: 'GET',
      url: `/data/phones/${event.detail.phoneId}.json`
    });

    let mouseoutPromise = this._createMouseoutPromise();

    mouseoutPromise
      .then(function(result) {
      	return phoneDetailsPromise;
      }.bind(this))
      .then(this._onPhoneDetailsLoaded.bind(this))
      .catch(error => console.log(error));
  }

  _onPhoneDetailsLoaded(phoneData) {
    this._renderPhone(phoneData);
  }

  _renderPhone(phoneData) {
    this._content.innerHTML = `<img src="${phoneData.images[0]}">`;
  }

  _createMouseoutPromise() {
    return new Promise(function(resolve, reject) {
      this._phoneCatalog._el.addEventListener('mouseout', function() {
        resolve();
      });
    }.bind(this));
  }

  _sendRequest(options) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();

      xhr.open(options.method, options.url);

      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve( JSON.parse(xhr.responseText) );
        } else {
          reject( new Error(xhr.status + ': ' + xhr.statusText) );
        }
      };

      xhr.onerror = function(error) {
        reject(error);
      };

      xhr.send();
    });
  }
};
