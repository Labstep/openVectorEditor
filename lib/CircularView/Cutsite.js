"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Cutsite;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Cutsite(_ref) {
  var annotationHeight = _ref.annotationHeight,
      radius = _ref.radius;

  return _react2.default.createElement("rect", {
    className: "veCutsite",
    width: 1,
    y: -radius - 4,
    height: annotationHeight
    // {...rest}
  });
}
module.exports = exports["default"];