"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _RowItem = require("../RowItem");

var _RowItem2 = _interopRequireDefault(_RowItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var _ref$extraClasses = _ref.extraClasses,
      extraClasses = _ref$extraClasses === undefined ? "" : _ref$extraClasses,
      _ref$sequence = _ref.sequence,
      sequence = _ref$sequence === undefined ? "nnnnn" : _ref$sequence,
      _ref$paddingEnd = _ref.paddingEnd,
      paddingEnd = _ref$paddingEnd === undefined ? "-------" : _ref$paddingEnd,
      _ref$paddingStart = _ref.paddingStart,
      paddingStart = _ref$paddingStart === undefined ? "-------" : _ref$paddingStart,
      reverseSnipPosition = _ref.reverseSnipPosition,
      forwardSnipPosition = _ref.forwardSnipPosition;

  var seqPlusPadding = paddingStart + sequence + paddingEnd;

  return _react2.default.createElement(
    "div",
    { className: "enzyme-rowitem " + extraClasses },
    _react2.default.createElement(_RowItem2.default, {
      tickSpacing: 1,
      annotationVisibility: {
        cutsites: true,
        cutsiteLabels: false,
        axis: false,
        reverseSequence: true,
        sequence: true
      },
      annotationLabelVisibility: {
        cutsites: false
      },
      sequenceLength: seqPlusPadding.length,
      bpsPerRow: seqPlusPadding.length,
      row: {
        sequence: seqPlusPadding,
        start: 0,
        end: seqPlusPadding.length - 1,
        cutsites: {
          fake1: {
            annotation: {
              recognitionSiteRange: {
                start: paddingStart.length,
                end: paddingStart.length + sequence.length - 1
              },
              topSnipBeforeBottom: forwardSnipPosition < reverseSnipPosition,
              bottomSnipPosition: paddingStart.length + reverseSnipPosition,
              topSnipPosition: paddingStart.length + forwardSnipPosition,
              id: "fake1",
              restrictionEnzyme: {}
            }
          }
        }
      }
    })
  );
};

module.exports = exports["default"];