const Player = require('../Player.js');
const u = require('../Utilities.js');
const PowerStates = require('../PowerStates.js');

class Investigator extends Player {
	constructor(client) {
		super(client);
		this.priority = 3;
		this.setFaction('TOWN');
	}
	role() {
		if(this.canPerformRole()) {
			let role = this.target.getClassName();
			this.target.visit(this);
			if(role =='Escort' || role == 'Transporter' || role == 'Consort')
				this.addMessage(u.code(19) + u.code(27) + u.code(0));
			else if(role == 'Doctor' || role == 'Disguiser' || role == 'SerialKiller')
				this.addMessage(u.code(19) + u.code(28) + u.code(0));
			else if(role == 'Investigator' || role == 'Consigliere' || role == 'Mayor')
				this.addMessage(u.code(19) + u.code(29) + u.code(0));
			else if(role == 'Bodyguard' || role == 'Godfather' || role == 'Arsonist')
				this.addMessage(u.code(19) + u.code(31) + u.code(0));
			else if(role == 'Vigilante' || role == 'Veteran' || role == 'Mafioso')
				this.addMessage(u.code(19) + u.code(32) + u.code(0));
			else if(role == 'Medium' || role == 'Janitor' || role == 'Retributionist')
				this.addMessage(u.code(19) + u.code(33) + u.code(0));
			else if(role == 'Survivor' || role == 'VampireHunter' || role == 'Amnesiac')
				this.addMessage(u.code(19) + u.code(34) + u.code(0));
			else if(role == 'Spy' || role == 'Jailor' || role == 'Blackmailer')
				this.addMessage(u.code(19) + u.code(35) + u.code(0));
			else if(role == 'Sheriff' || role == 'Executioner' || role == 'Werewolf')
				this.addMessage(u.code(19) + u.code(36) + u.code(0));
			else if(role == 'Framer' || role == 'Vampire' || role == 'Jester')
				this.addMessage(u.code(19) + u.code(38) + u.code(0));
			else if(role == 'Lookout' || role == 'Forger' || role == 'Witch')
				this.addMessage(u.code(19) + u.code(39) + u.code(0));
		}
	}
	reset() {
		super.reset();
		this.attack = PowerStates.NONE;
		this.defense = PowerStates.NONE;
	}
}

module.exports = Investigator;