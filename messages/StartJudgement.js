const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const States = require('../States.js');
const times = require('../Timings.js');

function startJudgement() {
    let players = TownOfSalem.getGame().getPlayerList();
    TownOfSalem.getGame().setState(States.JUDGEMENT);
    players.resetVotes(2);
    players.sendToAll(u.code(99) + u.code(0));
    setTimeout(function() {
        require('./SendJudgementVotes')();
    }, times.VOTINGPHASE);
}

module.exports = startJudgement;