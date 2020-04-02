"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _veRangeUtils = require("ve-range-utils");

var _AASliver = require("./AASliver");

var _AASliver2 = _interopRequireDefault(_AASliver);

var _pureNoFunc = require("../../utils/pureNoFunc");

var _pureNoFunc2 = _interopRequireDefault(_pureNoFunc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Translation = function (_React$Component) {
  _inherits(Translation, _React$Component);

  function Translation() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Translation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Translation.__proto__ || Object.getPrototypeOf(Translation)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hasMounted: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Translation, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.timeout = setTimeout(function () {
        _this2.setState({
          hasMounted: true
        });
      }, 5);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          annotationRange = _props.annotationRange,
          height = _props.height,
          showAminoAcidNumbers = _props.showAminoAcidNumbers,
          charWidth = _props.charWidth,
          aminoAcidNumbersHeight = _props.aminoAcidNumbersHeight,
          _onClick = _props.onClick,
          onRightClick = _props.onRightClick,
          _onDoubleClick = _props.onDoubleClick,
          sequenceLength = _props.sequenceLength,
          getGaps = _props.getGaps,
          isProtein = _props.isProtein;
      var hasMounted = this.state.hasMounted;
      var annotation = annotationRange.annotation;

      if (!hasMounted && !isProtein) {
        return _react2.default.createElement("g", { height: height, className: "translationLayer" });
      }
      //we have an amino acid representation of our entire annotation, but it is an array
      //starting at 0, even if the annotation starts at some arbitrary point in the sequence
      var _annotation$aminoAcid = annotation.aminoAcids,
          aminoAcids = _annotation$aminoAcid === undefined ? [] : _annotation$aminoAcid;
      //so we "zero" our subRange by the annotation start

      var subrangeStartRelativeToAnnotationStart = (0, _veRangeUtils.zeroSubrangeByContainerRange)(annotationRange, annotation, sequenceLength);
      //which allows us to then get the amino acids for the subRange
      var aminoAcidsForSubrange = (0, _veRangeUtils.getSequenceWithinRange)(subrangeStartRelativeToAnnotationStart, aminoAcids);

      //we then loop over all the amino acids in the sub range and draw them onto the row
      var translationSVG = aminoAcidsForSubrange.map(function (aminoAcidSliver, index) {
        var isEndFiller = index === 0 && aminoAcidSliver.positionInCodon === (annotation.forward ? 2 : 0);
        // const isStartFiller = false
        var isTruncatedEnd = index === 0 && aminoAcidSliver.positionInCodon === 1;
        var isTruncatedStart = index === aminoAcidsForSubrange.length - 1 && aminoAcidSliver.positionInCodon === 1;
        if (!annotation.forward) {
          var holder = isTruncatedEnd;
          isTruncatedEnd = isTruncatedStart;
          isTruncatedStart = holder;
        }
        var isStartFiller = index === aminoAcidsForSubrange.length - 1 && aminoAcidSliver.positionInCodon === (annotation.forward ? 0 : 2);

        if (aminoAcidSliver.positionInCodon !== 1 && !isStartFiller && !isEndFiller) {
          return null;
        }

        var _getGaps = getGaps(aminoAcidSliver.codonRange),
            gapsInside = _getGaps.gapsInside,
            gapsBefore = _getGaps.gapsBefore;

        var gapsInsideFeatureStartToBp = getGaps({
          start: annotationRange.start,
          end: aminoAcidSliver.sequenceIndex
        }).gapsInside;
        // var relativeAAPositionInTranslation = annotationRange.start % bpsPerRow + index;
        var relativeAAPositionInTranslation = index;
        var aminoAcid = aminoAcidSliver.aminoAcid || {};
        //get the codonIndices relative to
        return _react2.default.createElement(_AASliver2.default, {
          isFiller: isEndFiller || isStartFiller,
          isTruncatedEnd: isTruncatedEnd,
          isTruncatedStart: isTruncatedStart,
          onClick: function onClick(event) {
            _onClick({
              annotation: aminoAcidSliver.codonRange,
              codonRange: aminoAcidSliver.codonRange,
              event: event,
              gapsInside: gapsInside,
              gapsBefore: gapsBefore
            });
          },
          onContextMenu: function onContextMenu(event) {
            onRightClick && onRightClick({
              annotation: annotation,
              codonRange: aminoAcidSliver.codonRange,
              event: event,
              gapsInside: gapsInside,
              gapsBefore: gapsBefore
            });
          },
          title: aminoAcid.name + " -- Index: " + (aminoAcidSliver.aminoAcidIndex + 1) + " -- Hydrophobicity " + aminoAcid.hydrophobicity,
          showAminoAcidNumbers: showAminoAcidNumbers,
          aminoAcidIndex: aminoAcidSliver.aminoAcidIndex,
          onDoubleClick: function onDoubleClick(event) {
            _onDoubleClick({ annotation: annotation, event: event });
          },
          getGaps: getGaps,
          key: annotation.id + aminoAcidSliver.sequenceIndex,
          forward: annotation.forward,
          width: charWidth,
          height: showAminoAcidNumbers ? height - aminoAcidNumbersHeight : height,
          relativeAAPositionInTranslation: relativeAAPositionInTranslation + gapsInsideFeatureStartToBp,
          letter: aminoAcid.value,
          color: aminoAcid.color,
          positionInCodon: aminoAcidSliver.positionInCodon
        });
      });

      return _react2.default.createElement(
        "g",
        { className: "translationLayer" },
        translationSVG
      );
    }
  }]);

  return Translation;
}(_react2.default.Component);

exports.default = (0, _pureNoFunc2.default)(Translation);
module.exports = exports["default"];