"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _veSequenceUtils = require("ve-sequence-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getChunk = function getChunk(sequence, chunkSize, chunkNumber) {
  return sequence.slice(chunkSize * chunkNumber, chunkSize * (chunkNumber + 1));
};
var realCharWidth = 8;

var Sequence = function (_React$Component) {
  _inherits(Sequence, _React$Component);

  function Sequence() {
    _classCallCheck(this, Sequence);

    return _possibleConstructorReturn(this, (Sequence.__proto__ || Object.getPrototypeOf(Sequence)).apply(this, arguments));
  }

  _createClass(Sequence, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(newProps) {
      var props = this.props;

      if (["hideBps", "cutsites", "sequence", "showCutsites", "charWidth", "length", "height", "width", "isReverse", "scrollData", "showDnaColors"].some(function (key) {
        return props[key] !== newProps[key];
      })) return true;
      if (!!props.alignmentData !== !!newProps.alignmentData) return true;
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          sequence = _props.sequence,
          hideBps = _props.hideBps,
          charWidth = _props.charWidth,
          _props$containerStyle = _props.containerStyle,
          containerStyle = _props$containerStyle === undefined ? {} : _props$containerStyle,
          children = _props.children,
          isReverse = _props.isReverse,
          length = _props.length,
          height = _props.height,
          className = _props.className,
          _props$startOffset = _props.startOffset,
          startOffset = _props$startOffset === undefined ? 0 : _props$startOffset,
          _props$chunkSize = _props.chunkSize,
          chunkSize = _props$chunkSize === undefined ? 100 : _props$chunkSize,
          scrollData = _props.scrollData,
          showDnaColors = _props.showDnaColors,
          getGaps = _props.getGaps,
          alignmentData = _props.alignmentData;
      // const fudge = 0

      var fudge = charWidth - realCharWidth; // the fudge factor is used to position the sequence in the middle of the
      // const fudge = charWidth * 0.4; // the fudge factor is used to position the sequence in the middle of the
      var gapsBeforeSequence = 0;
      var seqReadWidth = 0;
      if (alignmentData) {
        gapsBeforeSequence = getGaps(0).gapsBefore;
        sequence = sequence.replace(/^-+/g, "").replace(/-+$/g, "");
        seqReadWidth = charWidth * sequence.length;
      }
      var style = _extends({
        position: "relative",
        height: height,
        left: gapsBeforeSequence * charWidth,
        display: alignmentData ? "inline-block" : ""
      }, containerStyle);
      var width = length * charWidth;
      var seqLen = sequence.length;
      var coloredRects = null;
      if (showDnaColors) {
        coloredRects = _react2.default.createElement(ColoredSequence, _extends({}, this.props, { width: width }));
      }
      var numChunks = Math.ceil(seqLen / chunkSize);
      // const chunkWidth = width / numChunks;
      var chunkWidth = chunkSize * charWidth;
      if (scrollData) {
        var percentScrolled = scrollData.fractionScrolled.percentScrolled,
            viewportWidth = scrollData.viewportWidth;


        var visibleStart = percentScrolled * (width - viewportWidth);
        var visibleEnd = visibleStart + viewportWidth;

        return _react2.default.createElement(
          "div",
          {
            style: style,
            className: (className ? className : "") + " ve-row-item-sequence"
          },
          _react2.default.createElement(
            "svg",
            {
              style: {
                left: startOffset * charWidth,
                height: height,
                position: "absolute"
              },
              ref: "rowViewTextContainer",
              className: "rowViewTextContainer",
              height: Math.max(0, Number(height))
            },
            (0, _lodash.times)(numChunks, function (i) {
              var seqChunk = getChunk(sequence, chunkSize, i);

              var textLength = charWidth * seqChunk.length - fudge;
              var x = i * chunkWidth;

              if (x > visibleEnd || x + textLength < visibleStart) return null;
              return _react2.default.createElement(
                "text",
                _extends({
                  key: i,
                  className: "ve-monospace-font " + (isReverse ? " ve-sequence-reverse" : "")
                }, {
                  // x: i * chunkWidth + i/2 * charWidth ,
                  // textLength: charWidth * seqChunk.length - charWidth,
                  x: x,
                  textLength: alignmentData ? seqReadWidth : textLength,
                  y: height / 2,
                  lengthAdjust: "spacing"
                }),
                seqChunk
              );
            })
          ),
          children
        );
      } else {
        return _react2.default.createElement(
          "div",
          {
            style: style,
            className: (className ? className : "") + " ve-row-item-sequence"
          },
          !hideBps && _react2.default.createElement(
            "svg",
            {
              style: {
                // marginTop: -height,
                left: startOffset * charWidth,
                height: height,
                position: "absolute"
              },
              ref: "rowViewTextContainer",
              className: "rowViewTextContainer",
              height: Math.max(0, Number(height))
            },
            _react2.default.createElement(
              "text",
              _extends({
                className: "ve-monospace-font " + (isReverse ? " ve-sequence-reverse" : "")
              }, {
                x: 0 + fudge / 2,
                y: height - height / 4,
                textLength: (alignmentData ? seqReadWidth : width) - fudge,
                lengthAdjust: "spacing"
              }),
              sequence
            )
          ),
          coloredRects,
          children
        );
      }
    }
  }]);

  return Sequence;
}(_react2.default.Component);

exports.default = Sequence;

var dnaToColor = {
  a: "lightgreen",
  c: "#658fff",
  g: "yellow",
  t: "#EE6262"
};

function getDnaColor(char, isReverse) {
  return dnaToColor[isReverse ? _veSequenceUtils.DNAComplementMap[char.toLowerCase()] : char.toLowerCase()] || "lightgrey";
}

var ColoredSequence = function (_React$Component2) {
  _inherits(ColoredSequence, _React$Component2);

  function ColoredSequence() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, ColoredSequence);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = ColoredSequence.__proto__ || Object.getPrototypeOf(ColoredSequence)).call.apply(_ref, [this].concat(args))), _this2), _this2.drawRects = function () {
      var _this2$props = _this2.props,
          charWidth = _this2$props.charWidth,
          sequence = _this2$props.sequence,
          height = _this2$props.height,
          isReverse = _this2$props.isReverse,
          alignmentData = _this2$props.alignmentData;

      if (alignmentData) {
        sequence = sequence.replace(/^-+/g, "").replace(/-+$/g, "");
      }
      //we use big paths instead of many individual rects to improve performance
      var colorPaths = Object.values(dnaToColor).reduce(function (acc, color) {
        acc[color] = "";
        return acc;
      }, {});

      sequence.split("").forEach(function (char, i) {
        var width = charWidth;
        var x = i * charWidth;
        var y = 0;
        colorPaths[getDnaColor(char, isReverse)] = (colorPaths[getDnaColor(char, isReverse)] || "") + ("M" + x + "," + y + " L" + (x + width) + "," + y + " L" + (x + width) + "," + (y + height) + " L" + x + "," + (y + height));
      });
      return _react2.default.createElement(
        "g",
        null,
        (0, _lodash.map)(colorPaths, function (d, color) {
          return _react2.default.createElement("path", { key: color, d: d, fill: color });
        })
      );
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(ColoredSequence, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(newProps) {
      var props = this.props;

      if (["charWidth", "sequence", "height", "isReverse", "width"].some(function (key) {
        return props[key] !== newProps[key];
      })) return true;
      if (!!props.alignmentData !== !!newProps.alignmentData) return true;
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var height = this.props.height;
      // if (sequence.length > 100000) return null

      return _react2.default.createElement(
        "svg",
        { style: { display: "block" }, height: Math.max(0, Number(height)) },
        this.drawRects()
      );
    }
  }]);

  return ColoredSequence;
}(_react2.default.Component);

module.exports = exports["default"];