import { FC, useContext, useEffect } from "react";
import { chartContext as ctx } from "./chartContext";
import Cross from "../../icons/Cross";
import identity from "../common/identity";

interface props {
  points: Point[];
  series: string;
  Component?: any;

  x?: string;
  y?: string;
}

let Scatter: FC<props> = ({
  points,
  series,
  x = "x",
  y = "y",
  Component = Cross,
}) => {
  let { scales: scales, register, dimensions, chartArea } = useContext(ctx);

  useEffect(() => {
    if (!series) {
      console.error(
        "Unset series name for Scatter with data:",
        points,
        "All series must have a name."
      );
      return;
    }
    register["dataset"](series, { axes: [x, y], data: points });
  }, [points]);

  let scaleX = scales[x] || identity;
  let scaleY = scales[y] || identity;

  let baseline = `translate(${dimensions[0] - chartArea[0]} 0)`;

  return (
    <g id={`series:${series}`}>
      {points.map((p, i) => (
        <Component x={scaleX(p[0])} y={scaleY(p[1])} transform={baseline} />
      ))}
    </g>
  );
};

export default Scatter;
