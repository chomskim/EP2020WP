const list = [];
function delayRun(delta) {
  console.log(`start delay ${delta / 1000}sec`);
  const cb = () => {
    list.push(delta);
    console.log(`after delay ${delta / 1000}sec, list=[${list}]`);
  };
  setTimeout(cb, delta);
};

delayRun(2000);
delayRun(1500);
delayRun(1000);
delayRun(500);
