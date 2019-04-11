const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');
const roles = require('../Roles.js');

function checkMafiaPromitions() {
    let players = TownOfSalem.getGame().getPlayerList();
    let newlyDeadMafia = filterMafia(players.getNewlyDeadPlayers());
    let mafia = players.getMafiaMembers();
    let mafioso = getAliveMember(mafia, 'Mafioso');
    let godfather = getAliveMember(mafia, 'Godfather');

    if(mafioso && godfather) {
        return;
    }
    else {
        if(mafioso) { //godfather is dead/missing
            if(containsRole(newlyDeadMafia, 'Godfather')) {
                players.switchRole(mafioso, roles.GODFATHER);
                mafioso.write(u.code(136) + u.code(0)); //mafioso promoted to godfather
                for(var x=0;x<mafia.length;x++) {
                    mafia[x].write(u.code(137) + u.code(mafioso.position + 1) + u.code(0));
                }
            }
        }
        else if(!godfather) { //godfather is dead/missing and mafioso is dead
            if(containsRole(newlyDeadMafia, 'Mafioso')) {
                convertToMafioso(players, mafia);
            }
        }
    }
}

function filterMafia(list) {
    let arr = [];
    for(var x=0;x<list.length;x++) {
        if(list[x].mafia) {
            arr.push(list[x]);
        }
    }
    return arr;
}

function containsRole(list, roleName) {
    for(var x=0;x<list.length;x++) {
        let role = list[x].getClassName();
        if(role == roleName) {
            return true;
        }
    }
    return false;
}

function convertToMafioso(players, mafia) {
    for(var x=0;x<mafia.length;x++) {
        let role = mafia[x].getClassName();
        if(role != 'Godfather' && role != 'Mafioso') {
            players.switchRole(mafia[x], roles.MAFIOSO);
            mafia[x].write(u.code(138) + u.code(0)); //mafioso promoted to godfather
            for(var y=0;y<mafia.length;y++) {
                mafia[y].write(u.code(139) + u.code(mafia[x].position + 1) + u.code(0));
            }
            return;
        }
    }
}

function getAliveMember(mafia, roleName) {
    for(var x=0;x<mafia.length;x++) {
        let role = mafia[x].getClassName();
        if(role == roleName && !mafia[x].dead) {
            return mafia[x];
        }
    }
    return null;
}

module.exports = checkMafiaPromitions;