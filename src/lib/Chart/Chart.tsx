import { FC, useState } from "react";
import Plot, { PlotProps } from "../common/Plot";
import { chartContext } from "./chartContext";

interface props extends PlotProps {
  axisSize?: number;
  chartArea?: Point;
}

let Chart: FC<props> = ({
  axisSize = 10,
  chartArea,
  width,
  height,
  ...rest
}) => {
  let [axes, setAxes] = useState<ChartAxes>({
    x: (n: number) => n,
    y: (n: number) => n,
  });

  let [data, setData] = useState<Data>({});

  let register = {
    axis: (id: string, scale: Scale) => {
      setAxes((old) => {
        return {
          ...old,
          [id]: scale,
        };
      });
    },
    dataset: (id: string, data: Dataset) => {
      setData((old) => {
        return {
          ...old,
          [id]: data,
        };
      });
    },
  };

  if (!chartArea) {
    chartArea = chartArea || [0, 0];
    chartArea[0] = width - axisSize;
    chartArea[1] = height - axisSize;
  }

  return (
    <chartContext.Provider
      value={{ dimensions: [width, height], chartArea, axes, data, register }}
    >
      <Plot {...rest} width={width} height={height} />
    </chartContext.Provider>
  );
};

export default Chart;
