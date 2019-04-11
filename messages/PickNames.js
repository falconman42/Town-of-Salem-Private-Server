var TownOfSalem = require('../TownOfSalem.js');
var States = require('../States.js');
var u = require('../Utilities.js');
const times = require('../Timings.js');

function pickNames() {
    let players = TownOfSalem.getGame().getPlayerList();
    players.sendToAll(u.code(90) + u.code(players.numberOfPlayers()+1) + u.code(1) + u.code(0)); //??? not players+1 but doesn't work for single player
    require('./HousesChosen.js')();
    require('./CharactersChosen.js')();
    require('./DeathAnimationsChosen.js')();
    TownOfSalem.getGame().setState(States.NAMESELECTION);
    setTimeout(function() {
        //prepare the game
        players.randomizeUsers(); //assign random role and shuffle users
        require('./RoleLotsInformation')();
        require('./NamesAndPositionsOfUsers')();
        require('./RoleAndPosition')();
        require('./SendMafiaMembers')();
        require('./TellRoleList')();
        setTimeout(function() {
            require('./FirstDayTransition')();
        }, times.ROLEWHEEL);
    }, times.NAMESELECTION);
}

module.exports = pickNames;