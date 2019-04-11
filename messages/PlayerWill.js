const TownOfSalem = require('../TownOfSalem.js');

function playerWill(socket, data) {
    let players = TownOfSalem.getGame().getPlayerList();
    let player = players.getClient(socket);
    player.setWill(data.slice(1));
}

module.exports = playerWill;