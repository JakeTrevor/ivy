import type { FC } from "react";

let Cross: FC<React.SVGAttributes<SVGPathElement>> = ({
  x = 0,
  y = 0,
  stroke = "black",
  scale = 0.1,
  ...rest
}) => {
  x = Number(x);
  y = Number(y);
  return (
    <svg x={x - 5} y={y - 5}>
      <path d="M1 1L11 11M1 11L11 1" stroke={stroke} {...rest} />
    </svg>
  );
};

export default Cross;
