const Player = require('../Player.js');
const PowerStates = require('../PowerStates.js');

class Executioner extends Player {
	constructor(client) {
		super(client);
		this.defense = PowerStates.BASIC;
		this.setFaction('NEUTRAL');
	}
	role() {
		this.canPerformRole();
	}
	setExecutionerTarget(target) {
		this.executionerTarget = target;
	}
	reset() {
		super.reset();
		this.attack = PowerStates.NONE;
		this.defense = PowerStates.BASIC;
	}
}

module.exports = Executioner;