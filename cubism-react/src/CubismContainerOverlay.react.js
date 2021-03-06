// @flow strict

import * as React from "react";

import CubismGraph from "./CubismGraph.react";
import CubismGraphOverlay from "./CubismGraphOverlay.react";
import CubismTimebar from "./CubismTimebar.react";
import { bucketFns } from "./bucketfns";

import type { DataUnbucketed } from "./types";
import type { BucketFn } from "./bucketfns";
import type QuantizableDateRecord from "./QuantizableDateRecord";
import type Immutable from "immutable";

import * as css from "./cubism.module.scss";

type OnMouseEvent = (event: MouseEvent) => void;
export type OnHover = (?number, ?QuantizableDateRecord) => void;

type Props = {|
  graphCount: number,
  width: number,
  quantizedDates: Immutable.List<QuantizableDateRecord>,
  onHover: OnHover,
  offsetX: number,
|};

type State = {|
  hover: ?number,
  hoverTime: ?QuantizableDateRecord,
|};

export default class CubismContainer extends React.PureComponent<Props, State> {
  state: State = {
    hover: null,
    hoverTime: null,
  };

  render(): React.Node {
    const { graphCount, quantizedDates, width } = this.props;

    const { hover, hoverTime } = this.state;

    const height = graphCount * 31 + 40;

    return (
      <svg
        className={css.overlay}
        width={width}
        height={height}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onMouseMove={this.onMouseMove}
      >
        <line
          x1={hover == null ? -1 : hover}
          y1={0}
          x2={hover == null ? -1 : hover}
          y2={height}
          stroke="black"
          strokeWidth="1"
          fill="black"
          style={{
            stroke: "1px black",
          }}
        />
      </svg>
    );
  }

  onMouseOver: OnMouseEvent = (event: MouseEvent) => {
    const { quantizedDates, width, onHover, offsetX } = this.props;
    const hover = event.clientX + offsetX;
    const hoverTime = quantizedDates.reverse().get(width - hover);
    this.setState({
      hover,
      hoverTime,
    });
    onHover(hover, hoverTime);
  };

  onMouseOut: OnMouseEvent = (event: MouseEvent) => {
    const { onHover } = this.props;
    this.setState({
      hover: null,
      hoverTime: null,
    });
    onHover(null, null);
  };

  onMouseMove: OnMouseEvent = (event: MouseEvent) => {
    const { quantizedDates, width, onHover, offsetX } = this.props;
    const hover = event.clientX + offsetX;
    const hoverTime = quantizedDates.reverse().get(width - hover);
    this.setState({
      hover,
      hoverTime,
    });
    onHover(hover, hoverTime);
  };
}
