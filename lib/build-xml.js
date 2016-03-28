'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (json) {
  var root = _xmlbuilder2.default.create('svg', xmldec, null, {
    headless: true
  });
  Object.keys(json.svg.$).map(function (at) {
    root.att(at, json.svg.$[at]);
  });
  // for (var i in json.svg.$) root.att(i, json.svg.$[i]);
  traverse(json.svg.$$, root);
  return root.end({
    // weird
    // Unterminated JSX contents
    // keep this to true cuz I don't why the resultant
    // JSX throws error while parsing -
    pretty: true
  });
};

var _xmlbuilder = require('xmlbuilder');

var _xmlbuilder2 = _interopRequireDefault(_xmlbuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var xmldec = {
  version: '1.0',
  standalone: true,
  encoding: 'UTF-8'
};

function traverse(tags, root) {
  for (var i in tags) {
    var item = root.ele(tags[i]['#name'], tags[i]['$']);
    if (tags[i].$$) traverse(tags[i].$$, item);
  }
}

module.exports = exports['default'];