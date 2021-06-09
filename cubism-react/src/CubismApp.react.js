// @flow strict

import * as React from "react";

import CubismWraps from "./CubismWraps.react";
import CubismController from "./CubismController.react";
import CubismCombined from "./CubismCombinedContext.react";

type Props = {||};

export default class CubismApp extends React.PureComponent<Props> {
  render(): React.Node {
    return (
      <CubismWraps>
        <CubismCombined>
          <CubismController />
        </CubismCombined>
      </CubismWraps>
    );
  }
}
