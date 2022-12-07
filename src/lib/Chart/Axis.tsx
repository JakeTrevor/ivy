import { FC, useContext, useEffect, useState } from "react";
import { getDataset } from "../common/getDataset";
import identity from "../common/identity";
import { chartContext as ctx } from "./chartContext";
import Scale, { ScaleProps } from "./Scale";

interface props extends ScaleProps {
  gridLines?: boolean;
  title?: string;
  makeLabel?: (e: number, i: number) => string;
  tickStep?: number;
}

let Axis: FC<props> = ({
  direction,
  title = "",
  id = "",
  gridLines = false,
  makeLabel = (n) => n.toString(),
  tickStep = 1,
  ...rest
}) => {
  if (id === "") {
    id = direction === "h" ? "x" : "y";
  }

  if (title === "") {
    title = id;
  }

  let { chartArea, dimensions, axes, data } = useContext(ctx);

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

  let s = axes[id] || [identity, identity];
  let [scale, inverse] = s;
  let [ticks, setTicks] = useState<ScaleLabel[]>([]);

  useEffect(() => {
    let dataset = getDataset(data, id, direction);
    if (dataset.length === 0) {
      return;
    }

    let max = Math.max(...dataset);
    let min = Math.min(...dataset);
    let range = max - min;
    let numTicks = Math.floor((range + 1) / tickStep);

    let ts: ScaleLabel[] = [...Array(numTicks).keys()].map((e, i) => {
      let data: number = min + i * tickStep;
      let text = makeLabel(data, i);

      if (direction === "h") {
        let x = margins[1] + scale(data);
        let y = chartArea[1];
        let transform = "rotate(90)";
        let origin = `${x} ${y}`;
        return {
          x,
          y,
          text,
          transform,
          "transform-origin": origin,
          "text-anchor": "start",
        };
      } else {
        let x = margins[1];
        let y = scale(data);
        let origin = `${x} ${y}`;

        return {
          x,
          y,
          text,
          "transform-origin": origin,
          "text-anchor": "end",
        };
      }
    });
    setTicks(ts);
  }, [data, scale]);

  return (
    <>
      <g id={`axis_${id}`}>
        <polyline points={border.join(" ")} stroke="black" />
        {ticks.map(({ text, ...attrs }) => {
          return (
            <text dominantBaseline="Hanging" {...attrs}>
              {text}
            </text>
          );
        })}
        {gridLines &&
          ticks.map(({ x, y, ...rest }) => {
            let a: Point[] =
              direction === "h"
                ? [
                    [x, y],
                    [x, 0],
                  ]
                : [
                    [x, y],
                    [dimensions[0], y],
                  ];
            return <polyline points={a.join(" ")} stroke="lightgrey" />;
          })}
        <text {...titlePosition}>{title}</text>
      </g>
      <Scale direction={direction} id={id} {...rest} />
    </>
  );
};

export default Axis;
