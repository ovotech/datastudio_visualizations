// @flow strict
import React from "react";

import CubismGraph from "./CubismGraph.react";
import QuantizableDateRecord from "./QuantizableDateRecord";
import Immutable from "immutable";
import TimeseriesGenerator from "../demos/common/TimeseriesGenerator";
import { bucketFns } from "./bucketfns";

const dateMax = new QuantizableDateRecord(new Date());
const dateMin = dateMax.addMillis(-QuantizableDateRecord.MsPerDay);

const dates = Immutable.List(
  QuantizableDateRecord.genQuantizedDates(
    dateMin,
    dateMax,
    QuantizableDateRecord.MsPerMinute
  )
);

const series_generator = new TimeseriesGenerator(100, -100);

const data = Immutable.Map(
  dates.map((date, i) => [date, Immutable.List([series_generator.generate(i)])])
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

export default {
  title: "CubismGraph",
  component: CubismGraph,
  argTypes: {
    samples: { control: "disable" },
    quantizedDates: { control: "disable" },
    wraps: { control: "disable" },
    bucketFn: { control: "disable" },
  },
};

const Template = (args) => (
  <CubismGraph
    samples={data}
    quantizedDates={dates}
    wraps={wraps}
    subsampleHeight={25}
    bucketFn={bucketFns.sum}
    width={1440}
    height={30}
    {...args}
  />
);

export const Standard = Template.bind({});
Standard.args = {};

export const _60Px = Template.bind({});
_60Px.args = {
  height: 60,
};
