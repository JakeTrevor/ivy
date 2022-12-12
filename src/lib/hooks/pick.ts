export default (data: any, literal: string) => {
  return Object.keys(data)
    .filter((key) => key.startsWith(literal))
    .reduce((obj: any, key) => {
      let newkey = key.substring(literal.length);
      obj[newkey] = data[key];
      return obj;
    }, {});
};
