// @flow strict
import * as React from "react";
import Immutable from "immutable";

import type { ReactObjectRef, SamplesUnbucketed } from "./types";
import type { BucketFn } from "./bucketfns";
import type QuantizableDateRecord from "./QuantizableDateRecord";

type Props = {|
  samples: SamplesUnbucketed,
  quantizedDates: Immutable.List<QuantizableDateRecord>,
  wraps: Immutable.Map<number, string>,
  subsampleHeight: number,
  bucketFn: BucketFn,
  width: number,
  height: number,
  dateOverlap: ?QuantizableDateRecord,
|};

type DefaultProps = {|
  dateOverlap: ?QuantizableDateRecord,
|}

type State = {|
  initialRenderDone: boolean,
|};

export default class CubismGraph extends React.PureComponent<Props, State> {
  static defaultProps: DefaultProps = {
    dateOverlap: null,
  };
  state: State = {
    initialRenderDone: false,
  };

  canvasRef: ReactObjectRef<"canvas"> = React.createRef();

  componentDidUpdate(prevProps: Props): void {
    const canvas = this.canvasRef.current;
    if (canvas == null) return;

    const {
      samples,
      quantizedDates,
      wraps,
      subsampleHeight,
      bucketFn,
      width,
      height,
      dateOverlap,
    } = this.props;

    if (!(quantizedDates.size && samples.size)) return;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    if (!this.state.initialRenderDone) {
      ctx.fillRect(0, 0, width, height);
    }

    let overlap = 0;
    let shift = 0;
    if (dateOverlap == null) {
      overlap = quantizedDates.size;
      shift = quantizedDates.size;
    } else {
      const lastPrevDate = prevProps.quantizedDates.get(-1);
      for (const qd of quantizedDates.reverse()) {
        if (lastPrevDate && lastPrevDate.lessThan(qd)) {
          shift ++;
        }
        if (dateOverlap.lessThan(qd)) {
          overlap ++;
        } else {
          break;
        }
      }
    }

    ctx.drawImage(canvas, 0, 0, width, height, -shift, 0, width, height);

    let pixel = width;
    for (const qd of quantizedDates.reverse()) {
      if (dateOverlap && !dateOverlap.lessThan(qd)) break;
      const sampleValues = samples.get(qd);
      if (sampleValues == null) {
        pixel--;
        continue;
      }
      const sample = bucketFn(sampleValues.toArray());

      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.moveTo(pixel, height);
      ctx.lineTo(pixel, 0);
      ctx.stroke();

      for (const [max, color] of wraps.entries()) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        if (max > 0) {
          ctx.moveTo(pixel, height);
          if (sample > max) {
            ctx.lineTo(pixel, 0);
            ctx.stroke();
          } else if (sample > 0) {
            const subsample = max - sample;
            ctx.lineTo(pixel, height * (subsample / subsampleHeight));
            ctx.stroke();
            break;
          }
        } else {
          ctx.moveTo(pixel, 0);
          if (sample < max) {
            ctx.lineTo(pixel, height);
            ctx.stroke();
          } else if (sample < 0) {
            const subsample = Math.abs(max - sample);
            ctx.lineTo(pixel, height - height * (subsample / subsampleHeight));
            ctx.stroke();
            break;
          }
        }
      }
      pixel--;
      if (pixel < 0) break;
    }
    this.setState({
      initialRenderDone: true,
    });
  }

  componentDidMount(): void {
    // componentDidUpdate is not called after the initial render, force it.
    this.componentDidUpdate(this.props);
  }

  render(): React.Node {
    const { width, height } = this.props;
    return <canvas width={width} height={height} ref={this.canvasRef} />;
  }
}
