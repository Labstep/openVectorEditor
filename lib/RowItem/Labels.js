"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _recompose = require("recompose");

var _withHover = require("../helperComponents/withHover");

var _withHover2 = _interopRequireDefault(_withHover);

var _getXStartAndWidthOfRowAnnotation = require("./getXStartAndWidthOfRowAnnotation");

var _getXStartAndWidthOfRowAnnotation2 = _interopRequireDefault(_getXStartAndWidthOfRowAnnotation);

var _nodeIntervalTree = require("node-interval-tree");

var _nodeIntervalTree2 = _interopRequireDefault(_nodeIntervalTree);

var _getYOffset = require("../CircularView/getYOffset");

var _getYOffset2 = _interopRequireDefault(_getYOffset);

var _lodash = require("lodash");

var _lib = require("ve-range-utils/lib");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUFFER_WIDTH = 6; //labels shouldn't be less than 6px from eachother on the same line

function Labels(props) {
  var _props$annotationRang = props.annotationRanges,
      annotationRanges = _props$annotationRang === undefined ? {} : _props$annotationRang,
      bpsPerRow = props.bpsPerRow,
      charWidth = props.charWidth,
      rangeMax = props.rangeMax,
      onlyShowLabelsThatDoNotFit = props.onlyShowLabelsThatDoNotFit,
      annotationHeight = props.annotationHeight,
      _props$textWidth = props.textWidth,
      textWidth = _props$textWidth === undefined ? 6 : _props$textWidth,
      editorName = props.editorName,
      labelLineIntensity = props.labelLineIntensity;

  if (annotationRanges.length === 0) {
    return null;
  }
  var warningMessage = null;
  // if (Object.keys(annotationRanges).length > 50) {
  //   warningMessage = (
  //     <span style={{ color: "red" }}>
  //       <br />
  //       Warning: Only the first 50 cutsites will be displayed. Filter the
  //       cutsites you wish to see using the filter tool <br />
  //     </span>
  //   );
  // }

  var rowLength = bpsPerRow * charWidth;
  // let counter = 0;
  var maxAnnotationYOffset = 0;
  var annotationsSVG = [];
  var rowCenter = rowLength / 2;
  var iTree = new _nodeIntervalTree2.default(rowCenter);

  annotationRanges = (0, _lodash.values)((0, _lodash.reduce)(annotationRanges, function (accum, annotationRange) {
    var identifier = annotationRange.annotation.annotationTypePlural + "--" + annotationRange.id;
    if (
    // annotationRange.annotation.annotationTypePlural === "parts" ||
    !accum[identifier] || (0, _lib.getRangeLength)(accum[identifier], rangeMax) < (0, _lib.getRangeLength)(annotationRange, rangeMax)) {
      accum[identifier] = annotationRange;
      return accum;
    } else {
      return accum;
    }
  }, {}));

  (0, _lodash.filter)(annotationRanges, function (r) {
    if (onlyShowLabelsThatDoNotFit) {
      //tnrtodo: more work needs to be done here to make this actually configurable
      //check if annotation name will fit
      if (r.annotation.annotationTypePlural === "cutsites") {
        //we don't want to filter out any cutsite labels
        return true;
      }
      return !(0, _utils.doesLabelFitInAnnotation)(r.annotation.name, { range: r }, charWidth);
    }
    return true;
  }).forEach(function (annotationRange, index) {
    var pluralType = annotationRange.annotation.annotationTypePlural;
    var annotation = annotationRange.annotation;
    if (!annotation) {
      annotation = annotationRange;
    }
    var annotationLength = (annotation.name || annotation.restrictionEnzyme.name).length * textWidth;

    var _getXStartAndWidthOfR = (0, _getXStartAndWidthOfRowAnnotation2.default)(annotationRange, bpsPerRow, charWidth),
        xStart = _getXStartAndWidthOfR.xStart,
        width = _getXStartAndWidthOfR.width;

    xStart = annotation.annotationTypePlural === "cutsites" ? xStart : xStart + width / 2;

    var xStartOriginal = xStart;
    // if (annotation.name.includes("CmR I'm")) debugger
    var xEnd = xStart + annotationLength;

    if (xEnd > rowLength) {
      xStart = xStart - (xEnd - rowLength);
      xEnd = rowLength;
    }
    xEnd += BUFFER_WIDTH;
    var yOffset = (0, _getYOffset2.default)(iTree, xStart, xEnd);
    iTree.insert(xStart, xEnd, _extends({}, annotationRange, {
      yOffset: yOffset
    }));

    if (yOffset > maxAnnotationYOffset) {
      maxAnnotationYOffset = yOffset;
    }
    var height = yOffset * annotationHeight;
    annotationsSVG.push(_react2.default.createElement(DrawLabel, _extends({
      id: annotation.id,
      key: "cutsiteLabel" + index
    }, {
      editorName: editorName,
      annotation: annotation,
      className: (annotationRange.annotation.labelClassName || "") + " " + labelClassNames[pluralType] + " veLabel ",
      xStartOriginal: xStartOriginal,
      onClick: annotationRange.onClick,
      onRightClick: annotationRange.onRightClick,
      height: height,
      xStart: xStart,
      xEnd: xEnd,
      labelLineIntensity: labelLineIntensity
    })));
  });
  if (!annotationsSVG.length) return null;
  var containerHeight = (maxAnnotationYOffset + 1) * annotationHeight;
  return _react2.default.createElement(
    "div",
    {
      width: "100%",
      style: {
        position: "relative",
        height: containerHeight,
        display: "block"
      },
      className: "veRowViewLabelsContainer"
    },
    annotationsSVG,
    warningMessage
  );
}

exports.default = (0, _recompose.onlyUpdateForKeys)(["annotationRanges", "bpsPerRow", "charWidth", "annotationHeight", "spaceBetweenAnnotations", "onClick", "textWidth", "editorName"])(Labels);


var DrawLabel = (0, _withHover2.default)(function (_React$Component) {
  _inherits(DrawLabelInner, _React$Component);

  function DrawLabelInner() {
    _classCallCheck(this, DrawLabelInner);

    return _possibleConstructorReturn(this, (DrawLabelInner.__proto__ || Object.getPrototypeOf(DrawLabelInner)).apply(this, arguments));
  }

  _createClass(DrawLabelInner, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          hovered = _props.hovered,
          className = _props.className,
          annotation = _props.annotation,
          _onClick = _props.onClick,
          onRightClick = _props.onRightClick,
          height = _props.height,
          xStartOriginal = _props.xStartOriginal,
          xStart = _props.xStart,
          onMouseLeave = _props.onMouseLeave,
          onMouseOver = _props.onMouseOver,
          labelLineIntensity = _props.labelLineIntensity;

      var heightToUse = height;
      var bottom = 0;
      if (hovered) {
        try {
          var line = this.n;
          var isRowView = document.querySelector(".veRowView").contains(line);

          var el = line.closest(".veRowItem").querySelector(annotation.annotationTypePlural === "cutsites" ? isRowView ? ".cutsiteLabelSelectionLayer" : ".veRowViewAxis" : "[dataId=\"" + annotation.id + "\"].veRowView" + (0, _lodash.startCase)(annotation.annotationTypePlural.slice(0, -1)));
          var annDims = el.getBoundingClientRect();
          var lineDims = line.getBoundingClientRect();
          var heightDiff = annDims.bottom - lineDims.bottom - annDims.height / 2;
          heightToUse = height + heightDiff;
          bottom = -heightDiff;
        } catch (e) {
          window.veDebugLabels && console.error("err computing label line:", e);
        }
      }
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          _extends({ onMouseLeave: onMouseLeave, onMouseOver: onMouseOver }, {
            className: className + " ve-monospace-font",
            onClick: function onClick(event) {
              _onClick({ event: event, annotation: annotation });
              event.stopPropagation();
            },
            onContextMenu: function onContextMenu(event) {
              onRightClick({ event: event, annotation: annotation });
              event.stopPropagation();
            },
            style: _extends({
              cursor: "pointer",
              position: "absolute",
              bottom: height
            }, hovered && { fontWeight: "bold" }, annotation.annotationTypePlural !== "cutsites" && {
              fontStyle: "normal"
            }, {
              left: xStart,
              color: hovered ? "black" : annotation.annotationTypePlural === "parts" ? "purple" : annotation.labelColor,
              zIndex: 10
            })
          }),
          annotation.name || annotation.restrictionEnzyme.name
        ),
        _react2.default.createElement("div", {
          ref: function ref(n) {
            if (n) _this2.n = n;
          },
          style: {
            zIndex: 50,
            position: "absolute",
            left: xStartOriginal,
            bottom: bottom,
            height: Math.max(heightToUse, 3),
            width: hovered ? 2 : 1,
            opacity: hovered ? 1 : labelLineIntensity,
            background: "black"
          }
        })
      );
    }
  }]);

  return DrawLabelInner;
}(_react2.default.Component));

var labelClassNames = {
  cutsites: "veCutsiteLabel",
  parts: "vePartLabel",
  features: "veFeatureLabel"
};
module.exports = exports["default"];