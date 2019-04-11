const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

function whoDiedAndHow(target = null) {
    return new Promise(function (resolve, reject) {
        let players = TownOfSalem.getGame().getPlayerList();
        let deadPlayers = target ? [target] : players.getNewlyDeadPlayers();
        let promises = [];
        for (var x = 0; x < deadPlayers.length; x++) {
            var promise = new Promise(function (resolve, reject) {
                let time = 12000;
                let p = deadPlayers[x];
                if (p.will)
                    time += 8000;
                setTimeout(function () {
                    let message = u.code(95) + u.code(p.position + 1) + u.code(p.roleIndex + 1);
                    message += target ? u.code(2) : u.code(1);
                    for (var x = 0; x < p.killers.length; x++) {
                        message += u.code(p.killers[x]);
                    }
                    message += u.code(0);
                    players.sendToAll(message);
                    if (p.will) {
                        players.sendToAll(u.code(130) + u.code(p.position + 1) + u.code(2) + p.will + u.code(0)); //last will
                    }
                    else {
                        players.sendToAll(u.code(130) + u.code(p.position + 1) + u.code(1) + u.code(0)); //last will
                    }
                    setTimeout(function () {
                        resolve();
                    }, time);
                }, x * time);
            });
            promises.push(promise);
        }
        Promise.all(promises).then(function () {
            resolve();
        });
    });
}

module.exports = whoDiedAndHow;