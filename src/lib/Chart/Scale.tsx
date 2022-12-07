import { chartContext as ctx } from "./chartContext";
import { FC, useContext, useEffect } from "react";
import { makeLin, makeLog } from "../common/scaleFactories";
import { getDataset } from "../common/getDataset";

export interface ScaleProps {
  direction: "h" | "v";
  id?: string;
  scale?: { (n: number): number };
  auto?: "lin" | "log";
  tag: string;
}

let Scale: FC<ScaleProps> = ({
  direction,
  id = "",
  scale = (n) => n,
  auto,
  tag,
}) => {
  let { chartArea, data, register } = useContext(ctx);
  if (id === "") {
    id = direction === "h" ? "x" : "y";
  }
  useEffect(() => {
    if (auto) {
      let dataset = getDataset(data, id, direction);

      let size = direction === "h" ? chartArea[0] : chartArea[1];
      let scaleFactory = auto === "lin" ? makeLin : makeLog; //replace this with log scale
      let reverse = direction === "v";
      scale = scaleFactory(dataset, size, reverse);
    }
    console.log(id, scale);

    register["axis"](id, scale);
  }, [data]);

  return <>scale {id}</>;
};

export default Scale;
