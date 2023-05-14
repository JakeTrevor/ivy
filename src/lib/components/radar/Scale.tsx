import { FC, SVGProps, useContext } from "react";
import RadarContext from "./context";
import { ORIGIN } from "~/CONSTANTS";

export interface props extends SVGProps<SVGTextElement> {}

let Scale: FC<props> = ({ ...rest }) => {
  let { scaleFn, max, min, radius, stepSize } = useContext(RadarContext);

  let numTicks = Math.floor((max - min) / stepSize);

  return (
    <g id="scale">
      {Array.from({ length: numTicks }, (_, i) => {
        let val = min + (i + 1) * stepSize;
        let gridRadius = scaleFn(val) * radius;

        return (
          <text
            data-index={i}
            data-value={val}
            key={i}
            x={ORIGIN}
            y={ORIGIN - gridRadius}
            fontSize={5}
            textAnchor="end"
            dominantBaseline="text-after-edge"
            {...rest}
          >
            {val}
          </text>
        );
      })}
    </g>
  );
};

export default Scale;
