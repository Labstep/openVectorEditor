"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _core = require("@blueprintjs/core");

var _CutsiteFilter = require("../CutsiteFilter");

var _CutsiteFilter2 = _interopRequireDefault(_CutsiteFilter);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ToolbarItem = require("./ToolbarItem");

var _ToolbarItem2 = _interopRequireDefault(_ToolbarItem);

var _withEditorProps = require("../withEditorProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _withEditorProps.connectToEditor)(function (_ref) {
  var readOnly = _ref.readOnly,
      _ref$annotationVisibi = _ref.annotationVisibility,
      annotationVisibility = _ref$annotationVisibi === undefined ? {} : _ref$annotationVisibi,
      _ref$toolBar = _ref.toolBar,
      toolBar = _ref$toolBar === undefined ? {} : _ref$toolBar;

  return {
    readOnly: readOnly,
    toggled: annotationVisibility.cutsites,
    isOpen: toolBar.openItem === "cutsiteTool"
  };
})(function (_ref2) {
  var toolbarItemProps = _ref2.toolbarItemProps,
      toggled = _ref2.toggled,
      isOpen = _ref2.isOpen,
      annotationVisibilityToggle = _ref2.annotationVisibilityToggle;

  return _react2.default.createElement(_ToolbarItem2.default, _extends({
    Icon: _react2.default.createElement(_core.Icon, { "data-test": "cutsiteHideShowTool", icon: "cut" }),
    onIconClick: function onIconClick() {
      annotationVisibilityToggle("cutsites");
    },
    toggled: toggled,
    tooltip: "Show cut sites",
    tooltipToggled: "Hide cut sites",
    Dropdown: CutsiteToolDropDown,
    dropdowntooltip: (!isOpen ? "Show" : "Hide") + " Cut Site Options"
  }, toolbarItemProps));
});
// import show_cut_sites_img from "./veToolbarIcons/show_cut_sites.png";

// function CutsiteToolIcon({ annotationVisibilityToggle }) {
//   return (
//     <div
//       onClick={function() {
//         annotationVisibilityToggle("cutsites");
//       }}
//     >
//       <img src={show_cut_sites_img} alt="Show cut sites" />
//     </div>
//   );
// }

function CutsiteToolDropDown(_ref3) {
  var editorName = _ref3.editorName,
      toggleDropdown = _ref3.toggleDropdown,
      annotationVisibilityShow = _ref3.annotationVisibilityShow,
      withDigestTool = _ref3.withDigestTool,
      createNewDigest = _ref3.createNewDigest;

  return _react2.default.createElement(
    "div",
    { className: "veToolbarCutsiteFilterHolder" },
    _react2.default.createElement(
      "h6",
      null,
      "Filter Cut Sites:"
    ),
    _react2.default.createElement(_CutsiteFilter2.default, {
      editorName: editorName,
      onChangeHook: function onChangeHook() {
        annotationVisibilityShow("cutsites");
      }
    }),
    withDigestTool && _react2.default.createElement(
      _core.Button,
      {
        onClick: function onClick() {
          createNewDigest();
          toggleDropdown();
        }
      },
      _react2.default.createElement(
        "span",
        { style: { display: "flex" } },
        "Virtual Digest \xA0 ",
        _react2.default.createElement(_core.KeyCombo, { minimal: true, combo: "mod+shift+d" })
      )
    )
  );
}
module.exports = exports["default"];