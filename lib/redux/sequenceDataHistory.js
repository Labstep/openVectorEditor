"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.veRedo = exports.veUndo = exports.addToUndoStack = undefined;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //./selectionLayer.js


var _reduxAct = require("redux-act");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// ------------------------------------
// Actions
// ------------------------------------
var addToUndoStack = exports.addToUndoStack = (0, _createMetaAction2.default)("ADD_TO_UNDO_STACK");
var veUndo = exports.veUndo = (0, _createMetaAction2.default)("VE_UNDO_META");
var veRedo = exports.veRedo = (0, _createMetaAction2.default)("VE_REDO_META");

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _defineProperty(_createReducer, addToUndoStack, function (state, payload) {
  return _extends({}, state, {
    future: [],
    past: [].concat(_toConsumableArray(state.past || []), [payload])
  });
}), _defineProperty(_createReducer, veUndo, function (state, presentState) {
  return _extends({}, state, {
    past: (state.past || []).slice(0, -1),
    future: (state.future || []).concat(presentState)
  });
}), _defineProperty(_createReducer, veRedo, function (state, presentState) {
  return _extends({}, state, {
    future: (state.future || []).slice(0, -1),
    past: (state.past || []).concat(presentState)
  });
}), _createReducer), {
  past: [],
  future: []
});