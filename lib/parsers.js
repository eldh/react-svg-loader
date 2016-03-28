'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssToObject = cssToObject;
exports.cssToJsxStr = cssToJsxStr;
exports.styleAttrToJsx = styleAttrToJsx;
exports.attrsToObj = attrsToObj;
exports.convertRootToProps = convertRootToProps;
exports.hyphenToCamel = hyphenToCamel;
function cssToObject(css) {
  var o = {};
  var elements = css.split(';');
  elements.filter(function (i) {
    return !!i;
  }).map(function (i) {
    var s = i.split(':');
    var key = s.shift().trim();
    var value = s.join(':').trim();
    o[key] = value;
  });
  return o;
}

function cssToJsxStr(css) {
  var o = cssToObject(css);
  return '{' + JSON.stringify(o) + '}';
}

// here we assume that there are no escaped
// double quotes inside the style tag value
function styleAttrToJsx(xml) {
  var rx = / style="([^"]*)"/g;
  var arr = rx.exec(xml);
  if (!arr) return xml;
  return xml.replace(rx, ' style=' + cssToJsxStr(arr[1]));
}

// we assume that the ouput of xml2js is always outputted
// with lower-case and that it uses double quotes for
// all attr values
// Another assumption is that there are no
// escaped double quotes in the attr value
function attrsToObj(attrs) {
  var o = {};
  // a non whitespace character can be an attr name
  var rx = / (\S+)="/g;
  var elements = [],
      tmp = void 0;
  /* eslint-disable no-cond-assign */
  while (tmp = rx.exec(attrs)) {
    elements.push(tmp[1]);
  } /* eslint-enable */

  elements.map(function (i) {
    // non double quote character can be an attr value
    var rx2 = new RegExp(' ' + i + '="([^"]*)"', 'g');
    var arr = rx2.exec(attrs);
    o[i] = arr[1];
  });
  return o;
}

function convertRootToProps(xml) {
  // Note: There is a space after svg, which means that
  // there is at least one attribute defined for the
  // root element. This is safe to assume because, we
  // check if at least width and height are defined for the
  // root svg element
  var rx = /<svg(.*)>/;
  var arr = rx.exec(xml);
  var o = attrsToObj(arr[1]);
  var keys = Object.keys(o);
  keys.map(function (key) {
    if (key === 'style') return;
    o[key] = '{\'undefined\' === typeof props[\'' + key + '\'] ? ' + JSON.stringify(o[key]) + ' : props[\'' + key + '\']}';
  });
  var proped = ' ' /*The space before the first attr*/ + keys.map(function (key) {
    return key + '=' + o[key];
  }).join(' ');
  return xml.replace(arr[1], proped);
}

function hyphenToCamel(name) {
  return name.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}