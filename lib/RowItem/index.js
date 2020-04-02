"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _veRangeUtils = require("ve-range-utils");

var _lodash = require("lodash");

var _veSequenceUtils = require("ve-sequence-utils");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _pluralize = require("pluralize");

var _pluralize2 = _interopRequireDefault(_pluralize);

var _SelectionLayer = require("./SelectionLayer");

var _SelectionLayer2 = _interopRequireDefault(_SelectionLayer);

var _Sequence = require("./Sequence");

var _Sequence2 = _interopRequireDefault(_Sequence);

var _Axis = require("./Axis");

var _Axis2 = _interopRequireDefault(_Axis);

var _Orfs = require("./Orfs");

var _Orfs2 = _interopRequireDefault(_Orfs);

var _Translations = require("./Translations");

var _Translations2 = _interopRequireDefault(_Translations);

var _Labels = require("./Labels");

var _Labels2 = _interopRequireDefault(_Labels);

var _Cutsites = require("./Cutsites");

var _Cutsites2 = _interopRequireDefault(_Cutsites);

var _Caret = require("./Caret");

var _Caret2 = _interopRequireDefault(_Caret);

var _StackedAnnotations = require("./StackedAnnotations");

var _StackedAnnotations2 = _interopRequireDefault(_StackedAnnotations);

require("./style.css");

var _Chromatogram = require("./Chromatograms/Chromatogram");

var _Chromatogram2 = _interopRequireDefault(_Chromatogram);

var _estimateRowHeight = require("../RowView/estimateRowHeight");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {}

function getPropsForType(props, type, pluralType) {
  var upperPluralType = (0, _lodash.startCase)(pluralType);
  var toRet = {
    annotationColor: props[pluralType + "Color"],
    annotationHeight: props[pluralType + "Height"] || _estimateRowHeight.rowHeights[pluralType].height,
    spaceBetweenAnnotations: props["spaceBetweenAnnotations" + upperPluralType] || _estimateRowHeight.rowHeights[pluralType].spaceBetweenAnnotations,
    marginTop: props[pluralType + "MarginTop"] || _estimateRowHeight.rowHeights[pluralType].marginTop,
    marginBottom: props[pluralType + "MarginBottom"] || _estimateRowHeight.rowHeights[pluralType].marginBottom,
    annotationRanges: props.row[pluralType],
    showLabels: props.annotationLabelVisibility && props.annotationLabelVisibility[pluralType],
    onClick: props[type + "Clicked"],
    onRightClick: props[type + "RightClicked"]
  };

  return toRet;
}

var RowItem = exports.RowItem = function (_React$PureComponent) {
  _inherits(RowItem, _React$PureComponent);

  function RowItem() {
    _classCallCheck(this, RowItem);

    return _possibleConstructorReturn(this, (RowItem.__proto__ || Object.getPrototypeOf(RowItem)).apply(this, arguments));
  }

  _createClass(RowItem, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$charWidth = _props.charWidth,
          charWidth = _props$charWidth === undefined ? 12 : _props$charWidth,
          _props$selectionLayer = _props.selectionLayer,
          selectionLayer = _props$selectionLayer === undefined ? { start: -1, end: -1 } : _props$selectionLayer,
          _props$deletionLayers = _props.deletionLayers,
          deletionLayers = _props$deletionLayers === undefined ? {} : _props$deletionLayers,
          _props$replacementLay = _props.replacementLayers,
          replacementLayers = _props$replacementLay === undefined ? {} : _props$replacementLay,
          _props$searchLayers = _props.searchLayers,
          searchLayers = _props$searchLayers === undefined ? [] : _props$searchLayers,
          rowTopComp = _props.rowTopComp,
          rowBottomComp = _props.rowBottomComp,
          isProtein = _props.isProtein,
          tickSpacing = _props.tickSpacing,
          _props$aminoAcidNumbe = _props.aminoAcidNumbersHeight,
          aminoAcidNumbersHeight = _props$aminoAcidNumbe === undefined ? _estimateRowHeight.rowHeights.aminoAcidNumbers.height : _props$aminoAcidNumbe,
          _props$cutsiteLabelHe = _props.cutsiteLabelHeight,
          cutsiteLabelHeight = _props$cutsiteLabelHe === undefined ? _estimateRowHeight.rowHeights.cutsiteLabels.height : _props$cutsiteLabelHe,
          _props$sequenceHeight = _props.sequenceHeight,
          sequenceHeight = _props$sequenceHeight === undefined ? _estimateRowHeight.rowHeights.sequence.height : _props$sequenceHeight,
          _props$axisHeight = _props.axisHeight,
          axisHeight = _props$axisHeight === undefined ? _estimateRowHeight.rowHeights.axis.height : _props$axisHeight,
          _props$axisMarginTop = _props.axisMarginTop,
          axisMarginTop = _props$axisMarginTop === undefined ? _estimateRowHeight.rowHeights.axis.marginTop : _props$axisMarginTop,
          width = _props.width,
          _props$annotationVisi = _props.annotationVisibility,
          annotationVisibility = _props$annotationVisi === undefined ? {} : _props$annotationVisi,
          _props$annotationLabe = _props.annotationLabelVisibility,
          annotationLabelVisibility = _props$annotationLabe === undefined ? {} : _props$annotationLabe,
          _props$additionalSele = _props.additionalSelectionLayers,
          additionalSelectionLayers = _props$additionalSele === undefined ? [] : _props$additionalSele,
          _props$caretPosition = _props.caretPosition,
          caretPosition = _props$caretPosition === undefined ? -1 : _props$caretPosition,
          _props$row = _props.row,
          row = _props$row === undefined ? {
        sequence: "",
        start: 0,
        end: 0,
        rowNumber: 0
      } : _props$row,
          isRowView = _props.isRowView,
          emptyText = _props.emptyText,
          alignmentType = _props.alignmentType,
          alignmentData = _props.alignmentData,
          _props$sequenceLength = _props.sequenceLength,
          sequenceLength = _props$sequenceLength === undefined ? row.sequence.length : _props$sequenceLength,
          chromatogramData = _props.chromatogramData,
          _props$fullSequence = _props.fullSequence,
          fullSequence = _props$fullSequence === undefined ? "" : _props$fullSequence,
          _props$replacementLay2 = _props.replacementLayerClicked,
          replacementLayerClicked = _props$replacementLay2 === undefined ? noop : _props$replacementLay2,
          _props$replacementLay3 = _props.replacementLayerRightClicked,
          replacementLayerRightClicked = _props$replacementLay3 === undefined ? noop : _props$replacementLay3,
          _props$searchLayerCli = _props.searchLayerClicked,
          searchLayerClicked = _props$searchLayerCli === undefined ? noop : _props$searchLayerCli,
          _props$backgroundRigh = _props.backgroundRightClicked,
          backgroundRightClicked = _props$backgroundRigh === undefined ? noop : _props$backgroundRigh,
          _props$selectionLayer2 = _props.selectionLayerRightClicked,
          selectionLayerRightClicked = _props$selectionLayer2 === undefined ? noop : _props$selectionLayer2,
          _props$searchLayerRig = _props.searchLayerRightClicked,
          searchLayerRightClicked = _props$searchLayerRig === undefined ? noop : _props$searchLayerRig,
          _props$translationDou = _props.translationDoubleClicked,
          translationDoubleClicked = _props$translationDou === undefined ? noop : _props$translationDou,
          _props$minHeight = _props.minHeight,
          minHeight = _props$minHeight === undefined ? 22 : _props$minHeight,
          _props$bpsPerRow = _props.bpsPerRow,
          bpsPerRow = _props$bpsPerRow === undefined ? sequenceLength : _props$bpsPerRow,
          editorName = _props.editorName,
          externalLabels = _props.externalLabels,
          onlyShowLabelsThatDoNotFit = _props.onlyShowLabelsThatDoNotFit,
          labelLineIntensity = _props.labelLineIntensity;
      var showChromatogram = annotationVisibility.chromatogram,
          showCutsites = annotationVisibility.cutsites,
          showCutsitesInSequence = annotationVisibility.cutsitesInSequence,
          showAxis = annotationVisibility.axis,
          showAxisNumbers = annotationVisibility.axisNumbers,
          showAminoAcidNumbers = annotationVisibility.aminoAcidNumbers,
          showDnaColors = annotationVisibility.dnaColors,
          showReverseSequence = annotationVisibility.reverseSequence,
          showSequence = annotationVisibility.sequence;
      var _row$sequence = row.sequence,
          sequence = _row$sequence === undefined ? "" : _row$sequence,
          _row$cutsites = row.cutsites,
          cutsites = _row$cutsites === undefined ? [] : _row$cutsites;


      var reverseSequence = (0, _veSequenceUtils.getComplementSequenceString)(alignmentData && alignmentData.sequence || sequence);
      if (!row) {
        return null;
      }
      var selectionLayers = [].concat(_toConsumableArray(additionalSelectionLayers), _toConsumableArray(Array.isArray(selectionLayer) ? selectionLayer : [selectionLayer]));
      if (!width) {
        width = bpsPerRow * charWidth;
      } else {
        charWidth = width / Math.max(bpsPerRow, 1);
      }
      var rowContainerStyle = {
        position: "relative",
        minHeight: minHeight,
        width: width + "px"
      };
      var getGaps = function getGaps() {
        return {
          gapsBefore: 0,
          gapsInside: 0
        };
      };
      if (alignmentData) {
        var gapMap = getGapMap(alignmentData.sequence);
        //this function is used to calculate the number of spaces that come before or inside a range
        getGaps = function getGaps(rangeOrCaretPosition) {
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
      }
      var annotationCommonProps = {
        editorName: editorName,
        charWidth: charWidth,
        bpsPerRow: bpsPerRow,
        getGaps: getGaps,
        isProtein: isProtein,
        sequenceLength: sequenceLength,
        row: { start: row.start, end: row.end }
      };

      var drawLabels = function drawLabels(type, noDraw) {
        if (noDraw) {
          return null;
        }
        var pluralType = (0, _pluralize2.default)(type);
        var ranges = annotationLabelVisibility[pluralType] && annotationVisibility[pluralType] ? (0, _lodash.map)(row[pluralType], function (a) {
          return (0, _lodash.assign)(a, {
            onClick: _this2.props[type + "Clicked"],
            onRightClick: _this2.props[type + "RightClicked"]
          });
        }) : [];
        return _react2.default.createElement(_Labels2.default, _extends({}, annotationCommonProps, {
          onlyShowLabelsThatDoNotFit: onlyShowLabelsThatDoNotFit,
          labelLineIntensity: labelLineIntensity,
          rangeMax: bpsPerRow,
          annotationRanges: ranges,
          annotationHeight: cutsiteLabelHeight
        }));
      };

      var drawAnnotations = function drawAnnotations(type) {
        var extraProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var CompOverride = extraProps.CompOverride,
            shouldShow = extraProps.shouldShow,
            noPlural = extraProps.noPlural,
            alignmentType = extraProps.alignmentType,
            otherExtraProps = _objectWithoutProperties(extraProps, ["CompOverride", "shouldShow", "noPlural", "alignmentType"]);

        var pluralType = noPlural ? type : (0, _pluralize2.default)(type);
        if (shouldShow !== undefined ? !shouldShow : !annotationVisibility[pluralType] || Object.keys(row[pluralType] || {}).length <= 0) {
          return null;
        }
        var CompToUse = CompOverride || _StackedAnnotations2.default;
        return _react2.default.createElement(CompToUse, _extends({
          externalLabels: externalLabels === "true",
          onlyShowLabelsThatDoNotFit: onlyShowLabelsThatDoNotFit,
          type: type,
          containerClassName: (0, _lodash.camelCase)("veRowView-" + pluralType + "Container"),
          alignmentType: alignmentType
        }, annotationCommonProps, getPropsForType(_this2.props, type, pluralType), otherExtraProps));
      };

      // a t g a t c a g g
      // 0 1 2 3 4 5 6 8 9
      //0 1 2 3 4 5 6 7 9

      var deletionLayersToDisplay = (0, _lodash.flatMap)(_extends({}, replacementLayers, deletionLayers), function (layer) {
        if (layer.caretPosition > -1) {
          return [];
        }
        var overlaps = (0, _veRangeUtils.getOverlapsOfPotentiallyCircularRanges)(layer, row, sequenceLength);
        return overlaps;
      });
      var deletionLayerStrikeThrough = deletionLayersToDisplay.length ? deletionLayersToDisplay.map(function (layer, index) {
        var left = (layer.start - row.start) * charWidth;
        var width = (layer.end - layer.start + 1) * charWidth;
        return _react2.default.createElement("div", {
          key: "deletionLayer" + index,
          className: "ve_sequence_strikethrough",
          style: {
            left: left,
            width: width,
            top: 10,
            height: 2,
            position: "absolute",
            background: "black"
          }
        });
      }) : null;

      var translationCommonProps = {
        CompOverride: _Translations2.default,
        showAminoAcidNumbers: showAminoAcidNumbers,
        sequenceLength: sequenceLength,
        aminoAcidNumbersHeight: aminoAcidNumbersHeight
      };
      var partProps = {
        getExtraInnerCompProps: function getExtraInnerCompProps(annotationRange) {
          var annotation = annotationRange.annotation;
          var color = annotation.color;

          var colorToUse = (0, _lodash.startsWith)(color, "override_") ? color.replace("override_", "") : "purple";
          return {
            fill: "white",
            textColor: "black",
            stroke: colorToUse,
            color: colorToUse
          };
        },
        alignmentType: alignmentType
      };

      return _react2.default.createElement(
        "div",
        { onContextMenu: backgroundRightClicked, className: "veRowItemWrapper" },
        rowTopComp && rowTopComp,
        _react2.default.createElement(
          "div",
          {
            className: "veRowItem",
            style: rowContainerStyle
            // onMouseMove={this.onMouseMove}
            // onMouseUp={this.onMouseUp}
            // onMouseDown={this.onMouseDown}
          },
          _react2.default.createElement(_SelectionLayer2.default, _extends({
            className: "veSearchLayerContainer",
            customTitleStart: "Search match"
            // color="yellow"
            // hideCarets
            , regions: searchLayers
          }, annotationCommonProps, {
            selectionLayerRightClicked: searchLayerRightClicked,
            row: alignmentData ? { start: 0, end: alignmentData.sequence.length - 1 } : row,
            onClick: searchLayerClicked
          })),
          _react2.default.createElement(_SelectionLayer2.default, _extends({
            isDraggable: true,
            selectionLayerRightClicked: selectionLayerRightClicked
          }, annotationCommonProps, {
            row: alignmentData ? { start: 0, end: alignmentData.sequence.length - 1 } : row,
            regions: selectionLayers
          })),
          drawAnnotations("warning", {
            getExtraInnerCompProps: function getExtraInnerCompProps() {
              return {
                pointiness: 0,
                rangeType: "middle"
              };
            }
          }),
          drawAnnotations("assemblyPiece"),
          drawAnnotations("lineageAnnotation"),
          drawLabels("part", externalLabels !== "true"),
          drawAnnotations("part", partProps),
          drawLabels("primer", externalLabels !== "true"),
          drawAnnotations("primer", {
            sequence: fullSequence
          }),
          drawAnnotations("orf", {
            CompOverride: _Orfs2.default
          }),
          drawAnnotations("translation", _extends({}, translationCommonProps, {
            onDoubleClick: translationDoubleClicked
          })),
          showChromatogram && chromatogramData && _react2.default.createElement(_Chromatogram2.default, _extends({
            chromatogramData: chromatogramData,
            alignmentData: alignmentData
          }, annotationCommonProps)),
          drawLabels("cutsite", !isRowView),
          _react2.default.createElement(
            "div",
            {
              className: "veRowItemSequenceContainer",
              style: { position: "relative" }
            },
            showSequence && _react2.default.createElement(
              _Sequence2.default,
              _extends({
                cutsites: cutsites //pass this in order to get children cutsites to re-render
                , showDnaColors: showDnaColors,
                hideBps: charWidth < 7,
                sequence: alignmentData ? alignmentData.sequence : row.sequence //from alignment data and has "-"" chars in it
                , height: sequenceHeight,
                showCutsites: showCutsites,
                length: alignmentData ? alignmentData.sequence.length : row.sequence.length,
                charWidth: charWidth,
                alignmentData: alignmentData
              }, annotationCommonProps),
              showCutsites && Object.keys(cutsites).length > 0 && _react2.default.createElement(_Cutsites2.default, _extends({
                sequenceLength: sequenceLength,
                annotationRanges: cutsites,
                topStrand: true
              }, annotationCommonProps)),
              deletionLayerStrikeThrough
            ),
            emptyText,
            showReverseSequence && _react2.default.createElement(
              _Sequence2.default,
              {
                isReverse: true,
                cutsites: cutsites //pass this in order to get children cutsites to re-render
                , showDnaColors: showDnaColors,
                hideBps: charWidth < 7,
                length: reverseSequence.length,
                showCutsites: showCutsites,
                sequence: reverseSequence,
                height: sequenceHeight,
                charWidth: charWidth
              },
              showCutsites && Object.keys(cutsites).length > 0 && _react2.default.createElement(_Cutsites2.default, _extends({
                topStrand: false,
                annotationRanges: cutsites
              }, annotationCommonProps)),
              deletionLayerStrikeThrough
            ),
            showCutsites && showCutsitesInSequence && Object.keys(cutsites).map(function (id, index) {
              var cutsite = cutsites[id];
              var layer = cutsite.annotation.recognitionSiteRange;
              return layer.start > -1 && _react2.default.createElement(_SelectionLayer2.default, _extends({
                hideTitle: true
              }, annotationCommonProps, {
                key: "restrictionSiteRange" + index,
                height: showReverseSequence ? sequenceHeight * 2 : sequenceHeight,
                hideCarets: true,
                opacity: 0.3,
                className: "cutsiteLabelSelectionLayer",
                border: "2px solid " + "lightblue",
                // background: 'none',
                background: "lightblue",
                regions: [layer],
                row: alignmentData ? { start: 0, end: alignmentData.sequence.length - 1 } : row
              }));
            })
          ),
          drawLabels("feature", externalLabels !== "true"),
          drawAnnotations("feature"),
          (0, _lodash.map)(replacementLayers, function (replacementLayer) {
            if (!replacementLayer) return null;
            var atCaret = replacementLayer.caretPosition > -1;
            var normedCaretPos = void 0;
            if (atCaret) {
              normedCaretPos = (0, _veRangeUtils.normalizePositionByRangeLength)(replacementLayer.caretPosition, sequenceLength);
            }
            var insertedBpsLayer = _extends({}, replacementLayer, {
              start: atCaret ? normedCaretPos : replacementLayer.start,
              end: (atCaret ? normedCaretPos : replacementLayer.start) + replacementLayer.sequence.length
            });
            var sequence = insertedBpsLayer.sequence;

            var layerRangeOverlaps = (0, _veRangeUtils.getOverlapsOfPotentiallyCircularRanges)(insertedBpsLayer, row, sequenceLength);
            return layerRangeOverlaps.map(function (layer, index) {
              var isStart = layer.start === insertedBpsLayer.start;
              var seqInRow = (0, _veRangeUtils.getSequenceWithinRange)({
                start: layer.start - insertedBpsLayer.start,
                end: layer.end - insertedBpsLayer.start
              }, sequence);
              var startOffset = layer.start - row.start;
              var width = seqInRow.length * charWidth;
              var height = sequenceHeight;
              var bufferBottom = 4;
              var bufferLeft = 2;
              var arrowHeight = isStart ? 8 : 0;
              return _react2.default.createElement(
                _Sequence2.default,
                {
                  showDnaColors: showDnaColors,
                  key: index,
                  sequence: seqInRow,
                  startOffset: startOffset,
                  height: height,
                  length: seqInRow.length,
                  charWidth: charWidth
                },
                _react2.default.createElement(
                  "svg",
                  {
                    style: {
                      left: startOffset * charWidth,
                      height: sequenceHeight,
                      position: "absolute"
                    },
                    ref: "rowViewTextContainer",
                    onClick: function onClick(event) {
                      replacementLayerClicked({
                        annotation: replacementLayer,
                        event: event
                      });
                    },
                    onContextMenu: function onContextMenu(event) {
                      replacementLayerRightClicked({
                        annotation: replacementLayer,
                        event: event
                      });
                    },
                    className: "rowViewTextContainer clickable",
                    width: Math.max(0, Number(width)),
                    height: Math.max(0, Number(height))
                  },
                  _react2.default.createElement("polyline", {
                    points: -bufferLeft + ",0 " + -bufferLeft + "," + -arrowHeight + ", " + charWidth / 2 + ",0 " + width + ",0 " + width + "," + (height + bufferBottom) + " " + -bufferLeft + "," + (height + bufferBottom) + " " + -bufferLeft + ",0",
                    fill: "none",
                    stroke: "black",
                    strokeWidth: "2px"
                  })
                )
              );
            });
          }),
          drawAnnotations("primaryProteinSequence", _extends({}, translationCommonProps, {
            noPlural: true
          })),
          drawLabels("cutsite", isRowView),
          showAxis && _react2.default.createElement(_Axis2.default, _extends({
            tickSpacing: tickSpacing,
            showAxisNumbers: showAxisNumbers,
            annotationHeight: axisHeight,
            marginTop: axisMarginTop
          }, annotationCommonProps)),
          caretPosition > -1 && _react2.default.createElement(_Caret2.default, _extends({
            caretPosition: caretPosition,
            shouldBlink: true
          }, _extends({}, annotationCommonProps, { getGaps: undefined }), {
            row: alignmentData ? { start: 0, end: alignmentData.sequence.length - 1 } : row
          }))
        ),
        rowBottomComp && rowBottomComp
      );
    }
  }]);

  return RowItem;
}(_react2.default.PureComponent);

// module.exports = pure(RowItem);


exports.default = RowItem;


function getGapMap(sequence) {
  var gapMap = [0]; //a map of position to how many gaps come before that position [0,0,0,5,5,5,5,17,17,17, ]
  sequence.split("").forEach(function (char) {
    if (char === "-") {
      gapMap[Math.max(0, gapMap.length - 1)] = (gapMap[Math.max(0, gapMap.length - 1)] || 0) + 1;
    } else {
      gapMap.push(gapMap[gapMap.length - 1] || 0);
      // gapMap[gapMap.length] =
    }
  });
  return gapMap;
}
// var a = getGapMap("---tagccc---tagasdfw--gg")