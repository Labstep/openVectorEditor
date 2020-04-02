"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require("redux-form");

var _teselagenReactComponents = require("teselagen-react-components");

var _redux = require("redux");

var _core = require("@blueprintjs/core");

var _veRangeUtils = require("ve-range-utils");

var _veSequenceUtils = require("ve-sequence-utils");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _withEditorProps = require("../../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddOrEditAnnotationDialog = function (_React$Component) {
  _inherits(AddOrEditAnnotationDialog, _React$Component);

  function AddOrEditAnnotationDialog() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AddOrEditAnnotationDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AddOrEditAnnotationDialog.__proto__ || Object.getPrototypeOf(AddOrEditAnnotationDialog)).call.apply(_ref, [this].concat(args))), _this), _this.formatStart = function (val) {
      var _ref2 = _this.props.sequenceData || {},
          isProtein = _ref2.isProtein;

      if (isProtein) {
        return (val + 2) / 3;
      }
      return val;
    }, _this.formatEnd = function (val) {
      var _ref3 = _this.props.sequenceData || {},
          isProtein = _ref3.isProtein;

      if (isProtein) {
        return val / 3;
      }
      return val;
    }, _this.parseStart = function (val) {
      var _ref4 = _this.props.sequenceData || {},
          isProtein = _ref4.isProtein;

      if (isProtein) {
        return val * 3 - 2;
      }
      return val;
    }, _this.parseEnd = function (val) {
      var _ref5 = _this.props.sequenceData || {},
          isProtein = _ref5.isProtein;

      if (isProtein) {
        return val * 3;
      }
      return val;
    }, _this.renderLocations = function (props) {
      var fields = props.fields;
      var _this$props = _this.props,
          _this$props$sequenceD = _this$props.sequenceData,
          sequenceData = _this$props$sequenceD === undefined ? { sequence: "" } : _this$props$sequenceD,
          start = _this$props.start,
          end = _this$props.end;

      var sequenceLength = sequenceData.sequence.length;

      var locations = fields.getAll() || [];
      return _react2.default.createElement(
        "div",
        null,
        locations.length > 1 && _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            {
              style: {
                marginBottom: 10,
                marginTop: 3
              }
            },
            "Joined Feature Spans:"
          ),
          _react2.default.createElement(
            "div",
            { style: { marginLeft: 50 } },
            !locations.length && _react2.default.createElement(
              "div",
              { style: { marginBottom: 10 } },
              "No sub-locations. Click \"Add Location\" to add sub-locations for this feature.",
              " "
            ),
            fields.map(function (member, index) {
              //the locations will have already been converted to 1 based ranges
              return _react2.default.createElement(
                "div",
                { style: {}, key: index },
                _react2.default.createElement(
                  "div",
                  { style: { display: "flex", marginBottom: 10 } },
                  _react2.default.createElement(_teselagenReactComponents.NumericInputField, {
                    containerStyle: { marginBottom: 0, marginRight: 10 },
                    inlineLabel: true,
                    tooltipError: true,
                    min: 1,
                    format: _this.formatStart,
                    parse: _this.parseStart,
                    max: sequenceLength || 1,
                    name: member + ".start",
                    label: "Start:"
                  }),
                  _react2.default.createElement(_teselagenReactComponents.NumericInputField, {
                    containerStyle: { marginBottom: 0, marginRight: 10 },
                    inlineLabel: true,
                    tooltipError: true,
                    min: 1,
                    format: _this.formatEnd,
                    parse: _this.parseEnd,
                    max: sequenceLength || 1,
                    name: member + ".end",
                    label: "End:"
                  }),
                  _react2.default.createElement(_core.Button, {
                    onClick: function onClick() {
                      if (locations.length === 2) {
                        fields.remove(0);
                        fields.remove(1);
                      } else {
                        fields.remove(index);
                      }
                    },
                    minimal: true,
                    icon: "trash"
                  })
                )
              );
            })
          )
        ),
        _react2.default.createElement(
          _core.Button,
          {
            style: { marginBottom: 10, left: "50%" }
            // intent="primary"
            , onClick: function onClick() {
              if (locations && locations.length) {
                fields.push({
                  start: locations[locations.length - 1].end + 1,
                  end: locations[locations.length - 1].end + (sequenceData.isProtein ? 3 : 2)
                });
              } else {
                var end1 = Math.max(start, end - 10);
                fields.push({
                  start: start,
                  end: end1
                });
                fields.push({
                  start: end1 + 3,
                  end: end1 + 10
                });
              }
            },
            icon: "add"
          },
          "Add Joined Feature Span"
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AddOrEditAnnotationDialog, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          hideModal = _props.hideModal,
          _props$sequenceData = _props.sequenceData,
          sequenceData = _props$sequenceData === undefined ? { sequence: "" } : _props$sequenceData,
          handleSubmit = _props.handleSubmit,
          beforeAnnotationCreate = _props.beforeAnnotationCreate,
          renderTypes = _props.renderTypes,
          annotationTypePlural = _props.annotationTypePlural,
          annotationVisibilityShow = _props.annotationVisibilityShow,
          renderLocations = _props.renderLocations,
          locations = _props.locations,
          upsertAnnotation = _props.upsertAnnotation;

      var sequenceLength = sequenceData.sequence.length;
      return _react2.default.createElement(
        "div",
        {
          className: (0, _classnames2.default)(_core.Classes.DIALOG_BODY, "tg-min-width-dialog", "tg-upsert-annotation")
        },
        _react2.default.createElement(_teselagenReactComponents.InputField, {
          inlineLabel: true,
          tooltipError: true,
          autoFocus: true,
          placeholder: "Untitled Annotation",
          validate: required,
          name: "name",
          label: "Name:"
        }),
        _react2.default.createElement(_teselagenReactComponents.RadioGroupField, {
          inlineLabel: true,
          tooltipError: true,
          options: [{ label: "Positive", value: "true" }, { label: "Negative", value: "false" }],
          normalize: function normalize(value) {
            return value === "true" || false;
          },
          format: function format(value) {
            return value ? "true" : "false";
          },
          name: "forward",
          label: "Strand:",
          defaultValue: true
        }),
        renderTypes || null,
        !renderLocations || !locations || locations.length < 2 ? _react2.default.createElement(
          _react2.default.Fragment,
          null,
          _react2.default.createElement(_teselagenReactComponents.NumericInputField, {
            inlineLabel: true,
            format: this.formatStart,
            parse: this.parseStart,
            tooltipError: true,
            defaultValue: 1,
            min: 1,
            max: sequenceLength || 1,
            name: "start",
            label: "Start:"
          }),
          _react2.default.createElement(_teselagenReactComponents.NumericInputField, {
            format: this.formatEnd,
            parse: this.parseEnd,
            inlineLabel: true,
            tooltipError: true,
            defaultValue: sequenceData.isProtein ? 3 : 1,
            min: 1,
            max: sequenceLength || 1,
            name: "end",
            label: "End:"
          })
        ) : null,
        renderLocations ? _react2.default.createElement(_reduxForm.FieldArray, { component: this.renderLocations, name: "locations" }) : null,
        _react2.default.createElement(_teselagenReactComponents.TextareaField, {
          inlineLabel: true,
          tooltipError: true,
          name: "notes",
          label: "Notes:",
          format: function format(v) {
            var toReturn = v;
            if (typeof v !== "string" && v) {
              toReturn = "";
              Object.keys(v).forEach(function (key) {
                var stringVal = void 0;
                try {
                  stringVal = JSON.stringify(v[key]);
                } catch (e) {
                  stringVal = v[key];
                }
                toReturn += "- " + key + ": " + stringVal + " \n";
              });
            }
            return toReturn;
          },
          placeholder: "Enter notes here.."
        }),
        _react2.default.createElement(
          "div",
          {
            style: { display: "flex", justifyContent: "flex-end" },
            className: "width100"
          },
          _react2.default.createElement(
            _core.Button,
            {
              style: { marginRight: 15 },
              onMouseDown: function onMouseDown(e) {
                //use onMouseDown to prevent issues with redux form errors popping in and stopping the dialog from closing
                e.preventDefault();
                e.stopPropagation();
                hideModal();
              }
            },
            "Cancel"
          ),
          _react2.default.createElement(
            _core.Button,
            {
              onClick: handleSubmit(function (data) {
                var updatedData = void 0;
                if (data.forward === true && data.strand !== 1) {
                  updatedData = _extends({}, data, { strand: 1 });
                } else if (data.forward === false && data.strand !== -1) {
                  updatedData = _extends({}, data, { strand: -1 });
                } else {
                  updatedData = data;
                }
                if (annotationTypePlural === "features") {
                  updatedData.color = _veSequenceUtils.featureColors[updatedData.type];
                }
                var hasJoinedLocations = updatedData.locations && updatedData.locations.length > 1;

                var newFeat = (0, _veSequenceUtils.tidyUpAnnotation)((0, _veRangeUtils.convertRangeTo0Based)(_extends({}, updatedData, annotationTypePlural === "primers" //if we're making a primer it should automatically have a type of primer
                ? { type: "primer" } : {}, {
                  locations: undefined }, hasJoinedLocations && {
                  //only add locations if there are locations
                  start: updatedData.locations[0].start, //override the start and end to use the start and end of the joined locations
                  end: updatedData.locations[updatedData.locations.length - 1].end,
                  locations: updatedData.locations.map(_veRangeUtils.convertRangeTo0Based)
                })), {
                  sequenceData: sequenceData,
                  annotationType: "features"
                });
                beforeAnnotationCreate && beforeAnnotationCreate({
                  annotationTypePlural: annotationTypePlural,
                  annotation: newFeat,
                  props: _this2.props
                });
                upsertAnnotation(newFeat);
                annotationVisibilityShow(annotationTypePlural);
                hideModal();
              }),
              intent: _core.Intent.PRIMARY
            },
            "Save"
          )
        )
      );
    }
  }]);

  return AddOrEditAnnotationDialog;
}(_react2.default.Component);

function required(val) {
  if (!val) return "Required";
}

exports.default = function (_ref6) {
  var formName = _ref6.formName,
      getProps = _ref6.getProps,
      dialogProps = _ref6.dialogProps;

  return (0, _redux.compose)((0, _teselagenReactComponents.withDialog)(_extends({
    isDraggable: true,
    width: 350
  }, dialogProps)), _withEditorProps2.default, (0, _recompose.withProps)(getProps), (0, _reduxForm.reduxForm)({
    form: formName, // "AddOrEditAnnotationDialog",
    validate: function validate(values, _ref7) {
      var sequenceLength = _ref7.sequenceLength,
          sequenceData = _ref7.sequenceData;

      var errors = {};

      var _ref8 = sequenceData || {},
          circular = _ref8.circular;

      if (!circular && values.start > values.end) {
        errors.start = "Start must be less than End for a linear sequence";
        errors.end = "Start must be less than End for a linear sequence";
      }
      if (!(0, _veRangeUtils.isRangeWithinRange)((0, _veRangeUtils.convertRangeTo0Based)(values, sequenceLength), { start: 0, end: sequenceLength - 1 }, sequenceLength)) {
        errors.start = "Range must fit within sequence";
        errors.end = "Range must fit within sequence";
      }
      if (values.locations && values.locations.length > 1) {
        var entireLocationSpan = {
          start: values.locations[0].start,
          end: values.locations[values.locations.length - 1].end
        };
        if (entireLocationSpan.start > entireLocationSpan.end && !circular) {
          errors.locations = errors.locations || {};
          errors.locations[0] = {
            start: "In a non-circular sequence, joined spans must be in ascending order"
          };
          errors.locations[values.locations.length - 1] = {
            end: "In a non-circular sequence, joined spans must be in ascending order"
          };
        }
        values.locations.forEach(function (loc, index) {
          // if (!isRangeWithinRange(loc, values, sequenceLength)) {
          //   errors.locations = errors.locations || {};
          //   errors.locations[index] = {
          //     start: "Range must fit within feature",
          //     end: "Range must fit within feature"
          //   };
          // }
          if (index !== 0 && index !== values.locations.length - 1) {
            //it is a middle location so it should fit within the parent location
            if (!(0, _veRangeUtils.isRangeWithinRange)(loc, entireLocationSpan, sequenceLength)) {
              errors.locations = errors.locations || {};
              errors.locations[index] = {
                start: "Joined spans must be in ascending order",
                end: "Joined spans must be in ascending order"
              };
            }
          }
          values.locations.forEach(function (loc2, index2) {
            if (loc2 === loc) return;
            if ((0, _veRangeUtils.checkIfPotentiallyCircularRangesOverlap)(loc, loc2)) {
              errors.locations = errors.locations || {};
              errors.locations[index] = {
                start: "Joined spans must not overlap",
                end: "Joined spans must not overlap"
              };
              errors.locations[index2] = {
                start: "Joined spans must not overlap",
                end: "Joined spans must not overlap"
              };
            }
          });
        });
      }

      return errors;
    }
  }), (0, _reduxForm.formValues)("start", "end", "locations"))(AddOrEditAnnotationDialog);
};

module.exports = exports["default"];