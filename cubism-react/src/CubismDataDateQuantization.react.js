// @flow strict
import * as React from "react";
import Immutable from "immutable";

import type { RecordOf, RecordFactory } from "immutable";
import DataContext, { Data } from "./CubismDataContext";
import LayoutContext from "./CubismLayoutContext";

import type { DataType, DataContextType } from "./CubismDataContext";
import type { LayoutType } from "./CubismLayoutContext";

import QuantizableDateRecord from "./QuantizableDateRecord";

// Context

export type DateQuantProps = {|
  quantizationLevel: number,
|};

export type DateQuantType = RecordOf<DateQuantProps>;

export const DateQuant: RecordFactory<DateQuantProps> = Immutable.Record({
  quantizationLevel: 0,
});

export type DateQuantContextType = React.Context<DateQuantType>;

export const DateQuantContext: DateQuantContextType = React.createContext(
  DateQuant()
);

DateQuantContext.displayName = "DateQuantContext";

// Component

type Props = {
  quantizationLevel?: ?number,
  children: React.Node,
};

export default class CubismDataDateQuantization extends React.PureComponent<Props> {
  static contextType: DataContextType = DataContext;
  context: DataType;

  render(): React.Node {
    const { data, dataMin, dataMax, dates, dateMin, dateMax, rawData, dateOverlap } =
      this.context;

    const { quantizationLevel, children } = this.props;

    return (
      <LayoutContext.Consumer>
        {(layout) => {
          const width = layout.width;

          const detectedQuantizationLevel =
            quantizationLevel != null
              ? quantizationLevel
              : QuantizableDateRecord.detectLevel(dateMin, dateMax, width);

          const quantizedDates = Immutable.OrderedSet(
            QuantizableDateRecord.genQuantizedDates(
              dateMin,
              dateMax.addMillis(1000),
              detectedQuantizationLevel
            )
          );

          const quantizedData = data.map((data) =>
            Immutable.OrderedMap().withMutations((output) => {
              for (const [unquantizedDate, samples] of data.entries()) {
                const quantizedDate = QuantizableDateRecord.quantize(
                  unquantizedDate,
                  detectedQuantizationLevel
                );
                if (!quantizedDates.has(quantizedDate)) {
                  console.warn("Invalid date");
                }
                const existing = output.get(quantizedDate) || [];
                output.set(quantizedDate, samples.concat(existing));
              }
            })
          );

          const value = Data({
            data: quantizedData,
            dataMin,
            dataMax,
            dates: quantizedDates.toList(),
            dateMin,
            dateMax,
            rawData,
            dateOverlap,
          });

          const dateQuantValue = DateQuant({
            quantizationLevel: detectedQuantizationLevel,
          });

          return (
            <DataContext.Provider value={value}>
              <DateQuantContext.Provider value={dateQuantValue}>
                {children}
              </DateQuantContext.Provider>
            </DataContext.Provider>
          );
        }}
      </LayoutContext.Consumer>
    );
  }
}
