"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = getRangeAnglesSpecial;

var _veRangeUtils = require("ve-range-utils");

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function getRangeAnglesSpecial() {
  var _getRangeAngles$apply = _veRangeUtils.getRangeAngles.apply(this, arguments),
      endAngle = _getRangeAngles$apply.endAngle,
      totalAngle = _getRangeAngles$apply.totalAngle,
      rest = _objectWithoutProperties(_getRangeAngles$apply, ["endAngle", "totalAngle"]);

  return _extends({
    endAngle: endAngle - 0.00001, //we subtract a tiny amount because an angle of 2PI will cause nothing to be drawn!
    totalAngle: totalAngle - 0.00001 }, rest);
}
module.exports = exports["default"];