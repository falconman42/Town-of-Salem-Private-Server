const Player = require('../Player.js');
const u = require('../Utilities.js');
const PowerStates = require('../PowerStates.js');

class Jester extends Player {
	constructor(client) {
		super(client);
		this.attack = PowerStates.INVINCIBLE;
		this.setFaction('NEUTRAL');
	}
	role() {
		this.canPerformRole();
		if(this.target) {
			this.target.addMessage(u.code(19) + u.code(84) + u.code(0));
			this.target.kill(7, this);
		}	
	}
	reset() {
		super.reset();
		this.attack = PowerStates.NONE;
		this.defense = PowerStates.NONE;
	}
}

module.exports = Jester;