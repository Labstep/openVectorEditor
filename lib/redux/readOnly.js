"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateReadOnlyMode = exports.toggleReadOnlyMode = undefined;

var _createReducer;

var _reduxAct = require("redux-act");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //./caretPosition.js


// ------------------------------------
// Actions
// ------------------------------------
var toggleReadOnlyMode = exports.toggleReadOnlyMode = (0, _createMetaAction2.default)("TOGGLE_READ_ONLY_MODE", function () {}); //NOTE!!:: second argument sanitizes actions so no payload is passed
var updateReadOnlyMode = exports.updateReadOnlyMode = (0, _createMetaAction2.default)("UPDATE_READ_ONLY_MODE");

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _defineProperty(_createReducer, updateReadOnlyMode, function (state, payload) {
  return payload;
}), _defineProperty(_createReducer, toggleReadOnlyMode, function (state) {
  return !state;
}), _createReducer), true);