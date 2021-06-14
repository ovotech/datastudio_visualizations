// @flow strict

import * as React from "react";
import Immutable from "immutable";

import QuantizableDateRecord from "./QuantizableDateRecord";
import type { DataUnbucketed, DataBucketed } from "./types";
import type { BucketFn, BucketFns } from "./bucketfns";
import type { DataType } from "./CubismDataContext";
import type { LayoutType } from "./CubismLayoutContext";

import CubismDataContext, { Data } from "./CubismDataContext";
import CubismLayoutContext, { Layout } from "./CubismLayoutContext";

type Props = {|
  children: React.Node,
  data: Immutable.OrderedMap<
    string,
    Immutable.OrderedMap<QuantizableDateRecord, Immutable.List<number>>
  >,
  dataMin: number,
  dataMax: number,
  dates: Immutable.List<QuantizableDateRecord>,
  dateMin: QuantizableDateRecord,
  dateMax: QuantizableDateRecord,
  dateOverlap: ?QuantizableDateRecord,
|};

type DefaultProps = {|
  dates: Immutable.List<QuantizableDateRecord>,
  dateOverlap: ?QuantizableDateRecord,
|}

export default class CubismDataSourceStatic extends React.PureComponent<Props> {
  static defaultProps: DefaultProps = {
    dates: Immutable.List(),
    dateOverlap: null,
  };

  render(): React.Node {
    const { data, dataMin, dataMax, dates, dateMin, dateMax, dateOverlap } = this.props;

    const dataComputed = Data({
      data,
      dataMin,
      dataMax,
      dates,
      dateMin,
      dateMax,
      dateOverlap,
    });

    return (
      <CubismDataContext.Provider value={dataComputed}>
        {this.props.children}
      </CubismDataContext.Provider>
    );
  }
}
