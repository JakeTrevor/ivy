import type { FC } from "react";

export interface PlotProps extends React.SVGProps<SVGSVGElement> {
  width: number;
  height: number;
}

let Graph: FC<PlotProps> = ({
  children,
  transform = "scale(1 -1)",
  ...rest
}) => {
  return (
    <svg transform={transform} {...rest}>
      {children}
    </svg>
  );
};

export default Graph;
