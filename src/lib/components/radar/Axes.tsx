import type { FC, ReactNode } from "react";
import React from "react";
import propScale from "../../scales/propScale";
import { unit_direction } from "../../functions/unit_direction";
import RadarContext from "./context";

interface props extends React.SVGProps<SVGSVGElement> {
  min: number;
  max: number;
  spokeLabels: ReactNode[];
  stepSize?: number;

  axisProps?: React.SVGProps<SVGLineElement>;

  gridlines?: boolean;
  gridProps?: React.SVGProps<SVGCircleElement>;

  scaleLabels?: boolean;
  scaleLabelProps?: React.SVGProps<SVGTextElement>;

  children?: ReactNode;
}

const size = 100;

let RadarAxes: FC<props> = ({
  min,
  max,
  gridlines = false,
  scaleLabels = true,
  stepSize = 1,
  axisProps,
  gridProps,
  scaleLabelProps,
  children,
  spokeLabels,
  ...rest
}) => {
  let scaleFn = propScale([min, max]);

  let origin = size / 2;
  let radius = origin * 0.9; //fill 90%

  let inter_spoke_angle = (2 * Math.PI) / spokeLabels.length;

  let numTicks = Math.floor((max - min) / stepSize);

  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {spokeLabels.map((_, i) => {
        let angle = i * inter_spoke_angle;
        let p2 = unit_direction(angle)
          .map((e) => e * radius)
          .map((e) => origin + e);
        return (
          <line
            x1={origin}
            y1={origin}
            x2={p2[0]}
            y2={p2[1]}
            stroke="grey"
            {...axisProps}
          />
        );
      })}
      {gridlines &&
        Array.from(Array(numTicks)).map((_, i) => {
          let gridRadius = scaleFn(min + (i + 1) * stepSize) * radius;
          return (
            <circle
              cy={origin}
              cx={origin}
              r={gridRadius}
              fill="none"
              stroke="grey"
              {...gridProps}
            />
          );
        })}

      {scaleLabels &&
        Array.from(Array(numTicks)).map((_, i) => {
          let val = min + (i + 1) * stepSize;
          let gridRadius = scaleFn(val) * radius;

          return (
            <text
              x={origin}
              y={origin - gridRadius}
              fontSize="50%"
              textAnchor="middle"
              dominantBaseline="text-after-edge"
              {...scaleLabelProps}
            >
              {val}
            </text>
          );
        })}
      <RadarContext.Provider
        value={{ origin: [origin, origin], radius: radius, scaleFn: scaleFn }}
      >
        {children}
      </RadarContext.Provider>

      <foreignObject x="0" y="0" width={size} height={size} overflow="visible">
        {spokeLabels.map((e, i) => {
          let angle = i * inter_spoke_angle;
          let point = unit_direction(angle)
            .map((e) => e * (radius * 1.05))
            .map((e) => origin + e);
          return (
            <div
              style={{
                position: "absolute",
                left: point[0],
                top: point[1],
                transform: "translate(-50%, -50%)",
              }}
            >
              {e}
            </div>
          );
        })}
      </foreignObject>
    </svg>
  );
};

export default RadarAxes;
