"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindBar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@blueprintjs/core");

var _withEditorProps = require("../withEditorProps");

var _withEditorProps2 = _interopRequireDefault(_withEditorProps);

var _onlyUpdateForKeysDeep = require("../utils/onlyUpdateForKeysDeep");

var _onlyUpdateForKeysDeep2 = _interopRequireDefault(_onlyUpdateForKeysDeep);

var _findToolConstants = require("../constants/findToolConstants");

require("./style.css");

var _teselagenReactComponents = require("teselagen-react-components");

var _annotationSearchSelector = require("../selectors/annotationSearchSelector");

var _annotationTypes = require("../utils/annotationTypes");

var _veSequenceUtils = require("ve-sequence-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var opts = [{ label: "DNA", value: "DNA" }, { label: "Amino Acids", value: "AA" }];

var FindBar = exports.FindBar = function (_React$Component) {
  _inherits(FindBar, _React$Component);

  function FindBar() {
    _classCallCheck(this, FindBar);

    return _possibleConstructorReturn(this, (FindBar.__proto__ || Object.getPrototypeOf(FindBar)).apply(this, arguments));
  }

  _createClass(FindBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.inputEl) {
        this.inputEl.select();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          toggleFindTool = _props.toggleFindTool,
          toggleHighlightAll = _props.toggleHighlightAll,
          toggleIsInline = _props.toggleIsInline,
          updateSearchText = _props.updateSearchText,
          annotationVisibilityShow = _props.annotationVisibilityShow,
          updateAmbiguousOrLiteral = _props.updateAmbiguousOrLiteral,
          updateDnaOrAA = _props.updateDnaOrAA,
          updateMatchNumber = _props.updateMatchNumber,
          selectionLayerUpdate = _props.selectionLayerUpdate,
          annotationSearchMatches = _props.annotationSearchMatches,
          _props$findTool = _props.findTool,
          findTool = _props$findTool === undefined ? {} : _props$findTool;
      var searchText = findTool.searchText,
          dnaOrAA = findTool.dnaOrAA,
          highlightAll = findTool.highlightAll,
          ambiguousOrLiteral = findTool.ambiguousOrLiteral,
          _findTool$matchesTota = findTool.matchesTotal,
          matchesTotal = _findTool$matchesTota === undefined ? 0 : _findTool$matchesTota,
          _findTool$matchNumber = findTool.matchNumber,
          matchNumber = _findTool$matchNumber === undefined ? 0 : _findTool$matchNumber,
          isInline = findTool.isInline;

      var findOptionsEls = [_react2.default.createElement(_core.HTMLSelect, {
        key: "dnaoraa",
        options: opts,
        name: "dnaOrAA",
        value: dnaOrAA,
        onChange: function onChange(e) {
          updateDnaOrAA(e.target.value);
        }
      }), _react2.default.createElement(
        "div",
        { style: { display: "flex" }, key: "ambiguousorliteral" },
        _react2.default.createElement(_core.HTMLSelect, {
          name: "ambiguousOrLiteral",
          options: [{ label: "Literal", value: "LITERAL" }, { label: "Ambiguous", value: "AMBIGUOUS" }],
          value: ambiguousOrLiteral,
          onChange: function onChange(e) {
            updateAmbiguousOrLiteral(e.target.value);
          }
        }),
        _react2.default.createElement(
          _teselagenReactComponents.InfoHelper,
          { style: { marginLeft: 10 } },
          _react2.default.createElement(
            "div",
            null,
            "Ambiguous substitutions:",
            _react2.default.createElement(
              "div",
              { style: { display: "flex", fontSize: 12 } },
              _react2.default.createElement(
                "div",
                { style: { marginRight: 20 } },
                _react2.default.createElement(
                  "div",
                  { style: { fontSize: 14, marginBottom: 4, marginTop: 5 } },
                  "DNA:"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "M: AC"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "R: AG"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "W: AT"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "S: CG"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "Y: CT"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "K: GT"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "V: ACG"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "H: ACT"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "D: AGT"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "B: CGT"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "X: GATC"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "N: GATC"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "*: any"
                )
              ),
              _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                  "div",
                  { style: { fontSize: 14, marginBottom: 4, marginTop: 5 } },
                  "AA:"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "B: ND"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "J: IL"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "X: ACDEFGHIKLMNPQRSTVWY"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "Z: QE"
                ),
                _react2.default.createElement(
                  "div",
                  null,
                  "*: any"
                )
              )
            )
          )
        )
      ), _react2.default.createElement(
        _core.Switch,
        {
          key: "highlightall",
          checked: highlightAll,
          onChange: toggleHighlightAll,
          disabled: matchesTotal > _findToolConstants.MAX_MATCHES_DISPLAYED
        },
        _react2.default.createElement(
          _core.Tooltip,
          {
            disabled: matchesTotal <= _findToolConstants.MAX_MATCHES_DISPLAYED,
            content: "Disabled because there are >{MAX_MATCHES_DISPLAYED} matches"
          },
          "Highlight All"
        )
      ), _react2.default.createElement(
        _core.Switch,
        { key: "isInline", checked: !isInline, onChange: toggleIsInline },
        "Expanded"
      )];
      var InputToUse = !isInline ? _core.TextArea : _core.InputGroup;
      var rightEl = _react2.default.createElement(
        "span",
        null,
        isInline && _react2.default.createElement(_core.Popover, {
          autoFocus: false,
          position: _core.Position.BOTTOM,
          target: _react2.default.createElement(_core.Button, {
            "data-test": "veFindBarOptionsToggle",
            minimal: true,
            icon: "wrench"
          }),
          content: _react2.default.createElement(
            "div",
            {
              className: "ve-find-options-popover",
              style: {
                display: "flex",
                flexDirection: "column",
                paddingLeft: 20,
                paddingBottom: 10,
                paddingTop: 10,
                paddingRight: 20
              }
            },
            findOptionsEls
          )
        }),
        _react2.default.createElement(
          "span",
          { style: { marginRight: 3, color: "lightgrey" } },
          matchesTotal > 0 ? matchNumber + 1 : 0,
          "/",
          matchesTotal
        ),
        _react2.default.createElement(_core.Button, {
          "data-test": "veFindPreviousMatchButton",
          minimal: true,
          disabled: matchesTotal <= 0,
          onClick: function onClick() {
            updateMatchNumber(matchesTotal <= 0 ? 0 : mod(matchNumber - 1, matchesTotal));
          },
          icon: "caret-up"
        }),
        _react2.default.createElement(_core.Button, {
          "data-test": "veFindNextMatchButton",
          minimal: true,
          disabled: matchesTotal <= 0,
          onClick: function onClick() {
            updateMatchNumber(matchesTotal <= 0 ? 0 : mod(matchNumber + 1, matchesTotal));
          },
          icon: "caret-down"
        })
      );

      return _react2.default.createElement(
        "div",
        {
          style: isInline ? {
            display: "flex"
          } : {
            position: "fixed",
            top: 0,
            right: 25,
            padding: 10,
            display: "flex",
            alignItems: "center",
            paddingBottom: 5,
            background: "white",
            zIndex: "20000",
            borderBottom: "1px solid lightgrey",
            borderLeft: "1px solid lightgrey",
            borderRight: "1px solid lightgrey",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px"
          },
          className: "veFindBar"
        },
        isInline && _react2.default.createElement(_core.Button, { onClick: toggleFindTool, icon: "cross" }),
        _react2.default.createElement(_core.Popover, {
          target: _react2.default.createElement(InputToUse, {
            autoFocus: true,
            style: _extends({
              resize: "vertical"
            }, !isInline && { width: 350, minHeight: 70 }),
            inputRef: function inputRef(n) {
              if (n) _this2.inputEl = n;
            },
            onKeyDown: function onKeyDown(e) {
              e.persist();
              if (e.metaKey && e.keyCode === 70) {
                //cmd-f
                toggleFindTool();
                e.preventDefault();
                e.stopPropagation();
              } else if (e.keyCode === 13) {
                //enter key!
                updateMatchNumber(matchesTotal <= 0 ? 0 : mod(matchNumber + 1, matchesTotal));
              } else if (e.keyCode === 27) {
                //esc key!
                toggleFindTool();
              }
            },
            rightElement: rightEl,
            onChange: function onChange(e) {
              return updateSearchText(e.target.value);
            },
            value: searchText,
            leftIcon: "search"
          }),
          position: "bottom",
          minimal: true,
          isOpen: annotationSearchMatches && annotationSearchMatches.filter(function (m) {
            return m.length;
          }).length,
          content: _react2.default.createElement(AnnotationSearchMatchComp, {
            annotationVisibilityShow: annotationVisibilityShow,
            toggleFindTool: toggleFindTool,
            selectionLayerUpdate: selectionLayerUpdate,
            annotationSearchMatches: annotationSearchMatches
          })
        }),
        !isInline && _react2.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              maxWidth: "400px",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "stretch",
              height: "76px"
            }
          },
          rightEl,
          findOptionsEls
        ),
        !isInline && _react2.default.createElement(_core.Button, {
          minimal: true,
          style: { position: "absolute", bottom: 0, right: -10 },
          onClick: toggleFindTool,
          icon: "cross"
        })
      );
    }
  }]);

  return FindBar;
}(_react2.default.Component);

var wrapped = (0, _onlyUpdateForKeysDeep2.default)(["findTool", "annotationSearchMatches"])(FindBar);
exports.default = (0, _withEditorProps2.default)(wrapped);


function mod(n, m) {
  return (n % m + m) % m;
}

function AnnotationSearchMatchComp(_ref) {
  var annotationSearchMatches = _ref.annotationSearchMatches,
      selectionLayerUpdate = _ref.selectionLayerUpdate,
      annotationVisibilityShow = _ref.annotationVisibilityShow,
      toggleFindTool = _ref.toggleFindTool;

  var toReturn = _react2.default.createElement(
    "div",
    { className: "veAnnotationFindMatches" },
    _annotationSearchSelector.searchableTypes.map(function (type, i) {
      var annotationsFound = annotationSearchMatches[i];
      if (!annotationsFound) return null;
      return annotationsFound.length ? _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "veAnnotationFoundType" },
          annotationsFound.length,
          " ",
          (0, _annotationTypes.getSingular)(type),
          " match",
          annotationsFound.length > 1 ? "es" : null,
          annotationsFound.length <= 10 ? null : " (only showing 10)",
          ":"
        ),
        _react2.default.createElement(
          "div",
          null,
          annotationsFound.slice(0, 10).map(function (ann, i) {
            return _react2.default.createElement(
              "div",
              {
                onClick: function onClick() {
                  annotationVisibilityShow(type);
                  selectionLayerUpdate(ann);
                  toggleFindTool();
                },
                className: "veAnnotationFoundResult",
                key: i
              },
              _react2.default.createElement(
                "div",
                { style: { display: "flex", alignItems: "center" } },
                _react2.default.createElement("div", {
                  style: {
                    background: type === "parts" ? "purple" : ann.color || _veSequenceUtils.featureColors[ann.type],
                    height: 15,
                    width: 15,
                    marginRight: 3
                  }
                }),
                ann.name
              ),
              _react2.default.createElement(
                "div",
                { className: "veAnnotationFoundResultRange" },
                ann.start + 1,
                "-",
                ann.end + 1
              )
            );
          })
        )
      ) : null;
    })
  );
  return toReturn;
}