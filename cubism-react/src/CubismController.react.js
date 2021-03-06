// @flow strict

import * as React from "react";
import Immutable from "immutable";

import CubismContainer from "./CubismContainer.react";
import QuantizableDateRecord from "./QuantizableDateRecord";
import { bucketFns } from "./bucketfns";
import type { BucketFn, BucketFns } from "./bucketfns";

import * as css from "./cubism.module.scss";
import CubismDebug from "./CubismDebug.react";
import CubismDataContext, { Data } from "./CubismDataContext";
import CubismLayoutContext from "./CubismLayoutContext";
import type {
  CombinedType,
  CombinedContextType,
} from "./CubismCombinedContext.react";
import CubismCombined, { CombinedContext } from "./CubismCombinedContext.react";

type Props = {||};

type State = {|
  scrollY: number,
|};

export default class CubismController extends React.PureComponent<
  Props,
  State
> {
  static contextType: CombinedContextType = CombinedContext;
  context: CombinedType;

  state: State = {
    scrollY: 0,
  };

  render(): React.Node {
    const {
      layout: { width, height },
    } = this.context;
    const { scrollY } = this.state;

    const debug =
      process.env.NODE_ENV === "production" ? null : <CubismDebug />;

    return (
      <div
        className={css.cubismControllerScroll}
        style={{ width, height }}
        onScroll={this.onScroll}
      >
        <div className={css.cubismController}>
          <CubismContainer width={width} scrollY={scrollY} debug={debug} />
        </div>
      </div>
    );
  }

  onScroll: (MouseEvent) => void = (event: MouseEvent) => {
    this.setState({
      scrollY: ((event.currentTarget: any): HTMLDivElement).scrollTop,
    });
  };
}
