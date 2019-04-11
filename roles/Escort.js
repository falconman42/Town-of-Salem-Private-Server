const Player = require('../Player.js');
const AbilityType = require('../AbilityType.js');
const PowerStates = require('../PowerStates.js');

class Escort extends Player {
	constructor(client) {
		super(client);
		this.priority = 1;
		this.roleBlockImmune = true;
		this.setFaction('TOWN');
	}
	role() {
		if(this.canPerformRole(AbilityType.ROLEBLOCK)) {
			this.target.visit(this, AbilityType.ROLEBLOCK);
			this.target.setRoleBlocked(this);
		}
	}
	reset() {
		super.reset();
		this.attack = PowerStates.NONE;
		this.defense = PowerStates.NONE;
	}
}

module.exports = Escort;