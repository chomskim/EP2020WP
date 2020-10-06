const axios = require("axios");

console.log('===Using Promise===');
axios.get("https://api.randomuser.me/?nat=US&results=1")
	.then((res) => res.data.results)
	.then(console.log)
	.catch(console.error);

console.log('===Using async===');
const getFakePerson = async () => {
	let res = await axios.get("https://api.randomuser.me/?nat=US&results=1");
	let { results } = res.data;
	console.log('Using async', results);
};
getFakePerson();
