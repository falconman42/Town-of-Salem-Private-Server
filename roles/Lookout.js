const Player = require('../Player.js');
const u = require('../Utilities.js');
const PowerStates = require('../PowerStates.js');

class Lookout extends Player {
	constructor(client) {
		super(client);
		this.priority = 6;
		this.setFaction('TOWN');
	}
	role() {
		if(this.canPerformRole()) {
			this.target.visit(this);
			let visits = u.shuffle(this.target.getVisits());
			for(var x=0;x<visits.length;x++) {
				this.addMessage(u.code(102) + u.code(visits[x].position + 1) + u.code(0));
			}
		}
	}
	reset() {
		super.reset();
		this.attack = PowerStates.NONE;
		this.defense = PowerStates.NONE;
	}
}

module.exports = Lookout;