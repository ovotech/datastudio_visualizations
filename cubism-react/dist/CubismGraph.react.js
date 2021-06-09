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

var _immutable = _interopRequireDefault(require("immutable"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CubismGraph = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(CubismGraph, _React$PureComponent);

  var _super = _createSuper(CubismGraph);

  function CubismGraph() {
    var _this;

    (0, _classCallCheck2["default"])(this, CubismGraph);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      initialRenderDone: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "canvasRef", /*#__PURE__*/React.createRef());
    return _this;
  }

  (0, _createClass2["default"])(CubismGraph, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var canvas = this.canvasRef.current;
      if (canvas == null) return;
      var _this$props = this.props,
          samples = _this$props.samples,
          quantizedDates = _this$props.quantizedDates,
          wraps = _this$props.wraps,
          subsampleHeight = _this$props.subsampleHeight,
          bucketFn = _this$props.bucketFn,
          width = _this$props.width,
          height = _this$props.height;
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
      var pixel = width;

      var _iterator = _createForOfIteratorHelper(quantizedDates.reverse()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var qd = _step.value;
          var sampleValues = samples.get(qd);

          if (sampleValues == null) {
            pixel--;
            continue;
          }

          var sample = bucketFn(sampleValues.toArray());

          var _iterator2 = _createForOfIteratorHelper(wraps.entries()),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2),
                  max = _step2$value[0],
                  color = _step2$value[1];

              ctx.beginPath();
              ctx.strokeStyle = color;

              if (max > 0) {
                ctx.moveTo(pixel, height);

                if (sample > max) {
                  ctx.lineTo(pixel, 0);
                  ctx.stroke();
                } else if (sample > 0) {
                  var subsample = max - sample;
                  ctx.lineTo(pixel, height * (subsample / subsampleHeight));
                  ctx.stroke();
                  break;
                }
              } else {
                ctx.moveTo(pixel, 0);

                if (sample < max) {
                  ctx.lineTo(pixel, height);
                  ctx.stroke();
                } else if (sample < 0) {
                  var _subsample = Math.abs(max - sample);

                  ctx.lineTo(pixel, height - height * (_subsample / subsampleHeight));
                  ctx.stroke();
                  break;
                }
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          pixel--;
          if (pixel < 0) break;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.setState({
        initialRenderDone: true
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // componentDidUpdate is not called after the initial render, force it.
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          width = _this$props2.width,
          height = _this$props2.height;
      return /*#__PURE__*/React.createElement("canvas", {
        width: width,
        height: height,
        ref: this.canvasRef
      });
    }
  }]);
  return CubismGraph;
}(React.PureComponent);

exports["default"] = CubismGraph;
