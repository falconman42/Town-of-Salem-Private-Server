const Player = require('../Player.js');
const PowerStates = require('../PowerStates.js');
const AbilityType = require('../AbilityType.js');
const u = require('../Utilities.js');

class Mafioso extends Player {
	constructor(client) {
		super(client);
		this.mafia = true;
		this.priority = 5;
		this.attack = PowerStates.BASIC;
		this.setFaction('MAFIA');
	}
	role() {
		let gf = require('../TownOfSalem.js').getGame().getPlayerList().getRole('Godfather');
		if(gf && gf.canPerformRole() && this.canPerformRole(AbilityType.ATTACK)) {
			this.target = gf.target; //change our target to the GF target
			gf.target = null;
			this.addMessage(u.code(19) + u.code(91) + u.code(0)); //GF has ordered you to kill their target
			this.target.visit(this, AbilityType.ATTACK);
			this.target.kill(3, this);
		}
		else if(this.canPerformRole(AbilityType.ATTACK)) {
			this.target.visit(this, AbilityType.ATTACK);
			this.target.kill(3, this);
		}
	}
	reset() {
		super.reset();
		this.attack = PowerStates.BASIC;
		this.defense = PowerStates.NONE;
	}
}

module.exports = Mafioso;