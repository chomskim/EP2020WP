// Do somthing -- take 2 sec
// wait done
// Do somthing -- take 1.5 sec
// wait done
// Do somthing -- take 1 sec
// wait done
// Do somthing -- take 0.5 sec
// wait done
function delay(delta) {
	return new Promise((cb) => setTimeout(cb, delta, delta));
}

const list = [];

function delayRunChain() {
	console.log(`start delay for 2sec`);
	delay(2000)
		.then((delta) => {
			list.push(delta);
			const sum = list.reduce((a, b) => a + b, 0);
			console.log(`after delay ${sum / 1000}sec list=[${list}]`);
			return delay(1500);
		})
		.then((delta) => {
			list.push(delta);
			const sum = list.reduce((a, b) => a + b, 0);
			console.log(`after delay ${sum / 1000}sec list=[${list}]`);
			return delay(1000);
		})
		.then((delta) => {
			list.push(delta);
			const sum = list.reduce((a, b) => a + b, 0);
			console.log(`after delay ${sum / 1000}sec list=[${list}]`);
			return delay(500);
		})
		.then((delta) => {
			list.push(delta);
			const sum = list.reduce((a, b) => a + b, 0);
			console.log(`after delay ${sum / 1000}sec list=[${list}]`);
		})
		.catch((err) => {
			console.log(`Error when delta=${delta}, list=[${list}]`);
		});
}

delayRunChain();
