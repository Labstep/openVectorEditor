"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = require("@blueprintjs/core");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _teselagenReactComponents = require("teselagen-react-components");

var _commands = require("../../commands");

var _commands2 = _interopRequireDefault(_commands);

var _lodash = require("lodash");

var _veRangeUtils = require("ve-range-utils");

var _withEditorProps = require("../../withEditorProps");

var _recompose = require("recompose");

var _selectors = require("../../selectors");

var _selectors2 = _interopRequireDefault(_selectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TranslationProperties = function (_React$Component) {
  _inherits(TranslationProperties, _React$Component);

  function TranslationProperties(props) {
    _classCallCheck(this, TranslationProperties);

    var _this = _possibleConstructorReturn(this, (TranslationProperties.__proto__ || Object.getPrototypeOf(TranslationProperties)).call(this, props));

    _this.onRowSelect = function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          record = _ref2[0];

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

  _createClass(TranslationProperties, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          readOnly = _props.readOnly,
          translations = _props.translations,
          translationPropertiesSelectedEntities = _props.translationPropertiesSelectedEntities,
          deleteTranslation = _props.deleteTranslation,
          sequenceLength = _props.sequenceLength,
          selectedAnnotationId = _props.selectedAnnotationId,
          annotationVisibility = _props.annotationVisibility;

      var translationsToUse = (0, _lodash.map)(translations, function (translation) {
        return _extends({}, translation, {
          sizeBps: (0, _veRangeUtils.getRangeLength)(translation, sequenceLength),
          sizeAa: Math.floor((0, _veRangeUtils.getRangeLength)(translation, sequenceLength) / 3)
        }, translation.strand === undefined && {
          strand: translation.forward ? 1 : -1
        });
      });

      return _react2.default.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column" } },
        _react2.default.createElement(_teselagenReactComponents.DataTable, {
          noPadding: true,
          onRowSelect: this.onRowSelect,
          maxHeight: 400,
          selectedIds: selectedAnnotationId,
          formName: "translationProperties",
          noRouter: true,
          compact: true,
          topLeftItems: _react2.default.createElement(_teselagenReactComponents.CmdCheckbox, {
            prefix: "Show ",
            cmd: this.commands.toggleTranslations
          }),
          annotationVisibility: annotationVisibility //we need to pass this in order to force the DT to rerender
          , hideSelectedCount: true,
          noFooter: true,
          noFullscreenButton: true,
          isInfinite: true,
          schema: {
            fields: [{
              path: "translationType",
              displayName: "Type",
              type: "string"
            }, {
              path: "sizeAa",
              displayName: "Size (aa)",
              type: "string"
            }, { path: "strand", type: "number" }]
          },
          entities: translationsToUse
        }),
        _react2.default.createElement(_teselagenReactComponents.CmdCheckbox, { prefix: "Show ", cmd: this.commands.toggleOrfTranslations }),
        _react2.default.createElement(_teselagenReactComponents.CmdCheckbox, {
          prefix: "Show ",
          cmd: this.commands.toggleCdsFeatureTranslations
        }),
        !readOnly && _react2.default.createElement(
          "div",
          { className: "vePropertiesFooter" },
          _react2.default.createElement(
            _core.Tooltip,
            {
              content: translationPropertiesSelectedEntities.length && translationPropertiesSelectedEntities[0].translationType !== "User Created" ? "Only \"User Created\" translations can be deleted" : undefined
            },
            _react2.default.createElement(
              _core.AnchorButton,
              {
                onClick: function onClick() {
                  deleteTranslation(translationPropertiesSelectedEntities);
                },
                style: { marginLeft: 10, marginRight: 15, height: 30 },
                disabled: !translationPropertiesSelectedEntities.length || translationPropertiesSelectedEntities[0].translationType !== "User Created"
              },
              "Delete"
            )
          )
        )
      );
    }
  }]);

  return TranslationProperties;
}(_react2.default.Component);

exports.default = (0, _recompose.compose)((0, _withEditorProps.connectToEditor)(function (editorState) {
  var readOnly = editorState.readOnly,
      _editorState$annotati = editorState.annotationVisibility,
      annotationVisibility = _editorState$annotati === undefined ? {} : _editorState$annotati,
      sequenceData = editorState.sequenceData;

  return {
    readOnly: readOnly,
    translations: _selectors2.default.translationsSelector(editorState),
    orfs: _selectors2.default.orfsSelector(editorState),
    annotationVisibility: annotationVisibility,
    sequenceLength: (sequenceData.sequence || "").length,
    sequenceData: sequenceData
  };
}), (0, _teselagenReactComponents.withSelectedEntities)("translationProperties"))(TranslationProperties);
module.exports = exports["default"];