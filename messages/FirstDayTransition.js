const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const State = require('../States.js');
const StartFirstDay = require('./StartFirstDay.js');
const times = require('../Timings.js');

function firstDayTransition() {
    let players = TownOfSalem.getGame().getPlayerList();
    TownOfSalem.getGame().setState(State.DISCUSSION);
    players.sendToAll(u.code(151) + u.code(0));
    setTimeout(function() {
        StartFirstDay();
    }, times.WALKING);
}

module.exports = firstDayTransition;