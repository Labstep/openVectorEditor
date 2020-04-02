"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HoveredIdContext = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _hoveredAnnotation = require("../redux/hoveredAnnotation");

var hoveredAnnotationActions = _interopRequireWildcard(_hoveredAnnotation);

var _recompose = require("recompose");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HoveredIdContext = exports.HoveredIdContext = _react2.default.createContext({
  hoveredId: "" // default value
});

function withHoveredIdFromContext(Component) {
  return function HoveredIdComponent(props) {
    return _react2.default.createElement(
      HoveredIdContext.Consumer,
      null,
      function (contexts) {
        return _react2.default.createElement(Component, _extends({}, props, contexts));
      }
    );
  };
}

exports.default = (0, _redux.compose)(withHoveredIdFromContext, (0, _reactRedux.connect)(function (state, _ref) {
  var id = _ref.id,
      _ref$editorName = _ref.editorName,
      editorName = _ref$editorName === undefined ? "StandaloneEditor" : _ref$editorName,
      className = _ref.className,
      hoveredIdFromContext = _ref.hoveredId,
      passHoveredId = _ref.passHoveredId;

  if (!editorName) {
    console.warn("please pass an editorName to the withHover() wrapped component");
  }
  var editorState = state.VectorEditor[editorName] || {};
  var hoveredId = editorState.hoveredAnnotation || hoveredIdFromContext; //we can pass a hoveredId from context in order to still use the hover functionality without being connected to redux! see http://localhost:3344/#/SimpleCircularOrLinearView for an example
  var isIdHashmap = (typeof id === "undefined" ? "undefined" : _typeof(id)) === "object";

  var hovered = !!(isIdHashmap ? id[hoveredId] : hoveredId === id);
  var newClassName = (0, _classnames2.default)(className, "hoverHelper", {
    veAnnotationHovered: hovered
  });
  var toReturn = {
    hovered: hovered,
    className: newClassName
  };
  if (hovered && passHoveredId) {
    //only pass hoveredId if it is hovered
    toReturn.hoveredId = hoveredId;
  }
  return toReturn;
}, hoveredAnnotationActions), (0, _recompose.withHandlers)({
  onMouseOver: function onMouseOver(props) {
    return function (e) {
      var editorName = props.editorName,
          id = props.id,
          hoveredAnnotationUpdate = props.hoveredAnnotationUpdate;

      var isIdHashmap = (typeof id === "undefined" ? "undefined" : _typeof(id)) === "object";
      var idToPass = isIdHashmap ? Object.keys(id)[0] : id;
      //because the calling onHover can slow things down, we disable it if dragging or scrolling
      if (window.__veDragging || window.__veScrolling) return;
      e.stopPropagation();
      hoveredAnnotationUpdate(idToPass, { editorName: editorName });
    };
  },
  onMouseLeave: function onMouseLeave(props) {
    return function (e) {
      var editorName = props.editorName,
          hoveredAnnotationClear = props.hoveredAnnotationClear;

      e.stopPropagation();
      if (window.__veDragging || window.__veScrolling) return;
      hoveredAnnotationClear(true, { editorName: editorName });
    };
  }
}));