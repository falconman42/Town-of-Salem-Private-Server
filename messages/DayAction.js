const TownOfSalem = require('../TownOfSalem.js');

function dayAction(socket, data) {
    let players = TownOfSalem.getGame().getPlayerList();
    let player = players.getClient(socket);
    let target = data.charCodeAt(1) - 1;
    let role = player.getClassName();
    if(role == 'Jailor') {
        if(target == 30) {
            player.jailTarget = -1;
        }
        else {
            player.jailTarget = players.getIndex(target);
        }
    }
    else if(role == 'Medium') {
        if(target == 30) {
            player.seanceTarget = -1;
        }
        else {
            player.seanceTarget = players.getIndex(target);
        }
    }

}

module.exports = dayAction;