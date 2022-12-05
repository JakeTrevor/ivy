import { createContext, FC, useState } from "react";

interface Axes {
  [label: string]: (n: number) => number;
}

interface Dataset {
  axes: string[];
  data: Point[] | number[];
}

interface ctx {
  dimensions: [number, number];
  axes: Axes;
  setAxes: React.Dispatch<React.SetStateAction<Axes>>;
  data: Dataset[];
  setData: React.Dispatch<React.SetStateAction<Dataset[]>>;
}

export let chartContext = createContext<ctx>({
  dimensions: [0, 0],
  axes: {},
  setAxes: () => {},
  data: [],
  setData: () => {},
});

interface props extends React.SVGProps<SVGSVGElement> {
  width: number;
  height: number;
}

let Chart: FC<props> = ({ children, width, height, ...rest }) => {
  let [axes, setAxes] = useState<Axes>({
    x: (n: number) => n,
    y: (n: number) => n,
  });

  let [data, setData] = useState<Dataset[]>([]);

  rest = { ...rest, transform: rest.transform || "scale(1 -1)" };

  return (
    <chartContext.Provider
      value={{ axes, setAxes, dimensions: [width, height], data, setData }}
    >
      <svg {...rest}>{children}</svg>
    </chartContext.Provider>
  );
};

export default Chart;
