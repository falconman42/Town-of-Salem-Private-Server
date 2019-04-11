class Retributionist {
	constructor() {
		
	}
	role() {
		this.canPerformRole();
	}
	reset() {
		super.reset();
		this.attack = PowerStates.NONE;
		this.defense = PowerStates.NONE;
	}
}

module.exports = Retributionist;