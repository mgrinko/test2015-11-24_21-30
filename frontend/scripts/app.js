'use strict';

require('./../styles/main.css');

let Page = require('./page/index');


let nav = new Page({
  element: document.getElementById('application'),
  phonesUrl: '/data/phones.json'
});