import { FC, SVGProps, useContext } from "react";
import { unit_direction } from "~/utils";
import RadarContext from "../context";
import schema from "./schema";

interface props extends SVGProps<SVGPolygonElement> {
  data: number[];
}

let Line: FC<props> = ({ data, ...rest }) => {
  let { scaleFn, radius, origin, numSpokes } = useContext(RadarContext);

  schema().parse(data);

  let inter_spoke_angle = (2 * Math.PI) / numSpokes;

  let path = data.map((e, i) => {
    let scaleFactor = scaleFn(e) * radius;
    let angle = i * inter_spoke_angle;
    let direction = unit_direction(angle);
    return direction.map((e) => e * scaleFactor).map((e, i) => e + origin[i]);
  });

  return (
    <>
      <polygon
        points={path.join(" ")}
        fill="turquoise"
        stroke="black"
        {...rest}
      />
    </>
  );
};

export default Line;
