// @flow strict

import * as React from "react";
import Immutable from "immutable";

import type { RecordOf, RecordFactory } from "immutable";
import type { DataContextType, DataType } from "./CubismDataContext";
import DataContext from "./CubismDataContext";

// Context

export type WrapsProps = {|
  wraps: Immutable.Map<number, string>,
  subsampleHeight: number,
|};

export type WrapsType = RecordOf<WrapsProps>;

export const Wraps: RecordFactory<WrapsProps> = Immutable.Record({
  wraps: Immutable.Map(),
  subsampleHeight: 0,
});

export type WrapsContextType = React.Context<WrapsType>;

export const WrapsContext: WrapsContextType = React.createContext(Wraps());

WrapsContext.displayName = "WrapsContext";

// Component

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

type Props = {|
  children: React.Node,
|};

export default class CubismWraps extends React.PureComponent<Props> {
  static contextType: DataContextType = DataContext;
  context: DataType;

  render(): React.Node {
    const { dataMax } = this.context;

    const subsampleHeight = dataMax / WrapPositive.size;
    const wraps = Immutable.Map().withMutations((wraps) => {
      for (let i = 0; i < WrapColors.size / 2; ++i) {
        wraps.set(subsampleHeight * (i + 1), WrapPositive.get(i));
        wraps.set(-(subsampleHeight * (i + 1)), WrapNegative.get(i));
      }
    });

    const value = Wraps({
      wraps,
      subsampleHeight,
    });

    return (
      <WrapsContext.Provider value={value}>
        {this.props.children}
      </WrapsContext.Provider>
    );
  }
}
