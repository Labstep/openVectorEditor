"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@blueprintjs/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { InfoHelper } from "teselagen-react-components";

var Chromatogram = (_temp = _class = function (_React$Component) {
  _inherits(Chromatogram, _React$Component);

  function Chromatogram(props) {
    _classCallCheck(this, Chromatogram);

    var _this = _possibleConstructorReturn(this, (Chromatogram.__proto__ || Object.getPrototypeOf(Chromatogram)).call(this, props));

    _initialiseProps.call(_this);

    var scalePct = 0.05;
    _this.state = { scalePct: scalePct };
    return _this;
  }

  _createClass(Chromatogram, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var charWidth = this.props.charWidth;
      var scalePct = this.state.scalePct;

      this.updatePeakDrawing(scalePct, charWidth);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(newProps) {
      var props = this.props;

      if (["alignmentData", "chromatogramData", "charWidth", "row.start", "row.end"].some(function (key) {
        return props[key] !== newProps[key];
      })) {
        var charWidth = newProps.charWidth;
        var scalePct = this.state.scalePct;

        this.updatePeakDrawing(scalePct, charWidth);
        return true;
      }
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          getGaps = _props.getGaps,
          charWidth = _props.charWidth;

      var gapsBeforeSequence = getGaps(0).gapsBefore;
      var posOfSeqRead = gapsBeforeSequence * charWidth;

      return _react2.default.createElement(
        "div",
        {
          className: "chromatogram",
          style: {
            position: "relative"
          }
        },
        _react2.default.createElement(_core.Button, {
          minimal: true,
          className: "scaleChromatogramButtonUp",
          icon: "caret-up",
          onClick: this.scaleChromatogramYPeaksHigher,
          style: {
            zIndex: 10,
            position: "sticky",
            // left: 275
            left: 145
          }
        }),
        _react2.default.createElement(_core.Button, {
          minimal: true,
          className: "scaleChromatogramButtonDown",
          icon: "caret-down",
          onClick: this.scaleChromatogramYPeaksLower,
          style: {
            zIndex: 10,
            position: "sticky",
            // left: 305
            left: 175
          }
        }),
        _react2.default.createElement("br", null),
        _react2.default.createElement(
          "div",
          {
            className: "chromatogram-trace",
            style: {
              zIndex: -1,
              position: "relative",
              left: posOfSeqRead,
              display: "inline-block"
            }
          },
          _react2.default.createElement("canvas", {
            ref: function ref(n) {
              if (n) _this2.canvasRef = n;
            },
            height: "100"
          })
        )
      );
    }
  }]);

  return Chromatogram;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.updatePeakDrawing = function (scalePct, charWidth) {
    var _props2 = _this3.props,
        chromatogramData = _props2.chromatogramData,
        row = _props2.row,
        getGaps = _props2.getGaps;

    var painter = new drawTrace({
      peakCanvas: _this3.canvasRef,
      traceData: chromatogramData,
      charWidth: charWidth,
      startBp: row.start,
      endBp: row.end,
      getGaps: getGaps,
      scalePct: scalePct
    });
    painter.paintCanvas();
  };

  this.scaleChromatogramYPeaksHigher = function (e) {
    e.stopPropagation();
    var charWidth = _this3.props.charWidth;
    var scalePct = _this3.state.scalePct;

    var peakCanvas = _this3.canvasRef;
    var ctx = peakCanvas.getContext("2d");
    ctx.clearRect(0, 0, peakCanvas.width, peakCanvas.height);
    var newScalePct = scalePct + 0.01;
    _this3.updatePeakDrawing(newScalePct, charWidth);
    _this3.setState({ scalePct: newScalePct });
  };

  this.scaleChromatogramYPeaksLower = function (e) {
    e.stopPropagation();
    var charWidth = _this3.props.charWidth;
    var scalePct = _this3.state.scalePct;

    var peakCanvas = _this3.canvasRef;
    var ctx = peakCanvas.getContext("2d");
    ctx.clearRect(0, 0, peakCanvas.width, peakCanvas.height);
    var newScalePct = scalePct - 0.01;
    _this3.updatePeakDrawing(newScalePct, charWidth);
    _this3.setState({ scalePct: newScalePct });
  };
}, _temp);
exports.default = Chromatogram;


function drawTrace(_ref) {
  var traceData = _ref.traceData,
      charWidth = _ref.charWidth,
      startBp = _ref.startBp,
      peakCanvas = _ref.peakCanvas,
      endBp = _ref.endBp,
      getGaps = _ref.getGaps,
      scalePct = _ref.scalePct;

  var colors = {
    adenine: "green",
    thymine: "red",
    guanine: "black",
    cytosine: "blue",
    other: "purple"
  };
  var ctx = peakCanvas.getContext("2d");

  var formattedPeaks = { a: [], t: [], g: [], c: [] };
  var bottomBuffer = 0;
  var maxHeight = peakCanvas.height;
  // const endBpIncludingGaps =
  //   endBp +
  //   1 +
  //   getGaps(0).gapsBefore +
  //   getGaps({ start: startBp, end: endBp }).gapsInside;
  var seqLengthWithGaps = endBp - startBp + 1 + getGaps({ start: startBp, end: endBp }).gapsInside;
  var maxWidth = seqLengthWithGaps * charWidth;
  // const maxWidth = endBpIncludingGaps * charWidth;
  peakCanvas.width = maxWidth;
  // ctx.fillStyle = "white";
  // ctx.fillRect(0, 0, peakCanvas.width, peakCanvas.height);
  var scaledHeight = maxHeight - bottomBuffer;
  // let scalePct = 0;

  // this.findTallest = function() {
  //   const aMax = Math.max(...traceData.aTrace);
  //   const tMax = Math.max(...traceData.tTrace);
  //   const gMax = Math.max(...traceData.gTrace);
  //   const cMax = Math.max(...traceData.cTrace);
  //   scalePct = scaledHeight / Math.max(aMax, tMax, gMax, cMax);
  // };

  this.scalePeaks = function (traceIn) {
    var newPeaks = [];
    for (var count = 0; count < traceIn.length; count++) {
      newPeaks[count] = scalePct * traceIn[count];
    }
    return newPeaks;
  };

  this.preparePeaks = function () {
    // this.findTallest();
    formattedPeaks.a = this.scalePeaks(traceData.aTrace);
    formattedPeaks.t = this.scalePeaks(traceData.tTrace);
    formattedPeaks.g = this.scalePeaks(traceData.gTrace);
    formattedPeaks.c = this.scalePeaks(traceData.cTrace);
  };

  this.drawPeaks = function (trace, lineColor) {
    ctx.beginPath();
    //loop through base positions [ 43, 53, 70, 77, ...]
    // looping through the entire sequence length
    for (var baseIndex = startBp; baseIndex <= endBp; baseIndex++) {
      // each base's beginning and end of its peak
      // grab the start and end (43, 53) , (53, 70) ...
      // looping through each base's peak
      var startBasePos = traceData.basePos[baseIndex] - 5;
      var endBasePos = void 0;
      if (baseIndex === endBp) {
        // last bp does not have a 'basePos[baseIndex + 1]' to define endBasePos...so use the difference in endBasePos - startBasePos of previous bp
        var previousBpStartEndDifference = traceData.basePos[baseIndex - 1] - traceData.basePos[baseIndex - 2];
        endBasePos = startBasePos + previousBpStartEndDifference;
      } else {
        endBasePos = traceData.basePos[baseIndex + 1] - 5;
      }

      for (var innerIndex = startBasePos; innerIndex < endBasePos; innerIndex++) {
        var gapsBeforeSequence = getGaps(0).gapsBefore;
        var gapsBeforeMinusBeginningGaps = getGaps(baseIndex).gapsBefore - gapsBeforeSequence;
        // innerIndex = 43, 44, 45, ... 52
        // shift x-position of the beginning of the base's peak if there are gaps before the base
        var scalingFactor = charWidth / (endBasePos - startBasePos);
        var startXPosition = (baseIndex + gapsBeforeMinusBeginningGaps) * charWidth;

        if (getGaps(baseIndex - 1).gapsBefore !== getGaps(baseIndex).gapsBefore) {
          if (innerIndex === startBasePos) {
            ctx.moveTo(startXPosition + scalingFactor * (innerIndex - startBasePos), scaledHeight - trace[innerIndex]);
          }
          ctx.lineTo(startXPosition + scalingFactor * (innerIndex - startBasePos), scaledHeight - trace[innerIndex]);
        } else {
          startXPosition = (baseIndex + getGaps(baseIndex - 1).gapsBefore - gapsBeforeSequence) * charWidth;
          ctx.lineTo(startXPosition + scalingFactor * (innerIndex - startBasePos), scaledHeight - trace[innerIndex]);
        }
      }
    }
    ctx.strokeStyle = lineColor;
    ctx.stroke();
  };

  //   this.drawBases = function () {
  //       //ctx.font = "24px serif";
  //       for (let count = 0; count < traceData.baseCalls.length; count++) {
  //           const baseCall = traceData.baseCalls[count];
  //           switch(baseCall) {
  //               case "A":
  //                   ctx.fillStyle = colors.adenine;
  //                   break;
  //               case "T":
  //                   ctx.fillStyle = colors.thymine;
  //                   break;
  //               case "G":
  //                   ctx.fillStyle = colors.guanine;
  //                   break;
  //               case "C":
  //                   ctx.fillStyle = colors.cytosine;
  //                   break;
  //               default:
  //                   ctx.fillStyle = colors.other;
  //           }
  //           let positionToUse = count * charWidth

  //           ctx.fillText(baseCall, positionToUse, maxHeight - baseBuffer);
  //       }
  //   }

  this.drawQualityScoreHistogram = function () {
    var qualMax = Math.max.apply(Math, _toConsumableArray(traceData.qualNums));
    var scalePctQual = scaledHeight / qualMax;
    var gapsBeforeSequence = getGaps(0).gapsBefore;
    for (var count = 0; count < traceData.qualNums.length; count++) {
      var gapsBeforeMinusBeginningGaps = getGaps(count).gapsBefore - gapsBeforeSequence;
      ctx.rect((count + gapsBeforeMinusBeginningGaps) * charWidth, scaledHeight - traceData.qualNums[count] * scalePctQual, charWidth, traceData.qualNums[count] * scalePctQual);
    }
    ctx.fillStyle = "#f4f1fa";
    ctx.fill();
    ctx.strokeStyle = "#e9e3f4";
    ctx.stroke();
  };

  this.paintCanvas = function () {
    this.drawQualityScoreHistogram();
    this.preparePeaks();
    this.drawPeaks(formattedPeaks.a, colors.adenine);
    this.drawPeaks(formattedPeaks.t, colors.thymine);
    this.drawPeaks(formattedPeaks.g, colors.guanine);
    this.drawPeaks(formattedPeaks.c, colors.cytosine);
    // this.drawBases();
    ctx.closePath();
  };
}

// componentDidMount() {
//   const painter = new drawTrace(ab1Parsed)
//   painter.paintCanvas()
// }

module.exports = exports["default"];