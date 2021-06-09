"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var React = _interopRequireWildcard(require("react"));

var css = _interopRequireWildcard(require("./cubism.module.css"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CubismGraphOverlay = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(CubismGraphOverlay, _React$PureComponent);

  var _super = _createSuper(CubismGraphOverlay);

  function CubismGraphOverlay() {
    (0, _classCallCheck2["default"])(this, CubismGraphOverlay);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(CubismGraphOverlay, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          name = _this$props.name,
          samples = _this$props.samples,
          bucketFn = _this$props.bucketFn,
          hover = _this$props.hover,
          hoverTime = _this$props.hoverTime,
          width = _this$props.width,
          height = _this$props.height,
          offsetX = _this$props.offsetX;
      return /*#__PURE__*/React.createElement("div", {
        className: css.cubismGraph,
        style: {
          height: height + 1
        }
      }, children, /*#__PURE__*/React.createElement("svg", {
        className: css.overlay,
        height: height,
        width: width
      }, /*#__PURE__*/React.createElement("text", {
        y: 20,
        x: offsetX
      }, name), /*#__PURE__*/React.createElement("text", {
        y: 20,
        x: width,
        textAnchor: "end"
      }, hoverTime ? bucketFn(samples.get(hoverTime)) : null)));
    }
  }]);
  return CubismGraphOverlay;
}(React.PureComponent);

exports["default"] = CubismGraphOverlay;
