import { FC, useContext, useEffect } from "react";
import { chartContext as ctx } from "./chartContext";
import { identity } from "../../hooks";

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
  let { scales, register, dimensions, chartArea } = useContext(ctx);

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

  let scaleX = scales[x] || identity;
  let scaleY = scales[y] || identity;

  let baseline = `translate(${dimensions[0] - chartArea[0]} 0)`;

  return (
    <polyline
      id={`series:${series}`}
      transform={baseline}
      points={points.map((p) => [scaleX(p[0]), scaleY(p[1])]).join(" ")}
      {...rest}
      fill={fill}
      stroke={stroke}
    ></polyline>
  );
};

export default Line;
