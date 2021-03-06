// @flow strict
import * as React from "react";
import Immutable from "immutable";
import dateformat from "dateformat";

import type { SamplesUnbucketed } from "./types";
import type { BucketFn } from "./bucketfns";
import QuantizableDateRecord from "./QuantizableDateRecord";
import CubismTimebars from "./CubismTimebars.react";

import * as css from "./cubism.module.scss";
import { DateQuantContext } from "./CubismDataDateQuantization.react";

type Props = {|
  quantizedDates: Immutable.List<QuantizableDateRecord>,
  hoverTime: ?QuantizableDateRecord,
  hover: ?number,
  width: number,
  height: number,
  scrollY: number,
|};

export default class CubismTimebar extends React.PureComponent<Props> {
  render(): React.Node {
    const { quantizedDates, hoverTime, hover, width, height, scrollY } =
      this.props;
    return (
      <div className={css.timebarContainer} style={{ height }}>
        <svg
          width={width}
          height={height}
          style={
            scrollY
              ? {
                  position: "absolute",
                  top: scrollY,
                }
              : null
          }
          className={css.timebar}
        >
          <g className="timebars">
            <DateQuantContext.Consumer>
              {({ quantizationLevel }) => (
                <CubismTimebars
                  quantizedDates={quantizedDates}
                  quantizationLevel={quantizationLevel}
                  width={width}
                />
              )}
            </DateQuantContext.Consumer>
          </g>
          {hoverTime ? (
            <text y={12} x={hover} fill="red" textAnchor="middle">
              {hoverTime.toISOString()}
            </text>
          ) : null}
        </svg>
      </div>
    );
  }
}
