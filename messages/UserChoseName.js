const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

function userChoseName(socket, data) {
    let players = TownOfSalem.getGame().getPlayerList();
    let id = players.getSocketIndex(socket) + 1;
    let ign = data.substr(1, data.length-2);
    players.setIGN(socket, ign);
    players.sendToAll(u.code(109) + u.code(82) + u.code(id) + ign + u.code(0));
}

module.exports = userChoseName;