// @flow strict
import * as React from "react";
import Immutable from "immutable";
import dateformat from "dateformat";

import QuantizableDateRecord from "./QuantizableDateRecord";

type Props = {|
  quantizedDates: Immutable.List<QuantizableDateRecord>,
  quantizationLevel: number,
  width: number,
|};

export default class CubismTimebars extends React.PureComponent<Props> {
  render(): React.Node {
    const { quantizedDates, quantizationLevel, width } = this.props;
    const dates = [];
    for (const [i, date] of Array.from(quantizedDates.reverse()).entries()) {
      let add = null;
      switch (quantizationLevel) {
        case QuantizableDateRecord.MsPerWeek:
        case QuantizableDateRecord.MsPerDay:
          add =
            date.get("day") == 1 && dateformat(date.toMillis(), "dd/mm", true);
          break;
        case QuantizableDateRecord.MsPerHour:
          add =
            date.get("hour") == 0 && dateformat(date.toMillis(), "dd/mm", true);
          break;
        case QuantizableDateRecord.MsPerMinute:
          if (date.get("minute") == 0) {
            add = dateformat(date.toMillis(), "HH:MM", true);
            if (date.get("hour") == 0) {
              add = dateformat(date.toMillis(), "dd/mm", true);
            }
          }
          break;
        case QuantizableDateRecord.MsPerSecond:
          if (date.get("second") == 0) {
            add = dateformat(date.toMillis(), "HH:MM", true);
            if (date.get("hour") == 0) {
              add = dateformat(date.toMillis(), "dd/mm", true);
            }
          }
          break;
      }
      if (add) {
        dates.push([width - i, add]);
      }
    }

    return dates.map(([i, date]) => (
      <g key={i}>
        <text
          key={i}
          y={30}
          x={i}
          textAnchor="middle"
          style={{ fontSize: "8px" }}
        >
          {date}
        </text>
        <line x1={i} y1={35} x2={i} y2={40} stroke="black" strokeWidth={1} />
      </g>
    ));
  }
}
