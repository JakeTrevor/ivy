import type { FC } from "react";

interface props {
  ticks: ScaleLabel[];
  labelProps: React.SVGProps<SVGTextElement>;
}

let AxisLabel: FC<props> = ({ ticks, labelProps }) => {
  return (
    <>
      {ticks.map(({ x, y, text }, i) => {
        let attrs = {
          x,
          y,
          "transform-origin": `${x} ${y}`,
          "text-anchor": "end",
        };

        return (
          <text dominantBaseline="Hanging" {...attrs} {...labelProps}>
            {text}
          </text>
        );
      })}
    </>
  );
};

export default AxisLabel;
