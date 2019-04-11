const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const States = require('../States.js');

function userLeftGame(socket, data) {
    let players = TownOfSalem.getGame().getPlayerList();
    let id = players.getSocketIndex(socket);
    let state = TownOfSalem.getGame().getState();
    let unknown = (state == States.LOBBY) ? 2 : 1;

    if(state == States.SOMEONEWON) {
        if(data) {
            players.sendToAllExcept(socket, u.code(5) + u.code(2) + u.code(unknown) + u.code(id + 1) + u.code(0));
            players.getClient(socket).endLobby = true;
            require('./SendEndLobbyInfo')(socket);
            return;
        }
    }

    if(id >= 0) {
        players.sendToAllExcept(socket, u.code(5) + u.code(2) + u.code(unknown) + u.code(id + 1) + u.code(0));
    }
    if(state == States.LOBBY || state == States.NAMESELECTION) {
        players.removePlayer(socket);
        if(players.numberOfPlayers() != 0 && state != States.NAMESELECTION) {
            let newHost = u.random(players.getClients());
            newHost.write(u.code(3) + u.code(0));
            players.sendToAll(u.code(13) + u.code(players.getSocketIndex(newHost.socket) + 1) + u.code(0));
        }
		return true;
    }
    else if(id >= 0) {
        let client = players.getClient(socket);
        client.socket = null;
        client.kill(6, client);
    }
    if(data) { 
        socket.write(u.code(40) + u.code(0));
    }
}

module.exports = userLeftGame;