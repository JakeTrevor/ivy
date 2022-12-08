import React from "react";
import ReactDOM from "react-dom/client";
import Axis from "./lib/Chart/Axis";
import Chart from "./lib/Chart/Chart";
import Line from "./lib/Chart/Line";

function App() {
  let quadratic: Point[] = [...Array(20).keys()].map((e, i) => [i, i ** 2]);

  let linear: Point[] = [...Array(20).keys()].map((e, i) => [i, i * 2]);

  return (
    <div>
      <h1>Example:</h1>
      <Chart width={400} height={200} axisSize={30}>
        <Axis
          direction="h"
          auto="lin"
          title=""
          tickStep={2}
          label_transform=""
          gridlines
          gridline_stroke="pink"
        />
        <Axis direction="v" auto="lin" title=" " tickStep={40} gridlines />
        <Line points={quadratic} series="quadratic" />
        <Line points={linear} series="linear" stroke="blue" />
      </Chart>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
