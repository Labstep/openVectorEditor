"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _circularSelector = require("./circularSelector");

var _circularSelector2 = _interopRequireDefault(_circularSelector);

var _sequenceSelector = require("./sequenceSelector");

var _sequenceSelector2 = _interopRequireDefault(_sequenceSelector);

var _minimumOrfSizeSelector = require("./minimumOrfSizeSelector");

var _minimumOrfSizeSelector2 = _interopRequireDefault(_minimumOrfSizeSelector);

var _veSequenceUtils = require("ve-sequence-utils");

var _reselect = require("reselect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reselect.createSelector)(_sequenceSelector2.default, _circularSelector2.default, _minimumOrfSizeSelector2.default, function (state) {
  return state.useAdditionalOrfStartCodons;
}, _veSequenceUtils.findOrfsInPlasmid);
// import bsonObjectid from 'bson-objectid';

module.exports = exports["default"];