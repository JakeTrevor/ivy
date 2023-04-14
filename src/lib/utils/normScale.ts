function normScale(data: number[]) {
  let total = data.reduce((a, b) => a + b, 0);

  return (n: number) => n / total;
}

export default normScale;
