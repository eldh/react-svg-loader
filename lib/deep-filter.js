'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function isPlainObject(o) {
  return o !== null && 'object' === (typeof o === 'undefined' ? 'undefined' : _typeof(o));
}

function isCollection(o) {
  return Array.isArray(o) || isPlainObject(o);
}

function filter(value, fn, pkey) {
  if (Array.isArray(value)) return filterArray(value, fn, pkey);else if (isPlainObject(value)) return filterObject(value, fn, pkey);
  return value;
}

function filterObject(obj, fn, pkey) {
  var newObj = {};
  var key = void 0;
  var value = void 0;

  for (key in obj) {
    value = filter(obj[key], fn, key);
    var newKey = fn.call(obj, value, key, obj, pkey);
    if (newKey) {
      if (value !== obj[key] && !isCollection(value)) value = obj[key];
      if (typeof newKey === 'string') newObj[newKey] = value;else newObj[key] = value;
    }
  }

  return newObj;
}

function filterArray(array, fn, pkey) {
  var filtered = [];

  array.forEach(function (value, index, array) {
    value = filter(value, fn, index);
    if (fn.call(array, value, index, array, pkey)) {
      if (value !== array[index] && !isCollection(value)) value = array[index];
      filtered.push(value);
    }
  });

  return filtered;
}

exports.default = filter;
module.exports = exports['default'];