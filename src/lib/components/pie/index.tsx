import type { FC, ReactNode } from "react";
import { numerical_series } from "~/utils/common_schemas";
import { normScale } from "~/utils";
import PieSlice from "../PieSlice";
import PieContext from "./context";

interface props extends React.SVGAttributes<SVGSVGElement> {
  data: number[];
  children?: ReactNode;
  sliceProps?: React.SVGProps<SVGPathElement>[];
}

const size = 100;

let Pie: FC<props> = ({ data, sliceProps, children, ...rest }) => {
  numerical_series.parse(data);
  let scaleFn = normScale(data);

  let origin = size / 2;
  let radius = (size / 2) * 0.9;

  return (
    <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" {...rest}>
      <g id="slices">
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
              data-idx={i}
              data-val={e}
              key={i}
              origin={[origin, origin]}
              radius={radius}
              startAngle={startAngle}
              sliceAngle={sliceAngle}
              props={props}
            />
          );
        })}
      </g>
      <PieContext.Provider
        value={{
          data: data,
        }}
      >
        {children}
      </PieContext.Provider>
    </svg>
  );
};

export default Pie;
