const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

function roleAndPosition() {
    let playerList = TownOfSalem.getGame().getPlayerList();
    let clients = playerList.getClients();
    
    for(var x=0;x<clients.length;x++) { //for each player
        let player = clients[x];
        let role = player.getClassName();
        if(role == 'Executioner') {
            let target = playerList.getExecutionerTarget();
            player.setExecutionerTarget(target);
            player.write(u.code(92) + u.code(player.roleIndex+1) + u.code(x+1) + u.code(target.position + 1) + u.code(0));
        }
        else
            player.write(u.code(92) + u.code(player.roleIndex+1) + u.code(x+1) + u.code(0));
    }
}

module.exports = roleAndPosition;