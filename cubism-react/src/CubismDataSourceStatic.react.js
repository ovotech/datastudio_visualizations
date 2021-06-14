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
  data: Immutable.Map<
    string,
    Immutable.Map<QuantizableDateRecord, Immutable.List<number>>
  >,
  dataMin: number,
  dataMax: number,
  dateMin: QuantizableDateRecord,
  dateMax: QuantizableDateRecord,
|};

export default class CubismDataSourceStatic extends React.PureComponent<Props> {
  render(): React.Node {
    const { data, dataMin, dataMax, dateMin, dateMax } = this.props;

    const dataComputed = Data({
      data,
      dataMin,
      dataMax,
      dateMin,
      dateMax,
    });

    return (
      <CubismDataContext.Provider value={dataComputed}>
        {this.props.children}
      </CubismDataContext.Provider>
    );
  }
}
