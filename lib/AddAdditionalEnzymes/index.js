"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// import enzymeListFull from '../../../enzymeListFull.json';

// import defaultEnzymeList from '../../../../enzymeListFull.json';
// import {reduxForm, Field, formValueSelector} from 'redux-form'

// import './style.css';

// import QuestionTooltip from '../../components/QuestionTooltip';


var _map = require("lodash/map");

var _map2 = _interopRequireDefault(_map);

var _reactRedux = require("react-redux");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@blueprintjs/core");

var _teselagenReactComponents = require("teselagen-react-components");

var _expandedEnzymeList = require("../redux/utils/expandedEnzymeList.json");

var _expandedEnzymeList2 = _interopRequireDefault(_expandedEnzymeList);

var _defaultEnzymeList = require("../redux/utils/defaultEnzymeList.json");

var _defaultEnzymeList2 = _interopRequireDefault(_defaultEnzymeList);

var _veSequenceUtils = require("ve-sequence-utils");

require("./style.css");

var _EnzymeViewer = require("../EnzymeViewer");

var _EnzymeViewer2 = _interopRequireDefault(_EnzymeViewer);

var _addAdditionalEnzymes5 = require("../redux/addAdditionalEnzymes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddAdditionalEnzyme = function AddAdditionalEnzyme(props) {
  var paddingStart = "-------";
  var paddingEnd = "-------";
  var _props$inputSequenceT = props.inputSequenceToTestAgainst,
      inputSequenceToTestAgainst = _props$inputSequenceT === undefined ? "" : _props$inputSequenceT,
      hideModal = props.addAdditionalEnzymesClose,
      _props$seqName = props.seqName,
      seqName = _props$seqName === undefined ? "Destination Vector" : _props$seqName,
      addAdditionalEnzymes = props.addAdditionalEnzymes,
      dispatch = props.dispatch,
      editorName = props.editorName,
      stopAddingYourOwnEnzyme = props.stopAddingYourOwnEnzyme;


  addAdditionalEnzymes.chop_top_index = Number(addAdditionalEnzymes.chop_top_index);
  addAdditionalEnzymes.chop_bottom_index = Number(addAdditionalEnzymes.chop_bottom_index);

  var _addAdditionalEnzymes = addAdditionalEnzymes.sequence,
      sequence = _addAdditionalEnzymes === undefined ? "" : _addAdditionalEnzymes,
      _addAdditionalEnzymes2 = addAdditionalEnzymes.chop_top_index,
      chop_top_index = _addAdditionalEnzymes2 === undefined ? 0 : _addAdditionalEnzymes2,
      _addAdditionalEnzymes3 = addAdditionalEnzymes.chop_bottom_index,
      chop_bottom_index = _addAdditionalEnzymes3 === undefined ? 0 : _addAdditionalEnzymes3,
      _addAdditionalEnzymes4 = addAdditionalEnzymes.name,
      name = _addAdditionalEnzymes4 === undefined ? "" : _addAdditionalEnzymes4;

  var regexString = bpsToRegexString(sequence);
  var enzyme = {
    name: name,
    site: sequence,
    forwardRegex: regexString,
    reverseRegex: (0, _veSequenceUtils.getReverseComplementSequenceString)(regexString),
    topSnipOffset: chop_top_index,
    bottomSnipOffset: chop_bottom_index,
    usForward: 0,
    usReverse: 0,
    color: "black"
  };
  var invalid = void 0;
  if (!enzyme.name || !enzyme.site || !enzyme.forwardRegex || !enzyme.reverseRegex || !enzyme.topSnipOffset && enzyme.topSnipOffset !== 0 || !enzyme.bottomSnipOffset && enzyme.bottomSnipOffset !== 0) {
    invalid = true;
  }

  var matches = void 0;
  if (regexString.length === 0) {
    matches = [];
  } else {
    matches = (0, _veSequenceUtils.cutSequenceByRestrictionEnzyme)(inputSequenceToTestAgainst, true, enzyme);
  }

  var errors = validate(addAdditionalEnzymes);
  if (Object.keys(errors || {}).length) {
    invalid = true;
  }
  function onChange(updatedVal) {
    dispatch({
      type: "ADD_ADDITIONAL_ENZYMES_UPDATE",
      payload: _extends({}, addAdditionalEnzymes, updatedVal)
    });
  }

  return _react2.default.createElement(
    "div",
    { className: "createYourOwnEnzyme" },
    _react2.default.createElement(
      "h2",
      null,
      "Create your own enzyme"
    ),
    _react2.default.createElement(CustomInput, {
      error: errors["name"],
      value: name,
      onChange: onChange,
      name: "name",
      label: "Name:"
    }),
    _react2.default.createElement(CustomInput, {
      error: errors["sequence"],
      value: sequence,
      onChange: onChange,
      name: "sequence",
      label: _react2.default.createElement(
        "div",
        { className: "labelWithIcon" },
        _react2.default.createElement(
          _teselagenReactComponents.InfoHelper,
          null,
          _react2.default.createElement(
            "div",
            { className: "taLineHolder" },
            _react2.default.createElement(
              Line,
              null,
              " Special Characters: "
            ),
            _react2.default.createElement(
              Line,
              null,
              " R = G A (purine) "
            ),
            _react2.default.createElement(
              Line,
              null,
              " Y = T C (pyrimidine) "
            ),
            _react2.default.createElement(
              Line,
              null,
              " K = G T (keto) "
            ),
            _react2.default.createElement(
              Line,
              null,
              " M = A C (amino) "
            ),
            _react2.default.createElement(
              Line,
              null,
              " S = G C (strong bonds) "
            ),
            _react2.default.createElement(
              Line,
              null,
              " W = A T (weak bonds) "
            ),
            _react2.default.createElement(
              Line,
              null,
              " B = G T C (all but A) "
            ),
            _react2.default.createElement(
              Line,
              null,
              " D = G A T (all but C) "
            ),
            _react2.default.createElement(
              Line,
              null,
              " H = A C T (all but G) "
            ),
            _react2.default.createElement(
              Line,
              null,
              " V = G C A (all but T) "
            ),
            _react2.default.createElement(
              Line,
              null,
              " N = A G C T (any) "
            )
          )
        ),
        _react2.default.createElement(
          "span",
          null,
          "Recognition sequence:"
        )
      ),
      onInput: function onInput(input) {
        var inputValue = input.target.value;
        var cleanInput = inputValue.replace(/[^rykmswbdhvnagct]/gi, "");
        input.target.value = cleanInput;
      }
    }),
    _react2.default.createElement(CustomInput, {
      error: errors["chop_top_index"],
      value: chop_top_index,
      onChange: onChange,
      name: "chop_top_index",
      label: "Chop top index:",
      type: "number"
    }),
    _react2.default.createElement(CustomInput, {
      error: errors["chop_bottom_index"],
      value: chop_bottom_index,
      onChange: onChange,
      name: "chop_bottom_index",
      label: "Chop bottom index:",
      type: "number"
    }),
    _react2.default.createElement(_EnzymeViewer2.default, {
      forwardSnipPosition: chop_top_index,
      paddingEnd: paddingEnd,
      paddingStart: paddingStart,
      reverseSnipPosition: chop_bottom_index,
      sequence: sequence
    }),
    _react2.default.createElement("br", null),
    _react2.default.createElement(
      "h3",
      { className: "cutnumber " + (matches.length === 0 && "invalid") },
      matches.length > 10 ? "Cuts more than 10 times in your " + seqName : "Cuts " + matches.length + " time" + (matches.length === 1 ? "" : "s") + " in your " + seqName
    ),
    _react2.default.createElement(
      "div",
      { className: "buttonHolder" },
      _react2.default.createElement(
        _core.Button,
        {
          className: "addAdditionalEnzymeBtn",
          onClick: stopAddingYourOwnEnzyme
        },
        "Back"
      ),
      _react2.default.createElement(
        _core.Button,
        {
          className: " ta_useCutsite addAdditionalEnzymeBtn " + (invalid && "disabled"),
          onClick: function onClick() {
            if (invalid) {
              return;
            }
            dispatch({
              type: "ADD_RESTRICTION_ENZYME",
              payload: enzyme,
              meta: {
                editorName: editorName
              }
            });
            dispatch({
              type: "FILTERED_RESTRICTION_ENZYMES_ADD",
              payload: {
                value: name
              },
              meta: {
                editorName: editorName
              }
            });
            // addRestrictionEnzyme(enzyme)
            // filteredRestrictionEnzymesAdd({
            //   label: name,
            //   value: name,
            // })
            hideModal && hideModal();
          }
        },
        "Use Enzyme"
      )
    )
  );
};

AddAdditionalEnzyme = (0, _reactRedux.connect)(function (state) {
  return {
    addAdditionalEnzymes: state.VectorEditor.__allEditorsOptions.addAdditionalEnzymes
  };
}, { addAdditionalEnzymesClose: _addAdditionalEnzymes5.addAdditionalEnzymesClose })(AddAdditionalEnzyme);

var AddAdditionalEnzymes = function (_React$Component) {
  _inherits(AddAdditionalEnzymes, _React$Component);

  function AddAdditionalEnzymes() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AddAdditionalEnzymes);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AddAdditionalEnzymes.__proto__ || Object.getPrototypeOf(AddAdditionalEnzymes)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      addAdditionalEnzymes: false,
      enzymesToAdd: []
    }, _this.startAddingYourOwnEnzyme = function () {
      _this.setState({ addAdditionalEnzymes: true });
    }, _this.stopAddingYourOwnEnzyme = function () {
      _this.setState({ addAdditionalEnzymes: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AddAdditionalEnzymes, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.addAdditionalEnzymes) {
        return _react2.default.createElement(AddAdditionalEnzyme, _extends({}, this.props, {
          stopAddingYourOwnEnzyme: this.stopAddingYourOwnEnzyme
        }));
      }
      var _props = this.props,
          dispatch = _props.dispatch,
          hideModal = _props.addAdditionalEnzymesClose,
          _props$inputSequenceT2 = _props.inputSequenceToTestAgainst,
          inputSequenceToTestAgainst = _props$inputSequenceT2 === undefined ? "" : _props$inputSequenceT2;
      var enzymesToAdd = this.state.enzymesToAdd;

      return _react2.default.createElement(
        "div",
        { className: "addAdditionalEnzyme" },
        _react2.default.createElement(
          "h2",
          null,
          "Add additional enzymes"
        ),
        _react2.default.createElement(
          "span",
          null,
          "Our default list contains just the most common enzymes. Search here to add less common ones:"
        ),
        _react2.default.createElement(
          "div",
          { className: "filterAndButton" },
          _react2.default.createElement(_teselagenReactComponents.TgSelect, {
            multi: true,
            placeholder: "Select cut sites...",
            options: (0, _map2.default)(_expandedEnzymeList2.default, function (enzyme) {
              return { label: enzyme.name, value: enzyme };
            }),
            onChange: function onChange(enzymesToAdd) {
              _this2.setState({
                enzymesToAdd: enzymesToAdd.map(function (_ref2) {
                  var value = _ref2.value;

                  var times = (0, _veSequenceUtils.cutSequenceByRestrictionEnzyme)(inputSequenceToTestAgainst, true, value).length;
                  return {
                    label: value.name + (" (Cuts " + times + " time" + (times === 1 ? "" : "s") + ")"),
                    value: value
                  };
                })
              });
            },
            value: enzymesToAdd
          }),
          _react2.default.createElement(
            _core.Button,
            {
              className: "addAdditionalEnzymeBtn",
              onClick: function onClick() {
                enzymesToAdd.forEach(function (enzyme) {
                  dispatch({
                    type: "ADD_RESTRICTION_ENZYME",
                    payload: enzyme.value
                    // meta: {}
                  });
                  dispatch({
                    type: "FILTERED_RESTRICTION_ENZYMES_ADD",
                    payload: {
                      value: enzyme.value.name
                      // meta: {}
                    } });
                });
                hideModal && hideModal();
              },
              disabled: this.state.enzymesToAdd && this.state.enzymesToAdd.length < 1
            },
            "Add Enzyme",
            this.state.enzymesToAdd && this.state.enzymesToAdd.length > 1 ? "s" : ""
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "createYourOwnButton" },
          _react2.default.createElement(
            "span",
            null,
            "Still not finding what you want?"
          ),
          _react2.default.createElement(
            _core.Button,
            {
              className: "addAdditionalEnzymeBtn",
              onClick: this.startAddingYourOwnEnzyme
            },
            "Create your own enzyme"
          )
        )
      );
    }
  }]);

  return AddAdditionalEnzymes;
}(_react2.default.Component);

function validate(values) {
  var errors = {};

  if (!values.name || values.name.trim() === "") {
    errors.name = "Input cannot be blank";
  } else if (_defaultEnzymeList2.default[values.name.toLowerCase()]) {
    errors.name = "The name " + values.name + " is already taken.";
  }

  if (!values.sequence || values.sequence.trim() === "" || values.sequence.trim().length < 4) {
    errors.sequence = "Enzyme recognition sequence must be at least 4bps long";
  }

  if (values.sequence && values.sequence.replace(/[^atgcrykmswbdhvn]/gi, "").length !== values.sequence.length) {
    errors.sequence = "Sequence must only contain valid bases";
  }

  if (!values.chop_top_index && values.chop_top_index !== 0) {
    errors.chop_top_index = "Input cannot be blank";
  }
  if (!values.chop_bottom_index && values.chop_bottom_index !== 0) {
    errors.chop_bottom_index = "Input cannot be blank";
  }
  return errors;
}

AddAdditionalEnzymes = (0, _reactRedux.connect)(function (state) {
  return {
    inputSequenceToTestAgainst: state.VectorEditor.__allEditorsOptions.addAdditionalEnzymes.inputSequenceToTestAgainst
  };
}, { addAdditionalEnzymesClose: _addAdditionalEnzymes5.addAdditionalEnzymesClose })(AddAdditionalEnzymes);

exports.default = AddAdditionalEnzymes;


function bpsToRegexString(bps) {
  var regexString = "";
  if (typeof bps === "string") {
    bps.split("").forEach(function (bp) {
      if (bp === "r") {
        regexString += "[ga]";
      } else if (bp === "y") {
        regexString += "[tc]";
      } else if (bp === "k") {
        regexString += "[gt]";
      } else if (bp === "m") {
        regexString += "[ac]";
      } else if (bp === "s") {
        regexString += "[gc]";
      } else if (bp === "w") {
        regexString += "[at]";
      } else if (bp === "b") {
        regexString += "[gtc]";
      } else if (bp === "d") {
        regexString += "[gat]";
      } else if (bp === "h") {
        regexString += "[act]";
      } else if (bp === "v") {
        regexString += "[gca]";
      } else if (bp === "n") {
        regexString += "[agct]";
      } else {
        regexString += bp;
      }
    });
  }
  return regexString;
}

// function CustomInput({name, type, label, onInput}) {
// return <Field name={name} label={label} type={type} onInput={onInput} component={RenderInput} >
// </Field>
// }

function CustomInput(_ref3) {
  var name = _ref3.name,
      value = _ref3.value,
      _onChange2 = _ref3.onChange,
      onInput = _ref3.onInput,
      label = _ref3.label,
      error = _ref3.error,
      type = _ref3.type;

  return _react2.default.createElement(
    "div",
    { className: "inputHolder " + (error && "error") },
    _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "span",
        null,
        label
      ),
      _react2.default.createElement("input", {
        value: value,
        onChange: function onChange(e) {
          _onChange2(_defineProperty({}, name, e.target.value));
        },
        onInput: onInput,
        type: type
      })
    ),
    error && _react2.default.createElement(
      "p",
      { className: "errorMessage" },
      error
    )
  );
}

function Line(_ref4) {
  var children = _ref4.children;

  return _react2.default.createElement(
    "div",
    { className: "taLine" },
    " ",
    children
  );
}
module.exports = exports["default"];