"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (svg) {
  return "\nimport React from 'react';\n\nexport default (props) => {\n  return " + svg.replace(/^<svg/, "<svg { ...props } ") + ";\n}\n";
};

module.exports = exports['default'];