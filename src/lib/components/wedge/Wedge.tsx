import type { FC, SVGProps } from "react";
import { unit_direction } from "~/utils";

interface props extends SVGProps<SVGPathElement> {
  origin: [number, number];
  radius: number;
  startAngle: number;
  sliceAngle: number;
}

let PieSlice: FC<props> = ({
  origin,
  radius,
  startAngle,
  sliceAngle,
  ...rest
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

  return <path d={path} fill="turquoise" stroke="black" {...rest} />;
};

export default PieSlice;
