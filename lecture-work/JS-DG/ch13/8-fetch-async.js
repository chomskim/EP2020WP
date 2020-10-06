const fetch = require("node-fetch");

console.log('===Using Promise===');
fetch("https://api.randomuser.me/?nat=US&results=1")
	.then((res) => res.json())
	.then((json) => json.results)
	.then(console.log)
	.catch(console.error);

console.log('===Using async===');
const getFakePerson = async () => {
	let res = await fetch("https://api.randomuser.me/?nat=US&results=1");
	let { results } = await res.json();
	console.log('Using async', results);
};
getFakePerson();
