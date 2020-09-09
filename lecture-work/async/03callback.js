function a(callback) {
  setTimeout(() => {
    console.log("result of a()");
    callback();
  }, 1000); // 1 second delay
}

function b(callback) {
  setTimeout(() => {
    console.log("result of b()");
    callback();
  }, 500); // 0.5 second delay
}

function c(callback) {
  setTimeout(() => {
    console.log("result of c()");
    callback();
  }, 1200); // 1.1 second delay
}

// call in sequence
a(() => console.log("a() is done!"));
b(() => console.log("b() is done!"));
c(() => console.log("c() is done!"));
