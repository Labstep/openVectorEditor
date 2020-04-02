"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAngleForPositionMidpoint;
function getAngleForPositionMidpoint(position, maxLength) {
  return maxLength === 0 ? 0 : (position + 0.5) / maxLength * Math.PI * 2;
}
module.exports = exports["default"];