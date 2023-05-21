import { createContext } from "react";

interface context {
  data: number[];
}

let PieContext = createContext<context>({
  data: [],
});

export default PieContext;
