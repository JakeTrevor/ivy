export function getDataset(
  data: { [id: string]: Dataset },
  id: string,
  direction: string
) {
  return Object.values(data)
    .filter((e) => e.axes.includes(id))
    .flatMap((e) => {
      if (!Array.isArray(e.data[0])) return e.data as number[];

      let arr = e.data as Point[];

      let get = direction === "h" ? (a: Point) => a[0] : (a: Point) => a[1];
      return arr.map(get);
    });
}
