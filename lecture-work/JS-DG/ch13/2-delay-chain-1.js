const list = [];
let delta;
function delayRunChain() {
  delta = 2000;
  console.log(`start delay ${delta / 1000}sec`);
  setTimeout(() => {
    list.push(delta);
    const sum = list.reduce((a, b) => a + b, 0);
    console.log(`after delay ${sum / 1000}sec list=[${list}]`);
    delta = 1000;
    console.log(`start delay ${delta / 1000}sec`);
    setTimeout(() => {
      list.push(delta);
      const sum = list.reduce((a, b) => a + b, 0);
      console.log(`after delay ${sum / 1000}sec list=[${list}]`);
    }, delta);
  }, delta);
}
delayRunChain();