"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = require("@blueprintjs/core");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _pureNoFunc = require("../utils/pureNoFunc");

var _pureNoFunc2 = _interopRequireDefault(_pureNoFunc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _pureNoFunc2.default)(function AlignmentVisibilityTool(props) {
  return _react2.default.createElement(_core.Popover, {
    minimal: true,
    position: "bottom",
    content: _react2.default.createElement(VisibilityOptions, props),
    target: _react2.default.createElement(
      _core.Tooltip,
      { content: "Visibility Options" },
      _react2.default.createElement(_core.Button, {
        small: true,
        rightIcon: "caret-down",
        intent: _core.Intent.PRIMARY,
        minimal: true,
        icon: "eye-open"
      })
    )
  });
});


function VisibilityOptions(_ref) {
  var alignmentAnnotationVisibilityToggle = _ref.alignmentAnnotationVisibilityToggle,
      _ref$togglableAlignme = _ref.togglableAlignmentAnnotationSettings,
      togglableAlignmentAnnotationSettings = _ref$togglableAlignme === undefined ? {} : _ref$togglableAlignme,
      annotationsWithCounts = _ref.annotationsWithCounts,
      currentPairwiseAlignmentIndex = _ref.currentPairwiseAlignmentIndex;

  var annotationCountToUse = {};
  if (currentPairwiseAlignmentIndex) {
    annotationCountToUse = annotationsWithCounts[currentPairwiseAlignmentIndex];
  } else {
    annotationCountToUse = annotationsWithCounts[0];
  }
  return _react2.default.createElement(
    "div",
    {
      style: { padding: 10 },
      className: "alignmentAnnotationVisibilityToolInner"
    },
    (0, _lodash.map)(togglableAlignmentAnnotationSettings, function (visible, annotationName) {
      return _react2.default.createElement(
        "div",
        { key: annotationName },
        _react2.default.createElement(
          _core.Checkbox,
          {
            onChange: function onChange() {
              alignmentAnnotationVisibilityToggle(annotationName);
            },
            checked: visible,
            label: (0, _lodash.startCase)(annotationName)
          },
          annotationName in annotationCountToUse ? _react2.default.createElement(
            _core.Tag,
            { round: true, style: { marginLeft: 7 } },
            annotationCountToUse[annotationName]
          ) : ""
        )
      );
    })
  );
}
module.exports = exports["default"];