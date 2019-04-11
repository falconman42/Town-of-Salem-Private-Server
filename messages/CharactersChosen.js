const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

function charactersChosen() {
    let players = TownOfSalem.getGame().getPlayerList();
    let numberOfPlayers = players.numberOfPlayers();
    let message = u.code(153);
    for(var x=0;x<numberOfPlayers;x++) {
        let r = u.randomInt(1, 4);
        message += u.code(x+1) + u.code(r);
    }
    message += u.code(0);
    players.sendToAll(message);
}

module.exports = charactersChosen;