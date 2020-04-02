"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _CircularView = require("./CircularView");

var _LinearView = require("./LinearView");

var _withHover = require("./helperComponents/withHover");

var _annotationVisibility2 = require("./redux/annotationVisibility");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//this view is meant to be a helper for showing a simple (non-redux connected) circular or linear view!
exports.default = function (props) {
  var _sequenceData = props.sequenceData,
      _props$annotationVisi = props.annotationVisibility,
      _annotationVisibility = _props$annotationVisi === undefined ? {} : _props$annotationVisi;

  var Component = _sequenceData.circular ? _CircularView.CircularView : _LinearView.LinearView;
  var tickSpacing = _sequenceData.circular ? undefined : Math.floor((_sequenceData.noSequence ? _sequenceData.size : _sequenceData.sequence.length) / 5);
  var sequenceData = _sequenceData;
  var annotationVisibility = _extends({}, _annotationVisibility2.visibilityDefaultValues, _annotationVisibility);

  //here we're making it possible to not pass a sequenceData.sequence
  //we can just pass a .size property to save having to send the whole sequence if it isn't needed!
  if (_sequenceData.noSequence) {
    annotationVisibility.sequence = false;
    annotationVisibility.reverseSequence = false;
    if (_sequenceData.size === undefined) {
      return _react2.default.createElement(
        "div",
        null,
        "Error: No sequenceData.size detected when using noSequence flag",
        " "
      );
    }
    sequenceData = _extends({}, _sequenceData, {
      sequence: {
        length: _sequenceData.size
      }
    });
  }

  return _react2.default.createElement(
    _withHover.HoveredIdContext.Provider,
    { value: { hoveredId: props.hoveredId } },
    _react2.default.createElement(Component, _extends({
      width: 300,
      height: 300
    }, props, {
      tickSpacing: tickSpacing,
      annotationVisibility: annotationVisibility,
      sequenceData: sequenceData
    }))
  );
};

module.exports = exports["default"];