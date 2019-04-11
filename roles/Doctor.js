const Player = require('../Player.js');
const PowerStates = require('../PowerStates.js');

class Doctor extends Player {
	constructor(client) {
		super(client);
		this.priority = 2;
		this.abilities = 1;
		this.setFaction('TOWN');
	}
	role() {
		if(this.canPerformRole()) {
			if(this.target.position == this.position) {
				this.abilities--;
			}
			this.target.visit(this);
			this.target.setHealed(this);
		}
	}
	reset() {
		super.reset();
		this.attack = PowerStates.NONE;
		this.defense = PowerStates.NONE;
	}
}

module.exports = Doctor;