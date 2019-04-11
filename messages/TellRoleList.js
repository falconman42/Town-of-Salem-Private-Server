const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const mode = require('../gamemodes/Classic.js').roleList;

function tellRoleList() {
    let players = TownOfSalem.getGame().getPlayerList();
    let roles = mode(players.numberOfPlayers());
    let message = u.code(108);
    for(var x=0;x<roles.length;x++) {
        message += u.code(roles[x]+1);
    }
    message += u.code(0);
    players.sendToAll(message);
}

module.exports = tellRoleList;