"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropertiesDialog = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _redux = require("redux");

var _core = require("@blueprintjs/core");

var _lodash = require("lodash");

var _FeatureProperties = require("./FeatureProperties");

var _FeatureProperties2 = _interopRequireDefault(_FeatureProperties);

var _GeneralProperties = require("./GeneralProperties");

var _GeneralProperties2 = _interopRequireDefault(_GeneralProperties);

var _CutsiteProperties = require("./CutsiteProperties");

var _CutsiteProperties2 = _interopRequireDefault(_CutsiteProperties);

var _OrfProperties = require("./OrfProperties");

var _OrfProperties2 = _interopRequireDefault(_OrfProperties);

var _GenbankView = require("./GenbankView");

var _GenbankView2 = _interopRequireDefault(_GenbankView);

var _TranslationProperties = require("./TranslationProperties");

var _TranslationProperties2 = _interopRequireDefault(_TranslationProperties);

var _PrimerProperties = require("./PrimerProperties");

var _PrimerProperties2 = _interopRequireDefault(_PrimerProperties);

var _PartProperties = require("./PartProperties");

var _PartProperties2 = _interopRequireDefault(_PartProperties);

var _withEditorProps = require("../../withEditorProps");

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PropertiesContainer = function PropertiesContainer(Comp) {
  return function (props) {
    var additionalFooterEls = props.additionalFooterEls,
        additionalHeaderEls = props.additionalHeaderEls,
        rest = _objectWithoutProperties(props, ["additionalFooterEls", "additionalHeaderEls"]);

    return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      additionalHeaderEls,
      _react2.default.createElement(Comp, rest),
      additionalFooterEls
    );
  };
};
var allTabs = {
  general: PropertiesContainer(_GeneralProperties2.default),
  features: PropertiesContainer(_FeatureProperties2.default),
  parts: PropertiesContainer(_PartProperties2.default),
  primers: PropertiesContainer(_PrimerProperties2.default),
  translations: PropertiesContainer(_TranslationProperties2.default),
  cutsites: PropertiesContainer(_CutsiteProperties2.default),
  orfs: PropertiesContainer(_OrfProperties2.default),
  genbank: PropertiesContainer(_GenbankView2.default)
};

var PropertiesDialog = exports.PropertiesDialog = function (_React$Component) {
  _inherits(PropertiesDialog, _React$Component);

  function PropertiesDialog() {
    _classCallCheck(this, PropertiesDialog);

    return _possibleConstructorReturn(this, (PropertiesDialog.__proto__ || Object.getPrototypeOf(PropertiesDialog)).apply(this, arguments));
  }

  _createClass(PropertiesDialog, [{
    key: "render",
    value: function render() {
      var _props$props$Properti = _extends({}, this.props, this.props.PropertiesProps),
          _props$props$Properti2 = _props$props$Properti.propertiesTool,
          propertiesTool = _props$props$Properti2 === undefined ? {} : _props$props$Properti2,
          propertiesViewTabUpdate = _props$props$Properti.propertiesViewTabUpdate,
          _props$props$Properti3 = _props$props$Properti.dimensions,
          dimensions = _props$props$Properti3 === undefined ? {} : _props$props$Properti3,
          height = _props$props$Properti.height,
          editorName = _props$props$Properti.editorName,
          onSave = _props$props$Properti.onSave,
          showReadOnly = _props$props$Properti.showReadOnly,
          showAvailability = _props$props$Properti.showAvailability,
          isProtein = _props$props$Properti.isProtein,
          disableSetReadOnly = _props$props$Properti.disableSetReadOnly,
          _props$props$Properti4 = _props$props$Properti.propertiesList,
          propertiesList = _props$props$Properti4 === undefined ? ["general", "features", "parts", "primers", "translations", "cutsites", "orfs", "genbank"] : _props$props$Properti4,
          closePanelButton = _props$props$Properti.closePanelButton;

      var width = dimensions.width,
          heightFromDim = dimensions.height;
      var tabId = propertiesTool.tabId,
          selectedAnnotationId = propertiesTool.selectedAnnotationId;

      if (propertiesList.map(function (nameOrOverride) {
        return nameOrOverride.name || nameOrOverride;
      }).indexOf(tabId) === -1) {
        tabId = propertiesList[0].name || propertiesList[0];
      }
      var propertiesTabs = propertiesList.map(function (nameOrOverride) {
        var name = nameOrOverride.name || nameOrOverride;
        var Comp = nameOrOverride.Comp || allTabs[name];
        if (isProtein) {
          if (name === "translations" || name === "orfs" || name === "primers" || name === "cutsites") {
            return null;
          }
        }
        return _react2.default.createElement(_core.Tab, {
          key: name,
          title: nameOrOverride.Comp ? name //just use the user supplied name because this is a custom panel
          : name === "orfs" ? "ORFs" : (0, _lodash.startCase)(name),
          id: name,
          panel: _react2.default.createElement(Comp, _extends({
            editorName: editorName,
            onSave: onSave,
            isProtein: isProtein,
            showReadOnly: showReadOnly,
            showAvailability: showAvailability,
            disableSetReadOnly: disableSetReadOnly,
            selectedAnnotationId: selectedAnnotationId
          }, nameOrOverride.name && nameOrOverride))
        });
      });

      return _react2.default.createElement(
        "div",
        {
          style: {
            position: "relative"
          }
        },
        closePanelButton,
        _react2.default.createElement(
          "div",
          {
            className: "ve-propertiesPanel",
            style: {
              display: "flex",
              width: width,
              height: Math.max(0, Number((heightFromDim || height) - 30)),
              zIndex: 10,
              padding: 10
              // paddingBottom: '31px',
            }
          },
          propertiesTabs.length ? _react2.default.createElement(
            _core.Tabs,
            {
              style: { width: width },
              renderActiveTabPanelOnly: true,
              selectedTabId: tabId,
              onChange: propertiesViewTabUpdate
            },
            _react2.default.createElement(_core.Tabs.Expander, null),
            propertiesTabs,
            _react2.default.createElement(_core.Tabs.Expander, null)
          ) : _react2.default.createElement(
            "div",
            { style: { margin: 20, fontSize: 20 } },
            "No Properties to display"
          )
        )
      );
    }
  }]);

  return PropertiesDialog;
}(_react2.default.Component);

exports.default = (0, _redux.compose)((0, _withEditorProps.connectToEditor)(function (_ref) {
  var propertiesTool = _ref.propertiesTool;

  return { propertiesTool: propertiesTool };
}))(PropertiesDialog);