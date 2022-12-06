import { FC, useContext, useEffect, useState } from "react";
import { chartContext as ctx } from "./Chart";
import { makeLin } from "../common/scaleFactories";

interface props {
  direction: "h" | "v";
  id?: string;
  scale?: { (n: number): number };
  ticks?: string[] | "none" | "auto";
  numTicks?: number;
  makeTick?: (n: number) => string;
  auto?: "lin" | "log";
}

let Scale: FC<props> = ({ direction, id = "", scale = (n) => n, auto }) => {
  id = id || direction === "h" ? "x" : "y";

  let { dimensions, data, register } = useContext(ctx);

  useEffect(() => {
    if (auto) {
      let dataset = Object.values(data)
        .filter((e) => e.axes.includes(id))
        .flatMap((e) => {
          if (!Array.isArray(e.data[0])) return e.data as number[];

          let arr = e.data as Point[];

          let get = direction === "h" ? (a: Point) => a[0] : (a: Point) => a[1];
          return arr.map(get);
        });

      let size = direction === "h" ? dimensions[0] : dimensions[1];
      let scaleFactory = auto === "lin" ? makeLin : makeLin; //replace this with log scale
      scale = scaleFactory(dataset, size);
    }

    register["axis"](id, scale);
  }, [data]);

  return <></>;
};

export default Scale;
