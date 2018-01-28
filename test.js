const io = require('socket.io-client');

function Test() {
	const self = this;

	self.init = (socketUrl) => new Promise((resolve, reject) => {
		self.socket = io.connect(socketUrl, { transports: ['websocket'] });
		self.socket.on('connect', () => {
		  console.log('socket connected');
		  resolve();
		});

		self.socket.on('disconnect', () => {
		  console.log('socket disconnected');
		});

		setTimeout(() => {
		  reject('Could not connect to socket');
		}, 10000);
	});

	self.waitForMarket = (token) => new Promise((resolve, reject) => {
		setTimeout(() => {
		  reject('Could not get market');
		}, 20000);

		self.socket.off('orders');
		self.socket.off('trades');

		const getMarketAndWait = () => {
		   self.socket.emit('getMarket', { token: token });
		  self.socket.once('market', (market) => {
		  	console.log(market.returnTicker.ETH_BAT);

		    resolve();
		  });
		};

		getMarketAndWait();
	});
}

module.exports = Test;