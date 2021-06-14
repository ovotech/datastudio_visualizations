// @flow strict

import * as React from "react";

import type Immutable from "immutable";

import type QuantizableDateRecord from "./QuantizableDateRecord";

export type ReactObjectRef<T: React.ElementType> = {|
  current: null | React.ElementRef<T>,
|};

export type SamplesUnbucketed = Immutable.OrderedMap<
  QuantizableDateRecord,
  Immutable.List<number>
>;
export type SamplesBucketed = Immutable.OrderedMap<QuantizableDateRecord, number>;

export type DataUnbucketed = Immutable.OrderedMap<string, SamplesUnbucketed>;
export type DataBucketed = Immutable.OrderedMap<string, SamplesBucketed>;
