// Do somthing -- take 2 sec
// wait done
// Do somthing -- take 1.5 sec
// wait done
// Do somthing -- take 1 sec
// wait done
// Do somthing -- take 0.5 sec
// wait done

// call back Hell
const list = [];
let delta;
// cb -- callback
function delayRunChain() {
  delta = 2000;
  console.log(`start delay ${delta / 1000}sec`);
  const cb = () => {
    list.push(delta);
    const sum = list.reduce((a, b) => a + b, 0);
    console.log(`after delay ${sum / 1000}sec list=[${list}]`);
    delta = 1500;
    console.log(`start delay ${delta / 1000}sec`);
    const cb = () => {
      list.push(delta);
      const sum = list.reduce((a, b) => a + b, 0);
      console.log(`after delay ${sum / 1000}sec list=[${list}]`);
      delta = 1000;
      console.log(`start delay ${delta / 1000}sec`);
      const cb = () => {
        list.push(delta);
        const sum = list.reduce((a, b) => a + b, 0);
        console.log(`after delay ${sum / 1000}sec list=[${list}]`);
        delta = 500;
        console.log(`start delay ${delta / 1000}sec`);
        const cb = () => {
          list.push(delta);
          const sum = list.reduce((a, b) => a + b, 0);
          console.log(`after delay ${sum / 1000}sec list=[${list}]`);
        }
        setTimeout(cb, delta);
      }
      setTimeout(cb, delta);
    }
    setTimeout(cb, delta);
  }
  setTimeout(cb, delta);
}

delayRunChain();
