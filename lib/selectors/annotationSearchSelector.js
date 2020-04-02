"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchableTypes = undefined;

var _reselect = require("reselect");

var _lodash = require("lodash");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var searchableTypes = exports.searchableTypes = ["parts", "features", "primers"];

function annotationSearchSelector(isOpen, searchString) {
  for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }

  if (!searchString || !isOpen) {
    return [];
  }
  return searchableTypes.map(function (type, i) {
    var annotations = rest[i];
    return (0, _lodash.filter)(annotations, function (ann) {
      return ann.name.toLowerCase().includes(searchString);
    });
  });
}

exports.default = _reselect.createSelector.apply(undefined, [function (state) {
  return state.findTool && state.findTool.isOpen;
}, function (state) {
  return state.findTool && state.findTool.searchText;
}].concat(_toConsumableArray(searchableTypes.map(function (type) {
  return function (state) {
    return state.sequenceData[type];
  };
})), [annotationSearchSelector]));