"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _veSequenceUtils = require("ve-sequence-utils");

var _veRangeUtils = require("ve-range-utils");

var _clipboard = require("clipboard");

var _clipboard2 = _interopRequireDefault(_clipboard);

var _redux = require("redux");

var _lodash = require("lodash");

var _core = require("@blueprintjs/core");

var _recompose = require("recompose");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _combokeys = require("combokeys");

var _combokeys2 = _interopRequireDefault(_combokeys);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _teselagenReactComponents = require("teselagen-react-components");

var _bioParsers = require("bio-parsers");

var _withEditorProps = require("../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

var _commands = require("../commands");

var _commands2 = _interopRequireDefault(_commands);

var _moveCaret = require("./moveCaret");

var _moveCaret2 = _interopRequireDefault(_moveCaret);

var _createSequenceInputPopup = require("./createSequenceInputPopup");

var _createSequenceInputPopup2 = _interopRequireDefault(_createSequenceInputPopup);

var _Keyboard = require("./Keyboard");

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _clickAndDragUtils = require("./clickAndDragUtils");

var _getBpsPerRow = require("./getBpsPerRow");

var _getBpsPerRow2 = _interopRequireDefault(_getBpsPerRow);

var _defaultConfig = require("../MenuBar/defaultConfig");

var _viewSubmenu = require("../MenuBar/viewSubmenu");

var _editorUtils = require("../utils/editorUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getAcceptedChars(isProtein) {
  return isProtein ? _veSequenceUtils.bioData.extended_protein_letters.toLowerCase() : _veSequenceUtils.bioData.ambiguous_dna_letters.toLowerCase();
}

var annotationClickHandlers = ["orfClicked", "primerClicked", "lineageAnnotationClicked", "assemblyPieceClicked", "translationClicked", "primaryProteinSequenceClicked", "cutsiteClicked", "translationDoubleClicked", "deletionLayerClicked", "replacementLayerClicked", "featureClicked", "warningClicked", "partClicked", "searchLayerClicked"];
//withEditorInteractions is meant to give "interaction" props like "onDrag, onCopy, onKeydown" to the circular/row/linear views
function VectorInteractionHOC(Component /* options */) {
  return function (_React$Component) {
    _inherits(VectorInteractionWrapper, _React$Component);

    function VectorInteractionWrapper(props) {
      var _this2 = this;

      _classCallCheck(this, VectorInteractionWrapper);

      var _this = _possibleConstructorReturn(this, (VectorInteractionWrapper.__proto__ || Object.getPrototypeOf(VectorInteractionWrapper)).call(this, props));

      _this.updateSelectionOrCaret = function (shiftHeld, newRangeOrCaret) {
        var _this$props = _this.props,
            selectionLayer = _this$props.selectionLayer,
            caretPosition = _this$props.caretPosition,
            _this$props$sequenceD = _this$props.sequenceData,
            sequenceData = _this$props$sequenceD === undefined ? { sequence: "" } : _this$props$sequenceD;

        var sequenceLength = sequenceData.sequence.length;
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

      _this.handlePaste = function (e) {
        var _this$props2 = _this.props,
            _this$props2$caretPos = _this$props2.caretPosition,
            caretPosition = _this$props2$caretPos === undefined ? -1 : _this$props2$caretPos,
            _this$props2$selectio = _this$props2.selectionLayer,
            selectionLayer = _this$props2$selectio === undefined ? { start: -1, end: -1 } : _this$props2$selectio,
            readOnly = _this$props2.readOnly,
            onPaste = _this$props2.onPaste;


        if (readOnly) {
          return window.toastr.warning("Sorry the sequence is Read-Only");
        }
        if (!(caretPosition > -1 || selectionLayer.start > -1)) {
          return window.toastr.warning("Please place the cursor before pasting");
        }

        var seqDataToInsert = void 0;
        if (onPaste) {
          seqDataToInsert = onPaste(e, _this.props);
        } else {
          var clipboardData = e.clipboardData;
          var jsonData = clipboardData.getData("application/json");
          if (jsonData) {
            jsonData = JSON.parse(jsonData);
          }
          seqDataToInsert = jsonData || {
            sequence: clipboardData.getData("text/plain") || e.target.value
          };
        }

        seqDataToInsert = (0, _veSequenceUtils.tidyUpSequenceData)(seqDataToInsert, {
          provideNewIdsForAnnotations: true,
          annotationsAsObjects: true,
          removeUnwantedChars: true
        });
        if (!seqDataToInsert.sequence.length) return window.toastr.warning("Sorry no valid base pairs to paste");

        insertAndSelectHelper({
          seqDataToInsert: seqDataToInsert,
          props: _this.props
        });

        window.toastr.success("Sequence Pasted Successfully");
        e.preventDefault();
      };

      _this.handleCutOrCopy = function (isCut) {
        return function (e) {
          var _this$props3 = _this.props,
              _this$props3$onCopy = _this$props3.onCopy,
              onCopy = _this$props3$onCopy === undefined ? function () {} : _this$props3$onCopy,
              sequenceData = _this$props3.sequenceData,
              selectionLayer = _this$props3.selectionLayer,
              copyOptions = _this$props3.copyOptions;

          var onCut = _this.props.onCut || _this.props.onCopy || function () {};

          var seqData = (0, _veSequenceUtils.tidyUpSequenceData)(_this.sequenceDataToCopy || (0, _veSequenceUtils.getSequenceDataBetweenRange)(sequenceData, selectionLayer, {
            excludePartial: {
              features: !copyOptions.partialFeatures,
              parts: !copyOptions.partialParts
            },
            exclude: {
              features: !copyOptions.features,
              parts: !copyOptions.parts
            }
          }), { annotationsAsObjects: true });
          if (!seqData.sequence.length) return window.toastr.warning("No Sequence Selected To " + (isCut ? "Cut" : "Copy"));

          var clipboardData = e.clipboardData;
          clipboardData.setData("text/plain", seqData.isProtein ? seqData.proteinSequence : seqData.sequence);
          clipboardData.setData("application/json", JSON.stringify(seqData));
          e.preventDefault();

          if (isCut) {
            _this.handleDnaDelete(false);
            onCut(e, (0, _veSequenceUtils.tidyUpSequenceData)(seqData, { annotationsAsObjects: true }), _this.props);
            document.body.removeEventListener("cut", _this.handleCut);
          } else {
            onCopy(e, seqData, _this.props);
            document.body.removeEventListener("copy", _this.handleCopy);
          }
          window.toastr.success("Selection " + (isCut ? "Cut" : "Copied"));
          _this.sequenceDataToCopy = undefined;
        };
      };

      _this.handleCut = _this.handleCutOrCopy(true);
      _this.handleCopy = _this.handleCutOrCopy();

      _this.handleDnaInsert = function (_ref) {
        var useEventPositioning = _ref.useEventPositioning;
        var _this$props4 = _this.props,
            _this$props4$caretPos = _this$props4.caretPosition,
            caretPosition = _this$props4$caretPos === undefined ? -1 : _this$props4$caretPos,
            _this$props4$selectio = _this$props4.selectionLayer,
            selectionLayer = _this$props4$selectio === undefined ? { start: -1, end: -1 } : _this$props4$selectio,
            _this$props4$sequence = _this$props4.sequenceData,
            sequenceData = _this$props4$sequence === undefined ? { sequence: "" } : _this$props4$sequence,
            readOnly = _this$props4.readOnly;

        var sequenceLength = sequenceData.sequence.length;
        var isReplace = selectionLayer.start > -1;
        if (readOnly) {
          window.toastr.warning("Sorry the sequence is Read-Only");
        } else {
          (0, _createSequenceInputPopup2.default)({
            useEventPositioning: useEventPositioning,
            isReplace: isReplace,
            acceptedChars: getAcceptedChars(sequenceData.isProtein),
            isProtein: sequenceData.isProtein,
            selectionLayer: selectionLayer,
            sequenceLength: sequenceLength,
            caretPosition: caretPosition,
            handleInsert: function handleInsert(seqDataToInsert) {
              insertAndSelectHelper({
                props: _this.props,
                seqDataToInsert: seqDataToInsert
              });

              window.toastr.success("Sequence Inserted Successfully");
            }
          });
        }
      };

      _this.handleDnaDelete = function () {
        var showToast = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var _this$props5 = _this.props,
            _this$props5$caretPos = _this$props5.caretPosition,
            caretPosition = _this$props5$caretPos === undefined ? -1 : _this$props5$caretPos,
            _this$props5$selectio = _this$props5.selectionLayer,
            selectionLayer = _this$props5$selectio === undefined ? { start: -1, end: -1 } : _this$props5$selectio,
            _this$props5$sequence = _this$props5.sequenceData,
            sequenceData = _this$props5$sequence === undefined ? { sequence: "" } : _this$props5$sequence,
            readOnly = _this$props5.readOnly,
            updateSequenceData = _this$props5.updateSequenceData,
            wrappedInsertSequenceDataAtPositionOrRange = _this$props5.wrappedInsertSequenceDataAtPositionOrRange,
            caretPositionUpdate = _this$props5.caretPositionUpdate;

        var sequenceLength = sequenceData.sequence.length;
        if (readOnly) {
          return window.toastr.warning("Sorry the sequence is Read-Only");
        }
        if (sequenceLength > 0) {
          var rangeToDelete = selectionLayer;
          if (caretPosition > 0) {
            rangeToDelete = {
              start: (0, _veRangeUtils.normalizePositionByRangeLength)(caretPosition - (sequenceData.isProtein ? 3 : 1), sequenceLength),
              end: (0, _veRangeUtils.normalizePositionByRangeLength)(caretPosition - 1, sequenceLength)
            };
          }

          var _wrappedInsertSequenc = wrappedInsertSequenceDataAtPositionOrRange({}, sequenceData, rangeToDelete),
              _wrappedInsertSequenc2 = _slicedToArray(_wrappedInsertSequenc, 1),
              newSeqData = _wrappedInsertSequenc2[0];

          updateSequenceData(newSeqData);
          caretPositionUpdate(rangeToDelete.start > newSeqData.sequence.length ? //we're deleting around the origin so set the cursor to the 0 position
          0 : (0, _veRangeUtils.normalizePositionByRangeLength)(rangeToDelete.start, newSeqData.sequence.length));
          if (showToast) window.toastr.success("Sequence Deleted Successfully");
        }
      };

      _this.caretPositionUpdate = function (position) {
        var _this$props$caretPosi = _this.props.caretPosition,
            caretPosition = _this$props$caretPosi === undefined ? -1 : _this$props$caretPosi;

        if (caretPosition === position) {
          return;
        }
        //we only call caretPositionUpdate if we're actually changing something
        _this.props.caretPositionUpdate(position);
      };

      _this.selectionLayerUpdate = function (newSelection) {
        var _this$props6 = _this.props,
            _this$props6$selectio = _this$props6.selectionLayer,
            selectionLayer = _this$props6$selectio === undefined ? { start: -1, end: -1 } : _this$props6$selectio,
            ignoreGapsOnHighlight = _this$props6.ignoreGapsOnHighlight;

        if (!newSelection) return;
        var start = newSelection.start,
            end = newSelection.end,
            forceUpdate = newSelection.forceUpdate;

        if (selectionLayer.start === start && selectionLayer.end === end && selectionLayer.forceUpdate === forceUpdate) {
          return;
        }
        //we only call selectionLayerUpdate if we're actually changing something
        _this.props.selectionLayerUpdate(_extends({}, newSelection, {
          start: start,
          end: end,
          ignoreGaps: ignoreGapsOnHighlight
        }));
      };

      _this.annotationClicked = function (_ref2) {
        var event = _ref2.event,
            annotation = _ref2.annotation;

        event.preventDefault && event.preventDefault();
        event.stopPropagation && event.stopPropagation();
        var _this$props7 = _this.props,
            annotationSelect = _this$props7.annotationSelect,
            selectionLayer = _this$props7.selectionLayer,
            annotationDeselectAll = _this$props7.annotationDeselectAll,
            propertiesViewTabUpdate = _this$props7.propertiesViewTabUpdate;

        var forceUpdate = void 0;
        if (annotation.start > -1 && selectionLayer.start === annotation.start && selectionLayer.end === annotation.end) {
          forceUpdate = selectionLayer.forceUpdate === "end" ? "start" : "end";
        }
        _this.updateSelectionOrCaret(event.shiftKey || event.metaKey, _extends({}, annotation, forceUpdate && { forceUpdate: forceUpdate }));
        !event.shiftKey && annotationDeselectAll(undefined);
        annotation.id && annotationSelect(annotation);
        annotation.annotationTypePlural && propertiesViewTabUpdate(annotation.annotationTypePlural, annotation);
      };

      _this.cutsiteClicked_localOverride = function (_ref3) {
        var event = _ref3.event,
            annotation = _ref3.annotation;

        event.preventDefault();
        event.stopPropagation();
        var _this$props8 = _this.props,
            annotationSelect = _this$props8.annotationSelect,
            annotationDeselectAll = _this$props8.annotationDeselectAll;

        _this.updateSelectionOrCaret(event.shiftKey, annotation.topSnipPosition);
        annotationDeselectAll(undefined);
        annotationSelect(annotation);
      };

      _this.warningClicked_localOverride = function (_ref4) {
        var event = _ref4.event,
            annotation = _ref4.annotation;

        event.preventDefault();
        event.stopPropagation();
        var _this$props9 = _this.props,
            annotationSelect = _this$props9.annotationSelect,
            annotationDeselectAll = _this$props9.annotationDeselectAll;

        (0, _teselagenReactComponents.showConfirmationDialog)({
          cancelButtonText: "Cancel",
          confirmButtonText: "Okay",

          canEscapeKeyCancel: true,
          // intent: Intent.NONE,

          // onCancel: undefined,
          text: _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(
              "h3",
              null,
              annotation.name,
              ":"
            ),
            annotation.message
          )
        });
        _this.updateSelectionOrCaret(event.shiftKey, annotation);
        annotationDeselectAll(undefined);
        annotationSelect(annotation);
      };

      _this.getCreateItems = function () {
        var _this$props10 = _this.props,
            readOnly = _this$props10.readOnly,
            sequenceLength = _this$props10.sequenceLength;

        return sequenceLength && readOnly ? [] : [{
          text: "Create",
          submenu: ["newFeature", "newPart", "newPrimer"]
        }];
      };

      _this.insertHelper = {
        onClick: function onClick(e, ctxInfo) {
          _this.handleDnaInsert({
            useEventPositioning: {
              e: e,
              nodeToReFocus: (0, _editorUtils.getNodeToRefocus)(ctxInfo.event.target)
            }
          });
        }
      };

      _this.getCopyOptions = function (annotation) {
        var _this$props11 = _this.props,
            sequenceData = _this$props11.sequenceData,
            readOnly = _this$props11.readOnly;
        var isProtein = sequenceData.isProtein;

        var makeTextCopyable = function makeTextCopyable(transformFunc, className) {
          var _action = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "copy";

          return new _clipboard2.default("." + className, {
            action: function action() {
              return _action;
            },
            text: function text() {
              var _this$props12 = _this.props,
                  selectionLayer = _this$props12.selectionLayer,
                  editorName = _this$props12.editorName,
                  store = _this$props12.store;
              var _store$getState$Vecto = store.getState().VectorEditor[editorName],
                  sequenceData = _store$getState$Vecto.sequenceData,
                  copyOptions = _store$getState$Vecto.copyOptions;

              var selectedSeqData = (0, _veSequenceUtils.getSequenceDataBetweenRange)(sequenceData, selectionLayer, {
                excludePartial: {
                  features: !copyOptions.partialFeatures,
                  parts: !copyOptions.partialParts
                },
                exclude: {
                  features: !copyOptions.features,
                  parts: !copyOptions.parts
                }
              });
              var sequenceDataToCopy = transformFunc(selectedSeqData, sequenceData);

              _this.sequenceDataToCopy = sequenceDataToCopy;
              if (_action === "copy") {
                document.body.addEventListener("copy", _this.handleCopy);
              } else {
                document.body.addEventListener("cut", _this.handleCut);
              }
              if (window.Cypress) {
                window.__tg_copiedSeqData = sequenceDataToCopy;
              }
              return sequenceDataToCopy.sequence;
            }
          });
        };
        // TODO: maybe stop using Clipboard.js and unify clipboard handling with
        // a more versatile approach
        return [].concat(_toConsumableArray(readOnly ? [] : [_extends({
          text: "Replace"
        }, _this.insertHelper), {
          text: "Cut",
          className: "openVeCut",
          willUnmount: function willUnmount() {
            _this.openVeCut && _this.openVeCut.destroy();
          },
          didMount: function didMount(_ref5) {
            var className = _ref5.className;

            // TODO: Maybe use a cut action instead
            _this.openVeCut = makeTextCopyable(function (i) {
              return i;
            }, className, "cut");
          }
        }]), [{
          text: "Copy",
          className: "openVeCopy1",
          willUnmount: function willUnmount() {
            _this.openVeCopy1 && _this.openVeCopy1.destroy();
          },
          didMount: function didMount(_ref6) {
            var className = _ref6.className;

            _this.openVeCopy1 = makeTextCopyable(function (i) {
              return i;
            }, className);
          },
          submenu: !isProtein && [{
            text: "Copy",
            className: "openVeCopy2",
            willUnmount: function willUnmount() {
              _this.openVeCopy2 && _this.openVeCopy2.destroy();
            },
            didMount: function didMount(_ref7) {
              var className = _ref7.className;

              _this.openVeCopy2 = makeTextCopyable(function (i) {
                return i;
              }, className);
            }
          }, {
            text: "Copy Genbank For Selection",
            className: "openVeCopyGenbankForSelection",
            willUnmount: function willUnmount() {
              _this.openVeCopyGenbankForSelection && _this.openVeCopyGenbankForSelection.destroy();
            },
            didMount: function didMount(_ref8) {
              var className = _ref8.className;

              _this.openVeCopyGenbankForSelection = makeTextCopyable(getGenbankFromSelection, className);
            }
          }, {
            text: "Copy Reverse Complement",
            className: "openVeCopyReverse",
            willUnmount: function willUnmount() {
              _this.openVeCopyReverse && _this.openVeCopyReverse.destroy();
            },
            didMount: function didMount(_ref9) {
              var className = _ref9.className;

              _this.openVeCopyReverse = makeTextCopyable(_veSequenceUtils.getReverseComplementSequenceAndAnnotations, className);
            }
          }, {
            text: "Copy AA Sequence",
            className: "openVeCopyAA",
            willUnmount: function willUnmount() {
              _this.openVeCopyAA && _this.openVeCopyAA.destroy();
            },
            didMount: function didMount(_ref10) {
              var className = _ref10.className;

              _this.openVeCopyAA = makeTextCopyable(function (selectedSeqData) {
                return {
                  sequence: (0, _veSequenceUtils.getAminoAcidStringFromSequenceString)(selectedSeqData.sequence)
                };
              }, className);
            }
          }, {
            text: "Copy Reverse Complement AA Sequence",
            className: "openVeCopyAAReverse",
            willUnmount: function willUnmount() {
              _this.openVeCopyAAReverse && _this.openVeCopyAAReverse.destroy();
            },
            didMount: function didMount(_ref11) {
              var className = _ref11.className;

              _this.openVeCopyAAReverse = makeTextCopyable(function (selectedSeqData) {
                return {
                  sequence: (0, _veSequenceUtils.getAminoAcidStringFromSequenceString)((0, _veSequenceUtils.getReverseComplementSequenceAndAnnotations)(selectedSeqData).sequence)
                };
              }, className);
            }
          }, {
            text: "Copy Complement",
            className: "openVeCopyComplement",
            willUnmount: function willUnmount() {
              _this.openVeCopyComplement && _this.openVeCopyComplement.destroy();
            },
            didMount: function didMount(_ref12) {
              var className = _ref12.className;

              _this.openVeCopyComplement = makeTextCopyable(_veSequenceUtils.getComplementSequenceAndAnnotations, className);
            }
          }, _defaultConfig.copyOptionsMenu]
        }, isProtein && _defaultConfig.copyOptionsMenu]);
      };

      _this.getSelectionMenuOptions = function (annotation) {
        var items = [].concat(_toConsumableArray(_this.getCopyOptions(annotation)), [_defaultConfig.createNewAnnotationMenu, "--", "selectInverse", "--", "reverseComplementSelection", "complementSelection", {
          cmd: "changeCaseCmd",
          text: "Change Case",
          submenu: [
          // "upperCaseSequence",
          // "lowerCaseSequence",
          "upperCaseSelection", "lowerCaseSelection"]
        }]);
        return items;
      };

      _this.normalizeAction = function (_ref13, handler) {
        var event = _ref13.event,
            rest = _objectWithoutProperties(_ref13, ["event"]);

        event.preventDefault();
        event.stopPropagation();
        return handler(_extends({ event: event }, rest), _this.props);
      };

      _this.enhanceRightClickAction = function (action, key) {
        return function (opts) {
          var lastFocusedEl = document.activeElement;
          var _this$props$rightClic = _this.props.rightClickOverrides,
              rightClickOverrides = _this$props$rightClic === undefined ? {} : _this$props$rightClic;

          var items = action(opts);
          var e = items && items._event || opts.event || opts;
          e.preventDefault && e.preventDefault();
          e.stopPropagation && e.stopPropagation();
          //override hook here
          var override = rightClickOverrides[key];
          (0, _teselagenReactComponents.showContextMenu)(override ? override(items, opts, _this.props) : items, [_this.commandEnhancer], e, function () {
            if (lastFocusedEl && document.activeElement && (document.activeElement.classList.contains("bp3-popover-enter-done") || document.activeElement.type === "textarea" && //this is the clipboard textarea created by clipboardjs
            document.activeElement.offsetLeft === -9999)) {
              lastFocusedEl.focus();
            }
          }, opts, // context here
          _this.ConnectedMenu);
        };
      };

      _this.selectionLayerRightClicked = _this.enhanceRightClickAction(function (_ref14) {
        var annotation = _ref14.annotation;

        return _this.getSelectionMenuOptions({
          //manually only pluck off the start and end so that if the selection layer was generated from say a feature, those properties won't be carried into the create part/feature/primer dialogs
          start: annotation.start,
          end: annotation.end
        });
      }, "selectionLayerRightClicked");
      _this.digestLaneRightClicked = _this.enhanceRightClickAction(function () {
        return ["newFeature", "newPart"];
      }, "digestLaneRightClicked");
      _this.searchLayerRightClicked = _this.enhanceRightClickAction(function (_ref15) {
        var annotation = _ref15.annotation;

        _this.props.selectionLayerUpdate({
          start: annotation.start,
          end: annotation.end,
          forward: !annotation.bottomStrand
        });
        return _this.getSelectionMenuOptions({
          //manually only pluck off the start and end so that if the selection layer was generated from say a feature, those properties won't be carried into the create part/feature/primer dialogs
          start: annotation.start,
          end: annotation.end,
          forward: !annotation.bottomStrand
        });
      }, "searchLayerRightClicked");
      _this.backgroundRightClicked = _this.enhanceRightClickAction(function (_ref16) {
        var nearestCaretPos = _ref16.nearestCaretPos,
            shiftHeld = _ref16.shiftHeld,
            event = _ref16.event;

        _this.updateSelectionOrCaret(shiftHeld, nearestCaretPos);
        var readOnly = _this.props.readOnly;

        var menu = [].concat(_toConsumableArray(readOnly ? [] : [_extends({
          text: "Insert"
        }, _this.insertHelper)]), ["rotateToCaretPosition"], _toConsumableArray(_this.getCreateItems()), [_extends({}, _viewSubmenu.fullSequenceTranslationMenu, {
          text: "View Full Sequence Translations"
        })]);
        menu._event = event;
        return menu;
      }, "backgroundRightClicked");
      _this.deletionLayerRightClicked = _this.enhanceRightClickAction(function (_ref17) {
        var annotation = _ref17.annotation;
        var _this$props13 = _this.props,
            editorName = _this$props13.editorName,
            dispatch = _this$props13.dispatch;

        return [{
          text: "Remove Deletion",
          // icon: "ion-plus-round",
          onClick: function onClick() {
            dispatch({
              type: "DELETION_LAYER_DELETE",
              meta: { editorName: editorName },
              payload: _extends({}, annotation)
            });
          }
        }];
      }, "deletionLayerRightClicked");
      _this.partRightClicked = _this.enhanceRightClickAction(function (_ref18) {
        var annotation = _ref18.annotation;

        _this.props.selectionLayerUpdate({
          start: annotation.start,
          end: annotation.end
        });
        return ["editPart", "deletePart", "--"].concat(_toConsumableArray(_this.getSelectionMenuOptions(annotation)), ["--", "newTranslation", "newReverseTranslation", "--", "showRemoveDuplicatesDialogParts", "viewPartProperties"]);
      }, "partRightClicked");
      _this.featureRightClicked = _this.enhanceRightClickAction(function (_ref19) {
        var annotation = _ref19.annotation,
            event = _ref19.event;

        _this.props.selectionLayerUpdate({
          start: annotation.start,
          end: annotation.end
        });
        event.persist();
        var _this$props14 = _this.props,
            readOnly = _this$props14.readOnly,
            showMergeFeaturesDialog = _this$props14.showMergeFeaturesDialog,
            _this$props14$annotat = _this$props14.annotationsToSupport;
        _this$props14$annotat = _this$props14$annotat === undefined ? {} : _this$props14$annotat;
        var parts = _this$props14$annotat.parts;

        return ["editFeature", "deleteFeature"].concat(_toConsumableArray(_this.getSelectionMenuOptions(annotation)), _toConsumableArray(readOnly ? [] : [].concat(_toConsumableArray(parts && ["--", {
          text: "Make a Part from Feature",
          onClick: function () {
            var _ref20 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
              var _this$props15, sequenceData, upsertPart, doAction;

              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _this$props15 = _this.props, sequenceData = _this$props15.sequenceData, upsertPart = _this$props15.upsertPart;

                      if (!(0, _lodash.some)(sequenceData.parts, function (part) {
                        if (part.start === annotation.start && part.end === annotation.end) {
                          return true;
                        }
                      })) {
                        _context.next = 7;
                        break;
                      }

                      _context.next = 4;
                      return (0, _teselagenReactComponents.showConfirmationDialog)({
                        text: "A part already exists that matches this feature's range. Do you want to make one anyways?",
                        confirmButtonText: "Create Part",
                        canEscapeKeyCancel: true //this is false by default
                      });

                    case 4:
                      doAction = _context.sent;

                      if (doAction) {
                        _context.next = 7;
                        break;
                      }

                      return _context.abrupt("return");

                    case 7:
                      upsertPart({
                        start: annotation.start,
                        end: annotation.end,
                        type: annotation.type,
                        forward: annotation.forward,
                        name: annotation.name
                      });

                    case 8:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, _this2);
            }));

            return function onClick() {
              return _ref20.apply(this, arguments);
            };
          }()
        }]), [{
          text: "Merge With Another Feature",
          onClick: function onClick() {
            _this.annotationClicked({
              annotation: annotation,
              event: _extends({}, event, { shiftHeld: true })
            });
            // annotationSelect(annotation)
            showMergeFeaturesDialog(annotation);
          }
        }, "showRemoveDuplicatesDialogFeatures", "--"])), ["toggleCdsFeatureTranslations", "--", "newTranslation", "newReverseTranslation", "--", "viewFeatureProperties"]);
      }, "featureRightClicked");
      _this.cutsiteRightClicked = _this.enhanceRightClickAction(function () {
        return ["viewCutsiteProperties"];
      }, "cutsiteRightClicked");
      _this.primerRightClicked = _this.enhanceRightClickAction(function (_ref21) {
        var annotation = _ref21.annotation;

        _this.props.selectionLayerUpdate({
          start: annotation.start,
          end: annotation.end
        });
        return ["editPrimer", "deletePrimer"].concat(_toConsumableArray(_this.getSelectionMenuOptions(annotation)), ["newTranslation", "newReverseTranslation", "showRemoveDuplicatesDialogPrimers", "viewPrimerProperties"]);
      }, "primerRightClicked");
      _this.orfRightClicked = _this.enhanceRightClickAction(function (_ref22) {
        var annotation = _ref22.annotation;

        _this.props.selectionLayerUpdate({
          start: annotation.start,
          end: annotation.end
        });
        return ["toggleOrfTranslations"].concat(_toConsumableArray(_this.getSelectionMenuOptions(annotation)), ["viewOrfProperties"]);
      }, "orfRightClicked");
      _this.translationRightClicked = _this.enhanceRightClickAction(function (_ref23) {
        var event = _ref23.event,
            annotation = _ref23.annotation;

        event.preventDefault();
        event.stopPropagation();
        var _this$props16 = _this.props,
            selectionLayerUpdate = _this$props16.selectionLayerUpdate,
            annotationVisibilityToggle = _this$props16.annotationVisibilityToggle;

        _this.props.selectionLayerUpdate({
          start: annotation.start,
          end: annotation.end
        });
        if (annotation.isOrf) {
          return [{
            text: "Hide Orf Translations",
            onClick: function onClick() {
              annotationVisibilityToggle("orfTranslations");
            }
          }, "viewOrfProperties"];
        }
        return ["deleteTranslation", {
          text: "Select Translation",
          onClick: function onClick() {
            selectionLayerUpdate({
              start: annotation.start,
              end: annotation.end
            });
          }
        }].concat(_toConsumableArray(_this.getSelectionMenuOptions(annotation)), ["viewTranslationProperties"]);
      }, "translationRightClicked");

      annotationClickHandlers.forEach(function (handler) {
        _this[handler] = function () {
          var _this$props$clickOver = _this.props.clickOverrides,
              clickOverrides = _this$props$clickOver === undefined ? {} : _this$props$clickOver;

          var preventDefault = void 0;
          var defaultHandler = _this[handler + "_localOverride"] ? _this[handler + "_localOverride"] : _this.annotationClicked;
          if (clickOverrides[handler]) {
            preventDefault = clickOverrides[handler].apply(clickOverrides, arguments);
          }
          !preventDefault && defaultHandler.apply(undefined, arguments);
        };
      });

      var ConnectedMenu = (0, _withEditorProps2.default)(function (_ref24) {
        var children = _ref24.children;
        return _react2.default.createElement(
          _core.Menu,
          null,
          children
        );
      });
      _this.ConnectedMenu = function (props) {
        return _react2.default.createElement(ConnectedMenu, _extends({ store: _this.props.store }, props));
      };
      return _this;
    }

    _createClass(VectorInteractionWrapper, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.combokeys && this.combokeys.detach();
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this3 = this;

        this.editorDragged = _clickAndDragUtils.editorDragged.bind(this);
        this.editorClicked = _clickAndDragUtils.editorClicked.bind(this);
        this.editorDragStarted = _clickAndDragUtils.editorDragStarted.bind(this);
        this.editorDragStopped = _clickAndDragUtils.editorDragStopped.bind(this);

        // combokeys.stop();
        // combokeys.watch(this.node)
        if (!this.node) return;
        this.combokeys = new _combokeys2.default(this.node);
        // bindGlobalPlugin(this.combokeys);

        // bind a bunch of this.combokeys shortcuts we're interested in catching
        // we're using the "combokeys" library which extends mousetrap (available thru npm: https://www.npmjs.com/package/br-mousetrap)
        // documentation: https://craig.is/killing/mice
        this.combokeys.bind(getAcceptedChars(this.props.sequenceData && this.props.sequenceData.isProtein).split(""), function (event) {
          _this3.handleDnaInsert(event);
        });

        // TODO: move these into commands
        var moveCaretBindings = [{ keyCombo: ["left", "shift+left"], type: "moveCaretLeftOne" }, { keyCombo: ["right", "shift+right"], type: "moveCaretRightOne" }, { keyCombo: ["up", "shift+up"], type: "moveCaretUpARow" }, { keyCombo: ["down", "shift+down"], type: "moveCaretDownARow" }, {
          keyCombo: ["alt+right", "alt+shift+right"],
          type: "moveCaretToEndOfRow"
        }, {
          keyCombo: ["alt+left", "alt+shift+left"],
          type: "moveCaretToStartOfRow"
        }, {
          keyCombo: ["alt+up", "alt+shift+up"],
          type: "moveCaretToStartOfSequence"
        }, {
          keyCombo: ["alt+down", "alt+shift+down"],
          type: "moveCaretToEndOfSequence"
        }];

        moveCaretBindings.forEach(function (_ref25) {
          var keyCombo = _ref25.keyCombo,
              type = _ref25.type;

          _this3.combokeys.bind(keyCombo, function (event) {
            var shiftHeld = event.shiftKey;
            var bpsPerRow = (0, _getBpsPerRow2.default)(_this3.props);
            var _props = _this3.props,
                selectionLayer = _props.selectionLayer,
                caretPosition = _props.caretPosition,
                sequenceLength = _props.sequenceLength,
                _props$sequenceData = _props.sequenceData;
            _props$sequenceData = _props$sequenceData === undefined ? {} : _props$sequenceData;
            var isProtein = _props$sequenceData.isProtein,
                circular = _props$sequenceData.circular,
                circular2 = _props.circular,
                caretPositionUpdate = _props.caretPositionUpdate,
                selectionLayerUpdate = _props.selectionLayerUpdate;

            var moveBy = (0, _moveCaret2.default)({
              sequenceLength: sequenceLength,
              bpsPerRow: bpsPerRow,
              caretPosition: caretPosition,
              selectionLayer: selectionLayer,
              isProtein: isProtein,
              shiftHeld: shiftHeld,
              type: type
            });
            (0, _clickAndDragUtils.handleCaretMoved)({
              moveBy: moveBy,
              circular: circular || circular2,
              sequenceLength: sequenceLength,
              bpsPerRow: bpsPerRow,
              caretPosition: caretPosition,
              selectionLayer: selectionLayer,
              shiftHeld: shiftHeld,
              type: type,
              caretPositionUpdate: caretPositionUpdate,
              selectionLayerUpdate: selectionLayerUpdate
            });
            event.stopPropagation();
          });
        });

        this.combokeys.bind(["backspace", "del"], function (event) {
          // Handle shortcut
          _this3.handleDnaDelete(event);
        });

        this.commandEnhancer = (0, _teselagenReactComponents.commandMenuEnhancer)((0, _commands2.default)(this), {
          useTicks: true,
          omitIcons: true
        });
      }

      // eslint-disable-next-line no-unused-vars

    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var _props2 = this.props,
            closePanelButton = _props2.closePanelButton,
            _props2$selectionLaye = _props2.selectionLayer,
            selectionLayer = _props2$selectionLaye === undefined ? { start: -1, end: -1 } : _props2$selectionLaye,
            _props2$sequenceData = _props2.sequenceData,
            sequenceData = _props2$sequenceData === undefined ? { sequence: "" } : _props2$sequenceData,
            tabHeight = _props2.tabHeight;
        //do this in two steps to determine propsToPass

        var _props3 = this.props,
            children = _props3.children,
            _props3$vectorInterac = _props3.vectorInteractionWrapperStyle,
            vectorInteractionWrapperStyle = _props3$vectorInterac === undefined ? {} : _props3$vectorInterac,
            _props3$disableEditor = _props3.disableEditorClickAndDrag,
            disableEditorClickAndDrag = _props3$disableEditor === undefined ? false : _props3$disableEditor,
            propsToPass = _objectWithoutProperties(_props3, ["children", "vectorInteractionWrapperStyle", "disableEditorClickAndDrag"]);

        var _ref26 = this.props.dimensions || {},
            width = _ref26.width,
            height = _ref26.height;

        propsToPass.width = width;
        propsToPass.height = height - tabHeight;
        // if (fitHeight) {
        // }
        var selectedBps = (0, _veRangeUtils.getSequenceWithinRange)(selectionLayer, sequenceData.sequence);
        if (!disableEditorClickAndDrag) {
          propsToPass = _extends({}, propsToPass, {
            selectionLayerRightClicked: this.selectionLayerRightClicked,
            digestLaneRightClicked: this.digestLaneRightClicked,
            searchLayerRightClicked: this.searchLayerRightClicked,
            backgroundRightClicked: this.backgroundRightClicked,
            featureRightClicked: this.featureRightClicked,
            partRightClicked: this.partRightClicked,
            orfRightClicked: this.orfRightClicked,
            deletionLayerRightClicked: this.deletionLayerRightClicked,
            cutsiteRightClicked: this.cutsiteRightClicked,
            translationRightClicked: this.translationRightClicked,
            primerRightClicked: this.primerRightClicked
          }, annotationClickHandlers.reduce(function (acc, handler) {
            acc[handler] = _this4[handler];
            return acc;
          }, {}), {
            editorDragged: this.editorDragged,
            editorDragStarted: this.editorDragStarted,
            editorClicked: this.editorClicked,
            editorDragStopped: this.editorDragStopped
          });
        }
        // propsToPass.triggerClipboardCommand = this.triggerClipboardCommand;

        return _react2.default.createElement(
          "div",
          {
            tabIndex: 0 //this helps with focusing using Keyboard's parentElement.focus()
            , ref: function ref(c) {
              return _this4.node = c;
            },
            className: "veVectorInteractionWrapper",
            style: _extends({ position: "relative" }, vectorInteractionWrapperStyle),
            onFocus: this.handleWrapperFocus
          },
          closePanelButton,
          _react2.default.createElement(_Keyboard2.default, {
            value: selectedBps,
            onCopy: this.handleCopy,
            onPaste: this.handlePaste,
            onCut: this.handleCut
          }),
          _react2.default.createElement(Component, propsToPass)
        );
      }
    }]);

    return VectorInteractionWrapper;
  }(_react2.default.Component);
}

exports.default = (0, _redux.compose)(
//tnr: get the store from the context somehow and pass it to the FrameTranslationMenuItems
// withContext({ store: PropTypes.object }, ({ store }) => {
//   return { store };
// }),
(0, _recompose.getContext)({
  store: _propTypes2.default.object
}),
// connect(),
_withEditorProps2.default, (0, _recompose.branch)(function (_ref27) {
  var noInteractions = _ref27.noInteractions;
  return !noInteractions;
}, VectorInteractionHOC));


function getGenbankFromSelection(selectedSeqData, sequenceData) {
  var spansEntireSeq = sequenceData.sequence.length === selectedSeqData.sequence.length;
  var feats = (0, _lodash.map)(selectedSeqData.features);
  var just1Feat = feats.length === 1;

  return {
    sequence: (0, _bioParsers.jsonToGenbank)(_extends({}, selectedSeqData, {
      name: spansEntireSeq ? selectedSeqData.name : just1Feat ? feats[0].name : selectedSeqData.name + "_partial",
      circular: spansEntireSeq ? selectedSeqData.circular : false
    }))
  };
}

var insertAndSelectHelper = function insertAndSelectHelper(_ref28) {
  var seqDataToInsert = _ref28.seqDataToInsert,
      props = _ref28.props;
  var updateSequenceData = props.updateSequenceData,
      wrappedInsertSequenceDataAtPositionOrRange = props.wrappedInsertSequenceDataAtPositionOrRange,
      sequenceData = props.sequenceData,
      selectionLayerUpdate = props.selectionLayerUpdate,
      caretPosition = props.caretPosition,
      selectionLayer = props.selectionLayer;

  // sequenceData,
  //             caretPosition,
  //             selectionLayer

  // updateSequenceData(
  //   wrappedInsertSequenceDataAtPositionOrRange(
  //     seqDataToInsert,
  //     sequenceData,
  //     caretPosition > -1 ? caretPosition : selectionLayer
  //   )
  // );

  // const newSelectionLayerStart =
  //   caretPosition > -1 ? caretPosition : (selectionLayer.start > selectionLayer.end ? 0 : selectionLayer.start);
  // selectionLayerUpdate({
  //   start: newSelectionLayerStart,
  //   end: newSelectionLayerStart + seqDataToInsert.sequence.length - 1
  // });

  var _wrappedInsertSequenc3 = wrappedInsertSequenceDataAtPositionOrRange(seqDataToInsert, sequenceData, caretPosition > -1 ? caretPosition : selectionLayer),
      _wrappedInsertSequenc4 = _slicedToArray(_wrappedInsertSequenc3, 2),
      newSeqData = _wrappedInsertSequenc4[0],
      maintainOriginSplit = _wrappedInsertSequenc4[1].maintainOriginSplit;

  updateSequenceData(newSeqData);
  var seqDataInsertLength = seqDataToInsert.sequence ? seqDataToInsert.sequence.length : null;
  var selectionStartDistanceFromEnd = Math.min(sequenceData.size - selectionLayer.start, seqDataInsertLength) || seqDataInsertLength;

  var newSelectionLayerStart = caretPosition > -1 ? caretPosition : selectionLayer.start > selectionLayer.end ? maintainOriginSplit ? newSeqData.size - selectionStartDistanceFromEnd : 0 : selectionLayer.start;
  var newSelectionLayerEnd = newSelectionLayerStart + (seqDataToInsert.sequence ? seqDataToInsert.sequence.length - 1 : seqDataToInsert.proteinSequence ? seqDataToInsert.proteinSequence.length * 3 - 1 : 0);
  selectionLayerUpdate({
    start: newSelectionLayerStart,
    end: newSelectionLayerEnd % newSeqData.sequence.length
  });
};
module.exports = exports["default"];