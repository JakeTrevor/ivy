import type { FC } from "react";
import {
  NumericalSeries,
  numerical_series,
  ZeroPoint,
  zero_point,
} from "~/utils/common_schemas";

import { ORIGIN } from "~/CONSTANTS";

import PieSlice from "./Wedge";
import { propScale } from "~/utils";

interface props extends React.SVGAttributes<SVGSVGElement> {
  data: NumericalSeries;
  /** The value that maps to a slice radius of 0 */
  zeroPoint?: ZeroPoint;
  sliceProps?: React.SVGProps<SVGPathElement>[];
}

let Rose: FC<props> = ({ data, zeroPoint = 0, sliceProps, ...rest }) => {
  numerical_series.parse(data);
  zero_point.parse(zeroPoint);

  let scaleFn = propScale([...data, zeroPoint]);
  let maxRadius = ORIGIN * 0.9;

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
            data-index={i}
            data-value={e}
            key={i}
            origin={[ORIGIN, ORIGIN]}
            radius={radius}
            startAngle={startAngle}
            sliceAngle={inter_spoke_angle}
            {...props}
          />
        );
      })}
    </svg>
  );
};

export default Rose;
