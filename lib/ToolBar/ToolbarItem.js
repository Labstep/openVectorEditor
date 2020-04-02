"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _withEditorProps = require("../withEditorProps");

var _core = require("@blueprintjs/core");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import download from 'in-browser-download'


var ToolbarItem = function (_React$Component) {
  _inherits(ToolbarItem, _React$Component);

  function ToolbarItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ToolbarItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ToolbarItem.__proto__ || Object.getPrototypeOf(ToolbarItem)).call.apply(_ref, [this].concat(args))), _this), _this.toggleDropdown = function (_ref2) {
      var forceClose = _ref2.forceClose;
      var _this$props = _this.props,
          toolName = _this$props.toolName,
          isOpen = _this$props.isOpen;


      _this.props.openToolbarItemUpdate(isOpen || forceClose ? "" : toolName);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ToolbarItem, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props$overrides = this.props.overrides,
          overrides = _props$overrides === undefined ? {} : _props$overrides;

      var _props$overrides2 = _extends({}, this.props, overrides),
          isOpen = _props$overrides2.isOpen,
          index = _props$overrides2.index,
          Icon = _props$overrides2.Icon,
          _props$overrides2$onI = _props$overrides2.onIconClick,
          onIconClick = _props$overrides2$onI === undefined ? noop : _props$overrides2$onI,
          _props$overrides2$too = _props$overrides2.tooltip,
          tooltip = _props$overrides2$too === undefined ? "" : _props$overrides2$too,
          tooltipToggled = _props$overrides2.tooltipToggled,
          _props$overrides2$dro = _props$overrides2.dropdowntooltip,
          dropdowntooltip = _props$overrides2$dro === undefined ? "" : _props$overrides2$dro,
          Dropdown = _props$overrides2.Dropdown,
          disabled = _props$overrides2.disabled,
          isHidden = _props$overrides2.isHidden,
          renderIconAbove = _props$overrides2.renderIconAbove,
          noDropdownIcon = _props$overrides2.noDropdownIcon,
          IconWrapper = _props$overrides2.IconWrapper,
          editorName = _props$overrides2.editorName,
          popoverDisabled = _props$overrides2.popoverDisabled,
          IconWrapperProps = _props$overrides2.IconWrapperProps,
          toolName = _props$overrides2.toolName,
          dropdownicon = _props$overrides2.dropdownicon,
          tooltipDisabled = _props$overrides2.tooltipDisabled,
          _props$overrides2$tog = _props$overrides2.toggled,
          toggled = _props$overrides2$tog === undefined ? false : _props$overrides2$tog,
          rest = _objectWithoutProperties(_props$overrides2, ["isOpen", "index", "Icon", "onIconClick", "tooltip", "tooltipToggled", "dropdowntooltip", "Dropdown", "disabled", "isHidden", "renderIconAbove", "noDropdownIcon", "IconWrapper", "editorName", "popoverDisabled", "IconWrapperProps", "toolName", "dropdownicon", "tooltipDisabled", "toggled"]);

      if (!toolName) console.warn("toolName is required!");
      if (isHidden) return null;
      var tooltipToDisplay = tooltip;
      if (toggled && tooltipToggled) {
        tooltipToDisplay = tooltipToggled;
      }
      // const Dropdown = _DropDown && withEditorProps && withEditorProps(_DropDown);

      var buttonTarget = _react2.default.createElement(
        "div",
        {
          className: "veToolbarItemOuter ve-tool-container-" + toolName + (disabled ? " disabled " : "")
        },
        renderIconAbove && _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            { className: "veToolbarItem" },
            Icon
          )
        ),
        Icon && !renderIconAbove && _react2.default.createElement(
          _core.Tooltip,
          {
            disabled: tooltipDisabled,
            portalClassName: "ve-toolbar-item-popover",
            content: tooltipToDisplay
          },
          _react2.default.createElement(_core.AnchorButton, {
            intent: _core.Intent.PRIMARY,
            onClick: onIconClick === "toggleDropdown" ? this.toggleDropdown : onIconClick,
            active: toggled,
            disabled: disabled,
            minimal: true,
            icon: _react2.default.isValidElement(Icon) ? Icon : _react2.default.createElement(Icon, { toggleDropdown: this.toggleDropdown })
          })
        ),
        Dropdown && !noDropdownIcon ? _react2.default.createElement(
          _core.Tooltip,
          { disabled: tooltipDisabled, content: dropdowntooltip },
          _react2.default.createElement(
            "div",
            {
              className: (isOpen ? " isOpen " : "") + (dropdownicon ? "" : " veToolbarDropdown"),
              onClick: this.toggleDropdown
            },
            dropdownicon ? _react2.default.createElement(
              "div",
              { className: "veToolbarIcon" },
              _react2.default.createElement(
                "div",
                null,
                dropdownicon
              )
            ) : isOpen ? _react2.default.createElement(_core.Icon, {
              "data-test": toolName + "Dropdown",
              iconSize: 13,
              icon: "caret-up"
            }) : _react2.default.createElement(_core.Icon, {
              "data-test": toolName + "Dropdown",
              iconSize: 13,
              icon: "caret-down"
            })
          )
        ) : null
      );
      var content = _react2.default.createElement(
        "div",
        {
          ref: function ref(n) {
            if (n) _this2.dropdownNode = n;
          },
          style: { padding: 10, minWidth: 250, maxWidth: 350 },
          className: "ve-toolbar-dropdown content"
        },
        Dropdown && _react2.default.createElement(Dropdown, _extends({}, rest, {
          editorName: editorName,
          toggleDropdown: this.toggleDropdown
        }))
      );
      var target = IconWrapper ? _react2.default.createElement(
        IconWrapper,
        IconWrapperProps,
        " ",
        buttonTarget
      ) : buttonTarget;

      return _react2.default.createElement(
        "div",
        { style: { display: "flex", alignItems: "center" } },
        index !== 0 && _react2.default.createElement("div", { className: "veToolbarSpacer" }),
        _react2.default.createElement(_core.Popover, {
          disabled: popoverDisabled,
          isOpen: !!Dropdown && isOpen,
          onClose: function onClose(e) {
            var srcElement = void 0;
            if (e) {
              srcElement = e.srcElement || e.target;
            }
            if (e && srcElement && _this2.dropdownNode && (_this2.dropdownNode.contains(srcElement) || !document.body.contains(srcElement))) {
              return;
            }
            _this2.toggleDropdown({ forceClose: true });
          },
          canEscapeKeyClose: true,
          minimal: true,
          position: _core.Position.BOTTOM,
          target: target,
          content: content
        })
      );
    }
  }]);

  return ToolbarItem;
}(_react2.default.Component);

function noop() {}

exports.default = (0, _withEditorProps.connectToEditor)(function (_ref3, _ref4) {
  var _ref3$toolBar = _ref3.toolBar,
      toolBar = _ref3$toolBar === undefined ? {} : _ref3$toolBar;
  var toolName = _ref4.toolName;
  return {
    isOpen: toolBar.openItem === toolName
  };
})(ToolbarItem);
module.exports = exports["default"];