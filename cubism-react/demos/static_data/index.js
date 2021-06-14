// @flow strict

import Immutable from "immutable";
import ReactDOM from "react-dom";
import React from "react";
import CubismApp from "../../dist/CubismApp.react";
import Modal from "react-modal";
import CubismDataDateQuantization from "../../dist/CubismDataDateQuantization.react";
import CubismDataSourceStatic from "../../dist/CubismDataSourceStatic.react";
import CubismLayoutStatic from "../../dist/CubismLayoutStatic.react";
import QuantizableDateRecord from "../../dist/QuantizableDateRecord";
import CubismSettings from "../../dist/CubismSettings.react";
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

const series = Immutable.Map({
  PRN1: new TimeseriesGenerator(100, -100),
  PRN2: { generate: (i) => Math.sin(i / 100) * 100 },
});

const data = series.map((gen) =>
  Immutable.Map(
    dates.map((date, i) => [date, Immutable.List([gen.generate(i)])])
  )
);

const containerDiv = document.createElement("div");
containerDiv.id = "cubismContainerDiv";
ReactDOM.render(
  <CubismSettings bucketFn="average">
    <CubismLayoutStatic width={1440} height={1440}>
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
  containerDiv
);
Modal.setAppElement(containerDiv);
// Force cast of document.body via any. Yay Flow.
((document.body: any): HTMLBodyElement).appendChild(containerDiv);
