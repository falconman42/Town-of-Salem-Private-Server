const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const State = require('../States.js');
const times = require('../Timings.js');

function startNight() {
    let players = TownOfSalem.getGame().getPlayerList();
    TownOfSalem.getGame().setState(State.NIGHT);
    players.reset();
    //perform night actions
    require('./HandleNightTransitionActions').handleBeforeNightTransitionActions();
    players.sendToAll(u.code(93) + u.code(0));
    require('./HandleNightTransitionActions').handleAfterNightTransitionActions();

    setTimeout(function() {
        require('./PerformNightActions')();
    }, times.NIGHTTIME);
}

module.exports = startNight;