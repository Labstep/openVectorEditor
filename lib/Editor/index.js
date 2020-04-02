"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Editor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
// import sizeMe from "react-sizeme";

// import DrawChromatogram from "./DrawChromatogram";

// import * as customIcons from "teselagen-react-components";
// import { Button } from "@blueprintjs/core";

//tnr: this can be removed once https://github.com/leefsmp/Re-Flex/pull/30 is merged and deployed
/* eslint-disable */

/* eslint-enable */

var _lodash = require("lodash");

var _teselagenReactComponents = require("teselagen-react-components");

var _core = require("@blueprintjs/core");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dialogs = require("../Dialogs");

var _Dialogs2 = _interopRequireDefault(_Dialogs);

var _VersionHistoryView = require("../VersionHistoryView");

var _VersionHistoryView2 = _interopRequireDefault(_VersionHistoryView);

var _withEditorProps = require("../withEditorProps");

require("tg-react-reflex/styles.css");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _AlignmentView = require("../AlignmentView");

var _AlignmentView2 = _interopRequireDefault(_AlignmentView);

var _redux = require("redux");

var _recompose = require("recompose");

var _CommandHotkeyHandler = require("./CommandHotkeyHandler");

var _CommandHotkeyHandler2 = _interopRequireDefault(_CommandHotkeyHandler);

var _Reflex = require("../Reflex");

var _ToolBar = require("../ToolBar");

var _ToolBar2 = _interopRequireDefault(_ToolBar);

var _CircularView = require("../CircularView");

var _CircularView2 = _interopRequireDefault(_CircularView);

var _LinearView = require("../LinearView");

var _LinearView2 = _interopRequireDefault(_LinearView);

var _RowView = require("../RowView");

var _RowView2 = _interopRequireDefault(_RowView);

var _StatusBar = require("../StatusBar");

var _StatusBar2 = _interopRequireDefault(_StatusBar);

var _DropHandler = require("./DropHandler");

var _DropHandler2 = _interopRequireDefault(_DropHandler);

var _PropertiesDialog = require("../helperComponents/PropertiesDialog");

var _PropertiesDialog2 = _interopRequireDefault(_PropertiesDialog);

require("./style.css");

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _DigestTool = require("../DigestTool/DigestTool");

var _DigestTool2 = _interopRequireDefault(_DigestTool);

var _arrayUtils = require("../utils/arrayUtils");

var _Mismatches = require("../AlignmentView/Mismatches");

var _Mismatches2 = _interopRequireDefault(_Mismatches);

var _SimpleCircularOrLinearView = require("../SimpleCircularOrLinearView");

var _SimpleCircularOrLinearView2 = _interopRequireDefault(_SimpleCircularOrLinearView);

var _userDefinedHandlersAndOpts = require("./userDefinedHandlersAndOpts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

var _panelMap = {
  circular: _CircularView2.default,
  sequence: _RowView2.default,
  rail: _LinearView2.default,
  // alignmentTool: AlignmentTool,
  alignment: _AlignmentView2.default,
  digestTool: _DigestTool2.default,
  properties: {
    comp: _PropertiesDialog2.default,
    panelSpecificPropsToSpread: ["PropertiesProps"]
  },
  mismatches: _Mismatches2.default
};

// fake data generator
// a little function to help us with reordering the result
var reorder = function reorder(list, startIndex, endIndex) {
  var result = Array.from(list);

  var _result$splice = result.splice(startIndex, 1),
      _result$splice2 = _slicedToArray(_result$splice, 1),
      removed = _result$splice2[0];

  result.splice(endIndex, 0, removed);

  return result;
};
var tabHeight = 34;

var getListStyle = function getListStyle(isDraggingOver /* isDragging */) {
  return _extends({
    display: "flex",
    alignItems: "flex-end",
    flex: "0 0 auto",
    flexDirection: "row",
    overflowX: "auto", //can't be overflowX: "scroll" because firefox has issues with hiding the scroll bar https://github.com/TeselaGen/openVectorEditor/issues/352
    borderBottom: "1px solid lightgray",
    borderTop: "1px solid lightgray",
    paddingTop: 3,
    paddingBottom: 3
  }, isDraggingOver && { background: "#e5f3ff" });
};

var getSplitScreenListStyle = function getSplitScreenListStyle(isDraggingOver, isDragging) {
  return _extends({
    position: "absolute",
    // top: "-20px",
    height: "100%",
    // background: "lightgreen",
    width: "50%",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    wordWrap: "normal",
    opacity: 0
  }, isDragging && { opacity: 0.7, zIndex: 10000, background: "lightgrey" }, isDraggingOver && { background: "lightblue" }, {
    left: "50%"
  });
};

var Editor = exports.Editor = function (_React$Component) {
  _inherits(Editor, _React$Component);

  function Editor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Editor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Editor.__proto__ || Object.getPrototypeOf(Editor)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isHotkeyDialogOpen: false,
      tabDragging: false,
      previewModeFullscreen: false
    }, _this.getExtraPanel = function () /*panelOptions */{
      return [];
    }, _this.updateDimensions = (0, _lodash.debounce)(function () {
      // (this.hasFullscreenPanel || this.fitHeight) &&
      _this.setState({ randomRerenderTrigger: Math.random() });
    }, 100), _this.onTabDragStart = function () {
      _this.setState({ tabDragging: true });
    }, _this.onTabDragEnd = function (result) {
      _this.setState({ tabDragging: false });
      var _this$props = _this.props,
          panelsShownUpdate = _this$props.panelsShownUpdate,
          panelsShown = _this$props.panelsShown;
      // dropped outside the list

      if (!result.destination) {
        return;
      }

      var newPanelsShown = void 0;
      if (result.destination.droppableId !== result.source.droppableId) {
        //we're moving a tab from one group to another group
        newPanelsShown = (0, _lodash.map)([].concat(_toConsumableArray(panelsShown), _toConsumableArray(panelsShown.length === 1 && [[]])), function (panelGroup, groupIndex) {
          var panelToMove = panelsShown[Number(result.source.droppableId.replace("droppable-id-", ""))][result.source.index];
          if (Number(groupIndex) === Number(result.destination.droppableId.replace("droppable-id-", ""))) {
            //we're adding to this group
            return (0, _arrayUtils.insertItem)(panelGroup.map(function (tabPanel) {
              return _extends({}, tabPanel, { active: false });
            }), _extends({}, panelToMove, { active: true }), result.destination.index);
          } else if (Number(groupIndex) === Number(result.source.droppableId.replace("droppable-id-", ""))) {
            // we're removing from this group
            return (0, _arrayUtils.removeItem)(panelGroup, result.source.index).map(function (tabPanel, index) {
              return _extends({}, tabPanel, panelToMove.active && index === 0 && { active: true });
            });
          } else {
            return panelGroup;
          }
        });
      } else {
        //we're moving tabs within the same group
        newPanelsShown = (0, _lodash.map)(panelsShown, function (panelGroup, groupIndex) {
          if (Number(groupIndex) === Number(result.destination.droppableId.replace("droppable-id-", ""))) {
            //we'removing a tab around in this group
            return reorder(panelGroup.map(function (tabPanel, i) {
              return _extends({}, tabPanel, {
                active: result.source.index === i
              });
            }), result.source.index, result.destination.index);
          }
          return panelGroup;
        });
      }
      (0, _lodash.filter)(newPanelsShown, function (panelGroup) {
        return panelGroup.length;
      });
      panelsShownUpdate(newPanelsShown);
    }, _this.getPanelsToShow = function () {
      var panelsShown = _this.props.panelsShown;

      return (0, _lodash.map)(panelsShown);
    }, _this.onPreviewModeButtonContextMenu = function (e) {
      var previewModeButtonMenu = _this.props.previewModeButtonMenu;

      e.preventDefault();
      if (previewModeButtonMenu) {
        _core.ContextMenu.show(previewModeButtonMenu, {
          left: e.clientX,
          top: e.clientY
        });
      }
    }, _this.closeHotkeyDialog = function () {
      _this.setState({ isHotkeyDialogOpen: false });
    }, _this.openHotkeyDialog = function () {
      _this.setState({ isHotkeyDialogOpen: true });
    }, _this.togglePreviewFullscreen = function () {
      var togglePreviewFullscreen = _this.props.togglePreviewFullscreen;

      if (togglePreviewFullscreen) togglePreviewFullscreen();else {
        _this.setState({
          previewModeFullscreen: !_this.state.previewModeFullscreen
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Editor, [{
    key: "getChildContext",
    value: function getChildContext() {
      //tnrtodo this will need to be updated once blueprint uses the react 16 api
      return { blueprintPortalClassName: "ove-portal" };
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      //autosave if necessary!
      if (this.props.shouldAutosave && prevProps.sequenceData && prevProps.sequenceData.stateTrackingId && this.props.sequenceData.stateTrackingId !== prevProps.sequenceData.stateTrackingId) {
        this.props.handleSave();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("resize", this.updateDimensions);
      this.forceUpdate(); //we need to do this to get an accurate height measurement on first render
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var uncontrolledPreviewModeFullscreen = this.state.previewModeFullscreen;
      var _props = this.props,
          _props$ToolBarProps = _props.ToolBarProps,
          ToolBarProps = _props$ToolBarProps === undefined ? {} : _props$ToolBarProps,
          _props$StatusBarProps = _props.StatusBarProps,
          StatusBarProps = _props$StatusBarProps === undefined ? {} : _props$StatusBarProps,
          extraRightSidePanel = _props.extraRightSidePanel,
          editorName = _props.editorName,
          _height = _props.height,
          showCircularity = _props.showCircularity,
          hideSingleImport = _props.hideSingleImport,
          _props$minHeight = _props.minHeight,
          minHeight = _props$minHeight === undefined ? 400 : _props$minHeight,
          showMenuBar = _props.showMenuBar,
          _props$displayMenuBar = _props.displayMenuBarAboveTools,
          displayMenuBarAboveTools = _props$displayMenuBar === undefined ? true : _props$displayMenuBar,
          updateSequenceData = _props.updateSequenceData,
          readOnly = _props.readOnly,
          setPanelAsActive = _props.setPanelAsActive,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style,
          _props$maxAnnotations = _props.maxAnnotationsToDisplay,
          maxAnnotationsToDisplay = _props$maxAnnotations === undefined ? {} : _props$maxAnnotations,
          togglePanelFullScreen = _props.togglePanelFullScreen,
          collapseSplitScreen = _props.collapseSplitScreen,
          expandTabToSplitScreen = _props.expandTabToSplitScreen,
          closePanel = _props.closePanel,
          onSave = _props.onSave,
          caretPositionUpdate = _props.caretPositionUpdate,
          getVersionList = _props.getVersionList,
          getSequenceAtVersion = _props.getSequenceAtVersion,
          VersionHistoryViewProps = _props.VersionHistoryViewProps,
          _props$sequenceData = _props.sequenceData,
          sequenceData = _props$sequenceData === undefined ? {} : _props$sequenceData,
          fullScreenOffsets = _props.fullScreenOffsets,
          withPreviewMode = _props.withPreviewMode,
          isFullscreen = _props.isFullscreen,
          handleFullscreenClose = _props.handleFullscreenClose,
          _props$onlyShowLabels = _props.onlyShowLabelsThatDoNotFit,
          onlyShowLabelsThatDoNotFit = _props$onlyShowLabels === undefined ? true : _props$onlyShowLabels,
          controlledPreviewModeFullscreen = _props.previewModeFullscreen,
          previewModeButtonMenu = _props.previewModeButtonMenu;


      if (!this.props.noVersionHistory && this.props.versionHistory && this.props.versionHistory.viewVersionHistory) {
        return _react2.default.createElement(_VersionHistoryView2.default, _extends({
          onSave: onSave, //we need to pass this user defined handler
          updateSequenceData: updateSequenceData,
          caretPositionUpdate: caretPositionUpdate,
          editorName: editorName,
          sequenceData: sequenceData,
          getVersionList: getVersionList,
          getSequenceAtVersion: getSequenceAtVersion
        }, VersionHistoryViewProps));
      }
      var previewModeFullscreen = !!(uncontrolledPreviewModeFullscreen || controlledPreviewModeFullscreen || isFullscreen);
      var editorNode = document.querySelector(".veEditor") || document.querySelector(".preview-mode-container");

      var height = Math.max(minHeight, editorNode && editorNode.parentNode && editorNode.parentNode.clientHeight || 0);

      if (_height) height = Math.max(minHeight, _height);

      var editorDimensions = {
        height: height,
        dimensions: {
          height: height
        }
      };

      if (withPreviewMode && !previewModeFullscreen) {
        return _react2.default.createElement(
          "div",
          { style: _extends({}, style), className: "preview-mode-container" },
          _react2.default.createElement(
            "div",
            { style: { position: "relative" } },
            _react2.default.createElement(
              "div",
              { className: "preview-mode-buttons" },
              _react2.default.createElement(
                _core.ButtonGroup,
                { className: "preview-mode-view-fullscreen" },
                _react2.default.createElement(_core.Button, {
                  text: "Open Editor",
                  intent: _core.Intent.PRIMARY,
                  onClick: this.togglePreviewFullscreen
                }),
                previewModeButtonMenu && _react2.default.createElement(_core.Button, {
                  icon: "caret-down",
                  intent: _core.Intent.PRIMARY,
                  onClick: this.onPreviewModeButtonContextMenu
                })
              )
            ),
            _react2.default.createElement(
              "div",
              {
                style: { padding: 40 },
                className: "preview-mode-simple-sequence-view"
              },
              _react2.default.createElement(_SimpleCircularOrLinearView2.default, {
                sequenceData: sequenceData,
                tabHeight: tabHeight,
                editorName: editorName,
                height: null,
                isProtein: sequenceData.isProtein,
                annotationLabelVisibility: {
                  features: false,
                  parts: false,
                  cutsites: false,
                  primers: false
                }
              })
            )
          )
        );
      }

      var tabDragging = this.state.tabDragging;

      var xOffset = 0;
      var yOffset = 0;
      if (fullScreenOffsets) {
        xOffset = fullScreenOffsets.xOffset || 0;
        yOffset = fullScreenOffsets.yOffset || 0;
      }
      var w = window,
          d = document,
          e = d.documentElement,
          g = d.getElementsByTagName("body")[0],
          x = w.innerWidth || e.clientWidth || g.clientWidth,
          y = w.innerHeight || e.clientHeight || g.clientHeight;
      var windowDimensions = {
        width: x - xOffset,
        height: Math.max(y, minHeight) - yOffset
        //  document.body.getBoundingClientRect().height
      };
      var reflexElementProps = {
        propagateDimensions: true,
        // resizeHeight: true,
        renderOnResizeRate: 50,
        renderOnResize: true,
        className: "ve-panel"
      };

      var panelsToShow = this.getPanelsToShow();
      this.hasFullscreenPanel = false;
      (0, _lodash.map)(panelsToShow, function (panelGroup) {
        panelGroup.forEach(function (_ref2) {
          var fullScreen = _ref2.fullScreen;

          if (fullScreen) _this2.hasFullscreenPanel = true;
        });
      });
      var pickedUserDefinedHandlersAndOpts = (0, _lodash.pick)(this.props, _userDefinedHandlersAndOpts.userDefinedHandlersAndOpts);
      var panels = (0, _lodash.flatMap)(panelsToShow, function (panelGroup, index) {
        // let activePanelId
        var activePanelId = void 0;
        var activePanelType = void 0;
        var isFullScreen = void 0;
        var panelPropsToSpread = {};
        panelGroup.forEach(function (panelProps) {
          var type = panelProps.type,
              id = panelProps.id,
              active = panelProps.active,
              fullScreen = panelProps.fullScreen;

          if (fullScreen) isFullScreen = true;
          if (active) {
            activePanelType = type || id;
            activePanelId = id;
            panelPropsToSpread = panelProps;
          }
        });
        if (_this2.hasFullscreenPanel && !isFullScreen) {
          return;
        }

        if (isFullScreen) {
          editorDimensions = _extends({}, editorDimensions, windowDimensions, {
            dimensions: windowDimensions
          });
        }
        var panelMap = _extends({}, _panelMap, _this2.props.panelMap);

        var Panel = panelMap[activePanelType] && panelMap[activePanelType].comp || panelMap[activePanelType];
        var panelSpecificProps = panelMap[activePanelType] && panelMap[activePanelType].panelSpecificProps;
        var panelSpecificPropsToSpread = panelMap[activePanelType] && panelMap[activePanelType].panelSpecificPropsToSpread;
        var panel = Panel ? _react2.default.createElement(Panel, _extends({}, pickedUserDefinedHandlersAndOpts, panelSpecificProps && (0, _lodash.pick)(_this2.props, panelSpecificProps), panelSpecificPropsToSpread && panelSpecificPropsToSpread.reduce(function (acc, key) {
          acc = _extends({}, acc, (0, _lodash.get)(_this2.props, key));
          return acc;
        }, {}), {
          maxAnnotationsToDisplay: maxAnnotationsToDisplay,
          key: activePanelId,
          rightClickOverrides: _this2.props.rightClickOverrides,
          clickOverrides: _this2.props.clickOverrides
        }, panelPropsToSpread, {
          editorName: editorName,
          isProtein: sequenceData.isProtein,
          onlyShowLabelsThatDoNotFit: onlyShowLabelsThatDoNotFit,
          tabHeight: tabHeight
        }, editorDimensions, {
          isInsideEditor: true //pass this prop to let the sub components know they're being rendered as an editor tab
        })) : _react2.default.createElement(
          "div",
          null,
          " No Panel Found!"
        );

        var showTabRightClickContextMenu = function showTabRightClickContextMenu(e, id) {
          var tabIdToUse = id || activePanelId;
          (0, _teselagenReactComponents.showContextMenu)([{
            onClick: function onClick() {
              panelsToShow.length > 1 ? collapseSplitScreen(tabIdToUse) : expandTabToSplitScreen(tabIdToUse);
            },
            text: panelsToShow.length > 1 ? "Collapse Split Screen" : "View in Split Screen"
          }, {
            onClick: function onClick() {
              togglePanelFullScreen(tabIdToUse);
            },
            text: "View in Fullscreen"
          }], undefined, e);
          e.preventDefault();
          e.stopPropagation();
        };

        var toReturn = [];
        if (index > 0) {
          toReturn.push(_react2.default.createElement(_Reflex.ReflexSplitter, {
            key: activePanelId + "splitter",
            style: {
              // height: height + 38,
              zIndex: 1
            },
            propagate: true
          }));
        }
        toReturn.push(_react2.default.createElement(
          _Reflex.ReflexElement,
          _extends({
            key: activePanelId,
            activePanelId: activePanelId,
            minSize: "200"
          }, reflexElementProps),
          [_react2.default.createElement(
            _reactBeautifulDnd.Droppable //the tab holder
            ,
            { key: "droppable-id-" + index.toString(),
              direction: "horizontal",
              droppableId: "droppable-id-" + index.toString()
            },
            function (provided, snapshot) {
              return _react2.default.createElement(
                "div",
                {
                  className: "ve-draggable-tabs",
                  "data-test": "ve-draggable-tabs" + index,
                  ref: provided.innerRef,
                  style: _extends({
                    height: tabHeight,
                    paddingLeft: 3
                  }, getListStyle(snapshot.isDraggingOver /* , tabDragging */))
                },
                panelGroup.map(function (_ref3, index) {
                  var id = _ref3.id,
                      name = _ref3.name,
                      canClose = _ref3.canClose;

                  return _react2.default.createElement(
                    _reactBeautifulDnd.Draggable,
                    { key: id, index: index, draggableId: id },
                    function (provided, snapshot) {
                      return _react2.default.createElement(
                        "div",
                        {
                          style: {
                            wordWrap: "normal",
                            flex: "0 0 auto",
                            maxWidth: "100%",
                            fontSize: "14px"
                          },
                          onClick: function onClick() {
                            setPanelAsActive(id);
                          }
                        },
                        _react2.default.createElement(
                          "div",
                          _extends({
                            onContextMenu: function onContextMenu(e) {
                              showTabRightClickContextMenu(e, id);
                            },
                            ref: provided.innerRef
                          }, provided.draggableProps, provided.dragHandleProps, {
                            style: _extends({
                              // some basic styles to make the items look a bit nicer
                              userSelect: "none",
                              // change background colour if dragging
                              background: snapshot.isDragging ? "lightgreen" : "none",
                              cursor: "move",
                              flex: "0 0 auto"
                            }, provided.draggableProps.style)
                          }),
                          _react2.default.createElement(
                            "div",
                            {
                              style: {
                                padding: 3,
                                borderBottom: id === activePanelId ? "2px solid #106ba3" : "none",
                                color: id === activePanelId ? "#106ba3" : "undefined",
                                marginLeft: 13,
                                marginRight: 13
                              },
                              className: (id === activePanelId ? "veTabActive " : "") + (0, _lodash.camelCase)("veTab-" + (name || id))
                            },
                            isFullScreen && _react2.default.createElement(
                              "div",
                              { //we need this div to wrap the tooltip to help the tooltip stay in the correct position https://github.com/TeselaGen/openVectorEditor/issues/436
                                style: {
                                  zIndex: 15002,
                                  position: "fixed",
                                  top: 15,
                                  right: 25
                                }
                              },
                              _react2.default.createElement(
                                _core.Tooltip,
                                {
                                  position: "left",
                                  content: "Minimize Tab"
                                },
                                _react2.default.createElement(_core.Button, {
                                  minimal: true,
                                  icon: "minimize",
                                  onClick: function onClick() {
                                    togglePanelFullScreen(activePanelId);
                                  }
                                })
                              )
                            ),
                            name || id,
                            canClose && _react2.default.createElement(_core.Icon, {
                              icon: "small-cross",
                              onClick: function onClick() {
                                closePanel(id);
                              },
                              style: { paddingLeft: 5 },
                              className: "ve-clickable"
                            })
                          )
                        ),
                        provided.placeholder
                      );
                    }
                  );
                }),
                provided.placeholder
              );
            }
          )].concat(_toConsumableArray(panelsToShow.length === 1 ? [_react2.default.createElement(
            _reactBeautifulDnd.Droppable //extra add tab box (only shown when there is 1 tab being shown)!
            ,
            { key: "extra-drop-box",
              direction: "horizontal",
              droppableId: "droppable-id-" + (index + 1).toString()
            },
            function (provided, snapshot) {
              return _react2.default.createElement(
                "div",
                {
                  ref: provided.innerRef,
                  style: getSplitScreenListStyle(snapshot.isDraggingOver, tabDragging)
                },
                _react2.default.createElement(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: "45%",
                      top: "45%",
                      fontSize: 26
                    }
                  },
                  " ",
                  "+ Add Tab"
                ),
                provided.placeholder
              );
            }
          )] : []), [isFullScreen ? _react2.default.createElement(
            "div",
            {
              key: "veWhiteBackground",
              className: "veWhiteBackground",
              style: _extends({
                zIndex: 15000,
                position: "fixed",
                top: 0,
                left: 0
              }, windowDimensions)
            },
            panel
          ) : panel])
        ));
        return toReturn;
      });
      if (extraRightSidePanel) {
        panels.push(_react2.default.createElement(_Reflex.ReflexSplitter, {
          key: "extraRightSidePanelSplitter",
          style: {
            zIndex: 1
          },
          propagate: true
        }));

        panels.push(_react2.default.createElement(
          _Reflex.ReflexElement,
          _extends({
            key: "extraRightSidePanel",
            minSize: "350",
            maxSize: "350"
          }, reflexElementProps),
          extraRightSidePanel
        ));
      }

      return _react2.default.createElement(
        _DropHandler2.default,
        {
          key: "dropHandler",
          importSequenceFromFile: this.props.importSequenceFromFile,
          disabled: readOnly || hideSingleImport,
          style: _extends({
            width: "100%",
            maxWidth: "100%",
            // ...(fitHeight && {
            // height: "100%",
            //  }),
            position: "relative",
            // height: "100%",
            // ...(fitHeight && {
            height: height,
            minHeight: minHeight,
            display: "flex",
            flexDirection: "column"
          }, previewModeFullscreen && _extends({
            background: "white",
            zIndex: 15000,
            position: "fixed",
            // paddingTop: 20,
            top: yOffset || 0,
            left: xOffset || 0
          }, windowDimensions), style),
          className: "veEditor"
        },
        _react2.default.createElement(_Dialogs2.default, _extends({
          editorName: editorName
        }, pickedUserDefinedHandlersAndOpts, (0, _lodash.pick)(this.props, _Dialogs.dialogOverrides))),
        _react2.default.createElement(_ToolBar2.default, _extends({}, pickedUserDefinedHandlersAndOpts, {
          openHotkeyDialog: this.openHotkeyDialog,
          key: "toolbar",
          showMenuBar: showMenuBar,
          displayMenuBarAboveTools: displayMenuBarAboveTools,
          handleFullscreenClose: handleFullscreenClose || this.togglePreviewFullscreen,
          isProtein: sequenceData.isProtein,
          userDefinedHandlersAndOpts: _userDefinedHandlersAndOpts.userDefinedHandlersAndOpts,
          closeFullscreen: !!(isFullscreen ? handleFullscreenClose : previewModeFullscreen)
        }, {
          modifyTools: this.props.modifyTools,
          contentLeft: this.props.contentLeft,
          editorName: editorName,
          toolList: this.props.toolList
        }, {
          withDigestTool: true
        }, ToolBarProps)),
        _react2.default.createElement(_CommandHotkeyHandler2.default, _extends({
          menuSearchHotkey: this.props.menuSearchHotkey,
          hotkeyDialogProps: {
            isOpen: this.state.isHotkeyDialogOpen,
            onClose: this.closeHotkeyDialog
          }
        }, pickedUserDefinedHandlersAndOpts, {
          editorName: editorName
        })),
        _react2.default.createElement(
          "div",
          {
            style: {
              position: "relative",
              flexGrow: "1",
              minHeight: 0,
              display: "flex"
            },
            className: "tg-editor-container",
            id: "section-to-print"
          },
          _react2.default.createElement(
            _reactBeautifulDnd.DragDropContext,
            {
              onDragStart: this.onTabDragStart,
              onDragEnd: this.onTabDragEnd
            },
            _react2.default.createElement(
              _Reflex.ReflexContainer,
              {
                onPanelCollapse: function onPanelCollapse(_ref4) {
                  var activePanelId = _ref4.activePanelId;

                  _this2.props.collapsePanel(activePanelId);
                }
                /* style={{}} */, orientation: "vertical"
              },
              panels
            )
          )
        ),
        _react2.default.createElement(_StatusBar2.default, _extends({}, pickedUserDefinedHandlersAndOpts, {
          isProtein: sequenceData.isProtein,
          showCircularity: showCircularity && !sequenceData.isProtein,
          editorName: editorName
        }, StatusBarProps))
      );
    }
  }]);

  return Editor;
}(_react2.default.Component);

Editor.childContextTypes = {
  blueprintPortalClassName: _propTypes2.default.string
};

exports.default = (0, _redux.compose)((0, _withEditorProps.connectToEditor)(function (_ref5) {
  var panelsShown = _ref5.panelsShown,
      versionHistory = _ref5.versionHistory,
      _ref5$sequenceData = _ref5.sequenceData,
      sequenceData = _ref5$sequenceData === undefined ? {} : _ref5$sequenceData;

  return {
    panelsShown: panelsShown,
    versionHistory: versionHistory,
    sequenceData: sequenceData
  };
}), (0, _recompose.withHandlers)({ handleSave: _withEditorProps.handleSave, importSequenceFromFile: _withEditorProps.importSequenceFromFile }))(Editor);