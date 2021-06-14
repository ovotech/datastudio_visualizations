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


type Props = {||};

type State = {|
  data: Immutable.OrderedMap<string, Immutable.OrderedMap<QuantizableDateRecord, Immutable.List<number>>>,
  series: Immutable.OrderedMap<string, { generate: (number) => number }>,
  dates: Immutable.List<QuantizableDateRecord>,
  dateMin: QuantizableDateRecord,
  dateMax: QuantizableDateRecord,
  dateOverlap: ?QuantizableDateRecord,
|}


class Wrapper extends React.Component<Props, State> {
  state: State = {
    data: Immutable.OrderedMap(),
    series: Immutable.OrderedMap(),
    dates: Immutable.List(),
    dateMin: new QuantizableDateRecord(),
    dateMax: new QuantizableDateRecord(),
    dateOverlap: null,
  }

  componentDidMount() {
    const dateMax = new QuantizableDateRecord(new Date());
    const dateMin = dateMax.addMillis(-(QuantizableDateRecord.MsPerSecond * 1440));
    
    const dates = Immutable.List(
      QuantizableDateRecord.genQuantizedDates(
        dateMin,
        dateMax,
        QuantizableDateRecord.MsPerSecond
      )
    );
    
    const series = Immutable.OrderedMap({
      PRN1: new TimeseriesGenerator(100, -100),
      PRN2: { generate: (i) => Math.sin(i / 100) * 100 },
      PRN3: new TimeseriesGenerator(100, -100),
      PRN4: { generate: (i) => Math.sin(i / 100) * 100 },
      PRN5: new TimeseriesGenerator(100, -100),
      PRN6: { generate: (i) => Math.sin(i / 100) * 100 },
      ASH1: new TimeseriesGenerator(100, -100),
      ASH2: { generate: (i) => Math.sin(i / 100) * 100 },
      ASH3: new TimeseriesGenerator(100, -100),
      ASH4: { generate: (i) => Math.sin(i / 100) * 100 },
      ASH5: new TimeseriesGenerator(100, -100),
      ASH6: { generate: (i) => Math.sin(i / 100) * 100 },
      LLA1: new TimeseriesGenerator(100, -100),
      LLA2: { generate: (i) => Math.sin(i / 100) * 100 },
      LLA3: new TimeseriesGenerator(100, -100),
      LLA4: { generate: (i) => Math.sin(i / 100) * 100 },
      LLA5: new TimeseriesGenerator(100, -100),
      LLA6: { generate: (i) => Math.sin(i / 100) * 100 },
      AGP1: new TimeseriesGenerator(100, -100),
      AGP2: { generate: (i) => Math.sin(i / 100) * 100 },
      AGP3: new TimeseriesGenerator(100, -100),
      AGP4: { generate: (i) => Math.sin(i / 100) * 100 },
      AGP5: new TimeseriesGenerator(100, -100),
      AGP6: { generate: (i) => Math.sin(i / 100) * 100 },
      PLA1: new TimeseriesGenerator(100, -100),
      PLA2: { generate: (i) => Math.sin(i / 100) * 100 },
      PLA3: new TimeseriesGenerator(100, -100),
      PLA4: { generate: (i) => Math.sin(i / 100) * 100 },
      PLA5: new TimeseriesGenerator(100, -100),
      PLA6: { generate: (i) => Math.sin(i / 100) * 100 },
    });
    
    const data = series.map((gen) =>
      Immutable.OrderedMap(
        dates.map((date, i) => [date, Immutable.List([gen.generate(date.toMillis(6) / 1000)])])
      )
    );
    this.setState({data, series, dates, dateMin, dateMax});

    setInterval(this.updateData, 1000);
  }

  updateData = () => {
    const {series} = this.state;
    const {data, dates, dateMin, dateMax} = this.state;

    const newDateMax = dateMax.addMillis(QuantizableDateRecord.MsPerSecond);
    const newDateMin = dateMin.addMillis(QuantizableDateRecord.MsPerSecond);

    const newData = series.map((gen, key) => 
      data.get(key, Immutable.OrderedMap())
      .set(
        newDateMax,
        Immutable.List([gen.generate(newDateMax.toMillis(6) / 1000)])
      ).remove(dateMin)
    );

    const newDates = dates.slice(1).push(newDateMax);

    this.setState({data: newData, dates: newDates, dateMin: newDateMin, dateMax: newDateMax, dateOverlap: dateMax});
  }

  render() {
    const {data, dates, dateMin, dateMax, dateOverlap} = this.state;
    return (
      <CubismSettings bucketFn="average">
        <CubismLayoutStatic width={1440} height={1440}>
          <CubismDataSourceStatic
            data={data}
            dataMin={0}
            dataMax={100}
            dates={dates}
            dateMin={dateMin}
            dateMax={dateMax}
            dateOverlap={dateOverlap}
          >
            <CubismApp />
          </CubismDataSourceStatic>
        </CubismLayoutStatic>
      </CubismSettings>
    )
  }
}

const containerDiv = document.createElement("div");
containerDiv.id = "cubismContainerDiv";
ReactDOM.render(
  <Wrapper />,
  containerDiv
);
Modal.setAppElement(containerDiv);
// Force cast of document.body via any. Yay Flow.
((document.body: any): HTMLBodyElement).appendChild(containerDiv);
