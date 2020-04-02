"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withEditorPropsNoRedux = exports.connectToEditor = exports.exportSequenceToFile = exports.importSequenceFromFile = exports.updateCircular = exports.handleInverse = exports.handleSave = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.mapDispatchToActions = mapDispatchToActions;
exports.fakeActionOverrides = fakeActionOverrides;
exports.getCombinedActions = getCombinedActions;

var _bioParsers = require("bio-parsers");

var _fileSaver = require("file-saver");

var _fileSaver2 = _interopRequireDefault(_fileSaver);

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _recompose = require("recompose");

var _reduxForm = require("redux-form");

var _teselagenReactComponents = require("teselagen-react-components");

var _lodash = require("lodash");

var _veSequenceUtils = require("ve-sequence-utils");

var _core = require("@blueprintjs/core");

var _veRangeUtils = require("ve-range-utils");

var _addMetaToActionCreators = require("../redux/utils/addMetaToActionCreators");

var _addMetaToActionCreators2 = _interopRequireDefault(_addMetaToActionCreators);

var _redux2 = require("../redux");

var _selectors = require("../selectors");

var _selectors2 = _interopRequireDefault(_selectors);

var _annotationTypes = require("../utils/annotationTypes");

var _findToolConstants = require("../constants/findToolConstants");

var _reselect = require("reselect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const addFeatureSelector = formValueSelector("AddOrEditFeatureDialog");
// const addPrimerSelector = formValueSelector("AddOrEditPrimerDialog");
// const addPartSelector = formValueSelector("AddOrEditPartDialog");

var handleSave = exports.handleSave = function handleSave(props) {
  return function () {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var onSave = props.onSave,
        onSaveAs = props.onSaveAs,
        readOnly = props.readOnly,
        alwaysAllowSave = props.alwaysAllowSave,
        sequenceData = props.sequenceData,
        lastSavedIdUpdate = props.lastSavedIdUpdate;

    var saveHandler = opts.isSaveAs ? onSaveAs || onSave : onSave;

    var updateLastSavedIdToCurrent = function updateLastSavedIdToCurrent() {
      lastSavedIdUpdate(sequenceData.stateTrackingId);
    };
    var promiseOrVal = (!readOnly || alwaysAllowSave || opts.isSaveAs) && saveHandler && saveHandler(opts, (0, _veSequenceUtils.tidyUpSequenceData)(sequenceData, { annotationsAsObjects: true }), props, updateLastSavedIdToCurrent);

    if (promiseOrVal && promiseOrVal.then) {
      return promiseOrVal.then(updateLastSavedIdToCurrent);
    }
  };
};

var handleInverse = exports.handleInverse = function handleInverse(props) {
  return function () {
    var sequenceLength = props.sequenceLength,
        selectionLayer = props.selectionLayer,
        caretPosition = props.caretPosition,
        selectionLayerUpdate = props.selectionLayerUpdate,
        caretPositionUpdate = props.caretPositionUpdate;


    if (sequenceLength <= 0) {
      return false;
    }
    if (selectionLayer.start > -1) {
      if ((0, _veRangeUtils.getRangeLength)(selectionLayer, sequenceLength) === sequenceLength) {
        caretPositionUpdate(selectionLayer.start);
      } else {
        selectionLayerUpdate((0, _veRangeUtils.invertRange)(selectionLayer, sequenceLength));
      }
    } else {
      if (caretPosition > -1) {
        selectionLayerUpdate((0, _veRangeUtils.normalizeRange)({
          start: caretPosition,
          end: caretPosition - 1
        }, sequenceLength));
      } else {
        selectionLayerUpdate({
          start: 0,
          end: sequenceLength - 1
        });
      }
    }
  };
};

var updateCircular = exports.updateCircular = function updateCircular(props) {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(isCircular) {
      var _updateCircular, updateSequenceData, sequenceData, doAction;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _updateCircular = props._updateCircular, updateSequenceData = props.updateSequenceData, sequenceData = props.sequenceData;

              if (!(!isCircular && hasAnnotationThatSpansOrigin(sequenceData))) {
                _context.next = 8;
                break;
              }

              _context.next = 4;
              return (0, _teselagenReactComponents.showConfirmationDialog)({
                intent: _core.Intent.DANGER, //applied to the right most confirm button
                confirmButtonText: "Truncate Annotations",
                canEscapeKeyCancel: true, //this is false by default
                text: "Careful! Origin spanning annotations will be truncated. Are you sure you want to make the sequence linear?"
              });

            case 4:
              doAction = _context.sent;

              if (doAction) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return");

            case 7:
              //stop early
              updateSequenceData(truncateOriginSpanningAnnotations(sequenceData), {
                batchUndoStart: true
              });

            case 8:
              _updateCircular(isCircular, { batchUndoEnd: true });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

var importSequenceFromFile = exports.importSequenceFromFile = function importSequenceFromFile(props) {
  return function (file) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var updateSequenceData = props.updateSequenceData,
        onImport = props.onImport;

    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      var _this = this;

      var content = evt.target.result;
      (0, _bioParsers.anyToJson)(content, function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(result) {
          var failed, messages, seqData;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  // TODO maybe handle import errors/warnings better
                  failed = !result[0].success;
                  messages = result[0].messages;

                  if (messages && messages.length) {
                    messages.forEach(function (msg) {
                      var type = msg.substr(0, 20).toLowerCase().includes("error") ? failed ? "error" : "warning" : "info";
                      window.toastr[type](msg);
                    });
                  }
                  if (failed) {
                    window.toastr.error("Error importing sequence");
                  }
                  seqData = result[0].parsedSequence;

                  if (!onImport) {
                    _context2.next = 9;
                    break;
                  }

                  _context2.next = 8;
                  return onImport(seqData);

                case 8:
                  seqData = _context2.sent;

                case 9:

                  if (seqData) {
                    updateSequenceData(seqData);
                    window.toastr.success("Sequence Imported");
                  }

                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, _this);
        }));

        return function (_x4) {
          return _ref2.apply(this, arguments);
        };
      }(), _extends({ acceptParts: true }, opts));
    };
    reader.onerror = function () {
      window.toastr.error("Could not read file.");
    };
  };
};

var exportSequenceToFile = exports.exportSequenceToFile = function exportSequenceToFile(props) {
  return function (format) {
    var sequenceData = props.sequenceData;

    var convert = void 0,
        fileExt = void 0;

    if (format === "genbank") {
      convert = _bioParsers.jsonToGenbank;
      fileExt = "gb";
    } else if (format === "genpept") {
      convert = _bioParsers.jsonToGenbank;
      fileExt = "gp";
    } else if (format === "teselagenJson") {
      convert = JSON.stringify;
      fileExt = "json";
    } else if (format === "fasta") {
      convert = _bioParsers.jsonToFasta;
      fileExt = "fasta";
    } else {
      console.error("Invalid export format: '" + format + "'"); // dev error
      return;
    }
    var blob = new Blob([convert(sequenceData)], { type: "text/plain" });
    var filename = (sequenceData.name || "Untitled_Sequence") + "." + fileExt;
    _fileSaver2.default.saveAs(blob, filename);
    window.toastr.success("File Downloaded Successfully");
  };
};

/**
 * This function basically connects the wrapped component with all of the state stored in a given editor instance
 * and then some extra goodies like computed properties and namespace bound action handlers
 */
exports.default = (0, _recompose.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToActions, null, { pure: false }), (0, _recompose.withHandlers)({
  wrappedInsertSequenceDataAtPositionOrRange: function wrappedInsertSequenceDataAtPositionOrRange(props) {
    return function (_sequenceDataToInsert, _existingSequenceData, _caretPositionOrRange, _options) {
      var _ref3 = props.beforeSequenceInsertOrDelete ? props.beforeSequenceInsertOrDelete((0, _veSequenceUtils.tidyUpSequenceData)(_sequenceDataToInsert), (0, _veSequenceUtils.tidyUpSequenceData)(_existingSequenceData), _caretPositionOrRange, _options) || {} : {},
          sequenceDataToInsert = _ref3.sequenceDataToInsert,
          existingSequenceData = _ref3.existingSequenceData,
          caretPositionOrRange = _ref3.caretPositionOrRange,
          options = _ref3.options;

      return [(0, _veSequenceUtils.insertSequenceDataAtPositionOrRange)(sequenceDataToInsert || _sequenceDataToInsert, existingSequenceData || _existingSequenceData, caretPositionOrRange || _caretPositionOrRange, options || _options), options || _options || {}];
    };
  },

  upsertTranslation: function upsertTranslation(props) {
    return function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(translationToUpsert) {
        var _upsertTranslation, sequenceData, doAction;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (translationToUpsert) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                _upsertTranslation = props._upsertTranslation, sequenceData = props.sequenceData;

                if (!(!translationToUpsert.id && (0, _lodash.some)(sequenceData.translations || [], function (existingTranslation) {
                  if (
                  //check if an identical existingTranslation exists already
                  existingTranslation.translationType === "User Created" && existingTranslation.start === translationToUpsert.start && existingTranslation.end === translationToUpsert.end && !!translationToUpsert.forward === !!existingTranslation.forward) {
                    return true;
                  }
                }))) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 6;
                return (0, _teselagenReactComponents.showConfirmationDialog)({
                  // intent: Intent.DANGER, //applied to the right most confirm button
                  confirmButtonText: "Create Translation",
                  canEscapeKeyCancel: true, //this is false by default
                  text: "This region has already been translated. Are you sure you want to make another translation for it?"
                });

              case 6:
                doAction = _context3.sent;

                if (doAction) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt("return");

              case 9:
                _upsertTranslation(translationToUpsert);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function (_x5) {
        return _ref4.apply(this, arguments);
      };
    }();
  }
}), (0, _recompose.withHandlers)(_extends({
  handleSave: handleSave,
  importSequenceFromFile: importSequenceFromFile,
  exportSequenceToFile: exportSequenceToFile,
  updateCircular: updateCircular,
  //add additional "computed handlers here"
  selectAll: function selectAll(props) {
    return function () {
      var sequenceLength = props.sequenceLength,
          selectionLayerUpdate = props.selectionLayerUpdate;

      sequenceLength > 0 && selectionLayerUpdate({
        start: 0,
        end: sequenceLength - 1
      });
    };
  }
}, ["Part", "Feature", "Primer"].reduce(function (acc, key) {
  acc["handleNew" + key] = function (props) {
    return function () {
      var readOnly = props.readOnly,
          selectionLayer = props.selectionLayer,
          caretPosition = props.caretPosition,
          sequenceData = props.sequenceData;

      var handler = props["showAddOrEdit" + key + "Dialog"];

      if (readOnly) {
        window.toastr.warning("Sorry, Can't Create New " + key + "s in Read-Only Mode");
      } else {
        var rangeToUse = selectionLayer.start > -1 ? selectionLayer : caretPosition > -1 ? {
          start: caretPosition,
          end: sequenceData.isProtein ? caretPosition + 2 : caretPosition
        } : {
          start: 0,
          end: sequenceData.isProtein ? 2 : 0
        };

        handler(_extends({}, rangeToUse, {
          forward: !(selectionLayer.forward === false)
        }));
      }
    };
  };
  return acc;
}, {}), {

  handleRotateToCaretPosition: function handleRotateToCaretPosition(props) {
    return function () {
      var caretPosition = props.caretPosition,
          readOnly = props.readOnly,
          sequenceData = props.sequenceData,
          updateSequenceData = props.updateSequenceData,
          caretPositionUpdate = props.caretPositionUpdate;

      if (readOnly) {
        return;
      }
      if (caretPosition < 0) return;
      updateSequenceData((0, _veSequenceUtils.rotateSequenceDataToPosition)(sequenceData, caretPosition));
      caretPositionUpdate(0);
    };
  },

  handleReverseComplementSelection: function handleReverseComplementSelection(props) {
    return function () {
      var sequenceData = props.sequenceData,
          updateSequenceData = props.updateSequenceData,
          wrappedInsertSequenceDataAtPositionOrRange = props.wrappedInsertSequenceDataAtPositionOrRange,
          selectionLayer = props.selectionLayer;

      if (!(selectionLayer.start > -1)) {
        return; //return early
      }
      var reversedSeqData = (0, _veSequenceUtils.getReverseComplementSequenceAndAnnotations)(sequenceData, {
        range: selectionLayer
      });

      var _wrappedInsertSequenc = wrappedInsertSequenceDataAtPositionOrRange(reversedSeqData, sequenceData, selectionLayer, {
        maintainOriginSplit: true
      }),
          _wrappedInsertSequenc2 = _slicedToArray(_wrappedInsertSequenc, 1),
          newSeqData = _wrappedInsertSequenc2[0];

      updateSequenceData(newSeqData);
    };
  },

  handleComplementSelection: function handleComplementSelection(props) {
    return function () {
      var sequenceData = props.sequenceData,
          updateSequenceData = props.updateSequenceData,
          selectionLayer = props.selectionLayer,
          wrappedInsertSequenceDataAtPositionOrRange = props.wrappedInsertSequenceDataAtPositionOrRange;

      if (!(selectionLayer.start > -1)) {
        return; //return early
      }
      var comp = (0, _veSequenceUtils.getComplementSequenceAndAnnotations)(sequenceData, {
        range: selectionLayer
      });

      var _wrappedInsertSequenc3 = wrappedInsertSequenceDataAtPositionOrRange(comp, sequenceData, selectionLayer, {
        maintainOriginSplit: true
      }),
          _wrappedInsertSequenc4 = _slicedToArray(_wrappedInsertSequenc3, 1),
          newSeqData = _wrappedInsertSequenc4[0];

      updateSequenceData(newSeqData);
    };
  },

  handleReverseComplementSequence: function handleReverseComplementSequence(props) {
    return function () {
      var sequenceData = props.sequenceData,
          updateSequenceData = props.updateSequenceData;

      updateSequenceData((0, _veSequenceUtils.getReverseComplementSequenceAndAnnotations)(sequenceData));
      window.toastr.success("Reverse Complemented Sequence Successfully");
    };
  },

  handleComplementSequence: function handleComplementSequence(props) {
    return function () {
      var sequenceData = props.sequenceData,
          updateSequenceData = props.updateSequenceData;

      updateSequenceData((0, _veSequenceUtils.getComplementSequenceAndAnnotations)(sequenceData));
      window.toastr.success("Complemented Sequence Successfully");
    };
  },
  /* eslint-enable no-unused-vars */

  // handleNewPrimer: props => () => {
  //   const {
  //     selectionLayer,
  //     caretPosition,
  //     showAddOrEditPrimerDialog,
  //     readOnly
  //     // sequenceLength
  //   } = props;
  //   const rangeToUse =
  //     selectionLayer.start > -1
  //       ? selectionLayer
  //       : caretPosition > -1
  //       ? { start: caretPosition, end: caretPosition }
  //       : undefined;
  //   if (readOnly) {
  //     window.toastr.warning(
  //       "Sorry, can't create new primers in read-only mode"
  //     );
  //   } else {
  //     showAddOrEditPrimerDialog({ ...rangeToUse, forward: true });
  //   }
  // },
  handleInverse: handleInverse
})));


function mapStateToProps(state, ownProps) {
  var editorName = ownProps.editorName,
      sequenceDataFromProps = ownProps.sequenceData,
      allowSeqDataOverride = ownProps.allowSeqDataOverride;

  var meta = { editorName: editorName };
  var VectorEditor = state.VectorEditor;
  var __allEditorsOptions = VectorEditor.__allEditorsOptions;
  var uppercaseSequenceMapFont = __allEditorsOptions.uppercaseSequenceMapFont;

  var editorState = VectorEditor[editorName];

  if (!editorState) {
    return (0, _redux2.editorReducer)({}, {});
  }

  var findTool = editorState.findTool,
      annotationVisibility = editorState.annotationVisibility,
      annotationLabelVisibility = editorState.annotationLabelVisibility,
      _editorState$annotati = editorState.annotationsToSupport,
      annotationsToSupport = _editorState$annotati === undefined ? {} : _editorState$annotati;

  var visibilities = getVisibilities(annotationVisibility, annotationLabelVisibility, annotationsToSupport);
  var annotationToAdd =
  // addFeatureSelector(state, "start", "end") ||
  // addPrimerSelector(state, "start", "end") ||
  // addPartSelector(state, "start", "end");
  (0, _reduxForm.getFormValues)("AddOrEditFeatureDialog")(state) || (0, _reduxForm.getFormValues)("AddOrEditPrimerDialog")(state) || (0, _reduxForm.getFormValues)("AddOrEditPartDialog")(state);

  var toReturn = _extends({}, editorState, {
    meta: meta
  }, annotationToAdd && {
    selectionLayer: {
      start: (annotationToAdd.start || 1) - 1,
      end: (annotationToAdd.end || 1) - 1
    }
  });
  if (sequenceDataFromProps && allowSeqDataOverride) {
    //return early here because we don't want to override the sequenceData being passed in
    //this is a little hacky but allows us to track selectionLayer/caretIndex using redux but on a sequence that isn't being stored alongside that info
    return toReturn;
  }

  var sequenceData = _selectors2.default.sequenceDataSelector(editorState);
  var filteredCutsites = _selectors2.default.filteredCutsitesSelector(editorState);
  var cutsites = filteredCutsites.cutsitesArray;
  var filteredRestrictionEnzymes = _selectors2.default.filteredRestrictionEnzymesSelector(editorState);
  var orfs = _selectors2.default.orfsSelector(editorState);
  var selectedCutsites = _selectors2.default.selectedCutsitesSelector(editorState);
  var allCutsites = _selectors2.default.cutsitesSelector(editorState);
  var translations = _selectors2.default.translationsSelector(editorState);
  var filteredFeatures = _selectors2.default.filteredFeaturesSelector(editorState);
  var sequenceLength = _selectors2.default.sequenceLengthSelector(editorState);

  var matchedSearchLayer = { start: -1, end: -1 };
  var annotationSearchMatches = _selectors2.default.annotationSearchSelector(editorState);
  var searchLayers = _selectors2.default.searchLayersSelector(editorState).map(function (item, index) {
    var itemToReturn = item;
    if (index === findTool.matchNumber) {
      itemToReturn = _extends({}, item, {
        className: item.className + " veSearchLayerActive"
      });
      matchedSearchLayer = itemToReturn;
    }
    return itemToReturn;
  });
  var matchesTotal = searchLayers.length;
  if (!findTool.highlightAll && searchLayers[findTool.matchNumber] || searchLayers.length > _findToolConstants.MAX_MATCHES_DISPLAYED) {
    searchLayers = [searchLayers[findTool.matchNumber]];
  }
  this.sequenceData = sequenceData;
  this.cutsites = cutsites;
  this.orfs = orfs;
  this.translations = translations;

  var sequenceDataToUse = _extends({}, sequenceData, {
    sequence: getUpperOrLowerSeq(uppercaseSequenceMapFont, sequenceData.sequence),
    filteredFeatures: filteredFeatures,
    cutsites: cutsites,
    orfs: orfs,
    translations: translations
  });
  return _extends({}, toReturn, {
    selectedCutsites: selectedCutsites,
    sequenceLength: sequenceLength,
    allCutsites: allCutsites,
    filteredCutsites: filteredCutsites,
    filteredRestrictionEnzymes: filteredRestrictionEnzymes,
    annotationSearchMatches: annotationSearchMatches,
    searchLayers: searchLayers,
    matchedSearchLayer: matchedSearchLayer,
    findTool: _extends({}, findTool, {
      matchesTotal: matchesTotal
    }),
    annotationVisibility: visibilities.annotationVisibilityToUse,
    typesToOmit: visibilities.typesToOmit,
    annotationLabelVisibility: visibilities.annotationLabelVisibilityToUse,
    sequenceData: sequenceDataToUse,
    uppercaseSequenceMapFont: uppercaseSequenceMapFont
  });
}

function mapDispatchToActions(dispatch, ownProps) {
  var editorName = ownProps.editorName;
  var _ownProps$actionOverr = ownProps.actionOverrides,
      actionOverrides = _ownProps$actionOverr === undefined ? fakeActionOverrides : _ownProps$actionOverr;

  var actionsToPass = getCombinedActions(editorName, _redux2.actions, actionOverrides, dispatch);
  var updateSel = ownProps.selectionLayerUpdate || actionsToPass.selectionLayerUpdate;
  var updateCar = ownProps.caretPositionUpdate || actionsToPass.caretPositionUpdate;
  return _extends({}, actionsToPass, {
    selectionLayerUpdate: ownProps.onSelectionOrCaretChanged ? function (selectionLayer) {
      ownProps.onSelectionOrCaretChanged({
        selectionLayer: selectionLayer,
        caretPosition: -1
      });
      updateSel(selectionLayer);
    } : updateSel,
    caretPositionUpdate: ownProps.onSelectionOrCaretChanged ? function (caretPosition) {
      ownProps.onSelectionOrCaretChanged({
        caretPosition: caretPosition,
        selectionLayer: { start: -1, end: -1 }
      });
      updateCar(caretPosition);
    } : updateCar,

    dispatch: dispatch
  });
}

var defaultOverrides = {};
function fakeActionOverrides() {
  return defaultOverrides;
}

function getCombinedActions(editorName, actions, actionOverrides, dispatch) {
  var meta = { editorName: editorName };

  var metaActions = (0, _addMetaToActionCreators2.default)(actions, meta);
  // let overrides = addMetaToActionCreators(actionOverrides(metaActions), meta);
  var overrides = {};
  metaActions = _extends({
    undo: function undo() {
      window.toastr.success("Undo Successful");
      return {
        type: "VE_UNDO",
        meta: {
          editorName: editorName
        }
      };
    },
    redo: function redo() {
      window.toastr.success("Redo Successful");
      return {
        type: "VE_REDO",
        meta: {
          editorName: editorName
        }
      };
    }
  }, metaActions, overrides);
  //add meta to all action creators before passing them to the override function
  // var metaActions = addMetaToActionCreators(actions, meta)
  // let metaOverrides = addMetaToActionCreators(
  //   actionOverrides(metaActions),
  //   meta
  // );

  //rebind the actions with dispatch and meta
  var actionsToPass = _extends({}, metaActions);
  return (0, _redux.bindActionCreators)(actionsToPass, dispatch);
}

var getTypesToOmit = function getTypesToOmit(annotationsToSupport) {
  var typesToOmit = {};
  _annotationTypes.allTypes.forEach(function (type) {
    if (!annotationsToSupport[type]) typesToOmit[type] = false;
  });
  return typesToOmit;
};

var getVisibilities = function getVisibilities(annotationVisibility, annotationLabelVisibility, annotationsToSupport) {
  var typesToOmit = getTypesToOmit(annotationsToSupport);
  var annotationVisibilityToUse = _extends({}, annotationVisibility, typesToOmit);
  var annotationLabelVisibilityToUse = _extends({}, annotationLabelVisibility, typesToOmit);
  return {
    annotationVisibilityToUse: annotationVisibilityToUse,
    annotationLabelVisibilityToUse: annotationLabelVisibilityToUse,
    typesToOmit: typesToOmit
  };
};

function truncateOriginSpanningAnnotations(seqData) {
  var _seqData$features = seqData.features,
      features = _seqData$features === undefined ? [] : _seqData$features,
      _seqData$parts = seqData.parts,
      parts = _seqData$parts === undefined ? [] : _seqData$parts,
      _seqData$translations = seqData.translations,
      translations = _seqData$translations === undefined ? [] : _seqData$translations,
      _seqData$primers = seqData.primers,
      primers = _seqData$primers === undefined ? [] : _seqData$primers,
      sequence = seqData.sequence;

  return _extends({}, seqData, {
    features: truncateOriginSpanners(features, sequence.length),
    parts: truncateOriginSpanners(parts, sequence.length),
    translations: truncateOriginSpanners(translations, sequence.length),
    primers: truncateOriginSpanners(primers, sequence.length)
  });
}

function truncateOriginSpanners(annotations, sequenceLength) {
  return (0, _lodash.map)(annotations, function (annotation) {
    var _annotation$start = annotation.start,
        start = _annotation$start === undefined ? 0 : _annotation$start,
        _annotation$end = annotation.end,
        end = _annotation$end === undefined ? 0 : _annotation$end;

    if (start > end) {
      return _extends({}, annotation, {
        end: sequenceLength - 1
      });
    } else {
      return annotation;
    }
  });
}

function hasAnnotationThatSpansOrigin(_ref5) {
  var _ref5$features = _ref5.features,
      features = _ref5$features === undefined ? [] : _ref5$features,
      _ref5$parts = _ref5.parts,
      parts = _ref5$parts === undefined ? [] : _ref5$parts,
      _ref5$translations = _ref5.translations,
      translations = _ref5$translations === undefined ? [] : _ref5$translations,
      _ref5$primers = _ref5.primers,
      primers = _ref5$primers === undefined ? [] : _ref5$primers;

  return doAnySpanOrigin(features) || doAnySpanOrigin(parts) || doAnySpanOrigin(translations) || doAnySpanOrigin(primers);
}
function doAnySpanOrigin(annotations) {
  return (0, _lodash.some)(annotations, function (_ref6) {
    var _ref6$start = _ref6.start,
        start = _ref6$start === undefined ? 0 : _ref6$start,
        _ref6$end = _ref6.end,
        end = _ref6$end === undefined ? 0 : _ref6$end;

    if (start > end) return true;
  });
}

var connectToEditor = exports.connectToEditor = function connectToEditor(fn) {
  return (0, _reactRedux.connect)(function (state, ownProps) {
    for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    var editor = state.VectorEditor[ownProps.editorName] || {};
    editor.sequenceData = editor.sequenceData || {};
    editor.sequenceData.sequence = getUpperOrLowerSeq(state.VectorEditor.__allEditorsOptions.uppercaseSequenceMapFont, editor.sequenceData.sequence);

    return fn ? fn.apply(undefined, [editor, ownProps].concat(rest, [state])) : {};
  }, mapDispatchToActions);
};

//this is to enhance non-redux connected views like LinearView, or CircularView or RowView
//so they can still render things like translations, ..etc

//Currently only supporting translations
var withEditorPropsNoRedux = exports.withEditorPropsNoRedux = (0, _recompose.withProps)(function (props) {
  var sequenceData = props.sequenceData,
      sequenceDataWithRefSeqCdsFeatures = props.sequenceDataWithRefSeqCdsFeatures,
      annotationVisibility = props.annotationVisibility,
      annotationVisibilityOverrides = props.annotationVisibilityOverrides;

  var translations = _selectors2.default.translationsSelector({
    sequenceData: sequenceDataWithRefSeqCdsFeatures || sequenceData,
    annotationVisibility: _extends({}, annotationVisibility, annotationVisibilityOverrides)
  });
  var toReturn = {
    sequenceData: _extends({}, sequenceData, {
      translations: translations
    })
  };
  return toReturn;
  // return {
  //   sequenceData: {
  //     ...sequenceData,
  //     translations
  //   }
  // };
});

var getUpperOrLowerSeq = (0, _reselect.defaultMemoize)(function (uppercaseSequenceMapFont) {
  var sequence = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  return uppercaseSequenceMapFont === "uppercase" ? sequence.toUpperCase() : uppercaseSequenceMapFont === "lowercase" ? sequence.toLowerCase() : sequence;
});