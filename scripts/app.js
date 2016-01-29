'use strict';

let Page = require('./page');

let phones = require('json!./../data/phones.json');

let nav = new Page({
  element: document.getElementById('application'),
  phones: phones
});