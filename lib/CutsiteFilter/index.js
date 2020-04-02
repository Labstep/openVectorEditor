"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CutsiteFilter = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _core = require("@blueprintjs/core");

var _withEditorProps = require("../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

var _specialCutsiteFilterOptions = require("../constants/specialCutsiteFilterOptions");

var _specialCutsiteFilterOptions2 = _interopRequireDefault(_specialCutsiteFilterOptions);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./style.css");

var _teselagenReactComponents = require("teselagen-react-components");

var _map = require("lodash/map");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CutsiteFilter = exports.CutsiteFilter = (_temp = _class = function (_React$Component) {
  _inherits(CutsiteFilter, _React$Component);

  function CutsiteFilter() {
    _classCallCheck(this, CutsiteFilter);

    return _possibleConstructorReturn(this, (CutsiteFilter.__proto__ || Object.getPrototypeOf(CutsiteFilter)).apply(this, arguments));
  }

  _createClass(CutsiteFilter, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          onChangeHook = _props.onChangeHook,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style,
          filteredRestrictionEnzymes = _props.filteredRestrictionEnzymes,
          filteredRestrictionEnzymesUpdate = _props.filteredRestrictionEnzymesUpdate,
          cutsitesByName = _props.allCutsites.cutsitesByName,
          inputSequenceToTestAgainst = _props.sequenceData.sequence,
          dispatch = _props.dispatch;
      // var {handleOpen, handleClose} = this

      var options = [].concat(_toConsumableArray((0, _map2.default)(_specialCutsiteFilterOptions2.default, function (opt) {
        return opt;
      })), _toConsumableArray(Object.keys(cutsitesByName).map(function (key) {
        var label = getLabel(cutsitesByName[key], key);
        return {
          label: label,
          value: key
        };
      })));
      function openAddYourOwn() {
        dispatch({
          type: "ADD_ADDITIONAL_ENZYMES_RESET",
          payload: {
            inputSequenceToTestAgainst: inputSequenceToTestAgainst,
            isOpen: true
          }
        });
      }
      return _react2.default.createElement(
        "div",
        { style: style },
        _react2.default.createElement(_teselagenReactComponents.TgSelect, {
          multi: true,
          allowCreate: true,
          wrapperStyle: { zIndex: 11 },
          noResultsText: _react2.default.createElement(
            "div",
            { className: "noResultsTextPlusButton" },
            "No matching enzymes found that cut in the sequence.",
            " ",
            _react2.default.createElement(AddAdditionalEnzymeLink, { onClick: openAddYourOwn }),
            " "
          ),
          placeholder: "Filter cut sites...",
          options: options,
          optionRenderer: renderOptions,
          onChange: function onChange(filteredRestrictionEnzymes) {
            if (filteredRestrictionEnzymes && filteredRestrictionEnzymes.some(function (enzyme) {
              return enzyme.value === _specialCutsiteFilterOptions2.default.addYourOwn.value;
            })) {
              return openAddYourOwn();
            }
            onChangeHook && onChangeHook(filteredRestrictionEnzymes);
            filteredRestrictionEnzymesUpdate(filteredRestrictionEnzymes);
          },
          value: filteredRestrictionEnzymes.map(function (filteredOpt) {
            if (filteredOpt.cutsThisManyTimes) {
              return filteredOpt;
            }

            var label = getLabel(cutsitesByName[filteredOpt.value], filteredOpt.value);
            return _extends({}, filteredOpt, {
              label: label
            });
          })
        })
      );
    }
  }]);

  return CutsiteFilter;
}(_react2.default.Component), _class.defaultProps = {
  onChangeHook: function onChangeHook() {},
  filteredRestrictionEnzymes: [],
  filteredRestrictionEnzymesUpdate: [],
  allCutsites: { cutsitesByName: {} },
  sequenceData: {
    sequence: ""
  },
  dispatch: function dispatch() {}
}, _temp);
exports.default = (0, _redux.compose)(_withEditorProps2.default, (0, _reactRedux.connect)())(CutsiteFilter);

function renderOptions(_ref) {
  var label = _ref.label,
      value = _ref.value;

  if (value === "addYourOwn") {
    return _react2.default.createElement(AddAdditionalEnzymeLink, null);
  }

  return label;
}

function AddAdditionalEnzymeLink(_ref2) {
  var onClick = _ref2.onClick;

  return _react2.default.createElement(
    "span",
    { onClick: onClick, className: "ta_link" },
    "Add additional enzymes ",
    _react2.default.createElement(_core.Icon, { iconSize: 14, icon: "plus" })
  );
}

var getLabel = function getLabel() {
  var maybeCutsites = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var val = arguments[1];

  var cutNumber = maybeCutsites.length;

  return _react2.default.createElement(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    },
    " ",
    _react2.default.createElement(
      "div",
      null,
      val
    ),
    " ",
    _react2.default.createElement(
      "div",
      { style: { fontSize: 12 } },
      "\xA0(",
      cutNumber,
      " cut",
      cutNumber === 1 ? "" : "s",
      ")"
    )
  );
};