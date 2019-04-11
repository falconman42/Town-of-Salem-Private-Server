const TownOfSalem = require('../TownOfSalem.js');

function chatMessageParser(socket, message) {
	let player = TownOfSalem.getGame().getPlayerList().getIndex(0).socket;
	if(socket != player || !message.startsWith('/')) {
		return false;
	}
	
	message = message.substr(1).split(' ');
	let command = message.shift();
	let params = message.join(' ');
	console.log(message + ' ' + params);
	
	switch(command) {
		case 'start':
			require('./StartGame')();
		return true;
		
		case 'kick':
			require('./KickPlayer')(params);
		return true;
	}
}

module.exports = chatMessageParser;