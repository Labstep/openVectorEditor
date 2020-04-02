"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sizeSchema = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _veSequenceUtils = require("ve-sequence-utils");

var _veRangeUtils = require("ve-range-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sizeSchema = exports.sizeSchema = {
  path: "size",
  type: "string",
  render: function render(val, _record, i, props) {
    var record = props.isProtein ? (0, _veSequenceUtils.convertDnaCaretPositionOrRangeToAA)(_record) : _record;
    var base1Range = (0, _veRangeUtils.convertRangeTo1Based)(record);
    var hasJoinedLocations = record.locations && record.locations.length > 1;

    return _react2.default.createElement(
      "span",
      null,
      props.isProtein ? Math.floor(val / 3) : val,
      " ",
      _react2.default.createElement(
        "span",
        { style: { fontSize: 10 } },
        hasJoinedLocations ? record.locations.map(function (loc, i) {
          var base1Range = (0, _veRangeUtils.convertRangeTo1Based)(loc);
          return _react2.default.createElement(
            "span",
            { key: i },
            "(",
            base1Range.start,
            "-",
            base1Range.end,
            ")"
          );
        }) : _react2.default.createElement(
          "span",
          null,
          "(",
          base1Range.start,
          "-",
          base1Range.end,
          ")"
        )
      )
    );
  }
};