const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

function sendMafiaMembers() {
    let clients = TownOfSalem.getGame().getPlayerList();
    let mafia = clients.getMafiaMembers();
    let message = u.code(110);
    for(var x=0;x<mafia.length;x++) {
        message += u.code(mafia[x].position + 1) + u.code(mafia[x].roleIndex + 1);
    }
    message += u.code(0);
    for(var x=0;x<mafia.length;x++) {
        mafia[x].write(message);
    }
}

module.exports = sendMafiaMembers;