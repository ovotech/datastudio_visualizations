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

import { beautify_html } from "./__common__/common"

import CubismApp from "../CubismApp.react";
import CubismDataDateQuantization from "../CubismDataDateQuantization.react";
import CubismLayoutStatic from "../CubismLayoutStatic.react";
import QuantizableDateRecord from "../QuantizableDateRecord";
import CubismSettings from "../CubismSettings.react";
import CubismDataSourceStatic from "../CubismDataSourceStatic.react";

const dateMax = new QuantizableDateRecord(1623657027068);
const dateMin = dateMax.addMillis(-QuantizableDateRecord.MsPerDay);

const dates = Immutable.List(
  QuantizableDateRecord.genQuantizedDates(
    dateMin,
    dateMax,
    QuantizableDateRecord.MsPerMinute
  )
);

const series = Immutable.Map([
  ["PRN1", { generate: (i) => Math.sin(i / 100) * 100 }],
  ["PRN2", { generate: (i) => Math.sin(i / 100) * 100 }],
]);

const data = series.map(gen =>
  Immutable.Map(
    dates.map((date, i) => [date, Immutable.List([gen.generate(i)])])
  )
);

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

describe("CubismApp", () => {
  it("renders correctly", () => {
    act(() => {
      render(
        <CubismSettings bucketFn="average">
          <CubismLayoutStatic width={1440} height={90}>
            <CubismDataSourceStatic
              data={data}
              dataMin={0}
              dataMax={100}
              dateMin={dateMin}
              dateMax={dateMax}
            >
              <CubismDataDateQuantization
                quantizationLevel={QuantizableDateRecord.MsPerMinute}
              >
                <CubismApp />
              </CubismDataDateQuantization>
            </CubismDataSourceStatic>
          </CubismLayoutStatic>
        </CubismSettings>,
        container
      );
    })
  
    expect(beautify_html(container.innerHTML)).toMatchSnapshot();
  });
});
