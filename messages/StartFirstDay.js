const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const State = require('../States.js');
const StartNightTransition = require('./StartNightTransition.js');
const times = require('../Timings.js');

function startFirstDay() {
    let players = TownOfSalem.getGame().getPlayerList();
    players.sendToAll(u.code(114) + u.code(0));
    TownOfSalem.getGame().getState(State.DISCUSSION);
    setTimeout(function() {
        StartNightTransition();
    }, times.WALKING);
}

module.exports = startFirstDay;