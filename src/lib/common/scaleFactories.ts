export function makeLin(
  data: number[],
  axisSize: number,
  paddingPercent = 10,
  debug = false
): Scale {
  if (data.length === 0) {
    return (n) => n;
  }

  let max = Math.max(...data);
  let min = Math.min(...data);
  let range = max - min;

  let extra = range * (paddingPercent / 100);

  let bottom = min - extra;

  let top = max + extra;

  let m = 1 / (top - bottom);
  let c = -m * bottom;
  let scale: Scale = (x) => axisSize * (m * x + c);

  if (debug) {
    console.info(
      `scale for:`,
      data,
      `range: ${range}, top: ${top}, bottom: ${bottom}`,
      `y= ${m}*x + ${c}`,
      `data to:`,
      data.map((e) => scale(e))
    );
  }

  return scale;
}

//an example:
let data = [10, 20, 30, 40, 50];
let s = makeLin(data, 10);
// the factory will place from 6 to 54 on the axis
// 6 will be at coord 0 i.e. s(6) =0
// 54 will be at coord 10 i.e. s(54) =10
// because: range = 50-10=40
// padding on either side = range * 10% = 40/10
// so if you plotted the actual data on a graph,
// there would be a comfy margin of 10% above and below the actual line.

export function makeLog(
  data: number[],
  axisSize: number,
  paddingPercent = 10
): Scale {
  if (data.length === 0) {
    return (n) => n;
  }

  let max = Math.max(...data);
  let min = Math.min(...data);
  let range = max - min;

  let extra = range * (paddingPercent / 100);

  let bottom = min - extra;

  let top = max + extra;

  let m = 1 / Math.log(top - bottom);
  let c = -m * Math.log(bottom);

  let scale: Scale = (x) => axisSize * (m * Math.log(x) + c);
  return scale;
}
