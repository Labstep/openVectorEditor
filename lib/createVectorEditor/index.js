"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createVectorEditor;
exports.createVersionHistoryView = createVersionHistoryView;
exports.createAlignmentView = createAlignmentView;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _makeStore = require("./makeStore");

var _makeStore2 = _interopRequireDefault(_makeStore);

var _reactDom = require("react-dom");

var _Editor = require("../Editor");

var _Editor2 = _interopRequireDefault(_Editor);

var _updateEditor = require("../updateEditor");

var _updateEditor2 = _interopRequireDefault(_updateEditor);

var _addAlignment = require("../addAlignment");

var _addAlignment2 = _interopRequireDefault(_addAlignment);

var _AlignmentView = require("../AlignmentView");

var _AlignmentView2 = _interopRequireDefault(_AlignmentView);

var _reactSizeme = require("react-sizeme");

var _reactSizeme2 = _interopRequireDefault(_reactSizeme);

var _VersionHistoryView = require("../VersionHistoryView");

var _VersionHistoryView2 = _interopRequireDefault(_VersionHistoryView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var store = void 0;

function StandaloneEditor(props) {
  if (!store) {
    store = (0, _makeStore2.default)();
  }
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_Editor2.default, props)
  );
}

function StandaloneAlignment(props) {
  if (!store) {
    store = (0, _makeStore2.default)();
  }
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_AlignmentView2.default, _extends({}, props, { dimensions: { width: props.size.width } }))
  );
}

function StandaloneVersionHistoryView(props) {
  if (!store) {
    store = (0, _makeStore2.default)();
  }
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_VersionHistoryView2.default, _extends({}, props))
  );
}

function createVectorEditor(_node) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref$editorName = _ref.editorName,
      editorName = _ref$editorName === undefined ? "StandaloneEditor" : _ref$editorName,
      rest = _objectWithoutProperties(_ref, ["editorName"]);

  if (!store) {
    store = (0, _makeStore2.default)();
  }
  var node = void 0;

  if (_node === "createDomNodeForMe") {
    node = document.createElement("div");
    node.className = "ove-created-div";
    document.body.appendChild(node);
  } else {
    node = _node;
  }
  var editor = {};
  editor.renderResponse = (0, _reactDom.render)(_react2.default.createElement(StandaloneEditor, _extends({ editorName: editorName }, rest)), node);
  editor.close = function () {
    (0, _reactDom.unmountComponentAtNode)(node);
    node.remove();
  };
  editor.updateEditor = function (values) {
    (0, _updateEditor2.default)(store, editorName, values);
  };
  editor.addAlignment = function (values) {
    (0, _addAlignment2.default)(store, values);
  };
  editor.getState = function () {
    return store.getState().VectorEditor["StandaloneEditor"];
  };

  return editor;
}

function createVersionHistoryView(node) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref2$editorName = _ref2.editorName,
      editorName = _ref2$editorName === undefined ? "StandaloneVersionHistoryView" : _ref2$editorName,
      rest = _objectWithoutProperties(_ref2, ["editorName"]);

  if (!store) {
    store = (0, _makeStore2.default)();
  }
  var editor = {};
  editor.renderResponse = (0, _reactDom.render)(_react2.default.createElement(StandaloneVersionHistoryView, _extends({ editorName: editorName }, rest)), node);

  editor.updateEditor = function (values) {
    (0, _updateEditor2.default)(store, editorName, values);
  };
  editor.getState = function () {
    return store.getState().VectorEditor["StandaloneVersionHistoryView"];
  };

  return editor;
}

var SizedStandaloneAlignment = (0, _reactSizeme2.default)()(StandaloneAlignment);
function createAlignmentView(node) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!store) {
    store = (0, _makeStore2.default)();
  }
  var editor = {};
  editor.renderResponse = (0, _reactDom.render)(_react2.default.createElement(SizedStandaloneAlignment, props), node);

  editor.updateAlignment = function (values) {
    (0, _addAlignment2.default)(store, values);
  };
  editor.updateAlignment(props);
  editor.getState = function () {
    if (!props.id) {
      throw new Error('Please pass an id when using createAlignmentView. eg createAlignmentView(myDiv, {id: "someUniqueId"})');
    }
    return store.getState().VectorEditor.__allEditorsOptions.alignments[props.id];
  };
  return editor;
}

window.createVectorEditor = createVectorEditor;
window.createAlignmentView = createAlignmentView;
window.createVersionHistoryView = createVersionHistoryView;