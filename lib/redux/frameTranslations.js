"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frameTranslationToggleOff = exports.frameTranslationToggleOn = exports.frameTranslationToggle = undefined;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //./caretPosition.js


exports.getMinimumOrfSize = getMinimumOrfSize;

var _reduxAct = require("redux-act");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ------------------------------------
// Actions
// ------------------------------------
var frameTranslationToggle = exports.frameTranslationToggle = (0, _createMetaAction2.default)("FRAME_TRANSLATION_TOGGLE");
var frameTranslationToggleOn = exports.frameTranslationToggleOn = (0, _createMetaAction2.default)("FRAME_TRANSLATION_TOGGLE_ON");
var frameTranslationToggleOff = exports.frameTranslationToggleOff = (0, _createMetaAction2.default)("FRAME_TRANSLATION_TOGGLE_OFF");

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _defineProperty(_createReducer, frameTranslationToggle, function (state, payload) {
  return _extends({}, state, _defineProperty({}, payload, !state[payload]));
}), _defineProperty(_createReducer, frameTranslationToggleOn, function (state, payload) {
  return _extends({}, state, _defineProperty({}, payload, true));
}), _defineProperty(_createReducer, frameTranslationToggleOff, function (state, payload) {
  return _extends({}, state, _defineProperty({}, payload, false));
}), _createReducer), {
  "1": false,
  "2": false,
  "3": false,
  "-1": false,
  "-2": false,
  "-3": false
});
function getMinimumOrfSize(state) {
  return state;
}