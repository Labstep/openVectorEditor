"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _teselagenReactComponents = require("teselagen-react-components");

require("./Ladder.css");

var _core = require("@blueprintjs/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/jsx-no-bind */


var Ladder = function (_React$Component) {
  _inherits(Ladder, _React$Component);

  function Ladder(props) {
    _classCallCheck(this, Ladder);

    var _this = _possibleConstructorReturn(this, (Ladder.__proto__ || Object.getPrototypeOf(Ladder)).call(this, props));

    _this.state = { highlightedFragment: undefined };
    return _this;
  }

  _createClass(Ladder, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$boxHeight = _props.boxHeight,
          boxHeight = _props$boxHeight === undefined ? 550 : _props$boxHeight,
          _props$lanes = _props.lanes,
          lanes = _props$lanes === undefined ? [] : _props$lanes,
          digestLaneRightClicked = _props.digestLaneRightClicked,
          selectedFragment = _props.selectedFragment,
          _props$selectedLadder = _props.selectedLadder,
          selectedLadder = _props$selectedLadder === undefined ? "geneRuler1KB" : _props$selectedLadder,
          _props$ladders = _props.ladders,
          ladders = _props$ladders === undefined ? [{
        value: "geneRuler1KB",
        label: "GeneRuler 1kb + DNA 75-20,000 bp",
        markings: [20000, 10000, 7000, 5000, 4000, 3000, 2000, 1500, 1000, 700, 500, 400, 300, 200, 75]
      }, {
        value: "geneRuler100BP",
        label: "GeneRuler 100bp + DNA 100-3000 bp",
        markings: [3000, 2000, 1500, 1200, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100]
      }, {
        value: "geneRuler100LowRange",
        label: "GeneRuler 100bp + DNA 100-3000 bp"
      }] : _props$ladders;
      var highlightedFragment = this.state.highlightedFragment;

      var ladderInfo = void 0;
      ladders.forEach(function (ladder) {
        if (ladder.value === selectedLadder) ladderInfo = _extends({}, ladder, {
          markings: ladder.markings.sort(function (a, b) {
            return b - a;
          })
        });
      });
      if (!ladderInfo) {
        return console.error("Uh oh there needs to be ladder info here!");
      }

      var upperBoundary = ladderInfo.markings[0];
      return _react2.default.createElement(
        "div",
        null,
        "Ladder:",
        _react2.default.createElement(_teselagenReactComponents.TgSelect, {
          value: selectedLadder,
          onChange: this.handleChange,
          options: ladders
        }),
        _react2.default.createElement("br", null),
        _react2.default.createElement(
          "div",
          {
            style: { width: "fit-content", color: "white", background: "black" }
          },
          _react2.default.createElement(
            "div",
            { style: { padding: 3, paddingLeft: 7, width: 290 } },
            "Highlighted Fragment:",
            " ",
            highlightedFragment ? highlightedFragment.size : "--",
            " "
          ),
          _react2.default.createElement(
            "div",
            { style: { height: boxHeight }, className: "ve-digest-container" },
            _react2.default.createElement(
              "div",
              {
                style: { width: 100 },
                className: "ve-digest-column ve-digest-ladder"
              },
              _react2.default.createElement(
                "div",
                { className: "ve-digest-header" },
                " "
              ),
              ladderInfo.markings.map(function (val, index) {
                return _react2.default.createElement(
                  "div",
                  {
                    key: index,
                    style: {
                      fontSize: 12,
                      position: "absolute",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                      bottom: calculateOffset(boxHeight, val, upperBoundary) - 3 //subtract 3 to get the labels to align better
                    }
                  },
                  _react2.default.createElement(
                    "span",
                    {
                      style: {
                        color: "white",
                        paddingLeft: 6,
                        paddingRight: 4
                      }
                    },
                    val,
                    " "
                  ),
                  _react2.default.createElement(
                    "span",
                    { style: { color: "white", paddingRight: 4 } },
                    " ",
                    "bp",
                    " "
                  )
                );
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "ve-digest-column ve-digest-ladder" },
              _react2.default.createElement(
                "div",
                { className: "ve-digest-header" },
                "Ladder "
              ),
              ladderInfo.markings.map(function (val, index) {
                return _react2.default.createElement("div", {
                  key: index,
                  style: {
                    fontSize: 12,
                    position: "absolute",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    height: "2px",
                    background: "white",
                    bottom: calculateOffset(boxHeight, val, upperBoundary)
                  }
                });
              })
            ),
            lanes.map(function (fragments, index) {
              return _react2.default.createElement(Lane, _extends({
                key: index
              }, {
                onMouseOver: function onMouseOver(fragment) {
                  _this2.setState({
                    highlightedFragment: fragment
                  });
                },
                onMouseOut: function onMouseOut() {
                  _this2.setState({
                    highlightedFragment: undefined
                  });
                },
                digestLaneRightClicked: digestLaneRightClicked,
                laneNumber: index + 1,
                fragments: fragments,
                highlightedFragment: highlightedFragment,
                selectedFragment: selectedFragment,
                boxHeight: boxHeight,
                upperBoundary: upperBoundary
              }));
            })
          )
        )
      );
    }
  }]);

  return Ladder;
}(_react2.default.Component);

exports.default = Ladder;


function Lane(_ref) {
  var laneNumber = _ref.laneNumber,
      _onMouseOver = _ref.onMouseOver,
      _onMouseOut = _ref.onMouseOut,
      digestLaneRightClicked = _ref.digestLaneRightClicked,
      fragments = _ref.fragments,
      highlightedFragment = _ref.highlightedFragment,
      selectedFragment = _ref.selectedFragment,
      boxHeight = _ref.boxHeight,
      upperBoundary = _ref.upperBoundary;

  return _react2.default.createElement(
    "div",
    {
      style: { marginLeft: 20, marginRight: 20 },
      className: "ve-digest-column ve-digest-lane"
    },
    _react2.default.createElement(
      "div",
      { className: "ve-digest-header" },
      "Lane ",
      laneNumber,
      " "
    ),
    fragments.map(function (fragment, index) {
      var size = fragment.size,
          id = fragment.id,
          name = fragment.name;

      var isHighlighted = highlightedFragment && id === highlightedFragment.id || selectedFragment && id === highlightedFragment.id;
      return _react2.default.createElement(
        "div",
        {
          key: index,
          onMouseOver: function onMouseOver() {
            _onMouseOver(fragment);
          },
          onMouseOut: function onMouseOut() {
            _onMouseOut(fragment);
          },
          onClick: function onClick() {
            fragment.onFragmentSelect();
          },
          onContextMenu: function onContextMenu(e) {
            fragment.onFragmentSelect();
            digestLaneRightClicked(e);
          },
          "data-test": name,
          style: {
            fontSize: 12,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            color: isHighlighted ? "#fdffdd" : "white",
            width: "90%",
            height: isHighlighted ? "3px" : "2px",
            background: "white",
            bottom: calculateOffset(boxHeight, size, upperBoundary)
          }
        },
        _react2.default.createElement(
          _core.Tooltip,
          {
            className: "ve-digest-fragment-tooltip",
            content: _react2.default.createElement(
              "div",
              null,
              name
            )
          },
          _react2.default.createElement("div", {
            style: {
              width: "100%",
              height: isHighlighted ? "3px" : "2px"
            }
          })
        )
      );
    })
  );
}

function calculateOffset(boxHeight, size, upperBoundary) {
  return boxHeight * Math.log(size) / Math.log(upperBoundary) - 55;
}
module.exports = exports["default"];