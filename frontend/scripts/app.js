'use strict';

require('./../styles/main.css');

let Page = require('./page/index');

let phones = require('./../../data/phones.json');

let nav = new Page({
  element: document.getElementById('application'),
  phones: phones
});