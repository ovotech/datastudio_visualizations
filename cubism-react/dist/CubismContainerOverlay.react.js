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

var _CubismGraph = _interopRequireDefault(require("./CubismGraph.react"));

var _CubismGraphOverlay = _interopRequireDefault(require("./CubismGraphOverlay.react"));

var _CubismTimebar = _interopRequireDefault(require("./CubismTimebar.react"));

var _bucketfns = require("./bucketfns");

var css = _interopRequireWildcard(require("./cubism.module.css"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CubismContainer = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(CubismContainer, _React$PureComponent);

  var _super = _createSuper(CubismContainer);

  function CubismContainer() {
    var _this;

    (0, _classCallCheck2["default"])(this, CubismContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      hover: null,
      hoverTime: null
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onMouseOver", function (event) {
      var _this$props = _this.props,
          quantizedDates = _this$props.quantizedDates,
          width = _this$props.width,
          onHover = _this$props.onHover,
          offsetX = _this$props.offsetX;
      var hover = event.clientX + offsetX;
      var hoverTime = quantizedDates.reverse().get(width - hover);

      _this.setState({
        hover: hover,
        hoverTime: hoverTime
      });

      onHover(hover, hoverTime);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onMouseOut", function (event) {
      var onHover = _this.props.onHover;

      _this.setState({
        hover: null,
        hoverTime: null
      });

      onHover(null, null);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onMouseMove", function (event) {
      var _this$props2 = _this.props,
          quantizedDates = _this$props2.quantizedDates,
          width = _this$props2.width,
          onHover = _this$props2.onHover,
          offsetX = _this$props2.offsetX;
      var hover = event.clientX + offsetX;
      var hoverTime = quantizedDates.reverse().get(width - hover);

      _this.setState({
        hover: hover,
        hoverTime: hoverTime
      });

      onHover(hover, hoverTime);
    });
    return _this;
  }

  (0, _createClass2["default"])(CubismContainer, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          graphCount = _this$props3.graphCount,
          quantizedDates = _this$props3.quantizedDates,
          width = _this$props3.width;
      var _this$state = this.state,
          hover = _this$state.hover,
          hoverTime = _this$state.hoverTime;
      var height = graphCount * 31 + 40;
      return /*#__PURE__*/React.createElement("svg", {
        className: css.overlay,
        width: width,
        height: height,
        onMouseOver: this.onMouseOver,
        onMouseOut: this.onMouseOut,
        onMouseMove: this.onMouseMove
      }, /*#__PURE__*/React.createElement("line", {
        x1: hover == null ? -1 : hover,
        y1: 0,
        x2: hover == null ? -1 : hover,
        y2: height,
        stroke: "black",
        strokeWidth: "1",
        fill: "black",
        style: {
          stroke: "1px black"
        }
      }));
    }
  }]);
  return CubismContainer;
}(React.PureComponent);

exports["default"] = CubismContainer;
