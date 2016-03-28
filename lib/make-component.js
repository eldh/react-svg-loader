"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (svg) {
  return "\nexport default (props) => {\n  return " + svg.replace(/^<svg/, "<svg { ...props } ") + ";\n}\n";
};

module.exports = exports['default'];