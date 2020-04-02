"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowView = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

// import TrMmInfScroll from "./TrMmInfScroll";

// import ReactList from './ReactVariable';


var _core = require("@blueprintjs/core");

var _draggableClassnames = require("../constants/draggableClassnames");

var _draggableClassnames2 = _interopRequireDefault(_draggableClassnames);

var _lodash = require("lodash");

var _prepareRowData = require("../utils/prepareRowData");

var _prepareRowData2 = _interopRequireDefault(_prepareRowData);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDraggable = require("react-draggable");

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _RowItem = require("../RowItem");

var _RowItem2 = _interopRequireDefault(_RowItem);

var _reactList = require("@teselagen/react-list");

var _reactList2 = _interopRequireDefault(_reactList);

var _withEditorInteractions = require("../withEditorInteractions");

var _withEditorInteractions2 = _interopRequireDefault(_withEditorInteractions);

var _estimateRowHeight = require("./estimateRowHeight");

var _estimateRowHeight2 = _interopRequireDefault(_estimateRowHeight);

var _rowviewContants = require("../constants/rowviewContants");

var _getBpsPerRow = require("../withEditorInteractions/getBpsPerRow");

var _getBpsPerRow2 = _interopRequireDefault(_getBpsPerRow);

require("./style.css");

var _editorUtils = require("../utils/editorUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import getCutsiteLabelHeights from "../RowItem/getCutsiteLabelHeights";
// import Combokeys from "combokeys";

function noop() {}

var rowJumpButtonStyle = {
  height: _estimateRowHeight.rowHeights.rowJumpButtons.height
};

var bounds = { top: 0, left: 0, right: 0, bottom: 0 };
var RowView = exports.RowView = (_temp2 = _class = function (_React$Component) {
  _inherits(RowView, _React$Component);

  function RowView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RowView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RowView.__proto__ || Object.getPrototypeOf(RowView)).call.apply(_ref, [this].concat(args))), _this), _this.shouldClearCache = function () {
      var _this$props = _this.props,
          annotationVisibility = _this$props.annotationVisibility,
          annotationLabelVisibility = _this$props.annotationLabelVisibility,
          sequenceData = _this$props.sequenceData;


      var toCompare = {
        bpsPerRow: (0, _getBpsPerRow2.default)(_this.props),
        annotationVisibility: annotationVisibility,
        annotationLabelVisibility: annotationLabelVisibility,
        stateTrackingId: sequenceData.stateTrackingId
      };
      if (!(0, _lodash.isEqual)(toCompare, _this.oldToCompare)) {
        _this.oldToCompare = toCompare;
        return true;
      }
    }, _this.estimateRowHeight = function (index, cache) {
      var _this$props2 = _this.props,
          annotationVisibility = _this$props2.annotationVisibility,
          annotationLabelVisibility = _this$props2.annotationLabelVisibility;

      return (0, _estimateRowHeight2.default)({
        index: index,
        cache: cache,
        showJumpButtons: _this.showJumpButtons,
        clearCache: _this.clearCache,
        row: _this.rowData[index],
        rowCount: _this.rowData.length,
        annotationVisibility: annotationVisibility,
        annotationLabelVisibility: annotationLabelVisibility
      });
    }, _this.getNearestCursorPositionToMouseEvent = function (rowData, event, callback) {
      var _this$props3 = _this.props,
          _this$props3$charWidt = _this$props3.charWidth,
          charWidth = _this$props3$charWidt === undefined ? _rowviewContants.defaultCharWidth : _this$props3$charWidt,
          sequenceLength = _this$props3.sequenceLength;

      var rowNotFound = true;
      var visibleRowsContainer = _this.InfiniteScroller && _this.InfiniteScroller.items;
      //loop through all the rendered rows to see if the click event lands in one of them
      var nearestCaretPos = 0;

      (0, _lodash.some)(visibleRowsContainer.childNodes, function (rowDomNode) {
        var boundingRowRect = rowDomNode.getBoundingClientRect();
        if (event.clientY > boundingRowRect.top && event.clientY < boundingRowRect.top + boundingRowRect.height) {
          //then the click is falls within this row
          rowNotFound = false;
          var row = rowData[Number(rowDomNode.getAttribute("data-row-number"))];
          if (event.clientX - boundingRowRect.left < 0) {
            nearestCaretPos = row.start;
          } else {
            var clickXPositionRelativeToRowContainer = event.clientX - boundingRowRect.left;
            var numberOfBPsInFromRowStart = Math.floor((clickXPositionRelativeToRowContainer + charWidth / 2) / charWidth);
            nearestCaretPos = numberOfBPsInFromRowStart + row.start;
            if (nearestCaretPos > row.end + 1) {
              nearestCaretPos = row.end + 1;
            }
          }
          return true; //break the loop early because we found the row the click event landed in
        }
      });
      if (rowNotFound) {
        var _visibleRowsContainer = visibleRowsContainer.getBoundingClientRect(),
            top = _visibleRowsContainer.top,
            bottom = _visibleRowsContainer.bottom;

        var numbers = [top, bottom];
        var target = event.clientY;
        var topOrBottom = numbers.map(function (value, index) {
          return [Math.abs(value - target), index];
        }).sort().map(function (value) {
          return numbers[value[1]];
        })[0];
        var rowDomNode = void 0;
        if (topOrBottom === top) {
          rowDomNode = visibleRowsContainer.childNodes[0];
        } else {
          rowDomNode = visibleRowsContainer.childNodes[visibleRowsContainer.childNodes.length - 1];
        }
        if (rowDomNode) {
          var row = rowData[Number(rowDomNode.getAttribute("data-row-number"))];
          //return the last bp index in the rendered rows
          nearestCaretPos = row.end;
        } else {
          nearestCaretPos = 0;
        }
      }
      if (_this.props.sequenceData.isProtein) {
        nearestCaretPos = Math.round(nearestCaretPos / 3) * 3;
      }
      if (sequenceLength === 0) nearestCaretPos = 0;
      callback({
        event: event,
        className: event.target.className,
        shiftHeld: event.shiftKey,
        nearestCaretPos: nearestCaretPos,
        selectionStartGrabbed: event.target.classList.contains(_draggableClassnames2.default.selectionStart),
        selectionEndGrabbed: event.target.classList.contains(_draggableClassnames2.default.selectionEnd)
      });
    }, _this.updateScrollPosition = function (oldProps, newProps) {
      _this.cache = {};
      if (_this.dragging === true) {
        return;
      }
      var _newProps$caretPositi = newProps.caretPosition,
          caretPosition = _newProps$caretPositi === undefined ? -1 : _newProps$caretPositi,
          _newProps$selectionLa = newProps.selectionLayer,
          selectionLayer = _newProps$selectionLa === undefined ? {} : _newProps$selectionLa,
          _newProps$matchedSear = newProps.matchedSearchLayer,
          matchedSearchLayer = _newProps$matchedSear === undefined ? {} : _newProps$matchedSear;
      var _oldProps$caretPositi = oldProps.caretPosition,
          caretPositionOld = _oldProps$caretPositi === undefined ? -1 : _oldProps$caretPositi,
          _oldProps$selectionLa = oldProps.selectionLayer,
          selectionLayerOld = _oldProps$selectionLa === undefined ? {} : _oldProps$selectionLa,
          _oldProps$matchedSear = oldProps.matchedSearchLayer,
          matchedSearchLayerOld = _oldProps$matchedSear === undefined ? {} : _oldProps$matchedSear;
      //UPDATE THE ROW VIEW'S POSITION BASED ON CARET OR SELECTION CHANGES
      // let previousBp;

      var scrollToBp = -1;
      if (matchedSearchLayer.start > -1 && (matchedSearchLayer.forceUpdate && matchedSearchLayer.forceUpdate !== matchedSearchLayerOld.forceUpdate || matchedSearchLayer.start !== matchedSearchLayerOld.start)) {
        // previousBp = matchedSearchLayerOld.start;
        scrollToBp = matchedSearchLayer.start;
      } else if (matchedSearchLayer.end > -1 && (matchedSearchLayer.forceUpdate && matchedSearchLayer.forceUpdate !== matchedSearchLayerOld.forceUpdate || matchedSearchLayer.end !== matchedSearchLayerOld.end)) {
        // previousBp = selectionLayerOld.end;
        scrollToBp = matchedSearchLayer.end;
      } else if (caretPosition > -1 && caretPosition !== caretPositionOld) {
        // previousBp = caretPositionOld;
        scrollToBp = caretPosition;
      } else if (selectionLayer.start > -1 && (selectionLayer.forceUpdate && selectionLayer.forceUpdate !== selectionLayerOld.forceUpdate && selectionLayer.forceUpdate !== "end" || selectionLayer.start !== selectionLayerOld.start)) {
        // previousBp = selectionLayerOld.start;
        scrollToBp = selectionLayer.start;
      } else if (selectionLayer.end > -1 && (selectionLayer.forceUpdate && selectionLayer.forceUpdate !== selectionLayerOld.forceUpdate && selectionLayer.forceUpdate !== "start" || selectionLayer.end !== selectionLayerOld.end)) {
        // previousBp = selectionLayerOld.end;
        scrollToBp = selectionLayer.end;
      }

      var bpsPerRow = (0, _getBpsPerRow2.default)(newProps);
      if (scrollToBp > -1 && _this.InfiniteScroller && _this.InfiniteScroller.scrollTo) {
        _this.calledUpdateScrollOnce = true;
        var rowToScrollTo = Math.floor(scrollToBp / bpsPerRow);

        var _this$InfiniteScrolle = _this.InfiniteScroller.getVisibleRange(),
            _this$InfiniteScrolle2 = _slicedToArray(_this$InfiniteScrolle, 2),
            start = _this$InfiniteScrolle2[0],
            end = _this$InfiniteScrolle2[1];
        // const jumpToBottomOfRow = scrollToBp > previousBp;


        if (rowToScrollTo < start || rowToScrollTo > end) {
          _this.InfiniteScroller.scrollTo(rowToScrollTo);
          clearInterval(_this.jumpIntervalId);
          //this will try to run the following logic at most 10 times with a 100ms pause between each
          _this.jumpIntervalId = setIntervalX(function () {
            if (!_this.InfiniteScroller) return; //this might be undefined if we've already unmounted

            var _this$InfiniteScrolle3 = _this.InfiniteScroller.items.querySelectorAll("[data-row-number=\"" + rowToScrollTo + "\"]"),
                _this$InfiniteScrolle4 = _slicedToArray(_this$InfiniteScrolle3, 1),
                el = _this$InfiniteScrolle4[0];

            if (!el) {
              //sometimes the el isn't on the page even after the jump because of drawing issues, so we'll try the scroll one more time
              _this.InfiniteScroller.scrollTo(rowToScrollTo);
              return;
            } else {
              clearInterval(_this.jumpIntervalId);
            }
            //tnr: we can't use the following because it messes up the scroll of the Reflex panels
            //causing the tabs to not be shown
            // el.scrollIntoView && el.scrollIntoView();
          }, 100, 10 //tnr: we could run this more than 5 times.. doesn't really matter
          );
        }
      }
    }, _this.cache = {}, _this.getRowData = function (sequenceData, bpsPerRow) {
      if (!(0, _lodash.isEqual)(bpsPerRow, _this.oldBpsPerRow) || !(0, _lodash.isEqual)(sequenceData, _this.oldSeqData)) {
        _this.rowData = (0, _prepareRowData2.default)(_extends({}, sequenceData, {
          features: sequenceData.filteredFeatures || sequenceData.features
        }), bpsPerRow);
        _this.oldBpsPerRow = bpsPerRow;
        _this.oldSeqData = sequenceData;
      }
      return _this.rowData;
    }, _this.renderItem = function (index) {
      if (_this.cache[index]) return _this.cache[index];

      var _this$props4 = _this.props,
          sequenceData = _this$props4.sequenceData,
          editorDragged = _this$props4.editorDragged,
          editorDragStarted = _this$props4.editorDragStarted,
          editorClicked = _this$props4.editorClicked,
          caretPosition = _this$props4.caretPosition,
          backgroundRightClicked = _this$props4.backgroundRightClicked,
          editorDragStopped = _this$props4.editorDragStopped,
          width = _this$props4.width,
          marginWidth = _this$props4.marginWidth,
          height = _this$props4.height,
          RowItemProps = _this$props4.RowItemProps,
          rest = _objectWithoutProperties(_this$props4, ["sequenceData", "editorDragged", "editorDragStarted", "editorClicked", "caretPosition", "backgroundRightClicked", "editorDragStopped", "width", "marginWidth", "height", "RowItemProps"]);

      var rowTopComp = void 0;
      var rowBottomComp = void 0;
      var rowData = _this.rowData;
      var bpsPerRow = _this.bpsPerRow;

      _this.showJumpButtons = rowData.length > 15;
      if (_this.showJumpButtons) {
        if (index === 0) {
          rowTopComp = _react2.default.createElement(
            "div",
            { style: rowJumpButtonStyle },
            _react2.default.createElement(
              _core.Button,
              {
                "data-test": "jumpToEndButton",
                onClick: function onClick(e) {
                  e.stopPropagation();
                  _this.InfiniteScroller && _this.InfiniteScroller.scrollTo(rowData.length);
                }
              },
              "Jump to end"
            )
          );
        } else if (index === rowData.length - 1) {
          rowBottomComp = _react2.default.createElement(
            "div",
            { style: rowJumpButtonStyle },
            _react2.default.createElement(
              _core.Button,
              {
                "data-test": "jumpToStartButton",
                onClick: function onClick(e) {
                  e.stopPropagation();
                  _this.InfiniteScroller && _this.InfiniteScroller.scrollTo(0);
                }
              },
              "Jump to start"
            )
          );
        }
      }
      if (rowData[index]) {
        var rowItem = _react2.default.createElement(
          "div",
          { "data-row-number": index, key: index },
          _react2.default.createElement("div", { className: "veRowItemSpacer" }),
          _react2.default.createElement(_RowItem2.default, _extends({}, _extends({}, rest, {
            rowTopComp: rowTopComp,
            rowBottomComp: rowBottomComp,
            isRowView: true,
            isProtein: sequenceData.isProtein,
            sequenceLength: sequenceData.sequence.length,
            bpsPerRow: bpsPerRow,
            caretPosition: caretPosition,
            emptyText: (0, _editorUtils.getEmptyText)({ sequenceData: sequenceData, caretPosition: caretPosition }),
            fullSequence: sequenceData.sequence
          }, RowItemProps), {
            row: rowData[index]
          }))
        );
        _this.cache[index] = rowItem;
        return rowItem;
      } else {
        return null;
      }
    }, _this.onDrag = function (event) {
      _this.dragging = true;
      var rowData = _this.rowData;
      _this.getNearestCursorPositionToMouseEvent(rowData, event, _this.props.editorDragged);
    }, _this.onStart = function (event) {
      _this.dragging = true;
      var rowData = _this.rowData;
      _this.getNearestCursorPositionToMouseEvent(rowData, event, _this.props.editorDragStarted);
    }, _this.onStop = function (e) {
      _this.dragging = false;
      _this.props.editorDragStopped(e);
    }, _this.getRef = function (ref) {
      return _this.node = ref;
    }, _this.onContextMenu = function (event) {
      _this.getNearestCursorPositionToMouseEvent(_this.rowData, event, _this.props.backgroundRightClicked);
    }, _this.onClick = function (event) {
      _this.getNearestCursorPositionToMouseEvent(_this.rowData, event, _this.props.editorClicked);
    }, _this.getReactListRef = function (c) {
      _this.InfiniteScroller = c;
      !_this.calledUpdateScrollOnce && _this.updateScrollPosition({}, _this.props); //trigger the scroll here as well because now we actually have the infinite scroller component accessible
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  //this function gives a fairly rough height estimate for the rows so that the ReactList can give a good guess of how much space to leave for scrolling and where to jump to in the sequence


  _createClass(RowView, [{
    key: "UNSAFE_componentWillReceiveProps",


    // componentDidMount() {
    //   this.mounted=true
    // }
    value: function UNSAFE_componentWillReceiveProps(props) {
      //we haven't yet called this function yet, so to make sure it jumps to the selected bps we just set a variable on the class
      this.updateScrollPosition(this.calledUpdateScrollOnce ? this.props : {}, props);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          sequenceData = _props.sequenceData,
          width = _props.width,
          marginWidth = _props.marginWidth,
          height = _props.height;

      if (width === "100%") {
        //we can't render an actual 100% width row view (we need a pixel measurement but we get passed width=100% by react-measure)
        return _react2.default.createElement("div", { style: { width: width, height: height || 300 } });
      }
      if (marginWidth < _rowviewContants.defaultMarginWidth) {
        marginWidth = _rowviewContants.defaultMarginWidth;
      }
      var containerWidthMinusMargin = width - marginWidth;
      var bpsPerRow = (0, _getBpsPerRow2.default)(this.props);
      this.bpsPerRow = bpsPerRow;

      //the width we pass to the rowitem needs to be the exact width of the bps so we need to trim off any extra space:
      // let containerWidthMinusMarginMinusAnyExtraSpaceUpTo1Bp =
      //  propsToUse.charWidth * bpsPerRow;
      var rowData = this.getRowData(sequenceData, bpsPerRow);
      this.rowData = rowData;

      var shouldClear = this.shouldClearCache();
      return _react2.default.createElement(
        _reactDraggable2.default
        // enableUserSelectHack={false} //needed to prevent the input bubble from losing focus post user drag
        ,
        { bounds: bounds,
          onDrag: this.onDrag,
          onStart: this.onStart,
          onStop: this.onStop
        },
        _react2.default.createElement(
          "div",
          {
            // tabIndex="0"
            ref: this.getRef,
            className: "veRowView",
            style: {
              overflowY: "auto",
              overflowX: "visible",
              height: height || 300,
              width: containerWidthMinusMargin + marginWidth,
              paddingLeft: marginWidth / 2,
              paddingRight: marginWidth / 2
            }
            // onScroll={disablePointers} //tnr: this doesn't actually help much with scrolling performance
            , onContextMenu: this.onContextMenu,
            onScroll: onScroll,
            onClick: this.onClick
          },
          _react2.default.createElement(_reactList2.default, {
            ref: this.getReactListRef,
            clearCache: shouldClear,
            itemRenderer: this.renderItem,
            length: rowData.length,
            itemSizeEstimator: this.estimateRowHeight,
            type: "variable"
          })
        )
      );
    }
  }]);

  return RowView;
}(_react2.default.Component), _class.defaultProps = {
  sequenceData: { sequence: "" },
  selectionLayer: {},
  // bpToJumpTo:0,
  editorDragged: noop,
  editorDragStarted: noop,
  editorClicked: noop,
  backgroundRightClicked: noop,
  editorDragStopped: noop,
  // onScroll: noop,
  width: _rowviewContants.defaultContainerWidth,
  marginWidth: _rowviewContants.defaultMarginWidth,
  height: 400,
  charWidth: _rowviewContants.defaultCharWidth,
  RowItemProps: {}
}, _temp2);
exports.default = (0, _withEditorInteractions2.default)(RowView);

// function itemSizeEstimator(index, cache) {
//   if (cache[index]) {
//     return cache[index];
//   }
//   return 400;
// }

// const disablePointers = () => {
//   clearTimeout(this.timer);
//   if(!document.body.classList.contains('disable-hover')) {
//     document.body.classList.add('disable-hover')
//   }

//   this.timer = setTimeout(function(){
//     document.body.classList.remove('disable-hover')
//   },0);
// }

// function onScroll() {
//   window.__veScrolling = true;
//   setTimeout(() => {
//     window.__veScrolling = false;
//   });
// }

function onScroll() {
  window.__veScrolling = true;
  setTimeout(endScroll);
}

var endScroll = (0, _lodash.debounce)(function () {
  window.__veScrolling = false;
}, 100);

function setIntervalX(callback, delay, repetitions) {
  var x = 0;
  var intervalID = window.setInterval(function () {
    callback();

    if (++x === repetitions) {
      window.clearInterval(intervalID);
    }
  }, delay);
  return intervalID;
}