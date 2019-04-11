const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

function userLeftEndGameLobby(socket) {
    socket.write(u.code(40) + u.code(0));
}

module.exports = userLeftEndGameLobby;