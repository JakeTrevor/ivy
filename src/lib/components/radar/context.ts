import { createContext } from "react";

interface context {
  radius: number;
  origin: [number, number];
  scaleFn: (n: number) => number;
}

let RadarContext = createContext<context>({
  radius: 45,
  origin: [50, 50],
  scaleFn: (n: number) => n,
});

export default RadarContext;
