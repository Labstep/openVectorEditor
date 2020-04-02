"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAnnotationNameAndStartStopString;

var _lodash = require("lodash");

var _annotationTypes = require("./annotationTypes");

function getAnnotationNameAndStartStopString(_ref) {
  var name = _ref.name,
      start = _ref.start,
      end = _ref.end,
      type = _ref.type,
      message = _ref.message,
      annotationTypePlural = _ref.annotationTypePlural;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      startText = _ref2.startText;

  var typeToUse = annotationTypePlural ? (0, _lodash.upperFirst)((0, _annotationTypes.getSingular)(annotationTypePlural)) + (annotationTypePlural === "features" ? " (" + type + ")" : "") : "";

  return (startText ? startText : "") + " " + (typeToUse ? typeToUse + " -" : "") + " " + (name ? name : "") + " - Start: " + (start + 1) + " End: " + (end + 1) + " " + (message ? "\n" + message : "");
}
module.exports = exports["default"];