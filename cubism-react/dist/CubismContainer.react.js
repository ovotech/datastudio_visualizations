"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _CubismContainerOverlay = _interopRequireDefault(require("./CubismContainerOverlay.react"));

var _CubismGraph = _interopRequireDefault(require("./CubismGraph.react"));

var _CubismGraphOverlay = _interopRequireDefault(require("./CubismGraphOverlay.react"));

var _CubismTimebar = _interopRequireDefault(require("./CubismTimebar.react"));

var _immutable = _interopRequireDefault(require("immutable"));

var _CubismCombinedContext = require("./CubismCombinedContext.react");

var _bucketfns = require("./bucketfns");

var css = _interopRequireWildcard(require("./cubism.module.css"));

var _CubismWraps = _interopRequireWildcard(require("./CubismWraps.react"));

var _CubismSettings = require("./CubismSettings.react");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var WrapColors = _immutable["default"].List(["#08519c", "#3182bd", "#6baed6", "#bdd7e7", "#bae4b3", "#74c476", "#31a354", "#006d2c"]);

var WrapPositive = WrapColors.slice(4);
var WrapNegative = WrapColors.slice(0, 4).reverse();

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
      hoverTime: null,
      offsetX: 0
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "containerRef", /*#__PURE__*/React.createRef());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onHover", function (hover, hoverTime) {
      _this.setState({
        hover: hover,
        hoverTime: hoverTime
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(CubismContainer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var container = this.containerRef.current;
      if (container == null) return;
      var offsetX = Math.abs(container.offsetLeft);

      if (offsetX != this.state.offsetX) {
        this.setState({
          offsetX: offsetX
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context = this.context,
          _this$context$data = _this$context.data,
          data = _this$context$data.data,
          dataMin = _this$context$data.dataMin,
          dataMax = _this$context$data.dataMax,
          quantizedDates = _this$context$data.dates,
          dateOverlap = _this$context$data.dateOverlap,
          _this$context$setting = _this$context.settings,
          bucketFn = _this$context$setting.bucketFn,
          graphHeight = _this$context$setting.graphHeight,
          timebarHeight = _this$context$setting.timebarHeight,
          _this$context$wraps = _this$context.wraps,
          wraps = _this$context$wraps.wraps,
          subsampleHeight = _this$context$wraps.subsampleHeight;
      var _this$props = this.props,
          width = _this$props.width,
          scrollY = _this$props.scrollY,
          debug = _this$props.debug;
      var _this$state = this.state,
          hover = _this$state.hover,
          hoverTime = _this$state.hoverTime,
          offsetX = _this$state.offsetX;
      return /*#__PURE__*/React.createElement("div", {
        className: css.cubismContainer,
        ref: this.containerRef
      }, /*#__PURE__*/React.createElement(_CubismTimebar["default"], {
        quantizedDates: quantizedDates,
        hoverTime: hoverTime,
        hover: hover,
        width: width,
        height: timebarHeight,
        scrollY: scrollY
      }), data.toArray().map(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            name = _ref2[0],
            samples = _ref2[1];

        return /*#__PURE__*/React.createElement(_CubismGraphOverlay["default"], {
          key: name,
          name: name,
          samples: samples,
          bucketFn: _bucketfns.bucketFns[bucketFn],
          hover: hover,
          hoverTime: hoverTime,
          width: width,
          height: graphHeight,
          offsetX: offsetX
        }, /*#__PURE__*/React.createElement(_CubismGraph["default"], {
          samples: samples,
          quantizedDates: quantizedDates,
          wraps: wraps,
          subsampleHeight: subsampleHeight,
          bucketFn: _bucketfns.bucketFns[bucketFn],
          width: width,
          height: graphHeight,
          dateOverlap: dateOverlap
        }));
      }), debug ? /*#__PURE__*/React.createElement("div", {
        style: {
          paddingLeft: offsetX
        }
      }, debug) : null, /*#__PURE__*/React.createElement(_CubismContainerOverlay["default"], {
        graphCount: data.size,
        quantizedDates: quantizedDates,
        width: width,
        onHover: this.onHover,
        offsetX: offsetX
      }));
    }
  }]);
  return CubismContainer;
}(React.PureComponent);

exports["default"] = CubismContainer;
(0, _defineProperty2["default"])(CubismContainer, "contextType", _CubismCombinedContext.CombinedContext);
