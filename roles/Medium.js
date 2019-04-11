const Player = require('../Player.js');
const PowerStates = require('../PowerStates.js');

class Medium extends Player {
	constructor(client) {
		super(client);
		this.setFaction('TOWN');
	}
	role() {
		this.canPerformRole();
	}
	reset() {
		super.reset();
		this.attack = PowerStates.NONE;
		this.defense = PowerStates.NONE;
	}
}

module.exports = Medium;