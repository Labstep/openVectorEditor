"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VersionHistoryView = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@blueprintjs/core");

var _veSequenceUtils = require("ve-sequence-utils");

var _teselagenReactComponents = require("teselagen-react-components");

var _Editor = require("../Editor");

var _Editor2 = _interopRequireDefault(_Editor);

var _FillWindow = require("../Editor/FillWindow");

var _FillWindow2 = _interopRequireDefault(_FillWindow);

var _withEditorProps = require("../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SIDE_PANEL_WIDTH = 350;

// API for 3rd party use:
// getSequenceAtVersion: (versionId) => teselagenSequenceData
// getVersionList: () => [{ versionId: "51241", dateChanged: "12/30/1990", editedBy: "Hector Plahar", revisionType: "Feature Add"}]
// (already provided unless using VersionHistoryView directly) onSave: (event, sequenceDataToSave, editorState, onSuccessCallback) => { //same onSave handler as normal// },
// (not necessary unless using VersionHistoryView directly) exitVersionHistoryView() => {}
// (not necessary unless using VersionHistoryView directly) getCurrentSequenceData: () => teselagenSequenceData  //called upon initialization

var currentVersion = {
  dateChanged: "Current",
  id: "__current__"
};

var VersionHistoryView = exports.VersionHistoryView = function (_React$Component) {
  _inherits(VersionHistoryView, _React$Component);

  function VersionHistoryView() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, VersionHistoryView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VersionHistoryView.__proto__ || Object.getPrototypeOf(VersionHistoryView)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      selectedVersion: undefined,
      versionList: [currentVersion]
    }, _this.updateSeqData = function (sequenceData) {
      _this.activeSeqData = sequenceData;
      _this.props.vectorEditorInitialize({
        sequenceData: sequenceData && (0, _veSequenceUtils.tidyUpSequenceData)(sequenceData) || (0, _veSequenceUtils.tidyUpSequenceData)({
          sequence: "gTAGAGACAAGA"
        })
      }, {
        editorName: "veVersionHistoryView"
      });
    }, _this.componentDidMount = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this._getVersionList(); //trigger the initial grabbing of the list of versions
              _context.t0 = _this;
              _context.next = 4;
              return _this.getCurrentSeqData();

            case 4:
              _context.t1 = _context.sent;
              _context.next = 7;
              return _context.t0.updateSeqData.call(_context.t0, _context.t1);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.getCurrentSeqData = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!_this.props.getCurrentSequenceData) {
                _context2.next = 6;
                break;
              }

              _context2.next = 3;
              return _this.props.getCurrentSequenceData();

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 6:
              return _context2.abrupt("return", _this.props.sequenceData);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    })), _this.onRowSelect = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref5) {
        var _ref6 = _slicedToArray(_ref5, 1),
            row = _ref6[0];

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (row) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                if (!(row.id === "__current__")) {
                  _context3.next = 11;
                  break;
                }

                _context3.t0 = _this;
                _context3.next = 6;
                return _this.getCurrentSeqData();

              case 6:
                _context3.t1 = _context3.sent;

                _context3.t0.updateSeqData.call(_context3.t0, _context3.t1);

                _this.setState({ selectedVersion: null });
                _context3.next = 17;
                break;

              case 11:
                _context3.t2 = _this;
                _context3.next = 14;
                return _this.props.getSequenceAtVersion(row.versionId);

              case 14:
                _context3.t3 = _context3.sent;

                _context3.t2.updateSeqData.call(_context3.t2, _context3.t3);

                _this.setState({ selectedVersion: row });

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }(), _this._getVersionList = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var versionList;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this.props.getVersionList();

            case 2:
              versionList = _context4.sent;

              _this.setState({
                versionList: [currentVersion].concat(_toConsumableArray(versionList.map(function (r) {
                  return _extends({}, r, { id: r.versionId });
                }))) //currentVersion should always come first
              });

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this2);
    })), _this.revertToSelectedVersion = function () {
      if (!_this.props.onSave) {
        return console.error("props.onSave must be passed to VersionHistoryView");
      }
      var tidiedActiveData = (0, _veSequenceUtils.tidyUpSequenceData)(_this.activeSeqData, {
        annotationsAsObjects: true
      });
      _this.props.updateSequenceData && _this.props.updateSequenceData(tidiedActiveData);
      _this.props.caretPositionUpdate && _this.props.caretPositionUpdate(0);
      _this.props.onSave({}, tidiedActiveData, {}, //empty editor props
      function () {} //empty unSuccessCallback
      );
      _this.goBack();
    }, _this.goBack = function () {
      _this.props.exitVersionHistoryView && _this.props.exitVersionHistoryView();
      _this.props.toggleViewVersionHistory();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // static defaultProps = {
  //   getVersionList: () => {
  //     return [
  //       {
  //         dateChanged: "12/30/2211",
  //         editedBy: "thomas",
  //         revisionType: "thomas",
  //         versionId: 2
  //       }
  //     ];
  //   }
  // };


  _createClass(VersionHistoryView, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _FillWindow2.default,
        {
          style: { zIndex: 15000 },
          className: "tgFillWindow veVersionHistoryViewContainer"
        },
        function (_ref8) {
          var width = _ref8.width,
              height = _ref8.height;

          return _react2.default.createElement(
            "div",
            {
              style: { width: width, height: height, display: "flex" },
              className: "veVersionHistoryView"
            },
            _react2.default.createElement(_Editor2.default, {
              style: {
                flexBasis: "content",
                // flex: "0 0 200px",
                flex: "1 1 350px",
                width: width - SIDE_PANEL_WIDTH
              },
              noVersionHistory: true
              // fitHeight={true}
              , ToolBarProps: {
                toolList: ["cutsiteTool", "featureTool", "orfTool", "alignmentTool", "findTool", "visibilityTool"],
                contentLeft: _react2.default.createElement(
                  _core.Button,
                  {
                    onClick: _this3.goBack,
                    icon: "arrow-left",
                    style: { marginLeft: 5, marginRight: 5 }
                  },
                  "Back"
                )
              },
              editorName: "veVersionHistoryView"
            }),
            _react2.default.createElement(
              "div",
              {
                style: {
                  borderLeft: "1px solid grey",
                  padding: 3,
                  width: SIDE_PANEL_WIDTH,
                  minWidth: SIDE_PANEL_WIDTH,
                  // flexBasis: 350,
                  // width: 350,
                  // flexGrow: 1,
                  // flex: "2 1 350px",
                  // flexBasis: "content",
                  display: "flex",
                  flexDirection: "column"
                },
                className: "veVersionHistoryViewSidePanel"
              },
              _react2.default.createElement(
                "h2",
                { style: { width: "100%", textAlign: "center" } },
                " ",
                "Past Versions:",
                " "
              ),
              _react2.default.createElement(_teselagenReactComponents.DataTable, {
                noPadding: true,
                isSingleSelect: true,
                noDeselectAll: true,
                noFullscreenButton: true,
                onRowSelect: _this3.onRowSelect,
                maxHeight: 400,
                formName: "featureProperties",
                noRouter: true,
                compact: true,
                selectedIds: ["__current__"],
                withDisplayOptions: true,
                hideDisplayOptionsIcon: true,
                withSearch: false,
                name: "veVersionHistoryView",
                isInfinite: true,
                schema: {
                  fields: [{
                    path: "dateChanged",
                    type: "string"
                  }, { path: "editedBy", type: "string" }, { path: "revisionType", type: "string" }]
                },
                entities: _this3.state.versionList
              }),
              _react2.default.createElement(_core.Button, {
                style: { margin: 3 },
                intent: _core.Intent.PRIMARY,
                disabled: !_this3.state.selectedVersion,
                onClick: _this3.revertToSelectedVersion,
                text: "Revert to Selected Version"
              })
            )
          );
        }
      );
    }
  }]);

  return VersionHistoryView;
}(_react2.default.Component);

exports.default = (0, _withEditorProps2.default)(VersionHistoryView);