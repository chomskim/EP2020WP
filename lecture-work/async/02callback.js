function a() {
  setTimeout(function () {
    console.log("result of a()");
  }, 1000); // 1 second delay
}

function b() {
  setTimeout(function () {
    console.log("result of b()");
  }, 500); // 0.5 second delay
}

function c() {
  setTimeout(function () {
    console.log("result of c()");
  }, 1200); // 1.1 second delay
}

// call in sequence
a();
console.log("a() is done!");

b();
console.log("b() is done!");

c();
console.log("c() is done!");
