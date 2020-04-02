"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _polarToSpecialCartesian = require("../utils/polarToSpecialCartesian");

var _polarToSpecialCartesian2 = _interopRequireDefault(_polarToSpecialCartesian);

var _relaxLabelAngles = require("./relaxLabelAngles");

var _relaxLabelAngles2 = _interopRequireDefault(_relaxLabelAngles);

var _withHover = require("../../helperComponents/withHover");

var _withHover2 = _interopRequireDefault(_withHover);

require("./style.css");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultFontWidth = 8;
var fontWidthToFontSize = 1.75;

function Labels(_ref) {
  var _ref$labels = _ref.labels,
      labels = _ref$labels === undefined ? [] : _ref$labels,
      outerRadius = _ref.radius,
      editorName = _ref.editorName,
      textScalingFactor = _ref.textScalingFactor,
      labelLineIntensity = _ref.labelLineIntensity,
      circularViewWidthVsHeightRatio = _ref.circularViewWidthVsHeightRatio,
      _ref$condenseOverflow = _ref.condenseOverflowingXLabels,
      condenseOverflowingXLabels = _ref$condenseOverflow === undefined ? true : _ref$condenseOverflow;

  if (!labels.length) return null;
  outerRadius += 25;
  var radius = outerRadius;
  var outerPointRadius = outerRadius - 20;
  //we don't want the labels to grow too large on large screen devices,
  //so we start to decrease the fontWidth if the textScalingFactor is less than 1
  var fontWidth = defaultFontWidth * (textScalingFactor < 1 ? textScalingFactor : 1);

  var fontHeight = fontWidth * 2.4;
  var labelPoints = labels.map(function (label) {
    var annotationCenterAngle = label.annotationCenterAngle,
        annotationCenterRadius = label.annotationCenterRadius;

    return _extends({}, label, {
      width: (label.text || "Unlabeled").length * fontWidth,
      //three points define the label:
      innerPoint: _extends({}, (0, _polarToSpecialCartesian2.default)(annotationCenterRadius, annotationCenterAngle), {
        radius: annotationCenterRadius,
        angle: annotationCenterAngle
      }),
      truncatedInnerPoint: _extends({}, (0, _polarToSpecialCartesian2.default)(outerPointRadius - 15, annotationCenterAngle), {
        radius: outerPointRadius - 15,
        angle: annotationCenterAngle
      }),
      outerPoint: _extends({}, (0, _polarToSpecialCartesian2.default)(outerPointRadius, annotationCenterAngle), {
        radius: outerPointRadius,
        angle: annotationCenterAngle
      })
    }, (0, _polarToSpecialCartesian2.default)(radius, annotationCenterAngle), {
      radius: radius + 10,
      angle: annotationCenterAngle
    });
  }).map(function (label) {
    label.labelAndSublabels = [label];
    label.labelIds = _defineProperty({}, label.id, true);
    return label;
  });
  var groupedLabels = (0, _relaxLabelAngles2.default)(labelPoints, fontHeight, outerRadius).filter(function (l) {
    return !!l;
  });
  // let groupedLabels = relaxLabelAngles(
  //   labelPoints,
  //   fontHeight,
  //   outerRadius
  // ).map(label => {
  //   //in order to memoize the relaxLabelAngles function, we don't pass the full label above because it has function handlers that cause the deep equal to fail
  //   const originalLabel = {
  //     ...labels[label.id],
  //     ...label
  //   };
  //   return {
  //     ...originalLabel,
  //     labelAndSublabels: [originalLabel].concat(originalLabel.labelAndSublabels)
  //   };
  // });
  window.isLabelGroupOpen = false;
  return {
    component: _react2.default.createElement(
      "g",
      { key: "veLabels", className: "veLabels ve-monospace-font" },
      _react2.default.createElement(DrawGroupedLabels, {
        editorName: editorName,
        groupedLabels: groupedLabels,
        circularViewWidthVsHeightRatio: circularViewWidthVsHeightRatio,
        fontWidth: fontWidth,
        fontHeight: fontHeight,
        condenseOverflowingXLabels: condenseOverflowingXLabels,
        outerRadius: outerRadius,
        labelLineIntensity: labelLineIntensity
      })
    ),
    //we use the <use> tag to position the hovered label group at the top of the stack
    //point events: none is to fix a click bug..
    //http://stackoverflow.com/questions/24078524/svg-click-events-not-firing-bubbling-when-using-use-element

    height: 120
  };
}
exports.default = Labels;


var DrawLabelGroup = (0, _withHover2.default)(function (_ref2) {
  var hovered = _ref2.hovered,
      className = _ref2.className,
      label = _ref2.label,
      labelAndSublabels = _ref2.labelAndSublabels,
      fontWidth = _ref2.fontWidth,
      fontHeight = _ref2.fontHeight,
      outerRadius = _ref2.outerRadius,
      onMouseLeave = _ref2.onMouseLeave,
      onMouseOver = _ref2.onMouseOver,
      editorName = _ref2.editorName,
      circularViewWidthVsHeightRatio = _ref2.circularViewWidthVsHeightRatio,
      condenseOverflowingXLabels = _ref2.condenseOverflowingXLabels,
      hoveredId = _ref2.hoveredId,
      labelLineIntensity = _ref2.labelLineIntensity,
      multipleLabels = _ref2.multipleLabels;
  var _label$text = label.text,
      text = _label$text === undefined ? "Unlabeled" : _label$text;

  var groupLabelXStart = void 0;
  //Add the number of unshown labels
  if (label.labelAndSublabels && label.labelAndSublabels.length > 1) {
    // if (label.x > 0) {
    text = "+" + (label.labelAndSublabels.length - 1) + "," + text;
    // } else {
    //   text += ', +' + (label.labelAndSublabels.length - 1)
    // }
  }

  var labelLength = text.length * fontWidth;
  var maxLabelLength = labelAndSublabels.reduce(function (currentLength, _ref3) {
    var _ref3$text = _ref3.text,
        text = _ref3$text === undefined ? "Unlabeled" : _ref3$text;

    if (text.length > currentLength) {
      return text.length;
    }
    return currentLength;
  }, 0);

  var maxLabelWidth = maxLabelLength * fontWidth;
  var labelOnLeft = label.angle > Math.PI;
  var labelXStart = label.x - (labelOnLeft ? labelLength : 0);
  if (condenseOverflowingXLabels) {
    var distancePastBoundary = Math.abs(label.x + (labelOnLeft ? -labelLength : labelLength)) - (outerRadius + 90) * Math.max(1, circularViewWidthVsHeightRatio);
    // Math.max(outerRadius (circularViewWidthVsHeightRatio / 2 + 80));
    if (distancePastBoundary > 0) {
      var numberOfCharsToChop = Math.ceil(distancePastBoundary / fontWidth) + 2;
      //   if (numberOfCharsToChop > text.length) numberOfCharsToChop = text.length
      //label overflows the boundaries!
      text = text.slice(0, -numberOfCharsToChop) + "..";
      groupLabelXStart = labelXStart + (labelOnLeft ? distancePastBoundary : -distancePastBoundary);
      labelXStart += labelOnLeft ? distancePastBoundary : 0;
    }
  }
  var dy = fontHeight;
  var textYStart = label.y + dy / 2;

  //if label xStart or label xEnd don't fit within the canvas, we need to shorten the label..

  var content = void 0;
  var labelClass = " veLabelText veCircularViewLabelText clickable " + label.color;

  if ((multipleLabels || groupLabelXStart !== undefined) && hovered) {
    //HOVERED: DRAW MULTIPLE LABELS IN A RECTANGLE
    window.isLabelGroupOpen = true;
    var hoveredLabel = void 0;
    if (groupLabelXStart !== undefined) {
      labelXStart = groupLabelXStart;
    }
    labelAndSublabels.some(function (label) {
      if (label.id === hoveredId) {
        hoveredLabel = label;
        return true;
      }
      return false;
    });
    if (!hoveredLabel) {
      hoveredLabel = label;
    }
    var labelYStart = label.y;

    var labelGroupHeight = labelAndSublabels.length * dy;
    var labelGroupBottom = label.y + labelGroupHeight;
    // var numberOfLabelsToFitAbove = 0
    if (labelGroupBottom > outerRadius + 20) {
      // var diff = labelGroupBottom - (outerRadius+10)
      //calculate new label y start if necessary (the group is too long)
      labelYStart -= (label.labelAndSublabels.length - 1) * dy;
      if (labelYStart < -outerRadius) {
        //we need to make another row of labels!
      }
    }

    var line = LabelLine([hoveredLabel.innerPoint,
    // hoveredLabel.labelAndSublabels &&
    // hoveredLabel.labelAndSublabels.length > 0
    //   ? hoveredLabel.outerPoint
    //   : {},
    label], { style: { opacity: 1 }, strokeWidth: 2 });
    content = [line, _react2.default.createElement(
      PutMyParentOnTop,
      { key: "gGroup" },
      _react2.default.createElement(
        "g",
        { className: className + " topLevelLabelGroup" },
        _react2.default.createElement("rect", {
          onMouseOver: cancelFn
          // zIndex={10}
          , x: labelXStart - 4,
          y: labelYStart - dy / 2,
          width: maxLabelWidth + 24,
          height: labelGroupHeight + 4,
          fill: "white",
          stroke: "black"
        }),
        _react2.default.createElement(
          "text",
          {
            /* zIndex={11} */x: labelXStart,
            y: labelYStart,
            style: {
              fontSize: fontWidth * fontWidthToFontSize,
              fontStyle: label.fontStyle
            }
          },
          labelAndSublabels.map(function (label, index) {
            return _react2.default.createElement(DrawGroupInnerLabel, _extends({
              isSubLabel: true,
              editorName: editorName,
              logHover: true,
              key: "labelItem" + index,
              className: (label.className || "") + labelClass + " veDrawGroupInnerLabel",
              id: label.id
            }, { labelXStart: labelXStart, label: label, fontWidth: fontWidth, index: index, dy: dy }));
          })
        )
      )
    )];
  } else {
    //DRAW A SINGLE LABEL
    content = [_react2.default.createElement(
      "title",
      { key: "labeltitle" },
      label.title || label.text
    ), _react2.default.createElement(
      "text",
      {
        key: "text",
        x: labelXStart,
        textLength: text.length * fontWidth,
        lengthAdjust: "spacing",
        className: labelClass + label.className + (hovered ? " veAnnotationHovered" : ""),
        y: textYStart,
        style: {
          fontSize: fontWidth * fontWidthToFontSize,
          fontStyle: label.fontStyle,
          fill: label.color || "black"
          // stroke: label.color ? label.color : "black"
        }
      },
      text
    ), LabelLine([label.innerPoint,
    // hovered || label.annotationType === "part" //because parts live on the outside of the sequence, we don't need to show the truncated point, we can just point to them directly
    //   ? label.innerPoint
    //   : label.truncatedInnerPoint,
    label.outerPoint, label], hovered ? { style: { opacity: 1 }, strokeWidth: 2 } : { style: { opacity: labelLineIntensity } })];
  }
  return _react2.default.createElement(
    "g",
    _extends({ onMouseLeave: onMouseLeave, onMouseOver: onMouseOver }, {
      onClick: label.onClick,
      onContextMenu: label.onContextMenu || noop
    }),
    content
  );
});

function LabelLine(pointArray, options) {
  var points = "";
  pointArray.forEach(function (_ref4) {
    var x = _ref4.x,
        y = _ref4.y;

    if (!x && x !== 0) return;
    points += x + "," + y + " ";
  });
  return _react2.default.createElement(
    _react2.default.Fragment,
    { key: "labelLine" },
    _react2.default.createElement("polyline", _extends({
      key: "polyline-long",
      points: points,
      stroke: "black",
      fill: "none",
      strokeWidth: 1,
      className: "veLabelLine"
    }, options))
  );
}

var DrawGroupInnerLabel = (0, _withHover2.default)(function (_ref5) {
  var className = _ref5.className,
      labelXStart = _ref5.labelXStart,
      label = _ref5.label,
      fontWidth = _ref5.fontWidth,
      onMouseOver = _ref5.onMouseOver,
      index = _ref5.index,
      dy = _ref5.dy;

  return _react2.default.createElement(
    "tspan",
    _extends({
      x: labelXStart,
      textLength: label.text.length * fontWidth,
      lengthAdjust: "spacing",
      onClick: label.onClick,
      onContextMenu: label.onContextMenu,
      dy: index === 0 ? dy / 2 : dy,
      style: {
        fill: label.color ? label.color : "black",
        fontStyle: label.fontStyle
      }
    }, { onMouseOver: onMouseOver }, {
      className: className
    }),
    label.text
  );
});

function noop() {}

var DrawGroupedLabels = function DrawGroupedLabelsInner(_ref6) {
  var groupedLabels = _ref6.groupedLabels,
      circularViewWidthVsHeightRatio = _ref6.circularViewWidthVsHeightRatio,
      fontWidth = _ref6.fontWidth,
      fontHeight = _ref6.fontHeight,
      condenseOverflowingXLabels = _ref6.condenseOverflowingXLabels,
      outerRadius = _ref6.outerRadius,
      editorName = _ref6.editorName,
      labelLineIntensity = _ref6.labelLineIntensity;

  return groupedLabels.map(function (label) {
    var labelAndSublabels = label.labelAndSublabels,
        labelIds = label.labelIds;

    var multipleLabels = labelAndSublabels.length > 1;
    return _react2.default.createElement(DrawLabelGroup, _extends({
      key: label.id,
      id: labelIds
    }, {
      label: label,
      passHoveredId: true, //needed to get the hoveredId
      isLabelGroup: true,
      className: "DrawLabelGroup",
      multipleLabels: multipleLabels,
      labelAndSublabels: labelAndSublabels,
      labelIds: labelIds,
      circularViewWidthVsHeightRatio: circularViewWidthVsHeightRatio,
      fontWidth: fontWidth,
      editorName: editorName,
      fontHeight: fontHeight,
      condenseOverflowingXLabels: condenseOverflowingXLabels,
      outerRadius: outerRadius,
      labelLineIntensity: labelLineIntensity
    }));
  });
};
function cancelFn(e) {
  e.stopPropagation();
}

var PutMyParentOnTop = function (_React$Component) {
  _inherits(PutMyParentOnTop, _React$Component);

  function PutMyParentOnTop() {
    _classCallCheck(this, PutMyParentOnTop);

    return _possibleConstructorReturn(this, (PutMyParentOnTop.__proto__ || Object.getPrototypeOf(PutMyParentOnTop)).apply(this, arguments));
  }

  _createClass(PutMyParentOnTop, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //we use this component to re-order the svg groupedLabels because z-index won't work in svgs
      try {
        var el = document.querySelector(".topLevelLabelGroup");
        var parent = el.parentElement.parentElement;
        var i = Array.prototype.indexOf.call(parent.children, el.parentElement);
        parent.insertBefore(parent.children[i], null); //insert at the end of the list..
      } catch (error) {
        console.warn("OVE-975239 - hit an error trying to re-order labels:", error);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return PutMyParentOnTop;
}(_react2.default.Component);

module.exports = exports["default"];