// @flow strict
import * as React from "react";

import type { SamplesUnbucketed } from "./types";
import type { BucketFn } from "./bucketfns";
import type QuantizableDateRecord from "./QuantizableDateRecord";

import * as css from "./cubism.module.scss";

type Props = {|
  children: React.Node,
  name: string,
  samples: SamplesUnbucketed,
  bucketFn: BucketFn,
  hover: ?number,
  hoverTime: ?QuantizableDateRecord,
  width: number,
  height: number,
  offsetX: number,
|};

export default class CubismGraphOverlay extends React.PureComponent<Props> {
  render(): React.Node {
    const {
      children,
      name,
      samples,
      bucketFn,
      hover,
      hoverTime,
      width,
      height,
      offsetX,
    } = this.props;
    return (
      <div className={css.cubismGraph} style={{ height: height + 1 }}>
        {children}
        <svg className={css.overlay} height={height} width={width}>
          <text y={20} x={offsetX}>
            {name}
          </text>
          <text y={20} x={width} textAnchor="end">
            {hoverTime ? bucketFn(samples.get(hoverTime)) : null}
          </text>
        </svg>
      </div>
    );
  }
}
