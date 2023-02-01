import type { FC } from "react";
import normScale from "../scales/normScale";

interface props extends React.SVGAttributes<SVGSVGElement> {
  data: number[];
  width?: number;
  rectangleProps?: React.SVGAttributes<SVGRectElement>[];
}

const size = 100;

let Column: FC<props> = ({ data, width = size, rectangleProps, ...rest }) => {
  let scaleFn = normScale(data);

  return (
    <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" {...rest}>
      {data.map((e, i, a) => {
        let prevSum = a.slice(0, i).reduce((a, b) => a + b, 0);

        let y = scaleFn(prevSum) * size;

        let height = scaleFn(e) * size;

        let props = {};
        if (rectangleProps) {
          if (rectangleProps.length > i) {
            props = rectangleProps[i];
          }
        }

        return (
          <rect
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
