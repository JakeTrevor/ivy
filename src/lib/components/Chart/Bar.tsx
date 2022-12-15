import { FC, useContext, useEffect } from "react";
import { identity } from "../../hooks";
import { chartContext as ctx } from "./chartContext";

interface props extends Omit<React.SVGAttributes<SVGRectElement>, "points"> {
  points: Point[];
  series: string;
  x?: string;
  y?: string;
  girth?: number;
  direction?: Direction;
}

let Bar: FC<props> = ({
  points,
  series,
  girth = 4,
  x = "x",
  y = "y",
  direction = "v",
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

  let margins = [dimensions[0] - chartArea[0], dimensions[1] - chartArea[1]];

  let scaleX = scales[x] || identity;
  let scaleY = scales[y] || identity;

  let baseline = `translate(${dimensions[0] - chartArea[0]} 0)`;

  return (
    <>
      {points.map((e) => {
        let startX, startY, w, h;

        if (direction === "v") {
          w = girth;
          startX = scaleX(e[0]) - girth / 2;
          startY = scaleY(e[1]);
          h = chartArea[1] - scaleY(e[1]);
        } else {
          h = girth;
          startX = 0; //margins[0];
          startY = scaleY(e[1]) - girth / 2;
          w = scaleX(e[0]);
        }

        return (
          <rect
            transform={baseline}
            x={startX}
            y={startY}
            height={h}
            width={w}
            {...rest}
          />
        );
      })}
    </>
  );
};

export default Bar;
