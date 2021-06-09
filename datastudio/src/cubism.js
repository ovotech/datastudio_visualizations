// @flow strict

import ReactDOM from "react-dom";
import React from "react";
import CubismApp from "cubism-react/dist/CubismApp.react";
import Modal from "react-modal";
import "cubism-react/dist/cubism.module.css";
import CubismDataSourceDataStudio from "./CubismDataSourceDataStudio.react";
import CubismDataDateQuantization from "cubism-react/dist/CubismDataDateQuantization.react";
import QuantizableDateRecord from "cubism-react/dist/QuantizableDateRecord";
import CubismSettings from "cubism-react/dist/CubismSettings.react";

const containerDiv = document.createElement("div");
containerDiv.id = "cubismContainerDiv";
ReactDOM.render(
  <CubismSettings bucketFn="sum">
    <CubismDataSourceDataStudio>
      <CubismDataDateQuantization>
        <CubismApp />
      </CubismDataDateQuantization>
    </CubismDataSourceDataStudio>
  </CubismSettings>,
  containerDiv
);
Modal.setAppElement(containerDiv);
// Force cast of document.body via any. Yay Flow.
((document.body: any): HTMLBodyElement).appendChild(containerDiv);
