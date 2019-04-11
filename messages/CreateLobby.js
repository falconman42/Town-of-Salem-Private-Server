const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

function joinLobby(socket) {
	let players = TownOfSalem.getGame().getPlayerList();
	if(players.numberOfPlayers >= 15) { //don't let more than 15 people in
		return;
	}
	players.addPlayer(socket);
	let clients = players.getClients();
	let personJoining = players.getUsername(socket); //username of player joining
	console.log(personJoining + ' has joined.');
	
	let response = [];
	if(TownOfSalem.getGame().getPlayerList().numberOfPlayers() == 1) {
		socket.write(u.code(2) + u.code(2) + u.code(1) + u.code(0)); //host
	}
	else {
		socket.write(u.code(2) + u.code(1) + u.code(1) + u.code(0)); //client
		players.sendToAllExcept(socket, u.code(4) + u.code(1) + u.code(2) + personJoining + '*' + u.code(clients.length) + u.code(1) + u.code(0)); //send new player to everyone
	}

	for(var x=0;x<clients.length;x++) {
		if(x == 0)
			socket.write(u.code(4) + u.code(2) + u.code(1) + clients[x].username + '*' + u.code(x+1) + u.code(35) + u.code(0));
		else
			socket.write(u.code(4) + u.code(1) + u.code(1) + clients[x].username + '*' + u.code(x+1) + u.code(1) + u.code(0));
	}
	setTimeout(function() {
		if(!TownOfSalem.dfgfdgdf) { //lol idk something for testing
			//players.fakePlayers(); //fake players
			TownOfSalem.dfgfdgdf = true;
		}
	}, 200);
}

module.exports = joinLobby;