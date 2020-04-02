"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _veRangeUtils = require("ve-range-utils");

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _validate = require("validate.io-nonnegative-integer-array");

var _validate2 = _interopRequireDefault(_validate);

var _getXStartAndWidthOfRangeWrtRow = require("./getXStartAndWidthOfRangeWrtRow");

var _getXStartAndWidthOfRangeWrtRow2 = _interopRequireDefault(_getXStartAndWidthOfRangeWrtRow);

var _pureNoFunc = require("../utils/pureNoFunc");

var _pureNoFunc2 = _interopRequireDefault(_pureNoFunc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var snipStyle = {
  height: "100%",
  // background: 'black',
  position: "absolute",
  top: 1,
  width: "2px"
};
var snipConnectorStyle = {
  height: "2px",
  // background: 'black',
  position: "absolute",
  top: 1
};

// var cursor = getCursorForRow(caretPosition, row, bpsPerRow, snipStyle, charWidth, true);

function getSnipForRow(snipPosition, row, sequenceLength, bpsPerRow, snipStyle, charWidth, index) {
  if (!(0, _veRangeUtils.isPositionWithinRange)(snipPosition, row)) return;

  var _getXStartAndWidthOfR = (0, _getXStartAndWidthOfRangeWrtRow2.default)({ start: snipPosition, end: snipPosition }, row, bpsPerRow, charWidth, sequenceLength),
      xStart = _getXStartAndWidthOfR.xStart;

  var newCursorStyle = (0, _assign2.default)({}, snipStyle, {
    left: xStart + 2
  });
  var cursorEl = _react2.default.createElement("div", { key: index, className: "veRowViewCutsite snip", style: newCursorStyle });
  return cursorEl;
}

function getSnipConnector(snipRange, row, sequenceLength, bpsPerRow, snipConnectorStyle, charWidth, index) {
  //tnr: we basically need to first determine what the range start and end are..
  // var _snipRange = {
  //     ...snipRange,
  //     end: norm(snipRange.end-1,sequenceLength)
  // }
  //then mask the range by the row

  var overlaps = (0, _veRangeUtils.getOverlapsOfPotentiallyCircularRanges)(snipRange, _extends({}, row, { end: row.end + 1 }), sequenceLength);
  return overlaps.map(function (overlap, index2) {
    var _getXStartAndWidthOfR2 = (0, _getXStartAndWidthOfRangeWrtRow2.default)(overlap, row, bpsPerRow, charWidth, sequenceLength),
        xStart = _getXStartAndWidthOfR2.xStart,
        width = _getXStartAndWidthOfR2.width;

    width -= charWidth;
    //the second logical operator catches the special case where we're at the very end of the sequence..
    var newCursorStyle = (0, _assign2.default)({}, snipConnectorStyle, {
      left: xStart + 2,
      width: width
    });
    var cursorEl = _react2.default.createElement("div", {
      key: index + index2,
      className: "veRowViewCutsite snipConnector",
      style: newCursorStyle
    });
    return cursorEl;
  });
}

function Cutsites(props) {
  var annotationRanges = props.annotationRanges,
      charWidth = props.charWidth,
      bpsPerRow = props.bpsPerRow,
      row = props.row,
      sequenceLength = props.sequenceLength,
      topStrand = props.topStrand;

  var snips = [];
  var snipConnectors = [];
  Object.keys(annotationRanges).forEach(function (key) {
    var annotationRange = annotationRanges[key];
    var annotation = annotationRange.annotation;

    if (!annotation) {
      annotation = annotationRange;
    }
    var _annotation = annotation,
        topSnipPosition = _annotation.topSnipPosition,
        bottomSnipPosition = _annotation.bottomSnipPosition,
        upstreamBottomSnip = _annotation.upstreamBottomSnip,
        upstreamTopSnip = _annotation.upstreamTopSnip,
        upstreamTopBeforeBottom = _annotation.upstreamTopBeforeBottom,
        topSnipBeforeBottom = _annotation.topSnipBeforeBottom;

    topSnipPosition = topSnipPosition && Number(topSnipPosition);
    bottomSnipPosition = bottomSnipPosition && Number(bottomSnipPosition);
    upstreamTopSnip = upstreamTopSnip && Number(upstreamTopSnip);
    upstreamBottomSnip = upstreamBottomSnip && Number(upstreamBottomSnip);

    snipStyle = _extends({}, snipStyle, {
      background: annotation.restrictionEnzyme.color || "black"
    });
    snipConnectorStyle = _extends({}, snipConnectorStyle, {
      background: annotation.restrictionEnzyme.color || "black"
    });

    var newSnip = void 0;
    var newConnector = void 0;
    var snipRange = {};

    if ((0, _validate2.default)([bottomSnipPosition, topSnipPosition])) {
      if (topStrand) {
        // if (isPositionWithinRange(topSnipPosition, row)) {}
        newSnip = getSnipForRow(topSnipPosition, row, sequenceLength, bpsPerRow, snipStyle, charWidth, key + "downstream");
        if (newSnip) {
          snips.push(newSnip);
        }
      } else {
        newSnip = getSnipForRow(bottomSnipPosition, row, sequenceLength, bpsPerRow, snipStyle, charWidth, key + "downstream");
        if (newSnip) {
          snips.push(newSnip);
        }
        if (topSnipBeforeBottom) {
          snipRange.start = topSnipPosition;
          snipRange.end = bottomSnipPosition;
        } else {
          snipRange.start = bottomSnipPosition;
          snipRange.end = topSnipPosition;
        }
        newConnector = getSnipConnector(snipRange, row, sequenceLength, bpsPerRow, snipConnectorStyle, charWidth, key + "downstreamConnector");
        snipConnectors.push(newConnector);
      }
    }
    if ((0, _validate2.default)([upstreamBottomSnip, upstreamTopSnip])) {
      if (topStrand) {
        newSnip = getSnipForRow(upstreamTopSnip, row, sequenceLength, bpsPerRow, snipStyle, charWidth, key + "upstream");
        if (newSnip) {
          snips.push(newSnip);
        }
      } else {
        newSnip = getSnipForRow(upstreamBottomSnip, row, sequenceLength, bpsPerRow, snipStyle, charWidth, key + "upstream");
        if (newSnip) {
          snips.push(newSnip);
        }
        if (upstreamTopBeforeBottom) {
          snipRange.start = upstreamTopSnip;
          snipRange.end = upstreamBottomSnip;
        } else {
          snipRange.start = upstreamBottomSnip;
          snipRange.end = upstreamTopSnip;
        }
        newConnector = getSnipConnector(snipRange, row, sequenceLength, bpsPerRow, snipConnectorStyle, charWidth, key + "upstreamConnector");
        snipConnectors.push(newConnector);
      }
    }
  });
  return _react2.default.createElement(
    "div",
    null,
    snips,
    snipConnectors
  );
}

// Cutsites.propTypes = {
//   // annotationRanges: React.PropTypes.object.isRequired,
//   charWidth: PropTypes.number.isRequired,
//   bpsPerRow: PropTypes.number.isRequired,
//   row: PropTypes.object.isRequired,
//   sequenceLength: PropTypes.number.isRequired,
//   topStrand: PropTypes.bool.isRequired
// };

exports.default = (0, _pureNoFunc2.default)(Cutsites);
module.exports = exports["default"];