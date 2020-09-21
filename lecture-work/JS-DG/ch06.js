let empty = {}; // An object with no properties
let point = { x: 0, y: 0 }; // Two numeric properties
//let p2 = { x: point.x, y: point.y + 1 }; // More complex values
let book = {
  "main title": "JavaScript", // These property names include spaces,
  "sub-title": "The Definitive Guide", // and hyphens, so use string literals.
  for: "all audiences", // for is reserved, but no quotes.
  author: {
    // The value of this property is
    firstname: "David", // itself an object.
    surname: "Flanagan",
  },
};
console.log(book["main title"]);
console.log(book["for"]);
console.log(book.author);
console.log(book.author.firstname);
console.log(book.author["surname"]);

let o = { x: 1, y: 2, z: 3 }; // Three enumerable own properties
o.propertyIsEnumerable("toString"); // => false: not enumerable
for (let p in o) {
  // Loop through the properties
  console.log(p + o[p]); // Prints x, y, and z, but not toString
}

console.log(book);
const strBook = JSON.stringify(book);
console.log(strBook);
console.log(JSON.stringify(book, null, 2));
const newBook = JSON.parse(strBook);
console.log(newBook);
console.log(book === newBook);
console.log(book == newBook);
console.log(Object.is(book, newBook));
const num = 100000000000000;
console.log(num.toLocaleString());
console.log(parseInt(num.toLocaleString().replace(/,/g, "")));
//console.log(parseInt(num.toLocaleString().replaceAll(',','')));

const p =
  "The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?";
console.log(p.replace("dog", "monkey"));

let x = 1;
let y = 2;
let o1 = {
  x: x,
  y: y,
};
console.log(o1);
o1 = { x, y };
console.log(o1);

const PROPERTY_NAME = "p1";
function computePropertyName() {
  return "p" + 2;
}
console.log(computePropertyName());
let px = {
  [PROPERTY_NAME]: 1,
  [computePropertyName()]: 2,
};
console.log(px);

let position = { x: 0, y: 0 };
let dimensions = { width: 100, height: 75 };
let rect = { ...position, ...dimensions };
console.log(rect);
console.log(rect.x + rect.y + rect.width + rect.height); // => 175

let o2 = { x: 1 };
let p2 = { x: 0, y: 2, ...o2 };
console.log(p2);
p2.x; // => 1: the value from object o overrides the initial value
let q2 = { ...p2, x: 2 };
q2.x;
console.log(q2);

let square = {
  area: function () {
    return this.side * this.side;
  },
  side: 10,
};
console.log(square.area()); // => 100

square = {
  area() {
    return this.side * this.side;
  },
  side: 10,
};
console.log(square.area()); // => 100

square = {
  area: () => {
    return this.side * this.side;
  },
  side: 10,
};
console.log(square.area()); // => 100

const paip = {
  name: "Paradigms of Artificial Intelligence Programming",
  author: "Peter Norvig",
  isbn: 1558601910,
};
console.log(paip);
const { name: n, isbn: id } = paip;
console.log(n, id);
const { name, isbn } = paip; //const { name:name, isbn:isbn} = paip;
console.log(name, isbn);


