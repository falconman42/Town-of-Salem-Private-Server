const TownOfSalem = require('../TownOfSalem.js');

function nightAction(socket, data) {
    let players = TownOfSalem.getGame().getPlayerList();
    let target = players.getIndex(data.charCodeAt(1) - 1);
    let player = players.getClient(socket);
    player.setTarget(target);
}

module.exports = nightAction;