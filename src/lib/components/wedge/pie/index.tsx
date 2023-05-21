import type { ReactNode } from "react";
import { ORIGIN, SIZE } from "~/CONSTANTS";
import { normScale } from "~/utils";
import { numerical_series } from "~/utils/common_schemas";
import PieSlice from "../Wedge";
import Labels from "./Labels";
import PieContext from "./context";

interface props extends React.SVGAttributes<SVGSVGElement> {
  data: number[];
  children?: ReactNode;
  sliceProps?: React.SVGProps<SVGPathElement>[];
}

const Pie = ({ data, sliceProps, children, ...rest }: props) => {
  numerical_series.parse(data);
  let scaleFn = normScale(data);

  let radius = (SIZE / 2) * 0.9;

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
              data-index={i}
              data-val={e}
              key={i}
              origin={[ORIGIN, ORIGIN]}
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

Pie.Labels = Labels;

export default Pie;
