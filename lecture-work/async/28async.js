const promiseA = new Promise((resolve) => {
  console.log("ExecutorA: Begin!");
  resolve("A");
  console.log("ExecutorA: End!");
});

const promiseB = new Promise((resolve) => {
  console.log("ExecutorB: Begin!");
  resolve("B");
  console.log("ExecutorB: End!");
});

// Promise: classical approach
const getPromiseClassical = () => {
  console.log("getPromiseClassical()");

  return promiseA.then((resultA) => {
    console.log("promiseClassical: A");

    return promiseB.then((resultB) => {
      console.log("promiseClassical: B");
      console.log("Classical: Promises resolved: ", resultA, resultB);
    });
  });
};
const promiseClassical = getPromiseClassical();

// Promise: async/await
const getPromiseAsync = async () => {
  console.log("getPromiseAsync()");

  const resultA = await promiseA;
  console.log("promiseAsync: A");

  const resultB = await promiseB;
  console.log("promiseAsync: B");
  console.log("Async: Promises resolved: ", resultA, resultB);
};
const promiseAsync = getPromiseAsync();
