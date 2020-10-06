// Do somthing -- take 2 sec
// wait done
// Do somthing -- take 1.5 sec
// wait done
// Do somthing -- take 1 sec
// wait done
// Do somthing -- take 0.5 sec
// wait done
function delay(delta) {
    return new Promise((resolve) => setTimeout(resolve, delta));
}

const list = [];

async function delayRunChain() {
    let delta = 2000;
    console.log(`start delay for ${delta/1000}sec`);
    await delay(delta);
    list.push(delta);
    let sum = list.reduce((a, b) => a + b, 0);
    console.log(`after delay ${sum / 1000}sec list=[${list}]`);

    delta = 1500;
    await delay(delta);
    list.push(delta);
    sum = list.reduce((a, b) => a + b, 0);
    console.log(`after delay ${sum / 1000}sec list=[${list}]`);
    
    delta = 1000;
    await delay(delta);
    list.push(delta);
    sum = list.reduce((a, b) => a + b, 0);
    console.log(`after delay ${sum / 1000}sec list=[${list}]`);
    
    delta = 500;
    await delay(delta);
    list.push(delta);
    sum = list.reduce((a, b) => a + b, 0);
    console.log(`after delay ${sum / 1000}sec list=[${list}]`);
}

delayRunChain();
