"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleViewVersionHistory = undefined;

var _reduxAct = require("redux-act");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //./caretPosition.js


// ------------------------------------
// Actions
// ------------------------------------
var toggleViewVersionHistory = exports.toggleViewVersionHistory = (0, _createMetaAction2.default)("TOGGLE_VIEW_VERSION_HISTORY", function () {}); //NOTE!!:: second argument sanitizes actions so no payload is passed

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)(_defineProperty({}, toggleViewVersionHistory, function (state) {
  return { viewVersionHistory: !state.viewVersionHistory };
}), {
  viewVersionHistory: false
});