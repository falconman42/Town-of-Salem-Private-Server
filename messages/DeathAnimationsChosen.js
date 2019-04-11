const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

function deathAnmimationsChosen(socket) {
    let players = TownOfSalem.getGame().getPlayerList();
    let numberOfPlayers = players.numberOfPlayers();
    let message = u.code(168);
    for(var x=0;x<numberOfPlayers;x++) {
        message += u.code(x+1) + u.code(1);
    }
    message += u.code(0);
    players.sendToAll(message);
}

module.exports = deathAnmimationsChosen;