const ClientList = require('./ClientList.js');
const mode = require('./gamemodes/Classic').roleList;
const RoleBuilder = require('./RoleBuilder.js');
const Factions = require('./Factions.js');
const u = require('./Utilities.js');

class PlayerList {
	constructor() {
		this.clients = [];
		this.sorted = []; //list of players sorted in role priority order
	}
	addPlayer(socket, client = null) { //client is for testing purposes
		if(!client)
			client = ClientList.getClient(socket);
		this.clients.push(client);
	}
	removePlayer(socket) {
		for(var x=0;x<this.clients.length;x++) {
			if(this.clients[x].socket == socket) {
				this.clients.splice(x, 1);
				return;
			}
		}
	}
	fakePlayers() {
		var players = ['b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'z', 'z', 'z'];
		for(var x=0;x<players.length;x++) {
			let client = ClientList.createFakeClient(players[x]);
			this.addPlayer(null, client);
		}
	}
	getNewlyDeadPlayers() {
		let dead = [];
		for(var x=0;x<this.clients.length;x++) {
			if(this.clients[x].dead && !this.clients[x].deathShown)
				dead.push(this.clients[x]);
		}
		return dead;
	}
	/*Returns dead players*/
	getDeadPlayers(includeMediums = false) {
		let dead = [];
		for(var x=0;x<this.clients.length;x++) {
			let role = this.clients[x].getClassName();
			if(this.clients[x].dead || (includeMediums && role == 'Medium'))
				dead.push(this.clients[x]);
		}
		return dead;
	}
	getAlivePlayers() {
		let alive = [];
		for(var x=0;x<this.clients.length;x++) {
			if(!this.clients[x].dead) {
				alive.push(this.clients[x]);
			}
		}
		return alive;
	}
	getExecutionerTarget() {
		let town = [];
		for(var x=0;x<this.clients.length;x++) {
			if(this.clients[x].faction == Factions.TOWN)
				town.push(this.clients[x]);
		}
		return u.random(town);
	}
	getAllOfRole(role) {
		let roles = [];
		for(var x=0;x<this.clients.length;x++) {
			let p = this.clients[x];
			if(p.getClassName() == role) {
				roles.push(p);
			}
		}
		return roles;
	}
	numberOfPlayers() {
		return this.clients.length;
	}
	numberOfAlivePlayers() {
		let count = 0;
		for(var x=0;x<this.clients.length;x++) {
			if(!this.clients[x].dead)
				count++;
		}
		return count;
	}
	getClient(socket) {
		for(var x=0;x<this.clients.length;x++) {
			if(this.clients[x].socket == socket)
				return this.clients[x];
		}
		throw new Error("Client wasn't found in list.");
	}
	getSocket(username) {
		for(var x=0;x<this.clients.length;x++) {
			if(this.clients[x].username == username) {
				return this.clients[x].socket;
			}
		}
	}
	getClientSwitchRole(socket) {
		let obj = {};
		for(var x=0;x<this.clients.length;x++) {
			if(this.clients[x].socket == socket) {
				obj.client = x;
			}
			else if(this.sorted[x].socket == socket) {
				obj.sorted = x;
			}
		}
		return obj;
	}
	getClients() {
		return this.clients;
	}
	getSorted() {
		return this.sorted;
	}
	getUsername(socket) {
		for(var x=0;x<this.clients.length;x++) {
			if(this.clients[x].socket == socket) {
				return this.clients[x].username;
			}
		}
	}
	setIGN(socket, ign) {
		let client = this.getClient(socket);
		client.ign = ign;
	}
	getIndex(index) {
		return this.clients[index];
	}
	/*Returns the player with the given role if the player is alive.*/
	getRole(role) {
		if(Number.isInteger(role)) {
			for(var x=0;x<this.clients.length;x++) {
				if(this.clients[x].roleIndex == role)
					return this.clients[x];
			}
		}
		else {
			for(var x=0;x<this.clients.length;x++) {
				if(this.clients[x].getClassName() == role)
					return this.clients[x];
			}
		}
		return false;
	}
	getSocketIndex(socket) {
		for(var x=0;x<this.clients.length;x++) {
			if(this.clients[x].socket == socket)
				return x;
		}
	}
	sendToAll(message) {
		for(var x=0;x<this.clients.length;x++) {
			this.clients[x].write(message);
		}
	}
	sendToAllExcept(socket, message) {
		for(var x=0;x<this.clients.length;x++) {
			if(this.clients[x].socket != socket)
				this.clients[x].write(message);
		}
	}
	sendToDead(message, includeMediums) {
		let list = this.getDeadPlayers(includeMediums);
		for(var x=0;x<list.length;x++) {
			list[x].write(message);
		}
	}
	randomizeUsers() {
		//console.log("NAMES ARE NOT BEING SHUFFLED");
		this.clients = u.shuffle(this.clients);
		//let shuffledRoles = u.shuffle(mode(this.clients.length));
		//console.log("ROLES ARE NOT BEING SHUFFLED");
		let shuffledRoles = mode(this.clients.length, true);
        for(var x=0;x<this.clients.length;x++) {
			let role = RoleBuilder(shuffledRoles[x]);
			role = new role(this.clients[x]);
			this.clients[x] = role;
			this.clients[x].roleIndex = shuffledRoles[x];
			this.clients[x].position = x;
		}
		this.sortRoleOrder();
	}
	switchRole(player, roleIndex) {
		let indexes = this.getClientSwitchRole(player.socket);
		let role = RoleBuilder(roleIndex);
		let newPlayer = new role(player);
		newPlayer.position = player.position;
		newPlayer.roleIndex = roleIndex;
		this.clients[indexes.client] = newPlayer;
		this.sorted[indexes.sorted] = newPlayer;
	}
	sortRoleOrder() {
		this.sorted = [...this.clients].sort(function(p1, p2) {
			return p1.priority > p2.priority;
		});
	}
	getMafiaMembers() {
		let mafia = [];
		for(var x=0;x<this.clients.length;x++) {
			let player = this.clients[x];
			if(player.isMafiaRole())
				mafia.push(player);
		}
		return mafia;
	}
	getWinningFaction(faction) {
		let winners = [];
		for(var x=0;x<this.clients.length;x++) {
			let player = this.clients[x];
			if(player.won) {
				winners.push(player);
			}
			else if(player.socket && player.faction == faction) { //socket null if someone left
				winners.push(player);
			}
		}
		return winners;
	}
	reset() {
		for(var x=0;x<this.clients.length;x++) {
			this.clients[x].reset();
		}
	}
	resetVotes(value) {
		for(var x=0;x<this.clients.length;x++) {
			this.clients[x].voteTarget = value;
		}
	}
}

module.exports = PlayerList;