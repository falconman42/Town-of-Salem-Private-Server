const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const States = require('../States.js');

function startVoting() {
    let players = TownOfSalem.getGame().getPlayerList();
    TownOfSalem.getGame().setState(States.VOTING);
    players.resetVotes(-1);
    players.sendToAll(u.code(97) + u.code(TownOfSalem.getGame().time) + u.code(0));
    TownOfSalem.getGame().timer = setInterval(function() {
        let time = TownOfSalem.getGame().time--;
        if(time == 0) {
            require('./StartNightTransition')();
        }
    }, 1000) //decrement each second to withhold time between each lynch
}

module.exports = startVoting;