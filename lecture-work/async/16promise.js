Promise.resolve("Fulfill DATA!")
  .then((result) => {
    console.log("[1] then", result);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Nested promise data!");
      }, 1000); // resolve after 1 second
    });
  })
  .then((result) => {
    console.log("[2] then", result);
  });
