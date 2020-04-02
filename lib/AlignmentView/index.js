"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clipboard = require("clipboard");

var _clipboard2 = _interopRequireDefault(_clipboard);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _core = require("@blueprintjs/core");

var _teselagenReactComponents = require("teselagen-react-components");

var _reactEasyState = require("react-easy-state");

var _lodash = require("lodash");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _veSequenceUtils = require("ve-sequence-utils");

var _reactList = require("@teselagen/react-list");

var _reactList2 = _interopRequireDefault(_reactList);

var _LinearView = require("../LinearView");

var _Minimap = require("./Minimap");

var _Minimap2 = _interopRequireDefault(_Minimap);

var _recompose = require("recompose");

var _AlignmentVisibilityTool = require("./AlignmentVisibilityTool");

var _AlignmentVisibilityTool2 = _interopRequireDefault(_AlignmentVisibilityTool);

var _alignments = require("../redux/alignments");

var alignmentActions = _interopRequireWildcard(_alignments);

var _estimateRowHeight = require("../RowView/estimateRowHeight");

var _estimateRowHeight2 = _interopRequireDefault(_estimateRowHeight);

var _prepareRowData = require("../utils/prepareRowData");

var _prepareRowData2 = _interopRequireDefault(_prepareRowData);

var _withEditorProps = require("../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

require("./style.css");

var _util = require("util");

var _clickAndDragUtils = require("../withEditorInteractions/clickAndDragUtils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nameDivWidth = 140;
var charWidthInLinearViewDefault = 12;
try {
  var newVal = JSON.parse(window.localStorage.getItem("charWidthInLinearViewDefault"));
  if (newVal) charWidthInLinearViewDefault = newVal;
} catch (e) {
  console.error("error setting charWidthInLinearViewDefault from local storage:", e);
}
// @HotkeysTarget

var AlignmentView = function (_React$Component) {
  _inherits(AlignmentView, _React$Component);

  function AlignmentView(props) {
    _classCallCheck(this, AlignmentView);

    var _this = _possibleConstructorReturn(this, (AlignmentView.__proto__ || Object.getPrototypeOf(AlignmentView)).call(this, props));

    _this.handleAlignmentCopy = function (event) {
      if (event.key === "c" && (event.metaKey === true || event.ctrlKey === true)) {
        var input = document.createElement("textarea");
        document.body.appendChild(input);
        var seqDataToCopy = _this.getAllAlignmentsFastaText();
        input.value = seqDataToCopy;
        input.select();
        var copySuccess = document.execCommand("copy");
        if (!copySuccess) {
          window.toastr.error("Selection Not Copied");
        } else {
          window.toastr.success("Selection Copied");
        }
        document.body.removeChild(input);
        event.preventDefault();
      }
    };

    _this.getAllAlignmentsFastaText = function () {
      var selectionLayer = _this.props.store.getState().VectorEditor.__allEditorsOptions.alignments[_this.props.id].selectionLayer || {};
      var alignmentTracks = _this.props.alignmentTracks;

      var seqDataOfAllTracksToCopy = [];
      alignmentTracks.forEach(function (track) {
        var seqDataToCopy = (0, _veSequenceUtils.getSequenceDataBetweenRange)(track.alignmentData, selectionLayer).sequence;
        seqDataOfAllTracksToCopy.push(">" + track.alignmentData.name + "\r\n" + seqDataToCopy + "\r\n");
      });
      return seqDataOfAllTracksToCopy.join("");
    };

    _this.state = {
      charWidthInLinearView: charWidthInLinearViewDefault,
      scrollAlignmentView: false,
      width: 0
    };
    _this.easyStore = (0, _reactEasyState.store)({
      percentScrolled: 0,
      verticalVisibleRange: { start: 0, end: 0 }
    });

    _this.getMinCharWidth = function () {
      var toReturn = Math.min(Math.max(_this.state.width - nameDivWidth - 5, 1) / _this.getSequenceLength(), 10);
      if (isNaN(toReturn)) return 10;
      return toReturn;
    };

    _this.getSequenceLength = function () {
      var _this$props$alignment = _this.props.alignmentTracks;
      _this$props$alignment = _this$props$alignment === undefined ? [] : _this$props$alignment;

      var _this$props$alignment2 = _slicedToArray(_this$props$alignment, 1),
          template = _this$props$alignment2[0];

      return template.alignmentData.sequence.length || 1;
    };

    _this.annotationClicked = function (_ref) {
      var event = _ref.event,
          annotation = _ref.annotation,
          _ref$gapsBefore = _ref.gapsBefore,
          gapsBefore = _ref$gapsBefore === undefined ? 0 : _ref$gapsBefore,
          _ref$gapsInside = _ref.gapsInside,
          gapsInside = _ref$gapsInside === undefined ? 0 : _ref$gapsInside;

      event.preventDefault && event.preventDefault();
      event.stopPropagation && event.stopPropagation();
      _this.updateSelectionOrCaret(event.shiftKey, _extends({}, annotation, {
        start: annotation.start + gapsBefore,
        end: annotation.end + gapsBefore + gapsInside
      }));
    };

    _this.updateSelectionOrCaret = function (shiftHeld, newRangeOrCaret) {
      var _this$props = _this.props,
          selectionLayer = _this$props.selectionLayer,
          caretPosition = _this$props.caretPosition;

      var sequenceLength = _this.getSequenceLength();
      (0, _clickAndDragUtils.updateSelectionOrCaret)({
        shiftHeld: shiftHeld,
        sequenceLength: sequenceLength,
        newRangeOrCaret: newRangeOrCaret,
        caretPosition: caretPosition,
        selectionLayer: selectionLayer,
        selectionLayerUpdate: _this.selectionLayerUpdate,
        caretPositionUpdate: _this.caretPositionUpdate
      });
    };

    _this.caretPositionUpdate = function (position) {
      var _this$props2 = _this.props,
          _this$props2$caretPos = _this$props2.caretPosition,
          caretPosition = _this$props2$caretPos === undefined ? -1 : _this$props2$caretPos,
          alignmentId = _this$props2.alignmentId,
          alignmentRunUpdate = _this$props2.alignmentRunUpdate;

      if (caretPosition === position) {
        return;
      }
      alignmentRunUpdate({
        alignmentId: alignmentId,
        selectionLayer: { start: -1, end: -1 },
        caretPosition: position
      });
    };

    _this.selectionLayerUpdate = function (newSelection) {
      var _this$props3 = _this.props,
          _this$props3$selectio = _this$props3.selectionLayer,
          selectionLayer = _this$props3$selectio === undefined ? { start: -1, end: -1 } : _this$props3$selectio,
          alignmentId = _this$props3.alignmentId,
          alignmentRunUpdate = _this$props3.alignmentRunUpdate;

      if (!newSelection) return;
      var start = newSelection.start,
          end = newSelection.end;

      if (selectionLayer.start === start && selectionLayer.end === end) {
        return;
      }
      alignmentRunUpdate({
        alignmentId: alignmentId,
        selectionLayer: newSelection,
        caretPosition: -1
      });
    };

    _this.getCharWidthInLinearView = function () {
      if (_this.props.isFullyZoomedOut) {
        return _this.getMinCharWidth();
      } else {
        return Math.max(_this.getMinCharWidth(), _this.state.charWidthInLinearView);
      }
    };

    _this.getNumBpsShownInLinearView = function () {
      var toReturn = (_this.state.width - nameDivWidth) / _this.getCharWidthInLinearView();
      return toReturn || 0;
    };

    _this.setVerticalScrollRange = (0, _lodash.throttle)(function () {
      if (_this && _this.InfiniteScroller && _this.InfiniteScroller.getFractionalVisibleRange && _this.easyStore) {
        var _this$InfiniteScrolle = _this.InfiniteScroller.getFractionalVisibleRange(),
            _this$InfiniteScrolle2 = _slicedToArray(_this$InfiniteScrolle, 2),
            start = _this$InfiniteScrolle2[0],
            end = _this$InfiniteScrolle2[1];

        if (_this.easyStore.verticalVisibleRange.start !== start || _this.easyStore.verticalVisibleRange.end !== end) _this.easyStore.verticalVisibleRange = { start: start, end: end };
      }
    }, 100);

    _this.handleScroll = function () {
      if (_this.alignmentHolder.scrollTop !== _this.oldAlignmentHolderScrollTop) {
        setTimeout(function () {
          _this.setVerticalScrollRange();
          _this.oldAlignmentHolderScrollTop = _this.alignmentHolder.scrollTop;
        }, 100);
      }
      if (_this.blockScroll) {
        //we have to block the scroll sometimes when adjusting the minimap so things aren't too jumpy
        return;
      }

      var scrollPercentage = _this.alignmentHolder.scrollLeft / (_this.alignmentHolder.scrollWidth - _this.alignmentHolder.clientWidth);
      _this.easyStore.percentScrolled = scrollPercentage || 0;
      if (_this.alignmentHolderTop) {
        _this.alignmentHolderTop.scrollLeft = _this.alignmentHolder.scrollLeft;
      }
    };

    _this.handleTopScroll = function () {
      _this.alignmentHolder.scrollLeft = _this.alignmentHolderTop.scrollLeft;
    };

    _this.onMinimapSizeAdjust = function (newSliderSize, newPercent) {
      var percentageOfSpace = newSliderSize / (_this.state.width - nameDivWidth);
      var seqLength = _this.getSequenceLength();
      var numBpsInView = seqLength * percentageOfSpace;
      var newCharWidth = (_this.state.width - nameDivWidth) / numBpsInView;
      _this.blockScroll = true;
      _this.setCharWidthInLinearView({ charWidthInLinearView: newCharWidth });
      setTimeout(function () {
        _this.updateXScrollPercentage(newPercent);
        _this.blockScroll = false;
      });
    };

    _this.setCharWidthInLinearView = function (_ref2) {
      var charWidthInLinearView = _ref2.charWidthInLinearView;

      window.localStorage.setItem("charWidthInLinearViewDefault", charWidthInLinearView);
      _this.setState({ charWidthInLinearView: charWidthInLinearView });
      charWidthInLinearViewDefault = JSON.parse(window.localStorage.getItem("charWidthInLinearViewDefault"));
    };

    _this.updateXScrollPercentage = function (scrollPercentage) {
      _this.easyStore.percentScrolled = scrollPercentage;
      _this.alignmentHolder.scrollLeft = Math.min(Math.max(scrollPercentage, 0), 1) * (_this.alignmentHolder.scrollWidth - _this.alignmentHolder.clientWidth);
      if (_this.alignmentHolderTop) {
        _this.alignmentHolderTop.scrollLeft = Math.min(Math.max(scrollPercentage, 0), 1) * (_this.alignmentHolderTop.scrollWidth - _this.alignmentHolderTop.clientWidth);
      }
    };

    _this.scrollYToTrack = function (trackIndex) {
      _this.InfiniteScroller.scrollTo(trackIndex);
    };

    _this.estimateRowHeight = function (index, cache) {
      var _this$props4 = _this.props,
          alignmentVisibilityToolOptions = _this$props4.alignmentVisibilityToolOptions,
          alignmentTracks = _this$props4.alignmentTracks;
      var sequenceData = alignmentTracks[index].sequenceData;

      _this.rowData = (0, _prepareRowData2.default)(sequenceData, sequenceData.sequence.length);
      return (0, _estimateRowHeight2.default)({
        index: index,
        cache: cache,
        // clearCache: this.clearCache,
        row: _this.rowData[index],
        annotationVisibility: alignmentVisibilityToolOptions.alignmentAnnotationVisibility,
        annotationLabelVisibility: alignmentVisibilityToolOptions.alignmentAnnotationLabelVisibility
      });
    };

    _this.renderItem = function (_i, key, isTemplate) {
      var charWidthInLinearView = _this.getCharWidthInLinearView();

      var _this$props5 = _this.props,
          _this$props5$alignmen = _this$props5.alignmentTracks,
          alignmentTracks = _this$props5$alignmen === undefined ? [] : _this$props5$alignmen,
          noClickDragHandlers = _this$props5.noClickDragHandlers,
          handleSelectTrack = _this$props5.handleSelectTrack,
          linearViewOptions = _this$props5.linearViewOptions,
          alignmentVisibilityToolOptions = _this$props5.alignmentVisibilityToolOptions,
          hasTemplate = _this$props5.hasTemplate,
          rest = _objectWithoutProperties(_this$props5, ["alignmentTracks", "noClickDragHandlers", "handleSelectTrack", "linearViewOptions", "alignmentVisibilityToolOptions", "hasTemplate"]);

      var i = void 0;
      if (isTemplate) {
        i = _i;
      } else if (hasTemplate) {
        i = _i + 1;
      } else {
        i = _i;
      }

      var track = alignmentTracks[i];

      var sequenceData = track.sequenceData,
          alignmentData = track.alignmentData,
          additionalSelectionLayers = track.additionalSelectionLayers,
          chromatogramData = track.chromatogramData;

      var linearViewWidth = (alignmentData || sequenceData).sequence.length * charWidthInLinearView;
      var name = sequenceData.name || sequenceData.id;

      function getGapMap(sequence) {
        var gapMap = [0]; //a map of position to how many gaps come before that position [0,0,0,5,5,5,5,17,17,17, ]
        sequence.split("").forEach(function (char) {
          if (char === "-") {
            gapMap[Math.max(0, gapMap.length - 1)] = (gapMap[Math.max(0, gapMap.length - 1)] || 0) + 1;
          } else {
            gapMap.push(gapMap[gapMap.length - 1] || 0);
          }
        });
        return gapMap;
      }

      var getGaps = function getGaps() {
        return {
          gapsBefore: 0,
          gapsInside: 0
        };
      };
      //this function is used to calculate the number of spaces that come before or inside a range
      getGaps = function getGaps(rangeOrCaretPosition, sequence) {
        var gapMap = getGapMap(sequence);
        if ((typeof rangeOrCaretPosition === "undefined" ? "undefined" : _typeof(rangeOrCaretPosition)) !== "object") {
          return {
            gapsBefore: gapMap[Math.min(rangeOrCaretPosition, gapMap.length - 1)]
          };
        }
        //otherwise it is a range!
        var start = rangeOrCaretPosition.start,
            end = rangeOrCaretPosition.end;

        var toReturn = {
          gapsBefore: gapMap[start],
          gapsInside: gapMap[Math.min(end, gapMap.length - 1)] - gapMap[Math.min(start, gapMap.length - 1)]
        };

        return toReturn;
      };

      // for alignment of sanger seq reads to a ref seq, have translations show up at the bp pos of ref seq's CDS features across all seq reads
      var sequenceDataWithRefSeqCdsFeatures = void 0;
      if (_this.props.alignmentType === "SANGER SEQUENCING") {
        if (i !== 0) {
          sequenceDataWithRefSeqCdsFeatures = (0, _lodash.cloneDeep)(sequenceData);
          var refSeqCdsFeaturesBpPos = [];
          alignmentTracks[0].sequenceData.features.forEach(function (feature) {
            if (feature.type === "CDS") {
              var editedFeature = (0, _lodash.cloneDeep)(feature);
              // in seq reads, ref seq's CDS feature translations need to show up at the bp pos of alignment, not the original bp pos
              // actual position in the track
              var absoluteFeatureStart = getGaps(feature.start, alignmentTracks[0].alignmentData.sequence).gapsBefore + feature.start;
              var gapsBeforeSeqRead = getGaps(0, alignmentData.sequence).gapsBefore;
              var bpsFromSeqReadStartToFeatureStartIncludingGaps = absoluteFeatureStart - gapsBeforeSeqRead;
              var absoluteFeatureEnd = getGaps(feature.end, alignmentTracks[0].alignmentData.sequence).gapsBefore + feature.end;
              // const gapsBeforeFeatureInSeqRead = getGaps(feature.start - gapsBeforeSeqRead, alignmentData.sequence).gapsBefore
              var gapsAfterSeqRead = alignmentData.sequence.length - (0, _lodash.cloneDeep)(alignmentData.sequence).replace(/-+$/g, "").length;
              var seqReadLengthWithoutGapsBeforeAfter = alignmentData.sequence.length - gapsBeforeSeqRead - gapsAfterSeqRead;
              var absoluteSeqReadStart = gapsBeforeSeqRead;
              var absoluteSeqReadEnd = absoluteSeqReadStart + seqReadLengthWithoutGapsBeforeAfter;
              var featureStartInSeqRead = void 0;
              if (absoluteFeatureEnd < absoluteSeqReadStart) {
                // if the feature ends before the seq read starts, do nothing
              } else if (absoluteFeatureStart > absoluteSeqReadEnd) {
                // if the feature starts after the seq read ends, do nothing
              } else if (absoluteFeatureStart < absoluteSeqReadStart && absoluteFeatureEnd > absoluteSeqReadStart) {
                // if the feature starts before the seq read starts but doesn't end before the seq read starts
                var arrayOfCodonStartPos = [];
                for (var _i2 = absoluteFeatureStart; _i2 < absoluteSeqReadStart + 6; _i2 += 3) {
                  arrayOfCodonStartPos.push(_i2);
                }
                // want to start translation at the codon start pos closest to seq read start
                var absoluteTranslationStartInFrame = arrayOfCodonStartPos.reduce(function (prev, curr) {
                  return Math.abs(curr - absoluteSeqReadStart) < Math.abs(prev - absoluteSeqReadStart) && curr >= absoluteSeqReadStart ? curr : prev;
                });
                var seqReadTranslationStartInFrame = absoluteTranslationStartInFrame - gapsBeforeSeqRead;
                editedFeature.start = seqReadTranslationStartInFrame;
                var shortenedFeatureLength = Math.abs(absoluteFeatureEnd - absoluteFeatureStart) - (absoluteTranslationStartInFrame - absoluteFeatureStart);
                editedFeature.end = editedFeature.start + shortenedFeatureLength;
                refSeqCdsFeaturesBpPos.push(editedFeature);
              } else {
                // if the feature is fully contained within the seq read start/end
                var seqReadStartToFeatureStartIncludingGaps = alignmentData.sequence.replace(/^-+/g, "").replace(/-+$/g, "").slice(0, bpsFromSeqReadStartToFeatureStartIncludingGaps);
                var arrayOfGaps = seqReadStartToFeatureStartIncludingGaps.match(new RegExp("-", "g"));
                var numOfGapsFromSeqReadStartToFeatureStart = 0;
                if (arrayOfGaps !== null) {
                  numOfGapsFromSeqReadStartToFeatureStart = arrayOfGaps.length;
                }
                featureStartInSeqRead = bpsFromSeqReadStartToFeatureStartIncludingGaps - numOfGapsFromSeqReadStartToFeatureStart;
                editedFeature.start = featureStartInSeqRead;
                var featureLength = Math.abs(feature.end - feature.start);
                editedFeature.end = editedFeature.start + featureLength;
                refSeqCdsFeaturesBpPos.push(editedFeature);
              }
            }
          });
          // add ref seq's CDS features to seq reads (not the actual sequenceData) to generate translations at those bp pos
          if (refSeqCdsFeaturesBpPos.length !== 0) {
            var _sequenceDataWithRefS;

            (_sequenceDataWithRefS = sequenceDataWithRefSeqCdsFeatures.features).push.apply(_sequenceDataWithRefS, refSeqCdsFeaturesBpPos);
            // use returned aligned sequence rather than original sequence because after bowtie2, may be reverse complement or have soft-clipped ends
            sequenceDataWithRefSeqCdsFeatures.sequence = alignmentData.sequence.replace(/-/g, "");
          }
        }
      }

      return _react2.default.createElement(
        "div",
        {
          className: "alignmentViewTrackContainer",
          style: {
            boxShadow: isTemplate ? "red 0px -1px 0px 0px inset, red 0px 1px 0px 0px inset" : "0px -1px 0px 0px inset",
            display: "flex",
            position: "relative"
          },
          key: i
        },
        _react2.default.createElement(
          "div",
          {
            className: "alignmentTrackName",
            style: {
              position: "sticky",
              // left: 130,
              left: 0,
              zIndex: 10,
              boxShadow: isTemplate ? "0px 0px 0px 1px red inset" : "0px -3px 0px -2px inset, 3px -3px 0px -2px inset, -3px -3px 0px -2px inset",
              width: nameDivWidth,
              padding: 2,
              paddingBottom: 0,
              minWidth: nameDivWidth,
              // textOverflow: "ellipsis",
              overflowY: "auto",
              // overflowX: "visible",
              whiteSpace: "nowrap"
            },
            title: name,
            key: i
          },
          _react2.default.createElement(
            "div",
            {
              className: "alignmentTrackNameDiv",
              style: {
                background: "blue",
                display: "inline-block",
                color: "white",
                borderRadius: 5,
                opacity: 0.7
              }
            },
            name
          )
        ),
        handleSelectTrack && !isTemplate && _react2.default.createElement(
          "div",
          {
            onClick: function onClick() {
              handleSelectTrack(i);
            },
            style: {
              position: "absolute",
              opacity: 0,
              height: "100%",
              left: nameDivWidth,
              width: linearViewWidth,
              fontWeight: "bolder",
              cursor: "pointer",
              padding: 5,
              textAlign: "center",
              zIndex: 400
            },
            className: "alignmentViewSelectTrackPopover veWhiteBackground"
          },
          "Inspect track"
        ),
        _react2.default.createElement(_LinearView.NonReduxEnhancedLinearView, _extends({}, rest, noClickDragHandlers ? {
          caretPosition: -1,
          selectionLayer: { start: -1, end: -1 }
        } : {
          editorDragged: _this.editorDragged,
          editorClicked: _this.editorClicked,
          editorDragStarted: _this.editorDragStarted,
          editorDragStopped: _this.editorDragStopped
        }, {
          annotationVisibilityOverrides: alignmentVisibilityToolOptions.alignmentAnnotationVisibility,
          linearViewAnnotationLabelVisibilityOverrides: alignmentVisibilityToolOptions.alignmentAnnotationLabelVisibility,
          marginWith: 0,
          orfClicked: _this.annotationClicked,
          primerClicked: _this.annotationClicked,
          translationClicked: _this.annotationClicked,
          cutsiteClicked: _this.annotationClicked,
          translationDoubleClicked: _this.annotationClicked,
          deletionLayerClicked: _this.annotationClicked,
          replacementLayerClicked: _this.annotationClicked,
          featureClicked: _this.annotationClicked,
          partClicked: _this.annotationClicked,
          searchLayerClicked: _this.annotationClicked,
          selectionLayerRightClicked: function selectionLayerRightClicked(_ref3) {
            var event = _ref3.event;

            (0, _teselagenReactComponents.showContextMenu)([{
              text: "Copy Selection of All Alignments as Fasta",
              className: "copyAllAlignmentsFastaClipboardHelper",
              hotkey: "cmd+c",
              willUnmount: function willUnmount() {
                _this.copyAllAlignmentsFastaClipboardHelper && _this.copyAllAlignmentsFastaClipboardHelper.destroy();
              },
              didMount: function didMount() {
                _this.copyAllAlignmentsFastaClipboardHelper = new _clipboard2.default(".copyAllAlignmentsFastaClipboardHelper", {
                  action: "copyAllAlignmentsFasta",
                  text: function text() {
                    return _this.getAllAlignmentsFastaText();
                  }
                });
              },
              onClick: function onClick() {
                window.toastr.success("Selection Copied");
              }
            }, {
              text: "Copy Selection of " + name + " as Fasta",
              className: "copySpecificAlignmentFastaClipboardHelper",
              willUnmount: function willUnmount() {
                _this.copySpecificAlignmentFastaClipboardHelper && _this.copySpecificAlignmentFastaClipboardHelper.destroy();
              },
              didMount: function didMount() {
                _this.copySpecificAlignmentFastaClipboardHelper = new _clipboard2.default(".copySpecificAlignmentFastaClipboardHelper", {
                  action: "copySpecificAlignmentFasta",
                  text: function text() {
                    var _ref4 = _this.props.store.getState().VectorEditor.__allEditorsOptions.alignments[_this.props.id] || {},
                        selectionLayer = _ref4.selectionLayer;

                    var seqDataToCopy = (0, _veSequenceUtils.getSequenceDataBetweenRange)(alignmentData, selectionLayer).sequence;
                    var seqDataToCopyAsFasta = ">" + name + "\r\n" + seqDataToCopy + "\r\n";
                    return seqDataToCopyAsFasta;
                  }
                });
              },
              onClick: function onClick() {
                window.toastr.success("Selection Copied As Fasta");
              }
            }, {
              text: "Copy Selection of " + name,
              className: "copySpecificAlignmentAsPlainClipboardHelper",
              willUnmount: function willUnmount() {
                _this.copySpecificAlignmentAsPlainClipboardHelper && _this.copySpecificAlignmentAsPlainClipboardHelper.destroy();
              },
              didMount: function didMount() {
                _this.copySpecificAlignmentAsPlainClipboardHelper = new _clipboard2.default(".copySpecificAlignmentAsPlainClipboardHelper", {
                  action: "copySpecificAlignmentFasta",
                  text: function text() {
                    var _ref5 = _this.props.store.getState().VectorEditor.__allEditorsOptions.alignments[_this.props.id] || {},
                        selectionLayer = _ref5.selectionLayer;

                    var seqDataToCopy = (0, _veSequenceUtils.getSequenceDataBetweenRange)(alignmentData, selectionLayer).sequence;
                    return seqDataToCopy;
                  }
                });
              },
              onClick: function onClick() {
                window.toastr.success("Selection Copied");
              }
            }], undefined, event);
          },
          hideName: true,
          sequenceData: sequenceData,
          sequenceDataWithRefSeqCdsFeatures: sequenceDataWithRefSeqCdsFeatures,
          tickSpacing: Math.ceil(120 / charWidthInLinearView),
          allowSeqDataOverride: true, //override the sequence data stored in redux so we can track the caret position/selection layer in redux but not have to update the redux editor
          editorName: (isTemplate ? "template_" : "") + "alignmentView" + i,
          alignmentData: alignmentData,
          chromatogramData: chromatogramData,
          height: "100%",
          vectorInteractionWrapperStyle: {
            overflowY: "hidden"
          },

          charWidth: charWidthInLinearView,
          ignoreGapsOnHighlight: true
        }, linearViewOptions && ((0, _util.isFunction)(linearViewOptions) ? linearViewOptions({
          index: i,
          isTemplate: isTemplate,
          alignmentVisibilityToolOptions: alignmentVisibilityToolOptions,
          sequenceData: sequenceData,
          alignmentData: alignmentData,
          chromatogramData: chromatogramData
        }) : linearViewOptions), {
          additionalSelectionLayers: additionalSelectionLayers,
          dimensions: {
            width: linearViewWidth
          },
          width: linearViewWidth
          // scrollData: {
          //   viewportWidth: trackWidth,
          //   fractionScrolled: this.easyStore
          // }
        }))
      );
    };

    _this.handleResize = (0, _lodash.throttle)(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 1),
          e = _ref7[0];

      _this.setState({ width: e.contentRect.width });
    }, 200);

    _this.onShortcutCopy = document.addEventListener("keydown", _this.handleAlignmentCopy);
    return _this;
  }

  _createClass(AlignmentView, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.onShortcutCopy && document.removeEventListener("keydown", this.handleAlignmentCopy);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.scrollPercentageToJumpTo !== this.props.scrollPercentageToJumpTo && this.props.scrollPercentageToJumpTo !== undefined) {
        this.updateXScrollPercentage(this.props.scrollPercentageToJumpTo);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setVerticalScrollRange();
      }, 500);

      // const userAlignmentViewPercentageHeight =
      //   this.alignmentHolder.clientHeight / this.alignmentHolder.scrollHeight;
      // this.setState({ userAlignmentViewPercentageHeight });
    }
  }, {
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this.editorDragged = _clickAndDragUtils.editorDragged.bind(this);
      this.editorClicked = _clickAndDragUtils.editorClicked.bind(this);
      this.editorDragStarted = _clickAndDragUtils.editorDragStarted.bind(this);
      this.editorDragStopped = _clickAndDragUtils.editorDragStopped.bind(this);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var charWidthInLinearView = this.getCharWidthInLinearView();
      var _props = this.props,
          _props$alignmentTrack = _props.alignmentTracks,
          alignmentTracks = _props$alignmentTrack === undefined ? [] : _props$alignmentTrack,
          height = _props.height,
          minimapLaneHeight = _props.minimapLaneHeight,
          minimapLaneSpacing = _props.minimapLaneSpacing,
          isInPairwiseOverviewView = _props.isInPairwiseOverviewView,
          isPairwise = _props.isPairwise,
          currentPairwiseAlignmentIndex = _props.currentPairwiseAlignmentIndex,
          hasTemplate = _props.hasTemplate,
          noVisibilityOptions = _props.noVisibilityOptions,
          updateAlignmentSortOrder = _props.updateAlignmentSortOrder,
          alignmentSortOrder = _props.alignmentSortOrder,
          handleBackButtonClicked = _props.handleBackButtonClicked,
          alignmentVisibilityToolOptions = _props.alignmentVisibilityToolOptions;


      if (!alignmentTracks || !alignmentTracks[0] || !alignmentTracks[0].alignmentData) {
        console.error("corrupted data!", this.props);
        return "corrupted data!";
      }

      // const trackWidth = width - nameDivWidth || 400;

      var getTrackVis = function getTrackVis(alignmentTracks, isTemplate) {
        return _react2.default.createElement(
          "div",
          {
            className: "alignmentTracks ",
            style: { overflowY: "auto", display: "flex", zIndex: 10 }
          },
          _react2.default.createElement(
            "div",
            {
              style: {
                overflowX: "auto",
                // maxHeight: 500,
                // width: trackWidth
                width: _this3.state.width
              },
              ref: function ref(_ref8) {
                _this3[isTemplate ? "alignmentHolderTop" : "alignmentHolder"] = _ref8;
              },
              dataname: "scrollGroup",
              className: "alignmentHolder",
              onScroll: isTemplate ? _this3.handleTopScroll : _this3.handleScroll
            },
            isTemplate ? _this3.renderItem(0, 0, isTemplate) : _react2.default.createElement(_reactList2.default, {
              ref: function ref(c) {
                _this3.InfiniteScroller = c;
              },
              type: "variable",
              itemSizeEstimator: _this3.estimateRowHeight
              // itemSizeGetter={itemSizeGetter}
              , itemRenderer: _this3.renderItem,
              length: alignmentTracks.length
            })
          )
        );
      };

      var _alignmentTracks = _toArray(alignmentTracks),
          firstTrack = _alignmentTracks[0],
          otherTracks = _alignmentTracks.slice(1);

      var totalWidthOfMinimap = this.state.width - nameDivWidth;
      var totalWidthInAlignmentView = 14 * this.getSequenceLength();
      var minSliderSize = Math.min(totalWidthOfMinimap * (totalWidthOfMinimap / totalWidthInAlignmentView), totalWidthOfMinimap);
      var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      return _react2.default.createElement(
        _core.ResizeSensor,
        { onResize: this.handleResize },
        _react2.default.createElement(
          "div",
          {
            style: _extends({
              height: height || (isPairwise ? "auto" : viewportHeight * 0.88),
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflowY: "auto"
            }, this.props.style),
            className: "alignmentView"
          },
          _react2.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflowY: "auto"
              },
              className: "alignmentView-top-container"
            },
            _react2.default.createElement(
              "div",
              {
                style: {
                  paddingTop: "3px",
                  paddingBottom: "5px",
                  borderBottom: "1px solid",
                  display: "flex",
                  minHeight: "32px",
                  // maxHeight: "32px",
                  // height: "32px",
                  width: "100%",
                  // overflowX: "scroll",
                  flexWrap: "nowrap",
                  flexDirection: "row",
                  flex: "0 0 auto"
                },
                className: "ve-alignment-top-bar"
              },
              handleBackButtonClicked && _react2.default.createElement(
                _core.Tooltip,
                { content: "Back to Pairwise Alignment Overview" },
                _react2.default.createElement(_core.Button, {
                  icon: "arrow-left",
                  onClick: function onClick() {
                    // this.setState({
                    //   charWidthInLinearView: charWidthInLinearViewDefault
                    // });
                    handleBackButtonClicked();
                    _this3.caretPositionUpdate(-1);
                  },
                  small: true,
                  intent: _core.Intent.PRIMARY,
                  minimal: true,
                  style: { marginRight: 10 },
                  className: "alignmentViewBackButton"
                })
              ),
              this.props.handleAlignmentRename ? _react2.default.createElement(_core.InputGroup, {
                minimal: true,
                small: true,
                value: this.props.alignmentName,
                placeholder: "Untitled Alignment"
              }) : _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                  "span",
                  {
                    style: {
                      paddingTop: "3px",
                      fontWeight: "bold",
                      fontSize: "14px",
                      maxWidth: "150px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    },
                    title: this.props.alignmentName || "Untitled Alignment"
                  },
                  this.props.alignmentName || "Untitled Alignment"
                ),
                "\xA0\xA0\xA0",
                _react2.default.createElement(
                  "span",
                  {
                    style: {
                      paddingTop: "3px",
                      fontSize: "14px",
                      color: "grey",
                      maxWidth: "300px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    },
                    title: this.props.alignmentType || "Unknown Alignment Type"
                  },
                  this.props.alignmentType || "Unknown Alignment Type"
                )
              ),
              this.props.handleAlignmentRename && _react2.default.createElement(
                _core.Button,
                { small: true },
                "Rename"
              ),
              !isInPairwiseOverviewView && _react2.default.createElement(UncontrolledSliderWithPlusMinusBtns, {
                onRelease: function onRelease(val) {
                  _this3.setCharWidthInLinearView({
                    charWidthInLinearView: val
                  });
                  _this3.blockScroll = true; //we block the scroll to prevent jumpiness and then manually update to the desired scroll percentage
                  var percentScrollage = _this3.easyStore.percentScrolled;
                  setTimeout(function () {
                    _this3.blockScroll = false;
                    _this3.updateXScrollPercentage(percentScrollage);
                  });
                },
                title: "Adjust Zoom Level",
                style: { paddingTop: "4px", width: 100 },
                className: "alignment-zoom-slider",
                labelRenderer: false,
                stepSize: 0.01,
                initialValue: charWidthInLinearView,
                max: 14,
                min: this.getMinCharWidth()
              }),
              !noVisibilityOptions && !isInPairwiseOverviewView && _react2.default.createElement(_AlignmentVisibilityTool2.default, _extends({
                currentPairwiseAlignmentIndex: currentPairwiseAlignmentIndex
              }, alignmentVisibilityToolOptions)),
              updateAlignmentSortOrder && !isInPairwiseOverviewView && _react2.default.createElement(_core.Popover, {
                minimal: true,
                content: _react2.default.createElement(
                  _core.Menu,
                  null,
                  _react2.default.createElement(_core.MenuItem, {
                    active: true || alignmentSortOrder,
                    onClick: function onClick() {
                      updateAlignmentSortOrder("Position");
                    },
                    text: "Position"
                  }),
                  _react2.default.createElement(_core.MenuItem, {
                    active: false || alignmentSortOrder,
                    onClick: function onClick() {
                      updateAlignmentSortOrder("Alphabetical");
                    },
                    text: "Alphabetical"
                  })
                ),
                target: _react2.default.createElement(_core.Button, {
                  small: true,
                  text: "Sort Order",
                  rightIcon: "caret-down",
                  icon: "sort"
                })
              })
            ),
            hasTemplate ? _react2.default.createElement(
              _react2.default.Fragment,
              null,
              _react2.default.createElement(
                "div",
                { className: "alignmentTrackFixedToTop" },
                getTrackVis([firstTrack], true)
              ),
              getTrackVis(otherTracks)
            ) : getTrackVis(alignmentTracks)
          ),
          !isInPairwiseOverviewView && _react2.default.createElement(
            "div",
            {
              className: "alignmentViewBottomBar",
              style: {
                // flexGrow: 1,
                minHeight: "-webkit-min-content", //https://stackoverflow.com/questions/28029736/how-to-prevent-a-flex-item-from-shrinking-smaller-than-its-content
                marginTop: 4,
                paddingTop: 4,
                borderTop: "1px solid lightgrey",
                display: "flex"
              }
            },
            _react2.default.createElement(_Minimap2.default, _extends({
              alignmentTracks: alignmentTracks,
              dimensions: {
                width: Math.max(this.state.width, 10) || 10
              },
              scrollYToTrack: this.scrollYToTrack,
              onSizeAdjust: this.onMinimapSizeAdjust,
              minSliderSize: minSliderSize,
              laneHeight: minimapLaneHeight || (alignmentTracks.length > 5 ? 10 : 17),
              laneSpacing: minimapLaneSpacing || (alignmentTracks.length > 5 ? 2 : 1),
              easyStore: this.easyStore,
              numBpsShownInLinearView: this.getNumBpsShownInLinearView(),
              scrollAlignmentView: this.state.scrollAlignmentView
            }, {
              onMinimapScrollX: this.updateXScrollPercentage
            }))
          )
        )
      );
    }
  }]);

  return AlignmentView;
}(_react2.default.Component);

// export const AlignmentView = withEditorInteractions(_AlignmentView);

exports.default = (0, _recompose.compose)(
// export const AlignmentView = withEditorInteractions(_AlignmentView);
(0, _recompose.getContext)({
  store: _propTypes2.default.object
}), _withEditorProps2.default, (0, _reactRedux.connect)(function (state, ownProps) {
  // const {id}
  var alignments = state.VectorEditor.__allEditorsOptions.alignments;
  var alignmentId = ownProps.id,
      updateAlignmentViewVisibility = ownProps.updateAlignmentViewVisibility;

  var alignment = _extends({}, alignments[alignmentId], { id: alignmentId });

  var _ref9 = alignment || {},
      alignmentTracks = _ref9.alignmentTracks,
      pairwiseAlignments = _ref9.pairwiseAlignments,
      alignmentType = _ref9.alignmentType,
      scrollPercentageToJumpTo = _ref9.scrollPercentageToJumpTo,
      pairwiseOverviewAlignmentTracks = _ref9.pairwiseOverviewAlignmentTracks,
      loading = _ref9.loading,
      alignmentAnnotationVisibility = _ref9.alignmentAnnotationVisibility,
      alignmentAnnotationLabelVisibility = _ref9.alignmentAnnotationLabelVisibility,
      _ref9$caretPosition = _ref9.caretPosition,
      caretPosition = _ref9$caretPosition === undefined ? -1 : _ref9$caretPosition,
      _ref9$selectionLayer = _ref9.selectionLayer,
      selectionLayer = _ref9$selectionLayer === undefined ? { start: -1, end: -1 } : _ref9$selectionLayer;

  if (loading) {
    return {
      loading: true
    };
  }
  if (!alignmentTracks && !pairwiseAlignments) return {
    noTracks: true
  };
  var templateLength = (pairwiseAlignments ? pairwiseAlignments[0][0] : alignmentTracks[0]).alignmentData.sequence.length;

  var alignmentAnnotationsToToggle = ["features", "parts", "sequence", "reverseSequence", "axis", "axisNumbers", "translations", "cdsFeatureTranslations", "chromatogram", "dnaColors"];
  var togglableAlignmentAnnotationSettings = {};
  (0, _lodash.map)(alignmentAnnotationsToToggle, function (annotation) {
    if (annotation in alignmentAnnotationVisibility) {
      togglableAlignmentAnnotationSettings[annotation] = alignmentAnnotationVisibility[annotation];
    }
  });

  var annotationsWithCounts = [];
  if (alignmentTracks) {
    var totalNumOfFeatures = 0;
    var totalNumOfParts = 0;
    alignmentTracks.forEach(function (seq) {
      if (seq.sequenceData.features) {
        totalNumOfFeatures += seq.sequenceData.features.length;
      }
      if (seq.sequenceData.parts) {
        totalNumOfParts += seq.sequenceData.parts.length;
      }
    });
    annotationsWithCounts.push({
      features: totalNumOfFeatures,
      parts: totalNumOfParts
    });
  } else if (pairwiseAlignments) {
    pairwiseAlignments.forEach(function (pairwise) {
      var totalNumOfFeatures = 0;
      var totalNumOfParts = 0;
      pairwise.forEach(function (seq) {
        if (seq.sequenceData.features) {
          totalNumOfFeatures += seq.sequenceData.features.length;
        }
        if (seq.sequenceData.parts) {
          totalNumOfParts += seq.sequenceData.parts.length;
        }
      });
      annotationsWithCounts.push({
        features: totalNumOfFeatures,
        parts: totalNumOfParts
      });
    });
  }

  return {
    isAlignment: true,
    selectionLayer: selectionLayer,
    caretPosition: caretPosition,
    alignmentId: alignmentId,
    sequenceData: {
      //pass fake seq data in so editor interactions work
      sequence: Array.from(templateLength).map(function () {
        return "a";
      }).join("")
    },
    pairwiseAlignments: pairwiseAlignments,
    alignmentType: alignmentType,
    alignmentTracks: alignmentTracks,
    scrollPercentageToJumpTo: scrollPercentageToJumpTo,
    pairwiseOverviewAlignmentTracks: pairwiseOverviewAlignmentTracks,
    //manipulate the props coming in so we can pass a single clean prop to the visibility options tool
    alignmentVisibilityToolOptions: {
      alignmentAnnotationVisibility: alignmentAnnotationVisibility,
      alignmentAnnotationLabelVisibility: alignmentAnnotationLabelVisibility,
      alignmentAnnotationVisibilityToggle: function alignmentAnnotationVisibilityToggle(name) {
        updateAlignmentViewVisibility(_extends({}, alignment, {
          alignmentAnnotationVisibility: _extends({}, alignment.alignmentAnnotationVisibility, _defineProperty({}, name, !alignment.alignmentAnnotationVisibility[name]))
        }));
      },
      alignmentAnnotationLabelVisibilityToggle: function alignmentAnnotationLabelVisibilityToggle(name) {
        updateAlignmentViewVisibility(_extends({}, alignment, {
          alignmentAnnotationLabelVisibility: _extends({}, alignment.alignmentAnnotationLabelVisibility, _defineProperty({}, name, !alignment.alignmentAnnotationLabelVisibility[name]))
        }));
      },
      togglableAlignmentAnnotationSettings: togglableAlignmentAnnotationSettings,
      annotationsWithCounts: annotationsWithCounts
    }
  };
}, _extends({}, alignmentActions)), (0, _recompose.branch)(function (_ref10) {
  var loading = _ref10.loading;
  return loading;
}, (0, _recompose.renderComponent)(function () {
  return _react2.default.createElement(_teselagenReactComponents.Loading, { bounce: true });
})), (0, _recompose.branch)(function (_ref11) {
  var noTracks = _ref11.noTracks;
  return noTracks;
}, (0, _recompose.renderComponent)(function () {
  return _react2.default.createElement(
    "div",
    { style: { minHeight: 30, minWidth: 150 } },
    "\"No Tracks Found\""
  );
})), (0, _recompose.branch)(function (_ref12) {
  var pairwiseAlignments = _ref12.pairwiseAlignments;
  return pairwiseAlignments;
}, (0, _recompose.renderComponent)(function (props) {
  return _react2.default.createElement(PairwiseAlignmentView, props);
})))(AlignmentView);

var UncontrolledSliderWithPlusMinusBtns = function (_React$Component2) {
  _inherits(UncontrolledSliderWithPlusMinusBtns, _React$Component2);

  function UncontrolledSliderWithPlusMinusBtns() {
    var _ref13;

    var _temp, _this4, _ret;

    _classCallCheck(this, UncontrolledSliderWithPlusMinusBtns);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this4 = _possibleConstructorReturn(this, (_ref13 = UncontrolledSliderWithPlusMinusBtns.__proto__ || Object.getPrototypeOf(UncontrolledSliderWithPlusMinusBtns)).call.apply(_ref13, [this].concat(args))), _this4), _this4.state = { value: 0 }, _temp), _possibleConstructorReturn(_this4, _ret);
  }

  _createClass(UncontrolledSliderWithPlusMinusBtns, [{
    key: "render",
    value: function render() {
      var _this5 = this;

      var value = this.state.value;

      var _props2 = this.props,
          title = _props2.title,
          initialValue = _props2.initialValue,
          style = _props2.style,
          rest = _objectWithoutProperties(_props2, ["title", "initialValue", "style"]);

      return _react2.default.createElement(
        "div",
        {
          title: title,
          style: _extends({}, style, { display: "flex", marginLeft: 15, marginRight: 20 })
        },
        _react2.default.createElement(_core.Icon, {
          onClick: function onClick() {
            var newVal = Math.max(_this5.state.value - (_this5.props.max - _this5.props.min) / 10, _this5.props.min);
            _this5.setState({
              value: newVal
            });
            _this5.props.onRelease(newVal);
          },
          style: { cursor: "pointer", marginRight: 5 },
          intent: _core.Intent.PRIMARY,
          icon: "minus"
        }),
        _react2.default.createElement(_core.Slider, _extends({}, _extends({}, rest, { value: value }), {
          onChange: function onChange(value) {
            _this5.setState({ value: value });
          }
        })),
        _react2.default.createElement(_core.Icon, {
          onClick: function onClick() {
            var newVal = Math.min(_this5.state.value + (_this5.props.max - _this5.props.min) / 10, _this5.props.max);
            _this5.setState({
              value: newVal
            });
            _this5.props.onRelease(newVal);
          },
          style: { cursor: "pointer", marginLeft: 5 },
          intent: _core.Intent.PRIMARY,
          icon: "plus"
        })
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.oldInitialValue !== nextProps.initialValue) {
        return {
          value: nextProps.initialValue, //set the state value if a new initial value comes in!
          oldInitialValue: nextProps.initialValue
        };
      } else {
        return null;
      }
    }
  }]);

  return UncontrolledSliderWithPlusMinusBtns;
}(_react2.default.Component);

//this view is shown if we detect pairwise alignments


var PairwiseAlignmentView = function (_React$Component3) {
  _inherits(PairwiseAlignmentView, _React$Component3);

  function PairwiseAlignmentView() {
    var _ref14;

    var _temp2, _this6, _ret2;

    _classCallCheck(this, PairwiseAlignmentView);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this6 = _possibleConstructorReturn(this, (_ref14 = PairwiseAlignmentView.__proto__ || Object.getPrototypeOf(PairwiseAlignmentView)).call.apply(_ref14, [this].concat(args))), _this6), _this6.state = {
      currentPairwiseAlignmentIndex: undefined
    }, _temp2), _possibleConstructorReturn(_this6, _ret2);
  }

  _createClass(PairwiseAlignmentView, [{
    key: "render",
    value: function render() {
      var _this7 = this;

      var _props3 = this.props,
          pairwiseAlignments = _props3.pairwiseAlignments,
          pairwiseOverviewAlignmentTracks = _props3.pairwiseOverviewAlignmentTracks;
      var currentPairwiseAlignmentIndex = this.state.currentPairwiseAlignmentIndex;

      if (currentPairwiseAlignmentIndex > -1) {
        //we can render the AlignmentView directly
        //get the alignmentTracks based on currentPairwiseAlignmentIndex
        var alignmentTracks = pairwiseAlignments[currentPairwiseAlignmentIndex];

        var templateLength = alignmentTracks[0].alignmentData.sequence.length;
        return _react2.default.createElement(AlignmentView, _extends({}, this.props, {
          sequenceData: {
            //pass fake seq data in so editor interactions work
            sequence: Array.from(templateLength).map(function () {
              return "a";
            }).join("")
          },
          alignmentTracks: alignmentTracks,
          hasTemplate: true,
          isPairwise: true,
          currentPairwiseAlignmentIndex: currentPairwiseAlignmentIndex,
          handleBackButtonClicked: function handleBackButtonClicked() {
            _this7.setState({
              currentPairwiseAlignmentIndex: undefined
            });
          }
        }));
      } else {
        //we haven't yet selected an alignment to view
        // render the AlignmentView zoomed out for each track in pairwiseOverviewAlignmentTracks
        // when the view eye icon is hit (maybe next to the name?)
        return _react2.default.createElement(AlignmentView, _extends({}, this.props, {
          alignmentTracks: pairwiseOverviewAlignmentTracks,
          hasTemplate: true,
          isPairwise: true,
          isInPairwiseOverviewView: true,
          isFullyZoomedOut: true,
          noClickDragHandlers: true,
          linearViewOptions: getPairwiseOverviewLinearViewOptions,
          handleSelectTrack: function handleSelectTrack(trackIndex) {
            //set currentPairwiseAlignmentIndex
            _this7.setState({ currentPairwiseAlignmentIndex: trackIndex - 1 });
          }
        }));
      }
    }
  }]);

  return PairwiseAlignmentView;
}(_react2.default.Component);

function getPairwiseOverviewLinearViewOptions(_ref15) {
  var isTemplate = _ref15.isTemplate;

  if (!isTemplate) {
    return {
      annotationVisibilityOverrides: {
        features: false,
        translations: false,
        parts: false,
        orfs: false,
        orfTranslations: false,
        cdsFeatureTranslations: false,
        axis: false,
        cutsites: false,
        primers: false,
        chromatogram: false,
        sequence: false,
        dnaColors: false,
        reverseSequence: false,
        axisNumbers: false
      }
    };
  } else {
    return {
      // annotationVisibilityOverrides: {
      //   features: false,
      //   yellowAxis: false,
      //   translations: false,
      //   parts: false,
      //   orfs: false,
      //   orfTranslations: false,
      //   axis: true,
      //   cutsites: false,
      //   primers: false,
      //   reverseSequence: false,
      //   axisNumbers: false
      // }
    };
  }
}
module.exports = exports["default"];