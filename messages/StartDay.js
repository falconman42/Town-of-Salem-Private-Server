const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const State = require('../States.js');

function startDay() {
    let players = TownOfSalem.getGame().getPlayerList();
    players.sendToAll(u.code(94) + u.code(0));
    TownOfSalem.getGame().getState(State.DAY);
    require('./StartDayTransition')();
}

module.exports = startDay;