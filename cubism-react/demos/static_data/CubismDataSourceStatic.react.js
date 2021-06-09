// @flow strict

import * as React from "react";
import Immutable from "immutable";

import QuantizableDateRecord from "../../dist/QuantizableDateRecord";
import type { DataUnbucketed, DataBucketed } from "../../dist/types";
import type { BucketFn, BucketFns } from "../../dist/bucketfns";
import type { DataType } from "../../dist/CubismDataContext";
import type { LayoutType } from "../../dist/CubismLayoutContext";

import CubismDataContext, { Data } from "../../dist/CubismDataContext";
import CubismLayoutContext, { Layout } from "../../dist/CubismLayoutContext";

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
