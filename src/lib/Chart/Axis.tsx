import { FC, useContext, useEffect } from "react";
import { chartContext as ctx } from "./chartContext";
import Scale, { ScaleProps } from "./Scale";

interface props extends ScaleProps {
  gridLines?: boolean;
  title?: string;
}

let Axis: FC<props> = ({
  title,
  direction,
  id,
  gridLines = false,
  ...rest
}) => {
  title = title || direction === "h" ? "x" : "y";

  let { chartArea, dimensions } = useContext(ctx);

  let margins = [dimensions[0] - chartArea[0], dimensions[1] - chartArea[1]];

  let border: Point[] =
    direction === "h"
      ? [
          [margins[1], dimensions[1] - margins[1]],
          [dimensions[0], dimensions[1] - margins[1]],
        ]
      : [
          [margins[1], 0],
          [margins[1], dimensions[1] - margins[1]],
        ];

  let titlePosition =
    direction === "h"
      ? {
          x: chartArea[0] / 2 + margins[1],
          y: dimensions[1] - margins[1] / 3,
        }
      : {
          x: margins[0] / 3,
          y: chartArea[1] / 2,
        };

  useEffect(() => {
    console.log(id, direction);
  });

  return (
    <>
      <g>
        <polyline points={border.join(" ")} stroke="black" />
        {gridLines && <line></line>}
        <text {...titlePosition}>{title}</text>
      </g>
      <Scale direction={direction} id={id} {...rest} />
    </>
  );
};

export default Axis;
