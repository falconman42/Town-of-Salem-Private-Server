class Client {
	constructor(socket, username, ign) {
		this.socket = socket;
		this.username = username;
		this.ign = ign;
	}
	write(message) {
		if(this.socket)
			this.socket.write(message);
	}
	writeMultiple(messages) {
		if(this.socket) {
			for(var x=0;x<messages.length;x++) {
				this.socket.write(messages[x]);
			}
		}
	}
}

module.exports = Client;