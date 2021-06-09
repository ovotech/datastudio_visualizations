import * as React from "react";

import CubismLayoutContext, { Layout } from "./CubismLayoutContext";

type Props = {|
  width: number,
  height: number,
  children: React.Node,
|};

export default function CubismLayoutStatic(props: Props) {
  const { children, ...layout } = props;
  return (
    <CubismLayoutContext.Provider value={Layout(layout)}>
      {children}
    </CubismLayoutContext.Provider>
  );
}
