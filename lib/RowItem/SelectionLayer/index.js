"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _draggableClassnames = require("../../constants/draggableClassnames");

var _draggableClassnames2 = _interopRequireDefault(_draggableClassnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Caret = require("../Caret");

var _Caret2 = _interopRequireDefault(_Caret);

var _pureNoFunc = require("../../utils/pureNoFunc");

var _pureNoFunc2 = _interopRequireDefault(_pureNoFunc);

require("./style.css");

var _getXStartAndWidthOfRangeWrtRow = require("../getXStartAndWidthOfRangeWrtRow");

var _getXStartAndWidthOfRangeWrtRow2 = _interopRequireDefault(_getXStartAndWidthOfRangeWrtRow);

var _veRangeUtils = require("ve-range-utils");

var _editorUtils = require("../../utils/editorUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // import { onlyUpdateForKeys } from "recompose";


function SelectionLayer(props) {
  var charWidth = props.charWidth,
      bpsPerRow = props.bpsPerRow,
      isDraggable = props.isDraggable,
      row = props.row,
      sequenceLength = props.sequenceLength,
      regions = props.regions,
      isProtein = props.isProtein,
      getGaps = props.getGaps,
      topLevelHideTitle = props.hideTitle,
      topLevelCustomTitle = props.customTitle,
      topLevelColor = props.color,
      _props$hideCarets = props.hideCarets,
      topLevelHideCarets = _props$hideCarets === undefined ? false : _props$hideCarets,
      selectionLayerRightClicked = props.selectionLayerRightClicked,
      _props$className = props.className,
      globalClassname = _props$className === undefined ? "" : _props$className,
      onClick = props.onClick;

  var hasSelection = false;

  var toReturn = _react2.default.createElement(
    _react2.default.Fragment,
    null,
    regions.map(function (selectionLayer, topIndex) {
      var _onClick = onClick ? function (event) {
        onClick({
          event: event,
          annotation: selectionLayer
        });
      } : undefined;
      var _selectionLayer$class = selectionLayer.className,
          className = _selectionLayer$class === undefined ? "" : _selectionLayer$class,
          _selectionLayer$style = selectionLayer.style,
          style = _selectionLayer$style === undefined ? {} : _selectionLayer$style,
          start = selectionLayer.start,
          end = selectionLayer.end,
          color = selectionLayer.color,
          hideTitle = selectionLayer.hideTitle,
          customTitle = selectionLayer.customTitle,
          _selectionLayer$hideC = selectionLayer.hideCarets,
          hideCarets = _selectionLayer$hideC === undefined ? false : _selectionLayer$hideC,
          ignoreGaps = selectionLayer.ignoreGaps,
          height = selectionLayer.height;

      var selectionMessage = hideTitle || topLevelHideTitle ? "" : (0, _editorUtils.getSelectionMessage)({
        selectionLayer: selectionLayer,
        customTitle: customTitle || topLevelCustomTitle,
        sequenceLength: sequenceLength,
        isProtein: isProtein
      });
      var onSelectionContextMenu = function onSelectionContextMenu(event) {
        selectionLayerRightClicked && selectionLayerRightClicked({
          event: event,
          annotation: selectionLayer
        });
      };

      var classNameToPass = className + " " + globalClassname;
      if (start > -1) {
        var overlaps = (0, _veRangeUtils.getOverlapsOfPotentiallyCircularRanges)(selectionLayer, row, sequenceLength);
        //DRAW SELECTION LAYER
        if (overlaps.length) hasSelection = true;
        return overlaps.map(function (overlap, index) {
          var key = topIndex + "-" + index;
          var isTrueStart = false;
          var isTrueEnd = false;
          if (overlap.start === selectionLayer.start) {
            isTrueStart = true;
          }
          if (overlap.end === selectionLayer.end) {
            isTrueEnd = true;
          }

          var _getXStartAndWidthOfR = _getXStartAndWidthOfRangeWrtRow2.default.apply(undefined, [overlap, row, bpsPerRow, charWidth, sequenceLength].concat(_toConsumableArray(ignoreGaps ? {} : getGaps(overlap)))),
              xStart = _getXStartAndWidthOfR.xStart,
              width = _getXStartAndWidthOfR.width;

          var caretSvgs = [];
          if (!(hideCarets || topLevelHideCarets)) {
            //DRAW CARETS
            caretSvgs = [overlap.start === start && _react2.default.createElement(_Caret2.default, {
              onClick: _onClick || _editorUtils.preventDefaultStopPropagation,
              onRightClick: onSelectionContextMenu,
              charWidth: charWidth,
              row: row,
              getGaps: getGaps,
              ignoreGaps: ignoreGaps,
              key: key + "caret1",
              sequenceLength: sequenceLength,
              className: classNameToPass + " selectionLayerCaret " + (isDraggable ? _draggableClassnames2.default.selectionStart : ""),
              caretPosition: overlap.start
            }), overlap.end === end && _react2.default.createElement(_Caret2.default, {
              onClick: _onClick || _editorUtils.preventDefaultStopPropagation,
              onRightClick: onSelectionContextMenu,
              charWidth: charWidth,
              row: row,
              getGaps: getGaps,
              ignoreGaps: ignoreGaps,
              key: key + "caret2",
              sequenceLength: sequenceLength,
              className: classNameToPass + " selectionLayerCaret " + (isDraggable ? _draggableClassnames2.default.selectionEnd : ""),
              caretPosition: overlap.end + 1
            })];
          }
          return [_react2.default.createElement("div", {
            onClick: _onClick,
            title: selectionMessage,
            onContextMenu: onSelectionContextMenu,
            key: key,
            className: classNameToPass + " veSelectionLayer veRowViewSelectionLayer notCaret " + (isTrueStart ? " isTrueStart " : "") + (isTrueEnd ? " isTrueEnd " : ""),
            style: _extends({
              width: width,
              left: xStart
            }, style, {
              background: color || topLevelColor,
              height: height
            })
          })].concat(_toConsumableArray(caretSvgs));
        });
      } else {
        return null;
      }
    })
  );
  return hasSelection ? toReturn : null;
}

exports.default = (0, _pureNoFunc2.default)(SelectionLayer);
module.exports = exports["default"];