import React from "react";
import ReactDOM from "react-dom/client";
import Axis from "./lib/components/Chart/Axis/Axis";
import Chart from "./lib/components/Chart/Chart";
import Line from "./lib/components/Chart/plots/Line";
import Scatter from "./lib/components/Chart/plots/Scatter";
import Bar from "./lib/components/Chart/plots/Bar";

function App() {
  let quadratic: Point[] = [...Array(20).keys()].map((e, i) => [i, i ** 2]);

  let linear: Point[] = [...Array(20).keys()].map((e, i) => [i, i * 2]);

  return (
    <div>
      <h1>Example:</h1>
      <Chart width={400} height={200} axisSize={30}>
        <Axis
          direction="h"
          tickStep={2}
          gridlines
          gridline_stroke="pink"
          title_transform="translate(0, 10)"
        />
        <Axis
          direction="v"
          title_transform="translate(0, -65)"
          title="y&darr;"
          tickStep={40}
          gridlines
        />
        <Bar points={linear} direction="v" series="linear" fill="lightblue" />
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
