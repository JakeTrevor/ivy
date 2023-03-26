import { FC, SVGProps, useContext } from "react";
import RadarContext from "./context";

interface props extends SVGProps<SVGCircleElement> {}

let Gridlines: FC<props> = ({ ...rest }) => {
  let { scaleFn, max, min, radius, origin, stepSize } =
    useContext(RadarContext);

  let numTicks = Math.floor((max - min) / stepSize);

  return (
    <g id="gridlines">
      {Array.from({ length: numTicks }, (_, i) => {
        let val = min + (i + 1) * stepSize;
        let gridRadius = scaleFn(val) * radius;
        return (
          <circle
            key={i}
            data-idx={i}
            data-value={val}
            cx={origin[0]}
            cy={origin[1]}
            r={gridRadius}
            transform-origin={`${origin[0]} ${origin[1]}`}
            fill="none"
            stroke="grey"
            {...rest}
          />
        );
      })}
    </g>
  );
};

export default Gridlines;
