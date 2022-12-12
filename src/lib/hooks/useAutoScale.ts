import identity from "./identity";

function makeLin(
  data: number[],
  axisSize: number,
  reverse = false,
  paddingPercent = 10,
  debug = false
): [Scale, Scale] {
  if (data.length === 0) {
    return [identity, identity];
  }

  let max = Math.max(...data);
  let min = Math.min(...data);
  let range = max - min;

  let extra = range * (paddingPercent / 100);

  let bottom = min - extra;
  let top = max + extra;

  if (reverse) {
    [top, bottom] = [bottom, top];
  }

  let m = 1 / (top - bottom);
  let c = -m * bottom;
  let scale: Scale = (x) => axisSize * (m * x + c);
  let inverse: Scale = (y) => (y / axisSize - c) / m;

  if (debug) {
    console.info(
      `scale for:`,
      data,
      `range: ${range}, top: ${top}, bottom: ${bottom}`,
      `reverse: ${reverse}`,
      `y= ${m}*x + ${c}`,
      `data to:`,
      data.map((e) => scale(e))
    );
  }

  return [scale, inverse];
}

export default makeLin;

//an example:
let data = [10, 20, 30, 40, 50];
let [scale, inverse] = makeLin(data, 10);
// the factory will place from 6 to 54 on the axis
// 6 will be at coord 0 i.e. scale(6) =0
// 54 will be at coord 10 i.e. scale(54) =10
// because: range = 50-10=40
// padding on either side = range * 10% = 40/10
// so if you plotted the actual data on a graph,
// there would be a comfy margin of 10% above and below the actual line.

// the reverse flag is necessary as SVG coordinates have down = increasing y
// so for a normal graph with 0,0 in the bottom left, you want the lowest data value to have the highest y coordinate.
