import { useContext, useEffect, useState } from "react";
import { chartContext as ctx } from "../components/Chart/chartContext";
import identity from "./identity";
import useDataset from "./useDatasets";

export default function (
  id: string,
  direction: Direction,
  tickStep: number,
  makeLabel: (e: number, i: number) => string
): ScaleLabel[] {
  let { scales, data, dimensions, chartArea } = useContext(ctx);

  let margins = [dimensions[0] - chartArea[0], dimensions[1] - chartArea[1]];

  let scale = scales[id] || identity;
  let [ticks, setTicks] = useState<ScaleLabel[]>([]);

  useEffect(() => {
    let dataset = useDataset(data, id, direction);
    if (dataset.length === 0) {
      return;
    }

    let max = Math.max(...dataset);
    let min = Math.min(...dataset);
    let range = max - min;
    let numTicks = Math.floor((range + 1) / tickStep);

    let ts: ScaleLabel[] = [...Array(numTicks).keys()].map((e, i) => {
      let data: number = min + i * tickStep;
      let text = makeLabel(data, i);

      if (direction === "h") {
        let x = margins[1] + scale(data);
        let y = chartArea[1];
        return {
          x,
          y,
          text,
        };
      } else {
        let x = margins[1];
        let y = scale(data);

        return {
          x,
          y,
          text,
        };
      }
    });

    setTicks(ts);
  }, [data, scale]);

  return ticks;
}
