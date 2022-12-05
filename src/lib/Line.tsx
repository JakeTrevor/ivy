import { FC, useContext, useEffect, useState } from "react";
import { chartContext as ctx } from "./Chart";

// unfortunate ts voodoo
interface lineProps extends Omit<React.SVGProps<SVGPolylineElement>, "points"> {
  points: Point[];
  x?: string;
  y?: string;
}

let Line: FC<lineProps> = ({ points, x = "x", y = "y", ...rest }) => {
  let chartContext = useContext(ctx);
  let [scaledPoints, setScaled] = useState(points);
  let { axes, setData } = chartContext;

  useEffect(() => {
    setData((old) => [...old, { axes: [x, y], data: points }]);
  }, []);

  useEffect(() => {
    let scaleX = axes[x];
    let scaleY = axes[y];

    console.log(scaleY(1));

    setScaled(points.map((p) => [scaleX(p[0]), scaleY(p[1])]));
  }, [axes]);

  rest = {
    ...rest,
    fill: rest.fill || "none",
    stroke: rest.stroke || "black",
  };

  return <polyline points={scaledPoints.join(" ")} {...rest}></polyline>;
};

export default Line;
