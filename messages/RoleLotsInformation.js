const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const mode = require('../gamemodes/Classic.js').roleList;

function roleLotsInformation() {
    let players = TownOfSalem.getGame().getPlayerList();
    let roles = mode(players.numberOfPlayers());
    let numberOfPlayers = players.numberOfPlayers();
    let message = u.code(175);
    for(var x=0;x<roles.length;x++) {
        message += roles[x] + ',' + numberOfPlayers*10 + ',10*';
    }
    message = message.slice(0, -1) + u.code(0);
    players.sendToAll(message);
}

module.exports = roleLotsInformation;