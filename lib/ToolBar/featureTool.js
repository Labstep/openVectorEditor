"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import { Checkbox, Button } from "@blueprintjs/core";

// import { connect } from "react-redux";
// import { convertRangeTo1Based } from "ve-range-utils";


var _core = require("@blueprintjs/core");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _teselagenReactComponents = require("teselagen-react-components");

var _ToolbarItem = require("./ToolbarItem");

var _ToolbarItem2 = _interopRequireDefault(_ToolbarItem);

var _withEditorProps = require("../withEditorProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _withEditorProps.connectToEditor)(function (_ref) {
  var _ref$annotationVisibi = _ref.annotationVisibility,
      annotationVisibility = _ref$annotationVisibi === undefined ? {} : _ref$annotationVisibi,
      _ref$toolBar = _ref.toolBar,
      toolBar = _ref$toolBar === undefined ? {} : _ref$toolBar;

  return {
    toggled: annotationVisibility.features,
    isOpen: toolBar.openItem === "featureTool"
  };
})(function (_ref2) {
  var toolbarItemProps = _ref2.toolbarItemProps,
      toggled = _ref2.toggled,
      annotationVisibilityToggle = _ref2.annotationVisibilityToggle,
      isOpen = _ref2.isOpen;

  return _react2.default.createElement(_ToolbarItem2.default, _extends({
    Icon: _react2.default.createElement(_core.Icon, { icon: _teselagenReactComponents.featureIcon }),
    onIconClick: function onIconClick() {
      annotationVisibilityToggle("features");
    },
    toggled: toggled,
    tooltip: "Show features",
    tooltipToggled: "Hide features",
    // Dropdown: ConnectedFeatureToolDropdown,
    dropdowntooltip: (!isOpen ? "Show" : "Hide") + " Feature Options"
  }, toolbarItemProps));
});

// function FeatureToolDropDown({
//   dispatch,
//   readOnly,
//   editorName,
//   selectionLayer,
//   toggleDropdown,
//   annotationLabelVisibility,
//   annotationLabelVisibilityToggle
// }) {
//   return (
//     <div style={{ paddingTop: 5 }}>
//       <Checkbox
//         onChange={function() {
//           annotationLabelVisibilityToggle("features");
//           /* labelVisibilityToggle("features"); */
//         }}
//         checked={annotationLabelVisibility.features}
//         label={"Show feature labels"}
//       />
//       {!readOnly && (
//         <Button
//           onClick={() => {
//             toggleDropdown();
//             let initialValues = {};
//             if (selectionLayer && selectionLayer.start) {
//               initialValues = convertRangeTo1Based(selectionLayer);
//             }

//             dispatch({
//               type: "TG_SHOW_MODAL",
//               name: "AddOrEditFeatureDialog", //you'll need to pass a unique dialogName prop to the compoennt
//               props: {
//                 editorName,
//                 dialogProps: {
//                   title: "New Feature"
//                 },
//                 initialValues
//               }
//             });
//           }}
//         >
//           Add New Feature
//         </Button>
//       )}
//     </div>
//   );
// }

module.exports = exports["default"];