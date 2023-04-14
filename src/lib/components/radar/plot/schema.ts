import { useContext } from "react";
import { z } from "zod";
import RadarContext from "../context";

const schema = () => {
  let { max, min, numSpokes } = useContext(RadarContext);
  return z
    .array(
      z
        .number()
        .min(min, `Data value is below minimum of ${min}`)
        .max(max, `Data value is above maximum of ${max}`)
    )
    .length(numSpokes, `Data array is wrong size; should be ${numSpokes}`);
};
export default schema;
