import { ReactNode } from "react";
import { propScale } from "~/utils";

import RadarContext from "./context";
import Gridlines from "./Gridlines";
import Labels from "./Labels";
import Dot from "./plot/Dot";
import Line from "./plot/Line";
import Scale from "./Scale";
import Spokes from "./Spokes";
import { ORIGIN } from "~/CONSTANTS";

interface props extends React.SVGProps<SVGSVGElement> {
  min: number;
  max: number;
  numSpokes: number;
  stepSize?: number;

  children?: ReactNode;
}

const size = 100;

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

Radar.Gridlines = Gridlines;
Radar.Labels = Labels;
Radar.Scale = Scale;
Radar.Spokes = Spokes;

Radar.plot = {
  Line: Line,
  Dot: Dot,
};

export default Radar;
