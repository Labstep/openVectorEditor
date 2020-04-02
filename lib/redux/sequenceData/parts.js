"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePart = exports.upsertPart = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxAct = require("redux-act");

var _createMetaAction = require("../utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

var _upsertDeleteActionGenerator = require("./upsertDeleteActionGenerator");

var _upsertDeleteActionGenerator2 = _interopRequireDefault(_upsertDeleteActionGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------
var upsertPart = exports.upsertPart = (0, _createMetaAction2.default)("UPSERT_PART");
var deletePart = exports.deletePart = (0, _createMetaAction2.default)("DELETE_PART");

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)(_extends({}, (0, _upsertDeleteActionGenerator2.default)(upsertPart, deletePart)), {});