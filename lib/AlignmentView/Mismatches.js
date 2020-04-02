"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _teselagenReactComponents = require("teselagen-react-components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mismatches = function (_React$Component) {
  _inherits(Mismatches, _React$Component);

  function Mismatches() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Mismatches);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mismatches.__proto__ || Object.getPrototypeOf(Mismatches)).call.apply(_ref, [this].concat(args))), _this), _this.getGapMap = function (sequence) {
      var gapMap = [0]; //a map of position to how many gaps come before that position [0,0,0,5,5,5,5,17,17,17, ]
      sequence.split("").forEach(function (char) {
        if (char === "-") {
          gapMap[Math.max(0, gapMap.length - 1)] = (gapMap[Math.max(0, gapMap.length - 1)] || 0) + 1;
        } else {
          gapMap.push(gapMap[gapMap.length - 1] || 0);
        }
      });
      return gapMap;
    }, _this.getMismatchList = function (alignmentData, mismatches) {
      // getMismatchList = (alignmentId, alignments) => {
      // let mismatchListAll = [];
      // skip first sequence/ref seq, since there will be no mismatches
      // for (let trackI = 1; trackI < alignments[alignmentId].alignmentTracks.length; trackI++) {
      var mismatchList = [];
      var trackName = alignmentData.name;
      var editedTrackName = trackName.slice(trackName.indexOf("_") + 1);

      var getGaps = function getGaps() {
        return {
          gapsBefore: 0,
          gapsInside: 0
        };
      };
      var gapMap = _this.getGapMap(alignmentData.sequence);
      getGaps = function getGaps(rangeOrCaretPosition) {
        if ((typeof rangeOrCaretPosition === "undefined" ? "undefined" : _typeof(rangeOrCaretPosition)) !== "object") {
          return {
            gapsBefore: gapMap[Math.min(rangeOrCaretPosition, gapMap.length - 1)]
          };
        }
        var start = rangeOrCaretPosition.start,
            end = rangeOrCaretPosition.end;

        var toReturn = {
          gapsBefore: gapMap[start],
          gapsInside: gapMap[Math.min(end, gapMap.length - 1)] - gapMap[Math.min(start, gapMap.length - 1)]
        };
        return toReturn;
      };

      var gapsBeforeSequence = getGaps(0).gapsBefore;
      for (var mismatchI = 0; mismatchI < mismatches.length; mismatchI++) {
        var mismatchEnd = mismatches[mismatchI].end;
        var mismatchStart = mismatches[mismatchI].start;
        var mismatchDifference = mismatchEnd - mismatchStart;
        // display 'position' as 1-based but store 'start' & 'end' as 0-based
        if (mismatchDifference === 0) {
          mismatchList.push({
            mismatches: mismatchStart + 1 - gapsBeforeSequence,
            start: mismatchStart - gapsBeforeSequence,
            end: mismatchStart - gapsBeforeSequence
          });
        } else {
          for (var innerI = 0; innerI <= mismatchDifference; innerI++) {
            mismatchList.push({
              mismatches: mismatchStart + innerI + 1 - gapsBeforeSequence,
              start: mismatchStart + innerI - gapsBeforeSequence,
              end: mismatchStart + innerI - gapsBeforeSequence
            });
          }
        }
      }
      return mismatchList;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Mismatches, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      var _props = this.props,
          alignmentData = _props.alignmentData,
          mismatches = _props.mismatches;
      // const { alignmentId, alignments } = this.props;

      var mismatchList = this.getMismatchList(alignmentData, mismatches);
      // const mismatchListAll = this.getMismatchList(alignmentId, alignments);
      var schema = {
        fields: [{ path: "mismatches", type: "number" }]
      };
      this.setState({ mismatchList: mismatchList, schema: schema });
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          mismatchList = _state.mismatchList,
          schema = _state.schema;

      var tableOfMismatches = void 0;
      if (mismatchList.length === 0) {
        tableOfMismatches = null;
      } else {
        tableOfMismatches = _react2.default.createElement(_teselagenReactComponents.DataTable, {
          maxHeight: 168,
          formName: "mismatchesTable",
          isSimple: true,
          compact: true,
          noRouter: true
          // onRowSelect={this.handleMismatchClick}
          , schema: schema,
          entities: mismatchList
        });
      }

      return _react2.default.createElement(
        "div",
        { style: { maxHeight: 180.8, overflowY: "scroll" } },
        _react2.default.createElement(
          "div",
          {
            style: {
              // margin: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }
          },
          _react2.default.createElement(
            "div",
            { style: { width: 100, margin: 4 } },
            tableOfMismatches
          )
        )
      );
    }
  }]);

  return Mismatches;
}(_react2.default.Component);

exports.default = (0, _teselagenReactComponents.withSelectedEntities)("mismatchesTable")(Mismatches);
module.exports = exports["default"];