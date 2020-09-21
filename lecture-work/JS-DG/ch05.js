let a = ["a", "b", "c"]; // An array we want to copy
let b = []; // A distinct array we'll copy into
for (var i = 0; i < a.length; i++) {
  // For each index of a[]
  b.push(a[i]); // Copy an element of a into b
}
console.log(i);

let data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sum = 0;
for (let element of data) {
  sum += element;
}
console.log(sum);

let o = { x: 1, y: 2, z: 3 };
let keys = "";
let keyList = [];
for (let k of Object.keys(o)) {
  keys += k;
  keyList.push(k);
}
console.log(keys);
console.log(keyList);

let pairs = "";
for (let [k, v] of Object.entries(o)) {
  pairs += k + v;
}
console.log(pairs);

for (let p in o) {
  // Assign property names of o to variable p
  console.log(o[p]); // Print the value of each property
}
const prompt = require("prompt");

prompt.start();

try {
  // Ask the user to enter a number
  prompt.get(["Please enter a positive integer"], (err, res) => {
    // Compute the factorial of the number, assuming the input is valid
    let f = factorial(parseInt(res));
    // Display the result
    console.log(n + "! = " + f);
  });
} catch (ex) {
  // If the user's input was not valid, we end up here
  console.log(ex); // Tell the user what the error is
}
