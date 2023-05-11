import { ReactNode } from "react";
import { propScale } from "~/utils";

import RadarContext from "./context";
import Circle, { type props as circleProps } from "./Gridlines/circle";
import Labels, { type props as labelProps } from "./Labels";
import Dot, { type props as dotProps } from "./plot/Dot";
import Line, { type props as lineProps } from "./plot/Line";
import Scale, { type props as scaleProps } from "./Scale";
import Spokes, { type props as spokeProps } from "./Spokes";
import { ORIGIN } from "~/CONSTANTS";
import Polygon, { type props as polygonProps } from "./Gridlines/polygon";

interface props extends React.SVGProps<SVGSVGElement> {
  min: number;
  max: number;
  numSpokes: number;
  stepSize?: number;

  children?: ReactNode;
}

const Radar = ({
  min,
  max,
  numSpokes,
  stepSize = 1,
  children,
  ...rest
}: props) => {
  let radius = ORIGIN * 0.9; //fill 90%
  let scaleFn = propScale([min, max]);

  return (
    <svg
      id="radar chart"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <RadarContext.Provider
        value={{
          radius,
          scaleFn,
          min,
          max,
          numSpokes,
          stepSize,
        }}
      >
        {children}
      </RadarContext.Provider>
    </svg>
  );
};

Radar.Labels = Labels;
Radar.Scale = Scale;
Radar.Spokes = Spokes;

Radar.Gridlines = { Circle, Polygon };
Radar.plot = { Line, Dot };

export default Radar;
