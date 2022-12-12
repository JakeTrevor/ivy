import type { FC } from "react";

export interface PlotProps extends React.SVGProps<SVGSVGElement> {
  width: number;
  height: number;
}

let Graph: FC<PlotProps> = ({ children, ...rest }) => {
  return <svg {...rest}>{children}</svg>;
};

export default Graph;
