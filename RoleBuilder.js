var requireDir = require('require-dir');
var roles = requireDir('./roles');

function getRole(index) {
	switch(index) {
		case 0:
			return 'null';
		case 1:
			return roles.Doctor;
		case 2:
			return roles.Escort;
		case 3:
			return roles.Investigator;
		case 4:
			return roles.Jailor;
		case 5:
			return roles.Lookout;
		case 6:
			return roles.Mayor;
		case 7:
			return roles.Medium;
		case 8:
			return 'Retributionist';
		case 9:
		    return roles.Sheriff;
		case 10:
			return 'Spy';
		case 11:
			return 'Transporter';
		case 12:
			return 'Vampire Hunter';
		case 13:
			return roles.Veteran;
		case 14:
			return roles.Vigilante;
		case 15:
			return 'Blackmailer';
		case 16:
			return 'Consigliere';
		case 17:
			return roles.Consort;
		case 18:
			return 'Disguiser';
		case 19:
			return 'Forger';
		case 20:
			return roles.Framer;
		case 21:
			return roles.Godfather;
		case 22:
			return 'Janitor';
		case 23:
			return roles.Mafioso;
		case 24:
			return 'Amnesiac';
		case 25:
			return 'Arsonist';
		case 26:
			return roles.Executioner;
		case 27:
			return roles.Jester
		case 28:
			return roles.SerialKiller;
		case 29:
			return 'Survivor';
		case 30:
			return 'Vampire';
		case 31:
			return 'Werewolf';
		case 32:
			return 'Witch';
	}
}

module.exports = getRole;