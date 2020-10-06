const sum = (x, y) => x + y;
const square = (x) => x * x;

const mean = (data) => data.reduce(sum) / data.length;
const stddev = function (d) {
  let m = mean(d);
  return Math.sqrt(
    d.map((x) => x - m).map(square).reduce(sum) / (d.length - 1)
  );
};

export default { mean, stddev };
