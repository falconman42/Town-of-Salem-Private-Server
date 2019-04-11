const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

module.exports = {
    handleBeforeNightTransitionActions() {
        let players = TownOfSalem.getGame().getPlayerList();
        let clients = players.getClients();
        let jailor = players.getRole('Jailor');
        let mediums = players.getAllOfRole('Medium');
        for(var x=0;x<clients.length;x++) {
            if(clients[x].abilities >= 0) {
                clients[x].write(u.code(131) + u.code(clients[x].abilities + 1) + u.code(0));
            }
        }
        if(jailor && jailor.jailTarget) {
            let target = jailor.jailTarget;
            target.jailor = jailor;
            jailor.write(u.code(116) + u.code(target.position + 1) + u.code(2) + u.code(jailor.killedTown + 1) + u.code(0)); //second 1 is executed town or not
            target.write(u.code(115) + u.code(0));
            
            if(target.mafia) {
                let mafia = players.getMafiaMembers();
                for(var x=0;x<mafia.length;x++) {
                    if(!mafia[x].jailor) { //don't send to jailed member
                        mafia[x].write(u.code(143) + u.code(jailor.jailTarget.position + 1) + u.code(0));
                    }    
                }
            }
        }
        for(var x=0;x<mediums.length;x++) {
            let medium = mediums[x];
            if(medium.dead && medium.seanceTarget) {
                let target = medium.seanceTarget;
                target.seancer = medium;
                target.write(u.code(128) + u.code(0)); //A medium is talking to us!
                medium.write(u.code(129) + u.code(0)); //Opened a commnication with the living
            }
        }
    },
    handleAfterNightTransitionActions() {
        let players = TownOfSalem.getGame().getPlayerList();
        let jailor = players.getRole('Jailor');
        if(jailor && !jailor.jailTarget) {
            jailor.write(u.code(19) + u.code(108) + u.code(0));
        }
    }
}