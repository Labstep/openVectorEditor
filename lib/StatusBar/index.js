"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.StatusBar = StatusBar;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@blueprintjs/core");

var _withEditorProps = require("../withEditorProps");

require("./style.css");

var _recompose = require("recompose");

var _proteinUtils = require("../utils/proteinUtils");

var _editorUtils = require("../utils/editorUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditReadOnlyItem = (0, _withEditorProps.connectToEditor)(function (_ref) {
  var readOnly = _ref.readOnly;
  return {
    readOnly: readOnly
  };
})(function (_ref2) {
  var onSave = _ref2.onSave,
      readOnly = _ref2.readOnly,
      showReadOnly = _ref2.showReadOnly,
      disableSetReadOnly = _ref2.disableSetReadOnly,
      updateReadOnlyMode = _ref2.updateReadOnlyMode;

  return showReadOnly ? _react2.default.createElement(
    StatusBarItem,
    { dataTest: "veStatusBar-readOnly" },
    onSave ? _react2.default.createElement(_core.HTMLSelect, {
      options: [{ label: "Read Only", value: "readOnly" }, { label: "Editable", value: "editable" }],
      disabled: disableSetReadOnly || !onSave //the !onSave here is redundant
      , className: _core.Classes.MINIMAL,
      value: readOnly ? "readOnly" : "editable",
      onChange: function onChange(_ref3) {
        var value = _ref3.target.value;

        updateReadOnlyMode(value === "readOnly");
      }
    }) : readOnly ? "Read Only" : "Editable"
  ) : null;
});

var ShowSelectionItem = (0, _recompose.compose)((0, _withEditorProps.connectToEditor)(function (_ref4) {
  var selectionLayer = _ref4.selectionLayer,
      caretPosition = _ref4.caretPosition,
      _ref4$sequenceData = _ref4.sequenceData,
      sequenceData = _ref4$sequenceData === undefined ? { sequence: "" } : _ref4$sequenceData;
  return {
    selectionLayer: selectionLayer,
    isProtein: sequenceData.isProtein,
    caretPosition: caretPosition,
    sequenceLength: sequenceData.sequence.length,
    sequenceData: sequenceData
  };
}), (0, _recompose.withHandlers)({ handleInverse: _withEditorProps.handleInverse }))(function (_ref5) {
  var _ref5$selectionLayer = _ref5.selectionLayer,
      selectionLayer = _ref5$selectionLayer === undefined ? { start: -1, end: -1 } : _ref5$selectionLayer,
      _ref5$caretPosition = _ref5.caretPosition,
      caretPosition = _ref5$caretPosition === undefined ? -1 : _ref5$caretPosition,
      _ref5$sequenceLength = _ref5.sequenceLength,
      sequenceLength = _ref5$sequenceLength === undefined ? 0 : _ref5$sequenceLength,
      isProtein = _ref5.isProtein,
      _ref5$sequenceData = _ref5.sequenceData,
      sequenceData = _ref5$sequenceData === undefined ? { sequence: "" } : _ref5$sequenceData,
      showGCContent = _ref5.showGCContent,
      GCDecimalDigits = _ref5.GCDecimalDigits,
      handleInverse = _ref5.handleInverse;

  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      StatusBarItem,
      { dataTest: "veStatusBar-selection" },
      (0, _editorUtils.getSelectionMessage)({
        caretPosition: caretPosition,
        selectionLayer: selectionLayer,
        sequenceLength: sequenceLength,
        sequenceData: sequenceData,
        showGCContent: showGCContent,
        GCDecimalDigits: GCDecimalDigits,
        isProtein: isProtein
      }),
      _react2.default.createElement(
        _core.Button,
        {
          minimal: true,
          disabled: sequenceLength <= 0,
          onClick: handleInverse,
          style: { marginLeft: 5, color: "#48AFF0" },
          small: true
        },
        "Select Inverse"
      )
    )
  );
});

var ShowLengthItem = (0, _withEditorProps.connectToEditor)(function (_ref6) {
  var _ref6$sequenceData = _ref6.sequenceData,
      sequenceData = _ref6$sequenceData === undefined ? { sequence: "" } : _ref6$sequenceData;
  return {
    sequenceLength: sequenceData.sequence.length
  };
})(function (_ref7) {
  var isProtein = _ref7.isProtein,
      _ref7$sequenceLength = _ref7.sequenceLength,
      sequenceLength = _ref7$sequenceLength === undefined ? 0 : _ref7$sequenceLength;
  return _react2.default.createElement(
    StatusBarItem,
    { dataTest: "veStatusBar-length" },
    "Length: " + (0, _proteinUtils.divideBy3)(sequenceLength, isProtein) + " " + (isProtein ? "AAs" : "bps")
  );
});

var EditCircularityItem = (0, _recompose.compose)((0, _withEditorProps.connectToEditor)(function (_ref8) {
  var readOnly = _ref8.readOnly,
      sequenceData = _ref8.sequenceData,
      _ref8$sequenceData = _ref8.sequenceData;
  _ref8$sequenceData = _ref8$sequenceData === undefined ? {} : _ref8$sequenceData;
  var circular = _ref8$sequenceData.circular;
  return {
    readOnly: readOnly,
    sequenceData: sequenceData,
    circular: circular
  };
}), (0, _recompose.withHandlers)({ updateCircular: _withEditorProps.updateCircular }))(function (_ref9) {
  var readOnly = _ref9.readOnly,
      showCircularity = _ref9.showCircularity,
      circular = _ref9.circular,
      updateCircular = _ref9.updateCircular;

  return showCircularity ? _react2.default.createElement(
    StatusBarItem,
    { dataTest: "veStatusBar-circularity" },
    readOnly ? circular ? "Circular" : "Linear" : _react2.default.createElement(_core.HTMLSelect, {
      onChange: function onChange(_ref10) {
        var value = _ref10.target.value;

        updateCircular(value === "circular");
      },
      className: _core.Classes.MINIMAL,
      value: circular ? "circular" : "linear",
      options: [{ label: "Circular", value: "circular" }, { label: "Linear", value: "linear" }]
    })
  ) : null;
});
var EditAvailabilityItem = (0, _withEditorProps.connectToEditor)(function (_ref11) {
  var readOnly = _ref11.readOnly,
      _ref11$sequenceData = _ref11.sequenceData;
  _ref11$sequenceData = _ref11$sequenceData === undefined ? {} : _ref11$sequenceData;
  var materiallyAvailable = _ref11$sequenceData.materiallyAvailable;
  return {
    readOnly: readOnly,
    materiallyAvailable: materiallyAvailable
  };
})(function (_ref12) {
  var readOnly = _ref12.readOnly,
      showAvailability = _ref12.showAvailability,
      materiallyAvailable = _ref12.materiallyAvailable,
      updateAvailability = _ref12.updateAvailability;

  return showAvailability ? _react2.default.createElement(
    StatusBarItem,
    null,
    readOnly ? materiallyAvailable ? "Available" : "Unavailable" : _react2.default.createElement(_core.HTMLSelect, {
      onChange: function onChange(_ref13) {
        var value = _ref13.target.value;

        updateAvailability(value === "available");
      },
      className: _core.Classes.MINIMAL,
      value: materiallyAvailable ? "available" : "unavailable",
      options: [{ label: "Available", value: "available" }, { label: "Unavailable", value: "unavailable" }]
    })
  ) : null;
});

function StatusBar(_ref14) {
  var disableSetReadOnly = _ref14.disableSetReadOnly,
      onSave = _ref14.onSave,
      editorName = _ref14.editorName,
      _ref14$showCircularit = _ref14.showCircularity,
      showCircularity = _ref14$showCircularit === undefined ? true : _ref14$showCircularit,
      _ref14$showReadOnly = _ref14.showReadOnly,
      showReadOnly = _ref14$showReadOnly === undefined ? true : _ref14$showReadOnly,
      _ref14$showAvailabili = _ref14.showAvailability,
      showAvailability = _ref14$showAvailabili === undefined ? false : _ref14$showAvailabili,
      _ref14$showGCContent = _ref14.showGCContent,
      showGCContent = _ref14$showGCContent === undefined ? false : _ref14$showGCContent,
      onSelectionOrCaretChanged = _ref14.onSelectionOrCaretChanged,
      _ref14$GCDecimalDigit = _ref14.GCDecimalDigits,
      GCDecimalDigits = _ref14$GCDecimalDigit === undefined ? 1 : _ref14$GCDecimalDigit,
      isProtein = _ref14.isProtein;

  return _react2.default.createElement(
    "div",
    { className: "veStatusBar" },
    _react2.default.createElement(EditReadOnlyItem, _extends({
      editorName: editorName
    }, {
      onSave: onSave,
      disableSetReadOnly: disableSetReadOnly,
      showReadOnly: showReadOnly
    })),
    _react2.default.createElement(EditCircularityItem, {
      editorName: editorName,
      showCircularity: showCircularity
    }),
    _react2.default.createElement(EditAvailabilityItem, {
      editorName: editorName,
      showAvailability: showAvailability
    }),
    _react2.default.createElement(ShowSelectionItem, {
      editorName: editorName,
      isProtein: isProtein,
      showGCContent: showGCContent,
      onSelectionOrCaretChanged: onSelectionOrCaretChanged,
      GCDecimalDigits: GCDecimalDigits
    }),
    _react2.default.createElement(ShowLengthItem, { isProtein: isProtein, editorName: editorName })
  );
}

function StatusBarItem(_ref15) {
  var children = _ref15.children,
      dataTest = _ref15.dataTest;

  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      "div",
      { "data-test": dataTest, className: "veStatusBarItem" },
      children
    ),
    _react2.default.createElement("div", { className: "veStatusBarSpacer" })
  );
}

exports.default = StatusBar;