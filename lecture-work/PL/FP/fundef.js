function add(x, y) {
  return x + y;
}
console.log(add(1, 2));
console.log(add(1.5, 2.5));
console.log(add("Hello ", "World"));
console.log(add([1, 2, 3], [4, 5, 6]));

const plus = (x, y) => x + y;
console.log(plus(1, 2));
console.log(plus(1.5, 2.5));
console.log(plus("Hello ", "World"));
console.log(plus([1, 2, 3], [4, 5, 6]));

function fst(x, y) {
  return x;
}
function snd(x, y) {
  return y;
}
console.log(fst(1, 2));
console.log(fst(1.5, 2));
console.log(fst("Hello ", 2));
console.log(fst([1, 2, 3], "World"));

console.log(snd([1, 2, 3], 2));
console.log(snd(1.5, 2.5));
console.log(snd(1, "World"));
console.log(snd(1.5, [4, 5, 6]));

let d = 1;
function incd(x) {
  return x + d;
}
console.log(`incd(10)=${incd(10)}`);
d = 2;
console.log(`incd(10)=${incd(10)}`);

const incx = (x) => x + d;
function fun(x, f) {
  console.log(`function fun this=${this}`);
  return f(x);
}
console.log(`fun(10, incx)=${fun(10, incx)}`);
d = 3;
console.log(`fun(10, incx)=${fun(10, incx)}`);
console.log(`fun(10, x => x+d)=${fun(10, (x) => x + d)}`);


