"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reselect = require("reselect");

var _sequenceDataSelector = require("./sequenceDataSelector");

var _sequenceDataSelector2 = _interopRequireDefault(_sequenceDataSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function translationsRawSelector(sequenceData) {
  return sequenceData.translations;
}

exports.default = (0, _reselect.createSelector)(_sequenceDataSelector2.default, translationsRawSelector);
module.exports = exports["default"];