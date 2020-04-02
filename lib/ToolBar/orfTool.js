"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _core = require("@blueprintjs/core");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _teselagenReactComponents = require("teselagen-react-components");

var _ToolbarItem = require("./ToolbarItem");

var _ToolbarItem2 = _interopRequireDefault(_ToolbarItem);

var _withEditorProps = require("../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

var _commands = require("../commands");

var _commands2 = _interopRequireDefault(_commands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = (0, _withEditorProps.connectToEditor)(function (_ref) {
  var _ref$annotationVisibi = _ref.annotationVisibility,
      annotationVisibility = _ref$annotationVisibi === undefined ? {} : _ref$annotationVisibi,
      _ref$toolBar = _ref.toolBar,
      toolBar = _ref$toolBar === undefined ? {} : _ref$toolBar;

  return {
    toggled: annotationVisibility.orfs,
    isOpen: toolBar.openItem === "orfTool"
  };
})(function (_ref2) {
  var toolbarItemProps = _ref2.toolbarItemProps,
      toggled = _ref2.toggled,
      annotationVisibilityToggle = _ref2.annotationVisibilityToggle,
      isOpen = _ref2.isOpen;

  return _react2.default.createElement(_ToolbarItem2.default, _extends({
    Icon: _react2.default.createElement(_core.Icon, { "data-test": "orfTool", icon: _teselagenReactComponents.orfIcon }),
    onIconClick: function onIconClick() {
      annotationVisibilityToggle("orfs");
      annotationVisibilityToggle("orfTranslations");
    },
    toggled: toggled,
    tooltip: "Show Open Reading Frames",
    tooltipToggled: "Hide Open Reading Frames",
    Dropdown: OrfToolDropdown,
    dropdowntooltip: (!isOpen ? "Show" : "Hide") + " Open Reading Frame Options"
  }, toolbarItemProps));
});


var OrfToolDropdown = (0, _withEditorProps2.default)(function (_React$Component) {
  _inherits(OrfDropdown, _React$Component);

  function OrfDropdown(props) {
    _classCallCheck(this, OrfDropdown);

    var _this = _possibleConstructorReturn(this, (OrfDropdown.__proto__ || Object.getPrototypeOf(OrfDropdown)).call(this, props));

    _this.commands = (0, _commands2.default)(_this);
    return _this;
  }

  _createClass(OrfDropdown, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "veToolbarOrfOptionsHolder" },
        _react2.default.createElement(_teselagenReactComponents.CmdCheckbox, {
          prefix: "Show ",
          cmd: this.commands.toggleOrfTranslations
        }),
        _react2.default.createElement(_teselagenReactComponents.CmdCheckbox, {
          prefix: "Show ",
          cmd: this.commands.useGtgAndCtgAsStartCodons
        }),
        _react2.default.createElement(_teselagenReactComponents.CmdDiv, { cmd: this.commands.minOrfSizeCmd }),
        _react2.default.createElement("div", { className: "vespacer" }),
        _react2.default.createElement(_teselagenReactComponents.InfoHelper, {
          displayToSide: true,
          content: "To translate an arbitrary area, right click a selection."
        })
      );
    }
  }]);

  return OrfDropdown;
}(_react2.default.Component));
// const OrfToolDropdown = withEditorProps(function({
//   useAdditionalOrfStartCodons,
//   useAdditionalOrfStartCodonsToggle,
//   annotationVisibility,
//   annotationVisibilityToggle,
//   editorName
// }) {
//   return (
//     <div className="veToolbarOrfOptionsHolder">
//       {/* <div className="vespacer" />
//       <MinOrfSize editorName={editorName} />
//       <Checkbox
//         onChange={function() {
//           annotationVisibilityToggle("orfTranslations");
//         }}
//         disabled={!annotationVisibility.orfs}
//         checked={annotationVisibility.orfTranslations}
//         label="Show translations for ORFs"
//       />
//       <Checkbox
//         onChange={function() {
//           annotationVisibilityToggle("cdsFeatureTranslations");
//         }}
//         checked={annotationVisibility.cdsFeatureTranslations}
//         label="Show translations for CDS features"
//       />
//       <Checkbox
//         onChange={useAdditionalOrfStartCodonsToggle}
//         checked={useAdditionalOrfStartCodons}
//         label="Use GTG and CTG as start codons"
//       /> */}
//       <div className="vespacer" />

//       <InfoHelper
//         displayToSide
//         content="To translate an arbitrary area, right click a selection."
//       />
//     </div>
//   );
// });

// export const MinOrfSize = connectToEditor(editorState => {
//   return {
//     sequenceLength: selectors.sequenceLengthSelector(editorState),
//     minimumOrfSize: editorState.minimumOrfSize
//   };
// })(
//   ({
//     minimumOrfSizeUpdate,
//     sequenceLength,
//     annotationVisibilityShow,
//     minimumOrfSize
//   }) => {
//     return (
//       <div data-test="min-orf-size" style={{ display: "flex" }}>
//         Minimum ORF Size:
//         <input
//           type="number"
//           className={classNames(Classes.INPUT, "minOrfSizeInput")}
//           onChange={function(event) {
//             let minimumOrfSize = parseInt(event.target.value, 10);
//             if (!(minimumOrfSize > -1)) return;
//             if (minimumOrfSize > sequenceLength) return;
//             annotationVisibilityShow("orfs");
//             minimumOrfSizeUpdate(minimumOrfSize);
//           }}
//           value={minimumOrfSize}
//         />
//       </div>
//     );
//   }
// );

module.exports = exports["default"];