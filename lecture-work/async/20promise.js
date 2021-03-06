const a = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve("result of a()"), 1000); // 1s delay
  });

const b = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve("result of b()"), 500); // 0.5s delay
  });

const c = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve("result of c()"), 1100); // 1.1s delay
  });

// race a(), b(), c()
Promise.race([a(), b(), c()])
  .then((data) => {
    console.log("success: ", data);
  })
  .catch((error) => {
    console.log("error: ", error);
  });
