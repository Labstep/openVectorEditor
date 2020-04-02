"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDraggable = require("react-draggable");

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _reactList = require("@teselagen/react-list");

var _reactList2 = _interopRequireDefault(_reactList);

var _Axis = require("../RowItem/Axis");

var _Axis2 = _interopRequireDefault(_Axis);

var _getXStartAndWidthFromNonCircularRange = require("../RowItem/getXStartAndWidthFromNonCircularRange");

var _getXStartAndWidthFromNonCircularRange2 = _interopRequireDefault(_getXStartAndWidthFromNonCircularRange);

var _reactEasyState = require("react-easy-state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Minimap = function (_React$Component) {
  _inherits(Minimap, _React$Component);

  function Minimap() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Minimap);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Minimap.__proto__ || Object.getPrototypeOf(Minimap)).call.apply(_ref, [this].concat(args))), _this), _this.handleMinimapClick = function (e) {
      if (_this.isDragging || e.target && e.target.classList.contains("minimapCaret")) {
        e.stopPropagation();
        return;
      }
      var _this$props = _this.props,
          onMinimapScrollX = _this$props.onMinimapScrollX,
          laneHeight = _this$props.laneHeight,
          scrollYToTrack = _this$props.scrollYToTrack,
          _this$props$dimension = _this$props.dimensions.width,
          width = _this$props$dimension === undefined ? 200 : _this$props$dimension;

      var scrollHandleWidth = _this.getScrollHandleWidth();
      var percent = (_this.getXPositionOfClickInMinimap(e) - scrollHandleWidth / 2) / (width - scrollHandleWidth);
      onMinimapScrollX(percent);

      //scroll vertically
      var y = _this.getYPositionOfClickInMinimap(e);
      var trackIndex = Math.floor(y / laneHeight);
      scrollYToTrack(trackIndex);
    }, _this.getCharWidth = function () {
      var _this$props2 = _this.props,
          _this$props2$alignmen = _this$props2.alignmentTracks,
          alignmentTracks = _this$props2$alignmen === undefined ? [] : _this$props2$alignmen,
          _this$props2$dimensio = _this$props2.dimensions.width,
          width = _this$props2$dimensio === undefined ? 200 : _this$props2$dimensio;

      var _alignmentTracks = _slicedToArray(alignmentTracks, 1),
          template = _alignmentTracks[0];

      var seqLength = template.alignmentData.sequence.length;
      var charWidth = Math.min(16, width / seqLength);
      return charWidth || 12;
    }, _this.getScrollHandleWidth = function () {
      var _this$props3 = _this.props,
          numBpsShownInLinearView = _this$props3.numBpsShownInLinearView,
          dimensions = _this$props3.dimensions;

      var charWidth = _this.getCharWidth();

      var _getXStartAndWidthFro = (0, _getXStartAndWidthFromNonCircularRange2.default)({ start: 0, end: Math.max(numBpsShownInLinearView - 1, 0) }, charWidth),
          width = _getXStartAndWidthFro.width;

      return Math.min(width, dimensions.width);
    }, _this.getXPositionOfClickInMinimap = function (e) {
      var leftStart = _this.minimap.getBoundingClientRect().left;
      return Math.max(e.clientX - leftStart, 0);
    }, _this.getYPositionOfClickInMinimap = function (e) {
      var topStart = _this.minimap.getBoundingClientRect().top;
      return Math.max(e.clientY + _this.minimapTracks.scrollTop - topStart, 0);
    }, _this.handleDragStop = function () {
      setTimeout(function () {
        _this.isDragging = false;
      }, 150);
    }, _this.handleDrag = function (e) {
      var _this$props4 = _this.props,
          onMinimapScrollX = _this$props4.onMinimapScrollX,
          _this$props4$dimensio = _this$props4.dimensions.width,
          width = _this$props4$dimensio === undefined ? 200 : _this$props4$dimensio;

      _this.isDragging = true; //needed to block erroneous click events from being triggered!
      var percent = _this.getXPositionOfClickInMinimap(e) / width;
      onMinimapScrollX(percent);
    }, _this.itemSizeGetter = function () {
      return _this.props.laneHeight;
    }, _this.renderItem = function (i) {
      var _this$props5 = _this.props,
          _this$props5$alignmen = _this$props5.alignmentTracks,
          alignmentTracks = _this$props5$alignmen === undefined ? [] : _this$props5$alignmen,
          _this$props5$dimensio = _this$props5.dimensions.width,
          width = _this$props5$dimensio === undefined ? 200 : _this$props5$dimensio,
          laneHeight = _this$props5.laneHeight,
          _this$props5$laneSpac = _this$props5.laneSpacing,
          laneSpacing = _this$props5$laneSpac === undefined ? 1 : _this$props5$laneSpac;

      var charWidth = _this.getCharWidth();

      var matchHighlightRanges = alignmentTracks[i].matchHighlightRanges;
      //need to get the chunks that can be rendered

      var redPath = ""; //draw these as just 1 path instead of a bunch of rectangles to improve browser performance
      var greyPath = "";
      // draw one grey rectangle then draw red/mismatching regions on top of it
      var height = laneHeight - laneSpacing;
      var y = 0;
      var firstRange = (0, _getXStartAndWidthFromNonCircularRange2.default)(matchHighlightRanges[0], charWidth);
      var lastRange = (0, _getXStartAndWidthFromNonCircularRange2.default)(matchHighlightRanges[matchHighlightRanges.length - 1], charWidth);
      greyPath += "M" + firstRange.xStart + "," + y + " L" + (lastRange.xStart + lastRange.width) + "," + y + " L" + (lastRange.xStart + lastRange.width) + "," + (y + height) + " L" + firstRange.xStart + "," + (y + height);
      matchHighlightRanges.forEach(function (range) {
        var _getXStartAndWidthFro2 = (0, _getXStartAndWidthFromNonCircularRange2.default)(range, charWidth),
            xStart = _getXStartAndWidthFro2.xStart,
            width = _getXStartAndWidthFro2.width;

        var toAdd = "M" + xStart + "," + y + " L" + (xStart + width) + "," + y + " L" + (xStart + width) + "," + (y + height) + " L" + xStart + "," + (y + height);
        if (!range.isMatch) {
          redPath += toAdd;
        }
      });
      return _react2.default.createElement(
        "div",
        {
          key: i + "-lane",
          style: { height: laneHeight, maxHeight: laneHeight }
        },
        _react2.default.createElement(
          "svg",
          {
            height: laneHeight,
            width: width,
            shapeRendering: "geometricPrecision"
          },
          _react2.default.createElement("path", { d: greyPath, fill: "grey" }),
          _react2.default.createElement("path", { d: redPath, fill: "red" })
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Minimap, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(newProps) {
      var props = this.props;

      if (["alignmentTracks", "numBpsShownInLinearView", "scrollAlignmentView", "laneHeight", "laneSpacing"].some(function (key) {
        return props[key] !== newProps[key];
      })) return true;
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$alignmentTrack = _props.alignmentTracks,
          alignmentTracks = _props$alignmentTrack === undefined ? [] : _props$alignmentTrack,
          _props$dimensions$wid = _props.dimensions.width,
          width = _props$dimensions$wid === undefined ? 200 : _props$dimensions$wid,
          laneHeight = _props.laneHeight,
          onSizeAdjust = _props.onSizeAdjust,
          minSliderSize = _props.minSliderSize,
          onMinimapScrollX = _props.onMinimapScrollX,
          easyStore = _props.easyStore;

      var _alignmentTracks2 = _slicedToArray(alignmentTracks, 1),
          template /* ...nonTemplates */ = _alignmentTracks2[0];

      var seqLength = template.alignmentData.sequence.length;
      var charWidth = this.getCharWidth();
      var scrollHandleWidth = this.getScrollHandleWidth();

      return _react2.default.createElement(
        "div",
        {
          ref: function ref(_ref3) {
            return _this2.minimap = _ref3;
          },
          className: "alignmentMinimap",
          style: {
            position: "relative",
            width: width,
            overflowX: "visible",
            overflowY: "hidden"
          },
          onClick: this.handleMinimapClick
        },
        _react2.default.createElement(
          "div",
          {
            ref: function ref(_ref2) {
              if (_ref2) {
                _this2.minimapTracks = _ref2;
              }
            },
            style: {
              maxHeight: 150,
              overflowY: "auto",
              position: "relative"
            },
            className: "alignmentMinimapTracks"
          },
          _react2.default.createElement(YellowScrollHandle, {
            width: width,
            handleDrag: this.handleDrag,
            handleDragStop: this.handleDragStop,
            onMinimapScrollX: onMinimapScrollX,
            minSliderSize: minSliderSize,
            onSizeAdjust: onSizeAdjust,
            easyStore: easyStore //we use react-easy-state here to prevent costly setStates from being called
            , scrollHandleWidth: scrollHandleWidth,
            alignmentTracks: alignmentTracks,
            laneHeight: laneHeight,
            minimapTracksPartialHeight: laneHeight * alignmentTracks.length
          }),
          _react2.default.createElement(_reactList2.default, {
            itemsRenderer: function itemsRenderer(items, ref) {
              return _react2.default.createElement(
                "div",
                { style: { marginTop: -3 }, ref: ref },
                items
              );
            },
            type: "uniform",
            itemSizeGetter: this.itemSizeGetter,
            itemRenderer: this.renderItem,
            length: alignmentTracks.length
          })
        ),
        _react2.default.createElement(_Axis2.default, {
          row: { start: 0, end: seqLength },
          tickSpacing: Math.floor(seqLength / 10),
          bpsPerRow: seqLength,
          charWidth: charWidth,
          annotationHeight: 15,
          sequenceLength: seqLength
        })
      );
    }
  }]);

  return Minimap;
}(_react2.default.Component);

exports.default = Minimap;

var YellowScrollHandle = (0, _reactEasyState.view)(function (_React$Component2) {
  _inherits(YellowScrollHandleInner, _React$Component2);

  function YellowScrollHandleInner() {
    _classCallCheck(this, YellowScrollHandleInner);

    return _possibleConstructorReturn(this, (YellowScrollHandleInner.__proto__ || Object.getPrototypeOf(YellowScrollHandleInner)).apply(this, arguments));
  }

  _createClass(YellowScrollHandleInner, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          scrollHandleWidth = _props2.scrollHandleWidth,
          width = _props2.width,
          easyStore = _props2.easyStore,
          handleDrag = _props2.handleDrag,
          handleDragStop = _props2.handleDragStop,
          minSliderSize = _props2.minSliderSize,
          laneHeight = _props2.laneHeight,
          onSizeAdjust = _props2.onSizeAdjust,
          minimapTracksPartialHeight = _props2.minimapTracksPartialHeight;
      var verticalVisibleRange = easyStore.verticalVisibleRange,
          percentScrolled = easyStore.percentScrolled;


      var xScroll = percentScrolled * (width - scrollHandleWidth);

      return _react2.default.createElement(
        _reactDraggable2.default,
        {
          bounds: "parent",
          zIndex: 105,
          handle: ".handle",
          position: { x: xScroll, y: 0 },
          axis: "x"
          // onStart={this.onStart}
          , onStop: handleDragStop,
          onDrag: handleDrag
        },
        _react2.default.createElement(
          "div",
          {
            style: {
              height: minimapTracksPartialHeight || 0,
              // height: "100%",
              border: "none",
              top: "0px",
              position: "absolute",
              zIndex: "10"
            }
          },
          _react2.default.createElement(
            _reactDraggable2.default,
            {
              bounds: {
                left: -xScroll,
                right: scrollHandleWidth - minSliderSize
              },
              zIndex: 105,
              position: { x: 0, y: 0 },
              axis: "x",
              onStart: function onStart(e, _ref4) {
                var x = _ref4.x;

                _this4.x = x;
              },
              onStop: function onStop(e, _ref5) {
                var x = _ref5.x;

                var deltaX = x - _this4.x;

                var newSliderSize = scrollHandleWidth - deltaX;
                //user is resizing to the left so we need to update the scroll percentage so the slider does not jump
                var newScrollPercent = Math.min(1, (xScroll + deltaX) / (width - newSliderSize));
                onSizeAdjust(newSliderSize, newScrollPercent);
              }
            },
            _react2.default.createElement("div", {
              style: {
                height: minimapTracksPartialHeight || 0,
                // height: "100%",
                border: "none",
                cursor: "ew-resize",
                opacity: "1",
                top: "0px",
                position: "absolute",
                zIndex: "10",
                width: 2,
                background: "black"
              },
              className: "minimapCaret"
            })
          ),
          _react2.default.createElement(
            "div",
            {
              className: "handle",
              dataname: "scrollGroup",
              style: {
                height: minimapTracksPartialHeight || 0,
                border: "none",
                cursor: "move",
                opacity: ".3",
                zIndex: "10",
                width: scrollHandleWidth,
                background: "yellow"
              }
            },
            _react2.default.createElement("div", {
              className: "verticalScrollDisplay",
              style: {
                height: (verticalVisibleRange.end - verticalVisibleRange.start + 1) * laneHeight,

                zIndex: "-10",
                background: "blue",
                position: "relative",
                top: verticalVisibleRange.start * laneHeight
              }
            })
          ),
          _react2.default.createElement(
            _reactDraggable2.default,
            {
              bounds: {
                right: minSliderSize + width - xScroll,
                left: minSliderSize
              },
              zIndex: 105,
              position: { x: scrollHandleWidth, y: 0 },
              axis: "x",
              onStart: function onStart(e, _ref6) {
                var x = _ref6.x;

                _this4.x = x;
              },
              onStop: function onStop(e, _ref7) {
                var x = _ref7.x;

                var deltaX = _this4.x - x;
                var newSliderSize = scrollHandleWidth - deltaX;
                onSizeAdjust(newSliderSize);

                //user is resizing to the right so we need to update the scroll percentage so the slider does not jump
                var newScrollPercent = xScroll / (width - newSliderSize);
                onSizeAdjust(newSliderSize, newScrollPercent);
              }
            },
            _react2.default.createElement("div", {
              style: {
                height: minimapTracksPartialHeight || 0,
                // height: "100%",
                border: "none",
                cursor: "ew-resize",
                opacity: "1",
                top: "0px",
                // right: 0,
                position: "absolute",
                zIndex: "10",
                width: 2,
                background: "black"
              },
              className: "minimapCaret"
            })
          )
        )
      );
    }
  }]);

  return YellowScrollHandleInner;
}(_react2.default.Component));
module.exports = exports["default"];