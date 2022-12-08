// typescript voodoo time

type annotated<T, L> = {
  [Property in keyof T as `${L}${T}`]: T[Property];
};

type titleProps = annotated<React.SVGProps<SVGTextElement>, "title_">;
type labelProps = annotated<React.SVGProps<SVGTextElement>, "label_">;

type gridlineProps = annotated<React.SVGProps<SVGPolylineElement>, "gridline_">;
type axisLineProps = annotated<React.SVGProps<SVGPolylineElement>, "axisLine_">;

type AxisElementProps = titleProps & labelProps & gridlineProps & axisLineProps;
