"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _reactModal = _interopRequireDefault(require("react-modal"));

var _reactCopyToClipboard = require("react-copy-to-clipboard");

var _QuantizableDateRecord = _interopRequireDefault(require("./QuantizableDateRecord"));

var _CubismCombinedContext = require("./CubismCombinedContext.react");

var _CubismWraps = require("./CubismWraps.react");

var _CubismDataDateQuantization = require("./CubismDataDateQuantization.react");

var css = _interopRequireWildcard(require("./cubism.module.css"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function QuantizedDateLevel(props) {
  switch (props.quantizationLevel) {
    case _QuantizableDateRecord["default"].MsPerWeek:
      return "Week";

    case _QuantizableDateRecord["default"].MsPerDay:
      return "Day";

    case _QuantizableDateRecord["default"].MsPerHour:
      return "Hour";

    case _QuantizableDateRecord["default"].MsPerMinute:
      return "Minute";

    case _QuantizableDateRecord["default"].MsPerSecond:
      return "Second";

    default:
      return "Unknown";
  }
}

var CubismDebug = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(CubismDebug, _React$PureComponent);

  var _super = _createSuper(CubismDebug);

  function CubismDebug() {
    var _this;

    (0, _classCallCheck2["default"])(this, CubismDebug);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      dataModalOpen: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "dataModalOpen", function () {
      _this.setState({
        dataModalOpen: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "dataModalClose", function () {
      _this.setState({
        dataModalOpen: false
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(CubismDebug, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$context = this.context,
          _this$context$data = _this$context.data,
          dates = _this$context$data.dates,
          rawData = _this$context$data.rawData,
          _this$context$wraps = _this$context.wraps,
          wraps = _this$context$wraps.wraps,
          subsampleHeight = _this$context$wraps.subsampleHeight;
      var dataModalOpen = this.state.dataModalOpen;
      var dataText = dataModalOpen ? JSON.stringify(rawData, null, 2) : null;
      return /*#__PURE__*/React.createElement(_CubismDataDateQuantization.DateQuantContext.Consumer, null, function (_ref) {
        var quantizationLevel = _ref.quantizationLevel;
        return /*#__PURE__*/React.createElement("div", {
          className: css.cubismDebug
        }, "Debug: ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
          onClick: _this2.dataModalOpen
        }, "Show Data"), /*#__PURE__*/React.createElement("br", null), "Dates: ", dates.size, /*#__PURE__*/React.createElement("br", null), "Min date:", " ", dates.slice(0, 1).map(function (v) {
          return v.toString();
        }).get(0), /*#__PURE__*/React.createElement("br", null), "Max date:", " ", dates.slice(-1).map(function (v) {
          return v.toString();
        }).get(0), /*#__PURE__*/React.createElement("br", null), "Level: ", /*#__PURE__*/React.createElement(QuantizedDateLevel, {
          quantizationLevel: quantizationLevel
        }), /*#__PURE__*/React.createElement(_reactModal["default"], {
          isOpen: _this2.state.dataModalOpen,
          onRequestClose: _this2.dataModalClose,
          contentLabel: "Raw Data"
        }, /*#__PURE__*/React.createElement(_reactCopyToClipboard.CopyToClipboard, {
          text: dataText
        }, /*#__PURE__*/React.createElement("button", null, "Copy to Clipboard")), /*#__PURE__*/React.createElement("pre", null, dataText)));
      });
    }
  }]);
  return CubismDebug;
}(React.PureComponent);

exports["default"] = CubismDebug;
(0, _defineProperty2["default"])(CubismDebug, "contextType", _CubismCombinedContext.CombinedContext);
