import { FC, SVGProps, useContext } from "react";

import { ORIGIN } from "~/CONSTANTS";
import { unit_direction } from "~/utils";
import { text_series } from "~/utils/common_schemas";
import RadarContext from "./context";

export interface props extends SVGProps<SVGTextElement> {
  labels: string[];
  itemProps?: SVGProps<SVGTextElement>[];
}

let Labels: FC<props> = ({ labels, itemProps = [], ...rest }) => {
  let { numSpokes, radius } = useContext(RadarContext);

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
          .map((e) => e + ORIGIN);

        return (
          <text
            data-index={i}
            data-value={val}
            key={i}
            x={point[0]}
            y={point[1]}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={7}
            {...rest}
            {...itemProps[i]}
          >
            {val}
          </text>
        );
      })}
    </g>
  );
};

export default Labels;

// TODO: put into documentation
// note that you can use access the element itself via onclick with
// onClick={(e) => e.currentTarget}
// Together with the index attribute, this gives you quite a lot of flexibility. e.g.:
// onClick={(e) => alert(e.currentTarget.dataset.index)}
