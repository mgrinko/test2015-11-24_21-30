var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('./public', {
  cache: 0
});

function accept(req, res) {
  console.log(req.url);

  setTimeout(function() {
    if (req.url == '/data/phones.json') {
      file.serve(req, res);
    } else {
      file.serve(req, res);
    }
  }, 1000);

}

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}