import { createContext } from "react";

interface ctx {
  dimensions: [number, number];
  chartArea: [number, number];
  axes: ChartAxes;
  data: Data;
  register: {
    axis: (id: string, scale: [Scale, Scale]) => void;
    dataset: (id: string, data: Dataset) => void;
  };
}

export let chartContext = createContext<ctx>({
  dimensions: [0, 0],
  chartArea: [0, 0],
  axes: {},
  register: {
    axis: (id: string, scale: [Scale, Scale]) => id,
    dataset: (id: string, data: Dataset) => id,
  },
  data: {},
});
