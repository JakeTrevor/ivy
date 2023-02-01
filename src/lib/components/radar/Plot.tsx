import { FC, ReactNode, useContext } from "react";
import { unit_direction } from "../../functions/unit_direction";
import RadarContext from "./context";

interface props extends React.SVGProps<SVGPolygonElement> {
  data: number[];
  dots?: boolean;
  markerProps?: React.SVGProps<SVGCircleElement>;
}

let RadarPlot: FC<props> = ({ data, dots = false, markerProps, ...rest }) => {
  let { scaleFn, radius, origin } = useContext(RadarContext);

  let inter_spoke_angle = (2 * Math.PI) / data.length;

  let path = data.map((e, i) => {
    let scaleFactor = scaleFn(e) * radius;
    let angle = i * inter_spoke_angle;
    let direction = unit_direction(angle);
    return direction.map((e) => e * scaleFactor).map((e, i) => e + origin[i]);
  });

  return (
    <>
      {dots && (
        <marker
          id="marker"
          viewBox=" 0 0 2 2"
          refX={1}
          refY={1}
          markerHeight={2}
          markerWidth={2}
        >
          <circle cx={1} cy={1} r={1} {...markerProps} />
        </marker>
      )}
      <polygon
        points={path.join(" ")}
        fill="turquoise"
        stroke="black"
        markerMid={dots ? "url(#marker)" : ""}
        markerEnd={dots ? "url(#marker)" : ""}
        {...rest}
      />
    </>
  );
};

export default RadarPlot;
