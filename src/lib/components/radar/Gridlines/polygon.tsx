import { FC, SVGProps, useContext } from "react";
import RadarContext from "../context";
import { ORIGIN } from "~/CONSTANTS";
import { unit_direction } from "~/utils";

interface props extends SVGProps<SVGPolygonElement> {}

let Polygon: FC<props> = ({ ...rest }) => {
  let { scaleFn, max, min, radius, stepSize, numSpokes } =
    useContext(RadarContext);

  let numTicks = Math.floor((max - min) / stepSize);
  let inter_spoke_angle = (2 * Math.PI) / numSpokes;

  return (
    <g id="gridlines">
      {Array.from({ length: numTicks }, (_, i) => {
        let val = min + (i + 1) * stepSize;
        let gridRadius = scaleFn(val) * radius;

        let path = Array.from({ length: numSpokes }, (_, i) => {
          let angle = i * inter_spoke_angle;
          let direction = unit_direction(angle);
          return direction.map((e) => e * gridRadius).map((e) => e + ORIGIN);
        });

        return (
          <polygon
            data-idx={i}
            data-value={val}
            points={path.join(" ")}
            key={i}
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

export default Polygon;
