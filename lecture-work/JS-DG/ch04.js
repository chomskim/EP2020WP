let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(matrix);

let rectangle = {
  upperLeft: { x: 2, y: 2 },
  lowerRight: { x: 4, y: 5 },
};
console.log(JSON.stringify(rectangle));

function square(x) { return x * x; };
console.log(square(3));
const square1 = function(x) { return x * x; };
console.log(square1(3));
const square2 = x=>x * x;
console.log(square2(3));
const square3 = (x)=> { return x * x; };
console.log(square3(3));

const createObj = (x,y) => ({x,y}); // return {x:x, y:y}
console.log(createObj(3,4));

let a = { b: null };
console.log(a.b?.c.d);
console.log(a.b === null ? undefined : a.b.c.d)

a ={b:{c:{d:99}}}
console.log(a.b?.c.d);
console.log(a.b === null ? undefined : a.b.c.d)

// IIFE -- Immediately-invoked Function Expression
console.log(((x)=> { return x * x; })(3));

(() => {
  let a = 1
  console.log(a);
})();
(() => {
  let a = 1
  console.log(a);
})();

