"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _teselagenReactComponents = require("teselagen-react-components");

var _redux = require("redux");

var _lodash = require("lodash");

var _withEditorProps = require("../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

var _defaultConfig = require("./defaultConfig");

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _commands = require("../commands");

var _commands2 = _interopRequireDefault(_commands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ident = function ident(x) {
  return x;
};

var OveMenuBar = function (_React$Component) {
  _inherits(OveMenuBar, _React$Component);

  function OveMenuBar(props) {
    _classCallCheck(this, OveMenuBar);

    var _this = _possibleConstructorReturn(this, (OveMenuBar.__proto__ || Object.getPrototypeOf(OveMenuBar)).call(this, props));

    _this.getFilteredMenu = (0, _lodash.memoize)(function (menuFilter, menuDef) {
      _this.counter++;
      if (_this.counter === 50) console.warn("It's likely you're passing a new \"menuFilter\" function every time. This will cause unecessary re-renders. Try not to recreate a new function each time!");
      return menuFilter(JSON.parse(JSON.stringify(menuDef)));
    });

    var commands = (0, _commands2.default)(_this);
    _this.enhancers = [(0, _teselagenReactComponents.commandMenuEnhancer)(commands, {
      useTicks: true,
      omitIcons: true
    })];
    _this.counter = 0;
    return _this;
  }

  _createClass(OveMenuBar, [{
    key: "render",
    value: function render() {
      var _props$menuFilter = this.props.menuFilter,
          menuFilter = _props$menuFilter === undefined ? ident : _props$menuFilter;
      // Clone original menu def to protect it from accidental mutation

      return _react2.default.createElement(
        "div",
        {
          className: "veMenuBarContainer",
          style: { display: "flex" /* height: "100%" */ }
        },
        _react2.default.createElement(_teselagenReactComponents.MenuBar, {
          menu: this.getFilteredMenu(menuFilter, _defaultConfig2.default),
          enhancers: this.enhancers
        })
      );
    }
  }]);

  return OveMenuBar;
}(_react2.default.Component);

exports.default = (0, _redux.compose)(_withEditorProps2.default)(OveMenuBar);
module.exports = exports["default"];