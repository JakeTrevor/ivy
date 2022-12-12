import { createContext } from "react";

interface context {
  dimensions: [number, number];
  chartArea: [number, number];
  scales: { [id: string]: Scale };
  data: { [id: string]: Dataset };
  register: {
    scale: (id: string, scale: Scale) => void;
    dataset: (id: string, data: Dataset) => void;
  };
}

export let chartContext = createContext<context>({
  dimensions: [0, 0],
  chartArea: [0, 0],
  scales: {},
  data: {},
  register: {
    scale: (id: string, scale: Scale) => id,
    dataset: (id: string, data: Dataset) => id,
  },
});
