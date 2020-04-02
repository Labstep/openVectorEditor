"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DigestTool = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _recompose = require("recompose");

var _veRangeUtils = require("ve-range-utils");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _teselagenReactComponents = require("teselagen-react-components");

var _veSequenceUtils = require("ve-sequence-utils");

var _CutsiteFilter = require("../CutsiteFilter");

var _CutsiteFilter2 = _interopRequireDefault(_CutsiteFilter);

var _Ladder = require("./Ladder");

var _Ladder2 = _interopRequireDefault(_Ladder);

var _core = require("@blueprintjs/core");

var _withEditorInteractions = require("../withEditorInteractions");

var _withEditorInteractions2 = _interopRequireDefault(_withEditorInteractions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import uniqid from "uniqid";
// import Ladder from "./Ladder";

// import selectionLayer from "../redux/selectionLayer";

// import getCutsiteType from "./getCutsiteType";


var MAX_DIGEST_CUTSITES = 50;
var MAX_PARTIAL_DIGEST_CUTSITES = 10;

var DigestTool = exports.DigestTool = function (_React$Component) {
  _inherits(DigestTool, _React$Component);

  function DigestTool() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DigestTool);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DigestTool.__proto__ || Object.getPrototypeOf(DigestTool)).call.apply(_ref, [this].concat(args))), _this), _this.state = { selectedTab: "virtualDigest" }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DigestTool, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          editorName = _props.editorName,
          _props$dimensions = _props.dimensions,
          dimensions = _props$dimensions === undefined ? {} : _props$dimensions,
          lanes = _props.lanes,
          _props$digestTool = _props.digestTool,
          selectedFragment = _props$digestTool.selectedFragment,
          computePartialDigest = _props$digestTool.computePartialDigest,
          onDigestSave = _props.onDigestSave,
          computePartialDigestDisabled = _props.computePartialDigestDisabled,
          computeDigestDisabled = _props.computeDigestDisabled,
          updateComputePartialDigest = _props.updateComputePartialDigest;
      var selectedTab = this.state.selectedTab;

      return _react2.default.createElement(
        "div",
        {
          style: {
            height: typeof dimensions.height === "string" ? 100 : dimensions.height,
            overflowY: "auto",
            padding: 10
          }
        },
        onDigestSave && _react2.default.createElement(
          "div",
          { style: { display: "flex", marginBottom: 10 } },
          _react2.default.createElement(_core.InputGroup, { placeholder: "My Digest" }),
          _react2.default.createElement(
            _core.Button,
            {
              intent: _core.Intent.PRIMARY,
              onClick: function onClick() {
                onDigestSave({});
              },
              style: { marginLeft: 5 }
            },
            " ",
            "Save"
          )
        ),
        _react2.default.createElement(_core.Checkbox, {
          onChange: function onChange() {
            updateComputePartialDigest(!computePartialDigest);
          },
          checked: computePartialDigest,
          label: _react2.default.createElement(
            "span",
            null,
            "Show Partial Digests",
            " ",
            computePartialDigestDisabled ? _react2.default.createElement(
              "span",
              { style: { fontSize: 10 } },
              " ",
              "-- Disabled (only supports ",
              MAX_PARTIAL_DIGEST_CUTSITES,
              " or fewer cutsites)",
              " "
            ) : null
          ),
          disabled: computePartialDigestDisabled
        }),
        "Choose your enzymes:",
        _react2.default.createElement(_CutsiteFilter2.default, { editorName: editorName }),
        _react2.default.createElement("br", null),
        computeDigestDisabled && _react2.default.createElement(
          "div",
          {
            style: {
              color: "red",
              marginBottom: "6px",
              fontSize: "15px"
            }
          },
          ">",
          MAX_DIGEST_CUTSITES,
          " cutsites detected. Filter out additional restriction enzymes to visualize digest results"
        ),
        _react2.default.createElement(
          _core.Tabs,
          {
            selectedTabId: selectedTab,
            onChange: function onChange(id) {
              _this2.setState({ selectedTab: id });
            }
          },
          _react2.default.createElement(_core.Tab, {
            title: "Virtual Digest",
            id: "virtualDigest",
            panel: _react2.default.createElement(_Ladder2.default, _extends({}, this.props, { editorName: editorName }))
          }),
          _react2.default.createElement(_core.Tab, {
            title: "Digest Info",
            id: "table",
            panel: _react2.default.createElement(_teselagenReactComponents.DataTable, {
              noRouter: true,
              isSimple: true,
              maxHeight: 400
              // noFooter
              , withSearch: false,
              onSingleRowSelect: function onSingleRowSelect(_ref2) {
                var onFragmentSelect = _ref2.onFragmentSelect;

                onFragmentSelect();
              },
              reduxFormSelectedEntityIdMap: {
                input: {
                  value: _defineProperty({}, selectedFragment, true),
                  onChange: function onChange() {}
                }
              },
              formName: "digestInfoTable",
              entities: lanes[0].map(function (_ref3) {
                var id = _ref3.id,
                    cut1 = _ref3.cut1,
                    cut2 = _ref3.cut2,
                    start = _ref3.start,
                    end = _ref3.end,
                    size = _ref3.size,
                    rest = _objectWithoutProperties(_ref3, ["id", "cut1", "cut2", "start", "end", "size"]);

                return _extends({}, rest, {
                  id: id,
                  start: start,
                  end: end,
                  length: size,
                  leftCutter: cut1.restrictionEnzyme.name,
                  rightCutter: cut2.restrictionEnzyme.name,
                  leftOverhang: (0, _veSequenceUtils.getCutsiteType)(cut1.restrictionEnzyme),
                  rightOverhang: (0, _veSequenceUtils.getCutsiteType)(cut2.restrictionEnzyme)
                });
              }),
              schema: schema
            })
          })
        ),
        _react2.default.createElement("br", null)
      );
    }
  }]);

  return DigestTool;
}(_react2.default.Component);

var schema = {
  fields: [{ width: 60, path: "start", displayName: "Start", type: "string" }, { width: 60, path: "end", displayName: "End", type: "string" }, { width: 70, path: "length", displayName: "Length", type: "string" }, { path: "leftCutter", displayName: "Left Cutter", type: "string" }, { path: "leftOverhang", displayName: "Left Overhang", type: "string" }, { path: "rightCutter", displayName: "Right Cutter", type: "string" }, { path: "rightOverhang", displayName: "Right Overhang", type: "string" }]
};

exports.default = (0, _recompose.compose)(_withEditorInteractions2.default, (0, _recompose.withProps)(function (props) {
  var sequenceData = props.sequenceData,
      sequenceLength = props.sequenceLength,
      selectionLayerUpdate = props.selectionLayerUpdate,
      updateSelectedFragment = props.updateSelectedFragment,
      computePartialDigest = props.digestTool.computePartialDigest;

  var fragments = [];
  var overlappingEnzymes = [];
  var pairs = [];
  var computePartialDigestDisabled = sequenceData.cutsites.length > MAX_PARTIAL_DIGEST_CUTSITES;
  var computeDigestDisabled = sequenceData.cutsites.length > MAX_DIGEST_CUTSITES;
  var sortedCutsites = sequenceData.cutsites.sort(function (a, b) {
    return a.topSnipPosition - b.topSnipPosition;
  });

  sortedCutsites.forEach(function (cutsite1, index) {
    if (computePartialDigest && !computePartialDigestDisabled) {
      sortedCutsites.forEach(function (cs, index2) {
        if (index2 === index + 1 || index2 === 0) {
          return;
        }
        pairs.push([cutsite1, sortedCutsites[index2]]);
      });
    }
    if (!computeDigestDisabled) {
      pairs.push([cutsite1, sortedCutsites[index + 1] ? sortedCutsites[index + 1] : sortedCutsites[0]]);
    }
  });

  pairs.forEach(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        cut1 = _ref5[0],
        cut2 = _ref5[1];

    var start = (0, _veRangeUtils.normalizePositionByRangeLength)(cut1.topSnipPosition, sequenceLength);
    var end = (0, _veRangeUtils.normalizePositionByRangeLength)(cut2.topSnipPosition - 1, sequenceLength);
    var size = (0, _veRangeUtils.getRangeLength)({ start: start, end: end }, sequenceLength);

    // const id = uniqid()
    var id = start + "-" + end + "-" + size + "-";
    var name = cut1.restrictionEnzyme.name + " -- " + cut2.restrictionEnzyme.name + " " + size + " bps";
    (0, _veRangeUtils.getRangeLength)({ start: start, end: end }, sequenceLength);
    fragments.push({
      cut1: cut1,
      cut2: cut2,
      start: start,
      end: end,
      size: size,
      id: id,
      name: name,
      onFragmentSelect: function onFragmentSelect() {
        selectionLayerUpdate({
          start: start,
          end: end,
          name: name
        });
        updateSelectedFragment(id);
      }
    });
  });

  fragments.filter(function (fragment) {
    if (!fragment.size) {
      overlappingEnzymes.push(fragment);
      return false;
    }
    return true;
  });
  return {
    computePartialDigestDisabled: computePartialDigestDisabled,
    computeDigestDisabled: computeDigestDisabled,
    lanes: [fragments],
    overlappingEnzymes: overlappingEnzymes
  };
}))(DigestTool);