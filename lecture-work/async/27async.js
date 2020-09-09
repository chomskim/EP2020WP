const a = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve("result of a()"), 1000); // 1s delay
  });

const b = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("result of b()"), 500); // 0.5s delay
  });

const c = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve("result of c()"), 1100); // 1.1s delay
  });

// async generator function
const MyAsyncGenerator = async function* () {
  yield await a();
  yield await b();
  yield await c();
};

// generator object
const gen = MyAsyncGenerator();

// loop on generator in async manner
(async () => {
  for await (let value of gen) {
    console.log(value);
  }
})();
