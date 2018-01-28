const Test = require('./test.js');
var socketUrl = 'https://socket.etherdelta.com';
var tokenAddr = '0x0d8775f648430679a709e98d2b0cb6250d2887ef';
const test = new Test();

test.init(socketUrl)
.then(() => test.waitForMarket(tokenAddr))
.catch((err) => {
	console.log(err);
	process.exit();
});