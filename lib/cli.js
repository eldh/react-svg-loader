#!/usr/bin/env node
'use strict';

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = _yargs2.default.argv;


function makeFilename(filename) {
  return filename + '.react.js';
}

argv._.map(function (file) {
  var source = _fs2.default.readFileSync(file);
  var loaderContext = {
    cacheable: function cacheable() {},
    addDependency: function addDependency() {},
    async: function async() {
      return function (err, result) {
        /* eslint-disable no-console */
        if (err) console.log(file, err);
        /* eslint-enable */
        else _fs2.default.writeFileSync(makeFilename(file), result);
      };
    }
  };
  _index2.default.apply(loaderContext, [source]);
});