import { FC, SVGProps, useContext } from "react";
import { unit_direction } from "~/utils";
import RadarContext from "../context";
import plotSchema from "./schema";
import { ORIGIN } from "~/CONSTANTS";

export interface props extends SVGProps<SVGCircleElement> {
  data: number[];
}

let Dot: FC<props> = ({ data, ...rest }) => {
  let { scaleFn, radius, numSpokes } = useContext(RadarContext);

  plotSchema().parse(data);

  let inter_spoke_angle = (2 * Math.PI) / numSpokes;

  let path = data.map((e, i) => {
    let scaleFactor = scaleFn(e) * radius;
    let angle = i * inter_spoke_angle;
    let direction = unit_direction(angle);
    return direction.map((e) => e * scaleFactor).map((e) => e + ORIGIN);
  });

  return (
    <g id="dot-plot">
      {path.map((e, i) => (
        <circle
          data-index={i}
          data-value={data[i]}
          key={i}
          cx={e[0]}
          cy={e[1]}
          r={1}
          transform-origin={`${e[0]} ${e[1]}`}
          {...rest}
        />
      ))}
    </g>
  );
};

export default Dot;
