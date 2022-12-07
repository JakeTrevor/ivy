type Scale = (n: number) => number;

type Point = [number, number]; //x, y

interface Dataset {
  axes: string[];
  data: Point[] | number[];
}

interface ChartAxes {
  [label: string]: [Scale, Scale];
}

interface Data {
  [id: string]: Dataset;
}

interface ScaleLabel {
  x: number;
  y: number;
  text: string;
  transform?: string;
  "transform-origin": string;
  "text-anchor": "start" | "end";
}
[];
