"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reselect = require("reselect");

var _lodash = require("lodash");

var _featuresSelector = require("./featuresSelector");

var _featuresSelector2 = _interopRequireDefault(_featuresSelector);

var _featureTypesToHideSelector = require("./featureTypesToHideSelector");

var _featureTypesToHideSelector2 = _interopRequireDefault(_featureTypesToHideSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filteredFeaturesSelector(features, featureTypesToHide) {
  return (0, _lodash.omitBy)(features, function (feat) {
    if (featureTypesToHide[feat.type]) {
      return true;
    }
  });
}

exports.default = (0, _reselect.createSelector)(_featuresSelector2.default, _featureTypesToHideSelector2.default, filteredFeaturesSelector);
module.exports = exports["default"];