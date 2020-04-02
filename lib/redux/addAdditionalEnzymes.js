"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAdditionalEnzymesClose = exports.addAdditionalEnzymesReset = exports.addAdditionalEnzymesUpdate = undefined;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //./selectionLayer.js


var _reduxAct = require("redux-act");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ------------------------------------
// Actions
// ------------------------------------
var addAdditionalEnzymesUpdate = exports.addAdditionalEnzymesUpdate = (0, _reduxAct.createAction)("ADD_ADDITIONAL_ENZYMES_UPDATE");
var addAdditionalEnzymesReset = exports.addAdditionalEnzymesReset = (0, _reduxAct.createAction)("ADD_ADDITIONAL_ENZYMES_RESET");
var addAdditionalEnzymesClose = exports.addAdditionalEnzymesClose = (0, _reduxAct.createAction)("ADD_ADDITIONAL_ENZYMES_CLOSE", function () {});

// ------------------------------------
// Reducer
// ------------------------------------
var initialValues = {
  name: "Example Enzyme",
  sequence: "ggatcc",
  chop_top_index: 1,
  chop_bottom_index: 5,
  inputSequenceToTestAgainst: "",
  isOpen: false
};
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _defineProperty(_createReducer, addAdditionalEnzymesClose, function (state) {
  return _extends({}, state, { isOpen: false });
}), _defineProperty(_createReducer, addAdditionalEnzymesReset, function (state) {
  var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return _extends({}, initialValues, payload);
}), _defineProperty(_createReducer, addAdditionalEnzymesUpdate, function (state, payload) {
  return payload;
}), _createReducer), initialValues);