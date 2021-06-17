import * as React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import {
  afterEach,
  beforeEach,
  beforeAll,
  describe,
  expect,
  it,
  test,
  jest,
} from "@jest/globals";
import Immutable from "immutable";

import { beautify_html, canvas_image } from "./__common__/common"

import CubismGraph from "../CubismGraph.react";
import { bucketFns } from "../bucketfns";
import QuantizableDateRecord from "../QuantizableDateRecord";

const dateMax = new QuantizableDateRecord(1623657027068);
const dateMin = dateMax.addMillis(-QuantizableDateRecord.MsPerDay);

const dates = Immutable.List(
  QuantizableDateRecord.genQuantizedDates(
    dateMin,
    dateMax,
    QuantizableDateRecord.MsPerMinute
  )
);

const gen = { generate: (i) => Math.sin(i / 100) * 100 };

const data = Immutable.Map(
  dates.map((date, i) => [date, Immutable.List([gen.generate(i)])])
);

const wraps = Immutable.Map([
  [-25, "#bdd7e7"],
  [-50, "#6baed6"],
  [-75, "#3182bd"],
  [-100, "#08519c"],
  [25, "#bae4b3"],
  [50, "#74c476"],
  [75, "#31a354"],
  [100, "#006d2c"],
]);

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  document.body.removeChild(container);
  container = null;
});

describe("CubismGraph", () => {
  it("renders correctly", () => {
    act(() => {
      render(
        <CubismGraph
          samples={data}
          quantizedDates={dates}
          wraps={wraps}
          subsampleHeight={25}
          bucketFn={bucketFns.sum}
          width={1440}
          height={30}
        />,
        container
      );
    });

    expect(beautify_html(container.innerHTML)).toMatchSnapshot();
  });

  it("draws horizon charts correctly", () => {
    act(() => {
      render(
        <CubismGraph
          samples={data}
          quantizedDates={dates}
          wraps={wraps}
          subsampleHeight={25}
          bucketFn={bucketFns.sum}
          width={1440}
          height={30}
        />,
        container
      );
    });

    expect(canvas_image(container.children[0])).toMatchImageSnapshot();
  });

});
