"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// import './style.css'


var _veSequenceUtils = require("ve-sequence-utils");

var _lodash = require("lodash");

var _pureNoFunc = require("../../utils/pureNoFunc");

var _pureNoFunc2 = _interopRequireDefault(_pureNoFunc);

require("./style.css");

var _forEach = require("lodash/forEach");

var _forEach2 = _interopRequireDefault(_forEach);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _getXStartAndWidthOfRowAnnotation = require("../getXStartAndWidthOfRowAnnotation");

var _getXStartAndWidthOfRowAnnotation2 = _interopRequireDefault(_getXStartAndWidthOfRowAnnotation);

var _veRangeUtils = require("ve-range-utils");

var _AnnotationContainerHolder = require("../AnnotationContainerHolder");

var _AnnotationContainerHolder2 = _interopRequireDefault(_AnnotationContainerHolder);

var _AnnotationPositioner = require("../AnnotationPositioner");

var _AnnotationPositioner2 = _interopRequireDefault(_AnnotationPositioner);

var _PointedAnnotation = require("./PointedAnnotation");

var _PointedAnnotation2 = _interopRequireDefault(_PointedAnnotation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StackedAnnotations(props) {
  var _props$annotationRang = props.annotationRanges,
      annotationRanges = _props$annotationRang === undefined ? [] : _props$annotationRang,
      bpsPerRow = props.bpsPerRow,
      charWidth = props.charWidth,
      containerClassName = props.containerClassName,
      annotationHeight = props.annotationHeight,
      spaceBetweenAnnotations = props.spaceBetweenAnnotations,
      onClick = props.onClick,
      disregardLocations = props.disregardLocations,
      InnerComp = props.InnerComp,
      onRightClick = props.onRightClick,
      editorName = props.editorName,
      type = props.type,
      alignmentType = props.alignmentType,
      getGaps = props.getGaps,
      marginTop = props.marginTop,
      marginBottom = props.marginBottom,
      getExtraInnerCompProps = props.getExtraInnerCompProps,
      onlyShowLabelsThatDoNotFit = props.onlyShowLabelsThatDoNotFit,
      externalLabels = props.externalLabels;


  var InnerCompToUse = InnerComp || _PointedAnnotation2.default;
  if (annotationRanges.length === 0) {
    return null;
  }
  var maxAnnotationYOffset = 0;
  var annotationsSVG = [];
  (0, _forEach2.default)(annotationRanges, function (annotationRange, index) {
    if (annotationRange.yOffset > maxAnnotationYOffset) {
      maxAnnotationYOffset = annotationRange.yOffset;
    }

    var _getGaps = getGaps(annotationRange),
        gapsBefore = _getGaps.gapsBefore,
        gapsInside = _getGaps.gapsInside;

    if (alignmentType === "Parallel Part Creation") {
      gapsBefore = 0;
      gapsInside = 0;
    }
    var annotation = annotationRange.annotation;
    var annotationColor = annotation.color || annotation.type && _veSequenceUtils.featureColors[annotation.type] || "#BBBBBB";
    var result = (0, _getXStartAndWidthOfRowAnnotation2.default)(annotationRange, bpsPerRow, charWidth, gapsBefore, gapsInside);
    var top = annotationRange.yOffset * annotationHeight;
    if (!disregardLocations && annotationRange.containsLocations) {
      top += annotationHeight / 2 - annotationHeight / 16;
    }
    var anotationHeightNoSpace = annotationHeight - spaceBetweenAnnotations;

    annotationsSVG.push(_react2.default.createElement(
      _AnnotationPositioner2.default,
      {
        height: anotationHeightNoSpace,
        width: result.width,
        key: index,
        top: top,
        left: result.xStart
      },
      _react2.default.createElement(InnerCompToUse, _extends({
        externalLabels: externalLabels,
        key: index,
        className: "" + (0, _lodash.camelCase)("veRowView-" + type),
        editorName: editorName,
        id: annotation.id,
        onClick: onClick,
        type: type,
        onRightClick: onRightClick,
        annotation: annotation,
        gapsInside: gapsInside,
        gapsBefore: gapsBefore,
        color: annotationColor,
        width: result.width,
        widthInBps: annotationRange.end - annotationRange.start + 1,
        charWidth: charWidth,
        forward: annotation.forward,
        onlyShowLabelsThatDoNotFit: onlyShowLabelsThatDoNotFit,
        rangeType: (0, _veRangeUtils.getAnnotationRangeType)(annotationRange, annotation, annotation.forward),
        height: annotationRange.containsLocations && !disregardLocations ? anotationHeightNoSpace / 8 : anotationHeightNoSpace,
        hideName: annotationRange.containsLocations && !disregardLocations,
        name: annotation.name
      }, getExtraInnerCompProps && getExtraInnerCompProps(annotationRange, props)))
    ));
  });

  var containerHeight = (maxAnnotationYOffset + 1) * annotationHeight;
  return _react2.default.createElement(
    _AnnotationContainerHolder2.default,
    {
      marginTop: marginTop,
      marginBottom: marginBottom,
      className: containerClassName,
      containerHeight: containerHeight
    },
    annotationsSVG
  );
}

exports.default = (0, _pureNoFunc2.default)(StackedAnnotations);
module.exports = exports["default"];