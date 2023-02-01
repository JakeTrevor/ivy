import React from "react";
import ReactDOM from "react-dom/client";
import Column from "./lib/components/Column";
import Pie from "./lib/components/Pie";
import RadarAxes from "./lib/components/radar/Axes";
import RadarPlot from "./lib/components/radar/Plot";
import Rose from "./lib/components/Rose";
import classnames from "./lib/functions/classnames";

function App() {
  let data = [4, 3, 2, 1, 5, 4];
  let cnames = [
    "fill-pink-100 stroke-none",
    "fill-pink-300 stroke-none",
    "fill-pink-500 stroke-none",
    "fill-pink-700 stroke-none",
    "fill-pink-900 stroke-none",
  ];

  let labels = [
    <button onClick={() => alert("yo mama")}>&alpha;</button>,
    "b",
    "c",
    "d",
    "e",
    "f",
  ];

  let x = (
    <RadarAxes
      min={0}
      max={5}
      spokeLabels={labels}
      axisProps={{ className: "stroke-gray-400 stroke-[0.5]" }}
      gridlines
      gridProps={{ className: "stroke-gray-400/90 stroke-[0.5]" }}
      overflow="visible"
    >
      <RadarPlot data={data} className="fill-pink-200/50 stroke-pink-400" />
      <RadarPlot
        data={[3, 1, 4, 1, 2, 5]}
        className="fill-orange-200/50 stroke-orange-400"
        dots
        markerProps={{ className: "fill-orange-400" }}
      />
    </RadarAxes>
  );

  return (
    <div style={{ fontFamily: "roboto" }}>
      <h1>Example:</h1>
      <h2>[{data.join(", ")}]</h2>
      <p style={{ display: "flex" }}>
        <div className="w-3/4">{x}</div>
        <Pie data={data} sliceProps={classnames(cnames)} />
        <Rose data={data} sliceProps={classnames(cnames)} />
        <Column
          data={data}
          rectangleProps={[
            { fill: "green", stroke: "none" },
            { fill: "blue", stroke: "none" },
            { fill: "pink", stroke: "none" },
            { fill: "gray", stroke: "none" },
            { fill: "orange", stroke: "none" },
          ]}
        />
      </p>

      {/* {renderToString(x)} */}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
