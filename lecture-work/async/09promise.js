const promiseA = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("something bad happened a()");
  }, 1000); // reject after 1 second
});

// normal flow
console.log("I am sync job.");

promiseA
  .then((result) => {
    console.log("promiseA success:", result);
  })
  .catch((error) => {
    console.log("promiseA error:", error);
  })
  .finally(() => {
    console.log("a() is done!");
  });

// normal flow
console.log("I am good sync job.");
console.log("I am awesome sync job too.");
