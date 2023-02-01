import type { FC } from "react";
import normScale from "../scales/normScale";
import PieSlice from "./PieSlice";

interface props extends React.SVGAttributes<SVGSVGElement> {
  data: number[];
  sliceProps?: React.SVGProps<SVGPathElement>[];
}

const size = 100;

let Pie: FC<props> = ({ data, sliceProps, ...rest }) => {
  let scaleFn = normScale(data);

  let origin = size / 2;
  let radius = (size / 2) * 0.9;

  return (
    <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" {...rest}>
      {data.map((e, i, a) => {
        let prevSum = a.slice(0, i).reduce((a, b) => a + b, 0);
        let startAngle = scaleFn(prevSum) * 2 * Math.PI;

        let sliceAngle = scaleFn(e) * 2 * Math.PI;

        let props = {};
        if (sliceProps) {
          if (sliceProps.length > i) {
            props = sliceProps[i];
          }
        }

        return (
          <PieSlice
            origin={[origin, origin]}
            radius={radius}
            startAngle={startAngle}
            sliceAngle={sliceAngle}
            props={props}
          />
        );
      })}
    </svg>
  );
};

export default Pie;
