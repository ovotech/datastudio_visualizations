// @flow strict

import * as React from "react";

import CubismContainerOverlay from "./CubismContainerOverlay.react";
import CubismGraph from "./CubismGraph.react";
import CubismGraphOverlay from "./CubismGraphOverlay.react";
import CubismTimebar from "./CubismTimebar.react";

import type { ReactObjectRef, DataUnbucketed } from "./types";
import type { BucketFn } from "./bucketfns";
import type QuantizableDateRecord from "./QuantizableDateRecord";
import Immutable from "immutable";
import type { OnHover } from "./CubismContainerOverlay.react";
import type {
  CombinedType,
  CombinedContextType,
} from "./CubismCombinedContext.react";
import { CombinedContext } from "./CubismCombinedContext.react";
import { bucketFns } from "./bucketfns";

import * as css from "./cubism.module.scss";
import CubismWraps, { WrapsContext } from "./CubismWraps.react";
import { SettingsContext } from "./CubismSettings.react";

type Props = {|
  width: number,
  scrollY: number,
  debug?: ?React.Node,
|};

type State = {|
  hover: ?number,
  hoverTime: ?QuantizableDateRecord,
  offsetX: number,
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

export default class CubismContainer extends React.PureComponent<Props, State> {
  static contextType: CombinedContextType = CombinedContext;
  context: CombinedType;

  state: State = {
    hover: null,
    hoverTime: null,
    offsetX: 0,
  };

  containerRef: ReactObjectRef<"div"> = React.createRef();

  componentDidUpdate() {
    const container = this.containerRef.current;
    if (container == null) return;
    const offsetX = Math.abs(container.offsetLeft);
    if (offsetX != this.state.offsetX) {
      this.setState({
        offsetX,
      });
    }
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  render(): React.Node {
    const {
      data: { data, dataMin, dataMax, dates: quantizedDates, dateOverlap },
      settings: { bucketFn, graphHeight, timebarHeight },
      wraps: { wraps, subsampleHeight },
    } = this.context;
    const { width, scrollY, debug } = this.props;

    const { hover, hoverTime, offsetX } = this.state;

    return (
      <div className={css.cubismContainer} ref={this.containerRef}>
        <CubismTimebar
          quantizedDates={quantizedDates}
          hoverTime={hoverTime}
          hover={hover}
          width={width}
          height={timebarHeight}
          scrollY={scrollY}
        />
        {data.toArray().map(([name, samples]) => (
          <CubismGraphOverlay
            key={name}
            name={name}
            samples={samples}
            bucketFn={bucketFns[bucketFn]}
            hover={hover}
            hoverTime={hoverTime}
            width={width}
            height={graphHeight}
            offsetX={offsetX}
          >
            <CubismGraph
              samples={samples}
              quantizedDates={quantizedDates}
              wraps={wraps}
              subsampleHeight={subsampleHeight}
              bucketFn={bucketFns[bucketFn]}
              width={width}
              height={graphHeight}
              dateOverlap={dateOverlap}
            />
          </CubismGraphOverlay>
        ))}
        {debug ? <div style={{ paddingLeft: offsetX }}>{debug}</div> : null}
        <CubismContainerOverlay
          graphCount={data.size}
          quantizedDates={quantizedDates}
          width={width}
          onHover={this.onHover}
          offsetX={offsetX}
        />
      </div>
    );
  }

  onHover: OnHover = (hover: ?number, hoverTime: ?QuantizableDateRecord) => {
    this.setState({
      hover,
      hoverTime,
    });
  };
}
