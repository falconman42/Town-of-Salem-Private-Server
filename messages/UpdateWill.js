const TownOfSalem = require('../TownOfSalem.js');

function updateWill(socket, data) {
    console.log(data.length);
    if(data.length == 2) {
        TownOfSalem.getGame().getPlayerList().getClient(socket).will = null;
    }
    else {
        TownOfSalem.getGame().getPlayerList().getClient(socket).will = data.slice(1);
    }
}

module.exports = updateWill;