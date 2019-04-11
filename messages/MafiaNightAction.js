const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

function mafiaNightAction(socket, data) {
    let players = TownOfSalem.getGame().getPlayerList();
    let target = data.charCodeAt(1);
    let str = data.charCodeAt(2);
    let player = players.getClient(socket);
    let mafia = players.getMafiaMembers();
    require('./NightAction.js')(socket, data);

    for(var x=0;x<mafia.length;x++) {
        if(mafia[x].position != player.position) //don't sent to player clicking the button
            mafia[x].write(u.code(132) +  u.code(player.position + 1) + u.code(player.roleIndex + 1) + u.code(target) + u.code(str) + u.code(0));
    }
}

module.exports = mafiaNightAction;