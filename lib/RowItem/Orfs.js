"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Orf = require("./Orf");

var _Orf2 = _interopRequireDefault(_Orf);

var _StackedAnnotations = require("./StackedAnnotations");

var _StackedAnnotations2 = _interopRequireDefault(_StackedAnnotations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getExtraInnerCompProps(annotationRange, props) {
  var row = props.row;
  var annotation = annotationRange.annotation,
      start = annotationRange.start,
      end = annotationRange.end;
  var frame = annotation.frame,
      _annotation$internalS = annotation.internalStartCodonIndices,
      internalStartCodonIndices = _annotation$internalS === undefined ? [] : _annotation$internalS;

  var normalizedInternalStartCodonIndices = internalStartCodonIndices.filter(function (position) {
    if (position >= row.start && position >= start && position <= end && position <= row.end) {
      return true;
    } else return false;
  }).map(function (position) {
    return position - start;
  });

  return { normalizedInternalStartCodonIndices: normalizedInternalStartCodonIndices, frame: frame };
}

function Orfs(props) {
  return _react2.default.createElement(_StackedAnnotations2.default, _extends({}, props, { getExtraInnerCompProps: getExtraInnerCompProps, InnerComp: _Orf2.default }));
}

exports.default = Orfs;
module.exports = exports["default"];