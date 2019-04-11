const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

function userVotedGuilty(socket, data) {
    let players = TownOfSalem.getGame().getPlayerList();
    let player = players.getClient(socket);
    switch(player.voteTarget) {
        case 0: //cancelled vote
            player.voteTarget = 2;
            players.sendToAll(u.code(119) + u.code(player.position + 1) + u.code(0));
            break;
        case 1:
            player.voteTarget = 2;
            players.sendToAll(u.code(118) + u.code(player.position + 1) + u.code(0));
            break
        case 2: //first vote
            player.voteTarget = 0;
            players.sendToAll(u.code(117) + u.code(player.position + 1) + u.code(0));
            break;

    }
}

module.exports = userVotedGuilty;