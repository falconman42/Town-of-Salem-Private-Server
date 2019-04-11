const Player = require('../Player.js');
const PowerStates = require('../PowerStates.js');
const AbilityType = require('../AbilityType.js');

class Godfather extends Player {
	constructor(client) {
		super(client);
		this.priority = 4;
		this.attack = PowerStates.BASIC;
		this.mafia = true;
		this.setFaction('MAFIA');
	}
	role() {
		if(this.canPerformRole(AbilityType.ATTACK)) {
			this.target.visit(this, AbilityType.ATTACK);
			this.target.kill(3, this);			
		}
	}
	reset() {
		super.reset();
		this.attack = PowerStates.BASIC;
		this.defense = PowerStates.BASIC;
	}
}

module.exports = Godfather;