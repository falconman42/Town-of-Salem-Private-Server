const TownOfSalem = require('../TownOfSalem.js');
const u = require('../Utilities.js');

function namesAndPositions() {
    let players = TownOfSalem.getGame().getPlayerList();
    let clients = players.getClients();
    const defaultNames = u.shuffle(['Cotton Mather', 'Deodat Lawson', 'Edward Bishop', 'Giles Corey', 'James Bayley',
    'James Russel', 'John Hawthorne', 'John Proctor', 'John Willard', 'Jonathan Corwin', 'Samuel Parris',
    'Samuel Sewall', 'Thomas Danforth', 'William Hobbs', 'William Phips']);
    for(var x=0;x<clients.length;x++) { //for each client
        for(var y=0;y<clients.length;y++) { //send each client to them
            if(!clients[y].ign) {
                clients[y].ign = defaultNames.shift();
            }
            clients[x].write(u.code(91) + u.code(y+1) + clients[y].ign + u.code(0));
        }
    }
}

module.exports = namesAndPositions;