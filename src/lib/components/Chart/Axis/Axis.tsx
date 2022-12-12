import { FC, useContext } from "react";
import { chartContext as ctx } from "../chartContext";
import Scale, { ScaleProps } from "../Scale";
import { pick } from "../../../hooks";
import makeAxisTicks from "../../../hooks/makeAxisTicks";
import Gridlines from "./Gridlines";
import AxisLabel from "./Labels";

type props = ScaleProps &
  AxisElementProps & {
    gridlines?: boolean;
    title?: string;
    makeLabel?: (e: number, i: number) => string;
    tickStep?: number;
  };

let Axis: FC<props> = ({
  direction,
  id = direction === "h" ? "x" : "y",
  title = id,
  gridlines = false,
  makeLabel = (n) => n.toString(),
  tickStep = 1,
  ...rest
}) => {
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

  let ticks = makeAxisTicks(id, direction, tickStep, makeLabel);

  let titleProps = pick(rest, "title_");
  let labelProps = pick(rest, "label_");
  let gridlineProps = pick(rest, "gridline_");
  let axisProps = pick(rest, "axis_");

  return (
    <g id={`axis_${id}`}>
      <polyline points={border.join(" ")} stroke="black" {...axisProps} />

      <AxisLabel ticks={ticks} labelProps={labelProps} />

      {gridlines && (
        <Gridlines
          ticks={ticks}
          direction={direction}
          dimensions={dimensions}
          gridlineProps={gridlineProps}
        />
      )}

      <text {...titlePosition} {...titleProps}>
        {title}
      </text>

      <Scale direction={direction} id={id} {...rest} />
    </g>
  );
};

export default Axis;
