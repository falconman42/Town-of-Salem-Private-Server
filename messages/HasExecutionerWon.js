const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

function hasExecutionerWon(lynchedPlayer) {
    let players = TownOfSalem.getGame().getPlayerList();
    players = players.getAllOfRole('Executioner');
    for(var x=0;x<players.length;x++) {
        let player = players[x];
        if(player.executionerTarget == lynchedPlayer) {
            player.write(u.code(121) + u.code(0));
            player.won = true;
        }
    }
}

module.exports = hasExecutionerWon;