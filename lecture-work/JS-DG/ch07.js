let empty = []; // An array with no elements
let primes = [2, 3, 5, 7, 11]; // An array with 5 numeric elements
let misc = [1.1, true, "a"]; // 3 elements of various types + trailing comma

let base = 1024;
let table = [base, base + 1, base + 2, base + 3];
console.log(table);

let b = [
  [2, { x: 3, y: 4 }],
  [1, { x: 1, y: 2 }],
];
console.log(b);
let count = [1, , 3]; // Elements at indexes 0 and 2. No element at index 1
console.log(count);
let undefs = [, ,]; // An array with no elements but a length of 2
console.log(undefs);
let a = [1, 2, 3];
b = [0, ...a, 4]; // [0, 1,2,3, 4]
console.log(b);
let original = [1, 2, 3];
let copy = [...original];
console.log(copy);
let same = original;
original[0] = 100;
console.log(same);
console.log(copy);

let digits = [..."0123456789ABCDEF"];
console.log(digits);

a = new Array(); //[]
console.log(a);
a = new Array(5, 4, 3, 2, 1, "testing, testing");
console.log(a);
a = Array.of(5, 4, 3, 2, 1, "testing, testing");
console.log(a);
copy = Array.from(original); // copy
console.log(a[a.length - 1]);

a = []; // Start with an empty array
a.push("zero"); // Add a value at the end. a = ["zero"]
a.push("one", "two");
console.log(a);
delete a[1];
console.log(a);

let letters = [..."Hello world"]; // An array of letters
console.log(letters);
let string = "";
for (let le of letters) {
  string += le;
}
console.log(string);
let uppercase = "";
letters.forEach((le) => {
  // Note arrow function syntax here
  uppercase += le.toUpperCase();
});
console.log(uppercase);
let uppers = letters.map((le) => le.toUpperCase());
console.log(uppers);

uppercase = uppers.reduce((prev, curr) => prev + curr, "");
console.log(uppercase);

let data = [1, 2, 3, 4, 5];
data.forEach(function (v, i, a) {
  a[i] = v + 1;
});
console.log(data);

a = [1, 2, 3];
a.map((x) => x * x);
console.log(a);
console.log(a.map((x) => x * x));

a = [5, 4, 3, 2, 1];
console.log(a.filter((x) => x < 3));

a = [1, 2, 3, 4, 5];
console.log(a.reduce((prev, curr) => prev + curr, 0));

a = [1, 2, 3];
b = [4, 5];
console.log(a.concat(b));
console.log(a);
a.concat(4, 5); // => [1,2,3,4,5]
a.concat([4, 5], [6, 7]); // => [1,2,3,4,5,6,7]; arrays are flattened
a.concat(4, [5, [6, 7]]); // => [1,2,3,4,5,[6,7]]; but not nested arrays
console.log(a);

let stack = []; // stack == []
stack.push(1, 2); // stack == [1,2];
stack.pop(); // stack == [1]; returns 2
stack.push(3); // stack == [1,3]
stack.pop(); // stack == [1]; returns 3
stack.push([4, 5]); // stack == [1,[4,5]]
stack.pop(); // stack == [1]; returns [4,5]
stack.pop();
console.log(stack);

let q = []; // q == []
q.push(1, 2); // q == [1,2]
console.log(q.shift()); // q == [2]; returns 1
q.push(3); // q == [2, 3]
console.log(q.shift()); // q == [3]; returns 2
q.shift(); // q == []; returns 3

q.unshift(1); // a == [1]
q.unshift(2);
console.log(q);

a = [1, 2, 3, 4, 5];
console.log(a.slice(0, 3)); // Returns [1,2,3]
console.log(a.slice(3)); // Returns [4,5]
console.log(a.slice(1, -1)); // Returns [2,3,4]
console.log(a.slice(-3, -2)); // Returns [3]
console.log(a);

a = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(a.splice(4)); // => [5,6,7,8]; a is now [1,2,3,4]
console.log(a);
console.log(a.splice(1, 2)); // => [2,3]; a is now [1,4]
console.log(a);
console.log(a.splice(1, 1)); // => [4]; a is now [1]
console.log(a);



