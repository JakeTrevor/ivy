type Scale = (n: number) => number;

type Point = [number, number]; //x, y

interface Dataset {
  axes: string[];
  data: Point[] | number[];
}

interface ChartAxes {
  [label: string]: Scale;
}

interface Data {
  [id: string]: Dataset;
}
