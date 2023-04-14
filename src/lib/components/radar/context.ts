import { createContext } from "react";

interface context {
  radius: number;
  min: number;
  max: number;
  numSpokes: number;
  stepSize: number;
  scaleFn: (n: number) => number;
}

let RadarContext = createContext<context>({
  radius: 45,
  min: 0,
  max: 5,
  numSpokes: 5,
  stepSize: 1,
  scaleFn: (n: number) => n,
});

export default RadarContext;
