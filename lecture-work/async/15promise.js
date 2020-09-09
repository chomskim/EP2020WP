Promise.reject("Reject DATA!")
  .then((result) => {
    console.log("[1] then", result); // won't be called
    return "[2] then payload";
  })
  .finally(() => {
    console.log("[1] finally"); // first finally will be called
    return "[1] finally payload";
  })
  .then((result) => {
    console.log("[2] then", result); // won't be called
    return "[2] then payload";
  })
  .catch((error) => {
    console.log("[1] catch", error); // first catch will be called
    return "[1] catch payload";
  })
  .catch((error) => {
    console.log("[2] catch", error); // won't be called
    return "[2] catch payload";
  })
  .then((result) => {
    console.log("[3] then", result); // will be called
    return "[3] then payload";
  })
  .finally(() => {
    console.log("[2] finally"); // will be called
    return "[2] finally payload";
  })
  .catch((error) => {
    console.log("[3] catch", error); // won't be called
    return "[3] catch payload";
  })
  .then((result) => {
    console.log("[4] then", result); // will be called
    return "[4] then payload";
  });
