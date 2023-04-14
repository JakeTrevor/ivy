function classnames(cnames: string[]) {
  return cnames.map((e) => {
    return { className: e };
  });
}

export default classnames;
