import { FC, useContext, useEffect, useState } from "react";
import identity from "../common/identity";
import { chartContext as ctx } from "./chartContext";

// unfortunate ts voodoo
interface lineProps extends Omit<React.SVGProps<SVGPolylineElement>, "points"> {
  points: Point[];
  series: string;
  x?: string;
  y?: string;
}

let Line: FC<lineProps> = ({
  points,
  series,
  x = "x",
  y = "y",
  fill = "none",
  stroke = "black",
  ...rest
}) => {
  let chartContext = useContext(ctx);
  let { axes, register, dimensions, chartArea } = chartContext;

  useEffect(() => {
    if (!series) {
      console.error(
        "Unset series name for Line with data:",
        points,
        "All series must have a name."
      );
      return;
    }
    register["dataset"](series, { axes: [x, y], data: points });
  }, []);

  let scaleX = axes[x] ? axes[x][0] : identity;
  let scaleY = axes[y] ? axes[y][0] : identity;

  let baseline = `translate(${dimensions[0] - chartArea[0]} 0)`;

  return (
    <polyline
      transform={baseline}
      points={points.map((p) => [scaleX(p[0]), scaleY(p[1])]).join(" ")}
      {...rest}
      fill={fill}
      stroke={stroke}
    ></polyline>
  );
};

export default Line;
