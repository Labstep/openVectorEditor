"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _teselagenReactComponents = require("teselagen-react-components");

var _lodash = require("lodash");

var _veRangeUtils = require("ve-range-utils");

var _orfFrameToColorMap = require("../../constants/orfFrameToColorMap");

var _withEditorProps = require("../../withEditorProps");

var _recompose = require("recompose");

var _selectors = require("../../selectors");

var _selectors2 = _interopRequireDefault(_selectors);

var _commands = require("../../commands");

var _commands2 = _interopRequireDefault(_commands);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { Button } from "@blueprintjs/core";


var OrfProperties = function (_React$Component) {
  _inherits(OrfProperties, _React$Component);

  function OrfProperties(props) {
    _classCallCheck(this, OrfProperties);

    var _this = _possibleConstructorReturn(this, (OrfProperties.__proto__ || Object.getPrototypeOf(OrfProperties)).call(this, props));

    _this.onRowSelect = function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          record = _ref2[0];

      if (!record) return;
      var _this$props = _this.props,
          dispatch = _this$props.dispatch,
          editorName = _this$props.editorName;

      dispatch({
        type: "SELECTION_LAYER_UPDATE",
        payload: record,
        meta: {
          editorName: editorName
        }
      });
    };

    _this.commands = (0, _commands2.default)(_this);
    return _this;
  }

  _createClass(OrfProperties, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          orfs = _props.orfs,
          sequenceLength = _props.sequenceLength,
          annotationVisibility = _props.annotationVisibility;

      var orfsToUse = (0, _lodash.map)(orfs, function (orf) {
        return _extends({}, orf, {
          color: (0, _orfFrameToColorMap.getOrfColor)(orf),
          frame: orf.frame + 1
        }, orf.strand === undefined && {
          strand: orf.forward ? 1 : -1
        }, {
          size: (0, _veRangeUtils.getRangeLength)(orf, sequenceLength),
          sizeAa: Math.floor((0, _veRangeUtils.getRangeLength)(orf, sequenceLength) / 3)
        });
      });
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(_teselagenReactComponents.DataTable, {
          topLeftItems: _react2.default.createElement(_teselagenReactComponents.CmdCheckbox, { prefix: "Show ", cmd: this.commands.toggleOrfs }),
          annotationVisibility: annotationVisibility //we need to pass this in order to force the DT to rerender
          , noPadding: true,
          noFullscreenButton: true,
          onRowSelect: this.onRowSelect,
          withSearch: false,
          maxHeight: 400,
          formName: "orfProperties",
          noRouter: true,
          compact: true,
          isInfinite: true,
          schema: {
            fields: [{
              path: "color",
              type: "string",
              render: function render(color) {
                return _react2.default.createElement("div", { style: { height: 20, width: 20, background: color } });
              }
            }, {
              path: "sizeAa",
              displayName: "Size (aa)",
              type: "string"
            }, _utils.sizeSchema, { path: "frame", type: "number" }, { path: "strand", type: "number" }]
          },
          entities: orfsToUse
        }),
        _react2.default.createElement("br", null),
        _react2.default.createElement(_teselagenReactComponents.CmdCheckbox, { prefix: "Show ", cmd: this.commands.toggleOrfTranslations }),
        _react2.default.createElement(_teselagenReactComponents.CmdCheckbox, { cmd: this.commands.useGtgAndCtgAsStartCodons }),
        _react2.default.createElement(_teselagenReactComponents.CmdDiv, { cmd: this.commands.minOrfSizeCmd })
      );
    }
  }]);

  return OrfProperties;
}(_react2.default.Component);

exports.default = (0, _recompose.compose)((0, _withEditorProps.connectToEditor)(function (editorState) {
  var readOnly = editorState.readOnly,
      _editorState$annotati = editorState.annotationVisibility,
      annotationVisibility = _editorState$annotati === undefined ? {} : _editorState$annotati,
      _editorState$sequence = editorState.sequenceData;
  _editorState$sequence = _editorState$sequence === undefined ? {} : _editorState$sequence;
  var _editorState$sequence2 = _editorState$sequence.sequence,
      sequence = _editorState$sequence2 === undefined ? "" : _editorState$sequence2,
      sequenceData = editorState.sequenceData,
      minimumOrfSize = editorState.minimumOrfSize;

  return {
    readOnly: readOnly,
    annotationVisibility: annotationVisibility,
    orfs: _selectors2.default.orfsSelector(editorState),
    sequenceLength: sequence.length,
    sequenceData: sequenceData,
    minimumOrfSize: minimumOrfSize
  };
}), (0, _teselagenReactComponents.withSelectedEntities)("orfProperties"))(OrfProperties);
module.exports = exports["default"];