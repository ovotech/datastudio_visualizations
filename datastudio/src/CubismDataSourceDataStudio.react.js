// @flow strict

import * as React from "react";
import Immutable from "immutable";

import {
  subscribeToData,
  getWidth,
  getHeight,
  objectTransform,
} from "@google/dscc";

import QuantizableDateRecord from "cubism-react/dist/QuantizableDateRecord";
import type { DataUnbucketed, DataBucketed } from "cubism-react/dist/types";
import type { BucketFn, BucketFns } from "cubism-react/dist/bucketfns";
import type { DataType } from "cubism-react/dist/CubismDataContext";
import type { LayoutType } from "cubism-react/dist/CubismLayoutContext";

import CubismDataContext, { Data } from "cubism-react/dist/CubismDataContext";
import CubismLayoutContext, {
  Layout,
} from "cubism-react/dist/CubismLayoutContext";

type Props = {|
  children: React.Node,
|};

type State = {|
  unsubscribe?: ?() => void,
  rawData: any,
  dataComputed: DataType,
  layout: LayoutType,
|};

const WrapColors = Immutable.List([
  "#08519c",
  "#3182bd",
  "#6baed6",
  "#bdd7e7",
  "#bae4b3",
  "#74c476",
  "#31a354",
  "#006d2c",
]);
const WrapPositive = WrapColors.slice(4);
const WrapNegative = WrapColors.slice(0, 4).reverse();

export default class CubismDataSourceDataStudio extends React.PureComponent<
  Props,
  State
> {
  state: State = {
    rawData: null,
    dataComputed: Data(),
    layout: Layout(),
  };

  componentDidMount(): void {
    const unsubscribe = subscribeToData(this.dataCallback, {
      transform: objectTransform,
    });

    this.setState({ unsubscribe });
  }

  componentWillUnmount(): void {
    const { unsubscribe } = this.state;
    if (unsubscribe != null) {
      unsubscribe();
    }
  }

  render(): React.Node {
    const { rawData, dataComputed, layout } = this.state;

    return (
      <CubismLayoutContext.Provider value={layout}>
        <CubismDataContext.Provider value={dataComputed}>
          {this.props.children}
        </CubismDataContext.Provider>
      </CubismLayoutContext.Provider>
    );
  }

  dataCallback: (any) => void = (vizData: any) => {
    const data = vizData.tables.DEFAULT;
    let dataDim1Min = new QuantizableDateRecord(new Date());
    let dataDim1Max = new QuantizableDateRecord(new Date(0));
    let dataDim2Values = new Set();
    let dataMet1Min = Infinity;
    let dataMet1Max = 0;

    const dataByDim: DataUnbucketed = Immutable.Map().asMutable();

    for (const sample of data) {
      const dim1s = sample.dimension1[0];
      const dim1d = new QuantizableDateRecord(dim1s);
      // const dim1 = dim1d.toMillis();
      if (dim1d.lessThan(dataDim1Min)) {
        dataDim1Min = dim1d;
      }
      if (dim1d.greaterThan(dataDim1Max)) {
        dataDim1Max = dim1d;
      }

      const dim2 = sample.dimension2[0];
      dataDim2Values.add(dim2);

      if (!dataByDim.has(dim2)) {
        dataByDim.set(dim2, Immutable.Map().asMutable());
      }
      const data = dataByDim.get(dim2);
      if (data == null) continue; // Flow

      const met1 = parseFloat(sample.metric1[0]);
      if (met1 < dataMet1Min) {
        dataMet1Min = met1;
      }
      if (met1 > dataMet1Max) {
        dataMet1Max = met1;
      }

      if (data.has(dim1d)) {
        const dim = data.get(dim1d);
        if (dim == null) continue; // Flow
        dim.push(met1);
      } else {
        data.set(dim1d, Immutable.List([met1]).asMutable());
      }
    }

    const subsampleHeight = dataMet1Max / WrapPositive.size;
    const wraps = Immutable.Map().withMutations((wraps) => {
      for (let i = 0; i < WrapColors.size / 2; ++i) {
        wraps.set(subsampleHeight * i, WrapPositive.get(i));
      }
    });

    this.setState({
      rawData: vizData,
      dataComputed: Data({
        rawData: vizData,
        data: dataByDim,
        dataMin: dataMet1Min,
        dataMax: dataMet1Max,
        dateMin: dataDim1Min,
        dateMax: dataDim1Max,
      }),
      layout: Layout({
        width: getWidth(),
        height: getHeight(),
      }),
    });
  };
}
