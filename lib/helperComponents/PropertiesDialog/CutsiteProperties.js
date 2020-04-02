"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _teselagenReactComponents = require("teselagen-react-components");

var _lodash = require("lodash");

var _EnzymeViewer = require("../../EnzymeViewer");

var _EnzymeViewer2 = _interopRequireDefault(_EnzymeViewer);

var _defaultEnzymeList = require("../../redux/utils/defaultEnzymeList.json");

var _defaultEnzymeList2 = _interopRequireDefault(_defaultEnzymeList);

var _CutsiteFilter = require("../../CutsiteFilter");

var _CutsiteFilter2 = _interopRequireDefault(_CutsiteFilter);

var _core = require("@blueprintjs/core");

var _withEditorProps = require("../../withEditorProps");

var _recompose = require("recompose");

var _selectors = require("../../selectors");

var _selectors2 = _interopRequireDefault(_selectors);

var _commands = require("../../commands");

var _commands2 = _interopRequireDefault(_commands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { Button } from "@blueprintjs/core";
// import { getRangeLength, convertRangeTo1Based } from "ve-range-utils";

var CutsiteProperties = function (_React$Component) {
  _inherits(CutsiteProperties, _React$Component);

  function CutsiteProperties(props) {
    _classCallCheck(this, CutsiteProperties);

    var _this = _possibleConstructorReturn(this, (CutsiteProperties.__proto__ || Object.getPrototypeOf(CutsiteProperties)).call(this, props));

    _this.onRowSelect = function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          record = _ref2[0];

      if (!record) return;
      var _this$props = _this.props,
          dispatch = _this$props.dispatch,
          editorName = _this$props.editorName;

      dispatch({
        type: "CARET_POSITION_UPDATE",
        payload: record.topSnipPosition,
        meta: {
          editorName: editorName
        }
      });
    };

    _this.SubComponent = function (row) {
      // const { selectionLayerUpdate } = this.props;
      var _row$original = row.original,
          name = _row$original.name,
          cutsiteGroup = _row$original.cutsiteGroup;

      var entities = cutsiteGroup.sort(function (a, b) {
        return a.topSnipPosition - b.topSnipPosition;
      }).map(function (_ref3) {
        var _ref3$restrictionEnzy = _ref3.restrictionEnzyme;
        _ref3$restrictionEnzy = _ref3$restrictionEnzy === undefined ? {} : _ref3$restrictionEnzy;
        var forwardRegex = _ref3$restrictionEnzy.forwardRegex,
            reverseRegex = _ref3$restrictionEnzy.reverseRegex,
            forward = _ref3.forward,
            id = _ref3.id,
            topSnipBeforeBottom = _ref3.topSnipBeforeBottom,
            topSnipPosition = _ref3.topSnipPosition,
            bottomSnipPosition = _ref3.bottomSnipPosition;

        return {
          id: id,
          topSnipPosition: topSnipPosition,
          position: topSnipBeforeBottom ? topSnipPosition + " - " + bottomSnipPosition : bottomSnipPosition + " - " + topSnipPosition,
          strand: forwardRegex === reverseRegex ? "Palindromic" : forward ? "1" : "-1"
        };
      });
      var enzyme = _defaultEnzymeList2.default[name.toLowerCase()];
      // return <div>yooo</div>
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          {
            className: "ve-enzymeSubrow",
            style: {
              margin: 10
            }
          },
          enzyme && _react2.default.createElement(_EnzymeViewer2.default, {
            sequence: enzyme.site,
            reverseSnipPosition: enzyme.bottomSnipOffset,
            forwardSnipPosition: enzyme.topSnipOffset
          }),
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_teselagenReactComponents.DataTable, {
              style: { minHeight: 0, maxHeight: 200 },
              selectedIds: _this.props.selectedAnnotationId,
              maxHeight: 300,
              onRowSelect: _this.onRowSelect,
              formName: "cutLocations",
              isSingleSelect: true,
              compact: true,
              noRouter: true,
              minimalStyle: true,
              scrollToSelectedRowRelativeToDom: true,
              noHeader: true,
              isSimple: true,
              noFullscreenButton: true,
              isInfinite: true,
              withSearch: false,
              withFilter: false,
              schema: _this.subComponentSchemna,
              entities: entities
            })
          )
        )
      );
    };

    _this.subComponentSchemna = {
      fields: [{ path: "topSnipPosition", label: "Top Snip", type: "string" }, { path: "position", type: "string" }, { path: "strand", type: "string" }]
    };
    _this.schema = {
      fields: [{ path: "name", type: "string" }, { path: "numberOfCuts", type: "number" }]
    };

    _this.onChangeHook = function () {
      _this.props.annotationVisibilityShow("cutsites");
    };

    _this.commands = (0, _commands2.default)(_this);
    return _this;
  }

  _createClass(CutsiteProperties, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          editorName = _props.editorName,
          createNewDigest = _props.createNewDigest,
          allCutsites = _props.filteredCutsites,
          selectedAnnotationId = _props.selectedAnnotationId;
      var cutsitesByName = allCutsites.cutsitesByName,
          cutsitesById = allCutsites.cutsitesById;


      var cutsitesToUse = (0, _lodash.map)(cutsitesByName, function (cutsiteGroup, name) {
        return {
          cutsiteGroup: cutsiteGroup,
          id: name,
          name: name,
          numberOfCuts: cutsiteGroup.length
          // size: getRangeLength(cutsiteGroup, sequenceData.sequence.length)
        };
      });
      return _react2.default.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column" } },
        _react2.default.createElement(
          "div",
          {
            style: {
              marginBottom: 10,
              paddingTop: 10,
              display: "flex",
              alignItems: "center"
            }
          },
          _react2.default.createElement(_teselagenReactComponents.CmdCheckbox, { prefix: "Show ", cmd: this.commands.toggleCutsites }),
          _react2.default.createElement(_core.Button, {
            style: { marginLeft: 10, cursor: "auto" },
            disabled: true,
            minimal: true,
            icon: "filter"
          }),
          _react2.default.createElement(_CutsiteFilter2.default, {
            style: { flexGrow: 2 },
            editorName: editorName,
            onChangeHook: this.onChangeHook
          }),
          _react2.default.createElement(
            _core.Button,
            {
              style: { marginLeft: 15, flexGrow: -1 },
              onClick: function onClick() {
                createNewDigest();
              }
            },
            "Virtual Digest"
          )
        ),
        _react2.default.createElement(_teselagenReactComponents.DataTable, {
          selectedIds: (0, _lodash.get)(cutsitesById[selectedAnnotationId], "restrictionEnzyme.name"),
          compact: true,
          noSelect: true,
          noHeader: true,
          noFooter: true,
          withExpandAndCollapseAllButton: true,
          noFullscreenButton: true,
          noPadding: true,
          defaults: { order: ["numberOfCuts"] },
          maxHeight: 400,
          formName: "cutsiteProperties",
          noRouter: true,
          withSearch: false,
          SubComponent: this.SubComponent,
          isInfinite: true,
          schema: this.schema,
          entities: cutsitesToUse
        })
      );
    }
  }]);

  return CutsiteProperties;
}(_react2.default.Component);

exports.default = (0, _recompose.compose)((0, _withEditorProps.connectToEditor)(function (editorState) {
  var cutsites = _selectors2.default.filteredCutsitesSelector(editorState);
  return {
    annotationVisibility: editorState.annotationVisibility || {},
    filteredCutsites: cutsites,
    cutsites: cutsites.cutsitesArray
  };
}), (0, _teselagenReactComponents.withSelectedEntities)("cutsiteProperties"))(CutsiteProperties);
module.exports = exports["default"];