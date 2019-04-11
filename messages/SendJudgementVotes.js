const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const States = require('../States.js');
const times = require('../Times.js');

function sendJudgementVotes() {
    let game = TownOfSalem.getGame();
    let playerList = game.getPlayerList();
    let clients = playerList.getClients();
    let guilty = 0;
    let innocent = 0;
    for(var x=0;x<clients.length;x++) {
        let player = clients[x];
        if(player.voteTarget == 0)
            guilty++;
        else if(player.voteTarget == 1)
            innocent++;
        playerList.sendToAll(u.code(120) + u.code(player.position + 1) + u.code(player.voteTarget + 1) + u.code(0));
    }
    if(guilty > innocent) {
        game.setState(States.LASTWORDS);
        playerList.sendToAll(u.code(100) + u.code(guilty + 1) + u.code(innocent + 1) + u.code(0));
        setTimeout(function() {
            require('./StartLastWords')();
        }, times.WALKTOTRIAL);
    }
    else {
        playerList.sendToAll(u.code(101) + u.code(guilty + 1) + u.code(innocent + 1) + u.code(0));
        setTimeout(function() {
            if(game.numberOfTrials == 0) {
                require('./StartNightTransition')();
            }
            else {
                require('./StartVoting')();
            }
        }, times.VOTEDINNOCENT);
    }
}

module.exports = sendJudgementVotes;