const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const States = require('../States.js');
const times = require('../Timings.js');

function startDefense() {
    let players = TownOfSalem.getGame().getPlayerList();
    TownOfSalem.getGame().setState(States.DEFENSE);
    players.sendToAll(u.code(155) + u.code(0));
    setTimeout(function() {
        require('./StartJudgement')();
    }, times.DEFENSEPHASE);
}

module.exports = startDefense;