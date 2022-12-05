//   scale(bottom) = 0;
//   scale(top) = 1;
export function autoScale(
  data: number[],
  axisSize: number,
  paddingPercent = 10
) {
  let max = Math.max(...data);
  let min = Math.min(...data);
  let range = max - min;

  let extra = range * (paddingPercent / 100);

  let bottom = min - extra;
  let top = max + extra;

  let m = 1 / (top - bottom);
  let c = -m * bottom;
  let scale = (x: number) => axisSize * (m * x + c);

  console.log(`scale for ${data}`);
  console.log(`range: ${range}, top: ${top}, bottom: ${bottom}`);
  console.log(`y= ${m}*x + ${c}`);
  console.log(`data to: ${data.map((e) => scale(e))}`);

  return scale;
}
