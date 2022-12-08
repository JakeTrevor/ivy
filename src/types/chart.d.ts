interface Dataset {
  axes: string[];
  data: Point[] | number[];
}

interface ScaleLabel {
  x: number;
  y: number;
  text: string;
  "transform-origin": string;
  "text-anchor": "start" | "end";
}
[];
