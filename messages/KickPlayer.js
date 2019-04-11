const TownOfSalem = require('../TownOfSalem.js');
const u  = require('../Utilities.js');

function kickPlayer(name) {
	let players = TownOfSalem.getGame().getPlayerList();
	let player = players.getSocket(name);
	if(player && player != players.getIndex(0).socket && require('./UserLeftGame')(player)) { //make sure host can't kick themself
		players.sendToAll(u.code(77) + u.code(8) + `Host has kicked ${name}.` + u.code(0));
		player.write(u.code(77) + u.code(8) + `You have been kicked.` + u.code(0));
	}
}

module.exports = kickPlayer;