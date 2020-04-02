"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOveHotkeyDefs = exports.AlignmentView = exports.EnzymeViewer = exports.PositionAnnotationOnCircle = exports.getRangeAnglesSpecial = exports.addAlignment = exports.updateEditor = exports.actions = exports.vectorEditorMiddleware = exports.vectorEditorReducer = exports.withHover = exports.DigestToolUnconnected = exports.DigestTool = exports.StatusBarUnconnected = exports.StatusBar = exports.LinearViewUnconnected = exports.LinearView = exports.CutsiteFilterUnconnected = exports.CutsiteFilter = exports.ToolBarUnconnected = exports.ToolBar = exports.EditorUnconnected = exports.Editor = exports.RowItemUnconnected = exports.RowItem = exports.RowViewUnconnected = exports.RowView = exports.SimpleCircularOrLinearView = exports.CircularViewUnconnected = exports.CircularView = exports.withEditorInteractions = exports.connectToEditor = exports.withEditorProps = undefined;

var _withEditorProps = require("./withEditorProps");

Object.defineProperty(exports, "withEditorProps", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withEditorProps).default;
  }
});
Object.defineProperty(exports, "connectToEditor", {
  enumerable: true,
  get: function get() {
    return _withEditorProps.connectToEditor;
  }
});

var _withEditorInteractions = require("./withEditorInteractions");

Object.defineProperty(exports, "withEditorInteractions", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withEditorInteractions).default;
  }
});

var _CircularView = require("./CircularView");

Object.defineProperty(exports, "CircularView", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CircularView).default;
  }
});
Object.defineProperty(exports, "CircularViewUnconnected", {
  enumerable: true,
  get: function get() {
    return _CircularView.CircularView;
  }
});

var _SimpleCircularOrLinearView = require("./SimpleCircularOrLinearView");

Object.defineProperty(exports, "SimpleCircularOrLinearView", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SimpleCircularOrLinearView).default;
  }
});

var _RowView = require("./RowView");

Object.defineProperty(exports, "RowView", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RowView).default;
  }
});
Object.defineProperty(exports, "RowViewUnconnected", {
  enumerable: true,
  get: function get() {
    return _RowView.RowView;
  }
});

var _RowItem = require("./RowItem");

Object.defineProperty(exports, "RowItem", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RowItem).default;
  }
});
Object.defineProperty(exports, "RowItemUnconnected", {
  enumerable: true,
  get: function get() {
    return _RowItem.RowItem;
  }
});

var _Editor = require("./Editor");

Object.defineProperty(exports, "Editor", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Editor).default;
  }
});
Object.defineProperty(exports, "EditorUnconnected", {
  enumerable: true,
  get: function get() {
    return _Editor.Editor;
  }
});

var _ToolBar = require("./ToolBar");

Object.defineProperty(exports, "ToolBar", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ToolBar).default;
  }
});
Object.defineProperty(exports, "ToolBarUnconnected", {
  enumerable: true,
  get: function get() {
    return _ToolBar.ToolBar;
  }
});

var _CutsiteFilter = require("./CutsiteFilter");

Object.defineProperty(exports, "CutsiteFilter", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CutsiteFilter).default;
  }
});
Object.defineProperty(exports, "CutsiteFilterUnconnected", {
  enumerable: true,
  get: function get() {
    return _CutsiteFilter.CutsiteFilter;
  }
});

var _LinearView = require("./LinearView");

Object.defineProperty(exports, "LinearView", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_LinearView).default;
  }
});
Object.defineProperty(exports, "LinearViewUnconnected", {
  enumerable: true,
  get: function get() {
    return _LinearView.LinearView;
  }
});

var _StatusBar = require("./StatusBar");

Object.defineProperty(exports, "StatusBar", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_StatusBar).default;
  }
});
Object.defineProperty(exports, "StatusBarUnconnected", {
  enumerable: true,
  get: function get() {
    return _StatusBar.StatusBar;
  }
});

var _DigestTool = require("./DigestTool/DigestTool");

Object.defineProperty(exports, "DigestTool", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DigestTool).default;
  }
});
Object.defineProperty(exports, "DigestToolUnconnected", {
  enumerable: true,
  get: function get() {
    return _DigestTool.DigestTool;
  }
});

var _withHover = require("./helperComponents/withHover");

Object.defineProperty(exports, "withHover", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withHover).default;
  }
});

var _redux = require("./redux");

Object.defineProperty(exports, "vectorEditorReducer", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_redux).default;
  }
});
Object.defineProperty(exports, "vectorEditorMiddleware", {
  enumerable: true,
  get: function get() {
    return _redux.vectorEditorMiddleware;
  }
});
Object.defineProperty(exports, "actions", {
  enumerable: true,
  get: function get() {
    return _redux.actions;
  }
});

var _updateEditor = require("./updateEditor");

Object.defineProperty(exports, "updateEditor", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_updateEditor).default;
  }
});

var _addAlignment = require("./addAlignment");

Object.defineProperty(exports, "addAlignment", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_addAlignment).default;
  }
});

var _getRangeAnglesSpecial = require("./CircularView/getRangeAnglesSpecial");

Object.defineProperty(exports, "getRangeAnglesSpecial", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getRangeAnglesSpecial).default;
  }
});

var _PositionAnnotationOnCircle = require("./CircularView/PositionAnnotationOnCircle");

Object.defineProperty(exports, "PositionAnnotationOnCircle", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PositionAnnotationOnCircle).default;
  }
});

var _EnzymeViewer = require("./EnzymeViewer");

Object.defineProperty(exports, "EnzymeViewer", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_EnzymeViewer).default;
  }
});

var _AlignmentView = require("./AlignmentView");

Object.defineProperty(exports, "AlignmentView", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_AlignmentView).default;
  }
});

var _getOveHotkeyDefs = require("./commands/getOveHotkeyDefs");

Object.defineProperty(exports, "getOveHotkeyDefs", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getOveHotkeyDefs).default;
  }
});

var _core = require("@blueprintjs/core");

var _teselagenReactComponents = require("teselagen-react-components");

require("./createVectorEditor");

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.tgCreateMenu = _teselagenReactComponents.showContextMenu;
require("typeface-ubuntu-mono");
// window.tgCreateMenu = (menu, e, e2) => {
//   (e||e2).stopPropagation()
//   (e || e2)
// } //add this to the window so people can easily override the default context menus

_core.FocusStyleManager.onlyShowFocusOnTabs();