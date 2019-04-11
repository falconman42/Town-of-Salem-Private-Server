const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const State = require('../States.js');
const WhoDiedAndHow = require('./WhoDiedAndHow.js');
const times = require('../Timings.js');

function dayTransition() {
    let players = TownOfSalem.getGame().getPlayerList();
    TownOfSalem.getGame().setState(State.DAY);
    players.sendToAll(u.code(146) + u.code(0));
    setTimeout(function() {
        WhoDiedAndHow();
    }, times.WALKING);
}

module.exports = dayTransition;