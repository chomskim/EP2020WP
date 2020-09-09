const promiseA = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("something bad happened a()");
  }, 1000); // reject after 1 second
});

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
