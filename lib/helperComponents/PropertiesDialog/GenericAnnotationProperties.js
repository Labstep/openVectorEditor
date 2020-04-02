"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _teselagenReactComponents = require("teselagen-react-components");

var _lodash = require("lodash");

var _core = require("@blueprintjs/core");

var _veRangeUtils = require("ve-range-utils");

var _withEditorProps = require("../../withEditorProps");

var _recompose = require("recompose");

var _commands = require("../../commands");

var _commands2 = _interopRequireDefault(_commands);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// import { Popover } from "@blueprintjs/core";
// import ColorPicker from "./ColorPicker";


var genericAnnotationProperties = function genericAnnotationProperties(_ref) {
  var annotationType = _ref.annotationType,
      noColor = _ref.noColor,
      noType = _ref.noType;

  var schema = {
    fields: [].concat(_toConsumableArray(noColor ? [] : [{
      path: "color",
      type: "string",
      render: function render(color) {
        return _react2.default.createElement("div", { style: { height: 20, width: 20, background: color } })
        // <ColorPickerPopover>
        //   <div style={{ height: 20, width: 20, background: color }} />
        // </ColorPickerPopover>
        ;
      }
    }]), [{ path: "name", type: "string" }], _toConsumableArray(noType ? [] : [{ path: "type", type: "string" }]), [_utils.sizeSchema, { path: "strand", type: "string" }])
  };
  var annotationTypeUpper = (0, _lodash.upperFirst)(annotationType);

  var AnnotationProperties = function (_React$Component) {
    _inherits(AnnotationProperties, _React$Component);

    function AnnotationProperties(props) {
      _classCallCheck(this, AnnotationProperties);

      var _this = _possibleConstructorReturn(this, (AnnotationProperties.__proto__ || Object.getPrototypeOf(AnnotationProperties)).call(this, props));

      _this.onRowSelect = function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            record = _ref3[0];

        if (!record) return;
        var _this$props = _this.props,
            dispatch = _this$props.dispatch,
            editorName = _this$props.editorName;

        dispatch({
          type: "SELECTION_LAYER_UPDATE",
          payload: record,
          meta: {
            editorName: editorName
          }
        });
      };

      _this.commands = (0, _commands2.default)(_this);
      return _this;
    }

    _createClass(AnnotationProperties, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            readOnly = _props.readOnly,
            _props$annotations = _props.annotations,
            annotations = _props$annotations === undefined ? {} : _props$annotations,
            annotationVisibility = _props.annotationVisibility,
            sequenceLength = _props.sequenceLength,
            selectionLayer = _props.selectionLayer,
            isProtein = _props.isProtein,
            _annotationPropertiesSelectedEntities = _props.annotationPropertiesSelectedEntities,
            selectedAnnotationId = _props.selectedAnnotationId;

        var annotationPropertiesSelectedEntities = _annotationPropertiesSelectedEntities.filter(function (a) {
          return annotations[a.id];
        });

        var deleteAnnotation = this.props["delete" + annotationTypeUpper];
        // showAddOrEditFeatureDialog()
        // showAddOrEditPartDialog()
        // showAddOrEditPrimerDialog()
        var showAddOrEditAnnotationDialog = this.props["showAddOrEdit" + annotationTypeUpper + "Dialog"];

        var annotationsToUse = (0, _lodash.map)(annotations, function (annotation) {
          return _extends({}, annotation, annotation.strand === undefined && {
            strand: annotation.forward ? 1 : -1
          }, {
            size: (0, _veRangeUtils.getRangeLength)(annotation, sequenceLength)
          });
        });
        return _react2.default.createElement(
          _react2.default.Fragment,
          null,
          _react2.default.createElement(_teselagenReactComponents.DataTable, {
            topLeftItems: _react2.default.createElement(_teselagenReactComponents.CmdCheckbox, {
              prefix: "Show ",
              cmd: this.commands["toggle" + (annotationTypeUpper + "s")]
            }),
            annotationVisibility: annotationVisibility //we need to pass this in order to force the DT to rerenderannotationVisibility={annotationVisibility}
            , noPadding: true,
            noFullscreenButton: true,
            onRowSelect: this.onRowSelect,
            maxHeight: 400,
            selectedIds: selectedAnnotationId,
            formName: "annotationProperties",
            noRouter: true,
            isProtein: isProtein,
            compact: true,
            isInfinite: true,
            schema: schema,
            entities: annotationsToUse
          }),
          !readOnly && _react2.default.createElement(
            "div",
            { className: "vePropertiesFooter" },
            _react2.default.createElement(
              _core.Button,
              {
                disabled: !sequenceLength,
                style: { marginRight: 15 },
                onClick: function onClick() {
                  showAddOrEditAnnotationDialog(_extends({}, (0, _lodash.pick)(selectionLayer, "start", "end", "forward")));
                }
              },
              "New"
            ),
            _react2.default.createElement(
              _core.Button,
              {
                onClick: function onClick() {
                  showAddOrEditAnnotationDialog(annotationPropertiesSelectedEntities[0]);
                },
                style: { marginRight: 15 },
                disabled: annotationPropertiesSelectedEntities.length !== 1
              },
              "Edit"
            ),
            _react2.default.createElement(
              _core.Button,
              {
                onClick: function onClick() {
                  deleteAnnotation(annotationPropertiesSelectedEntities);
                },
                style: { marginRight: 15 },
                disabled: !annotationPropertiesSelectedEntities.length
              },
              "Delete"
            ),
            ["part", "primer", "feature"].includes(annotationType) && _react2.default.createElement(_teselagenReactComponents.CmdButton, {
              cmd: this.commands["showRemoveDuplicatesDialog" + (annotationTypeUpper + "s")],
              style: { marginRight: 15 }
            })
          )
        );
      }
    }]);

    return AnnotationProperties;
  }(_react2.default.Component);

  return (0, _recompose.compose)((0, _withEditorProps.connectToEditor)(function (_ref4) {
    var _ref5;

    var readOnly = _ref4.readOnly,
        _ref4$annotationVisib = _ref4.annotationVisibility,
        annotationVisibility = _ref4$annotationVisib === undefined ? {} : _ref4$annotationVisib,
        sequenceData = _ref4.sequenceData,
        selectionLayer = _ref4.selectionLayer;

    return _ref5 = {
      annotationVisibility: annotationVisibility,
      selectionLayer: selectionLayer,
      readOnly: readOnly,
      annotations: sequenceData[annotationType + "s"]
    }, _defineProperty(_ref5, annotationType + "s", sequenceData[annotationType + "s"]), _defineProperty(_ref5, "sequenceLength", sequenceData.sequence.length), _ref5;
  }), (0, _teselagenReactComponents.withSelectedEntities)("annotationProperties"))(AnnotationProperties);
};

exports.default = genericAnnotationProperties;

// const ColorPickerPopover = ({ readOnly, onColorSelect, children }) => {
//   return (
//     <Popover
//       disabled={readOnly}
//       content={<ColorPicker onColorSelect={onColorSelect} />}
//     >
//       {children}
//     </Popover>
//   );
// };

module.exports = exports["default"];