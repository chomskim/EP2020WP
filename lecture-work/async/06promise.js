const promiseA = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("result of a()");
  }, 1000); // resolve after 1 second
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
