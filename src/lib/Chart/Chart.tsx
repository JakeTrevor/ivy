import { createContext, FC, useState } from "react";
import Plot, { PlotProps } from "../common/Plot";

interface ctx {
  dimensions: [number, number];
  axes: ChartAxes;
  data: Data;
  register: {
    axis: (id: string, scale: Scale) => void;
    dataset: (id: string, data: Dataset) => void;
  };
}

export let chartContext = createContext<ctx>({
  dimensions: [0, 0],
  axes: {},
  register: {
    axis: (id: string, scale: Scale) => id,
    dataset: (id: string, data: Dataset) => id,
  },
  data: {},
});

interface props extends PlotProps {}

let Chart: FC<props> = ({ width, height, ...rest }) => {
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

  return (
    <chartContext.Provider
      value={{ dimensions: [width, height], axes, data, register }}
    >
      <Plot {...rest} width={width} height={height} />
    </chartContext.Provider>
  );
};

export default Chart;
