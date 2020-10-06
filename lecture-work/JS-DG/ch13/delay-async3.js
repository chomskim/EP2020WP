function delay(delta) {
    return new Promise((resolve) => {
        console.log(`start delay for ${delta / 1000}sec`);
        setTimeout(resolve, delta, delta);
    });
}

const list = [];
let delta;

function delayAction(delta) {
    list.push(delta);
    console.log(`after delay ${delta / 1000}sec list=[${list}]`);
    return delta
}
const parallelDealy = async () => {
    await Promise.all([
        delay(2000).then(delayAction),
        delay(1500).then(delayAction),
        delay(1000).then(delayAction),
        delay(500).then(delayAction),
    ]);
    console.log(`After Promose all list=[${list}]`);
}
parallelDealy();
