"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircularView = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VeWarning = require("../helperComponents/VeWarning");

var _VeWarning2 = _interopRequireDefault(_VeWarning);

var _Labels = require("./Labels");

var _Labels2 = _interopRequireDefault(_Labels);

var _SelectionLayer = require("./SelectionLayer");

var _SelectionLayer2 = _interopRequireDefault(_SelectionLayer);

var _Caret = require("./Caret");

var _Caret2 = _interopRequireDefault(_Caret);

var _Axis = require("./Axis");

var _Axis2 = _interopRequireDefault(_Axis);

var _Orf = require("./Orf");

var _Orf2 = _interopRequireDefault(_Orf);

var _Feature = require("./Feature");

var _Feature2 = _interopRequireDefault(_Feature);

var _Primer = require("./Primer");

var _Primer2 = _interopRequireDefault(_Primer);

var _Cutsite = require("./Cutsite");

var _Cutsite2 = _interopRequireDefault(_Cutsite);

var _sortBy = require("lodash/sortBy");

var _sortBy2 = _interopRequireDefault(_sortBy);

var _veRangeUtils = require("ve-range-utils");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDraggable = require("react-draggable");

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _withEditorInteractions = require("../withEditorInteractions");

var _withEditorInteractions2 = _interopRequireDefault(_withEditorInteractions);

var _Part = require("./Part");

var _Part2 = _interopRequireDefault(_Part);

var _drawAnnotations = require("./drawAnnotations");

var _drawAnnotations2 = _interopRequireDefault(_drawAnnotations);

require("./style.css");

var _draggableClassnames = require("../constants/draggableClassnames");

var _draggableClassnames2 = _interopRequireDefault(_draggableClassnames);

var _orfFrameToColorMap = require("../constants/orfFrameToColorMap");

var _annotationTypes = require("../utils/annotationTypes");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PassThrough from "../utils/PassThrough";

// import DeletionLayer from "./DeletionLayer";
// import ReplacementLayer from "./ReplacementLayer";

// import PositionAnnotationOnCircle from "./PositionAnnotationOnCircle";
// import getAngleForPositionMidpoint from "./getAngleForPositionMidpoint";


function noop() {}

// function toDegrees(radians) {
//     return radians / 2 / Math.PI * 360
// }

var CircularView = exports.CircularView = function (_React$Component) {
  _inherits(CircularView, _React$Component);

  function CircularView() {
    _classCallCheck(this, CircularView);

    return _possibleConstructorReturn(this, (CircularView.__proto__ || Object.getPrototypeOf(CircularView)).apply(this, arguments));
  }

  _createClass(CircularView, [{
    key: "getNearestCursorPositionToMouseEvent",
    value: function getNearestCursorPositionToMouseEvent(event, sequenceLength, callback) {
      if (!event.clientX) {
        return;
      }
      var boundingRect = this.refs.circularView.getBoundingClientRect();
      //get relative click positions
      var clickX = event.clientX - boundingRect.left - boundingRect.width / 2;
      var clickY = event.clientY - boundingRect.top - boundingRect.height / 2;

      //get angle
      var angle = Math.atan2(clickY, clickX) + Math.PI / 2;
      if (angle < 0) angle += Math.PI * 2; //normalize the angle if necessary
      var nearestCaretPos = sequenceLength === 0 ? 0 : (0, _veRangeUtils.normalizePositionByRangeLength)((0, _veRangeUtils.getPositionFromAngle)(angle, sequenceLength, true), sequenceLength); //true because we're in between positions
      if (this.props.sequenceData && this.props.sequenceData.isProtein) {
        nearestCaretPos = Math.round(nearestCaretPos / 3) * 3;
      }
      callback({
        event: event,
        className: event.target.parentNode.className.animVal,
        shiftHeld: event.shiftKey,
        nearestCaretPos: nearestCaretPos,
        selectionStartGrabbed: event.target.parentNode.classList.contains(_draggableClassnames2.default.selectionStart),
        selectionEndGrabbed: event.target.parentNode.classList.contains(_draggableClassnames2.default.selectionEnd)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$width = _props.width,
          width = _props$width === undefined ? 400 : _props$width,
          _props$height = _props.height,
          height = _props$height === undefined ? 400 : _props$height,
          _props$scale = _props.scale,
          scale = _props$scale === undefined ? 1 : _props$scale,
          _props$sequenceData = _props.sequenceData,
          sequenceData = _props$sequenceData === undefined ? {} : _props$sequenceData,
          _props$hideName = _props.hideName,
          hideName = _props$hideName === undefined ? false : _props$hideName,
          editorName = _props.editorName,
          _props$selectionLayer = _props.selectionLayer,
          selectionLayer = _props$selectionLayer === undefined ? { start: -1, end: -1 } : _props$selectionLayer,
          _props$annotationHeig = _props.annotationHeight,
          annotationHeight = _props$annotationHeig === undefined ? 15 : _props$annotationHeig,
          _props$spaceBetweenAn = _props.spaceBetweenAnnotations,
          spaceBetweenAnnotations = _props$spaceBetweenAn === undefined ? 2 : _props$spaceBetweenAn,
          _props$annotationVisi = _props.annotationVisibility,
          annotationVisibility = _props$annotationVisi === undefined ? {} : _props$annotationVisi,
          _props$annotationLabe = _props.annotationLabelVisibility,
          annotationLabelVisibility = _props$annotationLabe === undefined ? {} : _props$annotationLabe,
          _props$caretPosition = _props.caretPosition,
          caretPosition = _props$caretPosition === undefined ? -1 : _props$caretPosition,
          circularAndLinearTickSpacing = _props.circularAndLinearTickSpacing,
          _props$editorDragged = _props.editorDragged,
          editorDragged = _props$editorDragged === undefined ? noop : _props$editorDragged,
          _props$editorDragStar = _props.editorDragStarted,
          editorDragStarted = _props$editorDragStar === undefined ? noop : _props$editorDragStar,
          _props$editorClicked = _props.editorClicked,
          editorClicked = _props$editorClicked === undefined ? noop : _props$editorClicked,
          _props$backgroundRigh = _props.backgroundRightClicked,
          backgroundRightClicked = _props$backgroundRigh === undefined ? noop : _props$backgroundRigh,
          _props$searchLayers = _props.searchLayers,
          searchLayers = _props$searchLayers === undefined ? [] : _props$searchLayers,
          _props$editorDragStop = _props.editorDragStopped,
          editorDragStopped = _props$editorDragStop === undefined ? noop : _props$editorDragStop,
          _props$additionalSele = _props.additionalSelectionLayers,
          additionalSelectionLayers = _props$additionalSele === undefined ? [] : _props$additionalSele,
          _props$maxAnnotations = _props.maxAnnotationsToDisplay,
          maxAnnotationsToDisplay = _props$maxAnnotations === undefined ? {} : _props$maxAnnotations,
          _props$searchLayerRig = _props.searchLayerRightClicked,
          searchLayerRightClicked = _props$searchLayerRig === undefined ? noop : _props$searchLayerRig,
          _props$selectionLayer2 = _props.selectionLayerRightClicked,
          selectionLayerRightClicked = _props$selectionLayer2 === undefined ? noop : _props$selectionLayer2,
          _props$searchLayerCli = _props.searchLayerClicked,
          searchLayerClicked = _props$searchLayerCli === undefined ? noop : _props$searchLayerCli,
          instantiated = _props.instantiated,
          labelLineIntensity = _props.labelLineIntensity;
      var _sequenceData$sequenc = sequenceData.sequence,
          sequence = _sequenceData$sequenc === undefined ? "atgc" : _sequenceData$sequenc,
          circular = sequenceData.circular;

      var sequenceLength = sequence.length;
      var sequenceName = hideName ? "" : sequenceData.name || "";
      circularAndLinearTickSpacing = circularAndLinearTickSpacing || (sequenceLength < 10 ? 1 : sequenceLength < 50 ? Math.ceil(sequenceLength / 5) : Math.ceil(sequenceLength / 100) * 10);

      var baseRadius = 80;
      var innerRadius = baseRadius - annotationHeight / 2; //tnr: -annotationHeight/2 because features are drawn from the center
      var radius = baseRadius;
      var annotationsSvgs = [];
      var labels = {};

      var isProtein = sequenceData.isProtein;
      //RENDERING CONCEPTS:
      //-"Circular" annotations get a radius, and a curvature based on their radius:
      //<CircularFeature>
      //-Then we rotate the annotations as necessary (and optionally flip them):
      //<PositionAnnotationOnCircle>

      var layersToDraw = [{ zIndex: 10, layerName: "sequenceChars" }, {
        zIndex: 20,
        layerName: "features",
        isAnnotation: true,
        // spaceBefore: 10,
        spaceAfter: 5
      }, {
        zIndex: 0,
        layerName: "axis",
        Comp: _Axis2.default,
        showAxisNumbers: !(annotationVisibility.axisNumbers === false),
        circularAndLinearTickSpacing: circularAndLinearTickSpacing,
        spaceBefore: 0,
        spaceAfter: 0
      }, { zIndex: 15, alwaysShow: true, layerName: "caret", Comp: drawCaret }, {
        zIndex: 10,
        alwaysShow: true,
        layerName: "selectionLayer",
        Comp: drawSelectionLayer
      }, {
        zIndex: 20,
        layerName: "replacementLayers",
        isAnnotation: true,
        spaceAfter: 20
      }, {
        zIndex: 20,
        layerName: "deletionLayers",
        isAnnotation: true,
        spaceAfter: 20
      }, {
        zIndex: 10,
        layerName: "cutsites",
        fontStyle: "italic",
        Comp: _Cutsite2.default,
        useStartAngle: true,
        allOnSameLevel: true,
        positionBy: positionCutsites,
        isAnnotation: true,
        maxToDisplay: 100
      }, {
        zIndex: 20,
        Comp: _Orf2.default,
        showLabels: false,
        getColor: _orfFrameToColorMap.getOrfColor,
        layerName: "orfs",
        isAnnotation: true,
        spaceBefore: 10
      }, {
        spaceBefore: 5,
        spaceAfter: 5,
        zIndex: 20,
        Comp: _Primer2.default,
        isAnnotation: true,
        layerName: "primers"
      }, {
        zIndex: 20,
        Comp: _Part2.default,
        layerName: "parts",
        isAnnotation: true,
        spaceBefore: 5
      }, {
        zIndex: 20,
        layerName: "lineageAnnotations",
        isAnnotation: true,
        spaceBefore: 10,
        spaceAfter: 5
      }, {
        zIndex: 20,
        layerName: "assemblyPieces",
        isAnnotation: true,
        spaceBefore: 10,
        spaceAfter: 5
      }, {
        zIndex: 20,
        arrowheadLength: 0,
        layerName: "warnings",
        isAnnotation: true,
        spaceBefore: 10,
        spaceAfter: 5
      }, {
        zIndex: 30,
        alwaysShow: true,
        layerName: "labels",
        Comp: _Labels2.default,
        circularViewWidthVsHeightRatio: width / height,
        passLabels: true,
        labelLineIntensity: labelLineIntensity,
        textScalingFactor: 700 / Math.min(width, height)
      }];
      var paredDownMessages = [];

      var output = layersToDraw.map(function (opts) {
        var layerName = opts.layerName,
            maxToDisplay = opts.maxToDisplay,
            Comp = opts.Comp,
            fontStyle = opts.fontStyle,
            alwaysShow = opts.alwaysShow,
            isAnnotation = opts.isAnnotation,
            _opts$spaceBefore = opts.spaceBefore,
            spaceBefore = _opts$spaceBefore === undefined ? 0 : _opts$spaceBefore,
            _opts$spaceAfter = opts.spaceAfter,
            spaceAfter = _opts$spaceAfter === undefined ? 0 : _opts$spaceAfter,
            zIndex = opts.zIndex,
            passLabels = opts.passLabels,
            rest = _objectWithoutProperties(opts, ["layerName", "maxToDisplay", "Comp", "fontStyle", "alwaysShow", "isAnnotation", "spaceBefore", "spaceAfter", "zIndex", "passLabels"]);

        if (!(alwaysShow || annotationVisibility[layerName])) {
          return null;
        }
        //DRAW FEATURES
        var comp = void 0;
        var results = void 0;

        var singularName = (0, _annotationTypes.getSingular)(layerName);
        var nameUpper = (0, _lodash.upperFirst)(layerName);
        radius += spaceBefore;
        var sharedProps = _extends({
          radius: radius,
          isProtein: isProtein,
          onClick: _this2.props[singularName + "Clicked"],
          onRightClicked: _this2.props[singularName + "RightClicked"],
          sequenceLength: sequenceLength,
          editorName: editorName
        }, rest);
        if (isAnnotation) {
          //we're drawing features/cutsites/primers/orfs/etc (something that lives on the seqData)
          if (!(0, _lodash.map)(sequenceData[layerName]).length) {
            radius -= spaceBefore;
            return null;
          }

          var maxToShow = maxAnnotationsToDisplay[layerName] || maxToDisplay || 50;

          var _ref = isAnnotation ? pareDownAnnotations(sequenceData["filtered" + nameUpper] || sequenceData[layerName], maxToShow) : [],
              _ref2 = _slicedToArray(_ref, 2),
              annotations = _ref2[0],
              paredDown = _ref2[1];

          if (paredDown) {
            paredDownMessages.push(_react2.default.createElement(_VeWarning2.default, {
              "data-test": "ve-warning-max" + nameUpper + "ToDisplay",
              tooltip: "Warning: More than " + maxToShow + " " + nameUpper + ". Only displaying " + maxToShow
            }));
          }
          results = (0, _drawAnnotations2.default)(_extends({
            Annotation: Comp || _Feature2.default,
            fontStyle: fontStyle,
            annotationType: singularName,
            reverseAnnotations: true,
            showLabels: !(annotationLabelVisibility[layerName] === false),
            annotations: annotations,
            annotationHeight: annotationHeight,
            spaceBetweenAnnotations: spaceBetweenAnnotations
          }, sharedProps, _this2.props[singularName + "Options"]));
        } else {
          //we're drawing axis/selectionLayer/caret/etc (something that doesn't live on the seqData)
          results = Comp(_extends({}, passLabels && { labels: labels }, sharedProps));
        }
        if (results) {
          // //update the radius, labels, and svg
          radius += results.height || 0;
          //tnr: we had been storing labels as a keyed-by-id object but that caused parts and features with the same id to override eachother
          labels = [].concat(_toConsumableArray((0, _lodash.map)(labels)), _toConsumableArray((0, _lodash.map)(results.labels || {})));
          comp = results.component || results;
        }
        radius += spaceAfter;
        // console.warn('radius after draw:',JSON.stringify(radius,null,4))
        return {
          result: comp,
          zIndex: zIndex
        };
      }).filter(function (i) {
        return !!i;
      });

      annotationsSvgs = (0, _sortBy2.default)(output, "zIndex").reduce(function (arr, _ref3) {
        var result = _ref3.result;

        return arr.concat(result);
      }, []);

      //debug hash marks
      // annotationsSvgs = annotationsSvgs.concat([0,50,100,150,190].map(function (pos) {
      //     return <text key={pos} transform={`translate(0,${-pos})`}>{pos}</text>
      // }))

      function drawSelectionLayer() {
        //DRAW SELECTION LAYER
        var selectionLayers = [].concat(_toConsumableArray(additionalSelectionLayers), _toConsumableArray(searchLayers), _toConsumableArray(Array.isArray(selectionLayer) ? selectionLayer : [selectionLayer]));
        return selectionLayers.map(function (selectionLayer, index) {
          if (selectionLayer.start >= 0 && selectionLayer.end >= 0 && sequenceLength > 0) {
            return _react2.default.createElement(_SelectionLayer2.default, {
              index: index,
              isDraggable: true,
              isProtein: isProtein,
              key: "veCircularViewSelectionLayer" + index,
              selectionLayer: selectionLayer,
              onRightClicked: selectionLayer.isSearchLayer ? searchLayerRightClicked : selectionLayerRightClicked,
              onClick: selectionLayer.isSearchLayer ? searchLayerClicked : undefined,
              sequenceLength: sequenceLength,
              baseRadius: baseRadius,
              radius: radius,
              innerRadius: innerRadius
            });
          } else {
            return null;
          }
        }).filter(function (el) {
          return !!el;
        });
      }

      function drawCaret() {
        //DRAW CARET
        if (caretPosition !== -1 && selectionLayer.start < 0 && sequenceLength >= 0) {
          //only render if there is no selection layer
          return _react2.default.createElement(_Caret2.default, {
            caretPosition: caretPosition,
            sequenceLength: sequenceLength,
            isProtein: isProtein,
            innerRadius: innerRadius,
            outerRadius: radius,
            key: "veCircularViewCaret"
          });
        }
      }

      //tnr: Make the radius have a minimum so the empty yellow axis circle doesn't take up the entire screen
      if (radius < 150) radius = 150;
      var widthToUse = Math.max(Number(width) || 300);
      var heightToUse = Math.max(Number(height) || 300);
      return _react2.default.createElement(
        "div",
        {
          style: {
            width: widthToUse,
            height: heightToUse
          }
          // tabIndex="0"
          , className: "veCircularView"
        },
        _react2.default.createElement(
          _reactDraggable2.default
          // enableUserSelectHack={false} //needed to prevent the input bubble from losing focus post user drag
          ,
          { bounds: { top: 0, left: 0, right: 0, bottom: 0 },
            onDrag: function onDrag(event) {
              _this2.getNearestCursorPositionToMouseEvent(event, sequenceLength, editorDragged);
            },
            onStart: function onStart(event) {
              _this2.getNearestCursorPositionToMouseEvent(event, sequenceLength, editorDragStarted);
            },
            onStop: editorDragStopped
          },
          _react2.default.createElement(
            "div",
            null,
            !hideName && _react2.default.createElement(
              "div",
              {
                style: {
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none"
                }
              },
              _react2.default.createElement(
                "div",
                {
                  key: "circViewSvgCenterText",
                  className: "veCircularViewMiddleOfVectorText",
                  style: { width: innerRadius, textAlign: "center" }
                },
                _react2.default.createElement(
                  "span",
                  null,
                  sequenceName,
                  " "
                ),
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "span",
                  { style: { fontSize: 10 } },
                  isProtein ? Math.floor(sequenceLength / 3) + " AAs" : sequenceLength + " bps"
                )
              )
            ),
            _react2.default.createElement(
              "svg",
              {
                key: "circViewSvg",
                onClick: function onClick(event) {
                  instantiated && _this2.getNearestCursorPositionToMouseEvent(event, sequenceLength, editorClicked);
                },
                onContextMenu: function onContextMenu(e) {
                  _this2.getNearestCursorPositionToMouseEvent(e, sequenceLength, backgroundRightClicked);
                },
                style: { overflow: "visible", display: "block" },
                width: widthToUse,
                height: heightToUse,
                ref: "circularView",
                className: "circularViewSvg",
                viewBox: "-" + radius * scale + " -" + radius * scale + " " + radius * 2 * scale + " " + radius * 2 * scale
              },
              annotationsSvgs
            ),
            _react2.default.createElement(
              "div",
              { className: "veCircularViewWarningContainer" },
              !circular && _react2.default.createElement(_VeWarning2.default, {
                "data-test": "ve-warning-circular-to-linear",
                intent: "warning",
                tooltip: "Warning! You're viewing a linear sequence in the Circular Map. Click on 'Linear Map' to view the linear sequence in a more intuitive way."
              }),
              paredDownMessages
            )
          )
        )
      );
    }
  }]);

  return CircularView;
}(_react2.default.Component);

function pareDownAnnotations(annotations, max) {
  var annotationsToPass = annotations;
  var paredDown = false;
  if (Object.keys(annotations).length > max) {
    paredDown = true;
    var sortedAnnotations = (0, _sortBy2.default)(annotations, function (annotation) {
      return -(0, _veRangeUtils.getRangeLength)(annotation);
    });
    annotationsToPass = sortedAnnotations.slice(0, max).reduce(function (obj, item) {
      obj[item.id] = item;
      return obj;
    }, {});
  }
  return [annotationsToPass, paredDown];
}

exports.default = (0, _withEditorInteractions2.default)(CircularView);


function positionCutsites(annotation) {
  return {
    start: annotation.topSnipPosition,
    end: annotation.topSnipPosition
  };
}

// function drawSequenceChars() {
//   //DRAW CHARS (only if there are fewer than 85 of them)
//   if (
//     sequenceLength < 85 &&
//     sequenceData.sequence &&
//     !sequenceData.noSequence
//   ) {
//     radius += 25;
//     sequenceData.sequence.split("").forEach(function(bp, index) {
//       let tickAngle = getAngleForPositionMidpoint(index, sequenceLength);
//       return (
//         <text
//           {...PositionAnnotationOnCircle({
//             sAngle: tickAngle,
//             eAngle: tickAngle,
//             height: radius
//           })}
//           key={index}
//           transform="rotate(180)"
//           style={{
//             textAnchor: "middle",
//             dominantBaseline: "central",
//             fontSize: "small"
//           }}
//         >
//           {bp}
//         </text>
//       );
//     });
//   }
// }