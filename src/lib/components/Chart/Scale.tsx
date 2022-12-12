import { chartContext as ctx } from "./chartContext";
import { FC, useContext, useEffect } from "react";
import useDataset from "../../hooks/useDatasets";
import useAutoScale from "../../hooks/useAutoScale";

export interface ScaleProps {
  direction: "h" | "v";
  id?: string;
  _scale?: { (n: number): number };
}

let Scale: FC<ScaleProps> = ({ direction, id = "", _scale: scale }) => {
  let { chartArea, data, register } = useContext(ctx);
  if (id === "") {
    id = direction === "h" ? "x" : "y";
  }
  useEffect(() => {
    if (scale === undefined) {
      let dataset = useDataset(data, id, direction);

      let size = direction === "h" ? chartArea[0] : chartArea[1];
      let reverse = direction === "v";

      [scale] = useAutoScale(dataset, size, reverse);
    }

    register.scale(id, scale);
  }, [data]);

  return <>scale {id}</>;
};

export default Scale;
