import { FC, SVGProps, useContext } from "react";
import { text_series } from "~/common_schemas";
import { unit_direction } from "~/functions/unit_direction";
import RadarContext from "./context";

interface props extends SVGProps<SVGTextElement> {
  labels: string[];
}

let Labels: FC<props> = ({ labels, ...rest }) => {
  let { numSpokes, origin, radius } = useContext(RadarContext);

  labels = text_series
    .length(numSpokes, `Labels array is wrong size; should be ${numSpokes}`)
    .parse(labels);

  let inter_spoke_angle = (2 * Math.PI) / numSpokes;

  return (
    <g id="labels">
      {labels.map((val, i) => {
        let angle = i * inter_spoke_angle;
        let point = unit_direction(angle)
          .map((e) => e * (radius * 1.05))
          .map((e, i) => origin[i] + e);
        return (
          <text
            data-idx={i}
            data-value={val}
            key={i}
            x={point[0]}
            y={point[1]}
            {...rest}
          >
            {val}
          </text>
        );
      })}
    </g>
  );
};

export default Labels;

// note that you can use access the element itself via onclick with
// onClick={(e) => e.currentTarget}
// Together with the idx attribute, this gives you quite a lot of flexibility. e.g.:
// onClick={(e) => alert(e.currentTarget.dataset.idx)}
