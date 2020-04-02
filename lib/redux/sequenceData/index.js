"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSequenceData = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import cleanSequenceData from "../../utils/cleanSequenceData";

// export * from './sharedActionCreators';

// export * from './sequence';


var _primers = require("./primers");

Object.keys(_primers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _primers[key];
    }
  });
});

var _features = require("./features");

Object.keys(_features).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _features[key];
    }
  });
});

var _parts = require("./parts");

Object.keys(_parts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _parts[key];
    }
  });
});

var _name = require("./name");

Object.keys(_name).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _name[key];
    }
  });
});

var _description = require("./description");

Object.keys(_description).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _description[key];
    }
  });
});

var _circular = require("./circular");

Object.keys(_circular).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _circular[key];
    }
  });
});

var _materiallyAvailable = require("./materiallyAvailable");

Object.keys(_materiallyAvailable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _materiallyAvailable[key];
    }
  });
});

var _translations = require("./translations");

Object.keys(_translations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _translations[key];
    }
  });
});

exports.default = function (state, action) {
  var stateToPass = state;
  if (action.type === "SEQUENCE_DATA_UPDATE") {
    stateToPass = action.payload;
  }
  //tnr: do a clone deep here in order to make sure we are using a totally new object for undo/redo tracking
  // stateToPass = cloneDeep(stateToPass);

  var newState = coreReducer(stateToPass, action);
  if ((0, _deepEqual2.default)(newState, state)) {
    return state;
  } else {
    //tnr: do a clone deep here in order to make sure we are using a totally new object for undo/redo tracking
    // mm: we don't need this if we are not mutating the newState, which we shouldn't be doing.
    return _extends({}, newState, {
      stateTrackingId: newState.stateTrackingId ? (0, _uniqid2.default)() : "initialLoadId"
    });
  }
};

var _deepEqual = require("deep-equal");

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _veSequenceUtils = require("ve-sequence-utils");

var _uniqid = require("uniqid");

var _uniqid2 = _interopRequireDefault(_uniqid);

var _createMetaAction = require("../utils/createMetaAction");

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

var _features2 = _interopRequireDefault(_features);

var _parts2 = _interopRequireDefault(_parts);

var _name2 = _interopRequireDefault(_name);

var _description2 = _interopRequireDefault(_description);

var _primers2 = _interopRequireDefault(_primers);

var _sequence = require("./sequence");

var _sequence2 = _interopRequireDefault(_sequence);

var _circular2 = _interopRequireDefault(_circular);

var _materiallyAvailable2 = _interopRequireDefault(_materiallyAvailable);

var _translations2 = _interopRequireDefault(_translations);

var _combineReducersDontIgnoreKeys = require("../../utils/combineReducersDontIgnoreKeys");

var _combineReducersDontIgnoreKeys2 = _interopRequireDefault(_combineReducersDontIgnoreKeys);

var _reduxAct = require("redux-act");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------

var _updateSequenceData = (0, _createMetaAction2.default)("SEQUENCE_DATA_UPDATE");
var updateSequenceData = exports.updateSequenceData = function updateSequenceData(seqData) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  //tnrtodo: currently we're not using that type variable for anything
  return _updateSequenceData.apply(undefined, [(0, _veSequenceUtils.tidyUpSequenceData)(seqData, { annotationsAsObjects: true })].concat(rest));
};

// ------------------------------------
// Reducer
// ------------------------------------

var coreReducer = (0, _combineReducersDontIgnoreKeys2.default)({
  primers: _primers2.default,
  features: _features2.default,
  parts: _parts2.default,
  sequence: _sequence2.default,
  translations: _translations2.default,
  size: function size() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return state;
  },
  circular: _circular2.default,
  materiallyAvailable: _materiallyAvailable2.default,
  name: _name2.default,
  description: _description2.default,
  fromFileUpload: (0, _reduxAct.createReducer)({}, false)
});