const Player = require('../Player.js');
const PowerStates = require('../PowerStates.js');

class Framer extends Player {
	constructor(client) {
		super(client);
		this.mafia = true;
		this.priority = 2;
		this.setFaction('MAFIA');
	}
	role() {
		if(this.canPerformRole()) {
			this.target.visit(this);
			this.target.framed = true;
		}
	}
	reset() {
		super.reset();
		this.attack = PowerStates.NONE;
		this.defense = PowerStates.NONE;
	}
}

module.exports = Framer;