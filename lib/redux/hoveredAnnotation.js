"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hoveredAnnotationClear = exports.hoveredAnnotationUpdate = undefined;

var _createReducer;

var _reduxAct = require("redux-act");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //./caretPosition.js


// ------------------------------------
// Actions
// ------------------------------------
var hoveredAnnotationUpdate = exports.hoveredAnnotationUpdate = (0, _createMetaAction2.default)("HOVEREDANNOTATIONUPDATE");
var hoveredAnnotationClear = exports.hoveredAnnotationClear = (0, _createMetaAction2.default)("HOVEREDANNOTATIONCLEAR");

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _defineProperty(_createReducer, hoveredAnnotationUpdate, function (state, payload) {
  return payload || null;
}), _defineProperty(_createReducer, hoveredAnnotationClear, function () {
  return "";
}), _createReducer), "");