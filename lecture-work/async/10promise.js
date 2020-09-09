// setTimeout with `0` delay
setTimeout(() => console.log("setTimeout callback"), 0);

// immediately resolved promise
const promiseA = new Promise((resolve) => resolve());

// normal flow
console.log("I am sync job.");

// promise listener
promiseA.then(() => {
  console.log("promiseA success:");
});

// normal flow
console.log("I am good sync job.");
console.log("I am awesome sync job too.");
