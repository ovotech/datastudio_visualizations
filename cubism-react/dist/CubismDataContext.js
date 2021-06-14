"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Data = void 0;

var React = _interopRequireWildcard(require("react"));

var _immutable = _interopRequireDefault(require("immutable"));

var _QuantizableDateRecord = _interopRequireDefault(require("./QuantizableDateRecord"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Data = _immutable["default"].Record({
  rawData: null,
  data: _immutable["default"].Map(),
  dataMin: 0,
  dataMax: 0,
  dates: _immutable["default"].List(),
  dateMin: new _QuantizableDateRecord["default"](),
  dateMax: new _QuantizableDateRecord["default"](),
  dateOverlap: null
});

exports.Data = Data;
var context = /*#__PURE__*/React.createContext(Data());
context.displayName = "DataContext";
var _default = context;
exports["default"] = _default;
