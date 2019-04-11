const Player = require('../Player.js');
const u = require('../Utilities.js');
const PowerStates = require('../PowerStates.js');

class Sheriff extends Player {
	constructor(client) {
		super(client);
		this.priority = 3;
		this.setFaction('TOWN');
	}
	role() {
		if(this.canPerformRole()) {
			this.target.visit(this);
			let role = this.target.getClassName();
			if(this.target.isMafia())
				this.addMessage(u.code(19) + u.code(1) + u.code(0));
			else if(role == 'SerialKiller')
				this.addMessage(u.code(19) + u.code(4) + u.code(0));
			else
				this.addMessage(u.code(19) + u.code(2) + u.code(0));
		}
	}
	reset() {
		super.reset();
		this.attack = PowerStates.NONE;
		this.defense = PowerStates.NONE;
	}
}

module.exports = Sheriff;