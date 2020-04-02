"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertItem = insertItem;
exports.removeItem = removeItem;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function insertItem(array, item, index) {
  return [].concat(_toConsumableArray(array.slice(0, index)), [item], _toConsumableArray(array.slice(index)));
}

function removeItem(array, index) {
  return [].concat(_toConsumableArray(array.slice(0, index)), _toConsumableArray(array.slice(index + 1)));
}