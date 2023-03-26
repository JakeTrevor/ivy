import { FC, SVGProps, useContext } from "react";
import { z } from "zod";
import { unit_direction } from "~/functions/unit_direction";
import RadarContext from "../context";

interface props extends SVGProps<SVGPolygonElement> {
  data: number[];
}

let Line: FC<props> = ({ data, ...rest }) => {
  let { scaleFn, radius, origin, max, min, numSpokes } =
    useContext(RadarContext);

  z.array(
    z
      .number()
      .min(min, `Data value is below minimum of ${min}`)
      .max(max, `Data value is above maximum of ${max}`)
  )
    .length(
      numSpokes,
      `Data array is wrong size; should be ${numSpokes} but is actually ${data.length} `
    )
    .parse(data);

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
