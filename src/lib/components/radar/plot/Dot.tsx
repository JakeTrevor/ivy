import { FC, SVGProps, useContext } from "react";
import { unit_direction } from "~/functions/unit_direction";
import RadarContext from "../context";
import schema from "./schema";

interface props extends SVGProps<SVGCircleElement> {
  data: number[];
}

let Dot: FC<props> = ({ data, ...rest }) => {
  let { scaleFn, radius, origin, max, min, numSpokes } =
    useContext(RadarContext);

  schema().parse(data);

  let inter_spoke_angle = (2 * Math.PI) / numSpokes;

  let path = data.map((e, i) => {
    let scaleFactor = scaleFn(e) * radius;
    let angle = i * inter_spoke_angle;
    let direction = unit_direction(angle);
    return direction.map((e) => e * scaleFactor).map((e, i) => e + origin[i]);
  });

  return (
    <g id="dot-plot">
      {path.map((e, i) => (
        <circle
          data-idx={i}
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
