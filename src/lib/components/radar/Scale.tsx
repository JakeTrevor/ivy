import { FC, SVGProps, useContext } from "react";
import RadarContext from "./context";

interface props extends SVGProps<SVGTextElement> {}

let Scale: FC<props> = ({ ...rest }) => {
  let { scaleFn, max, min, radius, origin, stepSize } =
    useContext(RadarContext);

  let numTicks = Math.floor((max - min) / stepSize);

  return (
    <g id="scale">
      {Array.from({ length: numTicks }, (_, i) => {
        let val = min + (i + 1) * stepSize;
        let gridRadius = scaleFn(val) * radius;

        return (
          <text
            data-idx={i}
            data-value={val}
            key={i}
            x={origin[0]}
            y={origin[1] - gridRadius}
            fontSize="50%"
            textAnchor="middle"
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