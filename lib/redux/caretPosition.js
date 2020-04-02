"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.caretPositionUpdate = exports.caretPositionClear = undefined;

var _createReducer;

var _reduxAct = require("redux-act");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ------------------------------------
// Actions
// ------------------------------------
var caretPositionClear = exports.caretPositionClear = (0, _createMetaAction2.default)("CARET_POSITION_CLEAR");
var caretPositionUpdate = exports.caretPositionUpdate = (0, _createMetaAction2.default)("CARET_POSITION_UPDATE");

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {
  SELECTION_LAYER_UPDATE: function SELECTION_LAYER_UPDATE() {
    //clear the caret if the selection layer is updated!
    return -1;
  }
}, _defineProperty(_createReducer, caretPositionClear, function () {
  return -1;
}), _defineProperty(_createReducer, caretPositionUpdate, function (unused, payload) {
  return typeof payload === "string" ? parseInt(payload, 10) : payload;
}), _createReducer), -1);