import { FC, useContext } from "react";
import { unit_direction } from "~/utils";
import RadarContext from "./context";
import { ORIGIN } from "~/CONSTANTS";

export interface props extends React.SVGProps<SVGLineElement> {}

let Spokes: FC<props> = ({ ...rest }) => {
  let { numSpokes, radius } = useContext(RadarContext);

  let inter_spoke_angle = (2 * Math.PI) / numSpokes;

  return (
    <g id="spokes">
      {Array.from({ length: numSpokes }, (_, i) => {
        let angle = i * inter_spoke_angle;
        let p2 = unit_direction(angle)
          .map((e) => e * radius)
          .map((e) => e + ORIGIN);
        return (
          <line
            data-idx={i}
            key={i}
            x1={ORIGIN}
            y1={ORIGIN}
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
