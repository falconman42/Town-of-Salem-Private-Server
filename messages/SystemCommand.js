const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const States = require('../States.js');

function systemCommand(socket, data) {
    let players = TownOfSalem.getGame().getPlayerList();
    let which = data.charCodeAt(1) - 1;
    switch(which) {
        case 0:
            players.sendToAll(u.code(77) + u.code(8) + data.slice(2) + u.code(0));
        break;
    }
}

module.exports = systemCommand;