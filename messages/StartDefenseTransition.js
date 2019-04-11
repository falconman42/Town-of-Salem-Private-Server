const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const States = require('../States.js');
const times = require('../Timings.js');

function startDefenseTransition(playerPosition) {
    let game = TownOfSalem.getGame();
    clearTimeout(game.timer);
    let players = game.getPlayerList();
    game.setState(States.DEFENSETRANSITION);
    game.numberOfTrials--;
    players.sendToAll(u.code(98) + u.code(playerPosition) + u.code(0));
    setTimeout(function() {
        require('./StartDefense')();
    }, times.WALKING);
}

module.exports = startDefenseTransition;