// @flow strict

export type BucketFn = (values: ?Iterable<number>) => number;

export type BucketFns = "sum" | "average";

export const bucketFns: { [BucketFns]: BucketFn } = {
  sum: bucketSum,
  average: bucketAverage,
};

function bucketSum(values: ?Iterable<number>): number {
  const arr = Array.from(values || []);
  return arr.reduce((p, v) => p + v, 0);
}

function bucketAverage(values: ?Iterable<number>): number {
  const arr = Array.from(values || []);
  if (arr.length === 0) return 0;
  return arr.reduce((p, v) => p + v, 0) / arr.length;
}
