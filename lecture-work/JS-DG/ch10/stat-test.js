const stat = require("./stat.js");
const stat1 = require("./stat1.js");
console.log(stat);
console.log(stat1);

let mea = stat.mean([1, 3, 5, 7, 9]); // => 5
let std = stat.stddev([1, 3, 5, 7, 9]); // => Math.sqrt(10)
console.log(mea);
console.log(std);

mea = stat1.mean([1, 3, 5, 7, 9]); // => 5
std = stat1.stddev([1, 3, 5, 7, 9]); // => Math.sqrt(10)
console.log(mea);
console.log(std);

const { mean } = require("./stat.js");
const { stddev } = require("./stat1.js");
mea = mean([1, 3, 5, 7, 9]); // => 5
std = stddev([1, 3, 5, 7, 9]); // => Math.sqrt(10)
console.log(mea);
console.log(std);