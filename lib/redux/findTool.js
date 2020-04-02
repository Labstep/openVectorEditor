"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMatchNumber = exports.updateDnaOrAA = exports.updateAmbiguousOrLiteral = exports.updateSearchText = exports.toggleIsInline = exports.toggleHighlightAll = exports.toggleFindTool = undefined;

var _createMergedDefaultS;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

var _createMergedDefaultStateReducer = require("./utils/createMergedDefaultStateReducer");

var _createMergedDefaultStateReducer2 = _interopRequireDefault(_createMergedDefaultStateReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ------------------------------------
// Actions
// ------------------------------------
var toggleFindTool = exports.toggleFindTool = (0, _createMetaAction2.default)("TOGGLE_FIND_TOOL", function () {}); //NOTE!!:: second argument sanitizes actions so no payload is passed!
var toggleHighlightAll = exports.toggleHighlightAll = (0, _createMetaAction2.default)("toggleHighlightAll", function () {}); //NOTE!!:: second argument sanitizes actions so no payload is passed!
var toggleIsInline = exports.toggleIsInline = (0, _createMetaAction2.default)("toggleIsInline", function () {}); //NOTE!!:: second argument sanitizes actions so no payload is passed!
var updateSearchText = exports.updateSearchText = (0, _createMetaAction2.default)("updateSearchText");
var updateAmbiguousOrLiteral = exports.updateAmbiguousOrLiteral = (0, _createMetaAction2.default)("updateAmbiguousOrLiteral");
var updateDnaOrAA = exports.updateDnaOrAA = (0, _createMetaAction2.default)("updateDnaOrAA");
var updateMatchNumber = exports.updateMatchNumber = (0, _createMetaAction2.default)("updateMatchNumber");

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _createMergedDefaultStateReducer2.default)((_createMergedDefaultS = {}, _defineProperty(_createMergedDefaultS, toggleFindTool, function (state) {
  return _extends({}, state, {
    isOpen: !state.isOpen
  });
}), _defineProperty(_createMergedDefaultS, toggleHighlightAll, function (state) {
  return _extends({}, state, {
    highlightAll: !state.highlightAll
  });
}), _defineProperty(_createMergedDefaultS, toggleIsInline, function (state) {
  localStorage.setItem("veFindBarIsExpanded", state.isInline);
  return _extends({}, state, {
    isInline: !state.isInline
  });
}), _defineProperty(_createMergedDefaultS, updateAmbiguousOrLiteral, function (state, payload) {
  return _extends({}, state, {
    matchNumber: 0,
    ambiguousOrLiteral: payload
  });
}), _defineProperty(_createMergedDefaultS, updateDnaOrAA, function (state, payload) {
  return _extends({}, state, {
    matchNumber: 0,
    dnaOrAA: payload
  });
}), _defineProperty(_createMergedDefaultS, updateSearchText, function (state, payload) {
  return _extends({}, state, {
    matchNumber: 0,
    searchText: payload
  });
}), _defineProperty(_createMergedDefaultS, updateMatchNumber, function (state, payload) {
  return _extends({}, state, {
    matchNumber: payload
  });
}), _createMergedDefaultS), {
  isOpen: false,
  isInline: !localStorage.getItem("veFindBarIsExpanded"),
  searchText: "",
  dnaOrAA: "DNA",
  ambiguousOrLiteral: "LITERAL",
  highlightAll: false,
  matchNumber: 0
});