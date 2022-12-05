import type { FC } from "react";
import Axis from "./Axis";
import Chart from "./Chart";
import Line from "./Line";

let Example: FC = () => {
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
    <Chart width={200} height={100}>
      <Axis direction="h" auto="lin" />
      <Axis direction="v" auto="lin" />
      <Line points={data} />
      <Line points={data2Boogaloo} />
    </Chart>
  );
};

export default Example;
