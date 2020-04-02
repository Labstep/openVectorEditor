"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEditorByName = exports.editorReducer = exports.actions = exports.vectorEditorMiddleware = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _middleware = require("./middleware");

Object.defineProperty(exports, "vectorEditorMiddleware", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_middleware).default;
  }
});
exports.default = reducerFactory;

var _lodash = require("lodash");

var _addAdditionalEnzymes = require("./addAdditionalEnzymes");

var addAdditionalEnzymes = _interopRequireWildcard(_addAdditionalEnzymes);

var _annotationLabelVisibility = require("./annotationLabelVisibility");

var annotationLabelVisibility = _interopRequireWildcard(_annotationLabelVisibility);

var _annotationsToSupport = require("./annotationsToSupport");

var annotationsToSupport = _interopRequireWildcard(_annotationsToSupport);

var _annotationVisibility = require("./annotationVisibility");

var annotationVisibility = _interopRequireWildcard(_annotationVisibility);

var _caretPosition = require("./caretPosition");

var caretPosition = _interopRequireWildcard(_caretPosition);

var _copyOptions = require("./copyOptions");

var copyOptions = _interopRequireWildcard(_copyOptions);

var _deletionLayers = require("./deletionLayers");

var deletionLayers = _interopRequireWildcard(_deletionLayers);

var _digestTool = require("./digestTool");

var digestTool = _interopRequireWildcard(_digestTool);

var _findTool = require("./findTool");

var findTool = _interopRequireWildcard(_findTool);

var _toolBar = require("./toolBar");

var toolBar = _interopRequireWildcard(_toolBar);

var _frameTranslations = require("./frameTranslations");

var frameTranslations = _interopRequireWildcard(_frameTranslations);

var _hoveredAnnotation = require("./hoveredAnnotation");

var hoveredAnnotation = _interopRequireWildcard(_hoveredAnnotation);

var _minimumOrfSize = require("./minimumOrfSize");

var minimumOrfSize = _interopRequireWildcard(_minimumOrfSize);

var _alignments = require("./alignments");

var alignments = _interopRequireWildcard(_alignments);

var _panelsShown = require("./panelsShown");

var panelsShown = _interopRequireWildcard(_panelsShown);

var _propertiesTool = require("./propertiesTool");

var propertiesTool = _interopRequireWildcard(_propertiesTool);

var _lastSavedId = require("./lastSavedId");

var lastSavedId = _interopRequireWildcard(_lastSavedId);

var _readOnly = require("./readOnly");

var readOnly = _interopRequireWildcard(_readOnly);

var _versionHistory = require("./versionHistory");

var versionHistory = _interopRequireWildcard(_versionHistory);

var _replacementLayers = require("./replacementLayers");

var replacementLayers = _interopRequireWildcard(_replacementLayers);

var _restrictionEnzymes = require("./restrictionEnzymes");

var restrictionEnzymes = _interopRequireWildcard(_restrictionEnzymes);

var _selectedAnnotations = require("./selectedAnnotations");

var selectedAnnotations = _interopRequireWildcard(_selectedAnnotations);

var _selectionLayer = require("./selectionLayer");

var selectionLayer = _interopRequireWildcard(_selectionLayer);

var _sequenceDataHistory = require("./sequenceDataHistory");

var sequenceDataHistory = _interopRequireWildcard(_sequenceDataHistory);

var _sequenceData = require("./sequenceData");

var sequenceData = _interopRequireWildcard(_sequenceData);

var _useAdditionalOrfStartCodons = require("./useAdditionalOrfStartCodons");

var useAdditionalOrfStartCodons = _interopRequireWildcard(_useAdditionalOrfStartCodons);

var _uppercaseSequenceMapFont = require("./uppercaseSequenceMapFont");

var uppercaseSequenceMapFont = _interopRequireWildcard(_uppercaseSequenceMapFont);

var _externalLabels = require("./externalLabels");

var externalLabels = _interopRequireWildcard(_externalLabels);

var _labelLineIntensity = require("./labelLineIntensity");

var labelLineIntensity = _interopRequireWildcard(_labelLineIntensity);

var _modalActions = require("./modalActions");

var modalActions = _interopRequireWildcard(_modalActions);

var _redux = require("redux");

var _createMetaAction = require("./utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var subReducers = {
  addAdditionalEnzymes: addAdditionalEnzymes,
  annotationLabelVisibility: annotationLabelVisibility,
  annotationsToSupport: annotationsToSupport,
  annotationVisibility: annotationVisibility,
  caretPosition: caretPosition,
  copyOptions: copyOptions,
  deletionLayers: deletionLayers,
  digestTool: digestTool,
  toolBar: toolBar,
  findTool: findTool,
  frameTranslations: frameTranslations,
  hoveredAnnotation: hoveredAnnotation,
  minimumOrfSize: minimumOrfSize,
  panelsShown: panelsShown,
  propertiesTool: propertiesTool,
  lastSavedId: lastSavedId,
  readOnly: readOnly,
  versionHistory: versionHistory,
  replacementLayers: replacementLayers,
  restrictionEnzymes: restrictionEnzymes,
  selectedAnnotations: selectedAnnotations,
  selectionLayer: selectionLayer,
  sequenceDataHistory: sequenceDataHistory,
  sequenceData: sequenceData,
  useAdditionalOrfStartCodons: useAdditionalOrfStartCodons,
  uppercaseSequenceMapFont: uppercaseSequenceMapFont,
  externalLabels: externalLabels,
  labelLineIntensity: labelLineIntensity
};

var vectorEditorInitialize = (0, _createMetaAction2.default)("VECTOR_EDITOR_UPDATE");
var vectorEditorClear = (0, _createMetaAction2.default)("VECTOR_EDITOR_CLEAR");

//export the actions for use elsewhere
var actions = exports.actions = _extends({}, Object.keys(subReducers).reduce(function (acc, k) {
  return _extends({}, acc, subReducers[k]);
}, {}), modalActions, alignments, {
  vectorEditorInitialize: vectorEditorInitialize,
  vectorEditorClear: vectorEditorClear
});

var mergeDeepKeys = [];
//define the reducer
var reducers = _extends({}, Object.keys(subReducers).reduce(function (acc, k) {
  if (subReducers[k].default && subReducers[k].default.__shouldUseMergedState) {
    mergeDeepKeys.push(k);
  }
  return _extends({}, acc, _defineProperty({}, k, subReducers[k].default));
}, {}), {
  instantiated: function instantiated() {
    return true;
  }
});

var editorReducer = exports.editorReducer = (0, _redux.combineReducers)(reducers);
var customDeepMerge = function customDeepMerge() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var newState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return _extends({}, state, newState, mergeDeepKeys.reduce(function (acc, key) {
    acc[key] = (0, _lodash.merge)(state[key], newState[key]);
    return acc;
  }, {}));
};

function reducerFactory() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // if (!initialState || !Object.keys(initialState).length) {
  //   throw new Error(
  //     "Please pass an initial state to the vector editor reducer like: {DemoEditor: {}}!"
  //   );
  // }
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var editorNames = void 0;
    var newState = {};
    if (action.meta && action.meta.editorName) {
      editorNames = Array.isArray(action.meta.editorName) ? action.meta.editorName : [action.meta.editorName];
    }
    var stateToReturn = void 0;
    if (editorNames) {
      //we're dealing with an action specific to a given editor
      editorNames.forEach(function (editorName) {
        var currentState = state[editorName];
        if (action.type === "VECTOR_EDITOR_UPDATE") {
          //deep merge certain parts of the exisiting state with the new payload of props
          //(if you want to do a clean wipe, use VECTOR_EDITOR_CLEAR)
          currentState = customDeepMerge(state[editorName], action.payload);
        }
        if (action.type === "VECTOR_EDITOR_CLEAR") {
          currentState = undefined;
        }
        newState[editorName] = editorReducer(currentState, action);
      });
      stateToReturn = _extends({}, state, newState);
    } else {
      //just a normal action
      Object.keys(state).forEach(function (editorName) {
        if (editorName === "__allEditorsOptions") return; //we deal with __allEditorsOptions below so don't pass it here
        newState[editorName] = editorReducer(state[editorName], action);
      });
      stateToReturn = newState;
    }
    return _extends({}, stateToReturn, {
      //these are reducers that are not editor specific (aka shared across editor instances)
      __allEditorsOptions: {
        addAdditionalEnzymes: addAdditionalEnzymes.default(!state.__allEditorsOptions ? undefined : state.__allEditorsOptions.addAdditionalEnzymes, action),
        uppercaseSequenceMapFont: uppercaseSequenceMapFont.default(!state.__allEditorsOptions ? undefined : state.__allEditorsOptions.uppercaseSequenceMapFont, action),
        externalLabels: externalLabels.default(!state.__allEditorsOptions ? undefined : state.__allEditorsOptions.externalLabels, action),
        labelLineIntensity: labelLineIntensity.default(!state.__allEditorsOptions ? undefined : state.__allEditorsOptions.labelLineIntensity, action),
        alignments: alignments.default(!state.__allEditorsOptions ? undefined : state.__allEditorsOptions.alignments, action)
      }
    });
  };
}

// export const getBlankEditor = (state) => (state.blankEditor)
var getEditorByName = exports.getEditorByName = function getEditorByName(state, editorName) {
  return state[editorName];
};

// export default connect((state, ownProps) => {
//   return {
//     toggled: state.VectorEditor[ownProps.editorName].annotationVisibility.features
//   }
// })()