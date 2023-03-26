import type { FC } from "react";
import propScale from "~/scales/propScale";
import {
  NumericalSeries,
  numerical_series,
  ZeroPoint,
  zero_point,
} from "~/schemas";
import PieSlice from "./PieSlice";

interface props extends React.SVGAttributes<SVGSVGElement> {
  data: NumericalSeries;
  zeroPoint?: ZeroPoint;
  sliceProps?: React.SVGProps<SVGPathElement>[];
}

const size = 100;

let Rose: FC<props> = ({ data, zeroPoint = 0, sliceProps, ...rest }) => {
  numerical_series.parse(data);
  zero_point.parse(zeroPoint);

  let scaleFn = propScale([...data, zeroPoint]);
  let origin = size / 2;
  let maxRadius = origin * 0.9;

  let spokes = data.length;
  let inter_spoke_angle = (2 * Math.PI) / spokes;

  return (
    <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" {...rest}>
      {data.map((e, i) => {
        let radius = scaleFn(e) * maxRadius;
        let startAngle = i * inter_spoke_angle;

        let props = {};
        if (sliceProps) {
          if (sliceProps.length > i) {
            props = sliceProps[i];
          }
        }

        return (
          <PieSlice
            key={i}
            origin={[origin, origin]}
            radius={radius}
            startAngle={startAngle}
            sliceAngle={inter_spoke_angle}
            props={props}
          />
        );
      })}
    </svg>
  );
};

export default Rose;
