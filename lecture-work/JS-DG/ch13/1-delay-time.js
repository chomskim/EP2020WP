const list = [];
function delayRun(delta) {
  console.log(`start delay ${delta / 1000}sec`);
  const cb = (del) => {
    list.push(del);
    console.log(`after delay ${del / 1000}sec, list=[${list}]`);
  };
  setTimeout(cb, delta, delta);
};

delayRun(2000);
delayRun(1500);
delayRun(1000);
delayRun(500);
