import { FC, useContext, useEffect, useState } from "react";
import { chartContext as ctx } from "./Chart";
import { autoScale } from "./scales";

interface props {
  direction: "h" | "v";
  label?: string;
  scale?: { (n: number): number };
  ticks?: string[] | "none" | "auto";
  numTicks?: number;
  makeTick?: (n: number) => string;
  auto?: "lin" | "log";
}

let Axis: FC<props> = ({
  direction,
  label = "",
  scale = (n) => n,
  auto,
  ticks = "auto",
  makeTick = (n) => n.toString(),
  numTicks = 10,
}) => {
  let { setAxes, dimensions, data } = useContext(ctx);
  label = label || direction === "h" ? "x" : "y";

  function getDataset(): number[] {
    return data
      .filter((e) => e.axes.includes(label))
      .flatMap((e) => {
        if (!Array.isArray(e.data[0])) return e.data as number[];

        let arr = e.data as Point[];

        let get = direction === "h" ? (a: Point) => a[0] : (a: Point) => a[1];
        return arr.map(get);
      });
  }

  useEffect(() => {
    if (auto) {
      let dataset = getDataset();
      let dimension = direction === "h" ? dimensions[0] : dimensions[1];
      let scaleFactory = auto === "lin" ? autoScale : autoScale; //replace this with log scale
      scale = scaleFactory(dataset, dimension);
    }

    setAxes((old) => {
      return {
        ...old,
        [label]: scale,
      };
    });
  }, [data]);

  numTicks = ticks === "auto" ? numTicks : ticks === "none" ? 0 : ticks.length;
  ticks = ticks === "none" || ticks === "auto" ? [] : ticks;

  useEffect(() => {
    if (ticks === "auto") {
      let setTicks;
      [ticks, setTicks] = useState([]);
    }
  });

  let coords: { x: number; y: number }[];

  return (
    <g id={"axis_" + label}>
      {ticks.map((e, i) => (
        <text {...coords[i]}>{e}</text>
      ))}
    </g>
  );
};

export default Axis;
