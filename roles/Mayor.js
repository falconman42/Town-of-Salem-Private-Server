const Player = require('../Player.js');
const PowerStates = require('../PowerStates.js');

class Mayor extends Player {
	constructor(client) {
		super(client);
		this.setFaction('TOWN');
	}
	role() {
		this.canPerformRole();
		this.attack = PowerStates.BASIC;
		this.kill(3, this);
	}
	reset() {
		super.reset();
		this.attack = PowerStates.NONE;
		this.defense = PowerStates.NONE;
	}
}

module.exports = Mayor;