// @flow strict

import * as React from "react";
import Modal from "react-modal";
import { CopyToClipboard } from "react-copy-to-clipboard";

import QuantizableDateRecord from "./QuantizableDateRecord";

import type { BucketFns } from "./bucketfns";
import type Immutable from "immutable";
import type { DataUnbucketed } from "./types";
import type {
  CombinedType,
  CombinedContextType,
} from "./CubismCombinedContext.react";
import { CombinedContext } from "./CubismCombinedContext.react";
import { WrapsContext } from "./CubismWraps.react";
import { DateQuantContext } from "./CubismDataDateQuantization.react";

import * as css from "./cubism.module.scss";

type Props = {||};

type State = {|
  dataModalOpen: boolean,
|};

function QuantizedDateLevel(props: { quantizationLevel: number }): React.Node {
  switch (props.quantizationLevel) {
    case QuantizableDateRecord.MsPerWeek:
      return "Week";
    case QuantizableDateRecord.MsPerDay:
      return "Day";
    case QuantizableDateRecord.MsPerHour:
      return "Hour";
    case QuantizableDateRecord.MsPerMinute:
      return "Minute";
    case QuantizableDateRecord.MsPerSecond:
      return "Second";
    default:
      return "Unknown";
  }
}

export default class CubismDebug extends React.PureComponent<Props, State> {
  static contextType: CombinedContextType = CombinedContext;
  context: CombinedType;

  state: State = {
    dataModalOpen: false,
  };

  render(): React.Node {
    const {
      data: { dates, rawData },
      wraps: { wraps, subsampleHeight },
    } = this.context;
    const { dataModalOpen } = this.state;
    const dataText = dataModalOpen ? JSON.stringify(rawData, null, 2) : null;
    return (
      <DateQuantContext.Consumer>
        {({ quantizationLevel }) => (
          <div className={css.cubismDebug}>
            Debug: <br />
            <button onClick={this.dataModalOpen}>Show Data</button>
            <br />
            Dates: {dates.size}
            <br />
            Min date:{" "}
            {dates
              .slice(0, 1)
              .map((v) => v.toString())
              .get(0)}
            <br />
            Max date:{" "}
            {dates
              .slice(-1)
              .map((v) => v.toString())
              .get(0)}
            <br />
            Level: <QuantizedDateLevel quantizationLevel={quantizationLevel} />
            <Modal
              isOpen={this.state.dataModalOpen}
              onRequestClose={this.dataModalClose}
              contentLabel="Raw Data"
            >
              <CopyToClipboard text={dataText}>
                <button>Copy to Clipboard</button>
              </CopyToClipboard>
              <pre>{dataText}</pre>
            </Modal>
          </div>
        )}
      </DateQuantContext.Consumer>
    );
  }

  dataModalOpen: () => void = () => {
    this.setState({ dataModalOpen: true });
  };

  dataModalClose: () => void = () => {
    this.setState({ dataModalOpen: false });
  };
}
