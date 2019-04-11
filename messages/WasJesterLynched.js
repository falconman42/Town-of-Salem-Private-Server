const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

function wasJesterLynched(lynchedPlayer) {
    let players = TownOfSalem.getGame().getPlayerList();
    let role = lynchedPlayer.getClassName();
    let message = u.code(122);
    if(role == 'Jester') {
        message += getVotes(players.getAlivePlayers()) + u.code(0);
        lynchedPlayer.won = true;
        lynchedPlayer.write(message);
        players.sendToAll(u.code(19) + u.code(99) + u.code(0)); //The Jester will get his revenge...
    }
}

function getVotes(clients) {
    let message = '';
    for(var x=0;x<clients.length;x++) {
        if(clients[x].voteTarget == 0 || clients[x].voteTarget == 2) {
            message += u.code(clients[x].position + 1);
        }
    }
    return message;
}

module.exports = wasJesterLynched;