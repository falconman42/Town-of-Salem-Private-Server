const Game = require('./Game.js');

class TownOfSalem {
	constructor() {
		this.game = new Game();
	}
	getGame() {
		return this.game;
	}
}

module.exports = new TownOfSalem();