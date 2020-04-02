"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reselect = require("reselect");

var _searchLayersSelector = require("./searchLayersSelector");

var _searchLayersSelector2 = _interopRequireDefault(_searchLayersSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reselect.createSelector)(_searchLayersSelector2.default, function (state) {
  return state.findTool && state.findTool.dnaOrAA;
}, function (state) {
  return state.findTool && state.findTool.highlightAll;
}, function (state) {
  return state.findTool && state.findTool.matchNumber;
}, function (searchLayers, dnaOrAA, highlightAll, matchNumber) {
  if (dnaOrAA === "DNA") return [];
  if (!highlightAll) return [searchLayers[matchNumber]];
  return searchLayers;
});
module.exports = exports["default"];