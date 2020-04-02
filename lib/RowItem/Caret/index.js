"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _pureNoFunc = require("../../utils/pureNoFunc");

var _pureNoFunc2 = _interopRequireDefault(_pureNoFunc);

require("./style.css");

var _editorUtils = require("../../utils/editorUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import draggableClassnames from "../../constants/draggableClassnames";

function Caret(props) {
  var charWidth = props.charWidth,
      row = props.row,
      sequenceLength = props.sequenceLength,
      caretPosition = props.caretPosition,
      isProtein = props.isProtein,
      onClick = props.onClick,
      onRightClick = props.onRightClick,
      selectionMessage = props.selectionMessage,
      _props$className = props.className,
      className = _props$className === undefined ? "" : _props$className;


  if (row.start <= caretPosition && row.end + 1 >= caretPosition || row.end === sequenceLength - 1 && row.end < caretPosition) {
    // const { gapsBefore = 0 } =
    //   !ignoreGaps && getGaps ? getGaps(caretPosition) : {};
    //the second logical operator catches the special case where we're at the very end of the sequence..
    var cursorEl = _react2.default.createElement("div", {
      onClick: onClick,
      onContextMenu: onRightClick ? function (e) {
        onRightClick(e);
      } : undefined,
      title: selectionMessage || (0, _editorUtils.getSelectionMessage)({ caretPosition: caretPosition, isProtein: isProtein, sequenceLength: sequenceLength }),
      className: "veCaret veRowViewCaret " + className,
      style: {
        left: (caretPosition - row.start) * charWidth - 2
      }
    });
    return cursorEl;
  } else {
    return null;
  }
}

exports.default = (0, _pureNoFunc2.default)(Caret);
module.exports = exports["default"];