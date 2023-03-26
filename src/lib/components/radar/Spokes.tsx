import { FC, useContext } from "react";
import { unit_direction } from "~/functions/unit_direction";
import RadarContext from "./context";

interface props extends React.SVGProps<SVGLineElement> {}

let Spokes: FC<props> = ({ ...rest }) => {
  let { numSpokes, radius, origin } = useContext(RadarContext);

  let inter_spoke_angle = (2 * Math.PI) / numSpokes;

  return (
    <g id="spokes">
      {Array.from({ length: numSpokes }, (_, i) => {
        let angle = i * inter_spoke_angle;
        let p2 = unit_direction(angle)
          .map((e) => e * radius)
          .map((e, i) => origin[i] + e);
        return (
          <line
            data-idx={i}
            key={i}
            x1={origin[0]}
            y1={origin[1]}
            x2={p2[0]}
            y2={p2[1]}
            stroke="grey"
            {...rest}
          />
        );
      })}
    </g>
  );
};

export default Spokes;
