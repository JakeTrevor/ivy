import { FC, SVGProps, useContext } from "react";
import RadarContext from "../context";
import { ORIGIN } from "~/CONSTANTS";

export interface props extends SVGProps<SVGCircleElement> {}

let Circle: FC<props> = ({ ...rest }) => {
  let { scaleFn, max, min, radius, stepSize } = useContext(RadarContext);

  let numTicks = Math.floor((max - min) / stepSize);

  return (
    <g id="gridlines">
      {Array.from({ length: numTicks }, (_, i) => {
        let val = min + (i + 1) * stepSize;
        let gridRadius = scaleFn(val) * radius;
        return (
          <circle
            data-index={i}
            data-value={val}
            key={i}
            cx={ORIGIN}
            cy={ORIGIN}
            r={gridRadius}
            transform-origin={`${ORIGIN} ${ORIGIN}`}
            fill="none"
            stroke="grey"
            {...rest}
          />
        );
      })}
    </g>
  );
};

export default Circle;
