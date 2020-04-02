"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _veRangeUtils = require("ve-range-utils");

var _getXStartAndWidthOfRangeWrtRow = require("./getXStartAndWidthOfRangeWrtRow");

var _getXStartAndWidthOfRangeWrtRow2 = _interopRequireDefault(_getXStartAndWidthOfRangeWrtRow);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _calculateTickMarkPositionsForGivenRange = require("../utils/calculateTickMarkPositionsForGivenRange");

var _calculateTickMarkPositionsForGivenRange2 = _interopRequireDefault(_calculateTickMarkPositionsForGivenRange);

var _pureNoFunc = require("../utils/pureNoFunc");

var _pureNoFunc2 = _interopRequireDefault(_pureNoFunc);

var _proteinUtils = require("../utils/proteinUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// import { onlyUpdateForKeys } from "recompose";


// import getXCenterOfRowAnnotation from "./getXCenterOfRowAnnotation";

var Axis = function Axis(props) {
  var row = props.row,
      tickSpacing = props.tickSpacing,
      bpsPerRow = props.bpsPerRow,
      charWidth = props.charWidth,
      annotationHeight = props.annotationHeight,
      marginTop = props.marginTop,
      sequenceLength = props.sequenceLength,
      _props$showAxisNumber = props.showAxisNumbers,
      showAxisNumbers = _props$showAxisNumber === undefined ? true : _props$showAxisNumber,
      getGaps = props.getGaps,
      isProtein = props.isProtein;

  if (row.start === 0 && row.end === 0) {
    return null;
  }

  var _getXStartAndWidthOfR = _getXStartAndWidthOfRangeWrtRow2.default.apply(undefined, [row, row, bpsPerRow, charWidth, sequenceLength].concat(_toConsumableArray(getGaps ? [getGaps(row).gapsBefore, getGaps(row).gapsInside] : []))),
      xStart = _getXStartAndWidthOfR.xStart,
      width = _getXStartAndWidthOfR.width;
  //this function should take in a desired tickSpacing (eg 10 bps between tick mark)
  //and output an array of tickMarkPositions for the given row (eg, [0, 10, 20])


  var xEnd = xStart + width;

  var yStart = 0;
  var tickMarkPositions = (0, _calculateTickMarkPositionsForGivenRange2.default)({
    tickSpacing: tickSpacing,
    range: row,
    sequenceLength: sequenceLength,
    isProtein: isProtein
  });
  var tickMarkSVG = [];

  tickMarkPositions.forEach(function (tickMarkPosition, i) {
    // var xCenter = getXCenterOfRowAnnotation({
    //     start: tickMarkPosition,
    //     end: tickMarkPosition
    // }, row, bpsPerRow, charWidth, sequenceLength);
    var xCenter = (tickMarkPosition - (isProtein ? 1 : 0) + (getGaps ? getGaps(tickMarkPosition).gapsBefore : 0)) * charWidth + charWidth / 2;
    var yStart = 0;
    var yEnd = annotationHeight / 3;
    tickMarkSVG.push(_react2.default.createElement("path", {
      key: "axisTickMarkPath " + i + " " + tickMarkPosition,
      d: "M" + xCenter + "," + yStart + " L" + xCenter + "," + yEnd,
      stroke: "black"
    }));
    if (showAxisNumbers) {
      var position = (0, _veRangeUtils.normalizePositionByRangeLength)(row.start + tickMarkPosition, sequenceLength) + (isProtein ? 0 : 1);

      var positionLength = position.toString().length * 4;

      tickMarkSVG.push(_react2.default.createElement(
        "text",
        {
          key: "axisTickMarkText " + i + " " + tickMarkPosition,
          stroke: "black",
          x: i === 0 //if first label in row, or last label in row, we add checks to make sure the axis number labels don't go outside of the width of the row
          ? Math.max(positionLength, xCenter) : i === tickMarkPositions.length - 1 ? Math.min(bpsPerRow * charWidth - positionLength, xCenter) : xCenter,
          y: annotationHeight,
          style: { textAnchor: "middle", fontSize: 10, fontFamily: "Verdana" }
        },
        (0, _proteinUtils.divideBy3)(position + (isProtein ? 1 : 0), isProtein)
      ));
    }
  });

  return _react2.default.createElement(
    "svg",
    {
      className: "veRowViewAxis veAxis",
      width: "100%",
      height: annotationHeight,
      style: { marginTop: marginTop, overflow: "visible", display: "block" }
    },
    tickMarkSVG,
    _react2.default.createElement("path", {
      d: "M" + xStart + "," + yStart + " L" + xEnd + "," + yStart,
      stroke: "black"
    })
  );
};

// export default Axis
// export default Axis
exports.default = (0, _pureNoFunc2.default)(Axis);
module.exports = exports["default"];