import { FC, useContext, useEffect, useState } from "react";
import { chartContext as ctx } from "./Chart";

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
  let { axes, register } = chartContext;

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

  let scaleX = axes[x];
  let scaleY = axes[y];

  return (
    <polyline
      points={points.map((p) => [scaleX(p[0]), scaleY(p[1])]).join(" ")}
      {...rest}
      fill={fill}
      stroke={stroke}
    ></polyline>
  );
};

export default Line;
