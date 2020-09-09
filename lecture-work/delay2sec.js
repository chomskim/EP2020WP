// Define Synchronous Delay function
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const delay2sec = async () => {
  await delay(2000);
  console.log("Waited 2s");
};
(async () => {
  console.log("Start Wait for 2s");
  await delay2sec();
  await delay2sec();
})();
