let timestamp = Date.now(); // The current time as a timestamp (a number).
let now = new Date(); // The current time as a Date object.
let ms = now.getTime(); // Convert to a millisecond timestamp.
let iso = now.toISOString();
console.log(timestamp);
console.log(now);
console.log(ms);
console.log(iso.split("T")[0]);
console.log(iso.substring(0, 10));
let euro = "€";
let love = "❤";
console.log(euro);
console.log(love);

console.log("one\
long\
line");
console.log(`the newline character at the end of this line
is included literally in this string`);

let s = "Hello, world"; // Start with some text.
// Obtaining portions of a string
console.log(s.substring(1, 4)); // => "ell": the 2nd, 3rd, and 4th characters.
console.log(s.slice(1, 4)); // => "ell": same thing
console.log(s.slice(-3)); // => "rld": last 3 characters
console.log(s.split(", "));
console.log(s[s.length - 1]);

let name = "Bill";
let greeting = `Hello ${name}.`;
console.log(greeting);

console.log(!!undefined);
console.log(!!null);
console.log(!!0);
console.log(!!-0);
console.log(!!NaN);
console.log(!!"");
let o = { x: 1 }; // Start with an object
o.x = 2; // Mutate it by changing the value of a property
o.y = 3;
if (o) console.log("o is defined", o);
else console.log("o is undefined");

console.log(typeof 42);
console.log(typeof "");
console.log(typeof {});
console.log(typeof []);

let a = [1, 2, 3]; // Arrays are also mutable
a[0] = 0; // Change the value of an array element
a[3] = 4;
console.log(a);

a = ["a", "b", "c"]; // An array we want to copy
let b = []; // A distinct array we'll copy into
for (let i = 0; i < a.length; i++) {
  // For each index of a[]
  b[i] = a[i]; // Copy an element of a into b
}
let c = Array.from(b);
console.log(a);
console.log(b);
console.log(c);
let d = a.map((x) => x);
console.log(d);
let e = [];
a.forEach((x) => e.push(x));
console.log(e);

console.log({ x: 1, y: 2 }.toString());
console.log(JSON.stringify({ x: 1, y: 2 }));
console.log(typeof JSON.stringify({ x: 1, y: 2 }));

let obj = { x: 1, y: 2 };
let ostr = JSON.stringify(obj);
console.log(ostr);
let obj1 = JSON.parse(ostr);
console.log(obj === obj1);
console.log(obj.x === obj1.x && obj.y === obj1.y);
console.log(JSON.stringify(obj1));

let [x, y] = [1, 2]; // Same as let x=1, y=2
console.log(x, y);
[x, y] = [x + 1, y + 1]; // Same as x = x + 1, y = y + 1
console.log(x, y);
[x, y] = [y, x]; // Swap the value of the two variables
console.log(x, y);

let obj2 = { x: 1, y: 2 }; // The object we'll loop over
for (const [name, value] of Object.entries(obj2)) {
  console.log(name, value); // Prints "x 1" and "y 2"
}
console.log(JSON.stringify(Object.entries(obj2)));

[x, ...y] = [1,2,3,4]
console.log(x);
console.log(y);
console.log(...[2,3,4]);
let sp1 = [...[2,3,4]];
console.log(sp1);
sp1 = { ...{x:1, y:2}}
console.log(sp1);

let [first, ...rest] = "Hello";
console.log(first,rest);

let transparent = {r: 0.1, g: 0.2, b: 0.3, a: 1.0}; // A RGBA color
let {r:r, g:g, b:b1} = transparent; // r == 0.0; g == 0.0; b == 0.0
console.log(r, g, b1);

x=1;
y=2;
console.log(x,y);
obj = {x,y};
console.log(obj);
obj = {x:x, y:y};
console.log(obj);

const {sin, cos, tan} = Math;
console.log(Math.sin(0.1));
console.log(sin(0.1));

let points = [{x: 1, y: 2}, {x: 3, y: 4}]; // An array of two point objects
let [{x: x1, y: y1}, {x: x2, y: y2}] = points;
console.log(x1,y1,x2,y2);

