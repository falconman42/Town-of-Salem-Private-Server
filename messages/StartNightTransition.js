const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const StartNight = require('./StartNight.js');
const times = require('../Timings.js');

function startNightTransition() {
    let players = TownOfSalem.getGame().getPlayerList();
    players.sendToAll(u.code(145) + u.code(0));
    setTimeout(function() {
        StartNight();
    }, times.WALKING);
}

module.exports = startNightTransition;