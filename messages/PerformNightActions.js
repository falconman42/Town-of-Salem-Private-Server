const TownOfSalem = require('../TownOfSalem.js');
const States = require('../States.js');
const u = require('../Utilities.js');
const times = require('../Timings.js');

function performNightActions() {
    let players = TownOfSalem.getGame().getPlayerList().getSorted();
    for(var x=0;x<players.length;x++) {
        players[x].role();
    }
    for(var x=0;x<players.length;x++) {
        players[x].writeMultiple(players[x].getMessages());
        if(players[x].dead && !players[x].deathShown) {
            players[x].write(u.code(106) + u.code(0));
        }
    }
    TownOfSalem.getGame().setState(States.DAYTRANSITION); //set state here to stop messages from sending after night is done
    require('./CheckMafiaPromotions')();
    setTimeout(function() {
        require('./StartDay')();
    }, times.NIGHTDELAYBEFOREDAY);
}

module.exports = performNightActions;