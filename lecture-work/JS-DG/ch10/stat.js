const sum = (x, y) => x + y; // function sum(x,y) {return x+y;};
const square = (x) => x * x;

exports.mean = (data) => data.reduce(sum) / data.length; 

exports.stddev = function (d) {
  let m = exports.mean(d);
  return Math.sqrt(
    d.map((x) => x - m).map(square).reduce(sum) / (d.length - 1)
  );
};
// function mean(data) {data.reduce(sum) / data.length;};
// exports.mean = mean;
// exports = {}
// exports = { mean: function(data) {data.reduce(sum) / data.length;} }
// exports = { 
//   mean: function (data) {data.reduce(sum) / data.length;},
//   stddev: function (d) {...}
// };
