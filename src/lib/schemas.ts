import { z } from "zod";

export const numerical_series = z
  .array(
    z.number({ invalid_type_error: "Every data point must be a number" }),
    { invalid_type_error: "Data must be a numerical array" }
  )
  .describe("A 1d numerical array");

export const text_series = z.array(z.coerce.string(), {
  invalid_type_error: "Text series must be an array",
});

export const zero_point = z
  .number({
    invalid_type_error: "A zeroPoint must be a number",
  })
  .describe("The value where the 'baseline' will be set for a given ");

export const point_2d = z
  .tuple([z.number(), z.number()])
  .describe("A point in 2d space");

export const series = z.union([
  z.object({
    data: numerical_series,
    zero_point: zero_point,
  }),
  numerical_series,
  text_series,
]);

export const series_2d = z.object({ x: series, y: series });

export type NumericalSeries = z.infer<typeof numerical_series>;
export type TextSeries = z.infer<typeof text_series>;
export type ZeroPoint = z.infer<typeof zero_point>;
export type Point2D = z.infer<typeof point_2d>;
export type Series = z.infer<typeof series>;
export type Series2D = z.infer<typeof series_2d>;
