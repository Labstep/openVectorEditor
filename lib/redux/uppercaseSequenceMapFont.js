"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSequenceCase = undefined;

var _reduxAct = require("redux-act");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//./caretPosition.js


// import createReducer from "./utils/createMergedDefaultStateReducer";

// ------------------------------------
// Actions
// ------------------------------------
var updateSequenceCase = exports.updateSequenceCase = (0, _createMetaAction2.default)("updateSequenceCase");

var newVal = window.localStorage.getItem("uppercaseSequenceMapFont");

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)(_defineProperty({}, updateSequenceCase, function (state, payload) {
  localStorage.setItem("uppercaseSequenceMapFont", payload);
  return payload;
}), newVal || "noPreference" //  noPreference || uppercase || lowercase
);