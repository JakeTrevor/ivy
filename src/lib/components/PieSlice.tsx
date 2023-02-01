import type { FC } from "react";
import { unit_direction } from "../functions/unit_direction";

interface props {
  origin: [number, number];
  radius: number;
  startAngle: number;
  sliceAngle: number;
  props: React.SVGProps<SVGPathElement>;
}

let PieSlice: FC<props> = ({
  origin,
  radius,
  startAngle,
  sliceAngle,
  props,
}) => {
  let largeArc = sliceAngle > Math.PI ? 1 : 0;

  let start = unit_direction(startAngle)
    .map((e) => e * radius)
    .map((e, i) => origin[i] + e);

  let end = unit_direction(startAngle + sliceAngle)
    .map((e) => e * radius)
    .map((e, i) => origin[i] + e);

  let path =
    `M ${origin[0]} ${origin[1]} ` +
    `L ${start.join(" ")} ` +
    `A ${radius} ${radius} 0 ${largeArc} 1 ${end.join(" ")} Z`;

  return <path d={path} fill="turquoise" stroke="black" {...props} />;
};

export default PieSlice;
