"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _StackedAnnotations = require("../StackedAnnotations");

var _StackedAnnotations2 = _interopRequireDefault(_StackedAnnotations);

var _Translation = require("./Translation");

var _Translation2 = _interopRequireDefault(_Translation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getExtraInnerCompProps(annotationRange, _ref) {
  var showAminoAcidNumbers = _ref.showAminoAcidNumbers,
      getGaps = _ref.getGaps,
      isProtein = _ref.isProtein,
      annotationHeight = _ref.annotationHeight,
      spaceBetweenAnnotations = _ref.spaceBetweenAnnotations,
      sequenceLength = _ref.sequenceLength,
      aminoAcidNumbersHeight = _ref.aminoAcidNumbersHeight;

  var anotationHeightNoSpace = annotationHeight - spaceBetweenAnnotations;

  return {
    showAminoAcidNumbers: showAminoAcidNumbers,
    getGaps: getGaps,
    height: anotationHeightNoSpace,
    aminoAcidNumbersHeight: aminoAcidNumbersHeight,
    annotationRange: annotationRange,
    isProtein: isProtein,
    sequenceLength: sequenceLength
  };
}

function Translations(props) {
  return _react2.default.createElement(_StackedAnnotations2.default, _extends({}, props, {
    annotationRanges: props.annotationRanges.filter(function (t) {
      return !t.isJoinedLocation;
    }),
    annotationHeight: props.annotationHeight + (props.showAminoAcidNumbers ? props.aminoAcidNumbersHeight : 0),
    disregardLocations: true,
    getExtraInnerCompProps: getExtraInnerCompProps,
    InnerComp: _Translation2.default
  }));
}

exports.default = Translations;
module.exports = exports["default"];