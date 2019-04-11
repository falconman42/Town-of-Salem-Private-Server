const PlayerList = require('./PlayerList.js');
const State = require('./States.js');

class Game {
    constructor() {
        this.players = new PlayerList();
        this.randomized = [];
        this.state = State.LOBBY;
        this.timer = 0;
        this.targetOnStand = 0;
    }
    getPlayerList() {
        return this.players;
    }
    setState(state) {
        this.state = state;
    }
    getState() {
        return this.state;
    }
    setTargetOnStand(target) {
        this.targetOnStand = target;
    }
    getTargetOnStand() {
        return this.targetOnStand;
    }
}

module.exports = Game;