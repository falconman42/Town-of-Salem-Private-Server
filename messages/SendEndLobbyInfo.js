const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

function sendEndLobbyInfo(socket) {
    let player = TownOfSalem.getGame().getPlayerList().getClient(socket);
    let win = player.won ? 2 : 1;
	let message = u.code(171) + '242,' + u.code(1) + u.code(1) + u.code(win) + 'Q';
	//game mode id, winning faction id, result (2 for win 1 for loss)
    let players = TownOfSalem.getGame().getPlayerList();
    let clients = players.getClients();
    for(var x=0;x<clients.length;x++) {
        message += '(' + clients[x].ign + ',' + clients[x].username + ',' + u.code(clients[x].position + 1) + ',' + u.code(clients[x].roleIndex + 1) + '),';
    }
    message = message.slice(0, -1);
    message += u.code(0);
	console.log(message);
    socket.write(message);
}

module.exports = sendEndLobbyInfo;