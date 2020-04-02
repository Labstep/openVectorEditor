"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.divideBy3 = divideBy3;
function divideBy3(num, shouldDivideBy3) {
  return shouldDivideBy3 ? Math.floor(num / 3) : num;
}