"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allRestrictionEnzymesUpdate = exports.addRestrictionEnzyme = exports.filteredRestrictionEnzymesAdd = exports.filteredRestrictionEnzymesReset = exports.filteredRestrictionEnzymesUpdate = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createReducer, _createReducer2;

var _redux = require("redux");

var _reduxAct = require("redux-act");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

var _specialCutsiteFilterOptions = require("../constants/specialCutsiteFilterOptions");

var _specialCutsiteFilterOptions2 = _interopRequireDefault(_specialCutsiteFilterOptions);

var _defaultEnzymeList = require("./utils/defaultEnzymeList.json");

var _defaultEnzymeList2 = _interopRequireDefault(_defaultEnzymeList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// ------------------------------------
// Actions
// ------------------------------------
var filteredRestrictionEnzymesUpdate = exports.filteredRestrictionEnzymesUpdate = (0, _createMetaAction2.default)("FILTERED_RESTRICTION_ENZYMES_UPDATE");
var filteredRestrictionEnzymesReset = exports.filteredRestrictionEnzymesReset = (0, _createMetaAction2.default)("FILTERED_RESTRICTION_ENZYMES_RESET");
var filteredRestrictionEnzymesAdd = exports.filteredRestrictionEnzymesAdd = (0, _createMetaAction2.default)("FILTERED_RESTRICTION_ENZYMES_ADD");
var addRestrictionEnzyme = exports.addRestrictionEnzyme = (0, _createMetaAction2.default)("ADD_RESTRICTION_ENZYME");
var allRestrictionEnzymesUpdate = exports.allRestrictionEnzymesUpdate = (0, _createMetaAction2.default)("ALL_RESTRICTION_ENZYMES_UPDATE");
// ------------------------------------
// Reducer
// ------------------------------------
var initialState = [_specialCutsiteFilterOptions2.default.single];
exports.default = (0, _redux.combineReducers)({
  //filteredRestrictionEnzymes refer to the enzymes actively included in the react-select filter component
  filteredRestrictionEnzymes: (0, _reduxAct.createReducer)((_createReducer = {}, _defineProperty(_createReducer, filteredRestrictionEnzymesReset, function () {
    return initialState;
  }), _defineProperty(_createReducer, filteredRestrictionEnzymesUpdate, function (state, payload) {
    return payload;
  }), _defineProperty(_createReducer, filteredRestrictionEnzymesAdd, function (state, payload) {
    return [].concat(_toConsumableArray(state), [payload]);
  }), _createReducer), initialState),

  allRestrictionEnzymes: (0, _reduxAct.createReducer)((_createReducer2 = {}, _defineProperty(_createReducer2, addRestrictionEnzyme, function (state, payload) {
    return _extends({}, state, _defineProperty({}, payload.name, payload));
  }), _defineProperty(_createReducer2, allRestrictionEnzymesUpdate, function (state, payload) {
    return payload;
  }), _createReducer2), _defaultEnzymeList2.default)
});