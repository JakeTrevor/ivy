import React from "react";
import ReactDOM from "react-dom/client";
import Axis from "./lib/Chart/Axis";
import Chart from "./lib/Chart/Chart";
import Line from "./lib/Chart/Line";

function App() {
  let data: Point[] = [
    [1, 2],
    [2, 12],
    [3, 5],
    [4, 3],
    [5, 2],
  ];

  let data2Boogaloo: Point[] = [
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 1],
    [5, 4],
  ];

  return (
    <div>
      <h1>Example:</h1>
      <Chart width={400} height={200} axisSize={30}>
        <Axis direction="h" auto="lin" tag="hoz" />
        <Axis direction="v" auto="lin" tag="Vert" />
        <Line points={data} series="data" />
        <Line stroke="red" points={data2Boogaloo} series="data 2 boogaloo" />
      </Chart>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
