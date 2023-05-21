import React from "react";
import ReactDOM from "react-dom/client";
import Column from "~/components/Column";
import Pie from "~/components/wedge/pie";
import Radar from "~/components/radar";
import Rose from "~/components/wedge/Rose";
import { classnames } from "~/utils";

function App() {
  let data = [5, 4, 3, 2, 1];
  let data2 = [5, 1, 5, 1, 1];
  let cNames = [
    "fill-pink-100 stroke-none",
    "fill-pink-300 stroke-none",
    "fill-pink-500 stroke-none",
    "fill-pink-700 stroke-none",
    "fill-pink-900 stroke-none",
  ];

  let labels = ["a", "b", "c", "d", "e"];

  let x = (
    <Radar min={0} max={5} stepSize={1} numSpokes={5}>
      <Radar.Spokes className="stroke-grey-400 stroke-[0.5] overflow-visible" />
      <Radar.GridLabels itemProps={classnames(["hidden", "", "hidden"])} />
      <Radar.Gridlines.Circle className="stroke-grey-400/90 stroke-[0.5] hover:scale-105 transition-all duration-500" />
      <Radar.Labels
        labels={labels}
        itemProps={classnames(["-translate-y-1"])}
      />
      <Radar.plot.Line
        data={data}
        className="fill-pink-200/50 stroke-pink-400"
      />
      <Radar.plot.Line
        data={data2}
        className="fill-orange-200/50 stroke-orange-400"
      />
      <Radar.plot.Dot
        data={data2}
        className="fill-orange-400 hover:fill-orange-700 hover:shadow-md hover:scale-150 transition-all duration-500"
        onClick={(e) =>
          alert(
            `${e.currentTarget.dataset.index}, ${e.currentTarget.dataset.value}`
          )
        }
      />
    </Radar>
  );

  return (
    <div style={{ fontFamily: "roboto" }}>
      <h1>Example:</h1>
      <h2>[{data.join(", ")}]</h2>
      <div className="flex flex-col items-center">
        <div className="w-1/4">{x}</div>
        <div className="w-1/4">
          <Pie data={data} sliceProps={classnames(cNames)} />
        </div>
        <div className="w-1/4">
          <Rose data={data} sliceProps={classnames(cNames)} />
        </div>
        <div className="w-1/4">
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
        </div>
      </div>

      {/* {renderToString(x)} */}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
