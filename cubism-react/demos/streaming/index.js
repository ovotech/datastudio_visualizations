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


type Props = {||}
type State = {|
  data: Immutable.Map<string, Immutable.Map<QuantizableDateRecord, Immutable.List<number>>>,
  series: Immutable.Map<string, { generate: (number) => number }>,
  dateMin: QuantizableDateRecord,
  dateMax: QuantizableDateRecord,
|}


class Wrapper extends React.Component<Props, State> {
  state = {
    data: Immutable.Map(),
    series: Immutable.Map(),
    dateMin: new QuantizableDateRecord(),
    dateMax: new QuantizableDateRecord(),
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
    
    const series = Immutable.Map({
      PRN1: new TimeseriesGenerator(100, -100),
      PRN2: { generate: (i) => Math.sin(i / 100) * 100 },
    });
    
    const data = series.map((gen) =>
      Immutable.Map(
        dates.map((date, i) => [date, Immutable.List([gen.generate(date.toMillis(6) / 1000)])])
      )
    );
    this.setState({data, series, dateMin, dateMax});

    setInterval(this.updateData, 1000);
  }

  updateData = () => {
    const {series} = this.state;
    let {data, dateMax} = this.state;

    dateMax = dateMax.addMillis(QuantizableDateRecord.MsPerSecond);

    for (const [name, gen] of series.entries()) {
      let timeseries = data.get(name);
      if (timeseries) {
        timeseries = timeseries.set(dateMax, Immutable.List([gen.generate(dateMax.toMillis(6) / 1000)]));
        data = data.set(name, timeseries);
      }
    }

    this.setState({data, dateMax})
  }

  render() {
    const {data, dateMin, dateMax} = this.state;
    return (
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
              quantizationLevel={QuantizableDateRecord.MsPerSecond}
            >
              <CubismApp />
            </CubismDataDateQuantization>
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
