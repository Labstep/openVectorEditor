"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NonReduxEnhancedLinearView = exports.LinearView = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _draggableClassnames = require("../constants/draggableClassnames");

var _draggableClassnames2 = _interopRequireDefault(_draggableClassnames);

var _prepareRowData = require("../utils/prepareRowData");

var _prepareRowData2 = _interopRequireDefault(_prepareRowData);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDraggable = require("react-draggable");

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _RowItem = require("../RowItem");

var _RowItem2 = _interopRequireDefault(_RowItem);

var _withEditorInteractions = require("../withEditorInteractions");

var _withEditorInteractions2 = _interopRequireDefault(_withEditorInteractions);

var _withEditorProps = require("../withEditorProps");

require("./style.css");

var _editorUtils = require("../utils/editorUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultMarginWidth = 10;

function noop() {}

var LinearView = exports.LinearView = function (_React$Component) {
  _inherits(LinearView, _React$Component);

  function LinearView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LinearView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LinearView.__proto__ || Object.getPrototypeOf(LinearView)).call.apply(_ref, [this].concat(args))), _this), _this.getMaxLength = function () {
      var _this$props = _this.props,
          _this$props$sequenceD = _this$props.sequenceData,
          sequenceData = _this$props$sequenceD === undefined ? { sequence: "" } : _this$props$sequenceD,
          alignmentData = _this$props.alignmentData;

      var data = alignmentData || sequenceData;
      return data.noSequence ? data.size : data.sequence.length;
    }, _this.getRowData = function () {
      var _this$props$sequenceD2 = _this.props.sequenceData,
          sequenceData = _this$props$sequenceD2 === undefined ? { sequence: "" } : _this$props$sequenceD2;

      if (!(0, _lodash.isEqual)(sequenceData, _this.oldSeqData)) {
        _this.rowData = (0, _prepareRowData2.default)(_extends({}, sequenceData, {
          features: sequenceData.filteredFeatures || sequenceData.features
        }), sequenceData.sequence ? sequenceData.sequence.length : 0);
        _this.oldSeqData = sequenceData;
      }
      return _this.rowData;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LinearView, [{
    key: "getNearestCursorPositionToMouseEvent",
    value: function getNearestCursorPositionToMouseEvent(rowData, event, callback) {
      //loop through all the rendered rows to see if the click event lands in one of them
      var nearestCaretPos = 0;
      var rowDomNode = this.linearView;
      var boundingRowRect = rowDomNode.getBoundingClientRect();
      var maxEnd = this.getMaxLength();
      if (event.clientX - boundingRowRect.left < 0) {
        nearestCaretPos = 0;
      } else {
        var clickXPositionRelativeToRowContainer = event.clientX - boundingRowRect.left;
        var numberOfBPsInFromRowStart = Math.floor((clickXPositionRelativeToRowContainer + this.charWidth / 2) / this.charWidth);
        nearestCaretPos = numberOfBPsInFromRowStart + 0;
        if (nearestCaretPos > maxEnd + 1) {
          nearestCaretPos = maxEnd + 1;
        }
      }
      if (this.props.sequenceData && this.props.sequenceData.isProtein) {
        nearestCaretPos = Math.round(nearestCaretPos / 3) * 3;
      }
      if (this.props.sequenceLength === 0) nearestCaretPos = 0;
      var callbackVals = {
        event: event,
        shiftHeld: event.shiftKey,
        nearestCaretPos: nearestCaretPos,
        caretGrabbed: event.target.className === "cursor",
        selectionStartGrabbed: event.target.classList.contains(_draggableClassnames2.default.selectionStart),
        selectionEndGrabbed: event.target.classList.contains(_draggableClassnames2.default.selectionEnd)
      };
      callback(callbackVals);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$sequenceData = _props.sequenceData,
          sequenceData = _props$sequenceData === undefined ? { sequence: "" } : _props$sequenceData,
          alignmentData = _props.alignmentData,
          _props$hideName = _props.hideName,
          hideName = _props$hideName === undefined ? false : _props$hideName,
          _props$editorDragged = _props.editorDragged,
          editorDragged = _props$editorDragged === undefined ? noop : _props$editorDragged,
          _props$editorDragStar = _props.editorDragStarted,
          editorDragStarted = _props$editorDragStar === undefined ? noop : _props$editorDragStar,
          _props$editorClicked = _props.editorClicked,
          editorClicked = _props$editorClicked === undefined ? noop : _props$editorClicked,
          _props$editorDragStop = _props.editorDragStopped,
          editorDragStopped = _props$editorDragStop === undefined ? noop : _props$editorDragStop,
          _props$width = _props.width,
          width = _props$width === undefined ? 400 : _props$width,
          tickSpacing = _props.tickSpacing,
          caretPosition = _props.caretPosition,
          _props$backgroundRigh = _props.backgroundRightClicked,
          backgroundRightClicked = _props$backgroundRigh === undefined ? noop : _props$backgroundRigh,
          _props$RowItemProps = _props.RowItemProps,
          RowItemProps = _props$RowItemProps === undefined ? {} : _props$RowItemProps,
          _props$marginWidth = _props.marginWidth,
          marginWidth = _props$marginWidth === undefined ? defaultMarginWidth : _props$marginWidth,
          height = _props.height,
          charWidth = _props.charWidth,
          annotationVisibilityOverrides = _props.annotationVisibilityOverrides,
          isProtein = _props.isProtein,
          rest = _objectWithoutProperties(_props, ["sequenceData", "alignmentData", "hideName", "editorDragged", "editorDragStarted", "editorClicked", "editorDragStopped", "width", "tickSpacing", "caretPosition", "backgroundRightClicked", "RowItemProps", "marginWidth", "height", "charWidth", "annotationVisibilityOverrides", "isProtein"]);

      var innerWidth = Math.max(width - marginWidth, 0);
      this.charWidth = charWidth || innerWidth / this.getMaxLength();
      var bpsPerRow = this.getMaxLength();
      var sequenceName = hideName ? "" : sequenceData.name || "";
      var rowData = this.getRowData();

      return _react2.default.createElement(
        _reactDraggable2.default
        // enableUserSelectHack={false} //needed to prevent the input bubble from losing focus post user drag
        ,
        { bounds: { top: 0, left: 0, right: 0, bottom: 0 },
          onDrag: function onDrag(event) {
            _this2.getNearestCursorPositionToMouseEvent(rowData, event, editorDragged);
          },
          onStart: function onStart(event) {
            _this2.getNearestCursorPositionToMouseEvent(rowData, event, editorDragStarted);
          },
          onStop: editorDragStopped
        },
        _react2.default.createElement(
          "div",
          {
            ref: function ref(_ref2) {
              return _this2.linearView = _ref2;
            },
            className: "veLinearView",
            style: _extends({
              width: width
            }, height && { height: height }, {
              paddingLeft: marginWidth / 2
            }),
            onContextMenu: function onContextMenu(event) {
              _this2.getNearestCursorPositionToMouseEvent(rowData, event, backgroundRightClicked);
            },
            onClick: function onClick(event) {
              _this2.getNearestCursorPositionToMouseEvent(rowData, event, editorClicked);
            }
          },
          !hideName && _react2.default.createElement(SequenceName, {
            isProtein: isProtein,
            sequenceName: sequenceName,
            sequenceLength: sequenceData.sequence ? sequenceData.sequence.length : 0
          }),
          _react2.default.createElement(_RowItem2.default, _extends({}, _extends({}, rest, {
            charWidth: charWidth,
            caretPosition: caretPosition,
            isProtein: sequenceData.isProtein,
            alignmentData: alignmentData,
            sequenceLength: this.getMaxLength(),
            width: innerWidth,
            bpsPerRow: bpsPerRow,
            emptyText: (0, _editorUtils.getEmptyText)({ sequenceData: sequenceData, caretPosition: caretPosition }),
            tickSpacing: tickSpacing || Math.floor(this.getMaxLength() / (sequenceData.isProtein ? 9 : 10)),
            annotationVisibility: _extends({}, rest.annotationVisibility, {
              // yellowAxis: true,
              translations: false,
              primaryProteinSequence: false,
              reverseSequence: false,
              sequence: false,
              cutsitesInSequence: false
            }, annotationVisibilityOverrides)
          }, RowItemProps), {
            row: rowData[0]
          }))
        )
      );
    }
  }]);

  return LinearView;
}(_react2.default.Component);

function SequenceName(_ref3) {
  var sequenceName = _ref3.sequenceName,
      sequenceLength = _ref3.sequenceLength,
      isProtein = _ref3.isProtein;

  return _react2.default.createElement(
    "div",
    { key: "circViewSvgCenterText", style: { textAlign: "center" } },
    _react2.default.createElement(
      "span",
      null,
      sequenceName,
      " "
    ),
    _react2.default.createElement("br", null),
    _react2.default.createElement(
      "span",
      null,
      isProtein ? Math.floor(sequenceLength / 3) + " AAs" : sequenceLength + " bps"
    )
  );
}

var NonReduxEnhancedLinearView = exports.NonReduxEnhancedLinearView = (0, _withEditorProps.withEditorPropsNoRedux)(LinearView);

exports.default = (0, _withEditorInteractions2.default)(LinearView);