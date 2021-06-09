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

var _immutable = _interopRequireDefault(require("immutable"));

var _CubismContainer = _interopRequireDefault(require("./CubismContainer.react"));

var _QuantizableDateRecord = _interopRequireDefault(require("./QuantizableDateRecord"));

var _bucketfns = require("./bucketfns");

var css = _interopRequireWildcard(require("./cubism.module.css"));

var _CubismDebug = _interopRequireDefault(require("./CubismDebug.react"));

var _CubismDataContext = _interopRequireWildcard(require("./CubismDataContext"));

var _CubismLayoutContext = _interopRequireDefault(require("./CubismLayoutContext"));

var _CubismCombinedContext = _interopRequireWildcard(require("./CubismCombinedContext.react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CubismController = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(CubismController, _React$PureComponent);

  var _super = _createSuper(CubismController);

  function CubismController() {
    var _this;

    (0, _classCallCheck2["default"])(this, CubismController);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      scrollY: 0
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onScroll", function (event) {
      _this.setState({
        scrollY: event.currentTarget.scrollTop
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(CubismController, [{
    key: "render",
    value: function render() {
      var _this$context$layout = this.context.layout,
          width = _this$context$layout.width,
          height = _this$context$layout.height;
      var scrollY = this.state.scrollY;
      var debug = process.env.NODE_ENV === "production" ? null : /*#__PURE__*/React.createElement(_CubismDebug["default"], null);
      return /*#__PURE__*/React.createElement("div", {
        className: css.cubismControllerScroll,
        style: {
          width: width,
          height: height
        },
        onScroll: this.onScroll
      }, /*#__PURE__*/React.createElement("div", {
        className: css.cubismController
      }, /*#__PURE__*/React.createElement(_CubismContainer["default"], {
        width: width,
        scrollY: scrollY,
        debug: debug
      })));
    }
  }]);
  return CubismController;
}(React.PureComponent);

exports["default"] = CubismController;
(0, _defineProperty2["default"])(CubismController, "contextType", _CubismCombinedContext.CombinedContext);
