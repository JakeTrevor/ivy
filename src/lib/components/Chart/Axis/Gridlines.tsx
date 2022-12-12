import type { FC } from "react";

interface props {
  ticks: ScaleLabel[];
  direction: "h" | "v";
  dimensions: [number, number];
  gridlineProps: React.SVGProps<SVGPolylineElement>;
}

let Gridlines: FC<props> = ({
  ticks,
  direction,
  dimensions,
  gridlineProps,
}) => {
  return (
    <>
      {ticks.map(({ x, y }) => {
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
        return (
          <polyline
            points={a.join(" ")}
            stroke="lightgrey"
            {...gridlineProps}
          />
        );
      })}
    </>
  );
};

export default Gridlines;
