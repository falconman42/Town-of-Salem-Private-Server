const Player = require('../Player.js');
const PowerStates = require('../PowerStates.js');
const AbilityType = require('../AbilityType.js');
const Factions = require('../Factions.js');
const u = require('../Utilities.js');

class Jailor extends Player {
	constructor(client) {
		super(client);
		this.priority = 5;
		this.abilities = 3;
		this.killedTown = false;
		this.attack = PowerStates.POWERFUL;
		this.setFaction('TOWN');
	}
	role() {
		if(this.canPerformRole(AbilityType.ATTACK)) {
			this.target.kill(1, this);
			this.target.visit(this, AbilityType.ATTACK);
			this.abilities--;
			if(this.target.getFaction() == Factions.TOWN) {
				this.killedTown = true;
				this.abilities = 0;
			}
		}
		else if(this.jailTarget && this.jailTarget.getClassName() == 'SerialKiller') {
			if(!this.healers.length) {
				this.addMessage(u.code(19) + u.code(96) + u.code(0)); //You were killed by the serial killer you jailed!
			}
			this.jailTarget.target = this;
			this.jailTarget.target.kill(5, this.jailTarget);
			this.jailTarget.addMessage(u.code(19) + u.code(97) + u.code(0));
		}
	}
	reset() {
		super.reset();
		this.jailTarget = null;
		this.attack = PowerStates.POWERFUL;
		this.defense = PowerStates.NONE;
	}
}

module.exports = Jailor;