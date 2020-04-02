"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlignmentToolInner = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@blueprintjs/core");

var _teselagenReactComponents = require("teselagen-react-components");

var _reduxForm = require("redux-form");

var _bioParsers = require("bio-parsers");

var _lodash = require("lodash");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _uniqid = require("uniqid");

var _uniqid2 = _interopRequireDefault(_uniqid);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _ToolbarItem = require("./ToolbarItem");

var _ToolbarItem2 = _interopRequireDefault(_ToolbarItem);

var _withEditorProps = require("../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = (0, _withEditorProps.connectToEditor)(function (_ref) {
  var readOnly = _ref.readOnly,
      _ref$toolBar = _ref.toolBar,
      toolBar = _ref$toolBar === undefined ? {} : _ref$toolBar;

  return {
    readOnly: readOnly,
    isOpen: toolBar.openItem === "alignmentTool"
  };
})(function (_ref2) {
  var toolbarItemProps = _ref2.toolbarItemProps,
      isOpen = _ref2.isOpen;

  return _react2.default.createElement(_ToolbarItem2.default, _extends({
    Icon: _react2.default.createElement(_core.Icon, { "data-test": "alignmentTool", icon: "align-left" }),
    // toggled: alignmentTool.isOpen,
    renderIconAbove: isOpen,
    // onIconClick: toggleFindTool,
    Dropdown: ConnectedAlignmentToolDropdown,
    onIconClick: "toggleDropdown",
    noDropdownIcon: true,
    tooltip: isOpen ? "Hide Alignment Tool" : "Align to This Sequence"
  }, toolbarItemProps));
});

var AlignmentToolDropdown = function (_React$Component) {
  _inherits(AlignmentToolDropdown, _React$Component);

  function AlignmentToolDropdown() {
    _classCallCheck(this, AlignmentToolDropdown);

    return _possibleConstructorReturn(this, (AlignmentToolDropdown.__proto__ || Object.getPrototypeOf(AlignmentToolDropdown)).apply(this, arguments));
  }

  _createClass(AlignmentToolDropdown, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$savedAlignment = _props.savedAlignments,
          savedAlignments = _props$savedAlignment === undefined ? [] : _props$savedAlignment,
          hasSavedAlignments = _props.hasSavedAlignments,
          toggleDropdown = _props.toggleDropdown,
          showCreateAlignmentDialog = _props.showCreateAlignmentDialog,
          sequenceData = _props.sequenceData;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _core.Button,
          {
            intent: _core.Intent.PRIMARY,
            onClick: function onClick() {
              toggleDropdown();
              showCreateAlignmentDialog({
                createNewAlignment: _this2.props.createNewAlignment,
                upsertAlignmentRun: _this2.props.upsertAlignmentRun,
                initialValues: {
                  addedSequences: [_extends({}, sequenceData, { isTemplate: true })]
                }
              });
            }
          },
          "Create New Alignment"
        ),
        _react2.default.createElement("div", { className: "vespacer" }),
        hasSavedAlignments && _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "h6",
            null,
            "Saved Alignments:"
          ),
          !savedAlignments.length && _react2.default.createElement(
            "div",
            { style: { fontStyle: "italic" } },
            " No Alignments"
          ),
          savedAlignments.map(function (savedAlignment, i) {
            return _react2.default.createElement(
              "div",
              { key: i },
              "Saved Alignment ",
              i
            );
          })
        )
      );
    }
  }]);

  return AlignmentToolDropdown;
}(_react2.default.Component);

var ConnectedAlignmentToolDropdown = (0, _withEditorProps2.default)(AlignmentToolDropdown);

var instance = _axios2.default.create({
  // timeout: 1000,
  // headers: getJ5AuthorizationHeaders()
});

var AlignmentTool = function (_React$Component2) {
  _inherits(AlignmentTool, _React$Component2);

  function AlignmentTool() {
    var _ref3,
        _this4 = this;

    var _temp, _this3, _ret;

    _classCallCheck(this, AlignmentTool);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref3 = AlignmentTool.__proto__ || Object.getPrototypeOf(AlignmentTool)).call.apply(_ref3, [this].concat(args))), _this3), _this3.state = {
      templateSeqIndex: 0
    }, _this3.sendSelectedDataToBackendForAlignment = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(values) {
        var addedSequences, isPairwiseAlignment, isAlignToRefSeq, isAutotrimmedSeq, _this3$props, hideModal, createNewAlignment, upsertAlignmentRun, templateSeqIndex, addedSequencesToUse, addedSequencesToUseTrimmed, i, _mottTrim, suggestedTrimStart, suggestedTrimEnd, elementsToTrim, element, seqsToAlign, alignmentId, replaceProtocol, seqInfoToSend, _ref6, _ref6$data, _alignedSequences, pairwiseAlignments, alignmentsToRefSeq, alignedSequences;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                addedSequences = values.addedSequences, isPairwiseAlignment = values.isPairwiseAlignment, isAlignToRefSeq = values.isAlignToRefSeq, isAutotrimmedSeq = values.isAutotrimmedSeq;
                _this3$props = _this3.props, hideModal = _this3$props.hideModal, createNewAlignment = _this3$props.createNewAlignment, upsertAlignmentRun = _this3$props.upsertAlignmentRun;
                templateSeqIndex = _this3.state.templateSeqIndex;
                addedSequencesToUse = array_move(addedSequences, templateSeqIndex, 0);
                addedSequencesToUseTrimmed = void 0;

                if (isAutotrimmedSeq) {
                  addedSequencesToUseTrimmed = (0, _lodash.cloneDeep)(addedSequencesToUse);
                  // trimming any sequences with chromatogram data
                  for (i = 0; i < addedSequencesToUseTrimmed.length; i++) {
                    if ("chromatogramData" in addedSequencesToUseTrimmed[i]) {
                      // if (addedSequencesToUseTrimmed[i].chromatogramData.qualNums) {
                      if ("qualNums" in addedSequencesToUseTrimmed[i].chromatogramData) {
                        // returning bp pos for { suggestedTrimStart, suggestedTrimEnd }
                        _mottTrim = mottTrim(addedSequencesToUseTrimmed[i].chromatogramData.qualNums), suggestedTrimStart = _mottTrim.suggestedTrimStart, suggestedTrimEnd = _mottTrim.suggestedTrimEnd;

                        addedSequencesToUseTrimmed[i].sequence = addedSequencesToUseTrimmed[i].sequence.slice(suggestedTrimStart, suggestedTrimEnd + 1);
                        elementsToTrim = ["baseCalls", "basePos", "qualNums"];

                        for (element in addedSequencesToUseTrimmed[i].chromatogramData) {
                          if (elementsToTrim.indexOf(element) !== -1) {
                            addedSequencesToUseTrimmed[i].chromatogramData[element] = addedSequencesToUseTrimmed[i].chromatogramData[element].slice(suggestedTrimStart, suggestedTrimEnd + 1);
                          }
                        }
                      }
                    }
                  }
                }
                seqsToAlign = void 0;

                if (addedSequencesToUseTrimmed) {
                  seqsToAlign = addedSequencesToUseTrimmed;
                } else {
                  seqsToAlign = addedSequencesToUse;
                }

                hideModal();
                alignmentId = (0, _uniqid2.default)();
                // const alignmentIdMismatches = uniqid();

                createNewAlignment({
                  id: alignmentId,
                  name: seqsToAlign[0].name + " Alignment"
                });
                //set the alignment to loading
                upsertAlignmentRun({
                  id: alignmentId,
                  loading: true
                });
                // createNewMismatchesList({
                //   id: alignmentIdMismatches,
                //   name: addedSequencesToUse[0].name + " Mismatches",
                //   alignmentId: alignmentId
                // });

                // const j5server = process.env.REMOTE_J5 || "http://j5server.teselagen.com"

                window.toastr.success("Alignment submitted.");

                replaceProtocol = function replaceProtocol(url) {
                  return url.replace("http://", window.location.protocol + "//");
                };

                seqInfoToSend = seqsToAlign.map(function (_ref5) {
                  var sequence = _ref5.sequence,
                      name = _ref5.name,
                      id = _ref5.id;

                  return {
                    sequence: sequence,
                    name: name,
                    id: id
                  };
                });
                _context.next = 17;
                return instance.post(replaceProtocol("http://j5server.teselagen.com/alignment/run"), {
                  //only send over the bear necessities :)
                  sequencesToAlign: seqInfoToSend,
                  isPairwiseAlignment: isPairwiseAlignment,
                  isAlignToRefSeq: isAlignToRefSeq
                });

              case 17:
                _ref6 = _context.sent;
                _ref6$data = _ref6.data;
                _ref6$data = _ref6$data === undefined ? {} : _ref6$data;
                _alignedSequences = _ref6$data.alignedSequences, pairwiseAlignments = _ref6$data.pairwiseAlignments, alignmentsToRefSeq = _ref6$data.alignmentsToRefSeq;
                // alignmentsToRefSeq set to alignedSequences for now

                alignedSequences = _alignedSequences;

                if (alignmentsToRefSeq) {
                  alignedSequences = alignmentsToRefSeq;
                }
                if (!alignedSequences && !pairwiseAlignments) window.toastr.error("Error running sequence alignment!");
                //set the alignment to loading
                upsertAlignmentRun({
                  id: alignmentId,
                  pairwiseAlignments: pairwiseAlignments && pairwiseAlignments.map(function (alignedSequences, topIndex) {
                    return alignedSequences.map(function (alignmentData, innerIndex) {
                      return {
                        sequenceData: seqsToAlign[innerIndex > 0 ? topIndex + 1 : 0],
                        alignmentData: alignmentData,
                        chromatogramData: seqsToAlign[innerIndex].chromatogramData
                      };
                    });
                  }),
                  alignmentTracks: alignedSequences && alignedSequences.map(function (alignmentData) {
                    return {
                      sequenceData: seqsToAlign[alignmentData.name.slice(0, alignmentData.name.indexOf("_"))],
                      alignmentData: alignmentData,
                      chromatogramData: seqsToAlign[alignmentData.name.slice(0, alignmentData.name.indexOf("_"))].chromatogramData
                    };
                  })
                  // alignmentTracks:
                  //   alignedSequences &&
                  //   alignedSequences.map((alignmentData, i) => {
                  //     return {
                  //       sequenceData: addedSequencesToUse[i],
                  //       alignmentData,
                  //       chromatogramData: addedSequencesToUse[i].chromatogramData
                  //     };
                  //   })
                });

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this4);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }(), _this3.handleFileUpload = function (files, onChange) {
      var array = _this3.props.array;

      (0, _lodash.flatMap)(files, function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(file) {
          var results;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return (0, _bioParsers.anyToJson)(file.originalFileObj, {
                    fileName: file.name,
                    acceptParts: true
                  });

                case 2:
                  results = _context2.sent;
                  return _context2.abrupt("return", results.forEach(function (result) {
                    if (result.success) {
                      array.push("addedSequences", result.parsedSequence);
                    } else {
                      return window.toastr.warning("Error parsing file: ", file.name);
                    }
                  }));

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, _this4);
        }));

        return function (_x2) {
          return _ref7.apply(this, arguments);
        };
      }());
      onChange([]);
    }, _this3.renderAddSequence = function (_ref8) {
      var fields = _ref8.fields,
          templateSeqIndex = _ref8.templateSeqIndex;
      var handleSubmit = _this3.props.handleSubmit;


      var sequencesToAlign = fields.getAll() || [];
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "h6",
          null,
          "Or enter sequences in plain text format"
        ),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(AddYourOwnSeqForm, {
            addSeq: function addSeq(newSeq) {
              fields.push(newSeq);
            }
          }),
          _react2.default.createElement(
            "h6",
            { style: { marginTop: 15 } },
            "Sequences To Align: "
          ),
          !fields.getAll() && _react2.default.createElement(
            "div",
            null,
            "No sequences added yet."
          ),
          _react2.default.createElement(
            "div",
            {
              style: { maxHeight: 180, overflowY: "auto" },
              className: "veAlignmentToolSelectedSequenceList"
            },
            sequencesToAlign.map(function (addedSeq, index) {
              return _react2.default.createElement(
                "div",
                {
                  onClick: function onClick() {
                    _this3.setState({
                      templateSeqIndex: index
                    });
                  },
                  style: {
                    borderBottom: "1px solid lightgrey",
                    paddingBottom: 4,
                    marginBottom: 4,
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "flex"
                  },
                  key: index
                },
                _react2.default.createElement(
                  "div",
                  null,
                  addedSeq.name,
                  " ",
                  _react2.default.createElement(
                    "span",
                    { style: { fontSize: 10 } },
                    " ",
                    "(",
                    addedSeq.sequence.length,
                    " bps)"
                  )
                ),
                index === templateSeqIndex && _react2.default.createElement(
                  "div",
                  {
                    className: (0, _classnames2.default)(_core.Classes.TAG, _core.Classes.ROUND, _core.Classes.INTENT_PRIMARY)
                  },
                  "template"
                ),
                _react2.default.createElement(
                  _core.Button,
                  {
                    onClick: function onClick(e) {
                      e.stopPropagation();
                      e.preventDefault();
                      fields.remove(index);
                      if (index === templateSeqIndex) {
                        _this3.setState({ templateSeqIndex: 0 });
                      }
                    }
                  },
                  "Remove"
                )
              );
            })
          ),
          _react2.default.createElement("br", null),
          _react2.default.createElement(_teselagenReactComponents.CheckboxField, {
            name: "isPairwiseAlignment",
            style: { display: "flex", alignItems: "center" },
            label: _react2.default.createElement(
              "div",
              null,
              "Create Pairwise Alignment",
              " ",
              _react2.default.createElement(
                "span",
                { style: { fontSize: 11 } },
                "Individually align each uploaded file against the template sequence (instead of creating a single Multiple Sequence Alignment)"
              )
            )
          }),
          _react2.default.createElement(_teselagenReactComponents.CheckboxField, {
            name: "isAlignToRefSeq",
            style: { display: "flex", alignItems: "center" },
            label: _react2.default.createElement(
              "div",
              null,
              "Align Sequencing Reads to Reference Sequence",
              " ",
              _react2.default.createElement(
                "span",
                { style: { fontSize: 11 } },
                "Align short sequencing reads to a long reference sequence"
              )
            )
          }),
          _react2.default.createElement(_teselagenReactComponents.CheckboxField, {
            name: "isAutotrimmedSeq",
            style: { display: "flex", alignItems: "center" },
            label: _react2.default.createElement(
              "div",
              null,
              "Auto-Trim Sequences",
              " ",
              _react2.default.createElement(
                "span",
                { style: { fontSize: 11 } },
                "Automatically trim low-quality ends of sequences based on quality scores"
              )
            )
          }),
          _react2.default.createElement(
            _core.Button,
            {
              style: { marginTop: 15, float: "right" },
              intent: _core.Intent.PRIMARY,
              disabled: sequencesToAlign.length < 2,
              onClick: handleSubmit(_this3.sendSelectedDataToBackendForAlignment)
            },
            "Create alignment"
          )
        )
      );
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(AlignmentTool, [{
    key: "render",
    value: function render() {
      var selectFromSequenceLibraryHook = this.props.selectFromSequenceLibraryHook;
      var templateSeqIndex = this.state.templateSeqIndex;

      return _react2.default.createElement(
        "div",
        { style: { padding: 20 }, className: "veAlignmentTool" },
        _react2.default.createElement(
          "h6",
          null,
          "Upload files you'd like to align (.ab1, .fasta, .gb) "
        ),
        _react2.default.createElement(_teselagenReactComponents.FileUploadField, {
          name: "alignmentToolSequenceUpload",
          style: { maxWidth: 400 },
          beforeUpload: this.handleFileUpload
        }),
        selectFromSequenceLibraryHook && _react2.default.createElement(
          "h6",
          null,
          "Or Select from your sequence library "
        ),
        _react2.default.createElement(_reduxForm.FieldArray, {
          name: "addedSequences",
          templateSeqIndex: templateSeqIndex,
          component: this.renderAddSequence
        })
      );
    }
  }]);

  return AlignmentTool;
}(_react2.default.Component);

var AlignmentToolInner = exports.AlignmentToolInner = (0, _reduxForm.reduxForm)({
  form: "veAlignmentTool"
  // initialValues: {
  //   addedSequences: []
  // }
})(AlignmentTool);

var AddYourOwnSeqForm = (0, _reduxForm.reduxForm)({
  form: "AddYourOwnSeqForm",
  validate: function validate(_ref9) {
    var name = _ref9.name,
        sequence = _ref9.sequence;

    var errors = {};
    if (!name) {
      errors.name = "Required";
    }
    if (!sequence) {
      errors.sequence = "Required";
    }
    return errors;
  }
})(function (_ref10) {
  var pristine = _ref10.pristine,
      error = _ref10.error,
      handleSubmit = _ref10.handleSubmit,
      reset = _ref10.reset,
      addSeq = _ref10.addSeq;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(_teselagenReactComponents.EditableTextField, {
      style: { maxWidth: 200 },
      placeholder: "Untitled Sequence",
      name: "name"
    }),
    _react2.default.createElement(_teselagenReactComponents.TextareaField, {
      style: { maxWidth: 400 },
      placeholder: "AGTTGAGC",
      name: "sequence"
    }),
    _react2.default.createElement(
      _core.Button,
      {
        disabled: pristine || error,
        onClick: handleSubmit(function (vals) {
          reset();
          addSeq(vals);
        })
      },
      "Add"
    )
  );
});

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}

function mottTrim(qualNums) {
  var startPos = 0;
  var endPos = 0;
  var totalScoreInfo = [];
  var score = 0;
  var totalScore = 0;
  var cutoff = 0.05;
  for (var i = 0; i < qualNums.length; i++) {
    // low-quality bases have high error probabilities, so may have a negative base score
    score = cutoff - Math.pow(10, qualNums[i] / -10);
    totalScore += score;
    totalScoreInfo.push(totalScore);
    // score = score + cutoff - Math.pow(10, qualNums[i] / -10);
    // if (totalScore < 0) {
    //   tempStart = i;
    // }
    // if (i - tempStart > endPos - startPos) {
    //   startPos = tempStart;
    //   endPos = i;
    // }
    if (totalScore < 0) {
      totalScore = 0;
    }
  }
  var firstPositiveValue = totalScoreInfo.find(function (e) {
    return e > 0;
  });
  startPos = totalScoreInfo.indexOf(firstPositiveValue);
  var highestValue = Math.max.apply(Math, totalScoreInfo);
  endPos = totalScoreInfo.lastIndexOf(highestValue);
  return {
    suggestedTrimStart: startPos,
    suggestedTrimEnd: endPos
  };
}