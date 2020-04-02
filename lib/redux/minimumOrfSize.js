"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minimumOrfSizeUpdate = undefined;
exports.getMinimumOrfSize = getMinimumOrfSize;

var _reduxAct = require("redux-act");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //./caretPosition.js


// ------------------------------------
// Actions
// ------------------------------------
var minimumOrfSizeUpdate = exports.minimumOrfSizeUpdate = (0, _createMetaAction2.default)("minimumOrfSizeUpdate");

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)(_defineProperty({}, minimumOrfSizeUpdate, function (state, payload) {
  return payload;
}), 300);
function getMinimumOrfSize(state) {
  return state;
}