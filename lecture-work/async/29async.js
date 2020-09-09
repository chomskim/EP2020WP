const p = Promise.resolve();

(async () => {
  await p;
  console.log("\t\tafter:wait");
})();

p.then(() => {
  console.log("\t\ttick:a");
}).then(() => {
  console.log("\t\ttick:b");
});
