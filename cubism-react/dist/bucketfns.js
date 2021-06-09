"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bucketFns = void 0;
var bucketFns = {
  sum: bucketSum,
  average: bucketAverage
};
exports.bucketFns = bucketFns;

function bucketSum(values) {
  var arr = Array.from(values || []);
  return arr.reduce(function (p, v) {
    return p + v;
  }, 0);
}

function bucketAverage(values) {
  var arr = Array.from(values || []);
  if (arr.length === 0) return 0;
  return arr.reduce(function (p, v) {
    return p + v;
  }, 0) / arr.length;
}
