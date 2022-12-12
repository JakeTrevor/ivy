interface Dataset {
  axes: string[];
  data: Point[] | number[];
}

interface ScaleLabel {
  x: number;
  y: number;
  text: string;
}
[];

type Direction = "h" | "v";
