'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (content) {

  this.cacheable && this.cacheable(true);
  this.addDependency(this.resourcePath);

  var callback = this.async();

  var parser = new _xml2js2.default.Parser({
    normalize: true,
    normalizeTags: true,
    explicitArray: true,
    explicitChildren: true,
    preserveChildrenOrder: true
  });

  parser.addListener('error', function (err) {
    return callback(err);
  });

  parser.addListener('end', function (result) {
    var filtered = (0, _deepFilter2.default)(result, function (value, key, parent, parentKey) {
      if ('number' === typeof key) {
        return true;
      }
      if (parentKey === '$') {
        // if the attribute is a namespace attr, then ignore
        if (key.indexOf(':') > -1) return false;
        // convert hyphens to camelcase
        if (key.indexOf('-') > -1) return (0, _parsers.hyphenToCamel)(key);
        return true;
      }
      return true;
    });

    // pass things through the pipeline
    // everything is synchronous anyway,
    // but the promise chain gives us a neat way to
    // list a pipeline - a list of transformations to
    // be done on some initial data
    Promise.resolve(filtered).then(_buildXml2.default).then(_parsers.styleAttrToJsx).then(_parsers.convertRootToProps).then(_makeComponent2.default).then(function (component) {
      return callback(null, component);
    }).catch(function (err) {
      return callback(err);
    });
  });

  parser.parseString(content.toString());
};

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

var _buildXml = require('./build-xml');

var _buildXml2 = _interopRequireDefault(_buildXml);

var _deepFilter = require('./deep-filter');

var _deepFilter2 = _interopRequireDefault(_deepFilter);

var _makeComponent = require('./make-component');

var _makeComponent2 = _interopRequireDefault(_makeComponent);

var _parsers = require('./parsers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];