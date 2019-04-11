const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

function userCastVote(socket, data) {
    let players = TownOfSalem.getGame().getPlayerList();
    let player = players.getClient(socket);
    let target = players.getIndex(data.charCodeAt(1) - 1);
    if(player.voteTarget == -1) { //first vote
        players.sendToAll(u.code(103) + u.code(player.position + 1) + u.code(target.position + 1) + u.code(player.voteCount) + u.code(0)); //number of votes last one
        player.voteTarget = target;
    }
    else if(player.voteTarget == target) { //cancel vote
        players.sendToAll(u.code(104) + u.code(player.position + 1) + u.code(target.position + 1) + u.code(player.voteCount) + u.code(0)); //number of votes last one
        player.voteTarget = -1;
    }
    else { //change vote
        let oldTarget = player.voteTarget;
        players.sendToAll(u.code(105) + u.code(player.position + 1) + u.code(target.position + 1) + u.code(oldTarget.position + 1) + u.code(player.voteCount) + u.code(0)); //number of votes last one
        player.voteTarget = target;
    }
    let value = checkVotes();
    if(value) {
        require('./StartDefenseTransition')(value);
    }
}

function checkVotes() {
    let players = TownOfSalem.getGame().getPlayerList();
    let votesNeeded = Math.ceil(players.numberOfAlivePlayers() / 2);
    players = players.getClients();
    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for(var x=0;x<players.length;x++) {
        arr[players[x].voteTarget.position] += players[x].voteCount;
        if(arr[players[x].voteTarget.position] >= votesNeeded) {
            TownOfSalem.getGame().setTargetOnStand(players[x].voteTarget);
            return players[x].voteTarget.position + 1;
        }
    }
    return false;
}

module.exports = userCastVote;