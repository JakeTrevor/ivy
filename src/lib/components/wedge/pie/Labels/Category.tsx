import { FC, useContext } from "react";
import { text_series } from "~/utils/common_schemas";
import PieContext from "../context";
import { normScale, unit_direction } from "~/utils";
import { ORIGIN } from "~/CONSTANTS";

interface props {
  labels: string[];
}

let CategoryLabels: FC<props> = ({ labels }) => {
  let { data } = useContext(PieContext);
  labels = text_series.length(data.length).parse(labels);

  let scaleFn = normScale(data);

  return (
    <g id="labels" z={10}>
      {labels.map((e, i) => {
        let prevSum = data.slice(0, i).reduce((a, b) => a + b, 0);

        let startAngle = scaleFn(prevSum) * 2 * Math.PI;
        let sliceAngle = scaleFn(prevSum + data[i]) * 2 * Math.PI;
        let label_angle = (startAngle + sliceAngle) / 2;

        let pos = unit_direction(label_angle)
          .map((e) => (e * 45) / 2)
          .map((e) => e + ORIGIN);

        return (
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            x={pos[0]}
            y={pos[1]}
          >
            {e}
          </text>
        );
      })}
    </g>
  );
};

export default CategoryLabels;
