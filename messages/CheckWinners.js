const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const Roles = require('../Roles.js');
const States = require('../States.js');

function checkWinners() {
    let players = TownOfSalem.getGame().getPlayerList();
    let clients = players.getClients();
    let alivePlayers = players.getAlivePlayers();
    let excluded = [Roles.EXECUTIONER, Roles.JESTER];
    if(players.numberOfAlivePlayers() == 1) {
        sendWinners(players, alivePlayers[0].getFaction());
        return true;
    }
    if(players.numberOfAlivePlayers() == 2) {
        let stalemates = [];
        //winner of each stalemate goes first
        stalemates.push([Roles.GODFATHER, Roles.ESCORT]);
        stalemates.push([Roles.MAFIOSO, Roles.ESCORT]);
        stalemates.push([Roles.GODFATHER, Roles.JAILOR]); //extra
        stalemates.push([Roles.MAFIOSO, Roles.JAILOR]); //extra
        stalemates.push([Roles.SERIALKILLER, Roles.JAILOR]); //extra
        stalemates.push([Roles.SERIALKILLER, Roles.GODFATHER]);
        stalemates.push([Roles.SERIALKILLER, Roles.MAFIOSO]);
        for(var x=0;x<stalemates.length;x++) {
            let stalemate = stalemates[x];
            if(stalemate.includes(alivePlayers[0].roleIndex) && stalemate.includes(alivePlayers[1].roleIndex)) {
                if(stalemate.includes(Roles.JAILOR)) {
                    if(players.getRole('Jailor').abilities == 0) {
                        let winner = players.getRole(stalemate[0]);
                        sendWinners(players, winner.getFaction());
                        return true;
                    }
                }
                else {
                    let winner = players.getRole(stalemate[0]);
                    sendWinners(players, winner.getFaction());
                    return true;
                }
            }
        }
        //stalemate table
    }
    let factions = {};
    //0 = town, 1 = mafia, 2 = neutral
    for(var x=0;x<alivePlayers.length;x++) {
        let player = alivePlayers[x];
        if(!excluded.includes(player.roleIndex)) {
            factions[player.getFaction()] = (factions[player.getFaction()] || 0) + 1;
        }
    }
    let keys = Object.keys(factions);
    if(keys.length == 1) { //only 1 faction alive
        sendWinners(players, keys[0]);
        return true;
    }
    else {
        return false;
    }
    //1 town
    //2 maf
    //3 sk
}

function sendWinners(players, faction) {
    let winningPlayers = players.getWinningFaction(faction);
    let message = u.code(135) + u.code(faction + 1);
    for(var x=0;x<winningPlayers.length;x++) {
        winningPlayers[x].won = true;
        message += u.code(winningPlayers[x].position + 1);
    }
    message += u.code(0);
    players.sendToAll(message);
    TownOfSalem.getGame().setState(States.SOMEONEWON);
}

module.exports = checkWinners;