import React from "react";
import LineChart from "./Charts/LineChart";
import TimeSeries from "./Charts/TimeSeries";
import Histogram from "./Charts/Histogram";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="section">
          <TimeSeries width={700} height={500} />
        </div>

        <div className="section">
          <LineChart width={700} height={500} />
        </div>

        <div className="section">
          <Histogram width={700} height={500} />
        </div>
      </div>
    </div>
  );
}

export default App;
