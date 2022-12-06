import React from "react";
import ReactDOM from "react-dom/client";
import Chart from "./lib/Chart/Chart";
import Line from "./lib/Chart/Line";
import Scale from "./lib/Chart/Scale";

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
    <div className="App">
      <h1>Example:</h1>
      <Chart width={200} height={100}>
        <Scale direction="h" auto="lin" />
        <Scale direction="v" auto="lin" />
        <Line points={data} series="data" />
        <Line points={data2Boogaloo} series="data 2 boogaloo" />
      </Chart>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
