"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reselect = require("reselect");

var _lodash = require("lodash");

var _featuresSelector = require("./featuresSelector");

var _featuresSelector2 = _interopRequireDefault(_featuresSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cdsFeaturesRawSelector(features) {
  return (0, _lodash.filter)(features, function (_ref) {
    var type = _ref.type;
    return type && type.toUpperCase() === "CDS";
  });
}

exports.default = (0, _reselect.createSelector)(_featuresSelector2.default, cdsFeaturesRawSelector);
module.exports = exports["default"];