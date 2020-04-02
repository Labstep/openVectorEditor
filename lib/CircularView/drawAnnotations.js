"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _nodeIntervalTree = require("node-interval-tree");

var _nodeIntervalTree2 = _interopRequireDefault(_nodeIntervalTree);

var _lodash = require("lodash");

var _veRangeUtils = require("ve-range-utils");

var _getRangeAnglesSpecial = require("./getRangeAnglesSpecial");

var _getRangeAnglesSpecial2 = _interopRequireDefault(_getRangeAnglesSpecial);

var _getYOffset = require("./getYOffset");

var _getYOffset2 = _interopRequireDefault(_getYOffset);

var _withHover = require("../helperComponents/withHover");

var _withHover2 = _interopRequireDefault(_withHover);

var _PositionAnnotationOnCircle = require("./PositionAnnotationOnCircle");

var _PositionAnnotationOnCircle2 = _interopRequireDefault(_PositionAnnotationOnCircle);

var _getAnnotationNameAndStartStopString = require("../utils/getAnnotationNameAndStartStopString");

var _getAnnotationNameAndStartStopString2 = _interopRequireDefault(_getAnnotationNameAndStartStopString);

var _Feature = require("./Feature");

var _Feature2 = _interopRequireDefault(_Feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function drawAnnotations(_ref) {
  var Annotation = _ref.Annotation,
      annotationType = _ref.annotationType,
      radius = _ref.radius,
      isProtein = _ref.isProtein,
      annotations = _ref.annotations,
      annotationHeight = _ref.annotationHeight,
      spaceBetweenAnnotations = _ref.spaceBetweenAnnotations,
      sequenceLength = _ref.sequenceLength,
      reverseAnnotations = _ref.reverseAnnotations,
      editorName = _ref.editorName,
      getColor = _ref.getColor,
      useStartAngle = _ref.useStartAngle,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === undefined ? _lodash.noop : _ref$onClick,
      positionBy = _ref.positionBy,
      allOnSameLevel = _ref.allOnSameLevel,
      _ref$onRightClicked = _ref.onRightClicked,
      onRightClicked = _ref$onRightClicked === undefined ? _lodash.noop : _ref$onRightClicked,
      showLabels = _ref.showLabels,
      labelOptions = _ref.labelOptions,
      annotationProps = _ref.annotationProps,
      fontStyle = _ref.fontStyle;

  var totalAnnotationHeight = annotationHeight + spaceBetweenAnnotations;
  var featureITree = new _nodeIntervalTree2.default();
  var maxYOffset = 0;
  var svgGroup = [];
  var labels = {};

  if (!Object.keys(annotations).length) return null;
  (0, _lodash.sortBy)(annotations, function (a) {
    return -(0, _veRangeUtils.getRangeLength)(a, sequenceLength);
  }).map(function (annotation) {
    var _getRangeAngles = (0, _getRangeAnglesSpecial2.default)(positionBy ? positionBy(annotation) : annotation, sequenceLength),
        startAngle = _getRangeAngles.startAngle,
        endAngle = _getRangeAngles.endAngle,
        totalAngle = _getRangeAngles.totalAngle,
        centerAngle = _getRangeAngles.centerAngle,
        locationAngles = _getRangeAngles.locationAngles;

    var spansOrigin = startAngle > endAngle;
    var annotationCopy = _extends({}, annotation, {
      startAngle: startAngle,
      endAngle: endAngle,
      locationAngles: locationAngles,
      totalAngle: totalAngle,
      centerAngle: centerAngle,
      yOffset: 0
    });
    if (!allOnSameLevel) {
      //expand the end angle if annotation spans the origin
      var expandedEndAngle = spansOrigin ? endAngle + 2 * Math.PI : endAngle;
      var yOffset1 = void 0;
      var yOffset2 = void 0;
      if (spansOrigin) {
        annotationCopy.yOffset = (0, _getYOffset2.default)(featureITree, startAngle, expandedEndAngle);
      } else {
        //we need to check both locations to account for annotations that span the origin
        yOffset1 = (0, _getYOffset2.default)(featureITree, startAngle, expandedEndAngle);
        yOffset2 = (0, _getYOffset2.default)(featureITree, startAngle + Math.PI * 2, expandedEndAngle + Math.PI * 2);
        annotationCopy.yOffset = Math.max(yOffset1, yOffset2);
      }

      if (spansOrigin) {
        featureITree.insert(startAngle, expandedEndAngle, _extends({}, annotationCopy));
      } else {
        //normal feature
        // we need to add it twice to the interval tree to accomodate features which span the origin
        featureITree.insert(startAngle, expandedEndAngle, _extends({}, annotationCopy));
        featureITree.insert(startAngle + 2 * Math.PI, expandedEndAngle + 2 * Math.PI, _extends({}, annotationCopy));
      }

      if (annotationCopy.yOffset > maxYOffset) {
        maxYOffset = annotationCopy.yOffset;
      }
    }

    return annotationCopy;
  }).forEach(function (annotation, index) {
    annotation.yOffset = maxYOffset - annotation.yOffset;
    function _onClick(event) {
      onClick({ event: event, annotation: annotation });
      if (annotation.onClick) {
        annotation.onClick({ event: event, annotation: annotation });
      }
    }
    function onContextMenu(event) {
      onRightClicked({ event: event, annotation: annotation });
      if (annotation.onRightClick) {
        annotation.onRightClick({ event: event, annotation: annotation });
      }
    }

    var startAngle = annotation.startAngle,
        endAngle = annotation.endAngle,
        totalAngle = annotation.totalAngle,
        centerAngle = annotation.centerAngle,
        locationAngles = annotation.locationAngles;


    var titleText = (0, _getAnnotationNameAndStartStopString2.default)(annotation);

    var annotationRadius = radius + annotation.yOffset * totalAnnotationHeight;
    var name = annotation.name || annotation.restrictionEnzyme && annotation.restrictionEnzyme.name;
    if (showLabels) {
      //add labels to the exported label array (to be drawn by the label component)
      labels[annotation.id] = _extends({
        annotationType: annotationType,
        annotationCenterAngle: useStartAngle ? startAngle : centerAngle,
        annotationCenterRadius: annotationRadius,
        text: name,
        id: annotation.id,
        title: titleText,
        className: annotation.labelClassName || "",
        onClick: _onClick,
        fontStyle: fontStyle || "normal",
        color: annotation.labelColor || (annotationType === "part" ? "purple" : "black"),
        onContextMenu: onContextMenu
      }, labelOptions);
    }

    var annotationColor = getColor ? getColor(annotation) : annotation.color || "purple";

    DrawAnnotation.displayName = annotationType + "--- DrawAnnotation";
    svgGroup.push(_react2.default.createElement(DrawAnnotation, _extends({
      isProtein: isProtein,
      titleText: titleText,
      editorName: editorName,
      annotationType: annotationType,
      showLabels: showLabels,
      Annotation: Annotation,
      labelCenter: centerAngle,
      startAngle: startAngle,
      endAngle: endAngle,
      locationAngles: locationAngles,
      reverseAnnotations: reverseAnnotations,
      onClick: _onClick,
      onContextMenu: onContextMenu,
      annotation: annotation,
      totalAngle: totalAngle,
      annotationColor: annotationColor,
      annotationRadius: annotationRadius,
      annotationHeight: annotationHeight,
      annotationProps: annotationProps
    }, {
      id: annotation.id,
      key: "veAnnotation-" + annotationType + index
    })));
  });
  return {
    component: _react2.default.createElement(
      "g",
      {
        className: "veAnnotations-" + annotationType,
        key: "veAnnotations-" + annotationType
      },
      svgGroup
    ),
    height: maxYOffset * totalAnnotationHeight + 0.5 * annotationHeight,
    labels: labels
  };
}

exports.default = drawAnnotations;


var DrawAnnotation = (0, _withHover2.default)(function (_ref2) {
  var className = _ref2.className,
      startAngle = _ref2.startAngle,
      endAngle = _ref2.endAngle,
      onClick = _ref2.onClick,
      onContextMenu = _ref2.onContextMenu,
      titleText = _ref2.titleText,
      locationAngles = _ref2.locationAngles,
      annotation = _ref2.annotation,
      reverseAnnotations = _ref2.reverseAnnotations,
      _ref2$Annotation = _ref2.Annotation,
      Annotation = _ref2$Annotation === undefined ? _Feature2.default : _ref2$Annotation,
      totalAngle = _ref2.totalAngle,
      annotationColor = _ref2.annotationColor,
      isProtein = _ref2.isProtein,
      annotationRadius = _ref2.annotationRadius,
      annotationHeight = _ref2.annotationHeight,
      onMouseLeave = _ref2.onMouseLeave,
      onMouseOver = _ref2.onMouseOver,
      annotationProps = _ref2.annotationProps;

  var sharedProps = {
    style: { cursor: "pointer" },
    className: className,
    onContextMenu: onContextMenu,
    onClick: onClick,
    onMouseLeave: onMouseLeave,
    onMouseOver: onMouseOver
  };
  var title = _react2.default.createElement(
    "title",
    null,
    titleText
  );
  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      "g",
      _extends({}, (0, _PositionAnnotationOnCircle2.default)({
        sAngle: startAngle,
        eAngle: endAngle,
        forward: reverseAnnotations ? !annotation.forward : annotation.forward
      }), sharedProps),
      title,
      _react2.default.createElement(Annotation, _extends({}, locationAngles && locationAngles.length && { containsLocations: true }, {
        totalAngle: totalAngle,
        color: annotationColor,
        isProtein: isProtein,
        radius: annotationRadius,
        annotationHeight: annotationHeight
      }, annotationProps))
    ),
    ");",
    locationAngles && locationAngles.map(function (_ref3, i) {
      var startAngle = _ref3.startAngle,
          endAngle = _ref3.endAngle,
          totalAngle = _ref3.totalAngle;

      return _react2.default.createElement(
        "g",
        _extends({
          key: "location--" + annotation.id + "--" + i
        }, (0, _PositionAnnotationOnCircle2.default)({
          sAngle: startAngle,
          eAngle: endAngle,
          forward: reverseAnnotations ? !annotation.forward : annotation.forward
        }), sharedProps),
        title,
        _react2.default.createElement(Annotation, {
          totalAngle: totalAngle,
          color: annotationColor,
          radius: annotationRadius,
          annotationHeight: annotationHeight
        })
      );
    })
  );
});
module.exports = exports["default"];