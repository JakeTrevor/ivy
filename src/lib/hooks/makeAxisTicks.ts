import { useContext } from "react";
import { chartContext as ctx } from "../components/Chart/chartContext";
import identity from "./identity";
import useDataset from "./useDatasets";

export default function (
  axisID: string,
  direction: Direction,
  tickStep: number,
  makeLabel: (e: number, i: number) => string
): ScaleLabel[] {
  let { scales, data, dimensions, chartArea } = useContext(ctx);

  let margins = [dimensions[0] - chartArea[0], dimensions[1] - chartArea[1]];

  let scale = scales[axisID] || identity;

  let dataset = useDataset(data, axisID, direction);
  if (dataset.length === 0) {
    return [];
  }

  let max = Math.max(...dataset);
  let min = Math.min(...dataset);
  let range = max - min;
  let numTicks = Math.floor((range + 1) / tickStep);

  return [...Array(numTicks).keys()].map((_, i) => {
    let data: number = min + i * tickStep;
    let text = makeLabel(data, i);
    let x, y;

    if (direction === "h") {
      x = margins[1] + scale(data);
      y = chartArea[1];
    } else {
      x = margins[1];
      y = scale(data);
    }

    return {
      x,
      y,
      text,
    };
  });
}
