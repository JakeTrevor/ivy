import type { FC } from "react";
import { SIZE } from "~/CONSTANTS";
import { normScale } from "~/utils";
import { NumericalSeries, numerical_series } from "~/utils/common_schemas";

interface props extends React.SVGAttributes<SVGSVGElement> {
  data: NumericalSeries;
  width?: number;
  rectangleProps?: React.SVGAttributes<SVGRectElement>[];
}

let Column: FC<props> = ({ data, width = SIZE, rectangleProps, ...rest }) => {
  numerical_series.parse(data);
  let scaleFn = normScale(data);

  return (
    <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" {...rest}>
      {data.map((e, i, a) => {
        let prevSum = a.slice(0, i).reduce((a, b) => a + b, 0);

        let y = scaleFn(prevSum) * SIZE;

        let height = scaleFn(e) * SIZE;

        let props = {};
        if (rectangleProps) {
          if (rectangleProps.length > i) {
            props = rectangleProps[i];
          }
        }

        return (
          <rect
            key={i}
            x={0}
            width={width}
            y={y}
            height={height}
            fill="turquoise"
            stroke="black"
            {...props}
          ></rect>
        );
      })}
    </svg>
  );
};

export default Column;
