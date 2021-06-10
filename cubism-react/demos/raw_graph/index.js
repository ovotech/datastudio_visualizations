// @flow strict

import Immutable from "immutable";
import ReactDOM from "react-dom";
import React from "react";
import CubismGraph from "../../dist/CubismGraph.react";
import { bucketFns } from "../../dist/bucketfns";
import QuantizableDateRecord from "../../dist/QuantizableDateRecord";
import TimeseriesGenerator from "../common/TimeseriesGenerator";

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

const data = Immutable.OrderedMap(
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

const containerDiv = document.createElement("div");
containerDiv.id = "cubismContainerDiv";
ReactDOM.render(
  <CubismGraph
    samples={data}
    quantizedDates={dates}
    wraps={wraps}
    subsampleHeight={25}
    bucketFn={bucketFns.sum}
    width={1440}
    height={30}
  />,
  containerDiv
);

// Force cast of document.body via any. Yay Flow.
((document.body: any): HTMLBodyElement).appendChild(containerDiv);
